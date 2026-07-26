from __future__ import annotations

from contextlib import asynccontextmanager
import logging
from pathlib import Path
import secrets
from time import perf_counter
import uuid

import httpx
from fastapi import FastAPI, File, Header, HTTPException, Request, UploadFile
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import FileResponse

from app.config import Settings, settings
from app.knowledge import load_knowledge
from app.observability import configure_logging
from app.providers import create_provider
from app.rate_limit import InMemoryRateLimiter
from app.retriever import FaissRetriever
from app.resume_store import ResumeStore, ResumeUpload, ResumeValidationError
from app.schemas import ChatRequest, ChatResponse, HealthResponse, ResumeStatusResponse, SuggestionsResponse
from app.service import ChatService

SUGGESTIONS = [
    "What are Nagendra's strongest skills?",
    "Explain his LangGraph experience.",
    "Show his AWS experience.",
    "Tell me about his best GenAI project.",
    "What backend architecture experience does he have?",
    "Summarize Nagendra in 30 seconds.",
    "How would Nagendra design a production RAG system?",
    "How would he troubleshoot a slow FastAPI service?",
]


def create_resume_store(config: Settings) -> ResumeStore:
    default_dir = Path(__file__).resolve().parent.parent / "storage" / "resume"
    storage_dir = Path(config.resume_storage_dir).expanduser().resolve() if config.resume_storage_dir else default_dir
    return ResumeStore(storage_dir, config.resume_max_upload_bytes)


def build_service(config: Settings, resume_store: ResumeStore | None = None) -> tuple[ChatService, int]:
    data_dir = Path(__file__).resolve().parent.parent / "data"
    documents = load_knowledge(data_dir)
    if resume_store:
        documents.extend(resume_store.load_documents())
    service = ChatService(FaissRetriever(documents), create_provider(config), config.retrieval_top_k)
    return service, len(documents)


def create_app(config: Settings = settings) -> FastAPI:
    if "*" in config.allowed_origins:
        raise ValueError("ALLOWED_ORIGINS must contain explicit origins; wildcard CORS is not permitted.")

    configure_logging(config.log_level)

    @asynccontextmanager
    async def lifespan(application: FastAPI):
        application.state.resume_store = create_resume_store(config)
        application.state.chat_service, application.state.document_count = build_service(config, application.state.resume_store)
        application.state.rate_limiter = InMemoryRateLimiter(config.chat_rate_limit, config.chat_rate_window_seconds)
        yield

    application = FastAPI(title="Nagendra Mule AI Resume API", description="Grounded RAG API over an approved professional portfolio knowledge base.", version="1.0.0", lifespan=lifespan)
    application.add_middleware(CORSMiddleware, allow_origins=list(config.allowed_origins), allow_credentials=False, allow_methods=["GET", "POST"], allow_headers=["Content-Type", "X-Resume-Admin-Token"], expose_headers=["X-Request-ID"])

    @application.middleware("http")
    async def request_observability(request: Request, call_next):  # type: ignore[no-untyped-def]
        request_id = str(uuid.uuid4())
        started = perf_counter()
        logger = logging.getLogger("portfolio.api")
        try:
            response = await call_next(request)
        except Exception:
            logger.exception(
                "request_failed",
                extra={"request_id": request_id, "method": request.method, "path": request.url.path, "status_code": 500, "duration_ms": round((perf_counter() - started) * 1000, 2)},
            )
            raise
        response.headers["X-Request-ID"] = request_id
        logger.info(
            "request_completed",
            extra={"request_id": request_id, "method": request.method, "path": request.url.path, "status_code": response.status_code, "duration_ms": round((perf_counter() - started) * 1000, 2)},
        )
        return response

    @application.get("/health", response_model=HealthResponse, tags=["Operations"])
    async def health(request: Request) -> HealthResponse:
        service: ChatService = request.app.state.chat_service
        return HealthResponse(status="ok", knowledge_documents=request.app.state.document_count, llm_mode=service.provider.mode)

    @application.get("/api/suggestions", response_model=SuggestionsResponse, tags=["Chat"])
    async def suggestions() -> SuggestionsResponse:
        return SuggestionsResponse(suggestions=SUGGESTIONS)

    @application.get("/api/resume", response_model=ResumeStatusResponse, tags=["Resume"])
    async def resume_status(request: Request) -> ResumeStatusResponse:
        store: ResumeStore = request.app.state.resume_store
        return ResumeStatusResponse(**store.status())

    @application.get("/api/resume/files/{file_type}", tags=["Resume"])
    async def resume_file(file_type: str, request: Request) -> FileResponse:
        store: ResumeStore = request.app.state.resume_store
        try:
            path = store.file_path(file_type)
        except ResumeValidationError as exc:
            raise HTTPException(status_code=404, detail="Resume format not found.") from exc
        if not path.is_file():
            raise HTTPException(status_code=404, detail="Resume format not found.")
        media_type = "application/pdf" if file_type == "pdf" else "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
        disposition = "inline" if file_type == "pdf" else "attachment"
        return FileResponse(path, media_type=media_type, filename=path.name, content_disposition_type=disposition)

    @application.post("/api/admin/resume", response_model=ResumeStatusResponse, tags=["Resume"], summary="Owner-only resume upload and live RAG refresh")
    async def upload_resume(
        request: Request,
        pdf: UploadFile | None = File(default=None),
        docx: UploadFile | None = File(default=None),
        x_resume_admin_token: str | None = Header(default=None),
    ) -> ResumeStatusResponse:
        if not config.resume_admin_token:
            raise HTTPException(status_code=503, detail="Resume administration is not configured.")
        if not x_resume_admin_token or not secrets.compare_digest(x_resume_admin_token, config.resume_admin_token):
            raise HTTPException(status_code=401, detail="Invalid resume administration token.")
        if pdf and not (pdf.filename or "").lower().endswith(".pdf"):
            raise HTTPException(status_code=422, detail="The PDF field accepts only .pdf files.")
        if docx and not (docx.filename or "").lower().endswith(".docx"):
            raise HTTPException(status_code=422, detail="The DOCX field accepts only .docx files.")
        store: ResumeStore = request.app.state.resume_store
        try:
            pdf_upload = ResumeUpload(await pdf.read(), pdf.filename or "resume.pdf") if pdf else None
            docx_upload = ResumeUpload(await docx.read(), docx.filename or "resume.docx") if docx else None
            store.save(pdf_upload, docx_upload)
            request.app.state.chat_service, request.app.state.document_count = build_service(config, store)
            return ResumeStatusResponse(**store.status())
        except ResumeValidationError as exc:
            raise HTTPException(status_code=422, detail=str(exc)) from exc

    @application.post("/api/chat", response_model=ChatResponse, tags=["Chat"], summary="Ask a grounded question about Nagendra's professional profile")
    async def chat(payload: ChatRequest, request: Request) -> ChatResponse:
        client_ip = request.headers.get("x-forwarded-for", "").split(",")[0].strip() or (request.client.host if request.client else "unknown")
        if not request.app.state.rate_limiter.allow(client_ip):
            raise HTTPException(status_code=429, detail="Too many questions. Please wait before trying again.")
        service: ChatService = request.app.state.chat_service
        try:
            return await service.chat(payload.message, payload.conversation_id)
        except (httpx.HTTPError, KeyError, ValueError) as exc:
            raise HTTPException(status_code=502, detail="The AI provider is temporarily unavailable. Please retry shortly.") from exc

    return application


app = create_app()

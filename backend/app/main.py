from __future__ import annotations

from contextlib import asynccontextmanager
from pathlib import Path

import httpx
from fastapi import FastAPI, HTTPException, Request
from fastapi.middleware.cors import CORSMiddleware

from app.config import Settings, settings
from app.knowledge import load_knowledge
from app.providers import create_provider
from app.rate_limit import InMemoryRateLimiter
from app.retriever import FaissRetriever
from app.schemas import ChatRequest, ChatResponse, HealthResponse, SuggestionsResponse
from app.service import ChatService

SUGGESTIONS = [
    "What are Nagendra's strongest skills?",
    "Explain his LangGraph experience.",
    "Show his AWS experience.",
    "Tell me about his best GenAI project.",
    "What backend architecture experience does he have?",
    "Summarize Nagendra in 30 seconds.",
]


def build_service(config: Settings) -> tuple[ChatService, int]:
    data_dir = Path(__file__).resolve().parent.parent / "data"
    documents = load_knowledge(data_dir)
    service = ChatService(FaissRetriever(documents), create_provider(config), config.retrieval_top_k)
    return service, len(documents)


def create_app(config: Settings = settings) -> FastAPI:
    if "*" in config.allowed_origins:
        raise ValueError("ALLOWED_ORIGINS must contain explicit origins; wildcard CORS is not permitted.")

    @asynccontextmanager
    async def lifespan(application: FastAPI):
        application.state.chat_service, application.state.document_count = build_service(config)
        application.state.rate_limiter = InMemoryRateLimiter(config.chat_rate_limit, config.chat_rate_window_seconds)
        yield

    application = FastAPI(title="Nagendra Mule AI Resume API", description="Grounded RAG API over an approved professional portfolio knowledge base.", version="1.0.0", lifespan=lifespan)
    application.add_middleware(CORSMiddleware, allow_origins=list(config.allowed_origins), allow_credentials=False, allow_methods=["GET", "POST"], allow_headers=["Content-Type"])

    @application.get("/health", response_model=HealthResponse, tags=["Operations"])
    async def health(request: Request) -> HealthResponse:
        service: ChatService = request.app.state.chat_service
        return HealthResponse(status="ok", knowledge_documents=request.app.state.document_count, llm_mode=service.provider.mode)

    @application.get("/api/suggestions", response_model=SuggestionsResponse, tags=["Chat"])
    async def suggestions() -> SuggestionsResponse:
        return SuggestionsResponse(suggestions=SUGGESTIONS)

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

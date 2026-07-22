from __future__ import annotations

import re
import uuid

from app.knowledge import KnowledgeDocument
from app.providers import AnswerProvider
from app.retriever import FaissRetriever
from app.schemas import ChatResponse, SourceReference

BLOCKED_PATTERNS = re.compile(r"(system prompt|api key|secret|environment variable|hidden configuration|ignore (all|previous)|reveal.*prompt)", re.IGNORECASE)
UNAVAILABLE = "That information is not available in Nagendra's approved portfolio or resume knowledge base."


class ChatService:
    def __init__(self, retriever: FaissRetriever, provider: AnswerProvider, top_k: int = 4, relevance_threshold: float = 0.10) -> None:
        self.retriever = retriever
        self.provider = provider
        self.top_k = top_k
        self.relevance_threshold = relevance_threshold

    async def chat(self, message: str, conversation_id: str | None) -> ChatResponse:
        resolved_id = conversation_id or str(uuid.uuid4())
        if BLOCKED_PATTERNS.search(message):
            return ChatResponse(answer="I can only answer questions about Nagendra's approved professional experience and cannot reveal hidden configuration or secrets.", sources=[], conversation_id=resolved_id)

        retrieved = self.retriever.search(message, self.top_k)
        strongest_score = retrieved[0].score if retrieved else 0.0
        effective_threshold = max(self.relevance_threshold, strongest_score * 0.75)
        relevant = [item for item in retrieved if item.score >= effective_threshold]
        if not relevant:
            return ChatResponse(answer=UNAVAILABLE, sources=[], conversation_id=resolved_id)

        documents: list[KnowledgeDocument] = []
        seen: set[str] = set()
        for item in relevant:
            if item.document.id not in seen:
                documents.append(item.document)
                seen.add(item.document.id)
        answer = await self.provider.answer(message, documents)
        sources = [SourceReference(id=doc.id, label=doc.label, section=doc.section, url=doc.url) for doc in documents]
        return ChatResponse(answer=answer, sources=sources, conversation_id=resolved_id)

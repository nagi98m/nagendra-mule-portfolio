from __future__ import annotations

from pydantic import BaseModel, Field, field_validator


class ChatRequest(BaseModel):
    message: str = Field(min_length=2, max_length=800, description="A recruiter question about Nagendra's approved professional profile.")
    conversation_id: str | None = Field(default=None, max_length=80)

    @field_validator("message")
    @classmethod
    def normalize_message(cls, value: str) -> str:
        return " ".join(value.strip().split())


class SourceReference(BaseModel):
    id: str
    label: str
    section: str
    url: str | None = None


class ChatResponse(BaseModel):
    answer: str
    sources: list[SourceReference]
    conversation_id: str


class SuggestionsResponse(BaseModel):
    suggestions: list[str]


class HealthResponse(BaseModel):
    status: str
    knowledge_documents: int
    llm_mode: str


class ResumeStatusResponse(BaseModel):
    available: bool
    pdf_url: str | None = None
    docx_url: str | None = None
    updated_at: str | None = None
    knowledge_chunks: int = 0

from __future__ import annotations

import os
from dataclasses import dataclass

from dotenv import load_dotenv

load_dotenv()


def _as_int(name: str, default: int) -> int:
    try:
        return int(os.getenv(name, str(default)))
    except ValueError:
        return default


@dataclass(frozen=True)
class Settings:
    llm_api_key: str = os.getenv("LLM_API_KEY", "").strip()
    llm_model: str = os.getenv("LLM_MODEL", "").strip()
    llm_base_url: str = os.getenv("LLM_BASE_URL", "https://api.openai.com/v1").rstrip("/")
    llm_auth_header: str = os.getenv("LLM_AUTH_HEADER", "Authorization").strip()
    allowed_origins: tuple[str, ...] = tuple(origin.strip() for origin in os.getenv("ALLOWED_ORIGINS", "http://localhost:3000,http://127.0.0.1:3000").split(",") if origin.strip())
    retrieval_top_k: int = _as_int("RETRIEVAL_TOP_K", 4)
    chat_rate_limit: int = _as_int("CHAT_RATE_LIMIT", 12)
    chat_rate_window_seconds: int = _as_int("CHAT_RATE_WINDOW_SECONDS", 60)


settings = Settings()

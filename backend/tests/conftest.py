from __future__ import annotations

import sys
from pathlib import Path

import pytest
from fastapi.testclient import TestClient

BACKEND_ROOT = Path(__file__).resolve().parents[1]
sys.path.insert(0, str(BACKEND_ROOT))

from app.config import Settings  # noqa: E402
from app.main import create_app  # noqa: E402


@pytest.fixture
def client() -> TestClient:
    config = Settings(
        llm_api_key="",
        llm_model="",
        allowed_origins=("http://localhost:3000",),
        chat_rate_limit=100,
    )
    with TestClient(create_app(config)) as test_client:
        yield test_client

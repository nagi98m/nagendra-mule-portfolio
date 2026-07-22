from __future__ import annotations

from pathlib import Path

from app.knowledge import load_knowledge
from app.retriever import FaissRetriever


def test_retriever_returns_relevant_metadata() -> None:
    documents = load_knowledge(Path(__file__).resolve().parents[1] / "data")
    results = FaissRetriever(documents).search("AWS Connect Lex Lambda voice automation", top_k=3)
    assert results
    assert results[0].document.id == "ivacs-overview"
    assert results[0].document.metadata["project"] == "IVACS"
    assert results[0].document.url == "/projects/ivacs"

from __future__ import annotations

import hashlib
import math
import re
from dataclasses import dataclass

import faiss
import numpy as np

from app.knowledge import KnowledgeDocument

TOKEN_PATTERN = re.compile(r"[a-z0-9+#.]+")
STOP_WORDS = {"a", "an", "and", "are", "about", "does", "for", "has", "he", "his", "in", "is", "me", "mule", "nagendra", "of", "on", "s", "the", "tell", "to", "what", "which", "with", "worked"}
TOKEN_ALIASES = {"certifications": "certification", "databases": "database", "projects": "project", "skills": "skill", "summarize": "summary", "summarise": "summary", "strongest": "primary", "using": "uses"}
DOMAIN_TERMS = {"aws", "azure", "django", "faiss", "fastapi", "gcp", "langchain", "langgraph", "llm", "postgresql", "python", "rag"}


class HashingEmbedder:
    """Deterministic local embeddings for private, zero-cost retrieval."""

    def __init__(self, dimensions: int = 2048) -> None:
        self.dimensions = dimensions
        self.idf: dict[str, float] = {}

    def tokens(self, text: str) -> list[str]:
        return [TOKEN_ALIASES.get(token, token) for token in TOKEN_PATTERN.findall(text.lower()) if token not in STOP_WORDS]

    def fit(self, texts: list[str]) -> None:
        frequencies: dict[str, int] = {}
        for text in texts:
            for token in set(self.tokens(text)):
                frequencies[token] = frequencies.get(token, 0) + 1
        self.idf = {token: math.log((len(texts) + 1) / (frequency + 1)) + 1 for token, frequency in frequencies.items()}

    def embed(self, text: str) -> np.ndarray:
        vector = np.zeros(self.dimensions, dtype="float32")
        for token in self.tokens(text):
            digest = hashlib.blake2b(token.encode("utf-8"), digest_size=8).digest()
            index = int.from_bytes(digest, "little") % self.dimensions
            vector[index] += self.idf.get(token, 1.0)
        norm = np.linalg.norm(vector)
        if norm:
            vector /= norm
        return vector


@dataclass(frozen=True)
class RetrievedDocument:
    document: KnowledgeDocument
    score: float


class FaissRetriever:
    def __init__(self, documents: list[KnowledgeDocument], embedder: HashingEmbedder | None = None) -> None:
        self.documents = documents
        self.embedder = embedder or HashingEmbedder()
        document_texts = [f"{doc.label} {doc.section} {doc.text}" for doc in documents]
        self.embedder.fit(document_texts)
        matrix = np.vstack([self.embedder.embed(text) for text in document_texts])
        self.index = faiss.IndexFlatIP(self.embedder.dimensions)
        self.index.add(matrix)

    def search(self, query: str, top_k: int = 4) -> list[RetrievedDocument]:
        count = min(max(top_k, 1), len(self.documents))
        scores, indices = self.index.search(self.embedder.embed(query).reshape(1, -1), len(self.documents))
        query_tokens = set(self.embedder.tokens(query))
        def query_token_weight(token: str) -> float:
            return self.embedder.idf.get(token, 1.0) * (2.5 if token in DOMAIN_TERMS else 1.0)

        query_weight = sum(query_token_weight(token) for token in query_tokens) or 1.0
        reranked: list[RetrievedDocument] = []
        for cosine_score, index in zip(scores[0], indices[0], strict=True):
            if index < 0 or cosine_score <= 0:
                continue
            document = self.documents[int(index)]
            document_tokens = set(self.embedder.tokens(f"{document.label} {document.section} {document.text}"))
            overlapping_tokens = query_tokens & document_tokens
            # Hash collisions must never make a document relevant without a real
            # lexical match. Explicit aliases above cover the supported variants.
            if not overlapping_tokens:
                continue
            coverage = sum(query_token_weight(token) for token in overlapping_tokens) / query_weight
            hybrid_score = 0.35 * float(cosine_score) + 0.65 * coverage
            reranked.append(RetrievedDocument(document, hybrid_score))
        return sorted(reranked, key=lambda item: item.score, reverse=True)[:count]

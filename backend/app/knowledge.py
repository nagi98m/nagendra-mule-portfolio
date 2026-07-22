from __future__ import annotations

import json
from dataclasses import dataclass
from pathlib import Path
from typing import Any


@dataclass(frozen=True)
class KnowledgeDocument:
    id: str
    label: str
    section: str
    text: str
    url: str | None
    metadata: dict[str, Any]


def load_knowledge(data_dir: Path) -> list[KnowledgeDocument]:
    documents: list[KnowledgeDocument] = []
    for path in sorted(data_dir.rglob("*.json")):
        payload = json.loads(path.read_text(encoding="utf-8"))
        if not isinstance(payload, list):
            raise ValueError(f"Knowledge file must contain a list: {path.name}")
        for item in payload:
            documents.append(
                KnowledgeDocument(
                    id=str(item["id"]),
                    label=str(item["label"]),
                    section=str(item["section"]),
                    text=str(item["text"]).strip(),
                    url=item.get("url"),
                    metadata={**item.get("metadata", {}), "file_category": path.parent.name},
                )
            )
    if not documents:
        raise ValueError("No approved knowledge documents were found.")
    return documents

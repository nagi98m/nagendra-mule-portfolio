from __future__ import annotations

import argparse
import json
from dataclasses import asdict, dataclass
from pathlib import Path

from app.knowledge import load_knowledge
from app.retriever import FaissRetriever


@dataclass(frozen=True)
class EvaluationResult:
    total_cases: int
    supported_cases: int
    unsupported_cases: int
    hit_rate_at_4: float
    mean_reciprocal_rank: float
    unsupported_rejection_rate: float


def evaluate_retrieval(data_dir: Path, cases_path: Path) -> EvaluationResult:
    cases = json.loads(cases_path.read_text(encoding="utf-8"))
    retriever = FaissRetriever(load_knowledge(data_dir))
    supported_hits = 0
    reciprocal_rank_total = 0.0
    supported_cases = 0
    unsupported_cases = 0
    unsupported_rejections = 0

    for case in cases:
        expected_ids = set(case["expected_ids"])
        results = retriever.search(str(case["query"]), top_k=4)
        result_ids = [result.document.id for result in results]
        if not expected_ids:
            unsupported_cases += 1
            unsupported_rejections += int(not result_ids)
            continue
        supported_cases += 1
        first_match = next((index for index, document_id in enumerate(result_ids, start=1) if document_id in expected_ids), None)
        if first_match:
            supported_hits += 1
            reciprocal_rank_total += 1 / first_match

    return EvaluationResult(
        total_cases=len(cases),
        supported_cases=supported_cases,
        unsupported_cases=unsupported_cases,
        hit_rate_at_4=supported_hits / supported_cases if supported_cases else 0.0,
        mean_reciprocal_rank=reciprocal_rank_total / supported_cases if supported_cases else 0.0,
        unsupported_rejection_rate=unsupported_rejections / unsupported_cases if unsupported_cases else 1.0,
    )


def main() -> int:
    parser = argparse.ArgumentParser(description="Evaluate grounded resume retrieval without invoking a paid LLM.")
    parser.add_argument("--check", action="store_true", help="Fail when the committed quality thresholds are not met.")
    args = parser.parse_args()
    backend_root = Path(__file__).resolve().parents[1]
    result = evaluate_retrieval(backend_root / "data", backend_root / "evals" / "retrieval-cases.json")
    print(json.dumps(asdict(result), indent=2))
    if args.check and (result.hit_rate_at_4 < 0.90 or result.mean_reciprocal_rank < 0.75 or result.unsupported_rejection_rate < 1.0):
        return 1
    return 0


if __name__ == "__main__":
    raise SystemExit(main())

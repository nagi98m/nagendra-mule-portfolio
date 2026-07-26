from pathlib import Path

from app.evaluation import evaluate_retrieval


def test_committed_retrieval_evaluation_meets_quality_gate() -> None:
    backend_root = Path(__file__).resolve().parents[1]
    result = evaluate_retrieval(backend_root / "data", backend_root / "evals" / "retrieval-cases.json")
    assert result.total_cases == 15
    assert result.hit_rate_at_4 >= 0.90
    assert result.mean_reciprocal_rank >= 0.75
    assert result.unsupported_rejection_rate == 1.0

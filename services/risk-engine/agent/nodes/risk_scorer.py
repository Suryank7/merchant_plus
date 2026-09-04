"""
Agent Node 2: RISK SCORER

Calls the scoring engine to generate fraud exposure scores.

Provenance: 
- fraud-prediction-ml-model/app.py (model serving pattern)
- transaction-fraud-detection (XGBoost + SMOTE, ROC-AUC 0.982)
"""

from datetime import datetime
from app.scoring import (
    Transaction,
    calculate_risk_score,
    generate_risk_flags,
    BENCHMARKS,
)


def risk_scorer_node(state: dict) -> dict:
    """
    LangGraph Node 2: Scores merchant fraud/risk exposure.
    
    Uses the deterministic scoring algorithm from scoring.py,
    which is adapted from the XGBoost model evaluation metrics.
    """
    transactions_raw = state.get("transactions", [])
    business_type = state.get("business_type", "d2c_ecommerce")
    benchmark = BENCHMARKS.get(business_type, BENCHMARKS["default"])

    trace_entry = {
        "node": "RiskScorer",
        "timestamp": datetime.utcnow().isoformat(),
        "input": {"transaction_count": len(transactions_raw), "business_type": business_type},
    }

    try:
        # Convert raw dicts to Transaction models
        transactions = [Transaction(**t) for t in transactions_raw]

        # Calculate risk score
        risk = calculate_risk_score(transactions, benchmark)
        flags = generate_risk_flags(transactions)

        trace_entry["output"] = {
            "risk_score": risk.value,
            "risk_flags_count": len(flags),
            "justification": risk.justification,
        }
        trace_entry["status"] = "success"

        return {
            "risk_score": risk.model_dump(),
            "risk_flags": [f.model_dump() for f in flags],
            "agent_trace": [trace_entry],
        }

    except Exception as e:
        trace_entry["status"] = "error"
        trace_entry["error"] = str(e)

        return {
            "risk_score": {"value": 50, "weight": 0.30, "justification": f"Risk scoring failed: {e}. Neutral baseline assigned."},
            "risk_flags": [],
            "agent_trace": [trace_entry],
            "errors": [f"RiskScorer error: {e}"],
        }

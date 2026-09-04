"""
Agent Node 3: FUNNEL ANALYZER

Analyzes payment funnel health — success rates, failure reasons, 
checkout drop-off, and merchant segmentation.

Provenance: customer-segmentation-retail (K-Means clustering adapted)
"""

from datetime import datetime
from app.scoring import (
    Transaction,
    calculate_conversion_score,
    calculate_cost_efficiency_score,
    calculate_growth_headroom_score,
    segment_merchant,
    BENCHMARKS,
)


def funnel_analyzer_node(state: dict) -> dict:
    """
    LangGraph Node 3: Deep-dive into payment funnel health.
    """
    transactions_raw = state.get("transactions", [])
    business_type = state.get("business_type", "d2c_ecommerce")
    benchmark = BENCHMARKS.get(business_type, BENCHMARKS["default"])

    trace_entry = {
        "node": "FunnelAnalyzer",
        "timestamp": datetime.utcnow().isoformat(),
        "input": {"transaction_count": len(transactions_raw)},
    }

    try:
        transactions = [Transaction(**t) for t in transactions_raw]

        # Sub-scores
        conversion = calculate_conversion_score(transactions, benchmark)
        cost = calculate_cost_efficiency_score(transactions)
        growth = calculate_growth_headroom_score(transactions)

        # Segment
        segment = segment_merchant(transactions)

        # Failure breakdown by reason
        failed = [t for t in transactions if t.status == "failed"]
        failure_reasons: dict[str, dict] = {}
        for t in failed:
            code = t.error_code or "unknown"
            if code not in failure_reasons:
                failure_reasons[code] = {"count": 0, "total_amount": 0}
            failure_reasons[code]["count"] += 1
            failure_reasons[code]["total_amount"] += t.amount

        # Payment method distribution
        method_dist: dict[str, int] = {}
        for t in transactions:
            method_dist[t.method] = method_dist.get(t.method, 0) + 1

        funnel_analysis = {
            "conversion_score": conversion.model_dump(),
            "cost_efficiency_score": cost.model_dump(),
            "growth_headroom_score": growth.model_dump(),
            "payment_method_distribution": method_dist,
            "failure_reasons": failure_reasons,
            "top_failure_reason": max(failure_reasons, key=lambda k: failure_reasons[k]["count"]) if failure_reasons else None,
        }

        trace_entry["output"] = {
            "conversion": conversion.value,
            "cost_efficiency": cost.value,
            "growth_headroom": growth.value,
            "segment": segment,
            "failure_reasons_count": len(failure_reasons),
        }
        trace_entry["status"] = "success"

        return {
            "funnel_analysis": funnel_analysis,
            "failure_breakdown": failure_reasons,
            "merchant_segment": segment,
            "agent_trace": [trace_entry],
        }

    except Exception as e:
        trace_entry["status"] = "error"
        trace_entry["error"] = str(e)

        return {
            "funnel_analysis": {},
            "failure_breakdown": {},
            "merchant_segment": "unknown",
            "agent_trace": [trace_entry],
            "errors": [f"FunnelAnalyzer error: {e}"],
        }

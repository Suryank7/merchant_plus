"""
Agent Node 4: GROWTH RECOMMENDER — The Agentic Decision-Making Step

THIS is the node that makes MerchantPulse AI genuinely agentic, not a fancy if/else chain.

It autonomously:
1. Weighs competing interventions against each other using actual data
2. Explains WHY it deprioritized an option
3. Adapts reasoning based on merchant segment

Provenance: startup-blueprint-agent (structured business artifacts, not free-text)

Uses Claude Sonnet for autonomous reasoning — the LLM doesn't generate the scores
(those are deterministic math), it generates the REASONING about intervention priority.
"""

import os
import json
from datetime import datetime


GROWTH_RECOMMENDER_SYSTEM_PROMPT = """You are MerchantPulse AI's Growth Recommender — an expert Razorpay merchant success advisor.

You are given structured data about a merchant's payment health (scores, failures, method mix, segment).
Your job is to produce a RANKED list of growth interventions with JUSTIFIED reasoning.

CRITICAL RULES:
1. Every recommendation must cite specific numbers from the data provided.
2. You must explain WHY you ranked each action where you did — not just what it does.
3. You must explain WHY you DEPRIORITIZED lower-ranked actions — what makes them less impactful for THIS specific merchant.
4. Estimate revenue impact in INR using the actual transaction data, not invented numbers.
5. Consider the merchant's segment when recommending — an early_stage merchant has different needs than enterprise_high_ticket.
6. Never recommend more than 5 actions — focus creates value, not lists.
7. Output valid JSON only. No markdown, no explanation outside the JSON structure.

OUTPUT FORMAT (strict JSON):
{
  "reasoning_chain": "Step-by-step explanation of how you prioritized these actions for THIS merchant",
  "actions": [
    {
      "rank": 1,
      "action": "Short action title",
      "category": "conversion|cost_optimization|risk_mitigation|growth",
      "estimated_monthly_recovery_inr": 47000,
      "effort": "low|medium|high",
      "reasoning": "Why this is ranked #1 for THIS merchant, with specific data references",
      "deprioritization_note": null
    }
  ],
  "deprioritized": [
    {
      "action": "Something not recommended",
      "reason": "Why this was excluded for THIS merchant"
    }
  ]
}"""


def growth_recommender_node(state: dict) -> dict:
    """
    LangGraph Node 4: Autonomous growth recommendation with justified prioritization.
    
    Uses Claude Sonnet for reasoning, but ALL numbers come from deterministic scoring.
    The LLM reasons about priority, it doesn't invent data.
    """
    risk_score = state.get("risk_score", {})
    funnel = state.get("funnel_analysis", {})
    segment = state.get("merchant_segment", "unknown")
    summary = state.get("raw_data_summary", {})
    failure_breakdown = state.get("failure_breakdown", {})
    transactions_raw = state.get("transactions", [])

    trace_entry = {
        "node": "GrowthRecommender",
        "timestamp": datetime.utcnow().isoformat(),
        "input": {
            "segment": segment,
            "risk_value": risk_score.get("value", "N/A"),
            "conversion_value": funnel.get("conversion_score", {}).get("value", "N/A"),
        },
    }

    # Build context for the LLM
    context = {
        "merchant_segment": segment,
        "risk_score": risk_score,
        "conversion_score": funnel.get("conversion_score", {}),
        "cost_efficiency_score": funnel.get("cost_efficiency_score", {}),
        "growth_headroom_score": funnel.get("growth_headroom_score", {}),
        "payment_method_distribution": funnel.get("payment_method_distribution", {}),
        "failure_reasons": failure_breakdown,
        "transaction_summary": summary,
    }

    api_key = os.getenv("ANTHROPIC_API_KEY")

    if api_key:
        try:
            import anthropic
            client = anthropic.Anthropic(api_key=api_key)

            response = client.messages.create(
                model="claude-sonnet-4-20250514",
                max_tokens=1500,
                system=GROWTH_RECOMMENDER_SYSTEM_PROMPT,
                messages=[{
                    "role": "user",
                    "content": f"Analyze this merchant's payment data and produce ranked growth recommendations:\n\n{json.dumps(context, indent=2, default=str)}",
                }],
            )

            text = response.content[0].text.strip()
            
            # Parse JSON from response (handle potential markdown wrapping)
            if text.startswith("```"):
                text = text.split("```")[1]
                if text.startswith("json"):
                    text = text[4:]
                text = text.strip()

            result = json.loads(text)
            
            trace_entry["output"] = {
                "actions_count": len(result.get("actions", [])),
                "reasoning_chain": result.get("reasoning_chain", "")[:200],
                "source": "claude_sonnet",
            }
            trace_entry["status"] = "success"

            return {
                "recommended_actions": result.get("actions", []),
                "growth_reasoning": result.get("reasoning_chain", ""),
                "agent_trace": [trace_entry],
            }

        except Exception as e:
            print(f"[GrowthRecommender] Claude API failed: {e}, using rule-based fallback")
            trace_entry["fallback_reason"] = str(e)

    # ============================================
    # FALLBACK: Rule-based recommendations
    # (same as scoring.py but with reasoning)
    # ============================================
    actions = _generate_fallback_recommendations(
        risk_score, funnel, segment, summary, failure_breakdown, transactions_raw
    )

    trace_entry["output"] = {
        "actions_count": len(actions),
        "source": "rule_based_fallback",
    }
    trace_entry["status"] = "success_fallback"

    return {
        "recommended_actions": actions,
        "growth_reasoning": "Rule-based recommendations (Claude API unavailable). Actions are ranked by estimated revenue recovery.",
        "agent_trace": [trace_entry],
    }


def _generate_fallback_recommendations(
    risk_score, funnel, segment, summary, failure_breakdown, transactions_raw
) -> list[dict]:
    """Rule-based fallback when Claude is unavailable."""
    from app.scoring import (
        Transaction, SubScore,
        generate_recommended_actions,
        BENCHMARKS,
    )

    try:
        transactions = [Transaction(**t) for t in transactions_raw]
        risk = SubScore(**risk_score) if risk_score else SubScore(value=50, weight=0.30, justification="N/A")
        conv = SubScore(**funnel.get("conversion_score", {"value": 50, "weight": 0.30, "justification": "N/A"}))
        cost = SubScore(**funnel.get("cost_efficiency_score", {"value": 50, "weight": 0.20, "justification": "N/A"}))
        growth = SubScore(**funnel.get("growth_headroom_score", {"value": 50, "weight": 0.20, "justification": "N/A"}))

        return generate_recommended_actions(risk, conv, cost, growth, transactions, segment or "unknown")
    except Exception:
        return [{
            "rank": 1,
            "action": "Review payment configuration",
            "estimated_monthly_recovery": 0,
            "effort": "low",
            "category": "general",
            "reasoning": "Unable to generate specific recommendations. Please review your Razorpay dashboard for optimization opportunities.",
        }]

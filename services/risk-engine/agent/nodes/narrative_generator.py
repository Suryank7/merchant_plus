"""
Agent Node 5: NARRATIVE GENERATOR

Generates the human-readable "Growth Brief" from structured scoring data.

Provenance: credex_task/src/app/api/audit/route.ts
Same Claude Sonnet pattern as StackAudit's CFO summary generation.
"""

import os
import json
from datetime import datetime


NARRATIVE_SYSTEM_PROMPT = """You are MerchantPulse AI's Growth Analyst. You write concise, actionable payment health reports for Razorpay merchants.

RULES:
- Write exactly 150-250 words. No more.
- Be direct and use specific numbers from the data provided.
- Start with the overall MerchantPulseScore and what it means.
- Highlight the #1 priority action and its estimated revenue impact.
- Use payments terminology: "payment success rate", "MDR optimization", "checkout conversion", "retry logic", "payment method mix".
- End with a clear, encouraging call to action.
- Sound like a sharp payment analytics advisor, not a chatbot.
- Never use generic filler phrases like "in today's landscape" or "it's important to note"."""


def generate_fallback_brief(score: int, segment: str, summary: dict, actions: list) -> str:
    """Fallback when Claude API is unavailable. Same pattern as StackAudit's fallback."""
    success_rate = summary.get("success_rate", 0)
    total_volume = summary.get("total_volume", 0)
    
    top_action = actions[0] if actions else None
    top_action_text = ""
    if top_action:
        recovery = top_action.get("estimated_monthly_recovery", 0) or top_action.get("estimated_monthly_recovery_inr", 0)
        top_action_text = (
            f"Your top priority: {top_action.get('action', 'Review configuration')}. "
            f"Estimated monthly impact: ₹{recovery:,}. "
        )

    if score >= 80:
        return (
            f"Your MerchantPulseScore is {score}/100 — your payment stack is performing well. "
            f"With a {success_rate}% success rate across ₹{total_volume:,.0f} in volume, "
            f"you're above the industry benchmark. "
            f"{top_action_text}"
            f"Focus on maintaining this performance and exploring growth channels."
        )
    elif score >= 60:
        return (
            f"Your MerchantPulseScore is {score}/100 — solid but with clear room for improvement. "
            f"Your {success_rate}% success rate leaves revenue on the table. "
            f"{top_action_text}"
            f"Implementing the recommended actions could significantly boost your monthly revenue."
        )
    else:
        return (
            f"Your MerchantPulseScore is {score}/100 — immediate attention needed. "
            f"With a {success_rate}% success rate, you're losing significant revenue to payment failures. "
            f"{top_action_text}"
            f"Prioritize the top 2 recommended actions this week to see rapid improvement."
        )


def narrative_generator_node(state: dict) -> dict:
    """
    LangGraph Node 5: Generates the merchant-readable Growth Brief.
    
    Same Claude integration pattern as StackAudit's CFO summary.
    """
    risk_score = state.get("risk_score", {})
    funnel = state.get("funnel_analysis", {})
    segment = state.get("merchant_segment", "unknown")
    summary = state.get("raw_data_summary", {})
    actions = state.get("recommended_actions", [])
    reasoning = state.get("growth_reasoning", "")

    trace_entry = {
        "node": "NarrativeGenerator",
        "timestamp": datetime.utcnow().isoformat(),
    }

    # Calculate composite score
    risk_val = risk_score.get("value", 50)
    conv_val = funnel.get("conversion_score", {}).get("value", 50)
    cost_val = funnel.get("cost_efficiency_score", {}).get("value", 50)
    growth_val = funnel.get("growth_headroom_score", {}).get("value", 50)

    composite = round(
        risk_val * 0.30 + conv_val * 0.30 + cost_val * 0.20 + growth_val * 0.20
    )
    composite = max(0, min(100, composite))

    score_breakdown = {
        "risk": risk_score,
        "conversion": funnel.get("conversion_score", {}),
        "cost_efficiency": funnel.get("cost_efficiency_score", {}),
        "growth_headroom": funnel.get("growth_headroom_score", {}),
    }

    # Try Claude first
    api_key = os.getenv("ANTHROPIC_API_KEY")
    brief = None

    if api_key:
        try:
            import anthropic
            client = anthropic.Anthropic(api_key=api_key)

            context = {
                "merchant_pulse_score": composite,
                "segment": segment,
                "score_breakdown": score_breakdown,
                "transaction_summary": summary,
                "top_actions": actions[:3],
                "growth_reasoning": reasoning[:500],
            }

            response = client.messages.create(
                model="claude-sonnet-4-20250514",
                max_tokens=500,
                system=NARRATIVE_SYSTEM_PROMPT,
                messages=[{
                    "role": "user",
                    "content": f"Write a Growth Brief for this merchant:\n\n{json.dumps(context, indent=2, default=str)}",
                }],
            )

            brief = response.content[0].text.strip()
            trace_entry["source"] = "claude_sonnet"
            trace_entry["status"] = "success"

        except Exception as e:
            print(f"[NarrativeGenerator] Claude API failed: {e}")
            trace_entry["fallback_reason"] = str(e)

    if not brief:
        brief = generate_fallback_brief(composite, segment, summary, actions)
        trace_entry["source"] = "template_fallback"
        trace_entry["status"] = "success_fallback"

    trace_entry["output"] = {"score": composite, "brief_length": len(brief)}

    return {
        "growth_brief": brief,
        "merchant_pulse_score": composite,
        "score_breakdown": score_breakdown,
        "agent_trace": [trace_entry],
    }

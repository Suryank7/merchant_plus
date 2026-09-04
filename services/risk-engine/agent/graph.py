"""
MerchantPulse AI — LangGraph Growth Agent

5-node agentic pipeline that autonomously audits merchant payment health.

Provenance: auto_stream_agent/src/agent.py
Adapted from the AutoStream StateGraph pattern:
- Same StateGraph architecture
- Same conditional edge pattern
- Swapped domain: SaaS RAG → Payment Health Analysis

Node Pipeline:
  DataHarvester → RiskScorer → FunnelAnalyzer → GrowthRecommender → NarrativeGenerator
"""

import json
from datetime import datetime
from pydantic import BaseModel, Field
from typing import Optional
from fastapi import APIRouter

from langgraph.graph import StateGraph, END
from agent.state import AgentState
from agent.nodes.data_harvester import data_harvester_node
from agent.nodes.risk_scorer import risk_scorer_node
from agent.nodes.funnel_analyzer import funnel_analyzer_node
from agent.nodes.growth_recommender import growth_recommender_node
from agent.nodes.narrative_generator import narrative_generator_node


# ============================================
# Build the LangGraph State Machine
# ============================================

def build_growth_agent() -> StateGraph:
    """
    Constructs the 5-node LangGraph agent.
    
    This is a LINEAR pipeline (not a loop) because each audit
    is a single pass through the nodes. The "agentic" part is
    Node 4 (GrowthRecommender), which makes autonomous reasoning
    decisions about intervention priority.
    
    For the cyclic/loop pattern (like auto_stream_agent's lead capture),
    see the optional conversational follow-up mode.
    """
    workflow = StateGraph(AgentState)

    # Add all 5 nodes
    workflow.add_node("data_harvester", data_harvester_node)
    workflow.add_node("risk_scorer", risk_scorer_node)
    workflow.add_node("funnel_analyzer", funnel_analyzer_node)
    workflow.add_node("growth_recommender", growth_recommender_node)
    workflow.add_node("narrative_generator", narrative_generator_node)

    # Linear pipeline: each node feeds into the next
    workflow.set_entry_point("data_harvester")
    workflow.add_edge("data_harvester", "risk_scorer")
    workflow.add_edge("risk_scorer", "funnel_analyzer")
    workflow.add_edge("funnel_analyzer", "growth_recommender")
    workflow.add_edge("growth_recommender", "narrative_generator")
    workflow.add_edge("narrative_generator", END)

    return workflow.compile()


# Singleton agent instance
growth_agent = build_growth_agent()


# ============================================
# FastAPI Router for Agent Execution
# ============================================

router = APIRouter()


class AgentRequest(BaseModel):
    """Request to run the full growth agent pipeline."""
    razorpay_key_id: str = ""
    razorpay_key_secret: str = ""
    business_type: str = "d2c_ecommerce"
    analysis_period_days: int = 90


class AgentResponse(BaseModel):
    """Complete agent pipeline response."""
    merchant_pulse_score: int
    score_breakdown: dict
    recommended_actions: list
    growth_brief: str
    merchant_segment: str
    risk_flags: list
    transaction_summary: dict
    agent_trace: list
    growth_reasoning: str


@router.post("/run-agent", response_model=AgentResponse)
async def run_growth_agent(request: AgentRequest):
    """
    Execute the full 5-node growth agent pipeline.
    
    This is the main endpoint that orchestrates:
    1. Data fetching from Razorpay (or mock data)
    2. Risk scoring via XGBoost-inspired algorithms
    3. Payment funnel analysis
    4. Autonomous growth recommendations (Claude-powered)
    5. Narrative brief generation
    
    Every step is logged in the agent_trace for full transparency.
    """
    # Initialize agent state
    initial_state: AgentState = {
        "razorpay_key_id": request.razorpay_key_id,
        "razorpay_key_secret": request.razorpay_key_secret,
        "business_type": request.business_type,
        "analysis_period_days": request.analysis_period_days,
        "transactions": None,
        "raw_data_summary": None,
        "risk_score": None,
        "risk_flags": None,
        "funnel_analysis": None,
        "failure_breakdown": None,
        "merchant_segment": None,
        "recommended_actions": None,
        "growth_reasoning": None,
        "growth_brief": None,
        "merchant_pulse_score": None,
        "score_breakdown": None,
        "agent_trace": [],
        "errors": None,
    }

    # Run the agent pipeline
    try:
        final_state = growth_agent.invoke(initial_state)
    except Exception as e:
        # Robustness: return partial results on failure
        return AgentResponse(
            merchant_pulse_score=0,
            score_breakdown={},
            recommended_actions=[],
            growth_brief=f"Agent pipeline failed: {str(e)}. Please try again.",
            merchant_segment="unknown",
            risk_flags=[],
            transaction_summary={},
            agent_trace=[{
                "node": "pipeline",
                "status": "error",
                "error": str(e),
                "timestamp": datetime.utcnow().isoformat(),
            }],
            growth_reasoning="",
        )

    return AgentResponse(
        merchant_pulse_score=final_state.get("merchant_pulse_score", 0),
        score_breakdown=final_state.get("score_breakdown", {}),
        recommended_actions=final_state.get("recommended_actions", []),
        growth_brief=final_state.get("growth_brief", ""),
        merchant_segment=final_state.get("merchant_segment", "unknown"),
        risk_flags=final_state.get("risk_flags", []),
        transaction_summary=final_state.get("raw_data_summary", {}),
        agent_trace=final_state.get("agent_trace", []),
        growth_reasoning=final_state.get("growth_reasoning", ""),
    )

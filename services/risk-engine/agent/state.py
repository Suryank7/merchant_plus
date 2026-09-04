"""
MerchantPulse AI — Agent State Definition

Provenance: auto_stream_agent/src/state.py
Adapted from AgentState TypedDict for AutoStream → Payment Health Agent.
"""

from typing import TypedDict, Optional, Annotated
from operator import add


class AgentState(TypedDict):
    """
    State that flows through the 5-node LangGraph pipeline.
    
    Each node reads from and writes to this shared state,
    enabling the agent to build up context progressively.
    """
    # Input
    razorpay_key_id: str
    razorpay_key_secret: str
    business_type: str
    analysis_period_days: int

    # Node 1: DataHarvester output
    transactions: Optional[list[dict]]
    raw_data_summary: Optional[dict]

    # Node 2: RiskScorer output
    risk_score: Optional[dict]
    risk_flags: Optional[list[dict]]

    # Node 3: FunnelAnalyzer output
    funnel_analysis: Optional[dict]
    failure_breakdown: Optional[dict]
    merchant_segment: Optional[str]

    # Node 4: GrowthRecommender output
    recommended_actions: Optional[list[dict]]
    growth_reasoning: Optional[str]

    # Node 5: NarrativeGenerator output
    growth_brief: Optional[str]
    merchant_pulse_score: Optional[int]
    score_breakdown: Optional[dict]

    # Agent trace (transparency requirement)
    agent_trace: Annotated[list[dict], add]

    # Error handling
    errors: Optional[list[str]]

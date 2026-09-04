"""
MerchantPulse AI — Risk Engine (FastAPI)
Serves fraud scoring, merchant segmentation, and the LangGraph growth agent.

Provenance:
- Fraud model pattern: fraud-prediction-ml-model/app.py (Streamlit → FastAPI)
- XGBoost + SMOTE model: transaction-fraud-detection/week4.ipynb
- Agent pattern: auto_stream_agent/src/agent.py (LangGraph StateGraph)
"""

import os
from contextlib import asynccontextmanager
from dotenv import load_dotenv

load_dotenv()

from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware

from app.scoring import router as scoring_router
from agent.graph import router as agent_router


@asynccontextmanager
async def lifespan(app: FastAPI):
    """Startup/shutdown lifecycle."""
    print("[MerchantPulse] Risk Engine starting...")
    yield
    print("[MerchantPulse] Risk Engine shutting down.")


app = FastAPI(
    title="MerchantPulse AI — Risk Engine",
    description="Fraud scoring, merchant segmentation, and agentic growth analysis",
    version="1.0.0",
    lifespan=lifespan,
)

# CORS — allow Next.js frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000",
        "https://*.vercel.app",
        os.getenv("FRONTEND_URL", "http://localhost:3000"),
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(scoring_router, prefix="/api", tags=["Scoring"])
app.include_router(agent_router, prefix="/api", tags=["Agent"])


@app.get("/health")
async def health_check():
    return {
        "status": "healthy",
        "service": "merchantpulse-risk-engine",
        "version": "1.0.0",
    }

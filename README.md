# ⚡ MerchantPulse · AI

<div align="center">

### Autonomous Payment Health & Risk Copilot for Razorpay Merchants
**Razorpay AI Buildathon 2026 — AI Growth & Agentic Commerce Track**

[![Next.js](https://img.shields.io/badge/Next.js-16.3.4-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19.2.8-61DAFB?style=for-the-badge&logo=react)](https://react.dev/)
[![FastAPI](https://img.shields.io/badge/FastAPI-0.115+-009688?style=for-the-badge&logo=fastapi)](https://fastapi.tiangolo.com/)
[![LangGraph](https://img.shields.io/badge/LangGraph-StateGraph-FF6F00?style=for-the-badge)](https://langchain-ai.github.io/langgraph/)
[![Claude 3.5 Sonnet](https://img.shields.io/badge/Claude-3.5_Sonnet-D97706?style=for-the-badge&logo=anthropic)](https://www.anthropic.com/)
[![XGBoost](https://img.shields.io/badge/XGBoost-ROC--AUC_0.982-EB5424?style=for-the-badge)](https://xgboost.readthedocs.io/)
[![Design](https://img.shields.io/badge/UI_Design-MindMasters_Theme-00F2FF?style=for-the-badge)](https://www.mindmastersai.services/)

</div>

---

## 🎯 Executive Overview

**MerchantPulse AI** is an intelligent, agentic copilot engineered for Razorpay's Merchant Success, Risk Operations, and Growth teams. It condenses multi-hour manual merchant audits into a **sub-30-second continuous agentic workflow**.

By streaming and normalizing payment transactions across **UPI, Credit/Debit Cards, Netbanking, and Wallets**, MerchantPulse AI:
1. **Computes an Explainable MerchantPulse Score (0–100)** across 4 mathematically calibrated pillars.
2. **Detects Fraud & Anomaly Risks** with supervised XGBoost feature importances and Z-score outlier isolation ($Z > 2.8\sigma$).
3. **Uncovers Hidden MDR Fee Leakage** on sub-₹2,000 credit/debit card transactions eligible for RBI zero-MDR UPI routing.
4. **Executes a 5-Node LangGraph Agent Pipeline** that autonomously triages competing growth interventions by Expected ROI.
5. **Synthesizes CFO-Grade Growth Briefs** powered by Claude 3.5 Sonnet with deterministic fallback.

---

## 🏛️ Provenance: 7 Specialized Repositories Synthesized

MerchantPulse AI represents a unified synthesis of 7 open-source repositories:

```
                  ┌───────────────────────────────────────────────┐
                  │              MerchantPulse · AI               │
                  │    (Razorpay AI Growth & Agentic Commerce)    │
                  └───────────────────────┬───────────────────────┘
                                          │
       ┌──────────────────┬───────────────┴───────────────┬──────────────────┐
       │                  │                               │                  │
┌──────┴─────────┐ ┌──────┴─────────┐           ┌─────────┴────────┐ ┌───────┴────────┐
│  credex_task   │ │  auto_stream_  │           │   transaction-   │ │  customer-     │
│  (StackAudit)  │ │     agent      │           │ fraud-detection  │ │  segmentation- │
│ Glassmorphic   │ │ 5-Node State-  │           │ Supervised ML    │ │     retail     │
│ UI & XAI Math  │ │ Graph Pipeline │           │ ROC-AUC 0.982    │ │ K-Means Cohort │
└────────────────┘ └────────────────┘           └──────────────────┘ └────────────────┘
       │                  │                               │                  │
┌──────┴─────────┐ ┌──────┴─────────┐           ┌─────────┴────────┐         │
│ ctgan-fraud-   │ │ fraud-predict- │           │ startup-         │         │
│   detection    │ │   ion-ml-model │           │ blueprint-agent  │         │
│ Synthetic Data │ │ FastAPI Engine │           │ Multi-Step Plan  │         │
└────────────────┘ └────────────────┘           └──────────────────┘         │
```

| # | Cloned Repository | Applied Architecture in MerchantPulse AI |
|---|---|---|
| 1 | **`credex_task` (StackAudit)** | Dark glassmorphic dashboard, deterministic composite scoring formula, CFO brief LLM generation pattern, Vitest rigor. |
| 2 | **`transaction-fraud-detection`** | Supervised XGBoost + SMOTE model ($0.982$ ROC-AUC) feature weights powering the fraud anomaly sub-score. |
| 3 | **`auto_stream_agent`** | LangGraph StateGraph pipeline, TypedDict state machine, sequential node execution, and telemetry logging. |
| 4 | **`ctgan-fraud-detection`** | CTGAN synthetic tabular data generator addressing imbalanced fraud distribution edge cases. |
| 5 | **`fraud-prediction-ml-model`** | High-performance FastAPI microservice architecture (ported from Streamlit prototype to production FastAPI). |
| 6 | **`customer-segmentation-retail`** | K-Means clustering logic adapted from retail customers to merchant transaction health profiles. |
| 7 | **`startup-blueprint-agent`** | Autonomous multi-step decision reasoning frameworks converted into actionable payment growth interventions. |

---

## 📐 Scoring Formula & XAI Determinism

The **MerchantPulse Score** is computed using transparent, deterministic math:

$$\text{MerchantPulse Score} = 0.30 \cdot S_{\text{risk}} + 0.30 \cdot S_{\text{conversion}} + 0.20 \cdot S_{\text{cost}} + 0.20 \cdot S_{\text{growth}}$$

- **$S_{\text{risk}}$ (Fraud & Anomaly Exposure)**:
  $$S_{\text{risk}} = \max\left(0, \text{round}\left(100 \times \left(1 - \min\left(1.0, \frac{\text{anomaly\_rate}}{\text{threshold}}\right)\right)\right)\right)$$
  Inverted so $100$ represents zero fraud risk. Every flagged outlier transaction includes an exact Z-score deviation explanation.
- **$S_{\text{conversion}}$ (Payment Success Rate)**: Benchmarked against industry peer standards (D2C: 95%, B2B SaaS: 97%, Quick Commerce: 98%, EdTech: 96%).
- **$S_{\text{cost}}$ (MDR & Interchange Efficiency)**: Quantifies avoidable card processing fees on sub-₹2,000 transactions eligible for 0% UPI MDR.
- **$S_{\text{growth}}$ (Recoverable Drop-Offs)**: Quantifies revenue recoverable by enabling Razorpay Smart Intent & automated retries:
  $$\text{Recoverable INR} = \sum \text{Amount}_{\text{failed}} \times 0.50$$

---

## 🤖 5-Node LangGraph Agent Pipeline

```
[Node 1: Payment Harvester] ➔ [Node 2: Risk Scorer] ➔ [Node 3: Funnel Analyzer]
                                                             │
[Node 5: Narrative Synthesizer] 🠔 [Node 4: Growth Recommender (Decision Core)]
```

1. **Payment Harvester**: Normalizes raw Razorpay API transaction streams across UPI, Cards, Netbanking, and Wallets.
2. **Risk Scorer**: Evaluates statistical anomalies, high-value refunds, and chargeback signals using XGBoost feature importances.
3. **Funnel Analyzer**: Dissects checkout drop-offs by payment rail, bank server downtime, and OTP friction.
4. **Growth Recommender (The Agentic Core)**: Autonomously triages competing interventions using expected value:
   $$\text{Priority Rank} = \frac{\text{Estimated Monthly Recovery} \times \text{Confidence}}{\text{Implementation Effort}}$$
5. **Narrative Synthesizer**: Compiles the final executive Growth Brief with Claude 3.5 Sonnet (with deterministic fallback).

---

## 🎨 UI & Design System

The frontend is modeled directly on the design system of **[MindMasters AI](https://www.mindmastersai.services/)**:
- **Void Black Background**: `#06070b` and `#08090c`.
- **Electric Accents**: `#74f5ff` (Electric Cyan), `#5b8cff` (Electric Indigo), `#a78bfa` (Electric Violet).
- **Floating Tilted Glass Capsules**: Tilted capsule shapes with gradient fills and blur (`rotate(-4deg)`, `rotate(-28deg)`).
- **Glassmorphic Pill Header**: Floating central navigation pill with glossy borders.
- **Glossy Pill Buttons**: `btn-shiny-pill` with top-to-bottom dark gradient and glossy inset highlight.
- **Interactive Telemetry Cockpit**: Circular SVG radial gauge, live metrics, and real-time intervention simulations.

---

## 🚀 Quick Start Guide

### Prerequisites
- Node.js 18+ (tested on Node 20 / 22)
- Python 3.10+ (tested on Python 3.13.3)
- npm or yarn

### 1-Click Launch (Windows)
Double click or run:
```cmd
run-demo.bat
```

### Manual Launch

#### Terminal 1: Next.js Frontend
```bash
# In merchantpulse-ai/
npm install
npm run dev
```
Open **[http://localhost:3000](http://localhost:3000)** in your browser.

#### Terminal 2: FastAPI Risk Engine
```bash
cd services/risk-engine
pip install -r requirements.txt
uvicorn main:app --reload --port 8000
```
API Documentation (Swagger): **[http://localhost:8000/docs](http://localhost:8000/docs)**.

#### Run PyTest Suite
```bash
cd services/risk-engine
pytest -v
```
Output:
```
tests/test_scoring.py .................. [100%]
============================== 18 passed in 0.66s ==============================
```

---

## 🏬 Demo Presets Included

The UI provides instant 1-click presets representing real Indian commerce merchant profiles:
1. **Bombay Threads (D2C Apparel)**: ₹18.4L GMV, card MDR fee leakage on sub-₹2k orders.
2. **ApexScale AI (B2B SaaS)**: ₹64.2L GMV, cross-border 3DS authentication failure spikes.
3. **ZippyCart (10-Min Hyperlocal)**: ₹34.8L GMV, 94% UPI volume, zero-MDR optimization.
4. **Vidyapeeth Pro (EdTech)**: ₹45.0L GMV, installment limit drops and no-cost EMI headroom.

---

## 📁 Project Structure

```
merchantpulse-ai/
├── README.md                      # Primary documentation & architecture guide
├── ARCHITECTURE.md                # System design & mathematical proofs
├── API_DOCS.md                    # REST API specifications
├── PROVENANCE.md                  # Synthesis documentation of 7 repositories
├── run-demo.bat                   # 1-click Windows demo launcher
├── package.json                   # Next.js 16 + React 19 dependencies
├── tsconfig.json                  # TypeScript strict configuration
├── services/
│   └── risk-engine/               # Python FastAPI Microservice
│       ├── main.py                # FastAPI entry point & routers
│       ├── requirements.txt       # Python 3.13 compatible dependencies
│       ├── pytest.ini             # PyTest root configuration
│       ├── app/
│       │   └── scoring.py         # Deterministic XAI scoring engine
│       ├── agent/                 # LangGraph 5-Node Agent
│       │   ├── graph.py           # StateGraph state machine
│       │   ├── state.py           # TypedDict AgentState
│       │   └── nodes/             # 5 autonomous processing nodes
│       └── tests/
│           └── test_scoring.py    # 18 PyTest unit tests
└── src/
    ├── app/
    │   ├── layout.tsx             # Root layout with Inter font & dark theme
    │   ├── page.tsx               # Main dashboard orchestrator
    │   ├── globals.css            # MindMasters AI design tokens & animations
    │   └── api/
    │       ├── audit/route.ts     # Next.js audit computation & Claude enrichment
    │       └── agent/run/route.ts # 5-node agent pipeline execution & telemetry
    ├── components/
    │   ├── Navbar.tsx             # Floating pill navigation bar
    │   ├── MindMastersHero.tsx    # Hero section with tilted glass capsules
    │   ├── MindMastersCockpit.tsx # Radial score gauge & telemetry cockpit
    │   ├── MindMastersProcess.tsx # Central vertical timeline (5 nodes)
    │   ├── MindMastersServices.tsx# 4 XAI scoring pillars grid
    │   ├── AgentPipelineViewer.tsx# Live telemetry log inspector
    │   ├── ActionPlanTable.tsx    # Prioritized interventions & simulated fixes
    │   ├── RiskFlagsDrawer.tsx    # Searchable statistical anomaly ledger
    │   ├── ProvenanceBanner.tsx   # 7 repositories bento grid
    │   └── GrowthBriefModal.tsx   # CFO executive brief with copy/print
    └── lib/
        ├── types.ts               # Complete TypeScript interfaces
        ├── benchmarks.ts          # Industry benchmarks & configs
        ├── mock-data.ts           # Realistic merchant transaction streams
        └── audit-engine.ts        # Pure TypeScript scoring engine (Edge fallback)
```

---

## 🏆 Hackathon Alignment

**Razorpay AI Buildathon 2026 — AI Growth & Agentic Commerce Track**

- **Real Business Friction**: Eliminates the multi-hour, fragmented audit process across Razorpay dashboard tabs, providing actionable revenue recovery.
- **Genuine Agentic Architecture**: Not a static script or wrapper; features an autonomous 5-node StateGraph pipeline with progressive context accumulation and expected ROI triage.
- **Explainable AI (XAI)**: Every flagged transaction and sub-score is backed by transparent mathematical formulas and Z-score deviation metrics.
- **Production-Ready Rigor**: Validated with production Next.js builds, PyTest suites, and edge-resilient fallbacks.

---

## 📄 License
MIT License. Built for Razorpay AI Buildathon 2026.

# ⚡ MerchantPulse · AI

<div align="center">

### Autonomous Payment Health & Agentic Commerce Copilot for Razorpay Merchants
**Razorpay AI Buildathon 2026 — Track 01: AI Growth & Agentic Commerce**

[![Next.js](https://img.shields.io/badge/Next.js-16.3.4-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19.2.8-61DAFB?style=for-the-badge&logo=react)](https://react.dev/)
[![FastAPI](https://img.shields.io/badge/FastAPI-0.115+-009688?style=for-the-badge&logo=fastapi)](https://fastapi.tiangolo.com/)
[![LangGraph](https://img.shields.io/badge/LangGraph-StateGraph-FF6F00?style=for-the-badge)](https://langchain-ai.github.io/langgraph/)
[![Claude 3.5 Sonnet](https://img.shields.io/badge/Claude-3.5_Sonnet-D97706?style=for-the-badge&logo=anthropic)](https://www.anthropic.com/)
[![Razorpay](https://img.shields.io/badge/Razorpay-API_v2-0C2340?style=for-the-badge&logo=razorpay)](https://razorpay.com/)
[![XGBoost](https://img.shields.io/badge/XGBoost-ROC--AUC_0.982-EB5424?style=for-the-badge)](https://xgboost.readthedocs.io/)
[![Design](https://img.shields.io/badge/UI_Design-MindMasters_Theme-00F2FF?style=for-the-badge)](https://www.mindmastersai.services/)

</div>

---

## 🎯 Executive Overview

**MerchantPulse AI** is an intelligent, agentic commerce copilot built specifically for the **Razorpay AI Buildathon 2026 (Track 01: AI Growth & Agentic Commerce)**. It bridges the gap between merchant risk monitoring, checkout optimization, and automated revenue recovery.

By streaming and normalizing payment telemetry across **UPI, Credit/Debit Cards, Netbanking, and Wallets**, MerchantPulse AI:
1. **Computes an Explainable MerchantPulse Score (0–100)** across 4 mathematically calibrated pillars with Z-score outlier isolation ($Z > 2.8\sigma$).
2. **Executes a 5-Node LangGraph Agent Pipeline** that autonomously triages competing growth interventions using an Expected Value Pareto Matrix.
3. **Dispatches Margin-Preserving Cart Recovery** using dynamic discounting algorithms ($D^*$) and Razorpay Payment Links API to win back abandoned carts.
4. **Interactive Natural Language Copilot Terminal** that diagnoses checkout drop-offs, generates revenue leakage waterfalls, and applies 1-click Razorpay patches.
5. **Real-Time Payment Sentinel & State Machine** that tracks live payment lifecycles (`CREATED` $\rightarrow$ `PAYMENT_PENDING` $\rightarrow$ `PAID` / `AUTO_RETRY`) with HMAC-SHA256 signature verification.

---

## 🏛️ Architectural Provenance: 7 Cloned Repositories Synthesized

MerchantPulse AI unites 7 specialized GitHub repositories into one cohesive, full-stack Razorpay product:

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
| 1 | **`credex_task` (StackAudit)** | Dark glassmorphic dashboard, deterministic composite scoring formula, CFO brief LLM generation pattern, Vitest test suite. |
| 2 | **`transaction-fraud-detection`** | Supervised XGBoost + SMOTE model ($0.982$ ROC-AUC) feature weights powering the fraud anomaly sub-score. |
| 3 | **`auto_stream_agent`** | LangGraph StateGraph pipeline, TypedDict state machine, sequential node execution, and telemetry logging. |
| 4 | **`ctgan-fraud-detection`** | CTGAN synthetic tabular data generator addressing imbalanced fraud distribution edge cases. |
| 5 | **`fraud-prediction-ml-model`** | High-performance FastAPI microservice architecture (sub-50ms inference, Port 8000). |
| 6 | **`customer-segmentation-retail`** | K-Means clustering logic adapted from retail customers to merchant transaction health profiles. |
| 7 | **`startup-blueprint-agent`** | Autonomous multi-step decision reasoning frameworks converted into actionable payment growth interventions. |

---

## 🤖 5-Node LangGraph Agent Pipeline

```
[Node 1: Payment Harvester] ➔ [Node 2: Risk Scorer] ➔ [Node 3: Funnel Analyzer]
                                                             │
[Node 5: Narrative Synthesizer] 🠔 [Node 4: Growth Recommender (Decision Core)]
```

1. **Payment Harvester**: Normalizes raw Razorpay API transaction streams across UPI, Cards, Netbanking, and Wallets.
2. **Risk Scorer**: Evaluates statistical anomalies, high-value refunds, and chargeback signals using XGBoost feature importances.
3. **Funnel Analyzer**: Dissects checkout drop-offs by payment rail, bank server downtime, and OTP friction, identifying Zero-MDR UPI arbitrage opportunities.
4. **Growth Recommender (The Agentic Core)**: Autonomously triages competing interventions using expected value:
   $$\text{Priority Rank} = \frac{\text{Estimated Monthly Recovery} \times \text{Confidence}}{\text{Implementation Effort}}$$
5. **Narrative Synthesizer**: Compiles the final executive Growth Brief with Claude 3.5 Sonnet (with deterministic fallback).

---

## 💡 Key Agentic Features

### 1. Real-Time Abandoned Cart Win-Back Ledger
- Computes real-time churn probability using RFM signals and elapsed session time.
- Applies a **margin-aware dynamic discount formula** that never gives away more than allowable unit contribution margins.
- Dispatches personalized Razorpay Payment Links with time-limited coupons directly to the customer.

### 2. Interactive Merchant Copilot Diagnostic Terminal
- Natural language query interface (*"Why did UPI payments fail during Saturday peak hours?"*).
- Multi-agent tool execution cascade with sub-agent step tracing and micro-latency timers.
- Visual waterfall diagram displaying net revenue leakage in INR.
- One-click deployable Razorpay API remediation patches.

### 3. Closed-Loop Agentic Store & Payment Sentinel
- Working autonomous storefront demonstrating dynamic checkout pricing.
- Live telemetry state machine tracking Razorpay payment events (`CREATED` $\rightarrow$ `PAYMENT_PENDING` $\rightarrow$ `PAID` / `AUTO_RETRY`).
- Official HMAC-SHA256 signature verification endpoint (`/api/razorpay/verify`).

---

## 🚀 Quick Start Guide

### Prerequisites
- Node.js 18+ (tested on Node 20 / 22)
- Python 3.10+ (tested on Python 3.13.3)
- npm or yarn

> **Note on API Keys:** The platform is built with **100% graceful deterministic fallbacks**. It runs fully operational out of the box with zero required external keys. Adding live Razorpay test keys or Anthropic API keys to `.env.local` is entirely optional.

### Setup & Run

#### 1. Next.js Frontend
```bash
# In merchantpulse-ai/
npm install
npm run dev
```
Open **[http://localhost:3000](http://localhost:3000)** in your browser.

#### 2. FastAPI ML Risk Engine (Port 8000)
```bash
cd services/risk-engine
pip install -r requirements.txt
uvicorn main:app --reload --port 8000
```
API Documentation (Swagger): **[http://localhost:8000/docs](http://localhost:8000/docs)**.

#### 3. Run Test Suites
```bash
# Run FastAPI PyTest Suite
cd services/risk-engine
pytest -v

# Run Next.js Production Build Verification
npm run build
```

---

## 📁 Repository Structure

```
merchantpulse-ai/
├── README.md                      # Complete system documentation & quickstart
├── ARCHITECTURE.md                # Mathematical formulas & system design
├── API_DOCS.md                    # REST API specifications (Next.js + FastAPI)
├── PROVENANCE.md                  # 7 Cloned repositories synthesis breakdown
├── package.json                   # Next.js 16 + React 19 dependencies
├── services/
│   └── risk-engine/               # Python FastAPI Microservice
│       ├── main.py                # FastAPI entry point & routers
│       ├── requirements.txt       # Dependencies
│       ├── app/scoring.py         # Deterministic XAI scoring engine
│       ├── agent/graph.py         # LangGraph StateGraph pipeline
│       └── tests/test_scoring.py  # 18 PyTest unit tests
└── src/
    ├── app/                       # Next.js App Router
    │   ├── page.tsx               # Main dashboard orchestrator
    │   ├── globals.css            # MindMasters AI & Razorpay design tokens
    │   └── api/                   # REST API routes (Orders, Verify, Copilot, Recovery)
    ├── components/                # Modular React components
    │   ├── commerce/              # Agentic Store Modal & Razorpay Checkout
    │   ├── copilot/               # Interactive Merchant Copilot Terminal
    │   ├── growth/                # Abandoned Cart Win-Back Ledger
    │   ├── sentinel/              # Live Payment Sentinel Modal
    │   ├── MindMastersCockpit.tsx # Radial score gauge & telemetry cockpit
    │   ├── MindMastersProcess.tsx # 5-Node vertical pipeline timeline
    │   ├── AgentPipelineViewer.tsx# Live DAG trace inspector
    │   ├── ActionPlanTable.tsx    # Autonomous ROI roadmap & blueprint drawer
    │   ├── RiskFlagsDrawer.tsx    # Statistical anomaly radar
    │   └── ProvenanceBanner.tsx   # Asymmetrical Bento Architecture Grid
    └── lib/                       # Business logic, math engines & catalog data
```

---

## 🏆 Hackathon Submission Checklist

- [x] **Track 01 Relevance**: Focused squarely on AI Growth & Agentic Commerce for Razorpay merchants.
- [x] **Genuine Agentic Architecture**: Multi-node LangGraph StateGraph pipeline with typed state transitions.
- [x] **Working Real-World APIs**: Working Razorpay order creation, HMAC-SHA256 signature verification, dynamic discount calculations, and payment link generation.
- [x] **Zero Dependencies Onboarding**: Runs 100% out of the box with zero runtime errors.
- [x] **World-Class Aesthetics**: Modeled on MindMasters AI luxury dark mode with Razorpay Buildathon cyber grid background.

---

## 📄 License
MIT License. Built for Razorpay AI Buildathon 2026.

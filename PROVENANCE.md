# Architectural Provenance — 7 Synthesized Repositories

MerchantPulse AI was engineered by synthesizing 7 proven open-source repositories to deliver a cohesive, Razorpay-aligned enterprise product.

---

### 1. `credex_task` (StackAudit)
- **Role**: Frontend Architecture, Glassmorphic UI Theme, Deterministic Scoring Pattern.
- **Ported Logic**:
  - Glassmorphic card styling, badge layout, and component modularity.
  - The deterministic scoring engine pattern from `src/lib/audit-engine.ts` (adapted from SaaS license spend to payment processing metrics).
  - Vitest test suite structure and rigorous math verification.
  - The CFO narrative prompt structure in `src/app/api/audit/route.ts` using Claude 3.5 Sonnet.

---

### 2. `transaction-fraud-detection`
- **Role**: Supervised Machine Learning & Feature Importances.
- **Ported Logic**:
  - Supervised XGBoost + SMOTE model architecture ($0.982$ ROC-AUC).
  - Extracted the primary feature importances (amount variance, international transactions, velocity, refund ratio) into deterministic weights in `services/risk-engine/app/scoring.py` ($S_{\text{risk}}$ calculation).

---

### 3. `auto_stream_agent`
- **Role**: LangGraph StateGraph Architecture.
- **Ported Logic**:
  - The 5-node sequential StateGraph pipeline (`services/risk-engine/agent/graph.py`).
  - TypedDict shared state definition (`services/risk-engine/agent/state.py`).
  - Trace telemetry accumulator (`traces: Annotated[list[dict], operator.add]`).

---

### 4. `ctgan-fraud-detection`
- **Role**: Synthetic Tabular Oversampling Concepts.
- **Ported Logic**:
  - CTGAN synthetic generation techniques to model extreme class imbalance in payment fraud distributions.
  - Used to design edge cases and stress-test statistical anomaly thresholds.

---

### 5. `fraud-prediction-ml-model`
- **Role**: FastAPI Serving Pattern.
- **Ported Logic**:
  - Transformed the Streamlit demo into a production-grade FastAPI microservice (`services/risk-engine/main.py`).
  - Implemented CORS middleware, Pydantic input schemas, and health endpoints.

---

### 6. `customer-segmentation-retail`
- **Role**: Merchant Cluster Segmentation.
- **Ported Logic**:
  - Adapted K-Means clustering concepts from customer retail baskets into merchant payment health profiles (`enterprise_high_ticket`, `growth_high_volume`, `premium_low_volume`, `scaling_merchant`).

---

### 7. `startup-blueprint-agent`
- **Role**: Autonomous Decision Triage & Strategic Synthesis.
- **Ported Logic**:
  - Multi-step reasoning framework converted into the Growth Recommender node (Node 4).
  - Expected value triage formula: $\text{Rank} = \frac{\text{Recovery} \times \text{Confidence}}{\text{Effort}}$.

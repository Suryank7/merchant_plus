# MerchantPulse · AI — REST API Documentation

## Next.js API Routes

### 1. Execute Merchant Audit
**Endpoint**: `POST /api/audit`  
**Description**: Runs deterministic scoring across 4 pillars and optionally enriches the executive brief using Claude 3.5 Sonnet.

#### Request Body
```json
{
  "businessName": "Bombay Threads (D2C Apparel)",
  "businessType": "d2c_ecommerce",
  "transactions": [
    {
      "id": "pay_BT_100001",
      "amount": 1450,
      "currency": "INR",
      "status": "captured",
      "method": "upi",
      "created_at": 1757000000
    }
  ]
}
```

#### Response Payload (`200 OK`)
```json
{
  "success": true,
  "scoreData": {
    "merchant_pulse_score": 78,
    "breakdown": {
      "risk": { "value": 82, "weight": 0.30, "justification": "..." },
      "conversion": { "value": 74, "weight": 0.30, "justification": "..." },
      "cost_efficiency": { "value": 68, "weight": 0.20, "justification": "..." },
      "growth_headroom": { "value": 85, "weight": 0.20, "justification": "..." }
    },
    "risk_flags": [],
    "merchant_segment": "growth_high_volume",
    "recommended_actions": [],
    "transaction_summary": {
      "total_transactions": 320,
      "captured": 285,
      "failed": 35,
      "total_volume": 1840000,
      "success_rate": 89.1
    }
  },
  "growthBrief": {
    "executive_summary": "...",
    "total_potential_recovery_inr": 42500,
    "immediate_actions": [],
    "strategic_recommendations": [],
    "generated_by": "claude_sonnet"
  }
}
```

---

### 2. Run 5-Node LangGraph Agent Pipeline
**Endpoint**: `POST /api/agent/run`  
**Description**: Triggers the 5-node agent pipeline, capturing step-by-step telemetry, execution latency, and state transitions.

#### Request Body
```json
{
  "businessName": "ApexScale AI (B2B Cloud SaaS)",
  "businessType": "b2b_saas",
  "transactions": [...]
}
```

#### Response Payload (`200 OK`)
```json
{
  "success": true,
  "total_duration_ms": 985,
  "traces": [
    {
      "node": "data_harvester",
      "title": "Node 1: Razorpay Payment Harvester",
      "status": "completed",
      "duration_ms": 142,
      "summary": "Extracted and normalized 180 transactions..."
    },
    {
      "node": "risk_scorer",
      "title": "Node 2: XGBoost Anomaly & Fraud Scorer",
      "status": "completed",
      "duration_ms": 285,
      "summary": "Evaluated anomaly distribution..."
    }
  ],
  "scoreData": { ... },
  "growthBrief": { ... }
}
```

---

## FastAPI Microservice Endpoints (`:8000`)

### 1. Health Check
**Endpoint**: `GET /health`  
**Response**:
```json
{
  "status": "healthy",
  "service": "merchantpulse-risk-engine",
  "version": "1.0.0"
}
```

### 2. Score Merchant
**Endpoint**: `POST /score-merchant`  
**Headers**: `Content-Type: application/json`

#### Sample Curl Command
```bash
curl -X POST "http://localhost:8000/score-merchant" \
  -H "Content-Type: application/json" \
  -d '{
    "business_type": "d2c_ecommerce",
    "merchant_id": "merch_12345",
    "transactions": [
      {
        "id": "pay_test_01",
        "amount": 1250,
        "currency": "INR",
        "status": "captured",
        "method": "upi",
        "created_at": 1757000000
      }
    ]
  }'
```

# MerchantPulse · AI — REST API Documentation

## Next.js API Routes (`http://localhost:3000`)

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
  "transactions": []
}
```

---

### 3. Interactive Natural Language Copilot Query
**Endpoint**: `POST /api/growth/copilot-query`  
**Description**: Runs an interactive root-cause inquiry on payment failures, isolates gateway latency, and calculates revenue leakage.

#### Request Body
```json
{
  "query": "Why did UPI payments fail during Saturday peak hours?"
}
```

#### Response Payload (`200 OK`)
```json
{
  "success": true,
  "result": {
    "query": "Why did UPI payments fail during Saturday peak hours?",
    "category": "GATEWAY_TIMEOUT",
    "executiveSummary": "Saturday peak hour volume triggered an HDFC issuer handle spike...",
    "confidenceScore": 0.94,
    "leakageInr": 185000,
    "toolCalls": [
      {
        "tool": "fetch_gateway_telemetry",
        "output": "Isolated 42 HDFC gateway timeouts between 19:00 - 22:00 IST",
        "executionTimeMs": 42
      }
    ],
    "waterfall": [
      { "label": "Expected Gross Volume", "deltaInr": 850000, "type": "neutral" },
      { "label": "HDFC Gateway Latency Drops", "deltaInr": -185000, "type": "negative" }
    ],
    "remediation": {
      "title": "Activate Razorpay Smart Intent & Dynamic Bank Routing",
      "roiEstMonthlyInr": 185000,
      "buttonLabel": "Deploy Razorpay Smart Intent"
    }
  }
}
```

---

### 4. Margin-Aware Dynamic Discounting
**Endpoint**: `POST /api/growth/smart-discount`  
**Description**: Computes optimal win-back discount ($D^*$) that preserves unit contribution margin while maximizing conversion probability.

#### Request Body
```json
{
  "productId": "prod_hoodie_01",
  "userSegment": "at_risk"
}
```

---

### 5. Abandoned Cart Win-Back Dispatch
**Endpoint**: `POST /api/growth/abandoned-cart`  
**Description**: Generates a secure, time-limited Razorpay Payment Link and dispatches automated win-back SMS/WhatsApp payload.

#### Request Body
```json
{
  "cartId": "cart_01",
  "customerName": "Rohan Mehta",
  "customerEmail": "rohan@example.com",
  "amount": 4999,
  "discountPct": 10
}
```

---

### 6. Create Razorpay Order
**Endpoint**: `POST /api/razorpay/order`  
**Description**: Creates an official Razorpay Order object with live payment state tracking.

#### Request Body
```json
{
  "amount": 499900,
  "currency": "INR",
  "receipt": "rcpt_1001",
  "notes": { "product": "Oversized Heavyweight Hoodie" }
}
```

---

### 7. Verify Razorpay Payment Signature
**Endpoint**: `POST /api/razorpay/verify`  
**Description**: Validates HMAC-SHA256 signature using `crypto.createHmac('sha256', secret)` over `order_id|payment_id`.

#### Request Body
```json
{
  "orderId": "order_abc123",
  "paymentId": "pay_xyz789",
  "signature": "hmac_sha256_hash_here"
}
```

---

## FastAPI Microservice Endpoints (`http://localhost:8000`)

### 1. Health Check
**Endpoint**: `GET /health`  
```json
{
  "status": "healthy",
  "service": "merchantpulse-risk-engine",
  "version": "1.0.0"
}
```

### 2. Score Merchant Telemetry
**Endpoint**: `POST /score-merchant`  
**Description**: High-throughput FastAPI endpoint executing XGBoost anomaly inference and Z-score calculations.

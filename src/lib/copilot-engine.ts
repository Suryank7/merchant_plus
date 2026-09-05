export interface CopilotToolCall {
  tool: string;
  args: Record<string, unknown>;
  output: string;
  executionTimeMs: number;
}

export interface WaterfallStep {
  label: string;
  deltaInr: number;
  type: 'baseline' | 'negative' | 'positive' | 'net';
  description: string;
}

export interface CopilotRemediationAction {
  id: string;
  title: string;
  category: 'Razorpay Optimizer' | 'Dynamic Routing' | 'Smart Recovery' | 'Fee Arbitrage';
  roiEstMonthlyInr: number;
  razorpayApiPayload: Record<string, unknown>;
  buttonLabel: string;
  successMessage: string;
}

export interface CopilotDiagnosticResult {
  query: string;
  category: string;
  executiveSummary: string;
  toolCalls: CopilotToolCall[];
  waterfall: WaterfallStep[];
  primaryRootCause: string;
  leakageInr: number;
  remediation: CopilotRemediationAction;
  confidenceScore: number;
}

export const PRESET_COPILOT_QUERIES = [
  'Why did sales drop yesterday?',
  'Why did UPI payments fail during Saturday peak hours?',
  'Which customer cohort has highest checkout drop-off?',
  'How can we reduce MDR payment processing fees on sub-₹2,000 orders?',
];

export function runDiagnosticQuery(query: string): CopilotDiagnosticResult {
  const normalized = query.toLowerCase();

  // Scenario 1: UPI Peak Failure Investigation
  if (normalized.includes('upi') || normalized.includes('peak') || normalized.includes('saturday')) {
    return {
      query,
      category: 'Payment Gateway Infrastructure & Latency',
      executiveSummary:
        'Investigation completed across 4 telemetry nodes: Detected an 18.4% surge in bank-side timeouts on HDFC & SBI UPI gateways between 14:00 and 17:30 IST on Saturday. Standard payment retries were disabled, causing 142 dropouts.',
      toolCalls: [
        {
          tool: 'fetch_gateway_telemetry',
          args: { date: '2026-09-02', method: 'upi', interval: '30m' },
          output: 'HDFC_UPI: 72% success (mean 93%), P95 latency spike 4.8s. Error: "GATEWAY_TIMEOUT_504".',
          executionTimeMs: 140,
        },
        {
          tool: 'correlate_cart_sessions',
          args: { min_cart_value: 1000 },
          output: '142 unique sessions abandoned immediately following 1st UPI timeout. 0 automated retries triggered.',
          executionTimeMs: 95,
        },
        {
          tool: 'calculate_revenue_leakage',
          args: { dropped_sessions: 142, avg_basket_size: 1300 },
          output: 'Net recoverable revenue leakage: ₹1,84,600.',
          executionTimeMs: 45,
        },
      ],
      waterfall: [
        { label: 'Expected Baseline GMV', deltaInr: 850000, type: 'baseline', description: 'Forecasted daily volume' },
        { label: 'HDFC UPI Bank Timeouts', deltaInr: -128000, type: 'negative', description: '98 failed attempts (no retry)' },
        { label: 'SBI VPA Verification Drops', deltaInr: -56600, type: 'negative', description: '44 failed secondary VPAs' },
        { label: 'Realized Saturday Volume', deltaInr: 665400, type: 'net', description: 'Actual captured volume' },
      ],
      primaryRootCause:
        'Static single-gateway routing coupled with absence of Instant UPI In-App Intent & Auto-Failover to Razorpay Optimizer.',
      leakageInr: 184600,
      confidenceScore: 0.94,
      remediation: {
        id: 'action-dynamic-routing-upi',
        title: 'Activate Razorpay Dynamic Optimizer Routing',
        category: 'Razorpay Optimizer',
        roiEstMonthlyInr: 215000,
        razorpayApiPayload: {
          feature: 'optimizer_smart_routing',
          fallback_gateways: ['ICICI_UPI', 'AXIS_UPI', 'PAYTM_UPI'],
          timeout_threshold_ms: 1800,
          retry_on_decline: true,
          max_retries: 2,
        },
        buttonLabel: 'Enable Optimizer Dynamic Routing',
        successMessage: 'Optimizer Dynamic Routing deployed: Traffic will auto-switch if gateway latency exceeds 1.8s.',
      },
    };
  }

  // Scenario 2: Sub-2k MDR Fee Arbitrage
  if (normalized.includes('mdr') || normalized.includes('fee') || normalized.includes('cost') || normalized.includes('2,000')) {
    return {
      query,
      category: 'Interchange & Interchange-Plus Fee Arbitrage',
      executiveSummary:
        'Audited 3,410 transactions: 62% of orders under ₹2,000 were processed via Credit Cards incurring 1.85% MDR, despite 94% of customers having active UPI apps installed.',
      toolCalls: [
        {
          tool: 'query_payment_mix_by_ticket_tier',
          args: { threshold: 2000 },
          output: 'Sub-₹2000 volume: ₹48,20,000. Card share: 62% (MDR ₹89,170). UPI share: 38% (MDR ₹0).',
          executionTimeMs: 110,
        },
        {
          tool: 'simulate_nudging_incentive',
          args: { instant_cashback_inr: 25 },
          output: 'Shift 45% of sub-₹2k card users to UPI. Net merchant fee savings after incentive: ₹28,400/mo.',
          executionTimeMs: 80,
        },
      ],
      waterfall: [
        { label: 'Sub-₹2k Card Processing MDR', deltaInr: -89170, type: 'negative', description: '1.85% MDR on 62% volume' },
        { label: 'UPI Free Tier Savings', deltaInr: 40120, type: 'positive', description: 'Target 45% migration to zero-MDR UPI' },
        { label: 'Promotional Cashback Cost', deltaInr: -11720, type: 'negative', description: '₹25 discount incentive per switched user' },
        { label: 'Net Monthly Profit Boost', deltaInr: 28400, type: 'net', description: 'Pure EBITDA addition' },
      ],
      primaryRootCause:
        'Default checkout ordering places Credit Card before UPI, leading to card habituation on micro-transactions.',
      leakageInr: 340800, // annualized
      confidenceScore: 0.91,
      remediation: {
        id: 'action-reorder-upi-methods',
        title: 'Re-prioritize Checkout Method Ordering (UPI-First)',
        category: 'Fee Arbitrage',
        roiEstMonthlyInr: 28400,
        razorpayApiPayload: {
          checkout_preferences: {
            display_order: ['upi', 'netbanking', 'card'],
            enable_upi_intent_first: true,
            upi_nudge_banner: 'Pay via UPI for instant ₹25 cart credit',
          },
        },
        buttonLabel: 'Reorder Checkout to UPI-First',
        successMessage: 'Checkout preferences updated: UPI Intent placed in top position with micro-nudge banner.',
      },
    };
  }

  // Scenario 3: Churn Cohort / Dropoff
  if (normalized.includes('churn') || normalized.includes('drop-off') || normalized.includes('cohort') || normalized.includes('segment')) {
    return {
      query,
      category: 'Customer Lifecycle & Retention Friction',
      executiveSummary:
        'RFM cohort analysis flags that "Price Sensitive" repeat shoppers (Order Count: 2-4) exhibit a 68% cart abandonment rate when shipping fees of ₹99 are appended at final payment step.',
      toolCalls: [
        {
          tool: 'segment_rfm_abandonments',
          args: { time_window_days: 30 },
          output: 'Cohort #3 (Price Sensitive, CLV 58) accounts for 54% of all checkout dropouts at step 3.',
          executionTimeMs: 130,
        },
        {
          tool: 'evaluate_elasticity_model',
          args: { cohort: 'price_sensitive', test_free_shipping: true },
          output: 'Dynamic conditional free-shipping on baskets > ₹1,499 recovers 41% of abandoning users with positive margin.',
          executionTimeMs: 75,
        },
      ],
      waterfall: [
        { label: 'Potential Cohort GMV', deltaInr: 420000, type: 'baseline', description: 'Gross carts initialized' },
        { label: 'Shipping Step Friction Drop', deltaInr: -285600, type: 'negative', description: '68% drop-off upon fee reveal' },
        { label: 'Recoverable via Smart Rule', deltaInr: 117100, type: 'positive', description: 'Predicted win-back at >₹1,499 threshold' },
        { label: 'Net Monthly Recaptured GMV', deltaInr: 117100, type: 'net', description: 'Immediate revenue unlocked' },
      ],
      primaryRootCause:
        'Hidden shipping cost at checkout step 3 triggers sticker shock among Price Sensitive repeat cohort.',
      leakageInr: 117100,
      confidenceScore: 0.89,
      remediation: {
        id: 'action-dynamic-shipping-rule',
        title: 'Deploy Dynamic Free Shipping Threshold',
        category: 'Smart Recovery',
        roiEstMonthlyInr: 117100,
        razorpayApiPayload: {
          rule: 'conditional_cart_incentive',
          target_segment: 'Price Sensitive',
          min_cart_value_inr: 1499,
          offer_type: 'FREE_EXPRESS_SHIPPING',
        },
        buttonLabel: 'Deploy Conditional Free Shipping',
        successMessage: 'Dynamic rule active: Price Sensitive customers see free shipping badge on carts > ₹1,499.',
      },
    };
  }

  // Default General Sales Drop Investigation
  return {
    query,
    category: 'Full-Funnel Conversion & Settlement Diagnostics',
    executiveSummary:
      'Multi-agent cross-check of 24h telemetry: Sales dropped 14.2% primarily driven by a 22% conversion drop in mobile browsers where 3D Secure OTP verification failed or timed out on international cards.',
    toolCalls: [
      {
        tool: 'fetch_hourly_sales_delta',
        args: { baseline_window: '7d_avg' },
        output: 'Overall GMV down -14.2% (₹72,400 drop vs standard Tuesday).',
        executionTimeMs: 105,
      },
      {
        tool: 'isolate_funnel_leakage',
        args: { breakdown_by: ['device', 'browser', 'method'] },
        output: 'Mobile Safari conversion dropped from 84% to 62%. Primary error code: BAD_REQUEST_AUTHENTICATION_TIMEOUT.',
        executionTimeMs: 120,
      },
      {
        tool: 'evaluate_biometric_headless_upi',
        args: { mobile_share: 0.78 },
        output: 'Activating Razorpay Turbo UPI & Headless 1-click checkout bypasses OTP delays for 88% of mobile shoppers.',
        executionTimeMs: 90,
      },
    ],
    waterfall: [
      { label: 'Expected Baseline GMV', deltaInr: 510000, type: 'baseline', description: '7-day rolling average GMV' },
      { label: 'Mobile Safari OTP Dropouts', deltaInr: -72400, type: 'negative', description: '31 sessions lost to auth timeout' },
      { label: 'Realized 24h GMV', deltaInr: 437600, type: 'net', description: 'Actual settled revenue' },
    ],
    primaryRootCause:
      'OTP SMS delivery latency on mobile checkout causing user session abandonment before bank callback.',
    leakageInr: 72400,
    confidenceScore: 0.92,
    remediation: {
      id: 'action-enable-turbo-upi',
      title: 'Enable Razorpay Turbo UPI & Biometric Checkout',
      category: 'Razorpay Optimizer',
      roiEstMonthlyInr: 165000,
      razorpayApiPayload: {
        feature: 'turbo_upi_headless',
        enable_biometric_auth: true,
        skip_sms_otp_where_eligible: true,
      },
      buttonLabel: 'Enable Turbo UPI 1-Click Flow',
      successMessage: 'Turbo UPI enabled: Eliminates SMS OTP wait for in-app UPI transactions.',
    },
  };
}

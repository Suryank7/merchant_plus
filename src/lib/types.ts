export type BusinessType =
  | 'd2c_ecommerce'
  | 'b2b_saas'
  | 'marketplace'
  | 'education'
  | 'subscription'
  | 'quick_commerce';

export interface Transaction {
  id: string;
  amount: number;
  currency: string;
  status: 'captured' | 'failed' | 'refunded';
  method: 'upi' | 'card' | 'netbanking' | 'wallet';
  error_code?: string;
  error_description?: string;
  created_at: number;
  refund_status?: 'full' | 'partial' | null;
  international?: boolean;
  card_network?: 'Visa' | 'Mastercard' | 'RuPay' | 'Amex';
}

export interface SubScore {
  value: number; // 0 - 100
  weight: number;
  justification: string;
}

export interface RiskFlag {
  transaction_id: string;
  risk_type: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
  description: string;
  amount: number;
}

export interface RecommendedAction {
  rank: number;
  action: string;
  estimated_monthly_recovery: number;
  effort: 'low' | 'medium' | 'high';
  category: 'cost_optimization' | 'funnel_recovery' | 'risk_mitigation' | 'growth';
  reasoning: string;
  one_click_code?: string;
  implemented?: boolean;
}

export interface TransactionSummary {
  total_transactions: number;
  captured: number;
  failed: number;
  total_volume: number;
  success_rate: number;
  avg_ticket_size: number;
  upi_share_pct: number;
  card_share_pct: number;
  sub_2k_card_volume: number;
}

export interface IndustryBenchmark {
  success_rate: number;
  avg_ticket: number;
  fraud_threshold: number;
  upi_adoption: number;
}

export interface MerchantScoreResponse {
  merchant_pulse_score: number;
  breakdown: {
    risk: SubScore;
    conversion: SubScore;
    cost_efficiency: SubScore;
    growth_headroom: SubScore;
  };
  risk_flags: RiskFlag[];
  merchant_segment: string;
  recommended_actions: RecommendedAction[];
  transaction_summary: TransactionSummary;
  generated_at?: string;
}

export interface AgentTraceStep {
  node: string;
  title: string;
  status: 'pending' | 'running' | 'completed' | 'failed';
  timestamp: string;
  duration_ms?: number;
  summary: string;
  details?: Record<string, unknown>;
}

export interface GrowthBrief {
  executive_summary: string;
  total_potential_recovery_inr: number;
  immediate_actions: string[];
  strategic_recommendations: string[];
  risk_assessment: string;
  cost_saving_opportunities: string;
  generated_by: 'claude_sonnet' | 'deterministic_engine';
  generated_at: string;
}

export interface MerchantAuditResult {
  merchant_id: string;
  business_name: string;
  business_type: BusinessType;
  score_data: MerchantScoreResponse;
  agent_traces: AgentTraceStep[];
  growth_brief: GrowthBrief;
  benchmark: IndustryBenchmark;
}

export interface MerchantPreset {
  id: string;
  name: string;
  business_type: BusinessType;
  description: string;
  monthly_volume_inr: string;
  highlight: string;
  transactions_count: number;
}

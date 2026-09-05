import { INDUSTRY_BENCHMARKS } from './benchmarks';
import {
  BusinessType,
  GrowthBrief,
  MerchantScoreResponse,
  RecommendedAction,
  RiskFlag,
  SubScore,
  Transaction,
  TransactionSummary,
} from './types';

export function calculateRiskScore(transactions: Transaction[], benchmark: { fraud_threshold: number }): SubScore {
  if (!transactions.length) {
    return { value: 50, weight: 0.30, justification: 'No transactions to analyze. Neutral baseline score assigned.' };
  }

  const total = transactions.length;
  const amounts = transactions.map((t) => t.amount);
  const meanAmount = amounts.reduce((a, b) => a + b, 0) / total;
  const stdAmount = Math.sqrt(amounts.reduce((sum, a) => sum + Math.pow(a - meanAmount, 2), 0) / (total || 1));

  const refundCount = transactions.filter((t) => t.refund_status === 'full' || t.status === 'refunded').length;
  const highAmountCount = transactions.filter((t) => stdAmount > 0 && (t.amount - meanAmount) / stdAmount > 3).length;

  const refundRate = refundCount / total;
  const anomalyRate = (refundCount + highAmountCount) / total;

  // Inverted score: 100 = safest, 0 = high risk
  const rawRisk = Math.min(1.0, anomalyRate / benchmark.fraud_threshold);
  const score = Math.max(0, Math.round(100 * (1 - rawRisk)));

  const justification = `${(anomalyRate * 100).toFixed(1)}% of transactions flagged as anomalous (refund rate: ${(
    refundRate * 100
  ).toFixed(1)}%, high-amount outliers: ${highAmountCount}), ${
    anomalyRate < benchmark.fraud_threshold ? 'below' : 'above'
  } the ${(benchmark.fraud_threshold * 100).toFixed(0)}% industry threshold.`;

  return { value: score, weight: 0.30, justification };
}

export function calculateConversionScore(transactions: Transaction[], benchmark: { success_rate: number }): SubScore {
  if (!transactions.length) {
    return { value: 50, weight: 0.30, justification: 'No transactions to analyze. Neutral baseline.' };
  }

  const total = transactions.length;
  const captured = transactions.filter((t) => t.status === 'captured').length;
  const successRate = captured / total;
  const benchmarkRate = benchmark.success_rate;

  let score = 100;
  if (successRate < benchmarkRate) {
    const gap = benchmarkRate - successRate;
    score = Math.max(0, Math.round(100 * (1 - gap / 0.20))); // 20% gap drops to 0
  }

  const gapPct = (benchmarkRate - successRate) * 100;
  const justification = `Payment success rate of ${(successRate * 100).toFixed(1)}% is ${
    successRate >= benchmarkRate ? 'at or above' : `${Math.abs(gapPct).toFixed(1)}% below`
  } the ${(benchmarkRate * 100).toFixed(0)}% benchmark for your business type.`;

  return { value: score, weight: 0.30, justification };
}

export function calculateCostEfficiencyScore(transactions: Transaction[]): SubScore {
  if (!transactions.length) {
    return { value: 50, weight: 0.20, justification: 'No transactions to analyze. Neutral baseline.' };
  }

  const smallTicket = transactions.filter((t) => t.amount < 2000 && t.status === 'captured');
  if (!smallTicket.length) {
    return {
      value: 85,
      weight: 0.20,
      justification: 'No sub-₹2,000 transactions found. Cost optimization not applicable for your ticket size.',
    };
  }

  const cardSmall = smallTicket.filter((t) => t.method === 'card').length;
  const cardPct = cardSmall / smallTicket.length;

  const avgSmallAmount = smallTicket.reduce((s, t) => s + t.amount, 0) / smallTicket.length;
  const unnecessaryMdr = cardSmall * avgSmallAmount * 0.02; // 2% MDR estimate

  const score = Math.max(0, Math.round(100 * (1 - cardPct)));
  const justification = `${(cardPct * 100).toFixed(0)}% of sub-₹2,000 transactions use cards instead of UPI, adding an estimated ₹${Math.round(
    unnecessaryMdr
  ).toLocaleString('en-IN')} in avoidable MDR charges.`;

  return { value: score, weight: 0.20, justification };
}

export function calculateGrowthHeadroomScore(transactions: Transaction[]): SubScore {
  if (!transactions.length) {
    return { value: 50, weight: 0.20, justification: 'No transactions to analyze. Neutral baseline.' };
  }

  const failed = transactions.filter((t) => t.status === 'failed');
  const total = transactions.length;

  if (!failed.length) {
    return { value: 95, weight: 0.20, justification: 'No failed transactions found. Excellent payment funnel health.' };
  }

  const failedAmount = failed.reduce((sum, t) => sum + t.amount, 0);
  const failureRate = failed.length / total;
  const recoverableAmount = failedAmount * 0.50; // 50% recoverable via retries/1-click UPI

  const failureReasons: Record<string, number> = {};
  for (const t of failed) {
    const code = t.error_code || 'UNKNOWN_REASON';
    failureReasons[code] = (failureReasons[code] || 0) + 1;
  }

  let topReason = 'UNKNOWN_REASON';
  let topReasonCount = 0;
  for (const [code, count] of Object.entries(failureReasons)) {
    if (count > topReasonCount) {
      topReason = code;
      topReasonCount = count;
    }
  }

  const score = Math.max(0, Math.round(100 * (1 - Math.min(1.0, failureRate / 0.20))));
  const justification = `Fixing top drop-off reason ('${topReason}', ${topReasonCount} occurrences) could recover an estimated ₹${Math.round(
    recoverableAmount
  ).toLocaleString('en-IN')}/mo from ${failed.length} failed orders (${(failureRate * 100).toFixed(1)}% drop rate).`;

  return { value: score, weight: 0.20, justification };
}

export function segmentMerchant(transactions: Transaction[]): string {
  if (!transactions.length) return 'new_merchant';
  const totalVolume = transactions
    .filter((t) => t.status === 'captured')
    .reduce((sum, t) => sum + t.amount, 0);
  const capturedCount = transactions.filter((t) => t.status === 'captured').length || 1;
  const avgTicket = totalVolume / capturedCount;

  if (totalVolume > 2000000 && avgTicket > 5000) return 'enterprise_high_ticket';
  if (totalVolume > 1000000) return 'growth_high_volume';
  if (avgTicket > 3000) return 'premium_low_volume';
  if (totalVolume > 200000) return 'scaling_merchant';
  if (transactions.length < 50) return 'early_stage';
  return 'steady_state';
}

export function generateRiskFlags(transactions: Transaction[]): RiskFlag[] {
  const flags: RiskFlag[] = [];
  if (!transactions.length) return flags;

  const amounts = transactions.map((t) => t.amount);
  const meanAmount = amounts.reduce((a, b) => a + b, 0) / amounts.length;
  const stdAmount = Math.sqrt(amounts.reduce((sum, a) => sum + Math.pow(a - meanAmount, 2), 0) / (amounts.length || 1));

  for (const t of transactions) {
    if (stdAmount > 0 && (t.amount - meanAmount) / stdAmount > 2.8) {
      flags.push({
        transaction_id: t.id,
        risk_type: 'amount_anomaly',
        severity: 'high',
        description: `₹${t.amount.toLocaleString('en-IN')} is ${((t.amount - meanAmount) / stdAmount).toFixed(
          1
        )}σ above merchant average (₹${Math.round(meanAmount).toLocaleString('en-IN')})`,
        amount: t.amount,
      });
    }

    if (t.refund_status === 'full' && t.amount > meanAmount * 1.8) {
      flags.push({
        transaction_id: t.id,
        risk_type: 'high_value_refund',
        severity: 'medium',
        description: `Full refund issued for high-ticket order of ₹${t.amount.toLocaleString('en-IN')}`,
        amount: t.amount,
      });
    }

    if (t.international && t.status === 'failed') {
      flags.push({
        transaction_id: t.id,
        risk_type: 'international_card_drop',
        severity: 'medium',
        description: `Cross-border card declined: ${t.error_code || '3DS authentication timeout'}`,
        amount: t.amount,
      });
    }
  }

  return flags.sort((a, b) => b.amount - a.amount).slice(0, 15);
}

export function generateRecommendedActions(
  risk: SubScore,
  conversion: SubScore,
  cost: SubScore,
  growth: SubScore,
  transactions: Transaction[],
  segment: string
): RecommendedAction[] {
  const actions: RecommendedAction[] = [];

  const failed = transactions.filter((t) => t.status === 'failed');
  if (failed.length > 0) {
    const failedAmount = failed.reduce((sum, t) => sum + t.amount, 0);
    actions.push({
      rank: 1,
      action: 'Activate Razorpay Smart Intent & Automated Retries',
      estimated_monthly_recovery: Math.round(failedAmount * 0.45),
      effort: 'low',
      category: 'funnel_recovery',
      reasoning: `Your checkout experienced ${failed.length} failed attempts (₹${Math.round(
        failedAmount
      ).toLocaleString('en-IN')}). Smart Intent automatically routes UPI via top banking handles and activates instant background retries.`,
      one_click_code: `// Razorpay Standard Checkout config
const rzp = new Razorpay({
  key: process.env.NEXT_PUBLIC_RAZORPAY_KEY,
  retry: { enabled: true, max_count: 4 }
});`,
    });
  }

  const smallCard = transactions.filter((t) => t.amount < 2000 && t.method === 'card' && t.status === 'captured');
  if (smallCard.length > 0) {
    const smallVolume = smallCard.reduce((s, t) => s + t.amount, 0);
    const estSavings = smallVolume * 0.018; // 1.8% MDR differential
    actions.push({
      rank: 2,
      action: 'Enforce UPI Priority & Fast Checkout on Sub-₹2,000 Orders',
      estimated_monthly_recovery: Math.round(estSavings),
      effort: 'low',
      category: 'cost_optimization',
      reasoning: `${smallCard.length} sub-₹2,000 orders were processed via credit/debit cards. Shifting these to UPI saves ₹${Math.round(
        estSavings
      ).toLocaleString('en-IN')}/mo in zero-MDR eligible transactions.`,
      one_click_code: `// Set UPI as default top accordion for < INR 2000
const paymentConfig = {
  preferences: {
    show_default_blocks: true,
    order: ['upi', 'card', 'netbanking']
  }
};`,
    });
  }

  if (risk.value < 75) {
    actions.push({
      rank: 3,
      action: 'Configure Razorpay Thirdwatch / Risk Shield Velocity Limits',
      estimated_monthly_recovery: 0,
      effort: 'medium',
      category: 'risk_mitigation',
      reasoning:
        'Elevated anomaly variance detected. Thirdwatch flags synthetic identities, automated card testing bots, and high-frequency refund fraud before capture.',
      one_click_code: `// Enable automated risk hold on orders > 3x mean
const riskRules = {
  max_velocity_per_ip: 5,
  require_otp_for_unusual_amount: true
};`,
    });
  }

  if (segment === 'enterprise_high_ticket' || segment === 'growth_high_volume') {
    actions.push({
      rank: 4,
      action: 'Enable Razorpay Magic Checkout with Pre-filled Addresses',
      estimated_monthly_recovery: Math.round(
        (transactions.reduce((s, t) => s + t.amount, 0) || 1000000) * 0.035
      ),
      effort: 'low',
      category: 'growth',
      reasoning:
        'Magic Checkout offers 1-click address autofill for 150M+ Indian consumers, cutting cart abandonment by up to 28%.',
      one_click_code: `// Enable Magic Checkout One-Click experience
<script src="https://checkout.razorpay.com/v1/magic-checkout.js"></script>`,
    });
  }

  actions.sort((a, b) => b.estimated_monthly_recovery - a.estimated_monthly_recovery);
  return actions.map((a, i) => ({ ...a, rank: i + 1 }));
}

export function auditMerchant(
  transactions: Transaction[],
  businessType: BusinessType = 'd2c_ecommerce'
): MerchantScoreResponse {
  const benchmark = INDUSTRY_BENCHMARKS[businessType] || INDUSTRY_BENCHMARKS.d2c_ecommerce;

  const risk = calculateRiskScore(transactions, benchmark);
  const conversion = calculateConversionScore(transactions, benchmark);
  const cost = calculateCostEfficiencyScore(transactions);
  const growth = calculateGrowthHeadroomScore(transactions);

  const composite = Math.round(
    risk.value * risk.weight +
      conversion.value * conversion.weight +
      cost.value * cost.weight +
      growth.value * growth.weight
  );

  const segment = segmentMerchant(transactions);
  const riskFlags = generateRiskFlags(transactions);
  const actions = generateRecommendedActions(risk, conversion, cost, growth, transactions, segment);

  const captured = transactions.filter((t) => t.status === 'captured');
  const failed = transactions.filter((t) => t.status === 'failed');
  const totalVolume = captured.reduce((sum, t) => sum + t.amount, 0);

  const upiCount = transactions.filter((t) => t.method === 'upi').length;
  const cardCount = transactions.filter((t) => t.method === 'card').length;
  const sub2kCardVol = transactions
    .filter((t) => t.amount < 2000 && t.method === 'card' && t.status === 'captured')
    .reduce((s, t) => s + t.amount, 0);

  const summary: TransactionSummary = {
    total_transactions: transactions.length,
    captured: captured.length,
    failed: failed.length,
    total_volume: Math.round(totalVolume),
    success_rate: transactions.length ? Math.round((captured.length / transactions.length) * 1000) / 10 : 0,
    avg_ticket_size: captured.length ? Math.round(totalVolume / captured.length) : 0,
    upi_share_pct: transactions.length ? Math.round((upiCount / transactions.length) * 100) : 0,
    card_share_pct: transactions.length ? Math.round((cardCount / transactions.length) * 100) : 0,
    sub_2k_card_volume: Math.round(sub2kCardVol),
  };

  return {
    merchant_pulse_score: Math.max(0, Math.min(100, composite)),
    breakdown: {
      risk,
      conversion,
      cost_efficiency: cost,
      growth_headroom: growth,
    },
    risk_flags: riskFlags,
    merchant_segment: segment,
    recommended_actions: actions,
    transaction_summary: summary,
    generated_at: new Date().toISOString(),
  };
}

export function generateDeterministicGrowthBrief(
  businessName: string,
  businessType: BusinessType,
  scoreData: MerchantScoreResponse
): GrowthBrief {
  const totalRecovery = scoreData.recommended_actions.reduce((s, a) => s + a.estimated_monthly_recovery, 0);
  const topAction = scoreData.recommended_actions[0]?.action || 'Enable Smart Retries';

  return {
    executive_summary: `${businessName} currently operates at a MerchantPulse Health Score of ${
      scoreData.merchant_pulse_score
    }/100 with a ${scoreData.transaction_summary.success_rate}% payment success rate across ₹${(
      scoreData.transaction_summary.total_volume / 100000
    ).toFixed(1)} Lakhs in processed GMV. Our agentic audit identifies ₹${Math.round(
      totalRecovery
    ).toLocaleString('en-IN')}/month in directly recoverable revenue through immediate payment funnel and MDR optimizations.`,
    total_potential_recovery_inr: totalRecovery,
    immediate_actions: scoreData.recommended_actions.slice(0, 3).map((a) => `${a.action} (Est: +₹${a.estimated_monthly_recovery.toLocaleString('en-IN')}/mo)`),
    strategic_recommendations: [
      'Migrate sub-₹2,000 credit card traffic to UPI Auto-routing to capitalize on RBI zero-MDR regulations.',
      'Deploy Razorpay Smart Intent on mobile web to bypass multi-app chooser friction.',
      'Calibrate risk velocity thresholds to halt bot card-testing without causing false-positive user rejections.',
    ],
    risk_assessment: `${scoreData.risk_flags.length} suspicious anomaly patterns detected (Score: ${scoreData.breakdown.risk.value}/100). ${scoreData.breakdown.risk.justification}`,
    cost_saving_opportunities: `Eliminating card processing fees on micro-tickets can save an estimated ₹${Math.round(
      scoreData.transaction_summary.sub_2k_card_volume * 0.019
    ).toLocaleString('en-IN')}/month.`,
    generated_by: 'deterministic_engine',
    generated_at: new Date().toISOString(),
  };
}

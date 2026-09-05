/**
 * Margin-Aware Dynamic Discount Engine
 * 
 * Instead of giving flat 10-20% discounts to everyone (which erodes contribution margin),
 * this engine balances 4 core vectors:
 * 1. Customer RFM Tier (Loyal vs Price-Sensitive vs New vs At-Risk)
 * 2. Churn Likelihood (0.0 to 1.0)
 * 3. Cart Basket Contribution Margin (e.g. 45% vs 12%)
 * 4. Fraud / Risk Score (0.0 to 1.0 - high risk users get 0% promo)
 */

export interface CustomerProfile {
  id: string;
  name: string;
  email: string;
  rfmSegment: 'VIP Loyal' | 'Price Sensitive' | 'High Potential' | 'At-Risk Churn' | 'New Visitor';
  clvScore: number; // 0 - 100
  churnProbability: number; // 0.0 - 1.0
  fraudRiskScore: number; // 0.0 - 1.0
  lifetimeOrders: number;
}

export interface DiscountDecision {
  discountPct: number;
  discountAmountInr: number;
  couponCode: string;
  rationale: string;
  marginPreservedPct: number;
  isOfferRecommended: boolean;
  alternativeIncentive?: string;
}

export const MOCK_CUSTOMER_PROFILES: CustomerProfile[] = [
  {
    id: 'cust-vip-01',
    name: 'Aarav Sharma',
    email: 'aarav.sharma@example.com',
    rfmSegment: 'VIP Loyal',
    clvScore: 94,
    churnProbability: 0.12,
    fraudRiskScore: 0.04,
    lifetimeOrders: 14,
  },
  {
    id: 'cust-ps-02',
    name: 'Pooja Verma',
    email: 'pooja.verma@example.com',
    rfmSegment: 'Price Sensitive',
    clvScore: 58,
    churnProbability: 0.65,
    fraudRiskScore: 0.08,
    lifetimeOrders: 3,
  },
  {
    id: 'cust-risk-03',
    name: 'Rohan Mehta',
    email: 'rohan.mehta@example.com',
    rfmSegment: 'At-Risk Churn',
    clvScore: 76,
    churnProbability: 0.82,
    fraudRiskScore: 0.11,
    lifetimeOrders: 7,
  },
  {
    id: 'cust-flag-04',
    name: 'Suspicious Guest',
    email: 'temp.proxy99@mailinator.com',
    rfmSegment: 'New Visitor',
    clvScore: 20,
    churnProbability: 0.50,
    fraudRiskScore: 0.89,
    lifetimeOrders: 0,
  },
];

export function calculateDynamicDiscount(
  cartTotal: number,
  averageMarginPct: number,
  customer: CustomerProfile
): DiscountDecision {
  // Rule 1: High fraud risk -> zero discount, step-up verification needed
  if (customer.fraudRiskScore >= 0.70) {
    return {
      discountPct: 0,
      discountAmountInr: 0,
      couponCode: 'VERIFY_REQ',
      rationale: `Zero discount: Fraud risk score (${Math.round(customer.fraudRiskScore * 100)}%) exceeds safe threshold. Standard verification applied.`,
      marginPreservedPct: averageMarginPct,
      isOfferRecommended: false,
      alternativeIncentive: 'Standard secure checkout',
    };
  }

  // Rule 2: Ultra low margin basket (< 20%) -> do not discount price, offer non-cash value
  if (averageMarginPct < 20) {
    return {
      discountPct: 0,
      discountAmountInr: 0,
      couponCode: 'FREESHIP',
      rationale: `Preserved unit economics: Cart margin (${averageMarginPct}%) is too low for cash discount. Granted priority free shipping to protect contribution margin.`,
      marginPreservedPct: averageMarginPct,
      isOfferRecommended: true,
      alternativeIncentive: 'Free Express Courier Shipping (Save ₹150)',
    };
  }

  // Rule 3: VIP Loyal customers with very low churn likelihood
  // They are already high intent! Giving them 20% off gives away pure profit.
  if (customer.rfmSegment === 'VIP Loyal' && customer.churnProbability < 0.25) {
    const conservativeDiscountPct = 5;
    const discountAmount = Math.round((cartTotal * conservativeDiscountPct) / 100);
    return {
      discountPct: conservativeDiscountPct,
      discountAmountInr: discountAmount,
      couponCode: 'VIP_PATRON5',
      rationale: `High organic intent: Customer has CLV ${customer.clvScore}/100 and low churn probability (${Math.round(customer.churnProbability * 100)}%). Granted 5% token loyalty credit to maximize contribution margin.`,
      marginPreservedPct: averageMarginPct - conservativeDiscountPct,
      isOfferRecommended: true,
      alternativeIncentive: 'Exclusive VIP Early Access to New Drops',
    };
  }

  // Rule 4: At-Risk Churn with solid CLV -> high intervention justified
  if (customer.rfmSegment === 'At-Risk Churn' || customer.churnProbability >= 0.70) {
    // Maximum safe discount = 35% of the margin
    const targetDiscountPct = Math.min(18, Math.round(averageMarginPct * 0.35));
    const discountAmount = Math.round((cartTotal * targetDiscountPct) / 100);
    return {
      discountPct: targetDiscountPct,
      discountAmountInr: discountAmount,
      couponCode: `RECOVER_${targetDiscountPct}`,
      rationale: `Win-back justified: High churn risk (${Math.round(customer.churnProbability * 100)}%) on high-margin (${averageMarginPct}%) basket. ${targetDiscountPct}% recovery incentive preserves ${averageMarginPct - targetDiscountPct}% net margin.`,
      marginPreservedPct: averageMarginPct - targetDiscountPct,
      isOfferRecommended: true,
    };
  }

  // Rule 5: Price Sensitive shopper with decent margin
  if (customer.rfmSegment === 'Price Sensitive') {
    const targetDiscountPct = Math.min(12, Math.round(averageMarginPct * 0.25));
    const discountAmount = Math.round((cartTotal * targetDiscountPct) / 100);
    return {
      discountPct: targetDiscountPct,
      discountAmountInr: discountAmount,
      couponCode: `SMART_${targetDiscountPct}`,
      rationale: `Conversion catalyst: Price-sensitive segment with ${Math.round(customer.churnProbability * 100)}% exit probability. ${targetDiscountPct}% discount unlocks estimated +31% conversion uplift.`,
      marginPreservedPct: averageMarginPct - targetDiscountPct,
      isOfferRecommended: true,
    };
  }

  // Default: New Visitor or general customer
  const defaultDiscountPct = 8;
  const discountAmount = Math.round((cartTotal * defaultDiscountPct) / 100);
  return {
    discountPct: defaultDiscountPct,
    discountAmountInr: discountAmount,
    couponCode: 'WELCOME8',
    rationale: `Acquisition tier: 8% welcome discount applied on ${averageMarginPct}% margin items.`,
    marginPreservedPct: averageMarginPct - defaultDiscountPct,
    isOfferRecommended: true,
  };
}

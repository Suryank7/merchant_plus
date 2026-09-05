import { BusinessType, MerchantPreset, Transaction } from './types';

export const MERCHANT_PRESETS: MerchantPreset[] = [
  {
    id: 'bombay-threads',
    name: 'Bombay Threads (D2C Apparel)',
    business_type: 'd2c_ecommerce',
    description: 'Trending streetwear brand experiencing checkout drop-offs and high card MDR on small items.',
    monthly_volume_inr: '₹18.4 Lakhs',
    highlight: '₹42,500/mo recoverable revenue in card-to-UPI routing & OTP drop-offs',
    transactions_count: 320,
  },
  {
    id: 'apexscale-saas',
    name: 'ApexScale AI (B2B Cloud SaaS)',
    business_type: 'b2b_saas',
    description: 'Developer infrastructure SaaS with cross-border payments and 3DS recurring failure spikes.',
    monthly_volume_inr: '₹64.2 Lakhs',
    highlight: '₹1.85 Lakhs/mo at risk from international card decline rules',
    transactions_count: 180,
  },
  {
    id: 'zippycart-grocery',
    name: 'ZippyCart (10-Min Hyperlocal)',
    business_type: 'quick_commerce',
    description: 'Rapid grocery delivery processing high-frequency micro-orders (₹200 - ₹600).',
    monthly_volume_inr: '₹34.8 Lakhs',
    highlight: '94% UPI volume, zero MDR potential on ₹12L micro-ticket basket',
    transactions_count: 450,
  },
  {
    id: 'vidyapeeth-tech',
    name: 'Vidyapeeth Pro (EdTech Bootcamps)',
    business_type: 'education',
    description: 'High-ticket tech career cohorts with EMI and split payments.',
    monthly_volume_inr: '₹45.0 Lakhs',
    highlight: 'No-cost EMI integration can lift conversion by +14%',
    transactions_count: 210,
  },
];

// Helper to generate realistic pseudo-random seed transactions
function generateSeedTransactions(presetId: string): Transaction[] {
  const txs: Transaction[] = [];
  const now = Math.floor(Date.now() / 1000);

  if (presetId === 'bombay-threads') {
    // 320 transactions: mix of UPI (60%), Card (35%), Netbanking (5%)
    // High failure on cards < ₹2000, some refunds
    for (let i = 0; i < 320; i++) {
      const isCard = i % 10 < 3.5; // ~35%
      const isRefunded = i % 25 === 0;
      const isFailed = i % 9 === 0;
      const amount = isCard && i % 3 === 0 ? Math.floor(450 + (i * 17) % 1200) : Math.floor(1200 + (i * 83) % 4500);

      txs.push({
        id: `pay_BT_${100000 + i}`,
        amount,
        currency: 'INR',
        status: isFailed ? 'failed' : isRefunded ? 'refunded' : 'captured',
        method: isCard ? 'card' : i % 20 === 0 ? 'netbanking' : 'upi',
        error_code: isFailed ? (i % 2 === 0 ? 'BAD_REQUEST_PAYMENT_TIMED_OUT' : 'GATEWAY_ERROR') : undefined,
        error_description: isFailed ? 'Customer dropped off at bank OTP screen' : undefined,
        created_at: now - (320 - i) * 1800,
        refund_status: isRefunded ? 'full' : null,
        international: i % 40 === 0,
        card_network: isCard ? (i % 2 === 0 ? 'Visa' : 'Mastercard') : undefined,
      });
    }
  } else if (presetId === 'apexscale-saas') {
    // 180 transactions: high ticket (₹15,000 - ₹1,20,000)
    // International card failures (3DS authentication issues)
    for (let i = 0; i < 180; i++) {
      const isInternational = i % 4 === 0;
      const isFailed = isInternational && i % 3 === 0;
      const isRefund = !isFailed && i % 35 === 0;
      const amount = Math.floor(18000 + (i * 731) % 95000);

      txs.push({
        id: `pay_AS_${200000 + i}`,
        amount,
        currency: 'INR',
        status: isFailed ? 'failed' : isRefund ? 'refunded' : 'captured',
        method: isInternational ? 'card' : i % 5 === 0 ? 'netbanking' : 'card',
        error_code: isFailed ? 'CARD_3D_SECURE_AUTH_FAILED' : undefined,
        error_description: isFailed ? 'International issuer declined non-3DS recurring mandate' : undefined,
        created_at: now - (180 - i) * 3600,
        refund_status: isRefund ? 'full' : null,
        international: isInternational,
        card_network: i % 2 === 0 ? 'Visa' : 'Mastercard',
      });
    }
  } else if (presetId === 'zippycart-grocery') {
    // 450 transactions: micro-tickets (₹150 - ₹850)
    // 92% UPI, very low failure, rapid checkout
    for (let i = 0; i < 450; i++) {
      const isUpi = i % 10 !== 0;
      const isFailed = i % 40 === 0;
      const amount = Math.floor(180 + (i * 13) % 650);

      txs.push({
        id: `pay_ZC_${300000 + i}`,
        amount,
        currency: 'INR',
        status: isFailed ? 'failed' : 'captured',
        method: isUpi ? 'upi' : 'card',
        error_code: isFailed ? 'BANK_SERVER_UNAVAILABLE' : undefined,
        error_description: isFailed ? 'Remitter bank UPI handle timeout' : undefined,
        created_at: now - (450 - i) * 900,
        refund_status: null,
        international: false,
        card_network: !isUpi ? 'RuPay' : undefined,
      });
    }
  } else {
    // Vidyapeeth EdTech: 210 transactions
    for (let i = 0; i < 210; i++) {
      const isFailed = i % 12 === 0;
      const isEmi = i % 3 === 0;
      const amount = Math.floor(15000 + (i * 410) % 55000);

      txs.push({
        id: `pay_VP_${400000 + i}`,
        amount,
        currency: 'INR',
        status: isFailed ? 'failed' : 'captured',
        method: isEmi ? 'card' : i % 2 === 0 ? 'netbanking' : 'upi',
        error_code: isFailed ? 'INSUFFICIENT_CREDIT_LIMIT' : undefined,
        error_description: isFailed ? 'Card declined due to insufficient installment limit' : undefined,
        created_at: now - (210 - i) * 2400,
        refund_status: i % 30 === 0 ? 'full' : null,
        international: false,
        card_network: 'Visa',
      });
    }
  }

  return txs;
}

const PRESET_CACHE: Record<string, Transaction[]> = {};

export function getPresetTransactions(presetId: string): Transaction[] {
  if (!PRESET_CACHE[presetId]) {
    PRESET_CACHE[presetId] = generateSeedTransactions(presetId);
  }
  return PRESET_CACHE[presetId];
}

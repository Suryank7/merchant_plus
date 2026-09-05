export interface AbandonedCartSession {
  id: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  productName: string;
  category: string;
  amount: number;
  marginPct: number;
  abandonedAt: string;
  timeElapsedMinutes: number;
  churnProbability: number;
  predictedRecoveryLikelihood: number;
  recommendedAction: string;
  smartDiscountPct: number;
  status: 'abandoned' | 'link_generated' | 'sms_dispatched' | 'recovered';
  paymentLinkUrl?: string;
}

export const INITIAL_ABANDONED_CARTS: AbandonedCartSession[] = [
  {
    id: 'cart-ab-101',
    customerName: 'Priya Sundaram',
    customerEmail: 'priya.sundaram@gmail.com',
    customerPhone: '+91 98450 12891',
    productName: 'AeroGlide Pro Trail Running Shoes (Size 8)',
    category: 'Footwear',
    amount: 4999,
    marginPct: 48,
    abandonedAt: new Date(Date.now() - 1000 * 60 * 32).toISOString(),
    timeElapsedMinutes: 32,
    churnProbability: 0.68,
    predictedRecoveryLikelihood: 0.81,
    recommendedAction: 'Send WhatsApp Razorpay Link with 10% Smart Dynamic Discount',
    smartDiscountPct: 10,
    status: 'abandoned',
  },
  {
    id: 'cart-ab-102',
    customerName: 'Vikramaditya Rao',
    customerEmail: 'vikram.rao@techcorp.io',
    customerPhone: '+91 98201 44521',
    productName: 'Titanium Minimalist EDC Chronograph',
    category: 'Accessories',
    amount: 8999,
    marginPct: 58,
    abandonedAt: new Date(Date.now() - 1000 * 60 * 78).toISOString(),
    timeElapsedMinutes: 78,
    churnProbability: 0.42,
    predictedRecoveryLikelihood: 0.92,
    recommendedAction: 'Send Priority Razorpay Payment Link (Preserve unit margin: Free Express Shipping)',
    smartDiscountPct: 0,
    status: 'abandoned',
  },
  {
    id: 'cart-ab-103',
    customerName: 'Ananya Deshmukh',
    customerEmail: 'ananya.deshmukh@yahoo.co.in',
    customerPhone: '+91 99112 87432',
    productName: 'AcousticPulse ANC Wireless Earbuds',
    category: 'Electronics',
    amount: 6499,
    marginPct: 38,
    abandonedAt: new Date(Date.now() - 1000 * 60 * 14).toISOString(),
    timeElapsedMinutes: 14,
    churnProbability: 0.79,
    predictedRecoveryLikelihood: 0.74,
    recommendedAction: 'Deploy Instant 8% Cart Recovery Token via Razorpay Link',
    smartDiscountPct: 8,
    status: 'abandoned',
  },
  {
    id: 'cart-ab-104',
    customerName: 'Kunal Singhal',
    customerEmail: 'kunal.singhal@outlook.com',
    customerPhone: '+91 97110 55639',
    productName: 'Merino Wool Performance Hoodie (M)',
    category: 'Apparel',
    amount: 3499,
    marginPct: 52,
    abandonedAt: new Date(Date.now() - 1000 * 60 * 145).toISOString(),
    timeElapsedMinutes: 145,
    churnProbability: 0.85,
    predictedRecoveryLikelihood: 0.65,
    recommendedAction: 'High churn threat: Dispatch 14% Time-Limited Win-Back Link (Valid 6h)',
    smartDiscountPct: 14,
    status: 'abandoned',
  },
];

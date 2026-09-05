import crypto from 'crypto';

export type PaymentStatus =
  | 'CREATED'
  | 'PAYMENT_PENDING'
  | 'PAID'
  | 'PAYMENT_FAILED'
  | 'AUTO_RETRY_INITIATED'
  | 'REFUND_PENDING'
  | 'REFUNDED';

export interface PaymentStateEvent {
  id: string;
  orderId: string;
  paymentId?: string;
  previousState: PaymentStatus;
  newState: PaymentStatus;
  timestamp: string;
  method: 'upi' | 'card' | 'netbanking';
  amount: number;
  currency: string;
  metadata?: Record<string, unknown>;
  errorMessage?: string;
}

export interface RazorpayOrderPayload {
  amount: number; // in paise
  currency: string;
  receipt: string;
  notes?: Record<string, string>;
  customer?: {
    name: string;
    email: string;
    contact?: string;
  };
}

export interface RazorpayOrderResponse {
  id: string;
  entity: 'order';
  amount: number;
  amount_paid: number;
  amount_due: number;
  currency: string;
  receipt: string;
  status: 'created' | 'attempted' | 'paid';
  attempts: number;
  notes: Record<string, string>;
  created_at: number;
  key_id: string;
}

// In-memory telemetry log for demo and hackathon presentation
export const PAYMENT_STATE_LOGS: PaymentStateEvent[] = [
  {
    id: 'evt-001',
    orderId: 'order_test_9831',
    paymentId: 'pay_test_9831_1',
    previousState: 'CREATED',
    newState: 'PAYMENT_PENDING',
    timestamp: new Date(Date.now() - 1000 * 60 * 12).toISOString(),
    method: 'upi',
    amount: 499900,
    currency: 'INR',
    metadata: { vpa: 'aarav@okaxis', gateway: 'HDFC_UPI' },
  },
  {
    id: 'evt-002',
    orderId: 'order_test_9831',
    paymentId: 'pay_test_9831_1',
    previousState: 'PAYMENT_PENDING',
    newState: 'PAID',
    timestamp: new Date(Date.now() - 1000 * 60 * 11).toISOString(),
    method: 'upi',
    amount: 499900,
    currency: 'INR',
    metadata: { rrn: '624109831092', bank_ref: 'HDFC18290' },
  },
];

export function createMockRazorpayOrder(payload: RazorpayOrderPayload): RazorpayOrderResponse {
  const orderId = `order_${Math.random().toString(36).substring(2, 9)}_${Date.now().toString().slice(-4)}`;
  const keyId = process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || 'rzp_test_MerchantPulseAi2026';

  const order: RazorpayOrderResponse = {
    id: orderId,
    entity: 'order',
    amount: payload.amount,
    amount_paid: 0,
    amount_due: payload.amount,
    currency: payload.currency || 'INR',
    receipt: payload.receipt,
    status: 'created',
    attempts: 0,
    notes: payload.notes || {},
    created_at: Math.floor(Date.now() / 1000),
    key_id: keyId,
  };

  // Log transition
  PAY_STATE_TRANSITION(orderId, 'CREATED', 'PAYMENT_PENDING', payload.amount, 'upi');

  return order;
}

export function verifyRazorpaySignature(
  orderId: string,
  paymentId: string,
  signature: string,
  secret?: string
): { isValid: boolean; generatedSignature: string } {
  const secretKey = secret || process.env.RAZORPAY_KEY_SECRET || 'rzp_secret_demo_token_salt_2026';
  const body = `${orderId}|${paymentId}`;
  const generatedSignature = crypto.createHmac('sha256', secretKey).update(body).digest('hex');

  const isValid = generatedSignature === signature;
  return { isValid, generatedSignature };
}

export function PAY_STATE_TRANSITION(
  orderId: string,
  from: PaymentStatus,
  to: PaymentStatus,
  amount: number,
  method: 'upi' | 'card' | 'netbanking' = 'upi',
  paymentId?: string,
  metadata?: Record<string, unknown>
): PaymentStateEvent {
  const event: PaymentStateEvent = {
    id: `evt_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
    orderId,
    paymentId: paymentId || `pay_${Math.random().toString(36).substring(2, 9)}`,
    previousState: from,
    newState: to,
    timestamp: new Date().toISOString(),
    method,
    amount,
    currency: 'INR',
    metadata,
  };

  PAYMENT_STATE_LOGS.unshift(event);
  if (PAYMENT_STATE_LOGS.length > 50) {
    PAYMENT_STATE_LOGS.pop();
  }

  return event;
}

export function generateRazorpayPaymentLink(params: {
  amount: number;
  customerName: string;
  customerEmail: string;
  description: string;
  discountAppliedInr: number;
}): { linkUrl: string; linkId: string; expiresAt: string } {
  const linkId = `plink_${Math.random().toString(36).substring(2, 9)}`;
  const expiresAt = new Date(Date.now() + 1000 * 60 * 60 * 24).toISOString(); // 24h expiry
  const linkUrl = `https://rzp.io/i/${linkId}`;

  return { linkUrl, linkId, expiresAt };
}

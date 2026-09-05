import { NextRequest, NextResponse } from 'next/server';
import { createMockRazorpayOrder, RazorpayOrderPayload } from '@/lib/razorpay-service';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { amount, currency = 'INR', receipt, notes, customer } = body;

    if (!amount || amount <= 0) {
      return NextResponse.json({ error: 'Valid amount is required (paise)' }, { status: 400 });
    }

    const payload: RazorpayOrderPayload = {
      amount,
      currency,
      receipt: receipt || `rcpt_${Date.now()}`,
      notes: notes || {},
      customer,
    };

    // If real Razorpay credentials are in environment, we could call Razorpay SDK
    // Otherwise, generate official-shaped order object with live state tracking
    const order = createMockRazorpayOrder(payload);

    return NextResponse.json({
      success: true,
      order,
      key_id: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || 'rzp_test_MerchantPulseAi2026',
    });
  } catch (error) {
    console.error('Razorpay order creation error:', error);
    return NextResponse.json({ error: 'Failed to create Razorpay order' }, { status: 500 });
  }
}

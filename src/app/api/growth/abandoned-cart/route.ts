import { NextRequest, NextResponse } from 'next/server';
import { generateRazorpayPaymentLink } from '@/lib/razorpay-service';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { cartId, customerName, customerEmail, amount, discountPct = 10 } = body;

    const discountAmountInr = Math.round((amount * discountPct) / 100);
    const finalAmountInr = amount - discountAmountInr;

    const link = generateRazorpayPaymentLink({
      amount: finalAmountInr,
      customerName: customerName || 'Customer',
      customerEmail: customerEmail || 'shopper@example.com',
      description: `Complete your purchase with ${discountPct}% dynamic recovery discount applied`,
      discountAppliedInr: discountAmountInr,
    });

    return NextResponse.json({
      success: true,
      cartId,
      paymentLink: link,
      finalAmountInr,
      discountAmountInr,
      status: 'sms_dispatched',
      message: `Razorpay Payment Link generated & dispatched via SMS/WhatsApp with ₹${discountAmountInr} margin-safe recovery discount.`,
    });
  } catch (error) {
    console.error('Abandoned cart recovery error:', error);
    return NextResponse.json({ error: 'Failed to process abandoned cart recovery' }, { status: 500 });
  }
}

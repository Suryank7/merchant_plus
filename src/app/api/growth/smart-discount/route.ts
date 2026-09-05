import { NextRequest, NextResponse } from 'next/server';
import { calculateDynamicDiscount, CustomerProfile, MOCK_CUSTOMER_PROFILES } from '@/lib/smart-discount';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { cartTotal, averageMarginPct = 45, customerId } = body;

    const customer: CustomerProfile =
      MOCK_CUSTOMER_PROFILES.find((c) => c.id === customerId) || MOCK_CUSTOMER_PROFILES[1];

    const decision = calculateDynamicDiscount(cartTotal || 4999, averageMarginPct, customer);

    return NextResponse.json({
      success: true,
      decision,
      customerProfile: customer,
    });
  } catch (error) {
    console.error('Smart discount error:', error);
    return NextResponse.json({ error: 'Failed to calculate dynamic discount' }, { status: 500 });
  }
}

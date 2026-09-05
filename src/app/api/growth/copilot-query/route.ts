import { NextRequest, NextResponse } from 'next/server';
import { runDiagnosticQuery } from '@/lib/copilot-engine';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { query } = body;

    if (!query || typeof query !== 'string') {
      return NextResponse.json({ error: 'Query string is required' }, { status: 400 });
    }

    const result = runDiagnosticQuery(query);

    return NextResponse.json({
      success: true,
      result,
    });
  } catch (error) {
    console.error('Copilot query error:', error);
    return NextResponse.json({ error: 'Failed to process diagnostic query' }, { status: 500 });
  }
}

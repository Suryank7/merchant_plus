import { NextRequest, NextResponse } from 'next/server';
import { auditMerchant, generateDeterministicGrowthBrief } from '@/lib/audit-engine';
import { BusinessType, Transaction } from '@/lib/types';
import Anthropic from '@anthropic-ai/sdk';

export const runtime = 'nodejs';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      transactions = [],
      businessType = 'd2c_ecommerce',
      businessName = 'Sample Merchant Store',
    }: {
      transactions: Transaction[];
      businessType: BusinessType;
      businessName: string;
    } = body;

    // 1. Run deterministic scoring audit
    const scoreData = auditMerchant(transactions, businessType);

    // 2. Try generating LLM executive brief via Claude Sonnet if API key exists
    const apiKey = process.env.ANTHROPIC_API_KEY;
    let growthBrief = generateDeterministicGrowthBrief(businessName, businessType, scoreData);

    if (apiKey) {
      try {
        const anthropic = new Anthropic({ apiKey });

        const prompt = `You are an elite Razorpay Principal Payment Solutions Architect and Growth Copilot.
Analyze this merchant's payment health audit and deliver a punchy, high-impact executive growth briefing for their Founders and Head of Payments.

Merchant Details:
- Name: ${businessName}
- Business Type: ${businessType}
- Overall MerchantPulse Score: ${scoreData.merchant_pulse_score}/100
- Success Rate: ${scoreData.transaction_summary.success_rate}%
- Processed GMV: INR ${scoreData.transaction_summary.total_volume.toLocaleString('en-IN')}
- UPI Share: ${scoreData.transaction_summary.upi_share_pct}% | Card Share: ${scoreData.transaction_summary.card_share_pct}%
- Failed Orders: ${scoreData.transaction_summary.failed}
- Risk Anomalies: ${scoreData.risk_flags.length} flagged

Sub-Score Breakdown:
- Fraud Risk (30% weight): ${scoreData.breakdown.risk.value}/100 — ${scoreData.breakdown.risk.justification}
- Conversion Health (30% weight): ${scoreData.breakdown.conversion.value}/100 — ${scoreData.breakdown.conversion.justification}
- Cost Efficiency (20% weight): ${scoreData.breakdown.cost_efficiency.value}/100 — ${scoreData.breakdown.cost_efficiency.justification}
- Growth Headroom (20% weight): ${scoreData.breakdown.growth_headroom.value}/100 — ${scoreData.breakdown.growth_headroom.justification}

Top Interventions:
${scoreData.recommended_actions
  .map(
    (a) =>
      `#${a.rank}: ${a.action} (Est. Monthly Recovery: INR ${a.estimated_monthly_recovery.toLocaleString('en-IN')})`
  )
  .join('\n')}

Format your response as strict JSON with this schema:
{
  "executive_summary": "2-3 concise, impactful sentences highlighting health score, primary leakage points, and total INR impact.",
  "total_potential_recovery_inr": ${scoreData.recommended_actions.reduce((s, a) => s + a.estimated_monthly_recovery, 0)},
  "immediate_actions": ["3 bullet items with actionable next steps"],
  "strategic_recommendations": ["3 strategic architectural recommendations for scale"],
  "risk_assessment": "Summary of chargeback and fraud exposure",
  "cost_saving_opportunities": "Specific savings on MDR / interchange"
}`;

        const response = await anthropic.messages.create({
          model: 'claude-3-5-sonnet-20241022',
          max_tokens: 1200,
          temperature: 0.2,
          system: 'You are an expert payment systems architect at Razorpay. Respond ONLY with valid JSON.',
          messages: [{ role: 'user', content: prompt }],
        });

        const content = response.content[0];
        if (content.type === 'text') {
          const cleaned = content.text.replace(/```json\n?|\n?```/g, '').trim();
          const parsed = JSON.parse(cleaned);
          growthBrief = {
            ...parsed,
            generated_by: 'claude_sonnet',
            generated_at: new Date().toISOString(),
          };
        }
      } catch (err) {
        console.warn('Anthropic LLM brief generation failed or timed out, using deterministic brief:', err);
      }
    }

    return NextResponse.json({
      success: true,
      scoreData,
      growthBrief,
    });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Unknown audit error';
    return NextResponse.json({ success: false, error: message }, { status: 500 });
  }
}

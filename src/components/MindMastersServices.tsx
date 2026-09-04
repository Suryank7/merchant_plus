'use client';

import React, { useState } from 'react';
import { ShieldAlert, TrendingUp, DollarSign, Rocket, ChevronRight, Check, Info } from 'lucide-react';
import { SubScore } from '@/lib/types';

interface MindMastersServicesProps {
  breakdown: {
    risk: SubScore;
    conversion: SubScore;
    cost_efficiency: SubScore;
    growth_headroom: SubScore;
  };
}

export function MindMastersServices({ breakdown }: MindMastersServicesProps) {
  const [activeExplainId, setActiveExplainId] = useState<string | null>(null);

  const pillars = [
    {
      id: 'risk',
      num: '01',
      title: 'Fraud Anomaly & Chargeback Risk',
      weight: '30% Weight',
      score: breakdown.risk.value,
      icon: ShieldAlert,
      desc: 'Statistical outlier isolation using Z-scores and feature importances from supervised XGBoost + SMOTE modeling.',
      features: [
        'Z > 2.8σ High-Ticket Outlier Detection',
        'Abnormal Rapid Refund Spikes',
        'Cross-Border Card Testing Rules',
        'Zero-Hallucination Deterministic Math',
      ],
      justification: breakdown.risk.justification,
      provenance: 'transaction-fraud-detection (ROC-AUC 0.982) & ctgan-fraud-detection',
    },
    {
      id: 'conversion',
      num: '02',
      title: 'Payment Conversion Health',
      weight: '30% Weight',
      score: breakdown.conversion.value,
      icon: TrendingUp,
      desc: 'Real-time payment success rate benchmarking against industry peers (D2C 95%, SaaS 97%, Quick Commerce 98%).',
      features: [
        'Payment Method Success Breakdown',
        'Bank Downtime vs. App Drop-offs',
        '3DS Authentication Friction Profiling',
        'Sub-second Gap Analysis',
      ],
      justification: breakdown.conversion.justification,
      provenance: 'auto_stream_agent Payment Gateway Harvester & Industry Benchmarks',
    },
    {
      id: 'cost_efficiency',
      num: '03',
      title: 'Cost & Zero-MDR UPI Arbitrage',
      weight: '20% Weight',
      score: breakdown.cost_efficiency.value,
      icon: DollarSign,
      desc: 'Quantifies fee leakages on micro-orders eligible for RBI zero-MDR UPI regulations instead of 1.5–2.5% card fees.',
      features: [
        'Sub-₹2,000 Card Transaction Isolation',
        'Avoidable MDR Monthly Fee Calculator',
        'UPI Auto-Intent Prioritization',
        'RuPay Debit Card Fee Elimination',
      ],
      justification: breakdown.cost_efficiency.justification,
      provenance: 'credex_task SaaS Audit Pattern adapted for RBI Zero-MDR UPI Arbitrage',
    },
    {
      id: 'growth_headroom',
      num: '04',
      title: 'Growth Headroom & Recovery',
      weight: '20% Weight',
      score: breakdown.growth_headroom.value,
      icon: Rocket,
      desc: 'Calculates directly recoverable revenue by activating smart background retries and 1-click address autofill.',
      features: [
        'Razorpay Smart Intent Recovery Model',
        'Magic Checkout Pre-filled Address Lift',
        'Multi-app Chooser Friction Bypass',
        'Merchant Cohort Cluster Triage',
      ],
      justification: breakdown.growth_headroom.justification,
      provenance: 'customer-segmentation-retail (K-Means) & LangGraph Growth Recommender',
    },
  ];

  return (
    <section id="pillars" className="relative py-24 sm:py-32 bg-[#06070b] overflow-hidden">
      {/* Background ambient glows matching MindMasters AI */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div
          className="absolute top-[12%] left-[-10%] h-[35vw] w-[35vw] rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(0,242,255,0.06), transparent 60%)',
            filter: 'blur(110px)',
          }}
        />
        <div
          className="absolute bottom-[8%] right-[-10%] h-[35vw] w-[35vw] rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(167,139,250,0.06), transparent 60%)',
            filter: 'blur(110px)',
          }}
        />
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-12 sm:mb-16">
          <span className="text-[11px] sm:text-[12px] font-mono font-semibold uppercase tracking-[0.2em] text-[#74f5ff]">
            Explainable AI Architecture
          </span>
          <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-white mt-2.5">
            4 Pillars of Payment Health
          </h2>
          <span className="mt-3 block h-[2.5px] w-12 rounded-full bg-gradient-to-r from-[#00f2ff] to-[#a78bfa]" />
          <p className="mt-3.5 max-w-xl text-[14px] sm:text-[15px] text-white/65 leading-relaxed">
            Every score is 100% auditable and backed by deterministic formulas, statistical anomaly models, and peer benchmarks.
          </p>
        </div>

        {/* Services / Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {pillars.map((pillar) => {
            const Icon = pillar.icon;
            const isExpanded = activeExplainId === pillar.id;

            return (
              <div
                key={pillar.id}
                className="group relative overflow-hidden rounded-2xl border border-white/10 bg-[#0b0c12] p-5 sm:p-6 shadow-xl flex flex-col justify-between transition-all duration-300 hover:border-[#74f5ff]/35 hover:shadow-[0_0_30px_rgba(0,242,255,0.08)]"
              >
                <div>
                  {/* Card Top */}
                  <div className="flex items-center justify-between gap-2 mb-4">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/[0.08] border border-white/15 text-[#74f5ff] backdrop-blur-md">
                      <Icon className="h-5 w-5" />
                    </div>
                    <span className="text-[11px] font-mono font-bold tracking-widest text-[#74f5ff]/80 uppercase">
                      {pillar.num}
                    </span>
                  </div>

                  {/* Score & Weight */}
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <span className="text-2xl font-extrabold text-white tracking-tight">
                      {pillar.score}
                      <span className="text-xs font-normal text-white/40">/100</span>
                    </span>
                    <span className="text-[10px] font-mono font-semibold uppercase tracking-wider text-[#a78bfa] bg-[#a78bfa]/10 border border-[#a78bfa]/20 px-2 py-0.5 rounded-full">
                      {pillar.weight}
                    </span>
                  </div>

                  <h3 className="text-base sm:text-lg font-bold uppercase tracking-tight text-white mb-2 group-hover:text-[#74f5ff] transition-colors">
                    {pillar.title}
                  </h3>

                  <p className="text-xs text-white/65 leading-relaxed mb-4">
                    {pillar.desc}
                  </p>

                  {/* Feature Checklist matching MindMasters */}
                  <div className="space-y-1.5 mb-5">
                    {pillar.features.map((feat, idx) => (
                      <div key={idx} className="flex items-center gap-2 text-[11px] text-white/80 font-medium">
                        <span className="h-1.5 w-1.5 rounded-full bg-[#74f5ff] shrink-0" />
                        <span className="truncate">{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Bottom Explainability Link Drawer */}
                <div className="pt-3 border-t border-white/[0.08]">
                  <button
                    onClick={() => setActiveExplainId(isExpanded ? null : pillar.id)}
                    className="w-full inline-flex items-center justify-between text-xs font-semibold text-[#74f5ff] uppercase tracking-wider hover:underline"
                  >
                    <span>{isExpanded ? 'Hide Justification' : 'View Justification'}</span>
                    <ChevronRight
                      className={`h-3.5 w-3.5 transition-transform ${isExpanded ? 'rotate-90' : ''}`}
                    />
                  </button>

                  {isExpanded && (
                    <div className="mt-3 p-3 rounded-xl bg-[#07080d] border border-white/10 text-[11px] text-white/80 space-y-2 animate-in fade-in">
                      <p className="leading-relaxed text-white/90">{pillar.justification}</p>
                      <div className="pt-2 border-t border-white/[0.06] text-[10px] font-mono text-white/40">
                        {pillar.provenance}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

'use client';

import React from 'react';
import { MerchantScoreResponse } from '@/lib/types';
import { TrendingUp, AlertTriangle, IndianRupee, ShieldCheck, FileText, CheckCircle2, ArrowRight } from 'lucide-react';

interface MindMastersCockpitProps {
  scoreData: MerchantScoreResponse;
  merchantName: string;
  onOpenBrief: () => void;
  onRunAudit: () => void;
  isRunning: boolean;
}

export function MindMastersCockpit({
  scoreData,
  merchantName,
  onOpenBrief,
  onRunAudit,
  isRunning,
}: MindMastersCockpitProps) {
  const score = scoreData.merchant_pulse_score;

  // Exact MindMasters electric color coding
  let strokeColor = '#74f5ff'; // Electric Cyan
  let textColor = 'text-[#74f5ff]';
  let badgeBorder = 'border-[#74f5ff]/30 text-[#74f5ff] bg-[#74f5ff]/10';
  let statusText = 'Optimal Payment Health';

  if (score < 65) {
    strokeColor = '#f43f5e';
    textColor = 'text-rose-400';
    badgeBorder = 'border-rose-500/30 text-rose-400 bg-rose-500/10';
    statusText = 'Critical Revenue Leakage';
  } else if (score < 80) {
    strokeColor = '#fbbf24';
    textColor = 'text-amber-400';
    badgeBorder = 'border-amber-500/30 text-amber-400 bg-amber-500/10';
    statusText = 'Optimization Potential';
  }

  const radius = 68;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (score / 100) * circumference;

  const totalRecovery = scoreData.recommended_actions.reduce(
    (acc, a) => acc + a.estimated_monthly_recovery,
    0
  );

  return (
    <section id="cockpit" className="relative py-16 sm:py-24 bg-[#08090c] overflow-hidden">
      {/* Background glow */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[70vw] h-[40vw] max-w-[900px]"
          style={{
            background: 'radial-gradient(ellipse at center, rgba(116,245,255,0.08), transparent 70%)',
            filter: 'blur(120px)',
          }}
        />
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl border border-white/10 bg-gradient-to-b from-[#0e1017] to-[#07080d] p-6 sm:p-10 shadow-2xl relative overflow-hidden">
          {/* Top Title Bar */}
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 pb-8 border-b border-white/[0.08]">
            <div>
              <div className="flex flex-wrap items-center gap-2.5 mb-2">
                <span className={`px-3 py-1 rounded-full text-[11px] font-mono font-bold uppercase tracking-wider border ${badgeBorder}`}>
                  {statusText}
                </span>
                <span className="px-3 py-1 rounded-full text-[11px] font-mono text-white/60 bg-white/[0.04] border border-white/10">
                  Cohort: {scoreData.merchant_segment.replace(/_/g, ' ')}
                </span>
              </div>
              <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
                {merchantName} — Live Health Telemetry
              </h2>
            </div>

            {/* Quick action buttons */}
            <div className="flex items-center gap-3">
              <button
                onClick={onOpenBrief}
                className="btn-shiny-pill rounded-full inline-flex items-center gap-2 text-xs sm:text-sm font-medium px-5 py-2.5 cursor-pointer"
              >
                <FileText className="w-4 h-4 text-[#74f5ff]" />
                <span>Executive Brief</span>
              </button>
            </div>
          </div>

          {/* Central Metric Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center pt-8">
            {/* Left: Gauge */}
            <div className="lg:col-span-4 flex flex-col items-center justify-center p-6 rounded-2xl bg-[#090b10] border border-white/[0.06]">
              <div className="relative flex items-center justify-center">
                <svg className="w-48 h-48 transform -rotate-90">
                  <circle
                    cx="96"
                    cy="96"
                    r={radius}
                    className="text-white/10"
                    strokeWidth="12"
                    stroke="currentColor"
                    fill="transparent"
                  />
                  <circle
                    cx="96"
                    cy="96"
                    r={radius}
                    stroke={strokeColor}
                    strokeWidth="12"
                    strokeDasharray={circumference}
                    strokeDashoffset={strokeDashoffset}
                    strokeLinecap="round"
                    fill="transparent"
                    className="transition-all duration-1000 ease-out"
                  />
                </svg>
                <div className="absolute flex flex-col items-center justify-center">
                  <span className={`text-5xl font-black tracking-tight ${textColor}`}>
                    {score}
                  </span>
                  <span className="text-[10px] font-mono uppercase font-bold tracking-widest text-white/40 mt-0.5">
                    Pulse Index
                  </span>
                </div>
              </div>
              <span className="text-xs text-white/60 mt-4 text-center">
                Deterministic Composite Score across 4 Weighted Pillars
              </span>
            </div>

            {/* Right: Key Stats */}
            <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-3 gap-4">
              {/* Stat 1 */}
              <div className="p-5 rounded-2xl bg-[#0b0d14] border border-white/10 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between text-xs text-white/50 mb-2">
                    <span>Recoverable / Mo</span>
                    <IndianRupee className="w-4 h-4 text-[#74f5ff]" />
                  </div>
                  <p className="text-2xl sm:text-3xl font-black text-[#74f5ff] tracking-tight">
                    ₹{Math.round(totalRecovery).toLocaleString('en-IN')}
                  </p>
                </div>
                <span className="text-[11px] text-white/40 mt-3 pt-3 border-t border-white/[0.06]">
                  Via zero-MDR &amp; smart retries
                </span>
              </div>

              {/* Stat 2 */}
              <div className="p-5 rounded-2xl bg-[#0b0d14] border border-white/10 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between text-xs text-white/50 mb-2">
                    <span>Success Rate</span>
                    <TrendingUp className="w-4 h-4 text-[#a78bfa]" />
                  </div>
                  <p className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                    {scoreData.transaction_summary.success_rate}%
                  </p>
                </div>
                <span className="text-[11px] text-white/40 mt-3 pt-3 border-t border-white/[0.06]">
                  {scoreData.transaction_summary.captured} / {scoreData.transaction_summary.total_transactions} orders
                </span>
              </div>

              {/* Stat 3 */}
              <div className="p-5 rounded-2xl bg-[#0b0d14] border border-white/10 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between text-xs text-white/50 mb-2">
                    <span>Risk Outliers</span>
                    <AlertTriangle className="w-4 h-4 text-amber-400" />
                  </div>
                  <p className="text-2xl sm:text-3xl font-black text-amber-400 tracking-tight">
                    {scoreData.risk_flags.length}
                  </p>
                </div>
                <span className="text-[11px] text-white/40 mt-3 pt-3 border-t border-white/[0.06]">
                  Statistical Z &gt; 2.8σ flags
                </span>
              </div>

              {/* Stat 4 (Full Width) */}
              <div className="sm:col-span-3 p-4 rounded-xl bg-white/[0.02] border border-white/[0.06] flex flex-wrap items-center justify-between gap-4 text-xs text-white/60">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#74f5ff]" />
                  <span>
                    Processed GMV: <strong className="text-white">₹{(scoreData.transaction_summary.total_volume / 100000).toFixed(2)} Lakhs</strong>
                  </span>
                </div>
                <div className="flex items-center gap-4 text-white/50">
                  <span>UPI Share: <strong className="text-white">{scoreData.transaction_summary.upi_share_pct}%</strong></span>
                  <span>Card Share: <strong className="text-white">{scoreData.transaction_summary.card_share_pct}%</strong></span>
                  <span>Avoidable Card GMV: <strong className="text-amber-400">₹{scoreData.transaction_summary.sub_2k_card_volume.toLocaleString('en-IN')}</strong></span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

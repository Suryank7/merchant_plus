'use client';

import React from 'react';
import { MerchantScoreResponse } from '@/lib/types';
import { TrendingUp, AlertTriangle, IndianRupee, ShieldCheck, FileText, CheckCircle2 } from 'lucide-react';

interface ScoreHeroProps {
  scoreData: MerchantScoreResponse;
  merchantName: string;
  onOpenBrief: () => void;
  onOpenTraces: () => void;
}

export function ScoreHero({
  scoreData,
  merchantName,
  onOpenBrief,
  onOpenTraces,
}: ScoreHeroProps) {
  const score = scoreData.merchant_pulse_score;

  // Color coding
  let strokeColor = '#00d09c'; // emerald
  let textColor = 'text-emerald-400';
  let badgeBg = 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20';
  let statusText = 'Optimal Health';

  if (score < 65) {
    strokeColor = '#f43f5e'; // rose
    textColor = 'text-rose-400';
    badgeBg = 'bg-rose-500/10 text-rose-400 border-rose-500/20';
    statusText = 'Critical Leakage';
  } else if (score < 80) {
    strokeColor = '#f59e0b'; // amber
    textColor = 'text-amber-400';
    badgeBg = 'bg-amber-500/10 text-amber-400 border-amber-500/20';
    statusText = 'Moderate Optimization Potential';
  }

  // Ring calculations
  const radius = 64;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (score / 100) * circumference;

  const totalRecovery = scoreData.recommended_actions.reduce(
    (acc, a) => acc + a.estimated_monthly_recovery,
    0
  );

  return (
    <div className="relative overflow-hidden rounded-2xl bg-gradient-to-b from-[#111827]/90 to-[#0c1322]/90 border border-slate-800 p-6 md:p-8 shadow-2xl">
      {/* Background ambient glow */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-sky-500/10 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none -ml-20 -mb-20" />

      <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-8">
        {/* Left: Score Gauge */}
        <div className="flex flex-col sm:flex-row items-center gap-6 text-center sm:text-left">
          <div className="relative flex items-center justify-center">
            <svg className="w-40 h-40 transform -rotate-90">
              <circle
                cx="80"
                cy="80"
                r={radius}
                className="text-slate-800"
                strokeWidth="10"
                stroke="currentColor"
                fill="transparent"
              />
              <circle
                cx="80"
                cy="80"
                r={radius}
                stroke={strokeColor}
                strokeWidth="10"
                strokeDasharray={circumference}
                strokeDashoffset={strokeDashoffset}
                strokeLinecap="round"
                fill="transparent"
                className="transition-all duration-1000 ease-out"
              />
            </svg>
            <div className="absolute flex flex-col items-center justify-center">
              <span className={`text-4xl font-black tracking-tighter ${textColor}`}>
                {score}
              </span>
              <span className="text-[10px] uppercase font-bold tracking-wider text-slate-400">
                Score / 100
              </span>
            </div>
          </div>

          <div>
            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 mb-2">
              <span className={`px-2.5 py-0.5 rounded-full text-xs font-semibold border ${badgeBg}`}>
                {statusText}
              </span>
              <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-slate-800 text-slate-300 border border-slate-700">
                Segment: {scoreData.merchant_segment.replace(/_/g, ' ')}
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              {merchantName}
            </h1>
            <p className="text-sm text-slate-400 mt-1 max-w-md">
              Continuous agentic audit of checkout conversion, fraud anomaly thresholds, and MDR interchange costs.
            </p>
          </div>
        </div>

        {/* Right: Key Impact Highlights */}
        <div className="w-full lg:w-auto grid grid-cols-2 sm:grid-cols-3 gap-3">
          <div className="bg-slate-900/80 border border-slate-800/80 rounded-xl p-4 flex flex-col justify-between">
            <div className="flex items-center gap-1.5 text-slate-400 text-xs font-medium mb-1">
              <IndianRupee className="w-3.5 h-3.5 text-emerald-400" />
              <span>Recoverable / mo</span>
            </div>
            <p className="text-xl sm:text-2xl font-black text-emerald-400 tracking-tight">
              ₹{Math.round(totalRecovery).toLocaleString('en-IN')}
            </p>
            <span className="text-[10px] text-slate-400 mt-1">From failures & MDR leak</span>
          </div>

          <div className="bg-slate-900/80 border border-slate-800/80 rounded-xl p-4 flex flex-col justify-between">
            <div className="flex items-center gap-1.5 text-slate-400 text-xs font-medium mb-1">
              <TrendingUp className="w-3.5 h-3.5 text-sky-400" />
              <span>Success Rate</span>
            </div>
            <p className="text-xl sm:text-2xl font-black text-white tracking-tight">
              {scoreData.transaction_summary.success_rate}%
            </p>
            <span className="text-[10px] text-slate-400 mt-1">
              {scoreData.transaction_summary.captured} / {scoreData.transaction_summary.total_transactions} orders
            </span>
          </div>

          <div className="col-span-2 sm:col-span-1 bg-slate-900/80 border border-slate-800/80 rounded-xl p-4 flex flex-col justify-between">
            <div className="flex items-center gap-1.5 text-slate-400 text-xs font-medium mb-1">
              <AlertTriangle className="w-3.5 h-3.5 text-amber-400" />
              <span>Risk Anomalies</span>
            </div>
            <p className="text-xl sm:text-2xl font-black text-amber-400 tracking-tight">
              {scoreData.risk_flags.length}
            </p>
            <span className="text-[10px] text-slate-400 mt-1">Flagged for review</span>
          </div>
        </div>
      </div>

      {/* Bottom Action Strip */}
      <div className="mt-6 pt-6 border-t border-slate-800/80 flex flex-wrap items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-2 text-slate-400">
          <CheckCircle2 className="w-4 h-4 text-[#00d09c]" />
          <span>Audited with deterministic XAI formulas + LangGraph agentic reasoning</span>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={onOpenTraces}
            className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 font-medium transition"
          >
            View Agent Pipeline Traces
          </button>
          <button
            onClick={onOpenBrief}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-sky-500/10 hover:bg-sky-500/20 text-sky-400 border border-sky-500/30 font-medium transition"
          >
            <FileText className="w-3.5 h-3.5" />
            <span>Executive Growth Brief</span>
          </button>
        </div>
      </div>
    </div>
  );
}

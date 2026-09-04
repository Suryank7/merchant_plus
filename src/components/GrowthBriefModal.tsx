'use client';

import React, { useState } from 'react';
import { GrowthBrief } from '@/lib/types';
import { X, Copy, Check, Printer, Sparkles, IndianRupee } from 'lucide-react';

interface GrowthBriefModalProps {
  isOpen: boolean;
  onClose: () => void;
  brief: GrowthBrief;
  merchantName: string;
}

export function GrowthBriefModal({
  isOpen,
  onClose,
  brief,
  merchantName,
}: GrowthBriefModalProps) {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const handleCopy = () => {
    const text = `MERCHANTPULSE AI — EXECUTIVE GROWTH BRIEF
Merchant: ${merchantName}
Date: ${new Date(brief.generated_at).toLocaleDateString()}
Engine: ${brief.generated_by}

EXECUTIVE SUMMARY:
${brief.executive_summary}

TOTAL RECOVERABLE REVENUE: INR ${Math.round(brief.total_potential_recovery_inr).toLocaleString('en-IN')}/month

IMMEDIATE ACTION PLAN:
${brief.immediate_actions.map((a, i) => `${i + 1}. ${a}`).join('\n')}

STRATEGIC RECOMMENDATIONS:
${brief.strategic_recommendations.map((r, i) => `${i + 1}. ${r}`).join('\n')}

RISK & CHARGEBACK ASSESSMENT:
${brief.risk_assessment}

MDR COST OPTIMIZATION:
${brief.cost_saving_opportunities}
`;

    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in">
      <div className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-3xl bg-gradient-to-b from-[#0f111a] to-[#07080d] border border-white/15 shadow-2xl p-6 sm:p-10 text-white">
        {/* Modal Header */}
        <div className="flex items-start justify-between gap-4 pb-6 border-b border-white/[0.08]">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="px-3 py-1 rounded-full text-[10px] font-mono font-bold uppercase tracking-wider bg-[#74f5ff]/10 text-[#74f5ff] border border-[#74f5ff]/20">
                Executive Audit Report
              </span>
              <span className="px-3 py-1 rounded-full text-[10px] font-mono font-bold uppercase tracking-wider bg-[#a78bfa]/10 text-[#a78bfa] border border-[#a78bfa]/20">
                {brief.generated_by === 'claude_sonnet' ? 'Claude 3.5 Sonnet' : 'Deterministic Engine'}
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              {merchantName} — Growth Brief
            </h2>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleCopy}
              className="p-2.5 rounded-full bg-white/[0.06] hover:bg-white/15 text-white/80 transition cursor-pointer"
              title="Copy Brief"
            >
              {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
            </button>
            <button
              onClick={() => window.print()}
              className="p-2.5 rounded-full bg-white/[0.06] hover:bg-white/15 text-white/80 transition cursor-pointer"
              title="Print Brief"
            >
              <Printer className="w-4 h-4" />
            </button>
            <button
              onClick={onClose}
              className="p-2.5 rounded-full bg-white/[0.06] hover:bg-white/15 text-white/80 transition cursor-pointer"
              title="Close"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Executive Summary Card */}
        <div className="my-6 p-6 rounded-2xl bg-[#090b10] border border-[#74f5ff]/20 shadow-[0_0_30px_rgba(116,245,255,0.04)]">
          <span className="text-[10px] font-mono uppercase font-bold tracking-widest text-[#74f5ff] block mb-2">
            Executive Summary
          </span>
          <p className="text-sm sm:text-base text-white/85 leading-relaxed">
            {brief.executive_summary}
          </p>
          <div className="mt-4 pt-4 border-t border-white/[0.06] flex items-center justify-between">
            <span className="text-xs text-white/50 font-mono">Estimated Monthly Revenue Uplift:</span>
            <span className="text-xl font-black text-[#74f5ff] font-mono">
              ₹{Math.round(brief.total_potential_recovery_inr).toLocaleString('en-IN')}/mo
            </span>
          </div>
        </div>

        {/* Immediate Action Plan */}
        <div className="mb-6">
          <h3 className="text-xs font-mono uppercase font-bold tracking-widest text-white/50 mb-3">
            Immediate Action Plan
          </h3>
          <div className="space-y-2.5">
            {brief.immediate_actions.map((act, idx) => (
              <div
                key={idx}
                className="flex items-start gap-3 p-3.5 rounded-xl bg-[#0b0d14] border border-white/[0.06] text-xs sm:text-sm text-white/85"
              >
                <span className="w-6 h-6 rounded-lg bg-white/[0.06] text-white flex items-center justify-center font-mono font-bold text-xs shrink-0 border border-white/10">
                  0{idx + 1}
                </span>
                <span className="leading-relaxed">{act}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Strategic Roadmap */}
        <div className="mb-6">
          <h3 className="text-xs font-mono uppercase font-bold tracking-widest text-white/50 mb-3">
            Strategic Roadmap &amp; Scale
          </h3>
          <ul className="space-y-2.5 text-xs sm:text-sm text-white/75">
            {brief.strategic_recommendations.map((rec, idx) => (
              <li key={idx} className="flex items-start gap-2.5 p-3 rounded-xl bg-[#0b0d14] border border-white/[0.06]">
                <span className="text-[#74f5ff] font-mono font-bold mt-0.5">•</span>
                <span className="leading-relaxed">{rec}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Two-Column Deep-Dives */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
          <div className="p-4 rounded-2xl bg-[#0b0d14] border border-white/[0.06]">
            <span className="text-[10px] font-mono font-bold uppercase text-amber-400 tracking-wider block mb-1.5">
              Risk &amp; Chargeback Assessment
            </span>
            <p className="text-white/70 leading-relaxed">{brief.risk_assessment}</p>
          </div>

          <div className="p-4 rounded-2xl bg-[#0b0d14] border border-white/[0.06]">
            <span className="text-[10px] font-mono font-bold uppercase text-[#74f5ff] tracking-wider block mb-1.5">
              MDR Cost Optimization
            </span>
            <p className="text-white/70 leading-relaxed">{brief.cost_saving_opportunities}</p>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="mt-8 pt-5 border-t border-white/[0.08] flex items-center justify-between text-xs text-white/40 font-mono">
          <span>Prepared for Merchant Success &amp; Leadership</span>
          <button
            onClick={onClose}
            className="btn-shiny-pill rounded-full px-6 py-2 text-xs font-semibold text-white cursor-pointer"
          >
            Close Brief
          </button>
        </div>
      </div>
    </div>
  );
}

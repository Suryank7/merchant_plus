'use client';

import React from 'react';
import { PhoneCall, ArrowRight, ShieldCheck, Sparkles } from 'lucide-react';

interface MindMastersDiscussProps {
  onRunAudit: () => void;
  onOpenBrief: () => void;
}

export function MindMastersDiscuss({ onRunAudit, onOpenBrief }: MindMastersDiscussProps) {
  return (
    <section id="discuss" className="py-24 relative overflow-hidden bg-[#06070b]">
      {/* Background radial glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-gradient-to-r from-[#74f5ff]/10 via-[#5b8cff]/10 to-indigo-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 relative z-10 text-center">
        {/* Glowing Phone Call Pill Icon */}
        <div className="inline-flex items-center justify-center mb-8">
          <div className="relative">
            <div className="absolute -inset-2 rounded-2xl bg-gradient-to-r from-[#74f5ff]/30 to-[#5b8cff]/30 blur-lg opacity-70 animate-pulse" />
            <div className="relative h-16 w-16 rounded-2xl bg-gradient-to-b from-[#161a29] to-[#0c0e17] border border-white/20 flex items-center justify-center text-[#74f5ff] shadow-[0_8px_32px_rgba(0,0,0,0.8)]">
              <PhoneCall className="h-7 w-7" />
            </div>
          </div>
        </div>

        {/* Section Heading */}
        <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-white mb-4">
          Need to Discuss Before Starting?
        </h2>

        {/* Concise punchy description */}
        <p className="text-base sm:text-lg text-white/60 max-w-xl mx-auto mb-10">
          Have high chargeback rates, UPI drops, or multi-gateway compliance hurdles? Review our autonomous audit plan or run live synthetic merchant simulations.
        </p>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            onClick={onOpenBrief}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-3.5 rounded-full bg-white text-black font-semibold text-sm hover:bg-white/90 transition-all shadow-[0_0_30px_rgba(255,255,255,0.2)]"
          >
            <span>Read Executive Growth Brief</span>
            <ArrowRight className="h-4 w-4" />
          </button>

          <button
            onClick={onRunAudit}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full border border-white/15 bg-white/[0.04] text-white font-semibold text-sm hover:bg-white/10 hover:border-white/30 transition-all backdrop-blur-md"
          >
            <Sparkles className="h-4 w-4 text-[#74f5ff]" />
            <span>Run Autonomous Audit (1-Click)</span>
          </button>
        </div>

        {/* Bottom Trust Indicators */}
        <div className="mt-12 flex items-center justify-center gap-6 text-xs text-white/40">
          <span className="flex items-center gap-1.5">
            <ShieldCheck className="h-3.5 w-3.5 text-emerald-400" />
            Zero-MDR Routing
          </span>
          <span>•</span>
          <span>Sub-50ms Risk Inference</span>
          <span>•</span>
          <span>PCI-DSS Tokenized</span>
        </div>
      </div>
    </section>
  );
}

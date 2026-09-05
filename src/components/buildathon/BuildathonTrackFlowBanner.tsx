'use client';

import React from 'react';
import { Sparkles, Shield, Zap, TrendingUp, Cpu, Lock } from 'lucide-react';

export function BuildathonTrackFlowBanner() {
  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4 pb-8">
      {/* Top Laser Horizon */}
      <div className="buildathon-laser-horizon mb-8" />

      {/* Main Track Banner Card */}
      <div className="buildathon-track-banner rounded-3xl p-6 sm:p-8 backdrop-blur-xl relative overflow-hidden">
        {/* Subtle decorative glow */}
        <div className="absolute top-0 right-10 w-72 h-32 bg-[#74f5ff]/10 rounded-full blur-3xl pointer-events-none" />

        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 relative z-10">
          <div className="space-y-2">
            <div className="flex flex-wrap items-center gap-2.5">
              <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-black bg-[#74f5ff] px-3 py-1 rounded-full shadow-[0_0_12px_rgba(116,245,255,0.5)]">
                TRACK 01
              </span>
              <span className="text-xs font-mono font-bold text-white/90">
                AI Growth &amp; Agentic Commerce
              </span>
              <span className="text-[10px] font-mono text-white/40 uppercase tracking-widest hidden sm:inline">
                • RAZORPAY AI BUILDATHON 2026
              </span>
            </div>

            <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
              Closed-Loop Agentic Commerce &amp; Real-Time Payment Sentinel
            </h3>

            <p className="text-xs text-white/60 max-w-3xl leading-relaxed">
              Grow the merchant&apos;s revenue and make them sellable to AI buyers end-to-end. Evaluated against Razorpay&apos;s 3 core submission bars:
              <strong className="text-[#74f5ff] font-medium ml-1">Accountability</strong> (bounded financial actions),
              <strong className="text-[#74f5ff] font-medium ml-1">Transparency</strong> (deterministic XAI scores), and
              <strong className="text-[#74f5ff] font-medium ml-1">Robustness</strong> (graceful failover routing).
            </p>
          </div>

          {/* 3 Pillar Micro Badges */}
          <div className="grid grid-cols-3 gap-3 shrink-0">
            <div className="p-3 rounded-2xl bg-black/40 border border-white/10 text-center space-y-1">
              <Zap className="w-4 h-4 text-[#74f5ff] mx-auto" />
              <div className="text-[11px] font-bold text-white font-mono">Agentic</div>
              <p className="text-[9px] text-white/40 uppercase">Checkout</p>
            </div>
            <div className="p-3 rounded-2xl bg-black/40 border border-white/10 text-center space-y-1">
              <Cpu className="w-4 h-4 text-emerald-400 mx-auto" />
              <div className="text-[11px] font-bold text-emerald-300 font-mono">XGBoost</div>
              <p className="text-[9px] text-white/40 uppercase">CTGAN Risk</p>
            </div>
            <div className="p-3 rounded-2xl bg-black/40 border border-white/10 text-center space-y-1">
              <Lock className="w-4 h-4 text-[#a78bfa] mx-auto" />
              <div className="text-[11px] font-bold text-purple-300 font-mono">HMAC-256</div>
              <p className="text-[9px] text-white/40 uppercase">Verified</p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Laser Horizon */}
      <div className="buildathon-laser-horizon-subtle mt-8" />
    </div>
  );
}

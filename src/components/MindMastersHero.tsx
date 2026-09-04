'use client';

import React from 'react';
import { ArrowRight, Sparkles, ShieldCheck, TrendingUp, RefreshCw, Layers } from 'lucide-react';
import { MERCHANT_PRESETS } from '@/lib/mock-data';

interface MindMastersHeroProps {
  selectedPresetId: string;
  onSelectPreset: (presetId: string) => void;
  onRunAudit: () => void;
  onOpenBrief: () => void;
  isRunning: boolean;
}

export function MindMastersHero({
  selectedPresetId,
  onSelectPreset,
  onRunAudit,
  onOpenBrief,
  isRunning,
}: MindMastersHeroProps) {
  const currentIndex = MERCHANT_PRESETS.findIndex((p) => p.id === selectedPresetId);
  const activePreset = MERCHANT_PRESETS[currentIndex] || MERCHANT_PRESETS[0];

  return (
    <section className="relative overflow-hidden min-h-[92svh] flex items-center justify-center pt-28 pb-20 sm:pt-36 sm:pb-24">
      {/* Background Animated Floating Capsules matching MindMasters AI */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 z-0 overflow-hidden bg-[#0a0a0f]">
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/[0.06] via-transparent to-cyan-500/[0.06] blur-3xl" />

        {/* Capsule 1: Top Left */}
        <div
          className="absolute left-[-10%] md:left-[-4%] top-[12%] md:top-[18%] opacity-60"
          style={{ transform: 'rotate(-4deg)' }}
        >
          <div className="relative w-[520px] h-[120px] rounded-full bg-gradient-to-r from-indigo-500/[0.18] to-transparent backdrop-blur-[2px] border-2 border-white/[0.12] shadow-[0_8px_32px_0_rgba(255,255,255,0.06)]" />
        </div>

        {/* Capsule 2: Bottom Right */}
        <div
          className="absolute right-[-6%] md:right-[0%] top-[65%] md:top-[68%] opacity-50"
          style={{ transform: 'rotate(-28deg)' }}
        >
          <div className="relative w-[480px] h-[110px] rounded-full bg-gradient-to-r from-cyan-500/[0.16] to-transparent backdrop-blur-[2px] border-2 border-white/[0.12] shadow-[0_8px_32px_0_rgba(255,255,255,0.06)]" />
        </div>

        {/* Capsule 3: Bottom Left */}
        <div
          className="absolute left-[8%] bottom-[8%] opacity-40"
          style={{ transform: 'rotate(-22deg)' }}
        >
          <div className="relative w-[280px] h-[75px] rounded-full bg-gradient-to-r from-violet-500/[0.16] to-transparent backdrop-blur-[2px] border-2 border-white/[0.12] shadow-[0_8px_32px_0_rgba(255,255,255,0.06)]" />
        </div>

        {/* Capsule 4: Top Right */}
        <div
          className="absolute right-[12%] top-[8%] opacity-45"
          style={{ transform: 'rotate(6deg)' }}
        >
          <div className="relative w-[220px] h-[60px] rounded-full bg-gradient-to-r from-emerald-500/[0.14] to-transparent backdrop-blur-[2px] border-2 border-white/[0.12]" />
        </div>

        {/* Dark radial fade */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#06070b] via-transparent to-[#06070b]/80" />
      </div>

      {/* Main Hero Container */}
      <div className="relative z-10 mx-auto max-w-5xl px-4 text-center flex flex-col items-center">
        {/* Top Tag Pill matching MindMasters "Reason 01" / "AI Engineering" */}
        <div className="flex items-center gap-3 sm:gap-4 mb-7 sm:mb-9">
          <span className="inline-flex items-center gap-2 text-[11px] sm:text-[12px] font-semibold uppercase tracking-[0.18em] text-white/70">
            <span className="h-1.5 w-1.5 rounded-full bg-[#74f5ff] relative">
              <span className="absolute -inset-1 rounded-full bg-[#74f5ff] animate-ping opacity-75" />
            </span>
            Track 01
          </span>
          <span className="hidden sm:block h-px w-10 bg-white/15" />
          <span className="inline-flex items-center rounded-full border border-white/10 bg-white/[0.04] backdrop-blur-md px-3.5 py-1 text-[11px] sm:text-[12px] font-semibold uppercase tracking-[0.14em] text-white/85 shadow-[0_1px_0_rgba(255,255,255,0.08)_inset]">
            Razorpay AI Growth &amp; Agentic Commerce
          </span>
        </div>

        {/* Main Section Heading */}
        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-white leading-[1.08] text-balance">
          <span className="block">Autonomous AI Copilot</span>
          <span className="block mt-1">
            For <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#74f5ff] via-[#5b8cff] to-[#a78bfa]">Payment Health</span> &amp; Growth
          </span>
        </h1>

        {/* Subtitle */}
        <p className="mt-6 max-w-2xl text-[15px] sm:text-[17px] md:text-[18px] text-white/65 leading-relaxed text-pretty">
          Automates multi-hour manual merchant audits into sub-30-second continuous agentic audits.
          Detects fraud anomalies, recovers checkout drop-offs, and enforces RBI zero-MDR UPI arbitrage.
        </p>

        {/* Action Buttons */}
        <div className="mt-8 sm:mt-10 flex flex-wrap items-center justify-center gap-3.5">
          <button
            onClick={onRunAudit}
            disabled={isRunning}
            className="group relative inline-flex items-center gap-2.5 rounded-full bg-[#12141c] text-white text-[14px] sm:text-[15px] font-medium px-7 py-3.5 ring-1 ring-white/15 shadow-[0_1px_0_rgba(255,255,255,0.12)_inset,0_12px_30px_-12px_rgba(0,0,0,0.9)] hover:ring-white/30 hover:bg-[#1a1c24] hover:-translate-y-0.5 transition-all duration-300 cursor-pointer disabled:opacity-50"
          >
            <RefreshCw className={`h-4 w-4 text-[#74f5ff] ${isRunning ? 'animate-spin' : ''}`} />
            <span className="relative">{isRunning ? 'Running 5-Node Agent...' : 'Run Continuous Audit'}</span>
            <ArrowRight className="h-4 w-4 text-white/80 transition-transform duration-300 group-hover:translate-x-1" />
          </button>

          <button
            onClick={onOpenBrief}
            className="inline-flex items-center gap-2 rounded-full bg-white/[0.04] text-white/90 text-[14px] sm:text-[15px] font-medium px-6 py-3.5 border border-white/10 hover:bg-white/[0.08] hover:border-white/20 transition-all cursor-pointer"
          >
            <span>Executive Growth Brief</span>
          </button>
        </div>

        {/* Kicker Mono Text */}
        <p className="text-[11px] sm:text-[12px] font-mono tracking-wider text-white/45 uppercase text-center mt-5">
          XGBoost (ROC-AUC 0.982) • LangGraph StateGraph • CTGAN Oversampling • Claude 3.5 Sonnet
          <span className="hidden md:inline normal-case text-white/50 font-sans tracking-normal ml-1">
            — Synthesizing 7 proven repositories.
          </span>
        </p>

        {/* Slide Carousel Indicator matching MindMasters (01 / 04) */}
        <div className="mt-12 sm:mt-14 flex items-center gap-4">
          <div className="flex items-center gap-2">
            {MERCHANT_PRESETS.map((preset, idx) => {
              const isActive = idx === currentIndex;
              return (
                <button
                  key={preset.id}
                  onClick={() => onSelectPreset(preset.id)}
                  aria-label={`Select ${preset.name}`}
                  className={`relative h-1.5 transition-all duration-300 rounded-full overflow-hidden ${
                    isActive ? 'w-10 bg-[#74f5ff]' : 'w-7 bg-white/15 hover:bg-white/30'
                  }`}
                />
              );
            })}
          </div>
          <span className="text-[12px] sm:text-[13px] font-mono font-medium tabular-nums text-white/55">
            0{currentIndex + 1} / 0{MERCHANT_PRESETS.length}
          </span>
          <span className="text-xs text-white/70 font-medium hidden sm:inline">
            Active: <span className="text-[#74f5ff]">{activePreset.name}</span>
          </span>
        </div>
      </div>
    </section>
  );
}

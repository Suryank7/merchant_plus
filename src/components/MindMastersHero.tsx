'use client';

import React, { useState, useEffect } from 'react';
import { ArrowRight, RefreshCw } from 'lucide-react';
import { MERCHANT_PRESETS } from '@/lib/mock-data';

interface MindMastersHeroProps {
  selectedPresetId: string;
  onSelectPreset: (presetId: string) => void;
  onRunAudit: () => void;
  onOpenBrief: () => void;
  isRunning: boolean;
  onOpenStore?: () => void;
  onScrollToSection?: (id: string) => void;
}

export function MindMastersHero({
  selectedPresetId,
  onSelectPreset,
  onRunAudit,
  onOpenBrief,
  isRunning,
  onOpenStore,
  onScrollToSection,
}: MindMastersHeroProps) {
  const currentIndex = MERCHANT_PRESETS.findIndex((p) => p.id === selectedPresetId);
  const activePreset = MERCHANT_PRESETS[currentIndex] || MERCHANT_PRESETS[0];
  const [progress, setProgress] = useState(0);

  // Auto-progress slide carousel timer
  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) return 100;
        return prev + 2;
      });
    }, 120);

    return () => clearInterval(interval);
  }, []);

  // When progress hits 100%, trigger slide transition cleanly in effect lifecycle
  useEffect(() => {
    if (progress >= 100) {
      const nextIndex = (currentIndex + 1) % MERCHANT_PRESETS.length;
      onSelectPreset(MERCHANT_PRESETS[nextIndex].id);
      setProgress(0);
    }
  }, [progress, currentIndex, onSelectPreset]);

  // Reset progress on preset change
  useEffect(() => {
    setProgress(0);
  }, [selectedPresetId]);

  return (
    <section className="relative overflow-hidden min-h-[100svh] flex items-center justify-center pt-24 sm:pt-28 pb-24 sm:pb-28">
      {/* Background Animated Floating Capsules matching MindMasters AI with Razorpay cyber grid show-through */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 z-0 overflow-hidden bg-transparent">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/[0.08] via-transparent to-cyan-500/[0.08] blur-3xl" />

          {/* Capsule 1: Top Left */}
          <div className="absolute left-[-10%] md:left-[-5%] top-[15%] md:top-[20%] animate-float-1">
            <div className="relative w-[600px] h-[140px]">
              <div className="absolute inset-0 rounded-full bg-gradient-to-r to-transparent from-indigo-500/[0.18] backdrop-blur-[4px] border-2 border-white/[0.18] shadow-[0_8px_32px_0_rgba(255,255,255,0.12)] after:absolute after:inset-0 after:rounded-full after:bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.25),transparent_70%)]" />
            </div>
          </div>

          {/* Capsule 2: Bottom Right */}
          <div className="absolute right-[-5%] md:right-[0%] top-[70%] md:top-[75%] animate-float-2">
            <div className="relative w-[500px] h-[120px]">
              <div className="absolute inset-0 rounded-full bg-gradient-to-r to-transparent from-rose-500/[0.18] backdrop-blur-[4px] border-2 border-white/[0.18] shadow-[0_8px_32px_0_rgba(255,255,255,0.12)] after:absolute after:inset-0 after:rounded-full after:bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.25),transparent_70%)]" />
            </div>
          </div>

          {/* Capsule 3: Bottom Left */}
          <div className="absolute left-[5%] md:left-[10%] bottom-[5%] md:bottom-[10%] animate-float-3">
            <div className="relative w-[300px] h-[80px]">
              <div className="absolute inset-0 rounded-full bg-gradient-to-r to-transparent from-violet-500/[0.18] backdrop-blur-[4px] border-2 border-white/[0.18] shadow-[0_8px_32px_0_rgba(255,255,255,0.12)] after:absolute after:inset-0 after:rounded-full after:bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.25),transparent_70%)]" />
            </div>
          </div>

          {/* Capsule 4: Top Right */}
          <div className="absolute right-[15%] md:right-[20%] top-[10%] md:top-[15%] animate-float-4">
            <div className="relative w-[200px] h-[60px]">
              <div className="absolute inset-0 rounded-full bg-gradient-to-r to-transparent from-amber-500/[0.18] backdrop-blur-[4px] border-2 border-white/[0.18] shadow-[0_8px_32px_0_rgba(255,255,255,0.12)] after:absolute after:inset-0 after:rounded-full after:bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.25),transparent_70%)]" />
            </div>
          </div>

          {/* Capsule 5: Small Cyan */}
          <div className="absolute left-[20%] md:left-[25%] top-[5%] md:top-[10%] animate-float-5">
            <div className="relative w-[150px] h-[40px]">
              <div className="absolute inset-0 rounded-full bg-gradient-to-r to-transparent from-cyan-500/[0.18] backdrop-blur-[4px] border-2 border-white/[0.18] shadow-[0_8px_32px_0_rgba(255,255,255,0.12)] after:absolute after:inset-0 after:rounded-full after:bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.25),transparent_70%)]" />
            </div>
          </div>
        </div>

        {/* Ambient Dark fade blending into next sections */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#06070b] via-transparent to-transparent" />
      </div>

      {/* Main Content matching MindMasters layout */}
      <div className="relative z-10 mx-auto max-w-5xl px-4 text-center flex flex-col items-center">
        {/* Top Tag Pill */}
        <div className="flex items-center gap-3 sm:gap-4 mb-7 sm:mb-10">
          <span className="inline-flex items-center gap-2 text-[11px] sm:text-[12px] font-semibold uppercase tracking-[0.18em] text-white/70">
            <span className="h-1.5 w-1.5 rounded-full bg-[#74f5ff]" />
            Reason 0{currentIndex + 1}
          </span>
          <span className="hidden sm:block h-px w-10 bg-white/15" />
          <span className="inline-flex items-center rounded-full border border-white/10 bg-white/[0.03] backdrop-blur-md px-3.5 py-1.5 text-[11px] sm:text-[12px] font-semibold uppercase tracking-[0.14em] text-white/80 shadow-[0_1px_0_rgba(255,255,255,0.06)_inset,0_8px_24px_-12px_rgba(0,0,0,0.6)]">
            {activePreset.business_type.replace(/_/g, ' ').toUpperCase()}
          </span>
        </div>

        {/* Big Bold Headline matching MindMasters */}
        <h1 className="text-4xl sm:text-6xl md:text-7xl font-bold tracking-[-0.03em] text-white text-balance leading-[1.1] sm:leading-[1.12]">
          <span className="block">We Build AI Systems That</span>
          <span className="block text-white/90">Protect &amp; Scale Merchant Revenue</span>
        </h1>

        {/* Subtitle */}
        <p className="mt-5 sm:mt-7 max-w-2xl text-[14.5px] sm:text-[17px] md:text-[18px] text-white/60 leading-[1.55] sm:leading-[1.6] text-pretty">
          From payment health audits and fraud anomaly scoring to autonomous zero-MDR UPI routing, we deploy production-ready agentic intelligence for Razorpay merchants.
        </p>

        {/* Primary CTA Button matching MindMasters */}
        <div className="mt-7 sm:mt-10 flex flex-col items-center gap-3.5">
          <div className="flex flex-wrap items-center justify-center gap-3">
            <button
              type="button"
              onClick={onRunAudit}
              disabled={isRunning}
              className="group relative inline-flex items-center gap-2 rounded-full bg-[#12141c] text-white text-[14px] sm:text-[15px] font-medium px-6 sm:px-7 py-3 sm:py-3.5 ring-1 ring-white/10 shadow-[0_1px_0_rgba(255,255,255,0.08)_inset,0_12px_30px_-12px_rgba(0,0,0,0.9)] hover:ring-white/25 hover:bg-[#1a1c24] hover:-translate-y-0.5 transition-all duration-300 cursor-pointer disabled:opacity-50"
            >
              <RefreshCw className={`relative h-4 w-4 text-[#74f5ff] ${isRunning ? 'animate-spin' : ''}`} />
              <span className="relative">{isRunning ? 'Running 5-Node Agent...' : 'Run Autonomous Audit'}</span>
              <ArrowRight className="lucide lucide-arrow-right relative h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 text-white/80" />
            </button>

            <button
              type="button"
              onClick={onOpenBrief}
              className="btn-shiny-pill rounded-full inline-flex items-center gap-2 text-[14px] sm:text-[15px] font-medium px-6 py-3 sm:py-3.5 cursor-pointer"
            >
              <span>Executive Brief</span>
            </button>

            {onOpenStore && (
              <button
                type="button"
                onClick={onOpenStore}
                className="rounded-full inline-flex items-center gap-2 bg-gradient-to-r from-[#0080ff]/20 to-[#74f5ff]/20 hover:from-[#0080ff]/30 hover:to-[#74f5ff]/30 border border-[#0080ff]/50 text-[14px] sm:text-[15px] font-medium px-6 py-3 sm:py-3.5 text-white cursor-pointer transition-all shadow-[0_4px_20px_rgba(0,128,255,0.25)]"
              >
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span>Agentic Store &amp; Checkout</span>
              </button>
            )}

            {onScrollToSection && (
              <button
                type="button"
                onClick={() => onScrollToSection('ai-copilot-terminal')}
                className="rounded-full inline-flex items-center gap-2 bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 text-[14px] sm:text-[15px] font-medium px-5 py-3 sm:py-3.5 text-[#74f5ff] cursor-pointer transition-all"
              >
                <span>Ask AI Copilot</span>
              </button>
            )}
          </div>

          <p className="text-[11px] sm:text-[12.5px] font-mono tracking-wider text-white/40 uppercase text-center mt-1">
            AGENTIC CHECKOUT • MARGIN-AWARE OFFERS • RAZORPAY MCP • CTGAN FRAUD RISK
            <span className="normal-case text-white/50 font-sans tracking-normal ml-1">
              — Autonomous Commerce Growth Platform.
            </span>
          </p>
        </div>

        {/* Slide Progress Carousel matching MindMasters (01 / 04) */}
        <div className="mt-12 sm:mt-16 flex items-center gap-4">
          <div className="flex items-center gap-2">
            {MERCHANT_PRESETS.map((p, idx) => {
              const isActive = idx === currentIndex;
              return (
                <button
                  key={p.id}
                  type="button"
                  onClick={() => onSelectPreset(p.id)}
                  aria-label={`Go to slide ${idx + 1}`}
                  aria-current={isActive}
                  className="relative h-1 w-8 sm:w-10 overflow-hidden rounded-full bg-white/15 transition-colors hover:bg-white/25 cursor-pointer"
                >
                  {isActive && (
                    <span
                      className="absolute inset-y-0 left-0 rounded-full bg-[#74f5ff] transition-all duration-100"
                      style={{ width: `${progress}%` }}
                    />
                  )}
                </button>
              );
            })}
          </div>
          <span className="text-[12px] sm:text-[13px] font-medium tabular-nums text-white/50 font-mono">
            0{currentIndex + 1} / 0{MERCHANT_PRESETS.length}
          </span>
        </div>
      </div>
    </section>
  );
}

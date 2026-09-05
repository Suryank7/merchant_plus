'use client';

import React from 'react';
import { ArrowUpRight, CheckCircle2, TrendingUp, ShieldAlert, Zap } from 'lucide-react';
import { MERCHANT_PRESETS } from '@/lib/mock-data';

interface MindMastersProjectsProps {
  selectedPresetId: string;
  onSelectPreset: (presetId: string) => void;
  onScrollToCockpit: () => void;
}

const STORE_METRICS: Record<string, { recovery: string; keyFix: string; tag: string }> = {
  bombay_threads: {
    recovery: '₹1,42,500/mo',
    keyFix: 'UPI Fallback & RTO Filter',
    tag: 'D2C Commerce',
  },
  apex_saas: {
    recovery: '₹2,84,000/mo',
    keyFix: 'Smart Mandates & Zero-MDR',
    tag: 'B2B SaaS',
  },
  quickkart_grocery: {
    recovery: '₹95,200/mo',
    keyFix: 'Sub-second Gateway Failover',
    tag: 'Quick Commerce',
  },
  urban_pulse: {
    recovery: '₹1,18,000/mo',
    keyFix: 'Dynamic COD Verification',
    tag: 'Subscription',
  },
};

export function MindMastersProjects({
  selectedPresetId,
  onSelectPreset,
  onScrollToCockpit,
}: MindMastersProjectsProps) {
  return (
    <section id="projects" className="py-24 relative bg-transparent border-t border-white/[0.06]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-[#74f5ff] mb-3">
              <span className="h-1.5 w-1.5 rounded-full bg-[#74f5ff]" />
              Audited Case Studies
            </div>
            <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-white">
              Selected Merchant Deployments
            </h2>
          </div>
          <p className="text-sm sm:text-base text-white/60 max-w-md">
            Click any merchant to load live payment telemetry, anomaly flags, and autonomous recovery recommendations.
          </p>
        </div>

        {/* Project Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {MERCHANT_PRESETS.map((preset, idx) => {
            const isSelected = preset.id === selectedPresetId;
            const metrics = STORE_METRICS[preset.id] || {
              recovery: '₹1,20,000/mo',
              keyFix: 'Dynamic Routing',
              tag: 'Enterprise',
            };

            return (
              <div
                key={preset.id}
                onClick={() => {
                  onSelectPreset(preset.id);
                  onScrollToCockpit();
                }}
                className={`group relative rounded-2xl p-7 transition-all duration-300 cursor-pointer overflow-hidden border ${
                  isSelected
                    ? 'bg-gradient-to-b from-[#121626] to-[#0a0c14] border-[#74f5ff]/50 shadow-[0_0_30px_rgba(116,245,255,0.15)]'
                    : 'bg-[#0b0c12]/80 hover:bg-[#10121b] border-white/[0.08] hover:border-white/20'
                }`}
              >
                {/* Subtle top glow */}
                <div className="absolute -top-24 -right-24 w-48 h-48 bg-[#74f5ff]/10 rounded-full blur-3xl pointer-events-none group-hover:bg-[#74f5ff]/20 transition-all duration-500" />

                <div className="relative z-10 flex flex-col justify-between h-full">
                  <div>
                    {/* Header Row */}
                    <div className="flex items-center justify-between gap-3 mb-5">
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-xs text-white/40">0{idx + 1}</span>
                        <span className="text-[11px] font-medium tracking-wide uppercase px-2.5 py-1 rounded-full bg-white/[0.06] border border-white/10 text-white/70">
                          {metrics.tag}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        {isSelected && (
                          <span className="text-[11px] font-semibold text-[#74f5ff] flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#74f5ff]/10 border border-[#74f5ff]/30">
                            <span className="h-1.5 w-1.5 rounded-full bg-[#74f5ff] animate-ping" />
                            Active In Cockpit
                          </span>
                        )}
                        <div className="h-8 w-8 rounded-full border border-white/10 bg-white/[0.04] flex items-center justify-center text-white/60 group-hover:text-white group-hover:border-white/30 group-hover:bg-white/10 transition-all">
                          <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                        </div>
                      </div>
                    </div>

                    {/* Store Title */}
                    <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-[#74f5ff] transition-colors">
                      {preset.name}
                    </h3>
                    <p className="text-xs sm:text-sm text-white/60 line-clamp-2 mb-6">
                      {preset.description}
                    </p>
                  </div>

                  {/* Key Metrics Pill Row */}
                  <div className="pt-5 border-t border-white/[0.06] grid grid-cols-2 gap-4">
                    <div>
                      <span className="text-[11px] uppercase tracking-wider text-white/40 block mb-1">
                        Est. Monthly Recovery
                      </span>
                      <div className="flex items-center gap-1.5 font-bold text-emerald-400 text-base">
                        <TrendingUp className="h-3.5 w-3.5" />
                        {metrics.recovery}
                      </div>
                    </div>
                    <div>
                      <span className="text-[11px] uppercase tracking-wider text-white/40 block mb-1">
                        Primary Intervention
                      </span>
                      <div className="flex items-center gap-1.5 font-semibold text-white/90 text-xs">
                        <Zap className="h-3.5 w-3.5 text-[#74f5ff]" />
                        {metrics.keyFix}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

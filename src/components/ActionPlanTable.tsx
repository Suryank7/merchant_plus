'use client';

import React, { useState } from 'react';
import { RecommendedAction } from '@/lib/types';
import { Check, Code2, Sparkles, ArrowRight, IndianRupee, Copy, CheckCheck, FileCode } from 'lucide-react';

interface ActionPlanTableProps {
  actions: RecommendedAction[];
}

export function ActionPlanTable({ actions }: ActionPlanTableProps) {
  const [appliedActions, setAppliedActions] = useState<Record<number, boolean>>({});
  const [activeCodeDrawer, setActiveCodeDrawer] = useState<number | null>(null);
  const [copiedRank, setCopiedRank] = useState<number | null>(null);

  const toggleApply = (rank: number) => {
    setAppliedActions((prev) => ({
      ...prev,
      [rank]: !prev[rank],
    }));
  };

  const handleCopyCode = (rank: number, code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedRank(rank);
    setTimeout(() => setCopiedRank(null), 2000);
  };

  const totalSimulatedSavings = actions.reduce((acc, action) => {
    return appliedActions[action.rank] ? acc + action.estimated_monthly_recovery : acc;
  }, 0);

  const getCategoryBadge = (cat: string) => {
    switch (cat) {
      case 'cost_optimization':
        return 'bg-[#74f5ff]/15 text-[#74f5ff] border-[#74f5ff]/35';
      case 'funnel_recovery':
        return 'bg-[#5b8cff]/15 text-[#5b8cff] border-[#5b8cff]/35';
      case 'risk_mitigation':
        return 'bg-amber-400/15 text-amber-300 border-amber-400/35';
      case 'growth':
      default:
        return 'bg-[#a78bfa]/15 text-[#a78bfa] border-[#a78bfa]/35';
    }
  };

  return (
    <section id="interventions" className="py-16 sm:py-24 bg-transparent relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl border border-white/15 backdrop-blur-2xl bg-gradient-to-b from-white/[0.05] via-white/[0.02] to-[#06070b]/90 p-6 sm:p-12 shadow-[0_20px_60px_rgba(0,0,0,0.8)] relative overflow-hidden">
          {/* Ambient Lighting & Laser Horizon */}
          <div className="absolute top-0 right-1/4 w-96 h-40 bg-[#0080ff]/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-10 left-1/3 w-80 h-40 bg-[#74f5ff]/10 rounded-full blur-3xl pointer-events-none" />
          <div className="buildathon-laser-horizon absolute top-0 inset-x-0" />

          {/* Section Header */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 mb-10 pb-6 border-b border-white/[0.08]">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full glass-pill px-3.5 py-1 text-[11px] font-mono uppercase tracking-[0.2em] text-[#74f5ff] mb-2.5">
                <Sparkles className="w-3.5 h-3.5 text-[#74f5ff]" />
                <span>Autonomous Interventions</span>
              </div>
              <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
                Autonomous ROI Roadmap
              </h2>
              <p className="text-xs sm:text-sm text-white/60 mt-1 max-w-2xl leading-relaxed">
                Ranked actions triaged by Node 4 agent using Expected Value: <span className="text-[#74f5ff] font-mono">EV = (Monthly Recovery × Confidence) ÷ Implementation Effort</span>.
              </p>
            </div>

            {totalSimulatedSavings > 0 ? (
              <div className="flex items-center gap-2.5 px-5 py-2.5 rounded-full bg-[#74f5ff]/15 border border-[#74f5ff]/40 text-[#74f5ff] text-xs font-bold font-mono shadow-[0_0_24px_rgba(116,245,255,0.3)] animate-in fade-in">
                <Check className="w-4 h-4 text-emerald-400" />
                <span>Simulated Active: +₹{Math.round(totalSimulatedSavings).toLocaleString('en-IN')}/mo</span>
              </div>
            ) : (
              <div className="text-[11px] font-mono text-white/40 bg-white/[0.03] border border-white/10 px-4 py-2 rounded-full">
                Click &ldquo;Simulate Fix&rdquo; to model ROI impact
              </div>
            )}
          </div>

          {/* Action Cards */}
          <div className="space-y-4">
            {actions.map((action) => {
              const isApplied = !!appliedActions[action.rank];
              const isCodeOpen = activeCodeDrawer === action.rank;

              return (
                <div
                  key={action.rank}
                  className={`rounded-2xl border p-6 transition-all duration-300 relative overflow-hidden ${
                    isApplied
                      ? 'bg-[#74f5ff]/[0.06] border-[#74f5ff]/60 shadow-[0_0_35px_rgba(116,245,255,0.18)]'
                      : 'glass-card-interactive'
                  }`}
                >
                  {/* Subtle top laser line when simulated */}
                  {isApplied && (
                    <div className="absolute top-0 inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-[#74f5ff] to-transparent" />
                  )}

                  <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-5">
                    {/* Left: Info */}
                    <div className="flex items-start gap-4">
                      <div className="flex flex-col items-center">
                        <span className={`w-10 h-10 rounded-xl flex items-center justify-center text-xs font-mono font-black shrink-0 border transition-all ${
                          isApplied
                            ? 'bg-[#74f5ff] text-black border-[#74f5ff] shadow-[0_0_15px_rgba(116,245,255,0.5)]'
                            : 'bg-white/[0.06] text-white/90 border-white/15'
                        }`}>
                          0{action.rank}
                        </span>
                      </div>

                      <div>
                        <div className="flex flex-wrap items-center gap-2 mb-2">
                          <h3 className="text-sm sm:text-base font-bold text-white tracking-tight">
                            {action.action}
                          </h3>
                          <span
                            className={`px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold uppercase tracking-wider border ${getCategoryBadge(
                              action.category
                            )}`}
                          >
                            {action.category.replace(/_/g, ' ')}
                          </span>
                          <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono text-white/50 bg-white/[0.04] border border-white/10">
                            Effort: {action.effort}
                          </span>
                        </div>
                        <p className="text-xs sm:text-sm text-white/70 max-w-3xl leading-relaxed">
                          {action.reasoning}
                        </p>
                      </div>
                    </div>

                    {/* Right: Recovery & Buttons */}
                    <div className="flex items-center justify-between lg:justify-end gap-6 pt-4 lg:pt-0 border-t lg:border-t-0 border-white/[0.08] shrink-0">
                      <div className="text-right">
                        <span className="text-[10px] font-mono uppercase tracking-wider text-white/40 block">
                          Projected Uplift
                        </span>
                        <span className="text-lg sm:text-2xl font-black text-[#74f5ff] font-mono tracking-tight flex items-baseline justify-end gap-0.5">
                          {action.estimated_monthly_recovery > 0 ? (
                            <>
                              <span>+₹{Math.round(action.estimated_monthly_recovery).toLocaleString('en-IN')}</span>
                              <span className="text-[11px] font-normal text-white/40 font-sans">/mo</span>
                            </>
                          ) : (
                            <span className="text-emerald-400">Risk Shield</span>
                          )}
                        </span>
                      </div>

                      <div className="flex items-center gap-2.5">
                        {action.one_click_code && (
                          <button
                            onClick={() => setActiveCodeDrawer(isCodeOpen ? null : action.rank)}
                            className={`px-3 py-2 rounded-xl border text-xs font-mono font-medium transition cursor-pointer flex items-center gap-1.5 ${
                              isCodeOpen
                                ? 'bg-[#74f5ff]/20 text-[#74f5ff] border-[#74f5ff]/50 shadow-[0_0_12px_rgba(116,245,255,0.25)]'
                                : 'bg-white/[0.04] text-white/70 border-white/10 hover:bg-white/[0.08] hover:border-white/20'
                            }`}
                            title="Inspect Razorpay Code Blueprint"
                          >
                            <Code2 className="w-3.5 h-3.5 text-[#74f5ff]" />
                            <span className="hidden sm:inline">Blueprint</span>
                          </button>
                        )}

                        <button
                          onClick={() => toggleApply(action.rank)}
                          className={`px-4 py-2 rounded-full text-xs font-semibold transition cursor-pointer flex items-center gap-1.5 ${
                            isApplied
                              ? 'bg-[#74f5ff] text-[#06070b] font-black shadow-[0_0_20px_rgba(116,245,255,0.45)]'
                              : 'btn-shiny-pill'
                          }`}
                        >
                          {isApplied ? (
                            <>
                              <Check className="w-3.5 h-3.5" />
                              <span>Simulated</span>
                            </>
                          ) : (
                            <span>Simulate Fix</span>
                          )}
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Code Snippet Drawer with high-tech code editor preview */}
                  {isCodeOpen && action.one_click_code && (
                    <div className="mt-5 pt-4 border-t border-white/[0.08] text-xs animate-in fade-in duration-200">
                      <div className="flex items-center justify-between mb-2.5 text-white/50 text-[11px] font-mono">
                        <div className="flex items-center gap-2">
                          <FileCode className="w-3.5 h-3.5 text-[#74f5ff]" />
                          <span className="text-white/80 font-bold">razorpay_remediation_patch.ts</span>
                          <span className="text-[10px] px-2 py-0.2 rounded bg-white/[0.05] border border-white/10 text-white/40">
                            Production Ready
                          </span>
                        </div>
                        <button
                          onClick={() => handleCopyCode(action.rank, action.one_click_code!)}
                          className="hover:text-white transition-colors flex items-center gap-1 text-[10px] text-white/60 cursor-pointer"
                        >
                          {copiedRank === action.rank ? (
                            <>
                              <CheckCheck className="w-3.5 h-3.5 text-emerald-400" />
                              <span className="text-emerald-400">Copied!</span>
                            </>
                          ) : (
                            <>
                              <Copy className="w-3.5 h-3.5" />
                              <span>Copy Blueprint</span>
                            </>
                          )}
                        </button>
                      </div>
                      <pre className="p-4 rounded-xl bg-black/70 border border-white/10 font-mono text-[11px] text-[#74f5ff] overflow-x-auto leading-relaxed shadow-inner">
                        {action.one_click_code}
                      </pre>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

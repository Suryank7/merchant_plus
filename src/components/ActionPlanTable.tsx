'use client';

import React, { useState } from 'react';
import { RecommendedAction } from '@/lib/types';
import { Check, Code2, Sparkles, ArrowRight, IndianRupee } from 'lucide-react';

interface ActionPlanTableProps {
  actions: RecommendedAction[];
}

export function ActionPlanTable({ actions }: ActionPlanTableProps) {
  const [appliedActions, setAppliedActions] = useState<Record<number, boolean>>({});
  const [activeCodeDrawer, setActiveCodeDrawer] = useState<number | null>(null);

  const toggleApply = (rank: number) => {
    setAppliedActions((prev) => ({
      ...prev,
      [rank]: !prev[rank],
    }));
  };

  const totalSimulatedSavings = actions.reduce((acc, action) => {
    return appliedActions[action.rank] ? acc + action.estimated_monthly_recovery : acc;
  }, 0);

  const getCategoryBadge = (cat: string) => {
    switch (cat) {
      case 'cost_optimization':
        return 'bg-[#74f5ff]/10 text-[#74f5ff] border-[#74f5ff]/30';
      case 'funnel_recovery':
        return 'bg-[#5b8cff]/10 text-[#5b8cff] border-[#5b8cff]/30';
      case 'risk_mitigation':
        return 'bg-amber-400/10 text-amber-300 border-amber-400/30';
      case 'growth':
      default:
        return 'bg-[#a78bfa]/10 text-[#a78bfa] border-[#a78bfa]/30';
    }
  };

  return (
    <section id="interventions" className="py-16 sm:py-24 bg-[#06070b]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl border border-white/10 bg-[#0a0c12] p-6 sm:p-10 shadow-2xl">
          {/* Section Header */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8 pb-6 border-b border-white/[0.08]">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full glass-pill px-3 py-1 text-[11px] font-mono uppercase tracking-[0.2em] text-[#74f5ff] mb-2">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Prioritized Interventions</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
                Autonomous ROI Roadmap
              </h2>
              <p className="text-xs sm:text-sm text-white/60 mt-1">
                Triaged by Node 4 using Expected Value = (Monthly Recovery × Confidence) / Effort.
              </p>
            </div>

            {totalSimulatedSavings > 0 && (
              <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-[#74f5ff]/10 border border-[#74f5ff]/30 text-[#74f5ff] text-xs font-bold font-mono">
                <Check className="w-4 h-4" />
                <span>Simulated Recovered: ₹{Math.round(totalSimulatedSavings).toLocaleString('en-IN')}/mo</span>
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
                  className={`rounded-2xl border p-5 transition-all ${
                    isApplied
                      ? 'bg-[#74f5ff]/[0.03] border-[#74f5ff]/40 shadow-[0_0_25px_rgba(116,245,255,0.06)]'
                      : 'bg-[#0e1017] border-white/10 hover:border-white/20'
                  }`}
                >
                  <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                    {/* Left: Info */}
                    <div className="flex items-start gap-4">
                      <span className="w-8 h-8 rounded-xl bg-white/[0.06] text-white flex items-center justify-center text-xs font-mono font-black shrink-0 border border-white/15">
                        0{action.rank}
                      </span>
                      <div>
                        <div className="flex flex-wrap items-center gap-2 mb-2">
                          <h3 className="text-sm sm:text-base font-bold text-white">{action.action}</h3>
                          <span
                            className={`px-2.5 py-0.5 rounded-full text-[10px] font-mono font-semibold uppercase tracking-wider border ${getCategoryBadge(
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
                    <div className="flex items-center justify-between lg:justify-end gap-5 pt-4 lg:pt-0 border-t lg:border-t-0 border-white/[0.06] shrink-0">
                      <div className="text-right">
                        <span className="text-[10px] font-mono uppercase tracking-wider text-white/40 block">
                          Projected Uplift
                        </span>
                        <span className="text-lg sm:text-xl font-black text-[#74f5ff] font-mono">
                          {action.estimated_monthly_recovery > 0
                            ? `+₹${Math.round(action.estimated_monthly_recovery).toLocaleString('en-IN')}`
                            : 'Shield'}
                          {action.estimated_monthly_recovery > 0 && (
                            <span className="text-[10px] font-normal text-white/40 ml-1 font-sans">/mo</span>
                          )}
                        </span>
                      </div>

                      <div className="flex items-center gap-2">
                        {action.one_click_code && (
                          <button
                            onClick={() => setActiveCodeDrawer(isCodeOpen ? null : action.rank)}
                            className={`p-2 rounded-xl border text-xs font-medium transition ${
                              isCodeOpen
                                ? 'bg-[#74f5ff]/20 text-[#74f5ff] border-[#74f5ff]/40'
                                : 'bg-white/[0.04] text-white/70 border-white/10 hover:bg-white/[0.08]'
                            }`}
                            title="View Razorpay Code Blueprint"
                          >
                            <Code2 className="w-4 h-4" />
                          </button>
                        )}

                        <button
                          onClick={() => toggleApply(action.rank)}
                          className={`px-4 py-2 rounded-full text-xs font-semibold transition cursor-pointer flex items-center gap-1.5 ${
                            isApplied
                              ? 'bg-[#74f5ff] text-[#06070b] font-bold shadow-[0_0_20px_rgba(116,245,255,0.4)]'
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

                  {/* Code Snippet Drawer */}
                  {isCodeOpen && action.one_click_code && (
                    <div className="mt-4 pt-4 border-t border-white/[0.08] text-xs">
                      <div className="flex items-center justify-between mb-2 text-white/50 text-[11px] font-mono">
                        <span>Razorpay Checkout Integration Blueprint:</span>
                        <span className="text-[#74f5ff]">checkout.js config</span>
                      </div>
                      <pre className="p-4 rounded-xl bg-[#06070b] border border-white/10 font-mono text-[11px] text-[#74f5ff] overflow-x-auto">
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

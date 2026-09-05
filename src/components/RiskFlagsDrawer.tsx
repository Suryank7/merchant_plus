'use client';

import React, { useState } from 'react';
import { RiskFlag } from '@/lib/types';
import { ShieldAlert, Search, Filter } from 'lucide-react';

interface RiskFlagsDrawerProps {
  riskFlags: RiskFlag[];
}

export function RiskFlagsDrawer({ riskFlags }: RiskFlagsDrawerProps) {
  const [filterSeverity, setFilterSeverity] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState<string>('');

  const filtered = riskFlags.filter((flag) => {
    const matchesSeverity = filterSeverity === 'all' || flag.severity === filterSeverity;
    const matchesSearch =
      flag.transaction_id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      flag.risk_type.toLowerCase().includes(searchTerm.toLowerCase()) ||
      flag.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesSeverity && matchesSearch;
  });

  const getSeverityBadge = (sev: string) => {
    switch (sev) {
      case 'critical':
        return 'bg-red-500/15 text-red-400 border-red-500/30';
      case 'high':
        return 'bg-rose-500/15 text-rose-400 border-rose-500/30';
      case 'medium':
        return 'bg-amber-400/15 text-amber-300 border-amber-400/30';
      case 'low':
      default:
        return 'bg-white/10 text-white/60 border-white/15';
    }
  };

  return (
    <section className="py-16 sm:py-24 bg-transparent relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl border border-white/15 backdrop-blur-2xl bg-gradient-to-b from-white/[0.04] via-white/[0.015] to-[#06070b]/90 p-6 sm:p-12 shadow-[0_20px_60px_rgba(0,0,0,0.8)]">
          {/* Header */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8 pb-6 border-b border-white/[0.08]">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full glass-pill px-3 py-1 text-[11px] font-mono uppercase tracking-[0.2em] text-amber-400 mb-2">
                <ShieldAlert className="w-3.5 h-3.5" />
                <span>Risk &amp; Anomaly Ledger</span>
              </div>
              <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
                Statistical Anomaly Radar
              </h2>
              <p className="text-xs sm:text-sm text-white/60 mt-1">
                Powered by XGBoost feature importances and Z-score thresholding (Z &gt; 2.8σ).
              </p>
            </div>

            {/* Filter controls */}
            <div className="flex items-center gap-3 w-full sm:w-auto">
              <div className="relative flex-1 sm:w-64">
                <Search className="w-4 h-4 text-white/40 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Search ID or anomaly..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full bg-white/[0.04] border border-white/10 rounded-full pl-10 pr-4 py-2.5 text-xs text-white placeholder-white/40 focus:outline-none focus:border-[#74f5ff]/40"
                />
              </div>

              <select
                value={filterSeverity}
                onChange={(e) => setFilterSeverity(e.target.value)}
                className="bg-white/[0.04] border border-white/10 rounded-full px-4 py-2.5 text-xs text-white/80 focus:outline-none focus:border-[#74f5ff]/40 cursor-pointer"
              >
                <option value="all" className="bg-[#0b0f19]">All Severity</option>
                <option value="high" className="bg-[#0b0f19]">High</option>
                <option value="medium" className="bg-[#0b0f19]">Medium</option>
                <option value="low" className="bg-[#0b0f19]">Low</option>
              </select>
            </div>
          </div>

          {/* List */}
          {filtered.length === 0 ? (
            <div className="py-12 text-center text-white/40 text-xs font-mono">
              No anomalous transactions matching active filter.
            </div>
          ) : (
            <div className="space-y-3.5 max-h-[440px] overflow-y-auto no-scrollbar pr-1">
              {filtered.map((flag) => (
                <div
                  key={flag.transaction_id}
                  className="glass-card-interactive flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 rounded-2xl"
                >
                  <div className="flex items-start gap-3.5">
                    <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold uppercase tracking-wider border shrink-0 ${getSeverityBadge(flag.severity)}`}>
                      {flag.severity}
                    </span>
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-mono text-xs font-bold text-white tracking-wide">
                          {flag.transaction_id}
                        </span>
                        <span className="text-[11px] font-mono text-white/40">
                          ({flag.risk_type})
                        </span>
                      </div>
                      <p className="text-xs text-white/70">{flag.description}</p>
                    </div>
                  </div>

                  <div className="text-right shrink-0 pt-2 sm:pt-0 border-t sm:border-t-0 border-white/[0.06]">
                    <span className="text-xs sm:text-sm font-mono font-black text-amber-400">
                      ₹{flag.amount.toLocaleString('en-IN')}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

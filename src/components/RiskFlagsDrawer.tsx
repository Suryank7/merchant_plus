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
    <section className="py-12 bg-[#06070b]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl border border-white/10 bg-[#0a0c12] p-6 sm:p-10 shadow-2xl">
          {/* Header */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6 pb-6 border-b border-white/[0.08]">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full glass-pill px-3 py-1 text-[11px] font-mono uppercase tracking-[0.2em] text-amber-400 mb-2">
                <ShieldAlert className="w-3.5 h-3.5" />
                <span>Risk &amp; Anomaly Ledger</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
                Statistical Anomaly Radar
              </h2>
              <p className="text-xs sm:text-sm text-white/60 mt-1">
                Powered by XGBoost feature importances and Z-score thresholding (Z &gt; 2.8σ).
              </p>
            </div>

            {/* Filter controls */}
            <div className="flex items-center gap-3 w-full sm:w-auto">
              <div className="relative flex-1 sm:w-60">
                <Search className="w-4 h-4 text-white/40 absolute left-3 top-2.5" />
                <input
                  type="text"
                  placeholder="Search ID or anomaly..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full bg-[#0e1017] border border-white/10 rounded-full pl-9 pr-4 py-2 text-xs text-white placeholder-white/30 focus:outline-none focus:border-[#74f5ff]/40"
                />
              </div>

              <select
                value={filterSeverity}
                onChange={(e) => setFilterSeverity(e.target.value)}
                className="bg-[#0e1017] border border-white/10 rounded-full px-4 py-2 text-xs text-white/80 focus:outline-none focus:border-[#74f5ff]/40 cursor-pointer"
              >
                <option value="all">All Severity</option>
                <option value="high">High</option>
                <option value="medium">Medium</option>
                <option value="low">Low</option>
              </select>
            </div>
          </div>

          {/* List */}
          {filtered.length === 0 ? (
            <div className="py-10 text-center text-white/40 text-xs font-mono">
              No anomalous transactions matching active filter.
            </div>
          ) : (
            <div className="space-y-3 max-h-[380px] overflow-y-auto pr-2">
              {filtered.map((flag) => (
                <div
                  key={flag.transaction_id}
                  className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-xl bg-[#0e1017] border border-white/[0.06] hover:border-white/15 transition"
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

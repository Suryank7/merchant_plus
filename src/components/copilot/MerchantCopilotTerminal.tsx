'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Terminal,
  Send,
  Sparkles,
  Bot,
  Activity,
  CheckCircle2,
  TrendingDown,
  Wrench,
  Clock,
  ArrowRight,
  Zap,
  Cpu,
  Search,
  Check,
} from 'lucide-react';
import { runDiagnosticQuery, CopilotDiagnosticResult, PRESET_COPILOT_QUERIES } from '@/lib/copilot-engine';

export function MerchantCopilotTerminal() {
  const [queryInput, setQueryInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [diagnosticResult, setDiagnosticResult] = useState<CopilotDiagnosticResult>(() =>
    runDiagnosticQuery('Why did UPI payments fail during Saturday peak hours?')
  );
  const [isRemediated, setIsRemediated] = useState(false);

  const handleRunQuery = async (queryText: string) => {
    if (!queryText.trim()) return;
    setIsLoading(true);
    setIsRemediated(false);

    try {
      const res = await fetch('/api/growth/copilot-query', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query: queryText }),
      });

      if (res.ok) {
        const data = await res.json();
        setDiagnosticResult(data.result);
      } else {
        setDiagnosticResult(runDiagnosticQuery(queryText));
      }
    } catch {
      setDiagnosticResult(runDiagnosticQuery(queryText));
    } finally {
      setIsLoading(false);
      setQueryInput('');
    }
  };

  const handleExecuteRemediation = () => {
    setIsRemediated(true);
  };

  const executionPhases = [
    { label: '01. Ingest Telemetry', status: 'done' },
    { label: '02. Gateway Isolation', status: 'done' },
    { label: '03. Leakage Quantification', status: 'done' },
    { label: '04. Autonomous Patch', status: isRemediated ? 'done' : 'ready' },
  ];

  return (
    <div id="ai-copilot-terminal" className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
      <div className="rounded-3xl border border-white/15 backdrop-blur-3xl bg-gradient-to-b from-white/[0.06] via-[#080b14]/90 to-[#04060a]/95 p-6 sm:p-12 shadow-[0_30px_90px_rgba(0,0,0,0.85)] relative overflow-hidden font-sans">
        {/* Ambient Glows & Laser Horizon */}
        <div className="absolute top-0 right-1/4 w-[500px] h-[220px] bg-[#0080ff]/15 rounded-full blur-[100px] pointer-events-none" />
        <div className="absolute -bottom-10 left-1/4 w-[450px] h-[220px] bg-[#74f5ff]/10 rounded-full blur-[100px] pointer-events-none" />
        <div className="buildathon-laser-horizon absolute top-0 inset-x-0" />

        {/* Section Header with MindMasters Signature Serif Typography */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-8 border-b border-white/[0.08]">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full glass-pill px-4 py-1 text-[11px] font-mono uppercase tracking-[0.22em] text-[#74f5ff] mb-3.5 shadow-[0_0_20px_rgba(116,245,255,0.2)]">
              <span className="relative inline-flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full rounded-full bg-[#74f5ff] opacity-75 animate-ping" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-[#74f5ff]" />
              </span>
              <span>Root-Cause Reasoning Engine</span>
              <span className="text-white/30">•</span>
              <span className="text-white/70">Multi-Agent XAI</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-white leading-tight">
              Ask AI Why <span className="font-serif-display italic font-normal text-[#74f5ff] text-4xl sm:text-6xl">Revenue or Conversion</span> Dropped
            </h2>
            <p className="text-xs sm:text-base text-white/60 max-w-3xl mt-2 leading-relaxed">
              Natural language diagnostic terminal querying transaction telemetry, isolating bank gateway timeouts, and dispatching 1-click Razorpay remediations.
            </p>
          </div>

          <div className="flex flex-col items-start lg:items-end gap-2 shrink-0">
            <div className="flex items-center gap-2.5 font-mono text-[11px] text-white/80 bg-black/50 border border-white/10 px-4 py-2 rounded-full shadow-inner">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-emerald-400 font-semibold tracking-wide">Telemetry Engine Online</span>
            </div>
            <span className="text-[10px] font-mono text-white/40 tracking-wider">
              Latency: 42ms · Razorpay Gateway Sync: 100%
            </span>
          </div>
        </div>

        {/* Diagnostic Pipeline Execution Phases Tracker */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2.5 py-6 border-b border-white/[0.06]">
          {executionPhases.map((phase, idx) => (
            <div
              key={idx}
              className="flex items-center gap-2.5 px-3.5 py-2 rounded-xl bg-white/[0.02] border border-white/5 text-[11px] font-mono"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
              <span className="text-white/70 truncate">{phase.label}</span>
              <span className="ml-auto text-[9px] uppercase tracking-wider text-emerald-400/80 bg-emerald-500/10 px-1.5 py-0.5 rounded">
                {phase.status}
              </span>
            </div>
          ))}
        </div>

        {/* Command Line Input Bar */}
        <div className="py-6 space-y-4">
          <div className="relative group">
            <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-[#74f5ff]/20 via-[#0080ff]/20 to-purple-500/20 blur-lg opacity-40 group-hover:opacity-75 transition duration-500 pointer-events-none" />
            <div className="relative flex flex-col sm:flex-row gap-3 bg-black/60 border border-white/15 rounded-2xl p-2 sm:p-2.5 shadow-2xl backdrop-blur-xl">
              <div className="relative flex-1 flex items-center pl-3">
                <span className="text-[#74f5ff] font-mono text-xs font-bold mr-2 hidden sm:inline select-none">
                  copilot@razorpay:~$
                </span>
                <input
                  type="text"
                  value={queryInput}
                  onChange={(e) => setQueryInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleRunQuery(queryInput)}
                  placeholder="Ask about conversion drops, UPI failure spikes, cohort churn, or card fees..."
                  className="w-full py-2.5 bg-transparent text-xs sm:text-sm text-white placeholder-white/40 focus:outline-none font-mono"
                />
                <Sparkles className="w-4 h-4 text-[#74f5ff] absolute right-3 pointer-events-none opacity-50" />
              </div>
              <button
                onClick={() => handleRunQuery(queryInput)}
                disabled={isLoading || !queryInput.trim()}
                className="btn-shiny-pill px-6 py-3 rounded-xl text-white font-bold text-xs tracking-wider uppercase flex items-center justify-center gap-2 cursor-pointer transition-opacity disabled:opacity-40 shrink-0 shadow-[0_0_20px_rgba(0,128,255,0.3)]"
              >
                {isLoading ? (
                  <>
                    <span className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    <span>Diagnosing...</span>
                  </>
                ) : (
                  <>
                    <span>Investigate</span>
                    <Send className="w-3.5 h-3.5 text-[#74f5ff]" />
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Preset Prompts Pills */}
          <div className="flex flex-wrap items-center gap-2 text-xs pt-1">
            <span className="text-[11px] text-white/45 font-mono flex items-center gap-1.5 mr-1">
              <Zap className="w-3.5 h-3.5 text-[#74f5ff]" />
              Quick Diagnostics:
            </span>
            {PRESET_COPILOT_QUERIES.map((preset) => (
              <button
                key={preset}
                onClick={() => handleRunQuery(preset)}
                className="px-3.5 py-1.5 rounded-full bg-white/[0.03] hover:bg-white/[0.08] text-white/80 hover:text-white border border-white/10 hover:border-[#74f5ff]/40 text-[11px] transition-all cursor-pointer font-sans shadow-sm hover:scale-[1.02]"
              >
                &ldquo;{preset}&rdquo;
              </button>
            ))}
          </div>
        </div>

        {/* Diagnostic Output View */}
        <AnimatePresence mode="wait">
          {diagnosticResult && (
            <motion.div
              key={diagnosticResult.query}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.3 }}
              className="mt-2 space-y-6"
            >
              {/* Executive Summary Card with Terminal Chrome Header */}
              <div className="rounded-2xl bg-black/60 border border-white/10 overflow-hidden shadow-2xl">
                {/* Terminal Mac Chrome Header */}
                <div className="flex items-center justify-between px-4 py-2.5 bg-white/[0.03] border-b border-white/[0.08]">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-rose-500/80" />
                    <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
                    <span className="ml-2 font-mono text-[10px] text-white/40">diagnostic_output.log</span>
                  </div>
                  <div className="flex items-center gap-2 font-mono text-[10px] text-white/50">
                    <span>Confidence:</span>
                    <span className="text-emerald-400 font-bold bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                      {Math.round(diagnosticResult.confidenceScore * 100)}%
                    </span>
                  </div>
                </div>

                <div className="p-6 space-y-4">
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <span className="text-xs font-mono uppercase tracking-wider text-[#74f5ff] bg-[#74f5ff]/10 px-3 py-1 rounded-md border border-[#74f5ff]/30 shadow-[0_0_12px_rgba(116,245,255,0.2)]">
                      Classification: {diagnosticResult.category}
                    </span>
                    <div className="flex items-center gap-2 font-mono text-xs">
                      <span className="text-white/40">Identified Net Leakage:</span>
                      <span className="text-rose-400 font-bold font-mono text-sm sm:text-base">
                        ₹{diagnosticResult.leakageInr.toLocaleString('en-IN')}
                      </span>
                    </div>
                  </div>

                  <p className="text-xs sm:text-sm text-white/90 leading-relaxed font-sans font-medium">
                    {diagnosticResult.executiveSummary}
                  </p>

                  <div className="pt-2 border-t border-white/[0.06] flex items-center gap-2 text-xs text-white/70 font-mono">
                    <Activity className="w-4 h-4 text-amber-400 shrink-0" />
                    <span className="font-semibold text-white/80">Primary Root Cause:</span>
                    <span className="text-amber-300 font-semibold">{diagnosticResult.primaryRootCause}</span>
                  </div>
                </div>
              </div>

              {/* Tool Execution Logs & Waterfall Decomposition (2 columns) */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                {/* Tool Calling Trace (5 cols) */}
                <div className="lg:col-span-5 bg-black/60 border border-white/10 rounded-2xl p-5 space-y-3.5 font-mono text-[11px] shadow-xl">
                  <div className="flex items-center justify-between pb-3 border-b border-white/[0.08]">
                    <span className="text-white/90 font-bold flex items-center gap-2">
                      <Bot className="w-4 h-4 text-[#74f5ff]" />
                      Multi-Agent Tool Tracing
                    </span>
                    <span className="text-[10px] text-white/40 px-2 py-0.5 rounded bg-white/[0.05] border border-white/10 font-mono">
                      {diagnosticResult.toolCalls.length} agents executed
                    </span>
                  </div>

                  <div className="space-y-2.5 max-h-56 overflow-y-auto no-scrollbar pr-1">
                    {diagnosticResult.toolCalls.map((tc, idx) => (
                      <div
                        key={idx}
                        className="p-3 rounded-xl bg-white/[0.02] border border-white/5 space-y-1.5 hover:border-[#74f5ff]/30 transition-colors"
                      >
                        <div className="flex items-center justify-between text-[#74f5ff]">
                          <span className="font-bold flex items-center gap-1.5">
                            <span className="text-[10px] text-white/30 font-mono">0{idx + 1}.</span>
                            {tc.tool}()
                          </span>
                          <span className="text-[10px] text-white/40 flex items-center gap-1 font-mono">
                            <Clock className="w-2.5 h-2.5" />
                            {tc.executionTimeMs}ms
                          </span>
                        </div>
                        <p className="text-white/70 text-[10px] leading-relaxed font-mono">{tc.output}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Revenue Waterfall Bars (7 cols) */}
                <div className="lg:col-span-7 bg-white/[0.025] border border-white/10 rounded-2xl p-5 space-y-3.5 shadow-xl">
                  <div className="flex items-center justify-between pb-3 border-b border-white/[0.08]">
                    <span className="text-xs font-bold text-white flex items-center gap-2">
                      <TrendingDown className="w-4 h-4 text-rose-400" />
                      Revenue Leakage Waterfall
                    </span>
                    <span className="text-[10px] font-mono text-white/40">Telemetry Delta (INR)</span>
                  </div>

                  <div className="space-y-3 pt-1">
                    {diagnosticResult.waterfall.map((step, idx) => (
                      <div key={idx} className="space-y-1.5 text-xs">
                        <div className="flex justify-between font-mono text-[11px]">
                          <span className="text-white/80">{step.label}</span>
                          <span
                            className={
                              step.type === 'negative'
                                ? 'text-rose-400 font-bold'
                                : step.type === 'positive'
                                ? 'text-emerald-400 font-bold'
                                : 'text-white font-bold'
                            }
                          >
                            {step.deltaInr < 0 ? '-' : step.type === 'positive' ? '+' : ''}₹
                            {Math.abs(step.deltaInr).toLocaleString('en-IN')}
                          </span>
                        </div>
                        <div className="h-2 w-full bg-white/[0.06] rounded-full overflow-hidden p-0.5">
                          <div
                            className={`h-full rounded-full transition-all duration-500 ${
                              step.type === 'negative'
                                ? 'bg-gradient-to-r from-rose-500 to-rose-400'
                                : step.type === 'positive'
                                ? 'bg-gradient-to-r from-emerald-500 to-teal-400'
                                : 'bg-gradient-to-r from-[#0080ff] to-[#74f5ff]'
                            }`}
                            style={{ width: `${Math.min(100, Math.max(15, (Math.abs(step.deltaInr) / 850000) * 100))}%` }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* 1-Click Remediation Action Banner with Razorpay Laser Border */}
              <div className="p-6 rounded-2xl bg-gradient-to-r from-[#0080ff]/20 via-purple-950/25 to-black border border-[#0080ff]/40 flex flex-col md:flex-row items-start md:items-center justify-between gap-5 shadow-[0_0_40px_rgba(0,128,255,0.2)] relative overflow-hidden">
                <div className="space-y-1.5">
                  <div className="flex items-center gap-2">
                    <Wrench className="w-4 h-4 text-[#74f5ff]" />
                    <h3 className="text-xs sm:text-sm font-bold text-white uppercase tracking-wider">
                      Recommended Remediation: {diagnosticResult.remediation.title}
                    </h3>
                  </div>
                  <p className="text-[11px] sm:text-xs text-white/70 font-mono">
                    Projected monthly recovery: <strong className="text-emerald-400 font-bold font-mono">₹{diagnosticResult.remediation.roiEstMonthlyInr.toLocaleString('en-IN')}/mo</strong> · Automated Razorpay API dispatch
                  </p>
                </div>

                <div className="flex items-center gap-3 shrink-0">
                  {isRemediated ? (
                    <div className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-xs font-bold font-mono shadow-[0_0_20px_rgba(16,185,129,0.3)] animate-in fade-in">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                      <span>{diagnosticResult.remediation.successMessage}</span>
                    </div>
                  ) : (
                    <button
                      onClick={handleExecuteRemediation}
                      className="btn-shiny-pill px-6 py-3 rounded-full text-white font-bold text-xs tracking-wider uppercase flex items-center gap-2 cursor-pointer shadow-[0_0_20px_rgba(116,245,255,0.35)]"
                    >
                      <span>{diagnosticResult.remediation.buttonLabel}</span>
                      <ArrowRight className="w-3.5 h-3.5 text-[#74f5ff]" />
                    </button>
                  )}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

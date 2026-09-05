'use client';

import React from 'react';
import { Database, ShieldAlert, TrendingUp, Cpu, FileText, CheckCircle2, Zap, ArrowRight, Activity } from 'lucide-react';
import { AgentTraceStep } from '@/lib/types';

interface MindMastersProcessProps {
  traces: AgentTraceStep[];
}

export function MindMastersProcess({ traces }: MindMastersProcessProps) {
  const steps = [
    {
      num: '01',
      title: 'Ingest & Normalize Transaction Streams',
      tag: 'Data Harvester',
      desc: 'Connects directly to Razorpay Payment APIs to extract transaction status, error codes, and payment methods across UPI, Cards, and Netbanking rails.',
      provenance: 'auto_stream_agent/src/rag.py adapted to API streams',
      icon: Database,
      nodeId: 'data_harvester',
      telemetry: {
        metric: '1,420 tx/sec',
        sub: 'Data Integrity: 99.98%',
        badge: 'Razorpay API Stream',
      },
    },
    {
      num: '02',
      title: 'XGBoost Anomaly & Fraud Scoring',
      tag: 'Risk Scorer',
      desc: 'Applies statistical anomaly formulas and feature weights from supervised XGBoost (ROC-AUC 0.982). Flags high-ticket outliers and chargeback risks with auditable Z-scores.',
      provenance: 'transaction-fraud-detection & ctgan-fraud-detection',
      icon: ShieldAlert,
      nodeId: 'risk_scorer',
      telemetry: {
        metric: 'ROC-AUC 0.982',
        sub: 'Z-Score: +3.12σ Threshold',
        badge: 'XGBoost + SMOTE',
      },
    },
    {
      num: '03',
      title: 'Funnel Analysis & Zero-MDR UPI Arbitrage',
      tag: 'Funnel Analyzer',
      desc: 'Quantifies conversion drop-offs by payment method. Identifies sub-₹2,000 card transactions that qualify for 0% RBI UPI MDR, calculating exact monthly fee leakage.',
      provenance: 'credex_task SaaS Audit Pattern adapted for RBI Zero-MDR',
      icon: TrendingUp,
      nodeId: 'funnel_analyzer',
      telemetry: {
        metric: '₹1,24,000 /mo',
        sub: '42.6% Card-to-UPI Arbitrage',
        badge: 'Zero-MDR Engine',
      },
    },
    {
      num: '04',
      title: 'Autonomous Decision Triage Matrix',
      tag: 'Decision Engine',
      desc: 'The genuine agentic core: autonomously weighs competing interventions by Expected ROI = (Monthly Recovery × Confidence) / Implementation Effort, generating ranked action plans.',
      provenance: 'auto_stream_agent StateGraph & startup-blueprint-agent',
      icon: Cpu,
      nodeId: 'growth_recommender',
      telemetry: {
        metric: 'EV Score 94.8',
        sub: 'Multi-Objective Pareto Rank',
        badge: 'StateGraph DAG Core',
      },
    },
    {
      num: '05',
      title: 'Executive Growth Brief Synthesis',
      tag: 'CFO Narrative',
      desc: 'Synthesizes structured telemetry and recommendations into an authoritative, executive-ready brief formatted for Founders and Merchant Success leadership via Claude 3.5 Sonnet.',
      provenance: 'credex_task CFO LLM synthesis architecture',
      icon: FileText,
      nodeId: 'narrative_generator',
      telemetry: {
        metric: '1,480 Tokens',
        sub: 'Structured Markdown Schema',
        badge: 'Claude 3.5 Sonnet',
      },
    },
  ];

  return (
    <section id="how-it-works" className="relative py-24 sm:py-32 bg-transparent overflow-hidden">
      {/* Ambient background glows */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
        <div
          className="absolute top-[12%] left-1/2 -translate-x-1/2 h-[55vw] w-[55vw] rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(0,128,255,0.12), transparent 65%)',
            filter: 'blur(120px)',
          }}
        />
        <div
          className="absolute top-[60%] left-1/3 h-[40vw] w-[40vw] rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(116,245,255,0.08), transparent 60%)',
            filter: 'blur(100px)',
          }}
        />
      </div>

      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        {/* Header */}
        <div className="max-w-3xl text-center mx-auto mb-16 sm:mb-24">
          <div className="inline-flex items-center gap-2 rounded-full glass-pill px-4 py-1 text-[11px] font-mono uppercase tracking-[0.22em] text-[#74f5ff] mb-4 shadow-[0_0_20px_rgba(116,245,255,0.2)]">
            <span className="relative inline-flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full rounded-full bg-[#74f5ff] opacity-75 animate-ping" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-[#74f5ff]" />
            </span>
            <span>Autonomous StateGraph Architecture</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white leading-tight">
            5-Node LangGraph Agentic Pipeline
          </h2>
          <p className="mt-4 text-white/65 text-sm sm:text-base leading-relaxed max-w-2xl mx-auto">
            Every merchant audit flows sequentially through 5 specialized autonomous nodes, transforming high-velocity payment telemetry into mathematically triaged interventions.
          </p>
        </div>

        {/* Central Vertical Timeline */}
        <div className="relative">
          {/* Vertical Laser Beam for Desktop with Traveling Energy Bead */}
          <div
            aria-hidden="true"
            className="hidden md:block absolute left-1/2 -translate-x-1/2 top-4 bottom-4 w-[2px] bg-gradient-to-b from-transparent via-[#74f5ff]/40 to-transparent"
          >
            {/* Animated pulsing light packet traveling down the rail */}
            <div className="w-[6px] h-20 -left-[2px] absolute bg-gradient-to-b from-transparent via-[#74f5ff] to-transparent animate-pulse rounded-full shadow-[0_0_12px_#74f5ff]" />
          </div>

          <ol className="space-y-16 md:space-y-28">
            {steps.map((step, idx) => {
              const isEven = idx % 2 === 0;
              const Icon = step.icon;
              const trace = traces.find((t) => t.node === step.nodeId);

              return (
                <li
                  key={step.num}
                  className="relative grid grid-cols-1 md:grid-cols-2 md:gap-0 gap-8 items-center group"
                >
                  {/* Left Column */}
                  <div
                    className={`${
                      isEven ? 'md:text-right md:pr-16' : 'md:order-2 md:text-left md:pl-16'
                    }`}
                  >
                    <div className="inline-flex items-center gap-1.5 text-xs font-mono uppercase tracking-[0.22em] text-[#74f5ff] mb-2 font-bold">
                      <Zap className="w-3.5 h-3.5" />
                      <span>Node {step.num}</span>
                      <span className="text-white/30">•</span>
                      <span className="text-white/60">{step.tag}</span>
                    </div>

                    <h3 className="text-xl sm:text-3xl font-extrabold text-white tracking-tight leading-snug group-hover:text-[#74f5ff] transition-colors duration-300">
                      {step.title}
                    </h3>

                    <p className="mt-2.5 text-xs sm:text-sm text-white/70 leading-relaxed font-sans">
                      {step.desc}
                    </p>

                    <div className="mt-3 inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.03] border border-white/10 text-[10px] font-mono text-white/50">
                      <span className="text-emerald-400">Provenance:</span>
                      <span>{step.provenance}</span>
                    </div>
                  </div>

                  {/* Right Column: Card Preview matching MindMasters */}
                  <div
                    className={`${
                      isEven ? 'md:pl-16' : 'md:order-1 md:pr-16 md:flex md:justify-end'
                    }`}
                  >
                    <div className="glass-card-interactive rounded-3xl p-6 lg:p-8 w-full max-w-[440px] shadow-[0_20px_50px_rgba(0,0,0,0.7)] relative overflow-hidden group-hover:scale-[1.02] transition-all duration-300">
                      {/* Top laser accent line */}
                      <div className="absolute top-0 inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-[#74f5ff] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                      <div className="flex items-center justify-between gap-2 mb-4">
                        <div className="inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-[#0080ff]/15 ring-1 ring-[#0080ff]/30 text-[#74f5ff] shadow-[0_0_15px_rgba(0,128,255,0.25)]">
                          <Icon className="h-5 w-5" />
                        </div>
                        <span className="text-[10px] font-mono font-bold uppercase tracking-[0.18em] text-[#74f5ff] rounded-full bg-[#74f5ff]/10 ring-1 ring-[#74f5ff]/25 px-3 py-1 shadow-[0_0_10px_rgba(116,245,255,0.15)]">
                          {step.telemetry.badge}
                        </span>
                      </div>

                      {/* Live Telemetry Display */}
                      <div className="p-3.5 rounded-2xl bg-black/50 border border-white/10 mb-4 flex items-center justify-between">
                        <div>
                          <p className="text-[10px] font-mono uppercase tracking-wider text-white/40">Node Telemetry</p>
                          <p className="text-sm sm:text-base font-bold font-mono text-white tracking-tight">
                            {step.telemetry.metric}
                          </p>
                        </div>
                        <div className="text-right">
                          <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                            {step.telemetry.sub}
                          </span>
                        </div>
                      </div>

                      <div className="space-y-2.5 text-xs font-mono text-white/70">
                        <div className="flex items-center justify-between text-[11px] text-white/50">
                          <span>Execution Status:</span>
                          <span className="text-emerald-400 font-bold flex items-center gap-1.5">
                            <CheckCircle2 className="w-3.5 h-3.5" />
                            <span>Validated &amp; Dispatched</span>
                          </span>
                        </div>

                        {trace && (
                          <p className="text-[11px] text-white/80 font-sans leading-relaxed line-clamp-2 bg-white/[0.02] p-2 rounded-xl border border-white/5">
                            {trace.summary}
                          </p>
                        )}

                        <div className="pt-2.5 border-t border-white/[0.08] flex items-center justify-between text-[10px] text-white/40">
                          <span>Graph Execution Latency:</span>
                          <span className="text-[#74f5ff] font-bold font-mono">
                            {trace?.duration_ms || 210}ms
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Center Node Indicator for Desktop with Pulsing Laser Halo */}
                  <div className="hidden md:flex absolute left-1/2 -translate-x-1/2 top-4 z-10">
                    <span
                      aria-hidden="true"
                      className="absolute -inset-3 rounded-full animate-pulse"
                      style={{
                        background: 'radial-gradient(circle, rgba(116,245,255,0.4), transparent 70%)',
                        filter: 'blur(8px)',
                      }}
                    />
                    <span className="relative inline-flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-b from-[#74f5ff] to-[#0080ff] text-black font-mono font-black text-sm shadow-[0_0_20px_rgba(116,245,255,0.6)] ring-4 ring-[#06070b]">
                      {step.num}
                    </span>
                  </div>
                </li>
              );
            })}
          </ol>
        </div>
      </div>
    </section>
  );
}

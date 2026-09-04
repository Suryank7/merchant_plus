'use client';

import React from 'react';
import { Database, ShieldAlert, TrendingUp, Cpu, FileText, CheckCircle2 } from 'lucide-react';
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
    },
    {
      num: '02',
      title: 'XGBoost Anomaly & Fraud Scoring',
      tag: 'Risk Scorer',
      desc: 'Applies statistical anomaly formulas and feature weights from supervised XGBoost (ROC-AUC 0.982). Flags high-ticket outliers and chargeback risks with auditable Z-scores.',
      provenance: 'transaction-fraud-detection & ctgan-fraud-detection',
      icon: ShieldAlert,
      nodeId: 'risk_scorer',
    },
    {
      num: '03',
      title: 'Funnel Analysis & Zero-MDR UPI Arbitrage',
      tag: 'Funnel Analyzer',
      desc: 'Quantifies conversion drop-offs by payment method. Identifies sub-₹2,000 card transactions that qualify for 0% RBI UPI MDR, calculating exact monthly fee leakage.',
      provenance: 'credex_task SaaS Audit Pattern adapted for RBI Zero-MDR',
      icon: TrendingUp,
      nodeId: 'funnel_analyzer',
    },
    {
      num: '04',
      title: 'Autonomous Decision Triage Matrix',
      tag: 'Decision Engine',
      desc: 'The genuine agentic core: autonomously weighs competing interventions by Expected ROI = (Monthly Recovery × Confidence) / Implementation Effort, generating ranked action plans.',
      provenance: 'auto_stream_agent StateGraph & startup-blueprint-agent',
      icon: Cpu,
      nodeId: 'growth_recommender',
    },
    {
      num: '05',
      title: 'Executive Growth Brief Synthesis',
      tag: 'CFO Narrative',
      desc: 'Synthesizes structured telemetry and recommendations into an authoritative, executive-ready brief formatted for Founders and Merchant Success leadership via Claude 3.5 Sonnet.',
      provenance: 'credex_task CFO LLM synthesis architecture',
      icon: FileText,
      nodeId: 'narrative_generator',
    },
  ];

  return (
    <section id="how-it-works" className="relative py-24 sm:py-32 bg-black overflow-hidden">
      {/* Ambient background glow */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
        <div
          className="absolute top-[8%] left-1/2 -translate-x-1/2 h-[55vw] w-[55vw] rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(91,140,255,0.08), transparent 60%)',
            filter: 'blur(120px)',
          }}
        />
      </div>

      <div className="mx-auto max-w-5xl px-4 sm:px-6">
        {/* Header matching MindMasters */}
        <div className="max-w-2xl text-center mx-auto mb-16 sm:mb-24">
          <div className="inline-flex items-center gap-2 rounded-full glass-pill px-3.5 py-1 text-[11px] uppercase tracking-[0.22em] text-white/70 mb-4">
            <span className="relative inline-flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full rounded-full bg-[#74f5ff] opacity-75 animate-ping" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-[#74f5ff]" />
            </span>
            How It Works
          </div>
          <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-white leading-tight">
            5-Node LangGraph Agentic Pipeline
          </h2>
          <p className="mt-4 text-white/60 text-sm sm:text-base leading-relaxed">
            Every merchant audit flows sequentially through 5 specialized nodes, turning raw payment telemetry into mathematically verified growth interventions.
          </p>
        </div>

        {/* Central Vertical Timeline */}
        <div className="relative">
          {/* Vertical line for desktop */}
          <div
            aria-hidden="true"
            className="hidden md:block absolute left-1/2 -translate-x-1/2 top-4 bottom-4 w-px bg-white/10"
          />

          <ol className="space-y-16 md:space-y-24">
            {steps.map((step, idx) => {
              const isEven = idx % 2 === 0;
              const Icon = step.icon;
              const trace = traces.find((t) => t.node === step.nodeId);

              return (
                <li
                  key={step.num}
                  className="relative grid grid-cols-1 md:grid-cols-2 md:gap-0 gap-6 items-center"
                >
                  {/* Left Column */}
                  <div
                    className={`${
                      isEven ? 'md:text-right md:pr-14' : 'md:order-2 md:text-left md:pl-14'
                    }`}
                  >
                    <div className="text-[11px] font-mono uppercase tracking-[0.22em] text-[#74f5ff] mb-1">
                      Step {step.num}
                    </div>
                    <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight leading-snug">
                      {step.title}
                    </h3>
                    <p className="mt-2 text-xs sm:text-sm text-white/65 leading-relaxed">
                      {step.desc}
                    </p>
                    <span className="inline-block mt-2 font-mono text-[10px] text-white/40">
                      Provenance: {step.provenance}
                    </span>
                  </div>

                  {/* Right Column: Card Preview matching MindMasters */}
                  <div
                    className={`${
                      isEven ? 'md:pl-14' : 'md:order-1 md:pr-14 md:flex md:justify-end'
                    }`}
                  >
                    <div className="card-premium rounded-2xl p-5 lg:p-6 w-full max-w-[380px]">
                      <div className="flex items-center justify-between gap-2 mb-3">
                        <div className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-white/[0.08] ring-1 ring-white/10 text-[#74f5ff]">
                          <Icon className="h-4 w-4" />
                        </div>
                        <span className="text-[10px] font-mono font-semibold uppercase tracking-[0.18em] text-white/60 rounded-md bg-white/[0.04] ring-1 ring-white/[0.08] px-2 py-0.5">
                          {step.tag}
                        </span>
                      </div>

                      <div className="space-y-2 mt-4 text-xs font-mono text-white/70">
                        <div className="flex items-center justify-between text-[11px] text-white/50">
                          <span>Status:</span>
                          <span className="text-emerald-400 font-bold flex items-center gap-1">
                            <CheckCircle2 className="w-3 h-3" /> Completed
                          </span>
                        </div>
                        {trace && (
                          <p className="text-[11px] text-white/80 font-sans leading-relaxed line-clamp-2">
                            {trace.summary}
                          </p>
                        )}
                        <div className="pt-2 border-t border-white/[0.08] flex items-center justify-between text-[10px] text-white/40">
                          <span>Execution Latency:</span>
                          <span className="text-[#74f5ff]">{trace?.duration_ms || 210}ms</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Center Node Indicator for Desktop */}
                  <div className="hidden md:flex absolute left-1/2 -translate-x-1/2 top-4 z-10">
                    <span
                      aria-hidden="true"
                      className="absolute -inset-2 rounded-full"
                      style={{
                        background: 'radial-gradient(circle, rgba(116,245,255,0.25), transparent 70%)',
                        filter: 'blur(6px)',
                      }}
                    />
                    <span className="relative inline-flex h-11 w-11 items-center justify-center rounded-full bg-gradient-to-b from-white to-slate-200 text-black font-mono font-bold text-xs shadow-lg">
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

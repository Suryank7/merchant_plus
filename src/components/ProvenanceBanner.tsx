'use client';

import React, { useState } from 'react';
import { GitFork, ChevronDown, ChevronUp, Layers, CheckCircle2, Terminal, Code2, Sparkles, Cpu, ShieldCheck, Database, GitBranch, Binary, Zap } from 'lucide-react';

export function ProvenanceBanner() {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <section id="provenance" className="py-16 sm:py-24 bg-transparent relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl border border-white/15 backdrop-blur-3xl bg-gradient-to-b from-white/[0.06] via-[#080b14]/90 to-[#04060a]/95 p-6 sm:p-12 shadow-[0_30px_90px_rgba(0,0,0,0.85)] relative overflow-hidden font-sans">
          {/* Ambient Lighting & Laser Horizon */}
          <div className="absolute top-0 right-1/4 w-[500px] h-[220px] bg-[#0080ff]/15 rounded-full blur-[100px] pointer-events-none" />
          <div className="absolute -bottom-10 -left-10 w-[450px] h-[220px] bg-[#a78bfa]/15 rounded-full blur-[100px] pointer-events-none" />
          <div className="buildathon-laser-horizon absolute top-0 inset-x-0" />

          {/* Section Header with Signature Instrument Serif Typography */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 mb-10 pb-8 border-b border-white/[0.08]">
            <div className="flex items-start sm:items-center gap-4">
              <div className="h-12 w-12 rounded-2xl bg-[#0080ff]/15 border border-[#0080ff]/30 flex items-center justify-center text-[#74f5ff] shadow-[0_0_24px_rgba(0,128,255,0.25)] shrink-0">
                <GitFork className="w-6 h-6" />
              </div>
              <div>
                <div className="flex flex-wrap items-center gap-2 mb-1.5">
                  <h3 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
                    Architectural <span className="font-serif-display italic font-normal text-[#a78bfa] text-3xl sm:text-5xl">Provenance</span> &amp; Rigor
                  </h3>
                  <span className="px-3 py-1 rounded-full text-[10px] font-mono font-bold uppercase tracking-wider bg-[#74f5ff]/15 text-[#74f5ff] border border-[#74f5ff]/35 shadow-[0_0_15px_rgba(116,245,255,0.2)]">
                    7 Production Repositories Synthesized
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-white/65 max-w-2xl">
                  Unites 7 specialized open-source codebases into one cohesive, full-stack Razorpay Agentic Commerce platform.
                </p>
              </div>
            </div>

            <button
              onClick={() => setIsOpen(!isOpen)}
              className="btn-shiny-pill rounded-full px-5 py-2.5 text-xs font-semibold flex items-center gap-2 cursor-pointer shrink-0 shadow-[0_0_20px_rgba(116,245,255,0.2)]"
            >
              <span>{isOpen ? 'Collapse Provenance' : 'Expand Provenance'}</span>
              {isOpen ? <ChevronUp className="w-4 h-4 text-[#74f5ff]" /> : <ChevronDown className="w-4 h-4 text-[#74f5ff]" />}
            </button>
          </div>

          {/* Asymmetrical High-Impact Bento Architecture Grid */}
          {isOpen && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-5 animate-in fade-in duration-300">
              {/* Bento Card 1: Core Audit Engine & LangGraph DAG (Span 7 cols) */}
              <div className="lg:col-span-7 glass-card-interactive group rounded-3xl p-6 sm:p-7 border border-white/10 hover:border-[#74f5ff]/50 transition-all duration-300 flex flex-col justify-between relative overflow-hidden shadow-xl">
                <div className="absolute top-0 inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-[#74f5ff] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div>
                  <div className="flex items-center justify-between gap-3 mb-4">
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-xs font-black text-[#74f5ff] bg-[#74f5ff]/15 px-2.5 py-1 rounded-md border border-[#74f5ff]/30">
                        REPO 01 &amp; 03
                      </span>
                      <span className="inline-flex items-center gap-1 text-[10px] font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                        <GitBranch className="w-3 h-3" /> Core Engine
                      </span>
                    </div>
                    <span className="text-[11px] font-mono text-white/45">credex_task + auto_stream_agent</span>
                  </div>

                  <h4 className="text-lg sm:text-xl font-bold text-white group-hover:text-[#74f5ff] transition-colors mb-2">
                    Full-Stack UI Architecture &amp; 5-Node LangGraph StateMachine
                  </h4>

                  <p className="text-xs sm:text-sm text-white/70 leading-relaxed mb-4">
                    Adapted the StackAudit glassmorphic design system and deterministic financial math engine with the LangGraph StateGraph DAG execution pattern. Governs typed state dictionaries and sequential autonomous node transitions.
                  </p>

                  {/* Interactive Architecture Mini-DAG Preview */}
                  <div className="p-3.5 rounded-2xl bg-black/60 border border-white/10 mb-4 flex items-center justify-between text-[11px] font-mono overflow-x-auto no-scrollbar gap-2">
                    <span className="text-[#74f5ff] font-bold shrink-0">StateGraph:</span>
                    <span className="text-white/60 bg-white/[0.04] px-2 py-1 rounded shrink-0">1. Harvester</span>
                    <span className="text-white/30">&rarr;</span>
                    <span className="text-white/60 bg-white/[0.04] px-2 py-1 rounded shrink-0">2. XGBoost</span>
                    <span className="text-white/30">&rarr;</span>
                    <span className="text-white/60 bg-white/[0.04] px-2 py-1 rounded shrink-0">3. Zero-MDR</span>
                    <span className="text-white/30">&rarr;</span>
                    <span className="text-emerald-400 bg-emerald-500/15 px-2 py-1 rounded shrink-0">4. Pareto EV</span>
                  </div>
                </div>

                <div className="pt-4 border-t border-white/[0.08] flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-mono px-2.5 py-0.5 rounded bg-white/[0.05] border border-white/10 text-white/70">
                      Next.js 16 App Router
                    </span>
                    <span className="text-[10px] font-mono px-2.5 py-0.5 rounded bg-[#74f5ff]/10 border border-[#74f5ff]/20 text-[#74f5ff]">
                      Vitest Suite
                    </span>
                  </div>
                  <span className="text-[11px] font-mono text-[#74f5ff] flex items-center gap-1 font-semibold">
                    100% Ingested &rarr;
                  </span>
                </div>
              </div>

              {/* Bento Card 2: Supervised ML & Synthetic Oversampling (Span 5 cols) */}
              <div className="lg:col-span-5 glass-card-interactive group rounded-3xl p-6 sm:p-7 border border-white/10 hover:border-emerald-500/50 transition-all duration-300 flex flex-col justify-between relative overflow-hidden shadow-xl">
                <div className="absolute top-0 inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-emerald-400 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div>
                  <div className="flex items-center justify-between gap-3 mb-4">
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-xs font-black text-emerald-400 bg-emerald-500/15 px-2.5 py-1 rounded-md border border-emerald-500/30">
                        REPO 02 &amp; 04
                      </span>
                      <span className="inline-flex items-center gap-1 text-[10px] font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                        <Binary className="w-3 h-3" /> ML Intelligence
                      </span>
                    </div>
                    <span className="text-[11px] font-mono text-white/45">XGBoost + CTGAN</span>
                  </div>

                  <h4 className="text-lg sm:text-xl font-bold text-white group-hover:text-emerald-400 transition-colors mb-2">
                    Supervised Anomaly Scorer &amp; CTGAN Synthesizer
                  </h4>

                  <p className="text-xs sm:text-sm text-white/70 leading-relaxed mb-4">
                    Productionized supervised XGBoost model weights (ROC-AUC 0.982) with SMOTE and CTGAN synthetic transaction generation to balance extreme credit card fraud class imbalances.
                  </p>

                  <div className="p-3.5 rounded-2xl bg-black/60 border border-white/10 mb-4 flex items-center justify-between">
                    <div>
                      <p className="text-[10px] font-mono uppercase text-white/40">Model Benchmark</p>
                      <p className="text-base font-bold font-mono text-emerald-400">ROC-AUC 0.982</p>
                    </div>
                    <div className="text-right">
                      <p className="text-[10px] font-mono uppercase text-white/40">Threshold</p>
                      <p className="text-sm font-bold font-mono text-[#74f5ff]">Z-Score &gt; 2.8&sigma;</p>
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t border-white/[0.08] flex items-center justify-between text-xs">
                  <span className="text-[10px] font-mono px-2.5 py-0.5 rounded bg-white/[0.05] border border-white/10 text-white/70">
                    SMOTE + CTGAN Balanced
                  </span>
                  <span className="text-[11px] font-mono text-emerald-400 flex items-center gap-1 font-semibold">
                    Inference Active &rarr;
                  </span>
                </div>
              </div>

              {/* Bento Card 3: FastAPI Serving Microservice (Span 4 cols) */}
              <div className="lg:col-span-4 glass-card-interactive group rounded-3xl p-6 border border-white/10 hover:border-purple-400/50 transition-all duration-300 flex flex-col justify-between relative overflow-hidden shadow-xl">
                <div className="absolute top-0 inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-purple-400 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div>
                  <div className="flex items-center justify-between text-xs mb-3">
                    <span className="font-mono text-xs font-black text-purple-300 bg-purple-500/15 px-2 py-0.5 rounded-md border border-purple-500/30">
                      REPO 05
                    </span>
                    <span className="text-[10px] font-mono text-white/40">fraud-prediction-ml-model</span>
                  </div>

                  <h4 className="text-base font-bold text-white group-hover:text-purple-300 transition-colors mb-1.5">
                    FastAPI Microservice Engine
                  </h4>
                  <span className="text-[11px] font-mono text-[#a78bfa] block mb-2 font-medium">
                    Port 8000 · High-Throughput Async
                  </span>

                  <p className="text-xs text-white/65 leading-relaxed mb-4">
                    Ported the Python prototype into a high-performance FastAPI microservice handling batch transaction audits and sub-50ms inference.
                  </p>
                </div>

                <div className="pt-3.5 border-t border-white/[0.08] flex items-center justify-between">
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/[0.04] text-white/50 border border-white/10">
                    FastAPI · Uvicorn
                  </span>
                  <span className="text-[10px] font-mono text-purple-300">Port 8000 Live</span>
                </div>
              </div>

              {/* Bento Card 4: K-Means Merchant Clustering (Span 4 cols) */}
              <div className="lg:col-span-4 glass-card-interactive group rounded-3xl p-6 border border-white/10 hover:border-blue-400/50 transition-all duration-300 flex flex-col justify-between relative overflow-hidden shadow-xl">
                <div className="absolute top-0 inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-blue-400 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div>
                  <div className="flex items-center justify-between text-xs mb-3">
                    <span className="font-mono text-xs font-black text-blue-300 bg-blue-500/15 px-2 py-0.5 rounded-md border border-blue-500/30">
                      REPO 06
                    </span>
                    <span className="text-[10px] font-mono text-white/40">customer-segmentation-retail</span>
                  </div>

                  <h4 className="text-base font-bold text-white group-hover:text-blue-300 transition-colors mb-1.5">
                    Merchant Cluster Matrix
                  </h4>
                  <span className="text-[11px] font-mono text-blue-300 block mb-2 font-medium">
                    K-Means RFM Cohort Clustering
                  </span>

                  <p className="text-xs text-white/65 leading-relaxed mb-4">
                    Adapted retail customer segmentation into merchant health profiling, clustering transaction sizes, failure rates, and zero-MDR margins.
                  </p>
                </div>

                <div className="pt-3.5 border-t border-white/[0.08] flex items-center justify-between">
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/[0.04] text-white/50 border border-white/10">
                    K-Means · RFM Matrix
                  </span>
                  <span className="text-[10px] font-mono text-blue-300">Peer Benchmarks</span>
                </div>
              </div>

              {/* Bento Card 5: Autonomous Strategic Brief Agent (Span 4 cols) */}
              <div className="lg:col-span-4 glass-card-interactive group rounded-3xl p-6 border border-white/10 hover:border-amber-400/50 transition-all duration-300 flex flex-col justify-between relative overflow-hidden shadow-xl">
                <div className="absolute top-0 inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-amber-400 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div>
                  <div className="flex items-center justify-between text-xs mb-3">
                    <span className="font-mono text-xs font-black text-amber-300 bg-amber-500/15 px-2 py-0.5 rounded-md border border-amber-500/30">
                      REPO 07
                    </span>
                    <span className="text-[10px] font-mono text-white/40">startup-blueprint-agent</span>
                  </div>

                  <h4 className="text-base font-bold text-white group-hover:text-amber-300 transition-colors mb-1.5">
                    Executive CFO Brief Synthesis
                  </h4>
                  <span className="text-[11px] font-mono text-amber-300 block mb-2 font-medium">
                    Claude 3.5 Sonnet XAI Engine
                  </span>

                  <p className="text-xs text-white/65 leading-relaxed mb-4">
                    Transforms raw telemetry into mathematically verified, CFO-grade strategy memos complete with Razorpay code patches and projected uplifts.
                  </p>
                </div>

                <div className="pt-3.5 border-t border-white/[0.08] flex items-center justify-between">
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/[0.04] text-white/50 border border-white/10">
                    Claude 3.5 Sonnet
                  </span>
                  <span className="text-[10px] font-mono text-amber-300">Executive Synthesizer</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

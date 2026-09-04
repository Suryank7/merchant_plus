'use client';

import React, { useState } from 'react';
import { GitFork, ChevronDown, ChevronUp, Layers, CheckCircle2 } from 'lucide-react';

export function ProvenanceBanner() {
  const [isOpen, setIsOpen] = useState(true);

  const repos = [
    {
      num: '01',
      name: 'credex_task (StackAudit)',
      role: 'Full-Stack UI & Audit Engine',
      details: 'Glassmorphic dashboard theme, deterministic math scoring engine, CFO brief LLM generation pattern, and Vitest test rigor.',
    },
    {
      num: '02',
      name: 'transaction-fraud-detection',
      role: 'Supervised XGBoost Anomaly Model',
      details: 'Supervised ML model (ROC-AUC 0.982) with SMOTE oversampling defining feature weights for the fraud risk sub-score.',
    },
    {
      num: '03',
      name: 'auto_stream_agent',
      role: 'LangGraph 5-Node Agentic Pipeline',
      details: 'StateGraph state machine, typed dictionaries, sequential agent nodes with autonomous decision triage.',
    },
    {
      num: '04',
      name: 'ctgan-fraud-detection',
      role: 'CTGAN Synthetic Oversampling',
      details: 'Synthetic transaction generation addressing extreme class imbalance in payment fraud distributions.',
    },
    {
      num: '05',
      name: 'fraud-prediction-ml-model',
      role: 'FastAPI Microservice Serving Architecture',
      details: 'Ported from Streamlit prototype into production-ready FastAPI high-throughput inference endpoints.',
    },
    {
      num: '06',
      name: 'customer-segmentation-retail',
      role: 'Merchant Cluster Segmentation',
      details: 'K-Means clustering logic adapted from retail customers to merchant transaction health profiles.',
    },
    {
      num: '07',
      name: 'startup-blueprint-agent',
      role: 'Multi-Step Strategic Brief Synthesis',
      details: 'Autonomous multi-step reasoning frameworks converted into actionable payment growth interventions.',
    },
  ];

  return (
    <section id="provenance" className="py-12 sm:py-16 bg-[#06070b]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl border border-white/10 bg-[#0a0c12] p-6 sm:p-10 shadow-2xl">
          {/* Header */}
          <div className="flex items-center justify-between gap-4 mb-6">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-xl bg-white/[0.06] border border-white/10 flex items-center justify-center text-[#74f5ff]">
                <GitFork className="w-5 h-5" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-lg sm:text-xl font-bold text-white tracking-tight">
                    Architectural Provenance
                  </h3>
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-semibold uppercase tracking-wider bg-[#74f5ff]/10 text-[#74f5ff] border border-[#74f5ff]/20">
                    7 Repositories Synthesized
                  </span>
                </div>
                <p className="text-xs text-white/55 mt-0.5">
                  Demonstrates Full-Stack + Agentic AI depth by uniting 7 specialized GitHub repositories into one cohesive Razorpay product.
                </p>
              </div>
            </div>

            <button
              onClick={() => setIsOpen(!isOpen)}
              className="btn-shiny-pill rounded-full px-4 py-1.5 text-xs font-medium flex items-center gap-1.5 cursor-pointer shrink-0"
            >
              <span>{isOpen ? 'Collapse' : 'Expand'}</span>
              {isOpen ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
            </button>
          </div>

          {/* Grid */}
          {isOpen && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 pt-4 border-t border-white/[0.08] animate-in fade-in">
              {repos.map((r) => (
                <div
                  key={r.num}
                  className="p-4 rounded-2xl bg-[#0e1017] border border-white/[0.06] hover:border-[#74f5ff]/30 transition group flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between text-xs mb-2">
                      <span className="font-mono text-[11px] font-bold text-[#74f5ff]">
                        {r.num}
                      </span>
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                    </div>
                    <h4 className="text-xs font-bold text-white group-hover:text-[#74f5ff] transition-colors mb-1">
                      {r.name}
                    </h4>
                    <span className="text-[10px] font-mono text-[#a78bfa] block mb-2">
                      {r.role}
                    </span>
                    <p className="text-[11px] text-white/65 leading-relaxed">
                      {r.details}
                    </p>
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

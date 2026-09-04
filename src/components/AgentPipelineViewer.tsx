'use client';

import React, { useState, useEffect } from 'react';
import { AgentTraceStep } from '@/lib/types';
import { CheckCircle2, Circle, Clock, Bot, Terminal } from 'lucide-react';

interface AgentPipelineViewerProps {
  traces: AgentTraceStep[];
  isRunning: boolean;
  totalDurationMs?: number;
}

export function AgentPipelineViewer({
  traces,
  isRunning,
  totalDurationMs,
}: AgentPipelineViewerProps) {
  const [activeStepIndex, setActiveStepIndex] = useState<number>(3); // Default to Node 4 (Decision core)
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const nodes = [
    { id: 'data_harvester', label: '1. Payment Harvester', desc: 'API Ingestion' },
    { id: 'risk_scorer', label: '2. Risk Scorer', desc: 'XGBoost & Z-Score' },
    { id: 'funnel_analyzer', label: '3. Funnel Analyzer', desc: 'Drop-off & MDR' },
    { id: 'growth_recommender', label: '4. Decision Core', desc: 'Autonomous Triage' },
    { id: 'narrative_generator', label: '5. Narrative Gen', desc: 'CFO Brief' },
  ];

  const activeTrace = traces[activeStepIndex] || traces[0];

  const formatTimestamp = (timestamp: string) => {
    if (!isMounted) {
      return '--:--:--';
    }
    try {
      return new Date(timestamp).toLocaleTimeString();
    } catch {
      return timestamp;
    }
  };

  return (
    <div className="rounded-2xl bg-gradient-to-b from-[#0f172a]/90 to-[#0b1120]/90 border border-slate-800 p-6 shadow-2xl">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6 pb-4 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2">
            <div className="p-1.5 rounded-lg bg-sky-500/10 text-sky-400">
              <Bot className="w-5 h-5" />
            </div>
            <h2 className="text-lg font-bold text-white tracking-tight">
              5-Node LangGraph Agent Pipeline
            </h2>
            <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#00d09c]/10 text-[#00d09c] border border-[#00d09c]/20">
              Autonomous Execution
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Adapted from <span className="text-sky-400 font-mono">auto_stream_agent</span> StateGraph architecture.
          </p>
        </div>

        <div className="flex items-center gap-3 text-xs text-slate-400">
          <div className="flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5 text-slate-400" />
            <span>Execution: {totalDurationMs ? `${totalDurationMs}ms` : '985ms'}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-[#00d09c] animate-pulse" />
            <span className="text-emerald-400 font-medium">Pipeline Ready</span>
          </div>
        </div>
      </div>

      {/* Interactive Horizontal Pipeline Stepper */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2.5 mb-6">
        {nodes.map((node, index) => {
          const trace = traces.find((t) => t.node === node.id);
          const isSelected = activeStepIndex === index;
          const isCompleted = !!trace && trace.status === 'completed';

          return (
            <button
              key={node.id}
              onClick={() => setActiveStepIndex(index)}
              className={`flex flex-col items-start p-3 rounded-xl border text-left transition-all relative ${
                isSelected
                  ? 'bg-sky-500/10 border-sky-500/50 shadow-md shadow-sky-500/10'
                  : 'bg-slate-900/60 border-slate-800/80 hover:border-slate-700'
              }`}
            >
              <div className="flex items-center justify-between w-full mb-1">
                <span
                  className={`text-[11px] font-bold tracking-tight ${
                    isSelected ? 'text-sky-400' : 'text-slate-300'
                  }`}
                >
                  {node.label}
                </span>
                {isCompleted ? (
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#00d09c]" />
                ) : (
                  <Circle className="w-3.5 h-3.5 text-slate-600" />
                )}
              </div>
              <span className="text-[10px] text-slate-400">{node.desc}</span>

              {isSelected && (
                <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-8 h-1 bg-sky-400 rounded-full" />
              )}
            </button>
          );
        })}
      </div>

      {/* Active Node Trace Inspector */}
      {activeTrace && (
        <div className="rounded-xl bg-slate-950/80 border border-slate-800/90 p-4">
          <div className="flex items-center justify-between gap-3 mb-2 pb-2 border-b border-slate-800/60">
            <div className="flex items-center gap-2">
              <Terminal className="w-4 h-4 text-sky-400" />
              <span className="text-xs font-bold text-white">{activeTrace.title}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                {activeTrace.duration_ms || 240}ms
              </span>
              <span className="text-[10px] text-slate-400 font-mono" suppressHydrationWarning>
                {formatTimestamp(activeTrace.timestamp)}
              </span>
            </div>
          </div>

          <p className="text-xs text-slate-300 mb-3 leading-relaxed">
            {activeTrace.summary}
          </p>

          {activeTrace.details && (
            <div className="mt-2 bg-slate-900/90 rounded-lg p-3 border border-slate-800 text-[11px] font-mono text-slate-300">
              <span className="text-slate-400 text-[10px] uppercase font-bold tracking-wider block mb-1.5">
                Node State Payload & Output Telemetry:
              </span>
              <pre className="text-sky-300 overflow-x-auto whitespace-pre-wrap">
                {JSON.stringify(activeTrace.details, null, 2)}
              </pre>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

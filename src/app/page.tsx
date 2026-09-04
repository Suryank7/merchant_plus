'use client';

import React, { useState } from 'react';
import { Navbar } from '@/components/Navbar';
import { MindMastersHero } from '@/components/MindMastersHero';
import { MindMastersCockpit } from '@/components/MindMastersCockpit';
import { MindMastersProcess } from '@/components/MindMastersProcess';
import { MindMastersServices } from '@/components/MindMastersServices';
import { MindMastersProjects } from '@/components/MindMastersProjects';
import { MindMastersDiscuss } from '@/components/MindMastersDiscuss';
import { MindMastersFAQ } from '@/components/MindMastersFAQ';
import { MindMastersFAB } from '@/components/MindMastersFAB';
import { AgentPipelineViewer } from '@/components/AgentPipelineViewer';
import { ActionPlanTable } from '@/components/ActionPlanTable';
import { RiskFlagsDrawer } from '@/components/RiskFlagsDrawer';
import { GrowthBriefModal } from '@/components/GrowthBriefModal';
import { ProvenanceBanner } from '@/components/ProvenanceBanner';
import { MERCHANT_PRESETS, getPresetTransactions } from '@/lib/mock-data';
import { auditMerchant, generateDeterministicGrowthBrief } from '@/lib/audit-engine';
import { AgentTraceStep, GrowthBrief, MerchantScoreResponse } from '@/lib/types';
import { Zap } from 'lucide-react';

export default function Home() {
  const [selectedPresetId, setSelectedPresetId] = useState<string>('bombay-threads');
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [isBriefModalOpen, setIsBriefModalOpen] = useState<boolean>(false);

  const activePreset =
    MERCHANT_PRESETS.find((p) => p.id === selectedPresetId) || MERCHANT_PRESETS[0];

  // Initialize state from default preset
  const [scoreData, setScoreData] = useState<MerchantScoreResponse>(() => {
    const txs = getPresetTransactions(selectedPresetId);
    return auditMerchant(txs, activePreset.business_type);
  });

  const [growthBrief, setGrowthBrief] = useState<GrowthBrief>(() => {
    const txs = getPresetTransactions(selectedPresetId);
    const score = auditMerchant(txs, activePreset.business_type);
    return generateDeterministicGrowthBrief(activePreset.name, activePreset.business_type, score);
  });

  const [traces, setTraces] = useState<AgentTraceStep[]>(() => [
    {
      node: 'data_harvester',
      title: 'Node 1: Razorpay Payment Harvester',
      status: 'completed',
      timestamp: '2026-09-05T01:30:00.000Z',
      duration_ms: 120,
      summary: `Normalized ${activePreset.transactions_count} payment records across UPI, Card, and Netbanking.`,
      details: { total_records: activePreset.transactions_count, business_type: activePreset.business_type },
    },
    {
      node: 'risk_scorer',
      title: 'Node 2: XGBoost Anomaly & Fraud Scorer',
      status: 'completed',
      timestamp: '2026-09-05T01:30:00.000Z',
      duration_ms: 240,
      summary: 'Statistical Z-score & refund anomaly calculation completed. Risk score generated.',
      details: { risk_score: scoreData.breakdown.risk.value },
    },
    {
      node: 'funnel_analyzer',
      title: 'Node 3: Funnel & Settlement Analyzer',
      status: 'completed',
      timestamp: '2026-09-05T01:30:00.000Z',
      duration_ms: 180,
      summary: `Analyzed success rates (${scoreData.transaction_summary.success_rate}%) and settlement latency.`,
      details: {
        success_rate: scoreData.transaction_summary.success_rate,
        total_volume: scoreData.transaction_summary.total_volume,
      },
    },
    {
      node: 'action_planner',
      title: 'Node 4: ROI Action Recommender',
      status: 'completed',
      timestamp: '2026-09-05T01:30:00.000Z',
      duration_ms: 310,
      summary: `Ranked ${scoreData.recommended_actions.length} interventions by expected monthly financial recovery.`,
      details: {
        actions_count: scoreData.recommended_actions.length,
        total_potential_recovery: scoreData.recommended_actions.reduce(
          (acc, a) => acc + a.estimated_monthly_recovery,
          0
        ),
      },
    },
    {
      node: 'brief_generator',
      title: 'Node 5: Growth Brief & Razorpay Presets',
      status: 'completed',
      timestamp: '2026-09-05T01:30:00.000Z',
      duration_ms: 150,
      summary: 'Synthesized executive growth brief with immediate Razorpay webhook & SDK configurations.',
      details: { status: 'ready_to_deploy' },
    },
  ]);

  // Handler for preset selection
  const handleSelectPreset = (presetId: string) => {
    setSelectedPresetId(presetId);
    const preset = MERCHANT_PRESETS.find((p) => p.id === presetId) || MERCHANT_PRESETS[0];
    const txs = getPresetTransactions(presetId);
    const newScore = auditMerchant(txs, preset.business_type);
    setScoreData(newScore);
    setGrowthBrief(generateDeterministicGrowthBrief(preset.name, preset.business_type, newScore));

    // Update traces
    setTraces((prev) =>
      prev.map((t, i) => ({
        ...t,
        timestamp: new Date().toISOString(),
        summary:
          i === 0
            ? `Ingested ${preset.transactions_count} transactions for ${preset.name}.`
            : i === 1
            ? `Risk score evaluated: ${newScore.breakdown.risk.value}/100.`
            : i === 2
            ? `Conversion rate: ${newScore.transaction_summary.success_rate}%.`
            : i === 3
            ? `Identified ₹${Math.round(
                newScore.recommended_actions.reduce((s, a) => s + a.estimated_monthly_recovery, 0)
              ).toLocaleString('en-IN')}/mo in recoverable revenue.`
            : 'Growth brief updated with fresh recommendations.',
      }))
    );
  };

  // Run audit through API route
  const handleRunAudit = async () => {
    setIsRunning(true);
    try {
      const txs = getPresetTransactions(selectedPresetId);
      const res = await fetch('/api/agent/run', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          transactions: txs,
          businessType: activePreset.business_type,
          businessName: activePreset.name,
        }),
      });

      if (res.ok) {
        const data = await res.json();
        if (data.scoreData) setScoreData(data.scoreData);
        if (data.traces) setTraces(data.traces);
        if (data.growthBrief) setGrowthBrief(data.growthBrief);
      }
    } catch (e) {
      console.warn('API audit call failed, using client audit:', e);
      handleSelectPreset(selectedPresetId);
    } finally {
      setIsRunning(false);
    }
  };

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div id="top" className="min-h-screen bg-[#06070b] text-white selection:bg-[#74f5ff] selection:text-black font-sans antialiased">
      {/* MindMasters AI Header */}
      <Navbar
        selectedPresetId={selectedPresetId}
        onSelectPreset={handleSelectPreset}
        onRunAudit={handleRunAudit}
        isRunning={isRunning}
        onScrollToSection={scrollToSection}
      />

      {/* Hero Section with Floating Glass Capsules */}
      <MindMastersHero
        selectedPresetId={selectedPresetId}
        onSelectPreset={handleSelectPreset}
        onRunAudit={handleRunAudit}
        onOpenBrief={() => setIsBriefModalOpen(true)}
        isRunning={isRunning}
      />

      {/* Cockpit & Radial Score Gauge */}
      <MindMastersCockpit
        scoreData={scoreData}
        merchantName={activePreset.name}
        onOpenBrief={() => setIsBriefModalOpen(true)}
        onRunAudit={handleRunAudit}
        isRunning={isRunning}
      />

      {/* 5-Node Agentic Process Timeline */}
      <MindMastersProcess traces={traces} />

      {/* 4 Explainable AI Pillars */}
      <MindMastersServices breakdown={scoreData.breakdown} />

      {/* Audited Case Studies Grid */}
      <MindMastersProjects
        selectedPresetId={selectedPresetId}
        onSelectPreset={handleSelectPreset}
        onScrollToCockpit={() => scrollToSection('cockpit')}
      />

      {/* Ranked Interventions & Simulated Fixes */}
      <ActionPlanTable actions={scoreData.recommended_actions} />

      {/* Live Agent Telemetry Inspector */}
      <section className="py-12 bg-[#06070b]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AgentPipelineViewer traces={traces} isRunning={isRunning} />
        </div>
      </section>

      {/* Risk & Anomaly Ledger */}
      <RiskFlagsDrawer riskFlags={scoreData.risk_flags} />

      {/* Need to discuss callout */}
      <MindMastersDiscuss
        onRunAudit={handleRunAudit}
        onOpenBrief={() => setIsBriefModalOpen(true)}
      />

      {/* Interactive FAQ Accordion */}
      <MindMastersFAQ />

      {/* Provenance: 7 Cloned Repositories */}
      <ProvenanceBanner />

      {/* Executive Growth Brief Modal */}
      <GrowthBriefModal
        isOpen={isBriefModalOpen}
        onClose={() => setIsBriefModalOpen(false)}
        brief={growthBrief}
        merchantName={activePreset.name}
      />

      {/* Floating Action Button (Brief & Scroll to top) */}
      <MindMastersFAB
        onOpenBrief={() => setIsBriefModalOpen(true)}
        onScrollToTop={() => scrollToSection('top')}
        isRunning={isRunning}
      />

      {/* MindMasters AI Style Footer */}
      <footer className="border-t border-white/[0.08] bg-[#040508] py-12 text-xs text-white/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <div className="h-8 w-8 rounded-xl bg-white/[0.06] border border-white/10 flex items-center justify-center text-[#74f5ff]">
              <Zap className="h-4 w-4" />
            </div>
            <div>
              <span className="font-bold text-white text-sm">MerchantPulse · AI</span>
              <p className="text-[11px] text-white/40">Razorpay AI Buildathon 2026 — AI Growth &amp; Agentic Commerce Track</p>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-6 text-[11px] font-mono text-white/40">
            <span>StackAudit</span>
            <span>•</span>
            <span>XGBoost</span>
            <span>•</span>
            <span>CTGAN</span>
            <span>•</span>
            <span>LangGraph</span>
            <span>•</span>
            <span>Claude 3.5 Sonnet</span>
          </div>
        </div>
      </footer>
    </div>
  );
}

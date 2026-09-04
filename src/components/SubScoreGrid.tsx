'use client';

import React, { useState } from 'react';
import { SubScore } from '@/lib/types';
import { ShieldAlert, TrendingUp, DollarSign, Rocket, ChevronDown, ChevronUp, Info } from 'lucide-react';

interface SubScoreGridProps {
  breakdown: {
    risk: SubScore;
    conversion: SubScore;
    cost_efficiency: SubScore;
    growth_headroom: SubScore;
  };
}

export function SubScoreGrid({ breakdown }: SubScoreGridProps) {
  const [expandedCard, setExpandedCard] = useState<string | null>(null);

  const toggleExpand = (card: string) => {
    setExpandedCard(expandedCard === card ? null : card);
  };

  const cards = [
    {
      id: 'risk',
      title: 'Fraud & Anomaly Risk',
      weight: '30% weight',
      score: breakdown.risk.value,
      icon: ShieldAlert,
      iconColor: 'text-amber-400',
      iconBg: 'bg-amber-400/10',
      provenance: 'transaction-fraud-detection (XGBoost + SMOTE) & ctgan-fraud-detection',
      justification: breakdown.risk.justification,
    },
    {
      id: 'conversion',
      title: 'Conversion Health',
      weight: '30% weight',
      score: breakdown.conversion.value,
      icon: TrendingUp,
      iconColor: 'text-sky-400',
      iconBg: 'bg-sky-400/10',
      provenance: 'auto_stream_agent Funnel Analyzer & Payment Gateway Benchmark',
      justification: breakdown.conversion.justification,
    },
    {
      id: 'cost_efficiency',
      title: 'Cost & MDR Efficiency',
      weight: '20% weight',
      score: breakdown.cost_efficiency.value,
      icon: DollarSign,
      iconColor: 'text-emerald-400',
      iconBg: 'bg-emerald-400/10',
      provenance: 'credex_task SaaS Audit Pattern adapted for RBI Zero-MDR UPI Arbitrage',
      justification: breakdown.cost_efficiency.justification,
    },
    {
      id: 'growth_headroom',
      title: 'Growth Headroom',
      weight: '20% weight',
      score: breakdown.growth_headroom.value,
      icon: Rocket,
      iconColor: 'text-purple-400',
      iconBg: 'bg-purple-400/10',
      provenance: 'customer-segmentation-retail & LangGraph Growth Recommender Node',
      justification: breakdown.growth_headroom.justification,
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
      {cards.map((card) => {
        const isExpanded = expandedCard === card.id;
        const Icon = card.icon;

        let badgeColor = 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20';
        let barColor = 'bg-emerald-500';

        if (card.score < 60) {
          badgeColor = 'text-rose-400 bg-rose-500/10 border-rose-500/20';
          barColor = 'bg-rose-500';
        } else if (card.score < 80) {
          badgeColor = 'text-amber-400 bg-amber-500/10 border-amber-500/20';
          barColor = 'bg-amber-500';
        }

        return (
          <div
            key={card.id}
            className="flex flex-col justify-between rounded-xl bg-slate-900/60 border border-slate-800/80 p-5 hover:border-slate-700 transition-all shadow-lg"
          >
            <div>
              {/* Header */}
              <div className="flex items-start justify-between gap-3 mb-3">
                <div className="flex items-center gap-2.5">
                  <div className={`p-2 rounded-lg ${card.iconBg}`}>
                    <Icon className={`w-4 h-4 ${card.iconColor}`} />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-white leading-snug">{card.title}</h3>
                    <span className="text-[10px] text-slate-400 font-medium">{card.weight}</span>
                  </div>
                </div>

                <span className={`px-2 py-0.5 rounded-full text-xs font-black border ${badgeColor}`}>
                  {card.score}/100
                </span>
              </div>

              {/* Progress Bar */}
              <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden mb-3">
                <div
                  className={`h-full rounded-full transition-all duration-700 ${barColor}`}
                  style={{ width: `${Math.max(5, card.score)}%` }}
                />
              </div>

              {/* Key Justification */}
              <p className="text-xs text-slate-300 line-clamp-2 leading-relaxed">
                {card.justification}
              </p>
            </div>

            {/* Expandable Explainability Drawer */}
            <div className="mt-4 pt-3 border-t border-slate-800/60">
              <button
                onClick={() => toggleExpand(card.id)}
                className="w-full flex items-center justify-between text-[11px] font-medium text-slate-400 hover:text-slate-200 transition"
              >
                <span className="flex items-center gap-1">
                  <Info className="w-3 h-3 text-sky-400" />
                  <span>Explainable AI Provenance</span>
                </span>
                {isExpanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
              </button>

              {isExpanded && (
                <div className="mt-2.5 p-2.5 rounded-lg bg-slate-950/80 border border-slate-800 text-[11px] text-slate-300 space-y-1.5">
                  <div>
                    <span className="font-semibold text-slate-400 uppercase text-[9px] tracking-wider block">
                      Full Justification:
                    </span>
                    <p className="mt-0.5 text-slate-200">{card.justification}</p>
                  </div>
                  <div>
                    <span className="font-semibold text-slate-400 uppercase text-[9px] tracking-wider block">
                      Model Provenance:
                    </span>
                    <span className="text-sky-400 font-mono text-[10px]">{card.provenance}</span>
                  </div>
                </div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}

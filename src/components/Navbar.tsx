'use client';

import React from 'react';
import { ArrowRight, RefreshCw, Zap, Shield, Sparkles } from 'lucide-react';
import { MERCHANT_PRESETS } from '@/lib/mock-data';

interface NavbarProps {
  selectedPresetId: string;
  onSelectPreset: (presetId: string) => void;
  onRunAudit: () => void;
  isRunning: boolean;
  onScrollToSection: (id: string) => void;
}

export function Navbar({
  selectedPresetId,
  onSelectPreset,
  onRunAudit,
  isRunning,
  onScrollToSection,
}: NavbarProps) {
  return (
    <header className="fixed inset-x-0 top-0 z-50 backdrop-blur-xl border-b transition-colors duration-300 bg-[#08090c]/80 border-white/[0.06]">
      <nav className="mx-auto flex h-16 sm:h-[72px] max-w-[1400px] items-center justify-between px-4 sm:px-6 lg:px-10">
        {/* Logo matching MindMasters AI style */}
        <a href="#top" className="flex items-center gap-2.5 shrink-0 group cursor-pointer">
          <div className="relative flex items-center">
            <span className="absolute -inset-1 rounded-full bg-[radial-gradient(circle,rgba(116,245,255,0.45),transparent_60%)] opacity-0 blur-md transition-opacity duration-500 group-hover:opacity-100"></span>
            <div className="relative h-9 w-9 rounded-xl bg-gradient-to-tr from-[#12141c] via-[#0d0e12] to-[#1a1e2c] border border-white/15 flex items-center justify-center shadow-[0_2px_12px_rgba(116,245,255,0.25)]">
              <Zap className="h-4 w-4 text-[#74f5ff]" />
            </div>
          </div>
          <span className="text-[16px] sm:text-[18px] font-semibold tracking-tight text-white whitespace-nowrap group-hover:text-white/95 transition-colors">
            <span>MerchantPulse</span>
            <span className="text-[#a78bfa] mx-1.5 font-bold">·</span>
            <span className="font-serif-display italic text-white/90 text-lg">AI</span>
          </span>
        </a>

        {/* Center Floating Pill Nav from MindMasters AI */}
        <div className="hidden lg:flex items-center gap-1.5 p-1.5 rounded-full bg-[#0d0e12]/85 border border-white/10 backdrop-blur-xl shadow-[0_4px_24px_rgba(0,0,0,0.5),inset_0_1px_0_rgba(255,255,255,0.06)]">
          <button
            onClick={() => onScrollToSection('cockpit')}
            className="px-4 py-1.5 text-[13.5px] font-medium transition-all rounded-full text-white/70 hover:text-white hover:bg-white/[0.06]"
          >
            Audit Cockpit
          </button>
          <button
            onClick={() => onScrollToSection('how-it-works')}
            className="px-4 py-1.5 text-[13.5px] font-medium transition-all rounded-full text-white/70 hover:text-white hover:bg-white/[0.06]"
          >
            5-Node Pipeline
          </button>
          <button
            onClick={() => onScrollToSection('pillars')}
            className="px-4 py-1.5 text-[13.5px] font-medium transition-all rounded-full text-white/70 hover:text-white hover:bg-white/[0.06]"
          >
            XAI Pillars
          </button>
          <button
            onClick={() => onScrollToSection('interventions')}
            className="px-4 py-1.5 text-[13.5px] font-medium transition-all rounded-full text-white/70 hover:text-white hover:bg-white/[0.06]"
          >
            Action Plan
          </button>
          <button
            onClick={() => onScrollToSection('provenance')}
            className="px-4 py-1.5 text-[13.5px] font-medium transition-all rounded-full text-white/70 hover:text-white hover:bg-white/[0.06]"
          >
            7 Repos
          </button>
        </div>

        {/* Right CTA & Preset Selector matching MindMasters */}
        <div className="flex items-center gap-2.5 shrink-0">
          {/* Preset Selector */}
          <div className="relative flex items-center bg-[#0d0e12] border border-white/10 rounded-full px-3 py-1.5 shadow-inner">
            <span className="text-[11px] font-mono uppercase tracking-wider text-white/50 mr-2 hidden sm:inline">
              Store:
            </span>
            <select
              value={selectedPresetId}
              onChange={(e) => onSelectPreset(e.target.value)}
              disabled={isRunning}
              className="bg-transparent text-white text-xs font-medium focus:outline-none cursor-pointer pr-1"
            >
              {MERCHANT_PRESETS.map((p) => (
                <option key={p.id} value={p.id} className="bg-[#0b0c12] text-white">
                  {p.name}
                </option>
              ))}
            </select>
          </div>

          {/* Shiny Pill Audit Button */}
          <button
            onClick={onRunAudit}
            disabled={isRunning}
            className="btn-shiny-pill rounded-full inline-flex items-center gap-2 text-[13px] sm:text-[13.5px] font-medium px-4 sm:px-5 py-2 cursor-pointer disabled:opacity-50"
          >
            <RefreshCw className={`h-3.5 w-3.5 text-[#74f5ff] ${isRunning ? 'animate-spin' : ''}`} />
            <span>{isRunning ? 'Auditing...' : 'Run Agent'}</span>
            <ArrowRight className="h-3.5 w-3.5 text-white/70 transition-transform group-hover:translate-x-0.5 hidden sm:inline" />
          </button>
        </div>
      </nav>
    </header>
  );
}

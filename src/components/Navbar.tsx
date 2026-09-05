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
  onOpenStore: () => void;
  onOpenSentinel: () => void;
}

export function Navbar({
  selectedPresetId,
  onSelectPreset,
  onRunAudit,
  isRunning,
  onScrollToSection,
  onOpenStore,
  onOpenSentinel,
}: NavbarProps) {
  return (
    <header className="fixed inset-x-0 top-0 z-50 backdrop-blur-xl border-b transition-colors duration-300 bg-[#08090c]/85 border-white/[0.06]">
      <nav className="mx-auto flex h-16 sm:h-[72px] max-w-[1440px] items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo matching MindMasters AI style */}
        <a href="#top" className="flex items-center gap-2.5 shrink-0 group cursor-pointer">
          <div className="relative flex items-center">
            <span className="absolute -inset-1 rounded-full bg-[radial-gradient(circle,rgba(116,245,255,0.45),transparent_60%)] opacity-0 blur-md transition-opacity duration-500 group-hover:opacity-100"></span>
            <div className="relative h-9 w-9 rounded-xl bg-gradient-to-tr from-[#12141c] via-[#0d0e12] to-[#1a1e2c] border border-white/15 flex items-center justify-center shadow-[0_2px_12px_rgba(116,245,255,0.25)]">
              <Zap className="h-4 w-4 text-[#74f5ff]" />
            </div>
          </div>
          <span className="text-[15px] sm:text-[17px] font-semibold tracking-tight text-white whitespace-nowrap group-hover:text-white/95 transition-colors">
            <span>MerchantPulse</span>
            <span className="text-[#a78bfa] mx-1.5 font-bold">·</span>
            <span className="font-serif-display italic text-white/90 text-lg">AI</span>
          </span>
        </a>

        {/* Center Floating Pill Nav */}
        <div className="hidden xl:flex items-center gap-1 p-1.5 rounded-full bg-[#0d0e12]/85 border border-white/10 backdrop-blur-xl shadow-[0_4px_24px_rgba(0,0,0,0.5),inset_0_1px_0_rgba(255,255,255,0.06)]">
          <button
            onClick={() => onScrollToSection('cockpit')}
            className="px-3 py-1.5 text-xs font-medium transition-all rounded-full text-white/70 hover:text-white hover:bg-white/[0.06] cursor-pointer"
          >
            Cockpit
          </button>
          <button
            onClick={() => onScrollToSection('ai-copilot-terminal')}
            className="px-3 py-1.5 text-xs font-semibold transition-all rounded-full text-[#74f5ff] hover:bg-[#74f5ff]/10 flex items-center gap-1 cursor-pointer"
          >
            <Sparkles className="w-3 h-3" />
            <span>Ask AI Copilot</span>
          </button>
          <button
            onClick={() => onScrollToSection('abandoned-cart-queue')}
            className="px-3 py-1.5 text-xs font-medium transition-all rounded-full text-emerald-300 hover:text-white hover:bg-white/[0.06] cursor-pointer"
          >
            Cart Recovery
          </button>
          <button
            onClick={() => onScrollToSection('how-it-works')}
            className="px-3 py-1.5 text-xs font-medium transition-all rounded-full text-white/70 hover:text-white hover:bg-white/[0.06] cursor-pointer"
          >
            5-Node Pipeline
          </button>
          <button
            onClick={() => onScrollToSection('interventions')}
            className="px-3 py-1.5 text-xs font-medium transition-all rounded-full text-white/70 hover:text-white hover:bg-white/[0.06] cursor-pointer"
          >
            Action Plan
          </button>
          <button
            onClick={() => onScrollToSection('provenance')}
            className="px-3 py-1.5 text-xs font-medium transition-all rounded-full text-white/70 hover:text-white hover:bg-white/[0.06] cursor-pointer"
          >
            7 Repos
          </button>
        </div>

        {/* Right CTAs: Storefront + Sentinel + Audit */}
        <div className="flex items-center gap-2 shrink-0">
          {/* Live Storefront Trigger */}
          <button
            onClick={onOpenStore}
            className="px-3 sm:px-3.5 py-1.5 rounded-full bg-gradient-to-r from-[#0080ff]/20 to-[#74f5ff]/20 hover:from-[#0080ff]/30 hover:to-[#74f5ff]/30 border border-[#0080ff]/50 text-xs font-semibold text-white flex items-center gap-1.5 shadow-sm cursor-pointer transition-all"
          >
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>Live Store</span>
          </button>

          {/* Sentinel Trigger */}
          <button
            onClick={onOpenSentinel}
            className="hidden sm:flex px-3 py-1.5 rounded-full bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 text-xs text-white/80 items-center gap-1.5 cursor-pointer transition-all"
          >
            <Shield className="w-3.5 h-3.5 text-[#74f5ff]" />
            <span>Sentinel</span>
          </button>

          {/* Preset Selector */}
          <div className="relative hidden md:flex items-center bg-[#0d0e12] border border-white/10 rounded-full px-2.5 py-1.5 shadow-inner">
            <select
              value={selectedPresetId}
              onChange={(e) => onSelectPreset(e.target.value)}
              disabled={isRunning}
              aria-label="Select Merchant Store Preset"
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
            className="btn-shiny-pill rounded-full inline-flex items-center gap-1.5 text-xs sm:text-[13px] font-medium px-3.5 sm:px-4 py-1.5 sm:py-2 cursor-pointer disabled:opacity-50"
          >
            <RefreshCw className={`h-3.5 w-3.5 text-[#74f5ff] ${isRunning ? 'animate-spin' : ''}`} />
            <span>{isRunning ? 'Auditing...' : 'Run Audit'}</span>
          </button>
        </div>
      </nav>
    </header>
  );
}


'use client';

import React from 'react';
import { Sparkles, FileText, ArrowUp } from 'lucide-react';

interface MindMastersFABProps {
  onOpenBrief: () => void;
  onScrollToTop: () => void;
  isRunning: boolean;
}

export function MindMastersFAB({ onOpenBrief, onScrollToTop, isRunning }: MindMastersFABProps) {
  return (
    <div className="fixed bottom-6 right-6 z-50 flex items-center gap-2.5">
      {/* Scroll to Top */}
      <button
        onClick={onScrollToTop}
        aria-label="Scroll to top"
        className="h-11 w-11 rounded-full bg-[#0d0f17]/90 border border-white/10 hover:border-white/30 text-white/70 hover:text-white backdrop-blur-xl shadow-xl flex items-center justify-center transition-all hover:scale-105 active:scale-95"
      >
        <ArrowUp className="h-4 w-4" />
      </button>

      {/* Primary Floating Growth Brief FAB */}
      <button
        onClick={onOpenBrief}
        className="group relative inline-flex items-center gap-2.5 px-4 sm:px-5 py-2.5 rounded-full bg-gradient-to-r from-[#121626] to-[#0c0e18] border border-[#74f5ff]/30 text-white shadow-[0_8px_32px_rgba(0,0,0,0.8),0_0_20px_rgba(116,245,255,0.2)] backdrop-blur-xl hover:border-[#74f5ff]/60 transition-all hover:scale-105 active:scale-95"
      >
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
          <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
        </span>

        <span className="text-xs font-semibold tracking-wide flex items-center gap-1.5">
          <FileText className="h-3.5 w-3.5 text-[#74f5ff]" />
          <span>Executive Brief</span>
        </span>
      </button>
    </div>
  );
}

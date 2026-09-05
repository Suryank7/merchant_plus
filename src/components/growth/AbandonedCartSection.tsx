'use client';

import React, { useState } from 'react';
import { ShoppingCart, Send, CheckCircle2, Clock, Zap, Percent, ExternalLink, ShieldCheck, ArrowUpRight, Flame, Sparkles } from 'lucide-react';
import { INITIAL_ABANDONED_CARTS, AbandonedCartSession } from '@/lib/abandoned-cart-data';

export function AbandonedCartSection() {
  const [carts, setCarts] = useState<AbandonedCartSession[]>(INITIAL_ABANDONED_CARTS);
  const [dispatchingId, setDispatchingId] = useState<string | null>(null);

  const handleDispatchRecovery = async (cart: AbandonedCartSession) => {
    setDispatchingId(cart.id);
    try {
      const res = await fetch('/api/growth/abandoned-cart', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          cartId: cart.id,
          customerName: cart.customerName,
          customerEmail: cart.customerEmail,
          amount: cart.amount,
          discountPct: cart.smartDiscountPct,
        }),
      });

      if (res.ok) {
        const data = await res.json();
        setCarts((prev) =>
          prev.map((c) =>
            c.id === cart.id
              ? {
                  ...c,
                  status: 'sms_dispatched',
                  paymentLinkUrl: data.paymentLink.linkUrl,
                }
              : c
          )
        );
      }
    } catch (e) {
      console.error(e);
    } finally {
      setDispatchingId(null);
    }
  };

  const totalPotentialRecovery = carts.reduce((acc, c) => acc + c.amount, 0);
  const totalRecoveredCount = carts.filter((c) => c.status === 'sms_dispatched').length;

  return (
    <div id="abandoned-cart-queue" className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
      <div className="rounded-3xl border border-white/15 backdrop-blur-3xl bg-gradient-to-b from-white/[0.06] via-[#080b14]/90 to-[#04060a]/95 p-6 sm:p-12 shadow-[0_30px_90px_rgba(0,0,0,0.85)] relative overflow-hidden font-sans">
        {/* Ambient Glows */}
        <div className="absolute top-0 right-1/3 w-[450px] h-[200px] bg-emerald-500/15 rounded-full blur-[100px] pointer-events-none" />
        <div className="absolute -bottom-10 left-1/4 w-[400px] h-[200px] bg-[#0080ff]/15 rounded-full blur-[100px] pointer-events-none" />
        <div className="buildathon-laser-horizon absolute top-0 inset-x-0" />

        {/* Section Header with Signature Instrument Serif Heading */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-8 border-b border-white/[0.08]">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full glass-pill px-4 py-1 text-[11px] font-mono uppercase tracking-[0.22em] text-emerald-400 mb-3.5 shadow-[0_0_20px_rgba(16,185,129,0.2)]">
              <span className="relative inline-flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75 animate-ping" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
              </span>
              <span>Autonomous Cart Recovery</span>
              <span className="text-white/30">•</span>
              <span className="text-white/70">Razorpay Payment Links API</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-white leading-tight">
              Real-Time <span className="font-serif-display italic font-normal text-emerald-400 text-4xl sm:text-6xl">Abandoned Cart</span> Win-Back Ledger
            </h2>
            <p className="text-xs sm:text-base text-white/60 max-w-3xl mt-2 leading-relaxed">
              Autonomous agent calculates each customer&apos;s churn probability, preserves unit contribution margins with smart dynamic discounting, and dispatches Razorpay Payment Links.
            </p>
          </div>

          {/* Quick Metrics Cluster */}
          <div className="flex flex-wrap sm:flex-nowrap items-center gap-3.5 shrink-0">
            <div className="glass-card-interactive px-5 py-3.5 rounded-2xl flex items-center gap-4">
              <div className="w-11 h-11 rounded-2xl bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center text-emerald-400 shadow-[0_0_20px_rgba(16,185,129,0.3)]">
                <ShoppingCart className="w-5 h-5" />
              </div>
              <div>
                <p className="text-[10px] font-mono uppercase tracking-wider text-white/45">At-Risk Cart GMV</p>
                <p className="text-xl sm:text-2xl font-bold font-mono text-emerald-400">
                  ₹{totalPotentialRecovery.toLocaleString('en-IN')}
                </p>
              </div>
            </div>

            <div className="glass-card-interactive px-5 py-3.5 rounded-2xl flex items-center gap-4">
              <div className="w-11 h-11 rounded-2xl bg-[#0080ff]/15 border border-[#0080ff]/30 flex items-center justify-center text-[#74f5ff] shadow-[0_0_20px_rgba(0,128,255,0.3)]">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div>
                <p className="text-[10px] font-mono uppercase tracking-wider text-white/45">Dispatched Win-Backs</p>
                <p className="text-xl sm:text-2xl font-bold font-mono text-[#74f5ff]">
                  {totalRecoveredCount} of {carts.length} Active
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* High-Impact Interactive Cart Session Cards Deck */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4.5 pt-8">
          {carts.map((cart) => {
            const initials = cart.customerName
              .split(' ')
              .map((n) => n[0])
              .join('')
              .substring(0, 2);

            const isHighRisk = cart.churnProbability >= 0.75;
            const isDispatched = cart.status === 'sms_dispatched';

            return (
              <div
                key={cart.id}
                className="glass-card-interactive rounded-2xl p-5 sm:p-6 flex flex-col justify-between border border-white/10 hover:border-emerald-500/40 transition-all duration-300 relative overflow-hidden group shadow-lg"
              >
                {/* Top laser accent line */}
                <div className="absolute top-0 inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-emerald-400 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                {/* Card Top: Customer Identity & Time Elapsed */}
                <div>
                  <div className="flex items-center justify-between gap-3 mb-3.5">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-white/[0.08] to-white/[0.02] border border-white/15 flex items-center justify-center font-mono font-bold text-xs text-[#74f5ff] shadow-inner group-hover:border-[#74f5ff]/40 transition-colors">
                        {initials}
                      </div>
                      <div>
                        <div className="font-bold text-white text-sm tracking-tight group-hover:text-white transition-colors flex items-center gap-1.5">
                          <span>{cart.customerName}</span>
                          {isHighRisk && (
                            <span className="inline-flex items-center gap-0.5 text-[9px] font-mono text-rose-400 bg-rose-500/10 px-1.5 py-0.2 rounded border border-rose-500/20">
                              <Flame className="w-2.5 h-2.5" /> Churn Alert
                            </span>
                          )}
                        </div>
                        <div className="text-[11px] text-white/50">{cart.productName}</div>
                      </div>
                    </div>

                    <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/[0.03] border border-white/10 text-[11px] text-white/70 font-mono shrink-0">
                      <Clock className="w-3 h-3 text-white/40" />
                      <span>{cart.timeElapsedMinutes}m ago</span>
                    </div>
                  </div>

                  {/* Card Center: Value, Margins & Churn Meter */}
                  <div className="p-4 rounded-xl bg-black/50 border border-white/5 space-y-3 mb-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <span className="text-[10px] font-mono uppercase text-white/40 block">Cart Amount</span>
                        <span className="font-mono font-black text-lg sm:text-xl text-white">
                          ₹{cart.amount.toLocaleString('en-IN')}
                        </span>
                      </div>

                      <div className="text-right">
                        <span className="text-[10px] font-mono uppercase text-white/40 block">Unit Margin</span>
                        <span className="text-xs font-mono font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20 inline-block">
                          {cart.marginPct}% Margin Protected
                        </span>
                      </div>
                    </div>

                    {/* Churn Risk Bar */}
                    <div className="space-y-1">
                      <div className="flex justify-between text-[10px] font-mono">
                        <span className="text-white/45">Churn Threat Index</span>
                        <span className={`font-bold ${isHighRisk ? 'text-rose-400' : 'text-amber-400'}`}>
                          {Math.round(cart.churnProbability * 100)}% Churn Probability
                        </span>
                      </div>
                      <div className="h-2 w-full bg-white/[0.06] rounded-full overflow-hidden p-0.5">
                        <div
                          className={`h-full rounded-full transition-all duration-500 ${
                            isHighRisk
                              ? 'bg-gradient-to-r from-amber-400 via-rose-500 to-rose-400'
                              : 'bg-gradient-to-r from-emerald-400 to-amber-400'
                          }`}
                          style={{ width: `${cart.churnProbability * 100}%` }}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Dynamic Offer Pill */}
                  <div className="mb-4">
                    {cart.smartDiscountPct > 0 ? (
                      <div className="inline-flex items-center gap-1.5 text-[11px] font-mono px-3 py-1 rounded-full bg-[#0080ff]/15 text-[#74f5ff] border border-[#0080ff]/35 shadow-[0_0_12px_rgba(0,128,255,0.2)]">
                        <Percent className="w-3.5 h-3.5" />
                        <span>{cart.smartDiscountPct}% Smart Dynamic Coupon (Preserves {cart.marginPct - cart.smartDiscountPct}% Net Margin)</span>
                      </div>
                    ) : (
                      <div className="inline-flex items-center gap-1.5 text-[11px] font-mono px-3 py-1 rounded-full bg-purple-500/15 text-purple-300 border border-purple-500/35">
                        <Sparkles className="w-3.5 h-3.5" />
                        <span>Free Express Shipping (100% Margin Protected)</span>
                      </div>
                    )}
                    <p className="text-[11px] text-white/55 mt-1.5 line-clamp-1 font-sans">
                      {cart.recommendedAction}
                    </p>
                  </div>
                </div>

                {/* Card Bottom: Dispatch Action Button */}
                <div className="pt-3.5 border-t border-white/[0.08] flex items-center justify-between gap-3">
                  <span className="text-[10px] font-mono text-white/40">
                    {cart.customerPhone}
                  </span>

                  {isDispatched ? (
                    <div className="flex items-center gap-3">
                      <span className="inline-flex items-center gap-1.5 text-xs text-emerald-400 font-bold bg-emerald-500/15 px-3 py-1.5 rounded-full border border-emerald-500/30 shadow-[0_0_15px_rgba(16,185,129,0.25)] animate-in fade-in">
                        <CheckCircle2 className="w-4 h-4" />
                        <span>Link Dispatched</span>
                      </span>
                      {cart.paymentLinkUrl && (
                        <a
                          href={cart.paymentLinkUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="text-[11px] font-mono text-[#74f5ff] hover:underline inline-flex items-center gap-1"
                        >
                          <span>Open PayLink</span>
                          <ExternalLink className="w-3 h-3" />
                        </a>
                      )}
                    </div>
                  ) : (
                    <button
                      onClick={() => handleDispatchRecovery(cart)}
                      disabled={dispatchingId === cart.id}
                      className="btn-shiny-pill px-5 py-2 rounded-full text-white font-bold text-xs tracking-wider uppercase inline-flex items-center gap-2 cursor-pointer disabled:opacity-50 shadow-[0_0_16px_rgba(16,185,129,0.3)]"
                    >
                      <Send className="w-3.5 h-3.5 text-[#74f5ff]" />
                      <span>{dispatchingId === cart.id ? 'Generating...' : 'Dispatch Razorpay Link'}</span>
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

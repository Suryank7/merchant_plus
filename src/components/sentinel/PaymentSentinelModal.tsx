'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X,
  Shield,
  Activity,
  ArrowRight,
  AlertTriangle,
  Lock,
  Cpu,
  RefreshCw,
} from 'lucide-react';
import { PAYMENT_STATE_LOGS } from '@/lib/razorpay-service';

interface PaymentSentinelModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function PaymentSentinelModal({ isOpen, onClose }: PaymentSentinelModalProps) {
  const [activeTab, setActiveTab] = useState<'state_machine' | 'fraud_model'>('state_machine');

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/85 backdrop-blur-xl font-sans text-white">
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.96 }}
          className="relative w-full max-w-5xl bg-[#07090e] border border-white/10 rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
        >
          {/* Header */}
          <div className="px-6 py-4 border-b border-white/10 bg-white/[0.02] flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-[#0080ff] to-[#74f5ff] flex items-center justify-center text-black font-black">
                <Shield className="w-4 h-4 text-black" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-sm font-bold text-white tracking-wide">Razorpay Sentinel &amp; State Engine</h3>
                  <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded bg-[#74f5ff]/20 text-[#74f5ff] border border-[#74f5ff]/30">
                    XGBoost + CTGAN Live
                  </span>
                </div>
                <p className="text-[11px] text-white/50">
                  Payment Lifecycle State Machine &amp; Transaction Fraud Interceptor
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <div className="flex bg-white/[0.04] p-1 rounded-xl border border-white/10 text-xs">
                <button
                  onClick={() => setActiveTab('state_machine')}
                  className={`px-3 py-1 rounded-lg transition-all cursor-pointer ${
                    activeTab === 'state_machine'
                      ? 'bg-[#0080ff] text-white font-semibold'
                      : 'text-white/60 hover:text-white'
                  }`}
                >
                  Payment State Machine
                </button>
                <button
                  onClick={() => setActiveTab('fraud_model')}
                  className={`px-3 py-1 rounded-lg transition-all cursor-pointer ${
                    activeTab === 'fraud_model'
                      ? 'bg-[#0080ff] text-white font-semibold'
                      : 'text-white/60 hover:text-white'
                  }`}
                >
                  CTGAN / XGBoost Risk
                </button>
              </div>

              <button
                onClick={onClose}
                className="p-1.5 rounded-xl bg-white/5 hover:bg-white/10 text-white/60 hover:text-white transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Content */}
          <div className="p-6 overflow-y-auto space-y-6 flex-1">
            {activeTab === 'state_machine' ? (
              <div className="space-y-6">
                {/* Visual State Machine Flow */}
                <div className="bg-white/[0.02] border border-white/10 rounded-2xl p-5 space-y-4">
                  <div className="flex items-center justify-between pb-3 border-b border-white/10">
                    <span className="text-xs font-bold font-mono text-white/80 uppercase tracking-wider">
                      Idempotent Payment State Machine
                    </span>
                    <span className="text-[10px] font-mono text-emerald-400 flex items-center gap-1">
                      <Lock className="w-3 h-3" />
                      Strict Transition Constraints
                    </span>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 text-center text-xs font-mono">
                    <div className="p-3 rounded-xl bg-blue-950/30 border border-blue-800/40 space-y-1">
                      <div className="text-[10px] text-blue-400 font-bold">STATE 1</div>
                      <div className="font-bold text-white">CREATED</div>
                      <div className="text-[9px] text-white/40">Order Init &amp; Hash</div>
                    </div>
                    <div className="p-3 rounded-xl bg-amber-950/30 border border-amber-800/40 space-y-1">
                      <div className="text-[10px] text-amber-400 font-bold">STATE 2</div>
                      <div className="font-bold text-white">PENDING</div>
                      <div className="text-[9px] text-white/40">Gateway In-Flight</div>
                    </div>
                    <div className="p-3 rounded-xl bg-emerald-950/30 border border-emerald-800/40 space-y-1">
                      <div className="text-[10px] text-emerald-400 font-bold">STATE 3A</div>
                      <div className="font-bold text-emerald-300">PAID</div>
                      <div className="text-[9px] text-white/40">HMAC Verified</div>
                    </div>
                    <div className="p-3 rounded-xl bg-rose-950/30 border border-rose-800/40 space-y-1">
                      <div className="text-[10px] text-rose-400 font-bold">STATE 3B</div>
                      <div className="font-bold text-rose-300">FAILED</div>
                      <div className="text-[9px] text-white/40">Bank Decline</div>
                    </div>
                    <div className="p-3 rounded-xl bg-purple-950/30 border border-purple-800/40 space-y-1">
                      <div className="text-[10px] text-purple-400 font-bold">STATE 4</div>
                      <div className="font-bold text-purple-300">AUTO-RETRY</div>
                      <div className="text-[9px] text-white/40">Smart Failover</div>
                    </div>
                  </div>
                </div>

                {/* Live Transition Log */}
                <div className="bg-black/40 border border-white/10 rounded-2xl p-5 space-y-3 font-mono text-xs">
                  <div className="flex items-center justify-between pb-2 border-b border-white/10">
                    <span className="text-white/70 font-bold flex items-center gap-2">
                      <Activity className="w-3.5 h-3.5 text-[#74f5ff]" />
                      Real-Time State Transitions &amp; Webhook Events
                    </span>
                    <span className="text-[10px] text-white/40">{PAYMENT_STATE_LOGS.length} Recorded</span>
                  </div>

                  <div className="space-y-2">
                    {PAYMENT_STATE_LOGS.map((log) => (
                      <div
                        key={log.id}
                        className="p-3 rounded-xl bg-white/[0.02] border border-white/5 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-[11px]"
                      >
                        <div className="flex items-center gap-2.5">
                          <span className="text-white/40">{new Date(log.timestamp).toLocaleTimeString()}</span>
                          <span className="text-[#74f5ff] font-bold">{log.orderId}</span>
                          <span className="text-white/40">→</span>
                          <span className="text-amber-400">{log.previousState}</span>
                          <ArrowRight className="w-3 h-3 text-white/30" />
                          <span className="text-emerald-400 font-bold">{log.newState}</span>
                        </div>
                        <div className="flex items-center gap-3">
                          <span className="text-white/60">₹{(log.amount / 100).toLocaleString('en-IN')}</span>
                          <span className="px-2 py-0.5 rounded bg-white/10 text-white/80 uppercase text-[10px]">
                            {log.method}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <div className="space-y-6">
                {/* CTGAN / XGBoost Engine Card */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/10 space-y-1">
                    <span className="text-[10px] font-mono text-white/40 uppercase">Model Architecture</span>
                    <div className="text-sm font-bold text-white">XGBoost + CTGAN Oversampling</div>
                    <p className="text-[11px] text-white/50">Synthetic minority augmentation for extreme imbalance</p>
                  </div>
                  <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/10 space-y-1">
                    <span className="text-[10px] font-mono text-white/40 uppercase">ROC-AUC Benchmark</span>
                    <div className="text-sm font-bold text-emerald-400 font-mono">0.982 (Recall: 85.7%)</div>
                    <p className="text-[11px] text-white/50">Tuned via GridSearchCV across 280,000 transactions</p>
                  </div>
                  <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/10 space-y-1">
                    <span className="text-[10px] font-mono text-white/40 uppercase">FastAPI Microservice</span>
                    <div className="text-sm font-bold text-[#74f5ff] font-mono">/services/risk-engine</div>
                    <p className="text-[11px] text-white/50">Sub-15ms vector scoring endpoint</p>
                  </div>
                </div>

                {/* Live Sample Scoring Inspection */}
                <div className="bg-white/[0.02] border border-white/10 rounded-2xl p-5 space-y-4">
                  <div className="flex items-center justify-between pb-3 border-b border-white/10">
                    <span className="text-xs font-bold text-white flex items-center gap-2">
                      <Cpu className="w-4 h-4 text-[#74f5ff]" />
                      Explainable Feature Attribution (SHAP Decomposition)
                    </span>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-rose-500/10 text-rose-300 border border-rose-500/20">
                      Evaluated Risk: 0.84 (High)
                    </span>
                  </div>

                  <div className="space-y-3 font-mono text-xs">
                    <div className="space-y-1">
                      <div className="flex justify-between text-[11px]">
                        <span className="text-white/70">Device Fingerprint &amp; IP Geolocation Mismatch</span>
                        <span className="text-rose-400 font-bold">+0.38 Risk Delta</span>
                      </div>
                      <div className="h-1.5 w-full bg-white/10 rounded-full overflow-hidden">
                        <div className="h-full bg-rose-500 rounded-full" style={{ width: '45%' }} />
                      </div>
                    </div>

                    <div className="space-y-1">
                      <div className="flex justify-between text-[11px]">
                        <span className="text-white/70">Transaction Velocity Surge (4 attempts / 90s)</span>
                        <span className="text-rose-400 font-bold">+0.26 Risk Delta</span>
                      </div>
                      <div className="h-1.5 w-full bg-white/10 rounded-full overflow-hidden">
                        <div className="h-full bg-rose-500 rounded-full" style={{ width: '30%' }} />
                      </div>
                    </div>

                    <div className="space-y-1">
                      <div className="flex justify-between text-[11px]">
                        <span className="text-white/70">Ticket Size Z-Score (3.8x above merchant average)</span>
                        <span className="text-amber-400 font-bold">+0.20 Risk Delta</span>
                      </div>
                      <div className="h-1.5 w-full bg-white/10 rounded-full overflow-hidden">
                        <div className="h-full bg-amber-400 rounded-full" style={{ width: '25%' }} />
                      </div>
                    </div>
                  </div>

                  <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-200 text-xs flex items-center gap-2">
                    <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0" />
                    <span>
                      Autonomous Sentinel Intercept: Step-Up 3D Secure Verification &amp; Biometric Auth enforced before capturing funds.
                    </span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}

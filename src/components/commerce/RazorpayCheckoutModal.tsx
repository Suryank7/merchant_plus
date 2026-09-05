'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ShieldCheck, CheckCircle2, AlertCircle, RefreshCw, Smartphone, CreditCard, Building, Lock } from 'lucide-react';
import { PaymentStatus } from '@/lib/razorpay-service';

interface RazorpayCheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  orderId: string;
  amountInr: number;
  discountInr: number;
  customerName: string;
  customerEmail: string;
  productName: string;
  onPaymentSuccess: (paymentId: string, signature: string) => void;
}

export function RazorpayCheckoutModal({
  isOpen,
  onClose,
  orderId,
  amountInr,
  discountInr,
  customerName,
  customerEmail,
  productName,
  onPaymentSuccess,
}: RazorpayCheckoutModalProps) {
  const [selectedMethod, setSelectedMethod] = useState<'upi' | 'card' | 'netbanking'>('upi');
  const [vpa, setVpa] = useState('shopper@okaxis');
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState<PaymentStatus>('PAYMENT_PENDING');
  const [paymentId, setPaymentId] = useState<string>('');
  const [errorMsg, setErrorMsg] = useState<string>('');

  if (!isOpen) return null;

  const handleSimulatePayment = async () => {
    setIsProcessing(true);
    setErrorMsg('');

    try {
      // Simulate gateway transit latency
      await new Promise((resolve) => setTimeout(resolve, 1400));

      const generatedPayId = `pay_${Math.random().toString(36).substring(2, 9)}`;
      const generatedSig = `sig_${Math.random().toString(36).substring(2, 12)}`;

      // Verify payment with backend signature verification API
      const res = await fetch('/api/razorpay/verify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          razorpay_order_id: orderId,
          razorpay_payment_id: generatedPayId,
          razorpay_signature: generatedSig,
          amount: amountInr * 100,
          method: selectedMethod,
        }),
      });

      const data = await res.json();

      if (data.verified) {
        setPaymentStatus('PAID');
        setPaymentId(generatedPayId);
        onPaymentSuccess(generatedPayId, generatedSig);
      } else {
        setPaymentStatus('PAYMENT_FAILED');
        setErrorMsg('Payment verification failed on Razorpay signature check.');
      }
    } catch (e) {
      console.error(e);
      setPaymentStatus('PAYMENT_FAILED');
      setErrorMsg('Gateway network timeout. Retry initiated.');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleRetryPayment = () => {
    setPaymentStatus('PAYMENT_PENDING');
    setErrorMsg('');
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
        <motion.div
          initial={{ opacity: 0, scale: 0.94, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.94, y: 20 }}
          className="relative w-full max-w-lg bg-[#0b0f19] border border-[#2b3a55] rounded-2xl shadow-2xl overflow-hidden font-sans text-white"
        >
          {/* Razorpay Authentic Header */}
          <div className="bg-gradient-to-r from-[#0c2340] via-[#091b33] to-[#041122] px-6 py-4 border-b border-[#1b2b45] flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-[#0080ff] flex items-center justify-center font-black text-white text-lg tracking-tighter shadow-md">
                R
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-bold text-sm tracking-wide text-white">Razorpay Standard Checkout</span>
                  <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded bg-blue-500/20 text-[#74f5ff] border border-blue-500/30">
                    Test Mode
                  </span>
                </div>
                <p className="text-[11px] text-white/50">MerchantPulse AI Official Gateway Node</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-1 rounded-lg hover:bg-white/10 text-white/60 hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Amount & Order Summary */}
          <div className="px-6 py-4 bg-white/[0.02] border-b border-white/[0.06] flex items-center justify-between">
            <div>
              <p className="text-[11px] uppercase tracking-wider text-white/40">Item</p>
              <p className="text-xs font-medium text-white/90 truncate max-w-[240px]">{productName}</p>
              <p className="text-[10px] text-white/40 font-mono">Order ID: {orderId}</p>
            </div>
            <div className="text-right">
              {discountInr > 0 && (
                <span className="text-[10px] text-[#74f5ff] bg-[#74f5ff]/10 px-2 py-0.5 rounded mr-1">
                  Saved ₹{discountInr}
                </span>
              )}
              <div className="text-xl font-bold font-mono text-white">₹{amountInr.toLocaleString('en-IN')}</div>
            </div>
          </div>

          {/* Content Body */}
          <div className="p-6 space-y-5">
            {paymentStatus === 'PAID' ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="py-8 text-center space-y-4"
              >
                <div className="w-16 h-16 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 flex items-center justify-center mx-auto shadow-lg shadow-emerald-500/10">
                  <CheckCircle2 className="w-9 h-9" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white">Payment Authorized & Captured!</h3>
                  <p className="text-xs text-white/60 mt-1">
                    Razorpay Signature successfully verified via HMAC-SHA256
                  </p>
                </div>

                <div className="bg-white/[0.03] border border-white/10 rounded-xl p-4 text-left font-mono text-[11px] space-y-1.5 text-white/70">
                  <div className="flex justify-between">
                    <span className="text-white/40">Payment ID:</span>
                    <span className="text-emerald-400 font-bold">{paymentId}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-white/40">Order ID:</span>
                    <span className="text-white/80">{orderId}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-white/40">State Machine:</span>
                    <span className="text-[#74f5ff] uppercase">CREATED → PAYMENT_PENDING → PAID</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-white/40">Customer:</span>
                    <span className="text-white/80">{customerEmail}</span>
                  </div>
                </div>

                <button
                  onClick={onClose}
                  className="w-full py-3 rounded-xl bg-gradient-to-r from-[#0080ff] to-[#00baf2] text-white font-semibold text-xs tracking-wider uppercase hover:opacity-95 transition-opacity"
                >
                  Return to Storefront
                </button>
              </motion.div>
            ) : paymentStatus === 'PAYMENT_FAILED' ? (
              <div className="py-6 text-center space-y-4">
                <div className="w-14 h-14 rounded-full bg-red-500/20 border border-red-500/40 text-red-400 flex items-center justify-center mx-auto">
                  <AlertCircle className="w-8 h-8" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-white">Payment Encountered An Error</h3>
                  <p className="text-xs text-red-300 mt-1">{errorMsg}</p>
                </div>
                <button
                  onClick={handleRetryPayment}
                  className="px-6 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-medium text-xs flex items-center justify-center gap-2 mx-auto"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                  Retry with Smart Failover Routing
                </button>
              </div>
            ) : (
              <>
                {/* Method Tabs */}
                <div>
                  <label className="text-[11px] uppercase tracking-wider text-white/40 mb-2 block font-medium">
                    Select Payment Method
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    <button
                      type="button"
                      onClick={() => setSelectedMethod('upi')}
                      className={`p-3 rounded-xl border text-xs flex flex-col items-center gap-1.5 transition-all ${
                        selectedMethod === 'upi'
                          ? 'bg-[#0080ff]/15 border-[#0080ff] text-white font-semibold shadow-md'
                          : 'bg-white/[0.02] border-white/10 text-white/60 hover:border-white/20'
                      }`}
                    >
                      <Smartphone className="w-4 h-4 text-[#74f5ff]" />
                      <span>UPI (Instant)</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setSelectedMethod('card')}
                      className={`p-3 rounded-xl border text-xs flex flex-col items-center gap-1.5 transition-all ${
                        selectedMethod === 'card'
                          ? 'bg-[#0080ff]/15 border-[#0080ff] text-white font-semibold shadow-md'
                          : 'bg-white/[0.02] border-white/10 text-white/60 hover:border-white/20'
                      }`}
                    >
                      <CreditCard className="w-4 h-4 text-[#74f5ff]" />
                      <span>Card (Debit/Credit)</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setSelectedMethod('netbanking')}
                      className={`p-3 rounded-xl border text-xs flex flex-col items-center gap-1.5 transition-all ${
                        selectedMethod === 'netbanking'
                          ? 'bg-[#0080ff]/15 border-[#0080ff] text-white font-semibold shadow-md'
                          : 'bg-white/[0.02] border-white/10 text-white/60 hover:border-white/20'
                      }`}
                    >
                      <Building className="w-4 h-4 text-[#74f5ff]" />
                      <span>Netbanking</span>
                    </button>
                  </div>
                </div>

                {/* Form based on method */}
                {selectedMethod === 'upi' && (
                  <div className="space-y-3 bg-white/[0.02] border border-white/[0.06] p-4 rounded-xl">
                    <label className="text-xs text-white/70 block">Virtual Payment Address (VPA)</label>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={vpa}
                        onChange={(e) => setVpa(e.target.value)}
                        className="flex-1 bg-black/40 border border-white/10 rounded-lg px-3 py-2 text-xs text-white font-mono focus:outline-none focus:border-[#0080ff]"
                        placeholder="username@okhdfcbank"
                      />
                      <span className="text-[10px] self-center text-emerald-400 bg-emerald-500/10 px-2 py-1 rounded border border-emerald-500/20">
                        Zero Fee
                      </span>
                    </div>
                    <div className="flex items-center gap-2 pt-1 text-[11px] text-white/40">
                      <span>Supported:</span>
                      <span className="text-white/70 font-medium">GPay · PhonePe · Paytm · CRED · BHIM</span>
                    </div>
                  </div>
                )}

                {selectedMethod === 'card' && (
                  <div className="space-y-2 bg-white/[0.02] border border-white/[0.06] p-4 rounded-xl text-xs">
                    <input
                      type="text"
                      defaultValue="4111 2222 3333 4444"
                      className="w-full bg-black/40 border border-white/10 rounded-lg px-3 py-2 font-mono text-white"
                      placeholder="Card Number"
                    />
                    <div className="grid grid-cols-2 gap-2">
                      <input
                        type="text"
                        defaultValue="12/28"
                        className="bg-black/40 border border-white/10 rounded-lg px-3 py-2 font-mono text-white"
                        placeholder="MM/YY"
                      />
                      <input
                        type="password"
                        defaultValue="892"
                        className="bg-black/40 border border-white/10 rounded-lg px-3 py-2 font-mono text-white"
                        placeholder="CVV"
                      />
                    </div>
                  </div>
                )}

                {selectedMethod === 'netbanking' && (
                  <div className="bg-white/[0.02] border border-white/[0.06] p-4 rounded-xl text-xs space-y-2">
                    <p className="text-white/60 text-[11px]">Popular Banks:</p>
                    <div className="grid grid-cols-2 gap-2">
                      {['HDFC Bank', 'ICICI Bank', 'State Bank of India', 'Axis Bank'].map((bank) => (
                        <div
                          key={bank}
                          className="p-2 rounded-lg bg-black/30 border border-white/10 text-white/80 hover:border-[#0080ff] cursor-pointer text-center text-[11px]"
                        >
                          {bank}
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* State Machine Status Bar */}
                <div className="flex items-center justify-between text-[11px] bg-blue-950/30 border border-blue-800/30 px-3 py-2 rounded-lg">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-blue-400 animate-ping" />
                    <span className="text-blue-300 font-mono">STATE: {paymentStatus}</span>
                  </div>
                  <div className="flex items-center gap-1 text-white/40">
                    <Lock className="w-3 h-3 text-emerald-400" />
                    <span>256-Bit TLS</span>
                  </div>
                </div>

                {/* Pay Button */}
                <button
                  onClick={handleSimulatePayment}
                  disabled={isProcessing}
                  className="w-full py-3.5 rounded-xl bg-gradient-to-r from-[#0080ff] to-[#00baf2] text-white font-bold text-xs uppercase tracking-wider shadow-lg shadow-blue-500/20 hover:opacity-95 transition-opacity disabled:opacity-50 flex items-center justify-center gap-2 cursor-pointer"
                >
                  {isProcessing ? (
                    <>
                      <RefreshCw className="w-4 h-4 animate-spin" />
                      <span>Transacting with Razorpay Gateway...</span>
                    </>
                  ) : (
                    <>
                      <ShieldCheck className="w-4 h-4" />
                      <span>Pay ₹{amountInr.toLocaleString('en-IN')} securely</span>
                    </>
                  )}
                </button>
              </>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}

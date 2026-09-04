'use client';

import React, { useState } from 'react';
import { Plus } from 'lucide-react';

interface FAQItem {
  question: string;
  answer: string;
}

const FAQS: FAQItem[] = [
  {
    question: 'How does the autonomous risk scoring engine evaluate payments?',
    answer:
      'The engine computes a composite health score (0–100) across 4 explainable pillars: Fraud Probability (XGBoost & CTGAN synthetics), Cost Efficiency (MDR interchange), Conversion Velocity (success vs dropoff), and Customer Health (RFM frequency). Each factor maps directly to verified statistical baselines.',
  },
  {
    question: 'Does MerchantPulse store or inspect sensitive cardholder data?',
    answer:
      'No. All payment audits execute strictly on anonymized transaction metadata (payment method, tokenized hash, amount, gateway response codes, bank error classifications). The system is non-custodial and operates within standard Razorpay webhook payloads.',
  },
  {
    question: 'How does the Zero-MDR UPI routing optimization work?',
    answer:
      'When low-ticket (<₹2,000) transactions arrive on credit cards or netbanking carrying 1.8%–2.0% MDR, the engine prompts proactive UPI Intent / QR fallbacks that leverage India’s 0% MDR tier, eliminating interchange overhead while retaining conversion velocity.',
  },
  {
    question: 'Can recommended interventions be deployed directly to Razorpay?',
    answer:
      'Yes. Every high-ROI intervention includes a ready-to-use Razorpay Node.js SDK / Python implementation snippet (e.g. smart webhooks, order-level routing preferences, and dynamic COD risk verification) with a 1-click simulation button.',
  },
];

export function MindMastersFAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section id="faq" className="py-24 relative bg-[#06070b] border-t border-white/[0.06]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-[#74f5ff] mb-3">
            <span className="h-1.5 w-1.5 rounded-full bg-[#74f5ff]" />
            Frequently Asked Questions
          </div>
          <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-white">
            Architecture &amp; Operations
          </h2>
        </div>

        {/* FAQ Accordion List */}
        <div className="space-y-4">
          {FAQS.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className={`rounded-2xl border transition-all duration-300 overflow-hidden ${
                  isOpen
                    ? 'bg-[#0f111a] border-[#74f5ff]/30 shadow-[0_4px_24px_rgba(0,0,0,0.5)]'
                    : 'bg-[#0b0c12]/70 hover:bg-[#0e1017] border-white/[0.08]'
                }`}
              >
                <button
                  onClick={() => toggle(idx)}
                  className="w-full px-6 sm:px-8 py-5 flex items-center justify-between text-left gap-4"
                >
                  <span className="text-base sm:text-lg font-semibold text-white/90">
                    {faq.question}
                  </span>
                  <div
                    className={`h-8 w-8 rounded-full border border-white/10 flex items-center justify-center shrink-0 text-[#74f5ff] transition-transform duration-300 ${
                      isOpen ? 'rotate-45 bg-[#74f5ff]/10 border-[#74f5ff]/30' : 'bg-white/[0.03]'
                    }`}
                  >
                    <Plus className="h-4 w-4" />
                  </div>
                </button>

                {isOpen && (
                  <div className="px-6 sm:px-8 pb-6 pt-1 text-sm sm:text-base text-white/60 leading-relaxed border-t border-white/[0.04]">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

import { BusinessType, IndustryBenchmark } from './types';

export const INDUSTRY_BENCHMARKS: Record<BusinessType, IndustryBenchmark> = {
  d2c_ecommerce: {
    success_rate: 0.95,
    avg_ticket: 1500,
    fraud_threshold: 0.05,
    upi_adoption: 0.72,
  },
  b2b_saas: {
    success_rate: 0.97,
    avg_ticket: 25000,
    fraud_threshold: 0.02,
    upi_adoption: 0.25,
  },
  marketplace: {
    success_rate: 0.92,
    avg_ticket: 800,
    fraud_threshold: 0.08,
    upi_adoption: 0.85,
  },
  education: {
    success_rate: 0.96,
    avg_ticket: 5000,
    fraud_threshold: 0.03,
    upi_adoption: 0.65,
  },
  subscription: {
    success_rate: 0.94,
    avg_ticket: 500,
    fraud_threshold: 0.04,
    upi_adoption: 0.40,
  },
  quick_commerce: {
    success_rate: 0.98,
    avg_ticket: 450,
    fraud_threshold: 0.02,
    upi_adoption: 0.91,
  },
};

export const BUSINESS_TYPE_LABELS: Record<BusinessType, { label: string; desc: string }> = {
  d2c_ecommerce: {
    label: 'D2C E-Commerce & Retail',
    desc: 'Direct-to-consumer apparel, beauty, lifestyle & electronics brands',
  },
  b2b_saas: {
    label: 'B2B SaaS & Tech',
    desc: 'High ticket domestic & international recurring subscription invoices',
  },
  marketplace: {
    label: 'Multi-Vendor Marketplace',
    desc: 'Aggregators, split-payments, high-frequency seller settlements',
  },
  education: {
    label: 'EdTech & Training',
    desc: 'Course fees, certification bootcamps, cohort installment payments',
  },
  subscription: {
    label: 'Content & Membership Subscriptions',
    desc: 'Auto-debit recurring mandates, media OTT, club memberships',
  },
  quick_commerce: {
    label: 'Quick Commerce & Hyperlocal',
    desc: 'Sub-15 minute grocery & delivery, high-volume micro-payments',
  },
};

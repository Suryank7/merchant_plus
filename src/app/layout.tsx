import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'MerchantPulse AI — Razorpay Merchant Growth & Risk Copilot',
  description:
    'AI-powered continuous payment health audit, fraud anomaly detection, and autonomous growth engine for Razorpay merchants. Built for Razorpay AI Buildathon 2026.',
  keywords: [
    'Razorpay',
    'AI Growth',
    'Agentic Commerce',
    'Payment Health',
    'Fraud Detection',
    'MDR Optimization',
    'UPI',
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark h-full">
      <body className={`${inter.className} min-h-full bg-[#06070b] text-white antialiased`}>
        {children}
      </body>
    </html>
  );
}

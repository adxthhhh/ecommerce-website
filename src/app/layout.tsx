// ============================================================
// src/app/layout.tsx — Root layout
// Loads Inter font, applies global CSS, mounts Navbar + CartDrawer.
// ============================================================

import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/Navbar';
import CartDrawer from '@/components/CartDrawer';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
});

export const metadata: Metadata = {
  title: {
    default: 'MONOSTORE — Minimal Object Shop',
    template: '%s | MONOSTORE',
  },
  description:
    'A curated collection of minimal, functional objects. Pure design, no noise.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.variable}>
      <body>
        <Navbar />
        <CartDrawer />
        {children}
      </body>
    </html>
  );
}

'use client';

// ============================================================
// src/components/Navbar.tsx — Site top-bar
// Pure black & white. Cart badge from Zustand. Squircle badge.
// ============================================================

import Link from 'next/link';
import { useCartStore } from '@/store/cartStore';

export default function Navbar() {
  const toggleCart = useCartStore((s) => s.toggleCart);
  const totalItems = useCartStore((s) => s.totalItems);
  const count = totalItems();

  return (
    <header
      className="sticky top-0 z-30 bg-white/90 backdrop-blur-md border-b border-[#e5e5e5]"
    >
      <nav
        className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between"
        aria-label="Main navigation"
      >
        {/* ── Wordmark ── */}
        <Link
          href="/"
          id="nav-logo"
          className="text-black font-bold text-lg tracking-tight hover:opacity-70 transition-base"
        >
          MONO<span className="font-light">STORE</span>
        </Link>

        {/* ── Center links ── */}
        <div className="hidden md:flex items-center gap-6 text-sm font-medium text-[#6b6b6b]">
          <Link href="/" className="hover:text-black transition-base" id="nav-catalog">
            Catalog
          </Link>
          <Link href="/admin" className="hover:text-black transition-base" id="nav-admin">
            Admin
          </Link>
          <Link href="/delivery" className="hover:text-black transition-base" id="nav-delivery">
            Delivery
          </Link>
        </div>

        {/* ── Cart button ── */}
        <button
          id="nav-cart-btn"
          onClick={toggleCart}
          aria-label={`Open cart, ${count} item${count !== 1 ? 's' : ''}`}
          className="relative flex items-center gap-2 px-4 py-2 text-sm font-semibold
                     border border-[#e5e5e5] text-black hover:border-black hover:bg-black
                     hover:text-white transition-base"
          style={{ borderRadius: 'var(--radius-sm)' }}
        >
          <span aria-hidden="true">◈</span>
          <span>Cart</span>
          {count > 0 && (
            <span
              className="absolute -top-1.5 -right-1.5 min-w-[18px] h-[18px] px-1
                         bg-black text-white text-[10px] font-bold flex items-center justify-center tabular-nums"
              style={{ borderRadius: 'var(--radius-full)' }}
              aria-live="polite"
            >
              {count > 99 ? '99+' : count}
            </span>
          )}
        </button>
      </nav>
    </header>
  );
}

'use client';

// ============================================================
// src/app/page.tsx — Customer Catalog (Home)
// Bento grid layout. Pure black & white. Zustand cart integration.
// No boilerplate. 'use client' because of useState filter + Zustand.
// ============================================================

import { useState, useMemo } from 'react';
import ProductCard from '@/components/ProductCard';
import { MOCK_PRODUCTS, CATEGORIES } from '@/lib/mock-data';
import type { Product } from '@/types';

export default function CatalogPage() {
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [sortBy, setSortBy] = useState<'default' | 'price-asc' | 'price-desc' | 'name'>('default');

  const filtered: Product[] = useMemo(() => {
    let list = MOCK_PRODUCTS.filter((p) => p.isActive);

    // Category filter
    if (activeCategory !== 'All') {
      list = list.filter((p) => p.category === activeCategory);
    }

    // Search filter — name + description
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      list = list.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          (p.description && p.description.toLowerCase().includes(q))
      );
    }

    // Sort
    if (sortBy === 'price-asc') list = [...list].sort((a, b) => a.price - b.price);
    if (sortBy === 'price-desc') list = [...list].sort((a, b) => b.price - a.price);
    if (sortBy === 'name') list = [...list].sort((a, b) => a.name.localeCompare(b.name));

    return list;
  }, [activeCategory, searchQuery, sortBy]);

  // First product gets the "featured" treatment in the bento grid
  const [featured, ...rest] = filtered;

  return (
    <main className="min-h-screen bg-white">
      {/* ─────────────────────────────────────────────────
          Hero / Page Header
      ───────────────────────────────────────────────── */}
      <section className="border-b border-[#e5e5e5] px-6 py-14 max-w-7xl mx-auto">
        <div className="max-w-2xl">
          <p className="text-xs font-semibold tracking-[0.2em] uppercase text-[#9a9a9a] mb-3">
            Object Catalog — {MOCK_PRODUCTS.length} Items
          </p>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-black leading-none mb-4">
            Form follows<br />function.
          </h1>
          <p className="text-[#6b6b6b] text-base max-w-lg leading-relaxed">
            Curated objects that earn their place. No trend-chasing, no excess. Just
            materials, proportion and intent.
          </p>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────
          Filter & Search Bar
      ───────────────────────────────────────────────── */}
      <section className="sticky top-16 z-20 bg-white/90 backdrop-blur-md border-b border-[#e5e5e5]">
        <div className="max-w-7xl mx-auto px-6 py-3 flex flex-col sm:flex-row items-start sm:items-center gap-3">

          {/* Category pills */}
          <div className="flex items-center gap-2 flex-wrap" role="group" aria-label="Filter by category">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                id={`filter-${cat.toLowerCase()}`}
                onClick={() => setActiveCategory(cat)}
                className={`text-xs font-semibold px-3 py-1.5 border transition-base
                  ${activeCategory === cat
                    ? 'bg-black text-white border-black'
                    : 'bg-white text-[#6b6b6b] border-[#e5e5e5] hover:border-black hover:text-black'
                  }`}
                style={{ borderRadius: 'var(--radius-sm)' }}
                aria-pressed={activeCategory === cat}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Spacer */}
          <div className="flex-1" />

          {/* Search */}
          <input
            id="catalog-search"
            type="search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search products…"
            className="text-xs font-medium px-4 py-2 border border-[#e5e5e5] bg-[#f9f9f9]
                       placeholder:text-[#9a9a9a] text-black w-full sm:w-56 transition-base
                       focus:border-black focus:bg-white outline-none"
            style={{ borderRadius: 'var(--radius-sm)' }}
            aria-label="Search products"
          />

          {/* Sort */}
          <select
            id="catalog-sort"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as typeof sortBy)}
            className="text-xs font-medium px-3 py-2 border border-[#e5e5e5] bg-[#f9f9f9]
                       text-black transition-base focus:border-black focus:bg-white outline-none
                       cursor-pointer appearance-none pr-7"
            style={{ borderRadius: 'var(--radius-sm)' }}
            aria-label="Sort products"
          >
            <option value="default">Sort: Default</option>
            <option value="price-asc">Price: Low → High</option>
            <option value="price-desc">Price: High → Low</option>
            <option value="name">Name: A → Z</option>
          </select>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────
          Bento Grid
      ───────────────────────────────────────────────── */}
      <section
        className="max-w-7xl mx-auto px-6 py-8"
        aria-label="Product grid"
      >
        {filtered.length === 0 ? (
          /* Empty state */
          <div className="flex flex-col items-center justify-center py-32 gap-4 text-center">
            <span className="text-6xl text-[#e5e5e5] select-none" aria-hidden>◈</span>
            <p className="text-base font-semibold text-black">No products found</p>
            <p className="text-sm text-[#9a9a9a]">
              Try a different search term or category.
            </p>
            <button
              id="catalog-reset-btn"
              onClick={() => { setActiveCategory('All'); setSearchQuery(''); }}
              className="mt-2 text-xs font-semibold px-5 py-2.5 border border-[#e5e5e5]
                         hover:bg-black hover:text-white hover:border-black transition-base text-black"
              style={{ borderRadius: 'var(--radius-sm)' }}
            >
              Reset filters
            </button>
          </div>
        ) : (
          <div
            className="grid gap-4"
            style={{
              gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
              gridAutoRows: 'auto',
            }}
          >
            {/* Featured card — spans 2 columns on large screens */}
            {featured && (
              <div
                className="lg:col-span-2"
                style={{ gridColumn: 'span 1' }}
                ref={(el) => {
                  if (el && window.innerWidth >= 1024) {
                    el.style.gridColumn = 'span 2';
                  }
                }}
              >
                <ProductCard product={featured} featured />
              </div>
            )}

            {/* Remaining cards */}
            {rest.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </section>

      {/* ─────────────────────────────────────────────────
          Footer
      ───────────────────────────────────────────────── */}
      <footer className="border-t border-[#e5e5e5] mt-16">
        <div className="max-w-7xl mx-auto px-6 py-8 flex flex-col sm:flex-row
                        items-center justify-between gap-4">
          <p className="text-xs text-[#9a9a9a] font-medium">
            © 2026 MONOSTORE — All objects, deliberately chosen.
          </p>
          <div className="flex items-center gap-4 text-xs text-[#9a9a9a] font-medium">
            <a href="/admin" className="hover:text-black transition-base" id="footer-admin-link">Admin</a>
            <span aria-hidden>·</span>
            <a href="/delivery" className="hover:text-black transition-base" id="footer-delivery-link">Delivery</a>
          </div>
        </div>
      </footer>
    </main>
  );
}

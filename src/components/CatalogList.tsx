'use client';

import { useState, useMemo, useEffect, useRef } from 'react';
import ProductCard from '@/components/ProductCard';
import type { Product } from '@/types';

interface CatalogListProps {
  initialProducts: Product[];
  categories: string[];
}

export default function CatalogList({ initialProducts, categories }: CatalogListProps) {
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [sortBy, setSortBy] = useState<'default' | 'price-asc' | 'price-desc' | 'name'>('default');
  
  // To handle the featured card grid span without layout shifts if possible, 
  // but keeping the previous implementation's logic.
  const featuredRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleResize = () => {
      if (featuredRef.current) {
        if (window.innerWidth >= 1024) {
          featuredRef.current.style.gridColumn = 'span 2';
        } else {
          featuredRef.current.style.gridColumn = 'span 1';
        }
      }
    };
    
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const filtered: Product[] = useMemo(() => {
    let list = initialProducts.filter((p) => p.isActive);

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
  }, [initialProducts, activeCategory, searchQuery, sortBy]);

  const [featured, ...rest] = filtered;

  return (
    <>
      {/* Filter & Search Bar */}
      <section className="sticky top-16 z-20 bg-white/90 backdrop-blur-md border-b border-[#e5e5e5]">
        <div className="max-w-7xl mx-auto px-6 py-3 flex flex-col sm:flex-row items-start sm:items-center gap-3">
          {/* Category pills */}
          <div className="flex items-center gap-2 flex-wrap" role="group" aria-label="Filter by category">
            {categories.map((cat) => (
              <button
                key={cat}
                id={`filter-${cat.toLowerCase().replace(/\s+/g, '-')}`}
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

      {/* Bento Grid */}
      <section className="max-w-7xl mx-auto px-6 py-8" aria-label="Product grid">
        {filtered.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-32 gap-4 text-center">
            <span className="text-6xl text-[#e5e5e5] select-none" aria-hidden>◈</span>
            <p className="text-base font-semibold text-black">No products found</p>
            <p className="text-sm text-[#9a9a9a]">Try a different search term or category.</p>
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
            {featured && (
              <div className="lg:col-span-2" ref={featuredRef}>
                <ProductCard product={featured} featured />
              </div>
            )}
            {rest.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </section>
    </>
  );
}

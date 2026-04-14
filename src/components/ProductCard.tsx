'use client';

// ============================================================
// src/components/ProductCard.tsx — Bento-grid product card
// Pure black & white. Squircle border-radius. Hover lift.
// ============================================================

import { useCartStore } from '@/store/cartStore';
import type { Product } from '@/types';

interface ProductCardProps {
  product: Product;
  /** Feature-size cards span more of the bento grid */
  featured?: boolean;
}

// ─── Deterministic placeholder symbol per product ─────────────
const PLACEHOLDER_SYMBOLS = ['◆', '●', '▲', '■', '◈', '◉', '◍', '◐', '▣'];

function getSymbol(id: string): string {
  const idx = id.split('').reduce((acc, c) => acc + c.charCodeAt(0), 0);
  return PLACEHOLDER_SYMBOLS[idx % PLACEHOLDER_SYMBOLS.length];
}

// ─── Component ───────────────────────────────────────────────

export default function ProductCard({ product, featured = false }: ProductCardProps) {
  const addItem = useCartStore((s) => s.addItem);
  const items = useCartStore((s) => s.items);
  const openCart = useCartStore((s) => s.openCart);

  const inCart = items.find((i) => i.product.id === product.id);
  const isLowStock = product.stock > 0 && product.stock < 10;
  const isOutOfStock = product.stock === 0;

  function handleAdd() {
    if (isOutOfStock) return;
    addItem(product);
    openCart();
  }

  return (
    <article
      className={`
        group flex flex-col bg-white border border-[#e5e5e5] hover-lift
        overflow-hidden cursor-default select-none
        ${featured ? 'squircle-lg' : 'squircle'}
      `}
      style={{ borderRadius: featured ? 'var(--radius-lg)' : 'var(--radius-md)' }}
    >
      {/* ── Image / Placeholder zone ── */}
      <div
        className="relative flex items-center justify-center bg-[#f4f4f4]"
        style={{ height: featured ? '280px' : '200px' }}
      >
        {product.imageUrl ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={product.imageUrl}
            alt={product.name}
            className="w-full h-full object-cover"
          />
        ) : (
          <span
            className="text-[#d0d0d0] font-light select-none pointer-events-none"
            style={{ fontSize: featured ? '6rem' : '4rem', lineHeight: 1 }}
            aria-hidden="true"
          >
            {getSymbol(product.id)}
          </span>
        )}

        {/* Category pill */}
        {product.category && (
          <span
            className="absolute top-3 left-3 text-[10px] font-semibold tracking-widest uppercase
                       px-2 py-1 bg-white border border-[#e5e5e5] text-[#6b6b6b]"
            style={{ borderRadius: 'var(--radius-sm)' }}
          >
            {product.category}
          </span>
        )}

        {/* Out of stock overlay */}
        {isOutOfStock && (
          <div className="absolute inset-0 bg-white/80 flex items-center justify-center">
            <span className="text-xs font-semibold tracking-widest uppercase text-[#6b6b6b]">
              Out of Stock
            </span>
          </div>
        )}
      </div>

      {/* ── Content ── */}
      <div className="flex flex-col flex-1 p-4 gap-3">
        {/* Title row */}
        <div className="flex items-start justify-between gap-2">
          <h3 className={`font-semibold leading-snug text-black ${featured ? 'text-lg' : 'text-sm'}`}>
            {product.name}
          </h3>
          <span className={`font-bold tabular-nums shrink-0 text-black ${featured ? 'text-xl' : 'text-base'}`}>
            ${product.price.toFixed(2)}
          </span>
        </div>

        {/* Description */}
        {product.description && (
          <p className="text-xs text-[#6b6b6b] leading-relaxed line-clamp-2">
            {product.description}
          </p>
        )}

        {/* Footer: stock + CTA */}
        <div className="flex items-center justify-between mt-auto pt-2 border-t border-[#f0f0f0]">
          {/* Stock indicator */}
          <span className="text-[11px] text-[#9a9a9a] font-medium">
            {isLowStock ? (
              <span className="text-black font-semibold">Only {product.stock} left</span>
            ) : isOutOfStock ? (
              'Unavailable'
            ) : (
              `${product.stock} in stock`
            )}
          </span>

          {/* Add to cart button */}
          <button
            id={`add-to-cart-${product.id}`}
            onClick={handleAdd}
            disabled={isOutOfStock}
            className={`
              text-xs font-semibold px-4 py-2 transition-base
              ${isOutOfStock
                ? 'bg-[#f4f4f4] text-[#9a9a9a] cursor-not-allowed border border-[#e5e5e5]'
                : inCart
                  ? 'bg-black text-white hover:bg-[#1a1a1a] border border-black'
                  : 'bg-black text-white hover:bg-[#1a1a1a] border border-black'
              }
            `}
            style={{ borderRadius: 'var(--radius-sm)' }}
            aria-label={`Add ${product.name} to cart`}
          >
            {inCart ? `In cart (${inCart.quantity})` : 'Add to cart'}
          </button>
        </div>
      </div>
    </article>
  );
}

'use client';

// ============================================================
// src/components/CartDrawer.tsx — Slide-in cart panel
// Reads from Zustand. Pure black & white. Squircle buttons.
// ============================================================

import { useCartStore } from '@/store/cartStore';

export default function CartDrawer() {
  const { isOpen, items, closeCart, removeItem, updateQuantity, clearCart, totalPrice } =
    useCartStore();

  const total = totalPrice();

  return (
    <>
      {/* Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/20 z-40 transition-base"
          onClick={closeCart}
          aria-hidden="true"
        />
      )}

      {/* Drawer Panel */}
      <aside
        role="dialog"
        aria-label="Shopping cart"
        aria-modal="true"
        className="fixed top-0 right-0 h-full w-full max-w-sm z-50 bg-white border-l border-[#e5e5e5]
                   flex flex-col shadow-2xl transition-transform duration-300"
        style={{
          transform: isOpen ? 'translateX(0)' : 'translateX(100%)',
          borderRadius: 'var(--radius-lg) 0 0 var(--radius-lg)',
        }}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-[#e5e5e5]">
          <div>
            <h2 className="text-base font-bold text-black tracking-tight">Cart</h2>
            {items.length > 0 && (
              <p className="text-xs text-[#9a9a9a] mt-0.5">{items.length} item{items.length !== 1 ? 's' : ''}</p>
            )}
          </div>
          <button
            id="cart-close-btn"
            onClick={closeCart}
            className="w-8 h-8 flex items-center justify-center text-[#6b6b6b]
                       hover:bg-[#f4f4f4] hover:text-black transition-base"
            style={{ borderRadius: 'var(--radius-sm)' }}
            aria-label="Close cart"
          >
            ✕
          </button>
        </div>

        {/* Items list */}
        <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4">
          {items.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center gap-3 text-center pb-16">
              <span className="text-5xl text-[#e5e5e5] select-none" aria-hidden>◈</span>
              <p className="text-sm font-semibold text-black">Your cart is empty</p>
              <p className="text-xs text-[#9a9a9a]">Browse the catalog and add something you love.</p>
              <button
                id="cart-continue-shopping-btn"
                onClick={closeCart}
                className="mt-2 text-xs font-semibold px-5 py-2.5 border border-[#e5e5e5]
                           hover:border-black hover:bg-black hover:text-white transition-base text-black"
                style={{ borderRadius: 'var(--radius-sm)' }}
              >
                Continue Shopping
              </button>
            </div>
          ) : (
            items.map((item) => (
              <div
                key={item.product.id}
                className="flex gap-3 p-3 border border-[#f0f0f0] bg-[#f9f9f9]"
                style={{ borderRadius: 'var(--radius-md)' }}
              >
                {/* Placeholder icon */}
                <div
                  className="w-14 h-14 bg-[#ececec] flex items-center justify-center shrink-0 text-[#c0c0c0] text-xl"
                  style={{ borderRadius: 'var(--radius-sm)' }}
                  aria-hidden="true"
                >
                  ●
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-semibold text-black truncate">{item.product.name}</p>
                  <p className="text-xs text-[#9a9a9a] mt-0.5">
                    ${item.product.price.toFixed(2)} each
                  </p>

                  {/* Quantity controls */}
                  <div className="flex items-center gap-2 mt-2">
                    <button
                      id={`cart-dec-${item.product.id}`}
                      onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                      className="w-6 h-6 flex items-center justify-center text-sm font-bold
                                 border border-[#e5e5e5] bg-white hover:bg-black hover:text-white
                                 hover:border-black transition-base"
                      style={{ borderRadius: 'var(--radius-sm)' }}
                      aria-label="Decrease quantity"
                    >
                      −
                    </button>
                    <span className="text-xs font-semibold w-4 text-center tabular-nums">
                      {item.quantity}
                    </span>
                    <button
                      id={`cart-inc-${item.product.id}`}
                      onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                      className="w-6 h-6 flex items-center justify-center text-sm font-bold
                                 border border-[#e5e5e5] bg-white hover:bg-black hover:text-white
                                 hover:border-black transition-base"
                      style={{ borderRadius: 'var(--radius-sm)' }}
                      aria-label="Increase quantity"
                    >
                      +
                    </button>

                    <span className="ml-auto text-xs font-bold text-black tabular-nums">
                      ${(item.product.price * item.quantity).toFixed(2)}
                    </span>
                  </div>
                </div>

                {/* Remove */}
                <button
                  id={`cart-remove-${item.product.id}`}
                  onClick={() => removeItem(item.product.id)}
                  className="text-[#9a9a9a] hover:text-black transition-base self-start mt-0.5 text-xs"
                  aria-label={`Remove ${item.product.name}`}
                >
                  ✕
                </button>
              </div>
            ))
          )}
        </div>

        {/* Footer — totals + checkout */}
        {items.length > 0 && (
          <div className="px-6 py-5 border-t border-[#e5e5e5] space-y-3">
            {/* Clear cart */}
            <button
              id="cart-clear-btn"
              onClick={clearCart}
              className="text-xs text-[#9a9a9a] hover:text-black transition-base w-full text-right"
            >
              Clear all
            </button>

            {/* Total */}
            <div className="flex items-center justify-between">
              <span className="text-sm font-semibold text-black">Total</span>
              <span className="text-xl font-bold text-black tabular-nums">
                ${total.toFixed(2)}
              </span>
            </div>

            {/* Checkout CTA */}
            <a
              id="cart-checkout-btn"
              href="/checkout"
              className="block w-full text-center text-sm font-bold py-3.5
                         bg-black text-white hover:bg-[#1a1a1a] transition-base"
              style={{ borderRadius: 'var(--radius-md)' }}
            >
              Proceed to Checkout →
            </a>
          </div>
        )}
      </aside>
    </>
  );
}

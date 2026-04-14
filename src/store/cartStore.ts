'use client';

// ============================================================
// src/store/cartStore.ts — Zustand cart store
// Client-side only. Persists to localStorage via zustand/middleware.
// ============================================================

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { CartStore, CartItem, Product } from '@/types';

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      isOpen: false,

      // ── Actions ──────────────────────────────────────────

      addItem: (product: Product) => {
        set((state) => {
          const existing = state.items.find(
            (i) => i.product.id === product.id
          );
          if (existing) {
            return {
              items: state.items.map((i) =>
                i.product.id === product.id
                  ? { ...i, quantity: i.quantity + 1 }
                  : i
              ),
            };
          }
          return { items: [...state.items, { product, quantity: 1 }] };
        });
      },

      removeItem: (productId: string) => {
        set((state) => ({
          items: state.items.filter((i) => i.product.id !== productId),
        }));
      },

      updateQuantity: (productId: string, quantity: number) => {
        if (quantity <= 0) {
          get().removeItem(productId);
          return;
        }
        set((state) => ({
          items: state.items.map((i) =>
            i.product.id === productId ? { ...i, quantity } : i
          ),
        }));
      },

      clearCart: () => set({ items: [] }),

      toggleCart: () => set((state) => ({ isOpen: !state.isOpen })),
      openCart: () => set({ isOpen: true }),
      closeCart: () => set({ isOpen: false }),

      // ── Derived ──────────────────────────────────────────

      totalItems: () =>
        get().items.reduce((sum: number, i: CartItem) => sum + i.quantity, 0),

      totalPrice: () =>
        get().items.reduce(
          (sum: number, i: CartItem) => sum + i.product.price * i.quantity,
          0
        ),
    }),
    {
      name: 'ecommerce-cart',
      // Only persist items array, not UI state (isOpen)
      partialize: (state) => ({ items: state.items }),
    }
  )
);

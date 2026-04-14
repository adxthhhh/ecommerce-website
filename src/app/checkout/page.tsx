'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useCartStore } from '@/store/cartStore';
import type { ShippingAddress } from '@/types';

export default function CheckoutPage() {
  const router = useRouter();
  const { items, totalPrice, clearCart } = useCartStore();
  const [isSuccess, setIsSuccess] = useState(false);
  const [formData, setFormData] = useState<ShippingAddress>({
    fullName: '',
    street: '',
    city: '',
    state: '',
    zip: '',
    country: '',
    phone: '',
  });

  const total = totalPrice();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate placing order
    console.log('Placing order...', { items, shippingAddress: formData, total });
    
    // Success flow
    setIsSuccess(true);
    clearCart();
    // In a real app, you'd send this to the database
  };

  if (isSuccess) {
    return (
      <main className="min-h-screen flex flex-col items-center justify-center p-6 bg-white">
        <div className="max-w-md w-full text-center space-y-6 animate-in fade-in zoom-in duration-500">
          <span className="text-6xl text-black select-none" aria-hidden>✓</span>
          <h1 className="text-3xl font-bold tracking-tight text-black">Order Placed Successfully</h1>
          <p className="text-[#6b6b6b]">
            Your minimalist objects are being prepared. Thank you for choosing MONOSTORE.
          </p>
          <button
            onClick={() => router.push('/')}
            className="w-full py-4 bg-black text-white font-bold hover:bg-[#1a1a1a] transition-base squircle-md"
          >
            Return to Catalog
          </button>
        </div>
      </main>
    );
  }

  if (items.length === 0) {
    return (
      <main className="min-h-screen flex flex-col items-center justify-center p-6 bg-white">
        <div className="text-center space-y-4">
          <h1 className="text-2xl font-bold text-black">Your cart is empty</h1>
          <button
            onClick={() => router.push('/')}
            className="px-6 py-3 border border-black font-bold hover:bg-black hover:text-white transition-base squircle-sm"
          >
            Go back to shopping
          </button>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-white pt-24 pb-16 px-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold tracking-tight text-black mb-12">Checkout</h1>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Left: Shipping Form */}
          <div className="lg:col-span-7">
            <h2 className="text-lg font-bold text-black mb-6 uppercase tracking-wider">Shipping Details</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="fullName" className="block text-xs font-bold text-[#9a9a9a] uppercase mb-2">Full Name</label>
                  <input
                    required
                    type="text"
                    id="fullName"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-[#e5e5e5] bg-[#f9f9f9] text-black outline-none focus:border-black transition-base squircle-sm"
                    placeholder="Enter full name"
                  />
                </div>
                <div>
                  <label htmlFor="phone" className="block text-xs font-bold text-[#9a9a9a] uppercase mb-2">Phone Number</label>
                  <input
                    required
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-[#e5e5e5] bg-[#f9f9f9] text-black outline-none focus:border-black transition-base squircle-sm"
                    placeholder="Enter phone number"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="street" className="block text-xs font-bold text-[#9a9a9a] uppercase mb-2">Street Address</label>
                <input
                  required
                  type="text"
                  id="street"
                  name="street"
                  value={formData.street}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-[#e5e5e5] bg-[#f9f9f9] text-black outline-none focus:border-black transition-base squircle-sm"
                  placeholder="Street name and house number"
                />
              </div>

              <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                <div className="col-span-1">
                  <label htmlFor="city" className="block text-xs font-bold text-[#9a9a9a] uppercase mb-2">City</label>
                  <input
                    required
                    type="text"
                    id="city"
                    name="city"
                    value={formData.city}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-[#e5e5e5] bg-[#f9f9f9] text-black outline-none focus:border-black transition-base squircle-sm"
                    placeholder="City"
                  />
                </div>
                <div className="col-span-1">
                  <label htmlFor="state" className="block text-xs font-bold text-[#9a9a9a] uppercase mb-2">State</label>
                  <input
                    required
                    type="text"
                    id="state"
                    name="state"
                    value={formData.state}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-[#e5e5e5] bg-[#f9f9f9] text-black outline-none focus:border-black transition-base squircle-sm"
                    placeholder="State"
                  />
                </div>
                <div className="col-span-2 md:col-span-1">
                  <label htmlFor="zip" className="block text-xs font-bold text-[#9a9a9a] uppercase mb-2">ZIP Code</label>
                  <input
                    required
                    type="text"
                    id="zip"
                    name="zip"
                    value={formData.zip}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-[#e5e5e5] bg-[#f9f9f9] text-black outline-none focus:border-black transition-base squircle-sm"
                    placeholder="ZIP"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="country" className="block text-xs font-bold text-[#9a9a9a] uppercase mb-2">Country</label>
                <input
                  required
                  type="text"
                  id="country"
                  name="country"
                  value={formData.country}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-[#e5e5e5] bg-[#f9f9f9] text-black outline-none focus:border-black transition-base squircle-sm"
                  placeholder="Enter country"
                />
              </div>

              <button
                type="submit"
                className="w-full py-5 bg-black text-white font-bold text-sm uppercase tracking-widest hover:bg-[#1a1a1a] transition-base squircle-md mt-6"
              >
                Place Order — ${total.toFixed(2)}
              </button>
            </form>
          </div>

          {/* Right: Order Summary */}
          <div className="lg:col-span-5">
            <div className="border border-[#e5e5e5] p-8 space-y-8 sticky top-32 squircle-lg">
              <h2 className="text-lg font-bold text-black uppercase tracking-wider">Order Summary</h2>
              
              <div className="divide-y divide-[#f0f0f0] max-h-[40vh] overflow-y-auto pr-2">
                {items.map((item) => (
                  <div key={item.product.id} className="py-4 flex gap-4 first:pt-0">
                    <div className="w-16 h-16 bg-[#f4f4f4] flex items-center justify-center shrink-0 squircle-sm text-[#9a9a9a]" aria-hidden>
                      ●
                    </div>
                    <div className="flex-1">
                      <h3 className="text-sm font-bold text-black">{item.product.name}</h3>
                      <p className="text-xs text-[#9a9a9a] mt-1">Qty: {item.quantity}</p>
                    </div>
                    <span className="text-sm font-bold text-black tabular-nums">
                      ${(item.product.price * item.quantity).toFixed(2)}
                    </span>
                  </div>
                ))}
              </div>

              <div className="space-y-4 pt-4 border-t border-[#e5e5e5]">
                <div className="flex justify-between text-sm text-[#6b6b6b]">
                  <span>Subtotal</span>
                  <span className="tabular-nums">${total.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm text-[#6b6b6b]">
                  <span>Shipping</span>
                  <span className="uppercase text-[10px] font-bold tracking-widest">Calculated at checkout</span>
                </div>
                <div className="flex justify-between items-center pt-4 border-t border-black">
                  <span className="text-base font-bold text-black uppercase tracking-tighter">Total Due</span>
                  <span className="text-2xl font-black text-black tabular-nums">${total.toFixed(2)}</span>
                </div>
              </div>

              <div className="text-[10px] text-[#9a9a9a] leading-relaxed">
                By placing an order, you agree to MONOSTORE Terms of Service and Privacy Policy. All sales of minimal objects are final.
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

'use client';

import { useState } from 'react';
import { MOCK_ORDERS, MOCK_STATS, MOCK_DELIVERY_BOY } from '@/lib/mock-data';
import type { Order, OrderStatus } from '@/types';

export default function AdminPage() {
  const [orders, setOrders] = useState<Order[]>(MOCK_ORDERS);

  // Mock function to update order status
  const updateStatus = (orderId: string, newStatus: OrderStatus) => {
    setOrders((prev) =>
      prev.map((o) => (o.id === orderId ? { ...o, status: newStatus } : o))
    );
  };

  // Mock function to assign delivery boy
  const assignDeliveryBoy = (orderId: string, deliveryBoyId: string) => {
    setOrders((prev) =>
      prev.map((o) =>
        o.id === orderId
          ? {
              ...o,
              deliveryBoyId,
              deliveryBoy: deliveryBoyId === MOCK_DELIVERY_BOY.id ? MOCK_DELIVERY_BOY : null,
              status: 'ASSIGNED' as OrderStatus,
            }
          : o
      )
    );
  };

  return (
    <main className="min-h-screen bg-white pt-24 pb-16 px-6">
      <div className="max-w-7xl mx-auto space-y-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div className="space-y-1">
            <h1 className="text-3xl font-bold tracking-tight text-black">Admin Dashboard</h1>
            <p className="text-sm text-[#9a9a9a] uppercase tracking-widest font-bold">Metrics & Order Management</p>
          </div>
          <button className="bg-black text-white px-6 py-2.5 text-xs font-bold uppercase tracking-widest hover:bg-[#1a1a1a] transition-base squircle-sm">
            Export Report
          </button>
        </div>

        {/* ── Bento Grid Metrics ── */}
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-[#f9f9f9] border border-[#e5e5e5] p-6 squircle-md flex flex-col justify-between hover:border-black transition-base">
            <span className="text-[10px] font-black uppercase text-[#9a9a9a] tracking-widest">Total Sales</span>
            <div className="mt-4">
              <span className="text-3xl font-black text-black tabular-nums">${MOCK_STATS.totalRevenue.toFixed(2)}</span>
              <p className="text-[10px] text-[#6b6b6b] mt-1">+12.5% from last month</p>
            </div>
          </div>
          <div className="bg-[#f9f9f9] border border-[#e5e5e5] p-6 squircle-md flex flex-col justify-between hover:border-black transition-base">
            <span className="text-[10px] font-black uppercase text-[#9a9a9a] tracking-widest">Active Orders</span>
            <div className="mt-4">
              <span className="text-3xl font-black text-black tabular-nums">{MOCK_STATS.totalOrders}</span>
              <p className="text-[10px] text-[#6b6b6b] mt-1">{MOCK_STATS.pendingOrders} awaiting confirmation</p>
            </div>
          </div>
          <div className="bg-[#f9f9f9] border border-[#e5e5e5] p-6 squircle-md flex flex-col justify-between hover:border-black transition-base">
            <span className="text-[10px] font-black uppercase text-[#9a9a9a] tracking-widest">In Catalog</span>
            <div className="mt-4">
              <span className="text-3xl font-black text-black tabular-nums">{MOCK_STATS.totalProducts}</span>
              <p className="text-[10px] text-[#6b6b6b] mt-1">{MOCK_STATS.lowStockProducts} products low in stock</p>
            </div>
          </div>
          <div className="bg-black text-white p-6 squircle-md flex flex-col justify-between shadow-xl">
            <span className="text-[10px] font-black uppercase text-[#9a9a9a] tracking-widest">Platform Status</span>
            <div className="mt-4">
              <span className="text-xl font-bold tracking-tight">System Operational</span>
              <p className="text-[10px] text-[#9a9a9a] mt-1">All servers responding normally</p>
            </div>
          </div>
        </section>

        {/* ── Orders Table Row ── */}
        <section className="bg-white border border-[#e5e5e5] squircle-lg overflow-hidden">
          <div className="px-8 py-6 border-b border-[#e5e5e5] flex items-center justify-between">
            <h2 className="text-lg font-bold text-black uppercase tracking-tight">Incoming Orders</h2>
            <div className="flex gap-2">
              <div className="h-2 w-2 rounded-full bg-black animate-pulse" />
              <span className="text-[10px] font-bold text-[#9a9a9a] uppercase tracking-widest">Live Updates</span>
            </div>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-[#f9f9f9]">
                  <th className="px-8 py-4 text-[10px] font-black uppercase text-[#9a9a9a] tracking-widest border-b border-[#e5e5e5]">Order ID</th>
                  <th className="px-8 py-4 text-[10px] font-black uppercase text-[#9a9a9a] tracking-widest border-b border-[#e5e5e5]">Customer</th>
                  <th className="px-8 py-4 text-[10px] font-black uppercase text-[#9a9a9a] tracking-widest border-b border-[#e5e5e5]">Total</th>
                  <th className="px-8 py-4 text-[10px] font-black uppercase text-[#9a9a9a] tracking-widest border-b border-[#e5e5e5]">Status</th>
                  <th className="px-8 py-4 text-[10px] font-black uppercase text-[#9a9a9a] tracking-widest border-b border-[#e5e5e5]">Logistics</th>
                  <th className="px-8 py-4 text-[10px] font-black uppercase text-[#9a9a9a] tracking-widest border-b border-[#e5e5e5]">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#f0f0f0]">
                {orders.map((order) => (
                  <tr key={order.id} className="hover:bg-[#fcfcfc] transition-base group">
                    <td className="px-8 py-6 text-xs font-black text-black tabular-nums">{order.id}</td>
                    <td className="px-8 py-6">
                      <div className="flex flex-col">
                        <span className="text-xs font-bold text-black">{order.shippingAddress.fullName}</span>
                        <span className="text-[10px] text-[#9a9a9a]">{order.shippingAddress.city}, {order.shippingAddress.country}</span>
                      </div>
                    </td>
                    <td className="px-8 py-6 text-xs font-bold text-black tabular-nums">${order.totalAmount.toFixed(2)}</td>
                    <td className="px-8 py-6">
                      <span className={`
                        px-2 py-1 text-[9px] font-black uppercase tracking-widest border
                        ${order.status === 'DELIVERED' ? 'bg-black text-white border-black' : 'bg-white text-black border-[#e5e5e5]'}
                      `} style={{ borderRadius: '4px' }}>
                        {order.status}
                      </span>
                    </td>
                    <td className="px-8 py-6">
                      {order.deliveryBoy ? (
                        <div className="flex items-center gap-2">
                          <div className="w-5 h-5 bg-[#f4f4f4] rounded-full flex items-center justify-center text-[8px] font-black">👦</div>
                          <span className="text-[10px] font-bold text-black">{order.deliveryBoy.name}</span>
                        </div>
                      ) : (
                        <select
                          className="text-[10px] font-bold bg-[#f9f9f9] border border-[#e5e5e5] px-2 py-1 outline-none focus:border-black squircle-sm"
                          onChange={(e) => assignDeliveryBoy(order.id, e.target.value)}
                          defaultValue=""
                        >
                          <option value="" disabled>Assign Courier</option>
                          <option value={MOCK_DELIVERY_BOY.id}>{MOCK_DELIVERY_BOY.name}</option>
                          <option value="other">Mock Agent B</option>
                        </select>
                      )}
                    </td>
                    <td className="px-8 py-6">
                      {order.status === 'PENDING' && (
                        <button
                          onClick={() => updateStatus(order.id, 'CONFIRMED')}
                          className="text-[10px] font-bold uppercase text-black hover:underline decoration-2"
                        >
                          Confirm
                        </button>
                      )}
                      {order.status === 'DELIVERED' && (
                        <span className="text-[10px] font-bold text-[#9a9a9a] uppercase">Archived</span>
                      )}
                      {order.status !== 'PENDING' && order.status !== 'DELIVERED' && (
                        <button
                          onClick={() => updateStatus(order.id, 'CANCELLED')}
                          className="text-[10px] font-bold uppercase text-[#9a9a9a] hover:text-black transition-base"
                        >
                          Cancel
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          <div className="px-8 py-4 bg-[#fcfcfc] border-t border-[#e5e5e5] flex justify-between items-center text-[10px] font-bold text-[#9a9a9a] uppercase tracking-widest">
            <span>Showing {orders.length} orders</span>
            <div className="flex gap-4">
              <button disabled className="opacity-30">Previous</button>
              <button disabled className="opacity-30">Next</button>
            </div>
          </div>
        </section>

        {/* ── Product Inventory Row (Placeholder for full Bento) ── */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="md:col-span-2 bg-white border border-[#e5e5e5] p-8 squircle-lg flex flex-col justify-between gap-8">
            <h2 className="text-lg font-bold text-black uppercase tracking-tight">Inventory Overview</h2>
            <div className="flex flex-col gap-4">
              <div className="flex justify-between items-end">
                <span className="text-xs font-bold text-[#6b6b6b]">Stock Health</span>
                <span className="text-xs font-black text-black">88% Optimal</span>
              </div>
              <div className="w-full h-1 bg-[#f4f4f4] rounded-full overflow-hidden">
                <div className="h-full bg-black w-[88%]" />
              </div>
            </div>
          </div>
          <div className="bg-black text-white p-8 squircle-lg flex flex-col justify-center gap-4 text-center">
             <div className="text-3xl">✦</div>
             <p className="text-xs font-bold uppercase tracking-widest leading-relaxed">Add New Objects to your minimal collection</p>
             <button className="bg-white text-black py-3 px-6 text-sm font-black uppercase tracking-tighter hover:bg-[#f4f4f4] transition-base squircle-sm mt-2">
               + Create Product
             </button>
          </div>
        </section>
      </div>
    </main>
  );
}

'use client';

import { useState } from 'react';
import { MOCK_ORDERS, MOCK_DELIVERY_BOY } from '@/lib/mock-data';
import type { Order, OrderStatus } from '@/types';

export default function DeliveryPage() {
  // Filter for orders assigned to this delivery boy or mock list
  const [orders, setOrders] = useState<Order[]>(
    MOCK_ORDERS.map(o => ({
      ...o,
      // Force assign first order for demo purposes if it isn't already
      deliveryBoyId: o.id === 'order_01' ? MOCK_DELIVERY_BOY.id : o.deliveryBoyId,
      deliveryBoy: o.id === 'order_01' ? MOCK_DELIVERY_BOY : o.deliveryBoy
    }))
  );

  const myOrders = orders.filter(o => o.deliveryBoyId === MOCK_DELIVERY_BOY.id);

  const updateStatus = (orderId: string, newStatus: OrderStatus) => {
    setOrders((prev) =>
      prev.map((o) => (o.id === orderId ? { ...o, status: newStatus } : o))
    );
  };

  const getStatusAction = (status: OrderStatus) => {
    switch (status) {
      case 'ASSIGNED':
        return 'OUT_FOR_DELIVERY';
      case 'OUT_FOR_DELIVERY':
        return 'DELIVERED';
      default:
        return null;
    }
  };

  const statusLabel = (status: OrderStatus) => {
    switch (status) {
      case 'ASSIGNED': return 'Waiting for Pickup';
      case 'OUT_FOR_DELIVERY': return 'In Transit';
      case 'DELIVERED': return 'Package Received';
      default: return status;
    }
  };

  return (
    <main className="min-h-screen bg-white pt-24 pb-16 px-6">
      <div className="max-w-4xl mx-auto space-y-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-[#e5e5e5] pb-8">
          <div className="space-y-1">
            <h1 className="text-3xl font-bold tracking-tight text-black">Delivery Portal</h1>
            <div className="flex items-center gap-2">
               <div className="w-2 h-2 bg-black rounded-full" />
               <p className="text-xs font-bold text-black uppercase tracking-widest">Courier: {MOCK_DELIVERY_BOY.name}</p>
            </div>
          </div>
          <div className="flex gap-4">
             <div className="text-right">
                <p className="text-[10px] font-black text-[#9a9a9a] uppercase">Active Routes</p>
                <p className="text-lg font-black text-black tabular-nums">{myOrders.filter(o => o.status !== 'DELIVERED').length}</p>
             </div>
             <div className="text-right border-l border-[#e5e5e5] pl-4">
                <p className="text-[10px] font-black text-[#9a9a9a] uppercase">Shift Total</p>
                <p className="text-lg font-black text-black tabular-nums">{myOrders.filter(o => o.status === 'DELIVERED').length}</p>
             </div>
          </div>
        </div>

        {myOrders.length === 0 ? (
          <div className="py-20 text-center space-y-4">
            <div className="text-4xl text-[#e5e5e5]">◐</div>
            <p className="text-sm font-bold text-[#9a9a9a] uppercase tracking-widest">No assigned parcels at this time</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6">
            {myOrders.map((order) => {
              const nextStatus = getStatusAction(order.status);
              
              return (
                <article 
                  key={order.id} 
                  className={`
                    border border-[#e5e5e5] p-6 squircle-lg transition-base
                    ${order.status === 'DELIVERED' ? 'bg-[#fcfcfc] opacity-60' : 'bg-white shadow-sm hover:border-black'}
                  `}
                >
                  <div className="flex flex-col md:flex-row justify-between gap-6">
                    <div className="space-y-6 flex-1">
                      <div className="flex items-center gap-4">
                        <span className="text-xs font-black text-black bg-[#f4f4f4] px-2 py-1 squircle-sm tabular-nums">ID: {order.id}</span>
                        <span className={`text-[9px] font-black uppercase tracking-[0.2em] ${order.status === 'DELIVERED' ? 'text-[#9a9a9a]' : 'text-black'}`}>
                          {statusLabel(order.status)}
                        </span>
                      </div>

                      <div className="space-y-2">
                        <p className="text-[10px] font-black text-[#9a9a9a] uppercase tracking-widest">Delivery Address</p>
                        <div className="text-sm text-black leading-relaxed">
                          <p className="font-black">{order.shippingAddress.fullName}</p>
                          <p>{order.shippingAddress.street}</p>
                          <p>{order.shippingAddress.city}, {order.shippingAddress.zip}</p>
                          <p className="text-xs font-bold mt-2">{order.shippingAddress.phone}</p>
                        </div>
                      </div>

                      {order.deliveryNotes && (
                        <div className="bg-[#f9f9f9] border-l-2 border-black p-3 squircle-sm">
                          <p className="text-[9px] font-black text-black uppercase mb-1">Customer Note</p>
                          <p className="text-xs italic text-[#6b6b6b]">{order.deliveryNotes}</p>
                        </div>
                      )}
                    </div>

                    <div className="flex flex-col justify-between items-end md:w-48 gap-4">
                      <div className="text-right">
                         <p className="text-[10px] font-black text-[#9a9a9a] uppercase">Order Content</p>
                         <p className="text-xs font-bold text-black">{order.items.length} item{order.items.length > 1 ? 's' : ''}</p>
                      </div>

                      {nextStatus ? (
                        <button
                          onClick={() => updateStatus(order.id, nextStatus)}
                          className="w-full py-4 bg-black text-white text-[10px] font-black uppercase tracking-widest hover:bg-[#1a1a1a] transition-base squircle-md shadow-lg"
                        >
                          Mark as {nextStatus.replace(/_/g, ' ')}
                        </button>
                      ) : (
                        order.status === 'DELIVERED' && (
                          <div className="px-4 py-2 border border-[#e5e5e5] bg-white text-[10px] font-black uppercase tracking-widest text-[#9a9a9a] squircle-sm">
                            Completed
                          </div>
                        )
                      )}
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        )}

        <footer className="pt-12 border-t border-[#e5e5e5] flex justify-center">
           <p className="text-[10px] font-bold text-[#9a9a9a] uppercase tracking-[0.3em]">Mono Logistics Protocol v1.0</p>
        </footer>
      </div>
    </main>
  );
}

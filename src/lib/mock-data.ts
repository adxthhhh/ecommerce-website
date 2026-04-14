// ============================================================
// src/lib/mock-data.ts — Seed data for mock/development mode
// Replace with real Prisma queries once Supabase is connected.
// ============================================================

import type { Product, Order, User } from "@/types";

// ─── Mock Products ────────────────────────────────────────────

export const MOCK_PRODUCTS: Product[] = [
  {
    id: "prod_01",
    name: "Minimal Desk Lamp",
    description:
      "A sleek, touch-dimmable lamp crafted from brushed aluminium. Three brightness levels, warm to cool white.",
    price: 89.0,
    imageUrl: null,
    stock: 24,
    category: "Lighting",
    isActive: true,
    createdAt: "2026-01-10T08:00:00Z",
    updatedAt: "2026-01-10T08:00:00Z",
  },
  {
    id: "prod_02",
    name: "Ceramic Pour-Over Set",
    description:
      "Hand-thrown matte ceramic dripper with matching carafe. Holds 600 ml. Dishwasher safe.",
    price: 64.0,
    imageUrl: null,
    stock: 12,
    category: "Kitchen",
    isActive: true,
    createdAt: "2026-01-12T08:00:00Z",
    updatedAt: "2026-01-12T08:00:00Z",
  },
  {
    id: "prod_03",
    name: "Linen Notebook — A5",
    description:
      "200 pages of 90 gsm cream paper, dot-grid layout. Lay-flat binding. Available in natural linen.",
    price: 28.0,
    imageUrl: null,
    stock: 60,
    category: "Stationery",
    isActive: true,
    createdAt: "2026-01-15T08:00:00Z",
    updatedAt: "2026-01-15T08:00:00Z",
  },
  {
    id: "prod_04",
    name: "Walnut Phone Stand",
    description:
      "Solid walnut wood stand, compatible with all phones up to 85 mm wide. Non-slip silicone base.",
    price: 42.0,
    imageUrl: null,
    stock: 35,
    category: "Desk",
    isActive: true,
    createdAt: "2026-01-18T08:00:00Z",
    updatedAt: "2026-01-18T08:00:00Z",
  },
  {
    id: "prod_05",
    name: "Canvas Tote — Large",
    description:
      "14 oz heavy-duty cotton canvas. Internal zip pocket. Fits a 16\" laptop. Raw hem finish.",
    price: 36.0,
    imageUrl: null,
    stock: 50,
    category: "Bags",
    isActive: true,
    createdAt: "2026-01-20T08:00:00Z",
    updatedAt: "2026-01-20T08:00:00Z",
  },
  {
    id: "prod_06",
    name: "Mechanical Pencil — 0.5mm",
    description:
      "Machined aluminium body, knurled grip. Retractable tip. Ships with one sleeve of 0.5 HB leads.",
    price: 22.0,
    imageUrl: null,
    stock: 80,
    category: "Stationery",
    isActive: true,
    createdAt: "2026-01-22T08:00:00Z",
    updatedAt: "2026-01-22T08:00:00Z",
  },
  {
    id: "prod_07",
    name: "Concrete Planter — Small",
    description:
      "Hand-cast concrete planter with drainage hole. 12 cm diameter. Suits succulents or small herbs.",
    price: 19.0,
    imageUrl: null,
    stock: 40,
    category: "Home",
    isActive: true,
    createdAt: "2026-01-25T08:00:00Z",
    updatedAt: "2026-01-25T08:00:00Z",
  },
  {
    id: "prod_08",
    name: "Woollen Throw — 130×170cm",
    description:
      "100% merino wool. Herringbone weave. Dry clean only. Available in off-white.",
    price: 145.0,
    imageUrl: null,
    stock: 8,
    category: "Home",
    isActive: true,
    createdAt: "2026-01-28T08:00:00Z",
    updatedAt: "2026-01-28T08:00:00Z",
  },
  {
    id: "prod_09",
    name: "Stainless Travel Mug",
    description:
      "Double-wall vacuum insulated. 360 ml. Keeps drinks hot 12 h, cold 24 h. Lid is leak-proof.",
    price: 48.0,
    imageUrl: null,
    stock: 30,
    category: "Kitchen",
    isActive: true,
    createdAt: "2026-02-01T08:00:00Z",
    updatedAt: "2026-02-01T08:00:00Z",
  },
];

// ─── Mock Users ───────────────────────────────────────────────

export const MOCK_CUSTOMER: User = {
  id: "user_cust_01",
  email: "sam@example.com",
  name: "Sam Rivera",
  role: "CUSTOMER",
  avatarUrl: null,
  createdAt: "2026-01-01T00:00:00Z",
  updatedAt: "2026-01-01T00:00:00Z",
};

export const MOCK_ADMIN: User = {
  id: "user_admin_01",
  email: "admin@store.com",
  name: "Admin User",
  role: "ADMIN",
  avatarUrl: null,
  createdAt: "2026-01-01T00:00:00Z",
  updatedAt: "2026-01-01T00:00:00Z",
};

export const MOCK_DELIVERY_BOY: User = {
  id: "user_del_01",
  email: "delivery@store.com",
  name: "Alex Chen",
  role: "DELIVERY_BOY",
  avatarUrl: null,
  createdAt: "2026-01-01T00:00:00Z",
  updatedAt: "2026-01-01T00:00:00Z",
};

// ─── Mock Orders ──────────────────────────────────────────────

export const MOCK_ORDERS: Order[] = [
  {
    id: "order_01",
    customerId: MOCK_CUSTOMER.id,
    customer: MOCK_CUSTOMER,
    deliveryBoyId: MOCK_DELIVERY_BOY.id,
    deliveryBoy: MOCK_DELIVERY_BOY,
    status: "OUT_FOR_DELIVERY",
    totalAmount: 153.0,
    shippingAddress: {
      fullName: "Sam Rivera",
      street: "12 Elm Street",
      city: "Bangalore",
      state: "Karnataka",
      zip: "560001",
      country: "India",
      phone: "+91 98765 43210",
    },
    adminNotes: null,
    deliveryNotes: "Leave at door if no answer.",
    createdAt: "2026-04-10T10:00:00Z",
    updatedAt: "2026-04-14T09:00:00Z",
    deliveredAt: null,
    items: [
      {
        id: "item_01",
        orderId: "order_01",
        productId: "prod_01",
        product: MOCK_PRODUCTS[0],
        quantity: 1,
        priceAtPurchase: 89.0,
      },
      {
        id: "item_02",
        orderId: "order_01",
        productId: "prod_03",
        product: MOCK_PRODUCTS[2],
        quantity: 2,
        priceAtPurchase: 28.0,
      },
    ],
  },
  {
    id: "order_02",
    customerId: MOCK_CUSTOMER.id,
    customer: MOCK_CUSTOMER,
    deliveryBoyId: null,
    deliveryBoy: null,
    status: "PENDING",
    totalAmount: 64.0,
    shippingAddress: {
      fullName: "Sam Rivera",
      street: "12 Elm Street",
      city: "Bangalore",
      state: "Karnataka",
      zip: "560001",
      country: "India",
      phone: "+91 98765 43210",
    },
    adminNotes: null,
    deliveryNotes: null,
    createdAt: "2026-04-14T08:30:00Z",
    updatedAt: "2026-04-14T08:30:00Z",
    deliveredAt: null,
    items: [
      {
        id: "item_03",
        orderId: "order_02",
        productId: "prod_02",
        product: MOCK_PRODUCTS[1],
        quantity: 1,
        priceAtPurchase: 64.0,
      },
    ],
  },
];

// ─── Categories (derived from products) ──────────────────────

export const CATEGORIES = [
  "All",
  ...Array.from(
    new Set(MOCK_PRODUCTS.map((p) => p.category).filter(Boolean) as string[])
  ),
];

// ─── Admin stats ──────────────────────────────────────────────

export const MOCK_STATS = {
  totalRevenue: MOCK_ORDERS.reduce((sum, o) => sum + o.totalAmount, 0),
  totalOrders: MOCK_ORDERS.length,
  pendingOrders: MOCK_ORDERS.filter((o) => o.status === "PENDING").length,
  totalProducts: MOCK_PRODUCTS.length,
  lowStockProducts: MOCK_PRODUCTS.filter((p) => p.stock < 15).length,
};

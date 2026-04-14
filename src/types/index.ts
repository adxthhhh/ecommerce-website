// ============================================================
// src/types/index.ts — All TypeScript interfaces
// Mirrors schema.prisma exactly. Used across the entire app.
// ============================================================

// ─── Enums ───────────────────────────────────────────────────

export type Role = "CUSTOMER" | "ADMIN" | "DELIVERY_BOY";

export type OrderStatus =
  | "PENDING"
  | "CONFIRMED"
  | "ASSIGNED"
  | "OUT_FOR_DELIVERY"
  | "DELIVERED"
  | "CANCELLED";

// ─── Domain Models ───────────────────────────────────────────

export interface User {
  id: string;
  email: string;
  name: string | null;
  role: Role;
  avatarUrl: string | null;
  createdAt: string; // ISO date string
  updatedAt: string;
}

export interface Product {
  id: string;
  name: string;
  description: string | null;
  price: number; // Decimal serialised as number for frontend
  imageUrl: string | null;
  stock: number;
  category: string | null;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface ShippingAddress {
  fullName: string;
  street: string;
  city: string;
  state: string;
  zip: string;
  country: string;
  phone: string;
}

export interface OrderItem {
  id: string;
  orderId: string;
  productId: string;
  product: Product;
  quantity: number;
  priceAtPurchase: number;
}

export interface Order {
  id: string;
  customerId: string;
  customer: User;
  deliveryBoyId: string | null;
  deliveryBoy: User | null;
  status: OrderStatus;
  totalAmount: number;
  shippingAddress: ShippingAddress;
  adminNotes: string | null;
  deliveryNotes: string | null;
  createdAt: string;
  updatedAt: string;
  deliveredAt: string | null;
  items: OrderItem[];
}

// ─── Cart (Zustand — client only) ────────────────────────────

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface CartStore {
  items: CartItem[];
  isOpen: boolean;
  // Actions
  addItem: (product: Product) => void;
  removeItem: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  toggleCart: () => void;
  openCart: () => void;
  closeCart: () => void;
  // Derived
  totalItems: () => number;
  totalPrice: () => number;
}

// ─── API Response wrappers ────────────────────────────────────

export interface ApiSuccess<T> {
  success: true;
  data: T;
}

export interface ApiError {
  success: false;
  error: string;
  code?: string;
}

export type ApiResponse<T> = ApiSuccess<T> | ApiError;

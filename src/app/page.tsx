import prisma from '@/lib/prisma';
import CatalogList from '@/components/CatalogList';
import type { Product } from '@/types';

// Force dynamic is used to ensure we always get fresh data from the database 
// especially when items are added via the admin panel.
export const dynamic = 'force-dynamic';

export default async function CatalogPage() {
  // Fetch products from Supabase via Prisma
  // We cast the Decimal types to numbers for the frontend
  const dbProducts = await prisma.product.findMany({
    orderBy: { createdAt: 'desc' },
  });

  // Convert Decimal to number for the interface
  const products: Product[] = dbProducts.map((p) => ({
    ...p,
    price: Number(p.price),
    createdAt: p.createdAt.toISOString(),
    updatedAt: p.updatedAt.toISOString(),
  }));

  // Derive categories from live data
  const categories = [
    'All',
    ...Array.from(
      new Set(products.map((p) => p.category).filter((c): c is string => !!c))
    ),
  ];

  return (
    <main className="min-h-screen bg-white">
      {/* Hero / Page Header */}
      <section className="border-b border-[#e5e5e5] px-6 py-14 max-w-7xl mx-auto">
        <div className="max-w-2xl">
          <p className="text-xs font-semibold tracking-[0.2em] uppercase text-[#9a9a9a] mb-3">
            Object Catalog — {products.length} Items Live
          </p>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-black leading-none mb-4">
            Form follows<br />function.
          </h1>
          <p className="text-[#6b6b6b] text-base max-w-lg leading-relaxed">
            Curated objects that earn their place. No trend-chasing, no excess. Just
            materials, proportion and intent. Now powered by a live database.
          </p>
        </div>
      </section>

      {/* Client-side Catalog Logic */}
      <CatalogList initialProducts={products} categories={categories} />

      {/* Footer */}
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

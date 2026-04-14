import { PrismaClient } from '@prisma/client';
import { MOCK_PRODUCTS } from '../src/lib/mock-data';
import * as dotenv from 'dotenv';
import { PrismaPg } from '@prisma/adapter-pg';
import pg from 'pg';

dotenv.config({ path: '.env.local' });

const pool = new pg.Pool({ connectionString: process.env.DATABASE_URL });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
  console.log('Seeding database...');

  // 1. Clear existing products (optional but good for testing)
  // await prisma.product.deleteMany();

  // 2. Upsert products from mock-data
  for (const product of MOCK_PRODUCTS) {
    await prisma.product.upsert({
      where: { id: product.id },
      update: {
        name: product.name,
        description: product.description,
        price: product.price,
        imageUrl: product.imageUrl,
        stock: product.stock,
        category: product.category,
        isActive: product.isActive,
      },
      create: {
        id: product.id,
        name: product.name,
        description: product.description,
        price: product.price,
        imageUrl: product.imageUrl,
        stock: product.stock,
        category: product.category,
        isActive: product.isActive,
      },
    });
  }

  console.log('Seed completed successfully.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

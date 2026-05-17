import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

// 1. Initialize the Prisma Adapter for PostgreSQL
const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL as string,
});

// 2. Pass the adapter to the PrismaClient constructor
export const db = new PrismaClient({ adapter });

// 3. Re-export all the generated TypeScript types
export * from "@prisma/client";

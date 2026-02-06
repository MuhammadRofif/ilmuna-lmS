import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

declare global {
  var prisma: PrismaClient | undefined;
}

const getPrismaInstance = () => {
  if (global.prisma) {
    return global.prisma;
  }

  try {
    const prismaInstance = new PrismaClient({
      adapter: new PrismaPg({
        connectionString: process.env.DATABASE_URL || "",
      }),
    });

    if (process.env.NODE_ENV !== "production") {
      global.prisma = prismaInstance;
    }

    return prismaInstance;
  } catch (error) {
    // During build/prerender, PrismaClient may fail to initialize
    // Return a dummy object to prevent crashes
    console.warn("Failed to initialize Prisma:", error);
    return null as any;
  }
};

export default getPrismaInstance();

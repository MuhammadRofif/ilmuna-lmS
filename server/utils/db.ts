declare global {
  var prisma: any;
}

let prismaInstance: any = null;
let initPromise: Promise<any> | null = null;

export const getPrismaClient = async () => {
  if (prismaInstance) return prismaInstance;

  if (!initPromise) {
    initPromise = (async () => {
      try {
        const { PrismaClient } = await import("@prisma/client");
        const { PrismaPg } = await import("@prisma/adapter-pg");

        prismaInstance = new PrismaClient({
          adapter: new PrismaPg({
            connectionString: process.env.DATABASE_URL || "",
          }),
        });

        if (process.env.NODE_ENV !== "production") {
          global.prisma = prismaInstance;
        }

        return prismaInstance;
      } catch (error) {
        console.error("Failed to initialize Prisma:", error);
        return null;
      }
    })();
  }

  return initPromise;
};

// Sync version for backwards compatibility - returns undefined until initialized
export default {
  get user() {
    throw new Error(
      "Prisma is not initialized. Use await getPrismaClient() instead",
    );
  },
} as any;

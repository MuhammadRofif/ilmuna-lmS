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
        console.error("Gagal inisialisasi Prisma:", error);
        return null;
      }
    })();
  }

  return initPromise;
};

export default {
  get user() {
    throw new Error(
      "Prisma belum diinisialisasi. Gunakan await getPrismaClient() sebagai gantinya",
    );
  },
} as any;

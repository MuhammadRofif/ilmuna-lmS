declare global {
  var prisma: any;
}

let prismaInstance: any = null;
let initPromise: Promise<any> | null = null;
let initSkipped = false;

export const getPrismaClient = async () => {
  // Skip if already flagged as skipped (during prerender)
  if (initSkipped) {
    console.warn("Prisma init skipped during build phase");
    return null;
  }

  if (prismaInstance) return prismaInstance;

  if (!initPromise) {
    initPromise = (async () => {
      try {
        // Guard: hanya load Prisma kalau bukan build phase
        if (
          typeof process !== "undefined" &&
          process.env.npm_lifecycle_event === "build"
        ) {
          initSkipped = true;
          return null;
        }

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
  user: null,
} as any;

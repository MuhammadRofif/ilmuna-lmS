import { loginSchema } from "~/utils/schemas";

// Lazy import to prevent Prisma loading during build
let getPrismaClient: any;

const loadDb = async () => {
  if (!getPrismaClient) {
    const dbModule = await import("~~/server/utils/db");
    getPrismaClient = dbModule.getPrismaClient;
  }
  return getPrismaClient();
};

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event);
    const { password, email } = loginSchema.parse(body);

    const db = await loadDb();
    if (!db) throw new Error("Database tidak tersedia");

    const existingUser = await db.user.findUnique({
      where: { email },
    });

    if (!existingUser) {
      throw createError({
        statusCode: 400,
        statusMessage: "User Does Not Exist",
      });
    }

    if (existingUser.hashedPassword) {
      const isPasswordCorrect = await verifyPassword(
        existingUser.hashedPassword,
        password,
      );

      if (!isPasswordCorrect) {
        throw createError({
          statusCode: 400,
          statusMessage: "Invalid Credentials",
        });
      }
    }

    const transformedUser = sanitizeUser(existingUser);

    if (transformedUser) {
      await setUserSession(event, { user: transformedUser });
    }

    return transformedUser;
  } catch (error) {
    console.error("Login error:", error);
    throw error;
  }
});

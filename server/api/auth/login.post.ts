import { loginSchema } from "~/utils/schemas";
import { getPrismaClient } from "~~/server/utils/db";

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const { password, email } = loginSchema.parse(body);

  const db = await getPrismaClient();

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
});

import { registerSchema } from "~/utils/schemas";
import db from "~~/server/utils/db";
import { sanitizeUser } from "~~/server/utils/auth";

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const { name, password, email } = registerSchema.parse(body);

  const existingUser = await db.user.findUnique({
    where: { email },
  });

  if (existingUser) {
    throw createError({
      statusCode: 400,
      statusMessage: "User Already Exists",
    });
  }

  const hashedPassword = await hashPassword(password);

  const user = await db.user.create({
    data: {
      name,
      hashedPassword,
      email,
    },
  });

  const transformedUser = sanitizeUser(user);

  if (transformedUser) {
    await setUserSession(event, { user: transformedUser });
  }

  return transformedUser;
});

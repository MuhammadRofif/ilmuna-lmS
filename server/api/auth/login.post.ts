import { loginSchema } from "~/utils/schemas";
import supabase from "~~/server/utils/db-supabase";

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event);
    const { password, email } = loginSchema.parse(body);

    // Query user dari Supabase
    const { data: user, error } = await supabase
      .from("users")
      .select("*")
      .eq("email", email)
      .single();

    if (error || !user) {
      throw createError({
        statusCode: 400,
        statusMessage: "User Does Not Exist",
      });
    }

    if (user.hashedPassword) {
      const isPasswordCorrect = await verifyPassword(
        user.hashedPassword,
        password,
      );

      if (!isPasswordCorrect) {
        throw createError({
          statusCode: 400,
          statusMessage: "Invalid Credentials",
        });
      }
    }

    const transformedUser = sanitizeUser(user);

    if (transformedUser) {
      await setUserSession(event, { user: transformedUser });
    }

    return transformedUser;
  } catch (error) {
    console.error("Login error:", error);
    throw error;
  }
});

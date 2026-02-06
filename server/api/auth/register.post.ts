import { registerSchema } from "~/utils/schemas";
import { getSupabase } from "~~/server/utils/db-supabase";
import { sanitizeUser } from "~~/server/utils/auth";

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event);
    const { name, password, email } = registerSchema.parse(body);

    const supabase = getSupabase();

    // Check if user sudah ada
    const { data: existingUser } = await supabase
      .from("users")
      .select("id")
      .eq("email", email)
      .maybeSingle();

    if (existingUser) {
      throw createError({
        statusCode: 400,
        statusMessage: "User Already Exists",
      });
    }

    const hashedPassword = await hashPassword(password);

    // Insert user baru ke Supabase
    const { data: user, error } = await supabase
      .from("users")
      .insert({
        name,
        email,
        hashedPassword,
      })
      .select()
      .single();

    if (error || !user) {
      throw createError({
        statusCode: 500,
        statusMessage: "Failed to create user",
      });
    }

    const transformedUser = sanitizeUser(user);

    if (transformedUser) {
      await setUserSession(event, { user: transformedUser });
    }

    return transformedUser;
  } catch (error) {
    console.error("Register error:", error);
    throw error;
  }
});

import { z } from "zod";

export const authSchema = z.object({
  email: z.string().email({ message: "Masukkan email yang valid" }),
  password: z.string().min(6, { message: "password minimal 6 karakter " }),
});

export const loginSchema = authSchema;
export const registerSchema = authSchema.extend({
  name: z.string().min(1, { message: "name harus diatas"})
});

export type LoginSchema = z.output<typeof loginSchema>;
export type RegisterSchema = z.output<typeof registerSchema>;

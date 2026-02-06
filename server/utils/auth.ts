import type { User } from "@prisma/client";

export const sanitizeUser = (user: User) => {
  if (!user) return null;

  const { hashedPassword, ...sanitized } = user;

  return sanitized;
};

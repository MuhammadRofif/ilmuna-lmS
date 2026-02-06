import type { User } from "#auth-utils";

export const sanitizeUser = (user: any) => {
  if (!user) return null;

  const { hashedPassword, ...sanitized } = user;

  return sanitized as User;
};

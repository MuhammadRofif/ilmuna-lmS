// shared/types/auth.d.ts
declare module "#auth-utils" {
  interface User {
    id: string;  // uuid
    name: string;
    email: string;
    hashed_password: string;
    created_at: string;  // timestamp
  }

  interface UserSession {
    // Add your own fields
  }

  interface SecureSessionData {
    // Add your own fields
  }
}

export {};

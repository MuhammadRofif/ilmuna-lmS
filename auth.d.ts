// shared/types/auth.d.ts
declare module "#auth-utils" {
  interface User {
    id: String;
    name: String;
    email: String;
    hashedPassword: String;
    createdAt: any;
  }

  interface UserSession {
    // Add your own fields
  }

  interface SecureSessionData {
    // Add your own fields
  }
}

export {};

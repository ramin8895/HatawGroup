import NextAuth from "next-auth";

declare module "next-auth" {
  interface User {
    phone?: string;
    username?: string;
    avatar?: string;
    backendToken?: string;
  }

  interface Session {
    backendToken?: string;
    user: {
      name?: string | null;
      username?: string | null;
      email?: string | null;
      image?: string | null;
      phone?: string | null;
      avatar?: string | null;
    };
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    backendToken?: string;
  }
}

import NextAuth from "next-auth";

declare module "next-auth" {
  interface User {
    phone?: string;
    username?: string;
    avatar?: string;
    backendToken?: string;
    data?: any;
    userRoleId?: string;
    userId?: string;
    userRoleCaption?: string;
  }

  interface Session {
    backendToken?: string;
    userRoleId?: string;
    userId?: string;
    userRoleCaption?: string;
    user: {
      id?: string | null;
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
    userId?: string;
    userRoleId?: string;
    userRoleCaption?: string;
  }
}

import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { LoginByUsername } from "../../../../api/authServices/authServices";
const handler = NextAuth({
  providers: [
    // 🔹 Google Login
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),

    // 🔹 Email / Password Login
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        username: { label: "Username", type: "username" },
        password: { label: "Password", type: "password" },
        Phonenumber: { label: "Phone Number", type: "phone" },
        captcha: { label: "captcha", type: "captcha" },
      },
      async authorize(credentials) {
        // بررسی reCAPTCHA v3 در backend
        // const recaptchaRes = await fetch(
        //   `https://www.google.com/recaptcha/api/siteverify?secret=${process.env.RECAPTCHA_SECRET_KEY}&response=${credentials?.recaptchaToken}`,
        //   { method: "POST" }
        // );
        // const recaptchaData = await recaptchaRes.json();
        // if (!recaptchaData.success || recaptchaData.score < 0.5) {
        //   // reject if score پایین است
        //   throw new Error("CAPTCHA failed");
        // }

        // login واقعی با backend

        // const res = await fetch(
        //   `${process.env.NEXT_PUBLIC_BASE_URL_DIST_PROD}/Account/LoginRegisterUsername`,
        //   {
        //     method: "POST",
        //     headers: { "Content-Type": "application/json" },
        //     body: JSON.stringify({
        //       Phonenumber: "09145275658",
        //       username: credentials?.username,
        //       password: credentials?.password,
        //     }),
        //   }
        // );

        const res = await LoginByUsername({
          username: credentials?.username,
          password: credentials?.password,
          Phonenumber: credentials?.password || "09145275658",
          captcha: credentials?.captcha || "2151",
        });

        if (!res) {
          return null; // ⬅️ خیلی مهم
        }

        const data = await res.data;
        console.log(res.data);
        
        return {
          id: data.userId || data.id,
          name: data.name,
          email: data.email,
          phonenumber: data.phonenumber,
          backendToken: data.userToken,
        };
      },
    }),
  ],

  session: {
    strategy: "jwt",
  },

  callbacks: {
    // 🔹 فقط برای Google
    async signIn({ user, account }) {
      if (account?.provider !== "google") return true;

      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_BASE_URL_DIST_PROD}/Account/LoginRegisterEmail`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              name: user.name,
              email: user.email,
              avatar: user.image,
              provider: "google",
              provider_id: account.providerAccountId,
            }),
          }
        );

        const data = await res.json();
        user.backendToken = data.token;
        return true;
      } catch (err) {
        console.log("Google login backend error:", err);
        return false;
      }
    },

    async jwt({ token, user }) {
      if (user?.backendToken) {
        token.backendToken = user.backendToken;
      }
      return token;
    },

    async session({ session, token }) {
      if (token?.backendToken) {
        session.backendToken = token.backendToken;
      }
      return session;
    },
  },

  pages: {
    signIn: "/login",
  },
});

export { handler as GET, handler as POST };

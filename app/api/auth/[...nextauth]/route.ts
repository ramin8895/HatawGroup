import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],

  session: {
    strategy: "jwt",
  },

  callbacks: {
    // بعد از لاگین (گوگل → بک‌اند خودت)
    async signIn({ user, account, profile }) {
      try {
        // ارسال user info به بک‌اند خودت
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_BASE_URL_DIST_PROD}/Account/LoginRegister`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              name: user.name,
              username: user.username,
              email: user.email,
              avatar: user.image,
              phone: user.phone,
              provider: "google",
              provider_id: account?.providerAccountId,
            }),
          }
        );

        const data = await res.json();
        console.log("ssss",res.json());
        // JWT بک‌اند
        user.backendToken = data.token;

        return true;
      } catch (err) {
        console.log("Google login backend error:", err);
        return false;
      }
    },

    // مقدار backendToken را داخل JWT ذخیره می‌کنیم
    async jwt({ token, user }) {
      if (user?.backendToken) {
        token.backendToken = user.backendToken;
      }
      return token;
    },

    // مقدار JWT را داخل Session سمت کلاینت ارسال می‌کنیم
    async session({ session, token }) {
      if (token?.backendToken) {
        session.backendToken = token.backendToken;
      }
      return session;
    },
  },
});

export { handler as GET, handler as POST };

"use client";

import { useState, useEffect } from "react";
import { signIn } from "next-auth/react";
import { FcGoogle } from "react-icons/fc";

export default function LoginPage() {
  const [tab, setTab] = useState<"email" | "google">("email");
  const [userData, setUserData] = useState({
    email: "",
    password: "",
    username: "",
    phonenumber: "",
  });
  const [recaptchaReady, setRecaptchaReady] = useState(false);

  // لود reCAPTCHA v3
  // useEffect(() => {
  //   const script = document.createElement("script");
  //   script.src = `https://www.google.com/recaptcha/api.js?render=${process.env
  //     .NEXT_PUBLIC_RECAPTCHA_SITE_KEY!}`;
  //   script.async = true;
  //   script.onload = () => setRecaptchaReady(true);
  //   document.body.appendChild(script);
  // }, []);
  const handleEmailLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    // if (!recaptchaReady) {
    //   alert("لطفاً چند لحظه صبر کنید تا CAPTCHA آماده شود");
    //   return;
    // }

    // گرفتن token reCAPTCHA
    // @ts-ignore
    // const token = await grecaptcha.execute(
    //   process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY!,
    //   { action: "login" }
    // );

    // ارسال به NextAuth Credentials
    await signIn("credentials", {
      username: userData.username,
      password: userData.password,
      Phonenumber: userData.phonenumber,
      captcha:"1234",
      callbackUrl: "/",
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-background to-muted px-4!">
      <div className="w-full max-w-md rounded-2xl border border-[#d4af3733] bg-[#ffffff08] shadow-lg p-8! backdrop-blur">
        {/* Header */}
        <div className="text-center mb-6!">
          <h1 className="text-2xl font-bold text-foreground">
            ورود به حساب کاربری
          </h1>
          <p className="text-sm text-muted-foreground mt-2!">
            روش ورود را انتخاب کنید
          </p>
        </div>

        {/* Tabs */}
        <div className="flex mb-6! rounded-xl border border-[#d4af3733] overflow-hidden">
          <button
            onClick={() => setTab("email")}
            className={`flex-1 py-2! text-sm transition ${
              tab === "email"
                ? "bg-[#d4af37]/20 text-foreground"
                : "text-muted-foreground hover:bg-[#ffffff0a]"
            }`}
          >
            نام کاربری
          </button>
          <button
            onClick={() => setTab("google")}
            className={`flex-1 py-2! text-sm transition ${
              tab === "google"
                ? "bg-[#d4af37]/20 text-foreground"
                : "text-muted-foreground hover:bg-[#ffffff0a]"
            }`}
          >
            گوگل
          </button>
        </div>
        {/* Email Login */}
        {tab === "email" && (
          <form className="space-y-4!" onSubmit={handleEmailLogin}>
            <input
              value={userData.username}
              onChange={(e) =>
                setUserData({ ...userData, username: e.target.value })
              }
              placeholder="نام کاربری"
              className="w-full rounded-xl bg-background/40 border border-border px-4! py-3! text-sm outline-none focus:border-[#d4af37]"
              required
            />
            <input
              type="password"
              value={userData.password}
              onChange={(e) =>
                setUserData({ ...userData, password: e.target.value })
              }
              placeholder="رمز عبور"
              className="w-full rounded-xl bg-background/40 border border-border px-4! py-3! text-sm outline-none focus:border-[#d4af37]"
              required
            />
            <input
              value={userData.phonenumber}
              onChange={(e) =>
                setUserData({ ...userData, phonenumber: e.target.value })
              }
              placeholder=" phonenumber"
              className="w-full rounded-xl bg-background/40 border border-border px-4! py-3! text-sm outline-none focus:border-[#d4af37]"
              required
            />
            <button
              type="submit"
              className="w-full rounded-xl bg-[#d4af37] py-3! text-sm font-medium text-black transition hover:opacity-90"
            >
              ورود
            </button>
          </form>
        )}

        {/* Google Login */}
        {tab === "google" && (
          <button
            onClick={() => signIn("google", { callbackUrl: "/" })}
            className="flex items-center justify-center gap-3! w-full rounded-xl border border-border bg-background/40 px-4! py-3! text-sm font-medium transition hover:bg-muted"
          >
            <FcGoogle className="text-xl" />
            ورود با گوگل
          </button>
        )}

        {/* Footer */}
        <p className="mt-6! text-center text-xs text-muted-foreground">
          با ورود، قوانین و شرایط استفاده را می‌پذیرید
        </p>
      </div>
    </div>
  );
}

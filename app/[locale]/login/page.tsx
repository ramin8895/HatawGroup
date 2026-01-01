"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { FcGoogle } from "react-icons/fc";
import {
  User,
  Lock,
  Phone,
  Mail,
  LogIn,
  UserPlus,
  ArrowLeft,
} from "lucide-react";
import { motion } from "framer-motion";
import { useLocale, useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import InputField from "@/components/InputField/InputField";

export default function AuthPage() {
  const t = useTranslations("Auth");
  const locale = useLocale();
  const isRtl = locale === "fa" || locale === "ku";
  const router = useRouter();

  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);
  const [userData, setUserData] = useState({
    email: "",
    username: "",
    password: "",
    phonenumber: "",
  });

  const inputClass = `w-full! bg-[#1A1A1A]! border! border-[#E0E0E0]/5! rounded-[1.2rem]! py-4.5! ${
    isRtl ? "pr-14! pl-5!" : "pl-14! pr-5!"
  } text-white! outline-none! focus:border-[#D4AF37]/50! transition-all! placeholder:text-[#E0E0E0]/10!`;

  const iconClass = `absolute! ${
    isRtl ? "right-5!" : "left-5!"
  } top-1/2! -translate-y-1/2! text-[#E0E0E0]/20! group-focus-within:text-[#D4AF37]! transition-colors!`;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    if (isLogin) {
      await signIn("credentials", {
        email: userData.email,
        password: userData.password,
        callbackUrl: "/dashboard",
      });
    } else {
           await signIn("credentials", {
        email: userData.email,
        password: userData.password,
        username: userData.username,
        phonenumber: userData.phonenumber,
        callbackUrl: "/dashboard",
      });
    }

    setLoading(false);
  };

  return (
    <div
      className="min-h-screen! flex! items-center! justify-center! bg-[#121212]! px-4! py-12! relative! overflow-hidden!"
      dir={isRtl ? "rtl" : "ltr"}
    >
      <motion.div
        animate={{ scale: isLogin ? 1 : 1.2, opacity: isLogin ? 0.3 : 0.5 }}
        className={`absolute! -top-10! ${
          isRtl ? "-left-10!" : "-right-10!"
        } w-3/5! h-3/5! bg-[#D4AF37]/10! blur-[120px]! rounded-full!`}
      />

      <div className="w-full! max-w-[460px]! z-10!">
        <motion.div className="bg-white/[0.02]! border! border-white/10! backdrop-blur-3xl! rounded-[3rem]! p-6! md:p-10! shadow-2xl!">
          {/* Header */}
          <div className="text-center! mb-8!">
            <motion.div
              key={isLogin ? "login" : "signup"}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="inline-flex! p-3! rounded-2xl! mb-4! bg-[#D4AF37]/10! text-[#D4AF37]! border! border-[#D4AF37]/20!"
            >
              {isLogin ? <LogIn size={28} /> : <UserPlus size={28} />}
            </motion.div>

            <h1 className="text-3xl! font-black! text-white! mb-2!">
              {isLogin ? t("loginTitle") : t("signupTitle")}
            </h1>
            <p className="text-white/40! text-sm!">
              {isLogin ? t("loginDesc") : t("signupDesc")}
            </p>
          </div>

          {/* Form */}
          <form className="space-y-4!" onSubmit={handleSubmit}>
            <InputField
              icon={User}
              inputClass={inputClass}
              iconClass={iconClass}
              placeholder={t("username")}
              value={userData.username}
              onChange={(e: any) =>
                setUserData({ ...userData, username: e.target.value })
              }
            />

            {!isLogin && (
              <>
                <InputField
                  icon={Mail}
                  inputClass={inputClass}
                  iconClass={iconClass}
                  type="email"
                  placeholder={t("email")}
                  value={userData.email}
                  onChange={(e: any) =>
                    setUserData({ ...userData, email: e.target.value })
                  }
                />

                <InputField
                  icon={Phone}
                  inputClass={inputClass}
                  iconClass={iconClass}
                  placeholder={t("phone")}
                  value={userData.phonenumber}
                  onChange={(e: any) =>
                    setUserData({
                      ...userData,
                      phonenumber: e.target.value,
                    })
                  }
                />
              </>
            )}

            <InputField
              icon={Lock}
              inputClass={inputClass}
              iconClass={iconClass}
              type="password"
              placeholder={t("password")}
              value={userData.password}
              onChange={(e: any) =>
                setUserData({ ...userData, password: e.target.value })
              }
            />

            <button
              disabled={loading}
              className="w-full! py-4.5! bg-[#D4AF37]! text-black! rounded-2xl! font-black! mt-4! hover:brightness-110! active:scale-95! transition-all! flex! justify-center!"
            >
              {loading ? (
                <div className="w-6! h-6! border-2! border-black/20! border-t-black! rounded-full! animate-spin!" />
              ) : isLogin ? (
                t("loginBtn")
              ) : (
                t("signupBtn")
              )}
            </button>
          </form>

          {/* Google Login */}
          {isLogin && (
            <button
              onClick={() => signIn("google", { callbackUrl: "/" })}
              className="w-full! mt-4! flex! items-center! justify-center! gap-3! bg-white/5! border! border-white/10! py-4! rounded-2xl! text-white/80! hover:bg-white/10! transition-all!"
            >
              <FcGoogle size={22} />
              {t("googleBtn")}
            </button>
          )}

          {/* Switch Login / Signup */}
          <div className="mt-8! pt-6! border-t! border-white/5! text-center!">
            <button
              onClick={() => setIsLogin(!isLogin)}
              className="text-white/30! text-sm! hover:text-[#D4AF37]! transition-colors!"
            >
              {isLogin ? (
                <>
                  {t("noAccount")}{" "}
                  <span className="text-[#D4AF37]! font-bold!">
                    {t("createAction")}
                  </span>
                </>
              ) : (
                <>
                  {t("haveAccount")}{" "}
                  <span className="text-[#D4AF37]! font-bold!">
                    {t("loginAction")}
                  </span>
                </>
              )}
            </button>
          </div>
        </motion.div>

        {/* Back */}
        <button
          onClick={() => router.push("/")}
          className="mt-8! flex! items-center! gap-2! mx-auto! text-white/20! hover:text-[#D4AF37]! text-xs! font-bold! transition-colors!"
        >
          <ArrowLeft size={14} className={isRtl ? "" : "rotate-180"} />
          {t("back")}
        </button>
      </div>
    </div>
  );
}

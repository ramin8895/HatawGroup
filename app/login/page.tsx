"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { FcGoogle } from "react-icons/fc";
import { User, Lock, Phone, Mail, LogIn, UserPlus, ArrowLeft, Sparkles } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);
  const [userData, setUserData] = useState({
    email: "",
    username: "",
    password: "",
    phonenumber: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    if (isLogin) {
      await signIn("credentials", {
        username: userData.username,
        password: userData.password,
        callbackUrl: "/dashboard",
      });
    } else {
      console.log("Signing up...", userData);
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen! flex! items-center! justify-center! bg-[#030712]! px-4! relative! overflow-hidden! font-sans" dir="rtl">
      {/* Background Glows */}
      <motion.div 
        animate={{ 
          scale: isLogin ? 1 : 1.2,
          opacity: isLogin ? 0.4 : 0.6 
        }}
        className="absolute! top-[-10%]! left-[-10%]! w-[50%]! h-[50%]! bg-indigo-600/20! blur-[120px]! rounded-full! pointer-events-none!" 
      />
      
      <div className="w-full! max-w-[480px]! z-10! relative!">
        {/* Glow behind the card */}
        <div className={`absolute! -inset-1! bg-linear-to-r ${isLogin ? 'from-indigo-500/20 to-purple-500/20' : 'from-emerald-500/20 to-teal-500/20'} blur-xl! rounded-[3rem]!`} />

        <motion.div 
          layout
          className="bg-white/[0.02]! border! border-white/10! backdrop-blur-3xl! rounded-[3rem]! p-8! md:p-12! shadow-2xl! relative! overflow-hidden!"
        >
          {/* Header Section */}
          <div className="text-center! mb-10!">
            <AnimatePresence mode="wait">
              <motion.div
                key={isLogin ? "login-icon" : "signup-icon"}
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                exit={{ scale: 0, rotate: 180 }}
                className={`inline-flex! p-4! rounded-3xl! mb-4! border! ${
                  isLogin ? "bg-indigo-600/10! border-indigo-500/20!" : "bg-emerald-600/10! border-emerald-500/20!"
                }`}
              >
                {isLogin ? (
                  <LogIn className="text-indigo-400" size={32} />
                ) : (
                  <UserPlus className="text-emerald-400" size={32} />
                )}
              </motion.div>
            </AnimatePresence>

            <motion.h1 
              layout
              className="text-3xl! font-black! text-white! tracking-tight!"
            >
              {isLogin ? "بەخێرهاتنەوە" : "دروستکردنی هەژمار"}
            </motion.h1>
            <p className="text-slate-500! mt-2! font-medium!">
              {isLogin ? "بۆ چوونە ژوورەوە زانیارییەکانت بنووسە" : "ببەرە ئەندامی خێزانی HATAW"}
            </p>
          </div>

          {/* Form */}
          <form className="space-y-4!" onSubmit={handleSubmit}>
            <AnimatePresence mode="popLayout">
              {/* Username Field */}
              <motion.div layout className="relative! group!">
                <User className={`absolute! right-4! top-1/2! -translate-y-1/2! text-slate-500! transition-colors! ${isLogin ? 'group-focus-within:text-indigo-400!' : 'group-focus-within:text-emerald-400!'}`} size={20} />
                <input
                  value={userData.username}
                  onChange={(e) => setUserData({ ...userData, username: e.target.value })}
                  placeholder="ناوی بەکارهێنەر"
                  className="w-full! bg-white/[0.03]! border! border-white/10! rounded-2xl! py-4! pr-12! pl-4! text-white! outline-none! focus:bg-white/[0.07]! transition-all! placeholder:text-slate-600!"
                  style={{ borderColor: isLogin ? 'initial' : '' }} // Dynamic focus border via CSS
                  required
                />
              </motion.div>

              {/* Email & Phone (Signup Only) */}
              {!isLogin && (
                <>
                  <motion.div 
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="relative! group!"
                  >
                    <Mail className="absolute! right-4! top-1/2! -translate-y-1/2! text-slate-500! group-focus-within:text-emerald-400!" size={20} />
                    <input
                      type="email"
                      placeholder="ئیمەیڵ"
                      className="w-full! bg-white/[0.03]! border! border-white/10! rounded-2xl! py-4! pr-12! pl-4! text-white! outline-none! focus:border-emerald-500/50! transition-all! placeholder:text-slate-600!"
                      required
                    />
                  </motion.div>

                  <motion.div 
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="relative! group!"
                  >
                    <Phone className="absolute! right-4! top-1/2! -translate-y-1/2! text-slate-500! group-focus-within:text-emerald-400!" size={20} />
                    <input
                      placeholder="ژمارەی مۆبایل"
                      className="w-full! bg-white/[0.03]! border! border-white/10! rounded-2xl! py-4! pr-12! pl-4! text-white! outline-none! focus:border-emerald-500/50! transition-all! placeholder:text-slate-600!"
                      required
                    />
                  </motion.div>
                </>
              )}

              {/* Password Field */}
              <motion.div layout className="relative! group!">
                <Lock className={`absolute! right-4! top-1/2! -translate-y-1/2! text-slate-500! transition-colors! ${isLogin ? 'group-focus-within:text-indigo-400!' : 'group-focus-within:text-emerald-400!'}`} size={20} />
                <input
                  type="password"
                  value={userData.password}
                  onChange={(e) => setUserData({ ...userData, password: e.target.value })}
                  placeholder="وشەی نهێنی"
                  className="w-full! bg-white/[0.03]! border! border-white/10! rounded-2xl! py-4! pr-12! pl-4! text-white! outline-none! transition-all! placeholder:text-slate-600!"
                  required
                />
              </motion.div>
            </AnimatePresence>

            <motion.button
              layout
              type="submit"
              disabled={loading}
              className={`w-full! py-4! rounded-2xl! font-black! text-lg! transition-all! shadow-xl! active:scale-[0.98]! flex! items-center! justify-center! gap-2! mt-4! ${
                isLogin 
                  ? "bg-indigo-600! hover:bg-indigo-500! text-white! shadow-indigo-600/20!" 
                  : "bg-emerald-600! hover:bg-emerald-500! text-white! shadow-emerald-600/20!"
              }`}
            >
              {loading ? "چاوەڕوانبە..." : isLogin ? "چوونە ژوورەوە" : "تۆمارکردن"}
            </motion.button>
          </form>

          {/* Google Login (Login Only) */}
          <AnimatePresence>
            {isLogin && (
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                className="mt-4!"
              >
                <button
                  onClick={() => signIn("google", { callbackUrl: "/" })}
                  className="w-full! flex! items-center! justify-center! gap-4! bg-white/5! border! border-white/10! text-white! py-4! rounded-2xl! font-bold! hover:bg-white/10! transition-all!"
                >
                  <FcGoogle size={22} /> بەردەوامبە لەگەڵ گوگڵ
                </button>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Toggle Switch */}
          <motion.div layout className="mt-10! text-center! border-t! border-white/5! pt-6!">
            <button 
              onClick={() => setIsLogin(!isLogin)}
              className="text-slate-400! text-sm! font-medium! hover:text-white! transition-colors! flex! items-center! justify-center! gap-2! mx-auto!"
            >
              {isLogin ? (
                <>هێشتا هەژمارت نییە؟ <span className="text-indigo-400! font-bold! italic! underline! underline-offset-4!">دروستی بکە</span></>
              ) : (
                <>پێشتر هەژمارت دروست کردووە؟ <span className="text-emerald-400! font-bold! italic! underline! underline-offset-4!">بچۆ ژوورەوە</span></>
              )}
            </button>
          </motion.div>
        </motion.div>

        {/* Footer Link */}
        <motion.div layout className="mt-8! text-center!">
          <button 
            onClick={() => window.history.back()} 
            className="group! text-slate-600! hover:text-slate-400! text-sm! flex! items-center! gap-2! mx-auto! transition-colors! font-bold!"
          >
            گەڕانەوە بۆ پێشوو <ArrowLeft size={16} className="group-hover:translate-x-1! transition-transform!" />
          </button>
        </motion.div>
      </div>
    </div>
  );
}
"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { FcGoogle } from "react-icons/fc";
import { User, Lock, Phone, Mail, LogIn, UserPlus, ArrowLeft } from "lucide-react";
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
    <div className="min-h-screen! flex! items-start! md:items-center! justify-center! bg-[#121212]! px-4! pt-24! pb-12! relative! overflow-hidden! font-sans selection:bg-[#D4AF37]/30" dir="rtl">
      
      {/* Background Glows (Luxury Theme) */}
      <motion.div 
        animate={{ 
          scale: isLogin ? 1 : 1.3,
          opacity: isLogin ? 0.3 : 0.5 
        }}
        transition={{ duration: 1 }}
        className="absolute! top-[-10%]! left-[-10%]! w-[60%]! h-[60%]! bg-[#D4AF37]/10! blur-[120px]! rounded-full! pointer-events-none!" 
      />
      
      <div className="w-full! max-w-[480px]! z-10! relative!">
        {/* Glow behind the card */}
        <div className="absolute! -inset-2! bg-[#D4AF37]/5! blur-[60px]! rounded-[4rem]! pointer-events-none" />

        <motion.div 
          layout
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-[#FFFFFF]/[0.02]! border! border-[#E0E0E0]/10! backdrop-blur-3xl! rounded-[3.5rem]! p-10! md:p-14! shadow-[0_30px_60px_-15px_rgba(0,0,0,0.5)]! relative! overflow-hidden!"
        >
          {/* Header Section */}
          <div className="text-center! mb-12!">
            <AnimatePresence mode="wait">
              <motion.div
                key={isLogin ? "login-icon" : "signup-icon"}
                initial={{ scale: 0, rotate: -45 }}
                animate={{ scale: 1, rotate: 0 }}
                exit={{ scale: 0, rotate: 45 }}
                className="inline-flex! p-5! rounded-[1.8rem]! mb-6! bg-[#D4AF37]/10! border! border-[#D4AF37]/30! text-[#D4AF37]! shadow-[0_0_20px_rgba(212,175,55,0.15)]!"
              >
                {isLogin ? <LogIn size={32} /> : <UserPlus size={32} />}
              </motion.div>
            </AnimatePresence>

            <motion.h1 
              layout
              className="text-4xl! font-black! text-white! tracking-tighter! mb-3!"
            >
              {isLogin ? "بەخێرهاتنەوە" : "دروستکردنی هەژمار"}
            </motion.h1>
            <p className="text-[#E0E0E0]/40! font-medium! text-sm!">
              {isLogin ? "بۆ چوونە ژوورەوە زانیارییەکانت بنووسە" : "ببەرە ئەندامی خێزانی Hataw Group"}
            </p>
          </div>

          {/* Form */}
          <form className="space-y-5!" onSubmit={handleSubmit}>
            <AnimatePresence mode="popLayout">
              {/* Username Field */}
              <motion.div layout className="relative! group!">
                <User className="absolute! right-5! top-1/2! -translate-y-1/2! text-[#E0E0E0]/20! group-focus-within:text-[#D4AF37]! transition-colors!" size={20} />
                <input
                  value={userData.username}
                  onChange={(e) => setUserData({ ...userData, username: e.target.value })}
                  placeholder="ناوی بەکارهێنەر"
                  className="w-full! bg-[#1A1A1A]! border! border-[#E0E0E0]/5! rounded-[1.2rem]! py-4.5! pr-14! pl-5! text-white! outline-none! focus:border-[#D4AF37]/50! focus:bg-[#1A1A1A]/80! transition-all! placeholder:text-[#E0E0E0]/10!"
                  required
                />
              </motion.div>

              {!isLogin && (
                <>
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="relative! group!"
                  >
                    <Mail className="absolute! right-5! top-1/2! -translate-y-1/2! text-[#E0E0E0]/20! group-focus-within:text-[#D4AF37]!" size={20} />
                    <input
                      type="email"
                      placeholder="ئیمەیڵ"
                      className="w-full! bg-[#1A1A1A]! border! border-[#E0E0E0]/5! rounded-[1.2rem]! py-4.5! pr-14! pl-5! text-white! outline-none! focus:border-[#D4AF37]/50! transition-all! placeholder:text-[#E0E0E0]/10!"
                      required
                    />
                  </motion.div>

                  <motion.div 
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="relative! group!"
                  >
                    <Phone className="absolute! right-5! top-1/2! -translate-y-1/2! text-[#E0E0E0]/20! group-focus-within:text-[#D4AF37]!" size={20} />
                    <input
                      placeholder="ژمارەی مۆبایل"
                      className="w-full! bg-[#1A1A1A]! border! border-[#E0E0E0]/5! rounded-[1.2rem]! py-4.5! pr-14! pl-5! text-white! outline-none! focus:border-[#D4AF37]/50! transition-all! placeholder:text-[#E0E0E0]/10!"
                      required
                    />
                  </motion.div>
                </>
              )}

              <motion.div layout className="relative! group!">
                <Lock className="absolute! right-5! top-1/2! -translate-y-1/2! text-[#E0E0E0]/20! group-focus-within:text-[#D4AF37]! transition-colors!" size={20} />
                <input
                  type="password"
                  value={userData.password}
                  onChange={(e) => setUserData({ ...userData, password: e.target.value })}
                  placeholder="وشەی نهێنی"
                  className="w-full! bg-[#1A1A1A]! border! border-[#E0E0E0]/5! rounded-[1.2rem]! py-4.5! pr-14! pl-5! text-white! outline-none! focus:border-[#D4AF37]/50! transition-all! placeholder:text-[#E0E0E0]/10!"
                  required
                />
              </motion.div>
            </AnimatePresence>

            <motion.button
              layout
              type="submit"
              disabled={loading}
              className="w-full! py-5! bg-[#D4AF37]! text-[#121212]! rounded-[1.2rem]! font-black! text-lg! transition-all! shadow-[0_15px_30px_-5px_rgba(212,175,55,0.3)]! active:scale-95! flex! items-center! justify-center! gap-3! mt-6! hover:bg-[#F5E1A4]!"
            >
              {loading ? (
                <div className="w-6! h-6! border-2! border-[#121212]/30! border-t-[#121212]! rounded-full! animate-spin!" />
              ) : isLogin ? "چوونە ژوورەوە" : "دروستکردنی هەژمار"}
            </motion.button>
          </form>

          {isLogin && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="mt-6!"
            >
              <button
                onClick={() => signIn("google", { callbackUrl: "/" })}
                className="w-full! flex! items-center! justify-center! gap-4! bg-[#FFFFFF]/[0.03]! border! border-[#E0E0E0]/10! text-[#E0E0E0]! py-4.5! rounded-[1.2rem]! font-bold! hover:bg-[#FFFFFF]/[0.08]! hover:text-white! transition-all!"
              >
                <FcGoogle size={24} /> بەردەوامبە لەگەڵ گوگڵ
              </button>
            </motion.div>
          )}

          <motion.div layout className="mt-12! text-center! border-t! border-[#E0E0E0]/5! pt-8!">
            <button 
              onClick={() => setIsLogin(!isLogin)}
              className="text-[#E0E0E0]/30! text-sm! font-bold! hover:text-[#D4AF37]! transition-all! flex! items-center! justify-center! gap-2! mx-auto!"
            >
              {isLogin ? (
                <>هێشتا هەژمارت نییە؟ <span className="text-[#D4AF37]! underline! underline-offset-8! decoration-dotted!">دروستی بکە</span></>
              ) : (
                <>پێشتر هەژمارت دروست کردووە؟ <span className="text-[#D4AF37]! underline! underline-offset-8! decoration-dotted!">بچۆ ژوورەوە</span></>
              )}
            </button>
          </motion.div>
        </motion.div>

        <motion.div layout className="mt-10! text-center!">
          <button 
            onClick={() => window.history.back()} 
            className="group! text-[#E0E0E0]/20! hover:text-[#D4AF37]! text-xs! font-black! flex! items-center! gap-2! mx-auto! transition-all! uppercase! tracking-widest!"
          >
            گەڕانەوە <ArrowLeft size={16} className="group-hover:translate-x-1! transition-transform!" />
          </button>
        </motion.div>
      </div>
    </div>
  );
}
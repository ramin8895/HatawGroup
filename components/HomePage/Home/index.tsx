"use client";
import React from "react";
import { motion, Variants } from "framer-motion";
import { ArrowUpLeft, Trophy, Sparkles, Crown } from "lucide-react";

const HomeSection = () => {
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut",
      },
    },
  };

  return (
    <div
      className="relative min-h-screen! flex items-center justify-center overflow-hidden bg-[#121212]"
      id="home"
    >
      {/* پلت رنگی در المان‌های نوری */}
      {/* Top Left Spotlight - Gold */}
      <div className="absolute top-[-20%]! left-[-10%]! w-[800px]! h-[700px]! bg-[#D4AF37]/10! blur-[160px]! rounded-full! pointer-events-none"></div>

      {/* Bottom Center Spotlight - Gold */}
      <div className="absolute bottom-[-15%]! left-1/2! -translate-x-1/2! w-[600px]! h-[400px]! bg-[#D4AF37]/5! blur-[120px]! rounded-full! pointer-events-none"></div>

      {/* Subtle Pattern Overlay - استفاده از کنتراست بسیار کم برای حس بافت کربن یا چرم */}
      <div className="absolute inset-0! bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-[0.02]! pointer-events-none"></div>

      <motion.div
        className="max-w-6xl! mx-auto! px-6! relative z-10! text-center"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        {/* Badge Indicator - طلایی روی مشکی */}
        <motion.div
          variants={itemVariants}
          className="inline-flex items-center gap-2! px-5! py-2.5! rounded-full! mb-10!"
        >
    
        </motion.div>

        {/* Hero Title - سفید خالص و طلایی متالیک */}
        <motion.h1
          variants={itemVariants}
          className="text-6xl! md:text-[7.5rem]! font-black text-[#FFFFFF] mb-10! leading-[0.9]! tracking-tighter!"
        >
          بازرگانییەکەت بگۆڕە بۆ <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#F5E1A4] via-[#D4AF37] to-[#B8860B] animate-gradient-x">
            براندێکی ئەفسانەیی
          </span>
        </motion.h1>

        {/* Subtext - نقره‌ای متالیک */}
        <motion.p
          variants={itemVariants}
          className="text-[#E0E0E0]/60 text-lg! md:text-2xl! max-w-3xl! mx-auto! leading-relaxed! mb-14! font-medium"
        >
          ناسنامە و شوێنپێدانی ستراتیژیی براند کە تۆ لە بیرناچێت.
          <span className="block mt-4 text-[#D4AF37] italic font-black tracking-wide">
            {" "}
            ئێمە ئیمپراتۆریەتە دیجیتاڵییەکان بنیات دەنێین.{" "}
          </span>
        </motion.p>

        {/* Call to Actions */}
        <motion.div
          variants={itemVariants}
          className="flex flex-col sm:flex-row-reverse items-center justify-center gap-6!"
        >
          {/* Primary Gold Button - مشکی روی طلایی (کنتراست بالا و لوکس) */}
          <motion.a
            href="#award"
            className="group relative px-12! py-6! bg-[#D4AF37] rounded-2xl! overflow-hidden flex items-center gap-3! transition-all duration-300 shadow-[0_15px_30px_rgba(212,175,55,0.25)]"
            whileHover={{ y: -5, scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <div className="absolute inset-0! bg-gradient-to-r from-transparent via-[#FFFFFF]/40 to-transparent -translate-x-full group-hover:animate-shimmer transition-transform duration-1000"></div>
            <Trophy size={22} className="text-[#121212]" />
            <span className="text-[#121212] font-black text-xl!">
              بەشداری خەڵاتی Hataw بکە
            </span>
          </motion.a>

          {/* Secondary Black Button - سفید روی مشکی با بردر نقره‌ای/طلایی */}
          <motion.a
            href="#services"
            className="group px-12! py-6! bg-transparent border border-[#E0E0E0]/20 rounded-2xl! flex items-center gap-3! hover:bg-[#FFFFFF]/5 hover:border-[#D4AF37]/50 transition-all duration-300 backdrop-blur-md"
            whileHover={{ y: -5 }}
            whileTap={{ scale: 0.98 }}
          >
            <span className="text-[#FFFFFF] font-bold text-lg!">
              خزمەتگوزارییەکان
            </span>
            <ArrowUpLeft
              size={20}
              className="text-[#D4AF37] group-hover:translate-x-[-3px] group-hover:translate-y-[-3px] transition-transform"
            />
          </motion.a>
        </motion.div>

        {/* Scroll Indicator - نقره‌ای و طلایی */}
        <motion.div
          variants={itemVariants}
          className="mt-32! flex flex-col items-center gap-4!"
        >
          <p className="text-[10px]! font-black uppercase tracking-[0.6em] text-[#E0E0E0]/30">
            Explore Heritage
          </p>
          <div className="h-20! w-[1px]! bg-gradient-to-b from-[#D4AF37] via-[#D4AF37]/20 to-transparent relative">
            <motion.div
              animate={{ y: [0, 50, 0], opacity: [0, 1, 0] }}
              transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
              className="absolute top-0! left-[-1.5px]! w-1! h-2! bg-[#FFFFFF] rounded-full shadow-[0_0_10px_#D4AF37]"
            ></motion.div>
          </div>
        </motion.div>
      </motion.div>

      <style jsx global>{`
        @keyframes shimmer {
          100% { transform: translateX(100%); }
        }
        .animate-shimmer {
          animation: shimmer 2s infinite;
        }
        @keyframes gradient-x {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        .animate-gradient-x {
          background-size: 200% 200%;
          animation: gradient-x 8s ease infinite;
        }
      `}</style>
    </div>
  );
};

export default HomeSection;
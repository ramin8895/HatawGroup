"use client";
import React from "react";
import { motion, Variants } from "framer-motion";
import { ArrowUpLeft, Trophy, Sparkles } from "lucide-react";

const HomeSection = () => {
  // تعریف تایپ Variants برای جلوگیری از خطای TypeScript
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { 
        staggerChildren: 0.2, 
        delayChildren: 0.3 
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
        ease: "easeOut" // حالا TypeScript این مقدار را به درستی می‌شناسد
      } 
    },
  };

  return (
    <div 
      className="relative min-h-screen! flex items-center justify-center overflow-hidden bg-[#030712]" 
      id="home"
    >
      {/* --- المان‌های نوری پس‌زمینه --- */}
      <div className="absolute top-[-10%]! left-[-10%]! w-[600px]! h-[600px]! bg-indigo-600/20! blur-[140px]! rounded-full! pointer-events-none"></div>
      <div className="absolute bottom-[-10%]! right-[-10%]! w-[500px]! h-[500px]! bg-purple-600/10! blur-[120px]! rounded-full! pointer-events-none"></div>
      
      <div className="absolute inset-0! bg-[url('https://www.transparenttextures.com/patterns/grid-me.png')] opacity-[0.03]! pointer-events-none"></div>

      <motion.div
        className="max-w-6xl! mx-auto! px-6! relative z-10! text-center"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        <motion.div 
          variants={itemVariants}
          className="inline-flex items-center gap-2! px-4! py-2! rounded-full! bg-white/5! border border-white/10! backdrop-blur-md mb-8!"
        >
          <Sparkles size={16} className="text-indigo-400" />
          <span className="text-xs! font-black tracking-[0.2em] text-slate-300 uppercase">
            Hataw Branding Agency 2025
          </span>
        </motion.div>

        <motion.h1 
          variants={itemVariants}
          className="text-5xl! md:text-8xl! font-black text-white mb-8! leading-[1.1]! tracking-tighter!"
        >
          بازرگانییەکەت بگۆڕە بۆ <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-400 to-indigo-400 animate-gradient-x">
            براندێکی ئەفسانەیی
          </span>
        </motion.h1>

        <motion.p 
          variants={itemVariants}
          className="text-slate-400 text-lg! md:text-xl! max-w-3xl! mx-auto! leading-relaxed! mb-12! font-light text-center"
        >
          ناسنامە و شوێنپێدانی ستراتیژیی براند کە تۆ لە بیرناچێت.
          <span className="text-white font-medium"> ئێمە تەنها لۆگۆ دیزاین ناکەین؛ </span> 
          ئێمە ئیمپراتۆریەتە دیجیتاڵییەکان بنیات دەنێین.
        </motion.p>

        <motion.div 
          variants={itemVariants}
          className="flex flex-col sm:flex-row-reverse items-center justify-center gap-6!"
        >
          <motion.a
            href="#award"
            className="group relative px-10! py-5! bg-indigo-600 rounded-2xl! overflow-hidden flex items-center gap-3! transition-all duration-300 shadow-2xl shadow-indigo-600/20"
            whileHover={{ y: -5, scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            {/* درخشش متحرک داخل دکمه */}
            <div className="absolute inset-0! bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:animate-shimmer transition-transform duration-1000"></div>
            <Trophy size={20} className="text-white" />
            <span className="text-white font-black text-lg!">بەشداری خەڵاتی Hataw بکە</span>
          </motion.a>

          <motion.a
            href="#services"
            className="group px-10! py-5! bg-white/5 border border-white/10 rounded-2xl! flex items-center gap-3! hover:bg-white/10 transition-all duration-300 backdrop-blur-md"
            whileHover={{ y: -5 }}
            whileTap={{ scale: 0.98 }}
          >
            <span className="text-white font-bold">خزمەتگوزارییەکان ببینە</span>
            <ArrowUpLeft size={20} className="text-slate-400 group-hover:text-indigo-400 transition-colors" />
          </motion.a>
        </motion.div>

        <motion.div 
          variants={itemVariants}
          className="mt-24! pt-12! border-t border-white/5! flex flex-col items-center gap-4!"
        >
          <p className="text-[10px]! font-black uppercase tracking-[0.4em] text-slate-500">Scroll to Explore</p>
          <motion.div 
            animate={{ y: [0, 10, 0] }} 
            transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
            className="w-[1px]! h-12! bg-gradient-to-b from-indigo-500 to-transparent"
          ></motion.div>
        </motion.div>
      </motion.div>

      {/* استایل‌های مورد نیاز برای انیمیشن‌های سفارشی */}
      <style jsx global>{`
        @keyframes shimmer {
          100% { transform: translateX(100%); }
        }
        .animate-shimmer {
          animation: shimmer 1.5s infinite;
        }
        @keyframes gradient-x {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        .animate-gradient-x {
          background-size: 200% 200%;
          animation: gradient-x 5s ease infinite;
        }
      `}</style>
    </div>
  );
};

export default HomeSection;
"use client";
import React from "react";
import { motion, Variants } from "framer-motion";
import { ArrowUpLeft, ArrowUpRight, Trophy } from "lucide-react";
import ButtonComponents from "@/components/ButtonComponents";

const HomeSection = ({ locale, translations }: any) => {
  const isRtl = locale === "ku";
  const { Hero = {} } = translations;

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
      {/* Background Effects */}
      <div className="absolute top-[-20%]! left-[-10%]!  w-[800px]! h-[700px]! bg-[#D4AF37]/10! blur-[160px]! rounded-full! pointer-events-none"></div>
      <div className="absolute bottom-[-15%]! left-1/2! -translate-x-1/2! w-[600px]! h-[400px]! bg-[#D4AF37]/5! blur-[120px]! rounded-full! pointer-events-none"></div>

      <motion.div
        className="max-w-7xl! mx-auto! px-6! relative mt-22! z-10! text-center"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        {/* Animated Title - Massive 120px Font with Wave Gradient */}
        <motion.div
          variants={itemVariants}
          className="mb-10! flex justify-center items-center"
        >
          <h1
            className="text-5xl! md:text-[120px]! font-black leading-[1]! tracking-tighter! drop-shadow-[0_10px_30px_rgba(0,0,0,0.5)] inline-block animate-wave-text bg-gradient-to-r from-white via-[#D4AF37] to-white bg-size-[200%_auto]! bg-clip-text text-transparent"
            style={{ animationDuration: "10s" }}
            dir={isRtl ? "rtl" : "ltr"}
          >
            {Hero.title}
          </h1>
        </motion.div>

        <motion.p
          variants={itemVariants}
          className="text-[#b2b2b2] text-lg! md:text-2xl! max-w-3xl! mx-auto! leading-relaxed! mb-14! font-medium"
        >
          {Hero.title1}
          <span className="block text-[24px]! text-[#D4AF37] font-black tracking-[0.2em] mt-4! uppercase">
            {Hero.title2}
          </span>
        </motion.p>

        {/* Buttons */}
        <motion.div
          variants={itemVariants}
          className={`flex flex-col sm:flex-row items-center justify-center gap-6! ${
            isRtl ? "sm:flex-row-reverse" : ""
          }`}
        >
          {/* <motion.a
            href="#award"
            className="group relative px-12! py-6! bg-[#D4AF37] rounded-2xl! overflow-hidden flex items-center gap-3! transition-all duration-300 shadow-[0_20px_40px_rgba(212,175,55,0.2)]"
            whileHover={{ y: -8, scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          > */}
          {/* <div className="absolute inset-0! bg-gradient-to-r from-transparent via-white/40 to-transparent -translate-x-full group-hover:animate-shimmer transition-transform duration-1000"></div>
            <Trophy size={24} className="text-[#121212]" />
            <span className="text-[#121212] font-black text-xl! uppercase tracking-tight">
              {Hero.btn1}
            </span> */}

          <ButtonComponents
            Title={Hero.btn1}
            Onclic={() => ""}
            Icon={<Trophy size={24} className="text-[#121212]" />}
          />
          {/* </motion.a> */}

          <motion.a
            href="#services"
            className="group px-12! py-6! bg-transparent border border-[#E0E0E0]/20 rounded-2xl! flex items-center gap-3! hover:bg-white/5 hover:border-[#D4AF37]/50 transition-all duration-300 backdrop-blur-md"
            whileHover={{ y: -8 }}
            whileTap={{ scale: 0.98 }}
          >
            <span className="text-white font-bold text-lg!">{Hero.btn2}</span>
            {isRtl ? (
              <ArrowUpLeft
                size={22}
                className="text-[#D4AF37] group-hover:-translate-x-2 group-hover:-translate-y-2 transition-transform"
              />
            ) : (
              <ArrowUpRight
                size={22}
                className="text-[#D4AF37] group-hover:translate-x-2 group-hover:-translate-y-2 transition-transform"
              />
            )}
          </motion.a>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          variants={itemVariants}
          className="mt-24! flex flex-col items-center gap-4!"
        >
          <p className="text-[10px]! font-black uppercase tracking-[0.8em] text-[#E0E0E0]/20">
            {isRtl ? "بگەڕێ بۆ خوارەوە" : "Scroll to Explore"}
          </p>
          <div className="h-24! w-[1px]! bg-gradient-to-b from-[#D4AF37] via-[#D4AF37]/10 to-transparent relative">
            <motion.div
              animate={{ y: [0, 60, 0], opacity: [0, 1, 0] }}
              transition={{
                repeat: Infinity,
                duration: 2.5,
                ease: "easeInOut",
              }}
              className="absolute top-0! left-[-1.5px]! w-[4px]! h-[4px]! bg-[#D4AF37] rounded-full shadow-[0_0_15px_#D4AF37]"
            />
          </div>
        </motion.div>
      </motion.div>

      <style jsx global>{`
        @keyframes shimmer {
          100% {
            transform: translateX(100%);
          }
        }
        .animate-shimmer {
          animation: shimmer 2s infinite;
        }

        /* انیمیشن موجی روان برای پس‌زمینه متن */
        @keyframes wave {
          to {
            background-position: 200% center;
          }
        }
        .animate-wave-text {
          animation-name: wave;
          animation-timing-function: linear;
          animation-iteration-count: infinite;
          animation-duration: 0.4s;
        }

        .Typewriter__cursor {
          font-weight: 200;
          font-size: 1.1em;
          line-height: 1;
        }
      `}</style>
    </div>
  );
};

export default HomeSection;

"use client";
import React from "react";
import { motion, Variants } from "framer-motion";
import { CheckCircle2, Rocket, Crown } from "lucide-react";

const AboutComponents = () => {
  const container: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 },
    },
  };

  const fadeInUp: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { duration: 0.8, ease: "easeOut" } 
    },
  };

  return (
    <motion.section
      id="about"
      className="relative py-24! md:py-32! bg-[#030712] overflow-hidden"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      variants={container}
    >
      {/* Luxury Gold Background Glows - Adjusted to #D4AF37 */}
      <div className="absolute top-1/2! left-0! -translate-y-1/2! w-[500px]! h-[500px]! bg-[#D4AF37]/5! blur-[140px]! rounded-full! pointer-events-none"></div>
      <div className="absolute top-0! right-0! w-[300px]! h-[300px]! bg-[#D4AF37]/5! blur-[100px]! rounded-full! pointer-events-none"></div>

      <div className="max-w-7xl! mx-auto! px-6! relative z-10!">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16! items-center!">
          
          {/* Image Column - Left */}
          <motion.div
            className="relative group order-2 lg:order-1!"
            variants={fadeInUp}
          >
            <div className="relative rounded-[3rem]! overflow-hidden border border-[#D4AF37]/10! bg-neutral-900/50! p-3! backdrop-blur-sm transition-all duration-500 group-hover:border-[#D4AF37]/40">
              <img
                src="https://images.unsplash.com/photo-1558655146-d09347e92766?q=80&w=800&auto=format&fit=crop"
                alt="Branding Strategy"
                className="w-full! h-[550px]! object-cover rounded-[2.5rem]! grayscale! group-hover:grayscale-0 transition-all duration-1000 group-hover:scale-105"
              />
              
              {/* Floating Gold Experience Card - Luxury Metallic Style */}
              <div className="absolute bottom-10! -right-6! md:right-10! bg-gradient-to-br from-[#D4AF37] via-[#F5E1A4] to-[#B8860B] p-7! rounded-3xl! shadow-[0_20px_50px_rgba(212,175,55,0.3)] hidden md:block!">
                <div className="flex items-center gap-4!">
                  <div className="w-14! h-14! bg-black/10! rounded-2xl! flex items-center justify-center backdrop-blur-md">
                    <Rocket className="text-black" size={28} />
                  </div>
                  <div>
                    <p className="text-black font-black text-3xl! leading-none!">15+</p>
                    <p className="text-black/70 font-bold text-[11px]! uppercase tracking-tighter!">ساڵان ئەزموون</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Decorative Gold Frame */}
            <div className="absolute -top-6! -left-6! w-40! h-40! border-t-2! border-l-2! border-[#D4AF37]/20! rounded-tl-[4rem]! -z-10!"></div>
          </motion.div>

          {/* Text Column - Right */}
          <motion.div className="space-y-8! text-right order-1 lg:order-2!" variants={fadeInUp}>
            <div className="space-y-4!">
              <div className="flex items-center justify-end gap-3!">
                <span className="text-[#D4AF37] text-xs! font-black tracking-[0.3em] uppercase">About Hataw Group</span>
                <span className="w-16! h-[1px]! bg-gradient-to-l from-[#D4AF37] to-transparent"></span>
              </div>
              <h3 className="text-5xl! md:text-6xl! font-black text-white leading-[1.1]!">
                درۆستکردنی براندەکان کە <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-l from-[#F5E1A4] via-[#D4AF37] to-[#B8860B]">بەردەوام دەبن</span>
              </h3>
            </div>

            <p className="text-gray-400 text-xl! leading-relaxed! font-light">
              لە <span className="text-[#D4AF37] font-bold">Hataw Group</span>، باوەڕمان وایە هەموو بازرگانییەک شایەنی ئەوەیە ببێتە براندێکی بەهێز. ڕێبازی ستراتیژیمان توێژینەوەی بازاڕی قووڵ و داهێنانی پیشەیی تێکەڵ دەکات بۆ ئەوەی تۆ لە پێشەنگانی بواری خۆت دابنێین.
            </p>

            {/* Feature List with Gold Icons */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-y-5! gap-x-8! py-6!">
              {[
                "ستراتیژی براندی مۆدێرن",
                "دیزاینی ناسنامەی ناوازە",
                "توێژینەوەی بازاڕی قووڵ",
                "پەرەپێدانی بازرگانی"
              ].map((item, index) => (
                <div key={index} className="flex items-center justify-end gap-3! text-gray-300 group/item">
                  <span className="text-base! font-semibold group-hover/item:text-[#D4AF37] transition-colors">{item}</span>
                  <div className="p-1! rounded-full! bg-[#D4AF37]/10! border border-[#D4AF37]/20!">
                    <CheckCircle2 size={16} className="text-[#D4AF37]" />
                  </div>
                </div>
              ))}
            </div>

            <div className="pt-8!">
              <motion.a
                href="#contact"
                className="group relative inline-flex items-center gap-4! px-12! py-5! bg-gradient-to-r from-[#D4AF37] via-[#F5E1A4] to-[#C19A2E] text-black rounded-2xl! font-black text-lg! shadow-[0_15px_35px_-10px_rgba(212,175,55,0.4)] transition-all overflow-hidden"
                whileHover={{ scale: 1.05, y: -5 }}
                whileTap={{ scale: 0.95 }}
              >
                {/* Button Shine Effect */}
                <div className="absolute inset-0! bg-gradient-to-r from-transparent via-white/40 to-transparent -translate-x-full group-hover:animate-[shimmer_1.5s_infinite] transition-transform"></div>
                گەشتەکەت دەست پێبکە
              </motion.a>
            </div>
          </motion.div>

        </div>
      </div>

      <style jsx global>{`
        @keyframes shimmer {
          100% { transform: translateX(100%); }
        }
      `}</style>
    </motion.section>
  );
};

export default AboutComponents;
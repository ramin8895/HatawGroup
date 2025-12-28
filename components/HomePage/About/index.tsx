"use client";
import React from "react";
import { motion, Variants } from "framer-motion";
import { CheckCircle2, Rocket } from "lucide-react";
import { useTranslations, useLocale } from "next-intl";

const AboutComponents = () => {
  const t = useTranslations("About");
  const locale = useLocale();
  const isRTL = locale === "ku";

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
      className="relative py-24! md:py-32! bg-[#121212] overflow-hidden"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      variants={container}
    >
      <div className="absolute top-1/2! left-0! -translate-y-1/2! w-[500px]! h-[500px]! bg-[#D4AF37]/5! blur-[140px]! rounded-full! pointer-events-none"></div>
      <div className="absolute top-0! right-0! w-[300px]! h-[300px]! bg-[#E0E0E0]/5! blur-[100px]! rounded-full! pointer-events-none"></div>

      <div className="max-w-7xl! mx-auto! px-6! relative z-10!">
        <div className={`grid grid-cols-1 lg:grid-cols-2 gap-16! items-center!`}>
          
          {/* Image Column */}
          <motion.div
            className={`relative group ${isRTL ? "order-2 lg:order-1!" : "order-2!"}`}
            variants={fadeInUp}
          >
            <div className="relative rounded-[3rem]! overflow-hidden border border-[#E0E0E0]/10! bg-[#121212]! p-3! backdrop-blur-sm transition-all duration-500 group-hover:border-[#D4AF37]/40">
              <img
                src="https://images.unsplash.com/photo-1558655146-d09347e92766?q=80&w=800&auto=format&fit=crop"
                alt="Branding Strategy"
                className="w-full! h-[550px]! object-cover rounded-[2.5rem]! grayscale! group-hover:grayscale-0 transition-all duration-1000 group-hover:scale-105 opacity-80 group-hover:opacity-100"
              />
              
              <div className={`absolute bottom-10! ${isRTL ? "-right-6! md:right-10!" : "-left-6! md:left-10!"} bg-gradient-to-br from-[#D4AF37] via-[#F5E1A4] to-[#B8860B] p-7! rounded-3xl! shadow-[0_20px_50px_rgba(212,175,55,0.3)] hidden md:block!`}>
                <div className={`flex items-center gap-4! ${isRTL ? "flex-row" : "flex-row-reverse"}`}>
                  <div className="w-14! h-14! bg-[#121212]/10! rounded-2xl! flex items-center justify-center backdrop-blur-md">
                    <Rocket className="text-[#121212]" size={28} />
                  </div>
                  <div className={isRTL ? "text-right" : "text-left"}>
                    <p className="text-[#121212] font-black text-3xl leading-none!">15+</p>
                    <p className="text-[#121212]/70 font-bold text-[11px] uppercase tracking-tighter!">{t("yearsExp")}</p>
                  </div>
                </div>
              </div>
            </div>
            <div className={`absolute -top-6! ${isRTL ? "-left-6!" : "-right-6!"} w-40! h-40! border-t-2! ${isRTL ? "border-l-2!" : "border-r-2!"} border-[#E0E0E0]/10! group-hover:border-[#D4AF37]/30 transition-colors ${isRTL ? "rounded-tl-[4rem]!" : "rounded-tr-[4rem]!"} -z-10!`}></div>
          </motion.div>

          {/* Text Column */}
          <motion.div className={`space-y-8! ${isRTL ? "text-right order-1 lg:order-2!" : "text-left order-1!"}`} variants={fadeInUp}>
            <div className="space-y-4!">
              <div className={`flex items-center gap-3! ${isRTL ? "justify-end" : "justify-start"}`}>
                {!isRTL && <span className="w-16! h-px! bg-linear-to-r from-[#D4AF37] to-transparent"></span>}
                <span className="text-[#D4AF37] text-xs! font-black tracking-[0.3em] uppercase">{t("badge")}</span>
                {isRTL && <span className="w-16! h-px! bg-linear-to-l from-[#D4AF37] to-transparent"></span>}
              </div>
              <h3 className="text-5xl md:text-6xl! font-black text-[#FFFFFF] leading-[1.1]!">
                {t.rich("title", {
                  br: () => <br />,
                  span: (chunks) => <span className="text-transparent bg-clip-text bg-linear-to-l from-[#E0E0E0] via-[#D4AF37] to-[#E0E0E0]">{chunks}</span>
                })}
              </h3>
            </div>

            <p className="text-[#E0E0E0]/60 text-xl! leading-relaxed! font-light">
              {t.rich("description", {
                bold: (chunks) => <span className="text-[#D4AF37] font-bold">{chunks}</span>
              })}
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-y-5! gap-x-8! py-6!">
              {[t("feat1"), t("feat2"), t("feat3"), t("feat4")].map((item, index) => (
                <div key={index} className={`flex items-center gap-3! text-[#E0E0E0]/80 group/item ${isRTL ? "justify-end" : "justify-start"}`}>
                  {!isRTL && (
                    <div className="p-1! rounded-full! bg-[#D4AF37]/5! border border-[#D4AF37]/10! group-hover:border-[#D4AF37]/40 transition-all">
                      <CheckCircle2 size={16} className="text-[#D4AF37]" />
                    </div>
                  )}
                  <span className="font-semibold group-hover/item:text-[#D4AF37] transition-colors">{item}</span>
                  {isRTL && (
                    <div className="p-1! rounded-full! bg-[#D4AF37]/5! border border-[#D4AF37]/10! group-hover:border-[#D4AF37]/40 transition-all">
                      <CheckCircle2 size={16} className="text-[#D4AF37]" />
                    </div>
                  )}
                </div>
              ))}
            </div>

            <div className="pt-8!">
              <motion.a
                href="#contact"
                className="group relative inline-flex items-center gap-4! px-12! py-5! bg-[#D4AF37] text-[#121212] rounded-2xl! font-black text-lg shadow-[0_15px_35px_-10px_rgba(212,175,55,0.3)] transition-all overflow-hidden"
                whileHover={{ scale: 1.05, y: -5 }}
                whileTap={{ scale: 0.95 }}
              >
                <div className="absolute inset-0! bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:animate-[shimmer_1.5s_infinite] transition-transform"></div>
                {t("cta")}
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
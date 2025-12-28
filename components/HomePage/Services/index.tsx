"use client";
import React from "react";
import { motion, Variants } from "framer-motion";
import { 
  Palette, 
  BarChart3, 
  Lightbulb, 
  Globe, 
  Zap, 
  RefreshCw,
  ArrowUpLeft,
  ArrowUpRight
} from "lucide-react";
import { useTranslations, useLocale } from "next-intl";

const ServiceComponents = () => {
  const t = useTranslations("Services");
  const locale = useLocale();
  const isRTL = locale === "ku";

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { duration: 0.6, ease: "easeOut" } 
    },
  };

  const services = [
    {
      icon: <Palette className="text-[#D4AF37]" size={28} />,
      title: t("items.branding.title"),
      desc: t("items.branding.desc"),
    },
    {
      icon: <BarChart3 className="text-[#D4AF37]" size={28} />,
      title: t("items.strategy.title"),
      desc: t("items.strategy.desc"),
    },
    {
      icon: <Lightbulb className="text-[#D4AF37]" size={28} />,
      title: t("items.consultancy.title"),
      desc: t("items.consultancy.desc"),
    },
    {
      icon: <Globe className="text-[#D4AF37]" size={28} />,
      title: t("items.digital.title"),
      desc: t("items.digital.desc"),
    },
    {
      icon: <Zap className="text-[#D4AF37]" size={28} />,
      title: t("items.experience.title"),
      desc: t("items.experience.desc"),
    },
    {
      icon: <RefreshCw className="text-[#D4AF37]" size={28} />,
      title: t("items.refresh.title"),
      desc: t("items.refresh.desc"),
    },
  ];

  return (
    <section className="py-24! bg-[#121212] relative overflow-hidden" id="services">
      <div className="absolute top-0! right-0! w-[500px]! h-[500px]! bg-[#D4AF37]/5! blur-[120px]! rounded-full! pointer-events-none"></div>
      <div className="absolute bottom-0! left-0! w-[300px]! h-[300px]! bg-[#E0E0E0]/5! blur-[100px]! rounded-full! pointer-events-none"></div>

      <div className="max-w-7xl! mx-auto! px-6! relative z-10!">
        {/* Header */}
        <div className="text-center mb-20!">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="inline-block px-5! py-2! rounded-full! bg-[#D4AF37]/5! border border-[#D4AF37]/20! text-[#D4AF37] text-[10px]! font-black tracking-[0.3em] uppercase mb-6!"
          >
            {t("badge")}
          </motion.div>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl! md:text-6xl! font-black text-[#FFFFFF] mb-6! tracking-tighter!"
          >
            {t("title")}
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-[#E0E0E0]/50 text-lg! max-w-2xl! mx-auto! leading-relaxed!"
          >
            {t("description")}
          </motion.p>
        </div>

        {/* Services Grid */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8!"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {services.map((service, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={{ y: -10 }}
              className="group relative p-10! bg-[#FFFFFF]/[0.02] border border-[#E0E0E0]/5! rounded-[3rem]! overflow-hidden hover:border-[#D4AF37]/30 transition-all duration-500"
            >
              <div className="absolute top-0! left-0! w-40! h-40! bg-[#D4AF37]/5! blur-[60px]! opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              
              <div className={`relative z-10! flex flex-col h-full ${isRTL ? "items-end text-right" : "items-start text-left"}`}>
                <div className="w-16! h-16! bg-[#121212]! rounded-2xl! flex items-center justify-center mb-8! group-hover:scale-110 group-hover:shadow-[0_0_20px_rgba(212,175,55,0.2)] transition-all duration-500 border border-[#E0E0E0]/10 group-hover:border-[#D4AF37]/40">
                  {service.icon}
                </div>
                
                <h3 className="text-2xl! font-bold text-[#FFFFFF] mb-4! group-hover:text-[#D4AF37] transition-colors">
                  {service.title}
                </h3>
                
                <p className="text-[#E0E0E0]/40 leading-relaxed! text-sm! mb-10! font-medium">
                  {service.desc}
                </p>

                <div className={`mt-auto! flex items-center gap-3! text-[#E0E0E0]/30 group-hover:text-[#D4AF37] transition-colors text-[10px]! font-black uppercase tracking-widest ${!isRTL && "flex-row-reverse"}`}>
                  <span>{t("more")}</span>
                  {isRTL ? <ArrowUpLeft size={16} /> : <ArrowUpRight size={16} />}
                </div>
              </div>

              <div className="absolute bottom-0! left-0! right-0! h-[1px]! bg-gradient-to-r from-transparent via-[#D4AF37]/40 to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-700"></div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default ServiceComponents;
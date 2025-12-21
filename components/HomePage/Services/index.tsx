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
  ArrowUpLeft
} from "lucide-react";

const ServiceComponents = () => {
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
      icon: <Palette className="text-indigo-400" size={28} />,
      title: "دیزاینی ناسنامەی براند",
      desc: "سیستەمی تەواوی ناسنامەی بینینی لەوانە دیزاینی لۆگۆ، ڕەنگەکان و فۆنتەکان کە یەکگرتوویی دڵنیادەکاتەوە.",
      color: "from-blue-500/20"
    },
    {
      icon: <BarChart3 className="text-purple-400" size={28} />,
      title: "ستراتیژی براند",
      desc: "توێژینەوەی قووڵی بازاڕ و شوێنپێدانی ستراتیژی بۆ جیاکردنەوەی براندەکەت و دروستکردنی پێشەنگایەتی.",
      color: "from-purple-500/20"
    },
    {
      icon: <Lightbulb className="text-yellow-400" size={28} />,
      title: "ڕاوێژکاری براند",
      desc: "ڕێنمایی پسپۆڕانە لەسەر گەشە و فراوانکردنی براند بۆ ئەوەی یارمەتیت بدەین لە هەنگاوەکانی گەشەدا.",
      color: "from-yellow-500/20"
    },
    {
      icon: <Globe className="text-emerald-400" size={28} />,
      title: "براندی دیجیتاڵ",
      desc: "ئامادەبوونی دیجیتاڵی گشتگیر لەوانە دیزاینی وێبسایت و ستراتیژی تۆڕە کۆمەڵایەتییەکان.",
      color: "from-emerald-500/20"
    },
    {
      icon: <Zap className="text-orange-400" size={28} />,
      title: "ئەزموونی براند",
      desc: "دروستکردنی ئەزموونی بیرلەبەر لە ڕێگەی چیرۆکگێڕان و ستراتیژییەکانی بەشداریکردنی کڕیار.",
      color: "from-orange-500/20"
    },
    {
      icon: <RefreshCw className="text-rose-400" size={28} />,
      title: "نوێکردنەوەی براند",
      desc: "خزمەتگوزارییە تەواوەکانی گۆڕانکاری براند بۆ ئەو بازرگانیانەی کە ئامادەن بۆ پەرەپێدانی گەورە.",
      color: "from-rose-500/20"
    },
  ];

  return (
    <section className="py-24! bg-[#030712] relative overflow-hidden" id="services">
      {/* دکوراسیون پس‌زمینه */}
      <div className="absolute top-0! right-0! w-[500px]! h-[500px]! bg-indigo-600/5! blur-[120px]! rounded-full! pointer-events-none"></div>

      <div className="max-w-7xl! mx-auto! px-6! relative z-10!">
        {/* هدر بخش خدمات */}
        <div className="text-center mb-20!">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="inline-block px-4! py-1! rounded-full! bg-white/5! border border-white/10! text-indigo-400 text-xs! font-black tracking-widest uppercase mb-4!"
          >
            What We Offer
          </motion.div>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl! md:text-6xl! font-black text-white mb-6!"
          >
            خزمەتگوزارییەکانمان
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-slate-400 text-lg! max-w-2xl! mx-auto! leading-relaxed!"
          >
            چارەسەری ستراتیژی براندی گشتگیر کە دروست کراون بۆ بەرزکردنەوەی بازرگانییەکەت بۆ ئاستێکی جیهانی.
          </motion.p>
        </div>

        {/* گرید خدمات */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6!"
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
              className="group relative p-8! bg-white/[0.02] border border-white/5! rounded-[2.5rem]! overflow-hidden hover:bg-white/[0.04] transition-all duration-500"
            >
              {/* افکت نوری گوشه کارت */}
              <div className={`absolute top-0! left-0! w-32! h-32! bg-gradient-to-br ${service.color} blur-[50px]! opacity-0 group-hover:opacity-100 transition-opacity duration-500`}></div>
              
              <div className="relative z-10! flex flex-col items-end text-right">
                <div className="w-16! h-16! bg-white/5! rounded-2xl! flex items-center justify-center mb-6! group-hover:scale-110 group-hover:bg-indigo-600/20 transition-all duration-500">
                  {service.icon}
                </div>
                
                <h3 className="text-xl! font-bold text-white mb-4! group-hover:text-indigo-400 transition-colors">
                  {service.title}
                </h3>
                
                <p className="text-slate-400 leading-relaxed! text-sm! mb-6!">
                  {service.desc}
                </p>

                <div className="mt-auto! flex items-center gap-2! text-white/40 group-hover:text-white transition-colors text-xs! font-bold">
                  <ArrowUpLeft size={16} />
                  <span>زیاتر ببینە</span>
                </div>
              </div>

              {/* خط نازک پایین کارت */}
              <div className="absolute bottom-0! left-0! right-0! h-[2px]! bg-gradient-to-r from-transparent via-indigo-500/50 to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-700"></div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default ServiceComponents;
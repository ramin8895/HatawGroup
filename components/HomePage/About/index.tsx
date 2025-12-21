"use client";
import React from "react";
import { motion, Variants } from "framer-motion";
import { CheckCircle2, Rocket } from "lucide-react";

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
      {/* هاله‌های نوری پس‌زمینه برای عمق دادن به بخش درباره ما */}
      <div className="absolute top-1/2! left-0! -translate-y-1/2! w-[400px]! h-[400px]! bg-indigo-500/10! blur-[120px]! rounded-full! pointer-events-none"></div>

      <div className="max-w-7xl! mx-auto! px-6! relative z-10!">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16! items-center!">
          
          {/* ستون تصویر - سمت چپ (در دسکتاپ) */}
          <motion.div
            className="relative group order-2 lg:order-1!"
            variants={fadeInUp}
          >
            <div className="relative rounded-[3rem]! overflow-hidden border border-white/10! bg-white/5! p-3! backdrop-blur-sm">
              <img
                src="https://images.unsplash.com/photo-1558655146-d09347e92766?q=80&w=800&auto=format&fit=crop"
                alt="Branding Strategy"
                className="w-full! h-[500px]! object-cover rounded-[2.5rem]! grayscale! group-hover:grayscale-0! transition-all duration-700"
              />
              {/* کارت شناور روی تصویر */}
              <div className="absolute bottom-10! -right-6! md:right-10! bg-indigo-600! p-6! rounded-3xl! shadow-2xl! hidden md:block!">
                <div className="flex items-center gap-4!">
                  <div className="w-12! h-12! bg-white/20! rounded-2xl! flex items-center justify-center">
                    <Rocket className="text-white" size={24} />
                  </div>
                  <div>
                    <p className="text-white font-black text-2xl!">15+</p>
                    <p className="text-white/80 text-xs!">ساڵان ئەزموون</p>
                  </div>
                </div>
              </div>
            </div>
            {/* المنت تزئینی پشت تصویر */}
            <div className="absolute -top-10! -left-10! w-32! h-32! border-t-2! border-l-2! border-indigo-500/30! rounded-tl-[3rem]! -z-10!"></div>
          </motion.div>

          {/* ستون متن - سمت راست */}
          <motion.div className="space-y-8! text-right order-1 lg:order-2!" variants={fadeInUp}>
            <div>
              <div className="flex items-center justify-end gap-3! mb-4!">
                <span className="text-indigo-400 text-sm! font-black tracking-widest uppercase">About Hataw Group</span>
                <span className="w-12! h-[2px]! bg-indigo-500"></span>
              </div>
              <h3 className="text-4xl! md:text-5xl! font-black text-white leading-tight!">
                دروستکردنی براندەکان کە <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-l from-indigo-400 to-purple-400">بەردەوام دەبن</span>
              </h3>
            </div>

            <p className="text-slate-400 text-lg! leading-loose! font-light">
              لە <span className="text-white font-bold">Hataw Group</span>، باوەڕمان وایە هەموو بازرگانییەک شایەنی ئەوەیە ببێتە براندێکی بەهێز. ڕێبازی ستراتیژیمان توێژینەوەی بازاڕی قووڵ و داهێنانی پیشەیی تێکەڵ دەکات بۆ ئەوەی تۆ لە پێشەنگانی بواری خۆت دابنێین.
            </p>

            {/* لیست ویژگی‌ها */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4! py-4!">
              {[
                "ستراتیژی براندی مۆدێرن",
                "دیزاینی ناسنامەی ناوازە",
                "توێژینەوەی بازاڕی قووڵ",
                "پەرەپێدانی بازرگانی"
              ].map((item, index) => (
                <div key={index} className="flex items-center justify-end gap-3! text-slate-300">
                  <span className="text-sm! font-bold">{item}</span>
                  <CheckCircle2 size={18} className="text-indigo-500" />
                </div>
              ))}
            </div>

            <div className="pt-6!">
              <motion.a
                href="#contact"
                className="inline-flex items-center gap-3! px-10! py-4! bg-white text-black rounded-2xl! font-black hover:bg-indigo-600 hover:text-white transition-all duration-300 shadow-xl shadow-white/5"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                گەشتەکەت دەست پێبکە
              </motion.a>
            </div>
          </motion.div>

        </div>
      </div>
    </motion.section>
  );
};

export default AboutComponents;
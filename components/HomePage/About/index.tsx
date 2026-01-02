"use client";
import React from "react";
import { motion, Variants } from "framer-motion";
import { CheckCircle2, XCircle } from "lucide-react";
import { useTranslations, useLocale } from "next-intl";
import ButtonComponents from "@/components/ButtonComponents";

const AboutComponents = () => {
  const t = useTranslations("About");
  const locale = useLocale();
  const isRTL = locale === "ku" || locale === "fa";

  const container: Variants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
  };

  const fadeInUp: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  // خواندن آرایه‌ها از فایل JSON
  const suitableItems = t.raw("suitable.items") || [];
  const notSuitableItems = t.raw("notSuitable.items") || [];

  return (
    <motion.section
      id="about"
      className="relative  bg-primary overflow-hidden"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={container}
      dir={isRTL ? "rtl" : "ltr"}
    >
      <div className="max-w-7xl! mx-auto! px-6! relative z-10">
        
        {/* Header */}
        <motion.div variants={fadeInUp} className="text-center mb-16!">
          <h2 className="text-4xl! md:text-5xl! font-bold text-white mb-4!">
            {t("badge")} {/* Who Is This Assessment For? */}
          </h2>
          <p className="text-gray text-lg! max-w-2xl! mx-auto!">
            {t("subtitle")} {/* Check if our brand assessment is suitable... */}
          </p>
        </motion.div>

        {/* Comparison Boxes */}
        <div className="grid! grid-cols-1! lg:grid-cols-2! gap-8! mb-12!">
          
          {/* Suitable Box */}
          <motion.div
            variants={fadeInUp}
            className="bg-[#0f0f0f] border border-[#333333] rounded-4xl p-8! md:p-10!"
          >
            <div className="flex items-center gap-3! mb-8!">
              <div className="w-10! h-10! rounded-full bg-[#333333] flex items-center justify-center">
                <CheckCircle2 className="text-white" size={24} />
              </div>
              <h3 className="text-2xl! font-bold text-white">{t("suitable.title")}</h3>
            </div>
            <ul className="space-y-6!">
              {suitableItems.map((item: string, idx: number) => (
                <li key={idx} className="flex items-start gap-4 text-gray">
                  <div className="mt-1! w-5 h-5 rounded border border-[#333333] shrink-0" />
                  <span className="text-sm! md:text-base! leading-snug">{item}</span>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Not Suitable Box */}
          <motion.div
            variants={fadeInUp}
            className="bg-[#0f0f0f] border border-[#333333] rounded-4xl p-8! md:p-10!"
          >
            <div className="flex items-center gap-3 mb-8!">
              <div className="w-10 h-10 rounded-full bg-[#333333] flex items-center justify-center">
                <XCircle className="text-white" size={24} />
              </div>
              <h3 className="text-2xl! font-bold text-white">{t("notSuitable.title")}</h3>
            </div>
            <ul className="space-y-6!">
              {notSuitableItems.map((item: string, idx: number) => (
                <li key={idx} className="flex items-start gap-4! text-[#b2b2b2]">
                  <div className="mt-1! w-5 h-5 rounded border border-[#333333] flex-shrink-0" />
                  <span className="text-sm! md:text-base! leading-snug">{item}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>

        {/* Score/Result Box */}
        <motion.div
          variants={fadeInUp}
          className="bg-[#0f0f0f] border border-[#333333] rounded-4xl p-12! text-center"
        >
          <h4 className="text-xl! font-bold text-white mb-4! uppercase tracking-wider">
            {t("result.title")}
          </h4>
          <div className="text-8xl! font-bold! text-white mb-6!">23</div>
          <p className="text-[#b2b2b2] mb-10! max-w-md! mx-auto!">
            {t("result.description")}
          </p>
          <div className="flex justify-center">
            <ButtonComponents
              Title={t("result.cta")}
              Onclic={() => {}}
              className="bg-transparent! border border-[#D4AF37]! text-[#D4AF37]! hover:bg-[#D4AF37]! hover:text-black! py-4! px-10!"
            />
          </div>
        </motion.div>

      </div>
    </motion.section>
  );
};

export default AboutComponents;
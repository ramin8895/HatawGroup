"use client";
import React from "react";
import { motion, Variants } from "framer-motion";
import { useTranslations, useLocale } from "next-intl"; // اضافه شد
import ButtonComponents from "@/components/ButtonComponents";

const ProgressBar = ({ label, percentage }: { label: string; percentage: number }) => (
  <div className="mb-6 last:mb-0">
    <div className="flex justify-between items-end mb-2">
      <span className="text-gray text-sm font-medium">{label}</span>
      <span className="text-white text-sm font-bold">{percentage}%</span>
    </div>
    <div className="h-0.5 w-full bg-[#333333] relative">
      <motion.div
        initial={{ width: 0 }}
        whileInView={{ width: `${percentage}%` }}
        transition={{ duration: 1.5, ease: "easeOut", delay: 0.5 }}
        className="absolute top-0 left-0 h-full bg-white"
      />
    </div>
  </div>
);

const HomeSection = () => {
  // استفاده مستقیم از هوک‌ها برای اطمینان از دریافت متن‌ها
  const t = useTranslations("Hero");
  const locale = useLocale();
  const isRtl = locale === "ku" || locale === "fa";

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2, delayChildren: 0.3 },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  return (
    <div
      className="relative min-h-screen! flex items-center justify-center overflow-hidden bg-primary px-4! py-12!"
      id="home"
      dir={isRtl ? "rtl" : "ltr"}
    >
      <div className="max-w-7xl! w-full! mx-auto! px-6! relative z-10!">
        <motion.div
          className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center"
          initial="hidden"
          animate="visible"
          variants={containerVariants}
        >
          {/* سمت چپ: متون و دکمه‌ها */}
          <div className="flex flex-col items-start text-start">
            <motion.h1
              variants={itemVariants}
              className="text-5xl! md:text-7xl! font-bold leading-[1.1]! tracking-tight text-darkGray mb-6!"
            >
              {t("titlePart1")} <span className="text-white text-5xl! md:text-7xl!">{t("titleBold1")}</span> <br />
              {t("titlePart2")} <span className="text-white text-5xl! md:text-7xl!">{t("titleBold2")}</span>
            </motion.h1>

            <motion.p
              variants={itemVariants}
              className="text-gray text-lg! leading-relaxed! max-w-xl! mb-10!"
            >
              {t("description")}
            </motion.p>

            <motion.div
              variants={itemVariants}
              className="flex flex-col sm:flex-row gap-4! w-full sm:w-auto"
            >
              <ButtonComponents
                Title={t("btn1")}
                Onclic={() => console.log("Assessment clicked")}
                className="bg-transparent! border border-[#D4AF37]! text-[#D4AF37]! hover:bg-[#D4AF37]! hover:text-primary!"
              />

              <ButtonComponents
                Title={t("btn2")}
                Onclic={() => console.log("Suitability clicked")}
                className="bg-[#1A1A1A]! text-darkGray! border border-[#333333]! hover:text-white! hover:border-white!"
              />
            </motion.div>
          </div>

          <motion.div variants={itemVariants} className="w-full relative">
            <div className="rounded-3xl! border border-gray bg-[#0f0f0f] p-8! md:p-12!">
              <div className="text-center mb-12!">
                <motion.div
                  initial={{ scale: 0.5, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  transition={{ type: "spring", stiffness: 100 }}
                  className="text-7xl! md:text-8xl! font-bold text-white mb-2!"
                >
                  75
                </motion.div>
                <p className="text-gray text-sm! font-medium">
                  {t("scoreTitle")}
                </p>
              </div>

              <div className="space-y-8!">
                <ProgressBar label={t("stat1")} percentage={75} />
                <ProgressBar label={t("stat2")} percentage={60} />
                <ProgressBar label={t("stat3")} percentage={45} />
              </div>
            </div>

            <div className="absolute -inset-1  from-[#D4AF37]/10 to-transparent blur-3xl -z-10 rounded-[3rem]" />
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default HomeSection;
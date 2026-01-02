"use client";
import React from "react";
import { motion } from "framer-motion";
import { useTranslations, useLocale } from "next-intl";
import { Star, ShieldCheck, LayoutDashboard, Megaphone, Activity } from "lucide-react";
import ButtonComponents from "@/components/ButtonComponents";

const Evaluating = () => {
  const t = useTranslations("Evaluating");
  const locale = useLocale();
  const isRTL = locale === "ku" || locale === "fa";

  // آیکون‌های مربوط به هر بخش
  const icons = [
    <ShieldCheck key="1" size={32} className="text-gray-400!" />,
    <LayoutDashboard key="2" size={32} className="text-gray-400!" />,
    <Megaphone key="3" size={32} className="text-gray-400!" />,
    <Activity key="4" size={32} className="text-gray-400!" />,
  ];

  const categories = t.raw("categories");

  return (
    <section className="bg-primary! py-24! px-6!" dir={isRTL ? "rtl" : "ltr"}>
      <div className="max-w-7xl! mx-auto! px-6! relative z-10">
        
        {/* Header */}
        <div className="text-center! mb-16!">
          <h2 className="text-3xl! md:text-4xl! font-bold! text-white! mb-4!">
            {t("title")} {t("titleAccent")}
          </h2>
          <p className="text-gray-400!">{t("subtitle")}</p>
        </div>

        {/* Evaluation Cards */}
        <div className="space-y-6! mb-12!">
          {categories.map((cat: any, index: number) => (
            <motion.div
              key={cat.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-[#0f0f0f]! border! border-[#333333]! rounded-2xl! p-6! md:p-8!"
            >
              <div className="flex! items-start! gap-4! mb-6!">
                <div className="mt-1!">{icons[index]}</div>
                <div>
                  <h3 className="text-xl! font-bold! text-white!">
                    {cat.id}. {cat.title}
                  </h3>
                  <p className="text-sm! text-gray!">{cat.desc}</p>
                </div>
              </div>

              <div className="space-y-8! pl-12!">
                {cat.questions.map((q: string, qIdx: number) => (
                  <div key={qIdx}>
                    <p className="text-sm! font-medium! text-gray-300! mb-3!">{q}</p>
                    <div className="flex! gap-2!">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star
                          key={star}
                          size={18}
                          className="text-[#333333]! cursor-pointer! hover:text-yellow-500! transition-colors!"
                        />
                      ))}
                      <span className="text-xs! text-gray-600! ml-2! self-center!">Click to rate</span>
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex! justify-end! mt-6! pt-6! border-t! border-[#1a1a1a]!">
                <span className="text-xs! text-gray-500!">
                  {t("scoreLabel")} <span className="text-white! ml-2!">{0}/15</span>
                </span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Summary Box */}
        <div className="bg-[#0f0f0f]! border! border-[#333333]! rounded-2xl! p-10! text-center!">
          <h4 className="text-lg! font-bold! text-white! mb-2!">{t("summaryTitle")}</h4>
          <div className="text-8xl! font-black! text-white! mb-2!">08</div>
          <p className="text-sm! text-gray-500! mb-8!">{t("totalLabel")}</p>
          
          <div className="flex! flex-col! sm:flex-row! justify-center! gap-4!">
            <ButtonComponents
              Title={t("btnOutcomes")}
              Onclic={() => {}}
              className="bg-transparent! border! border-[#D4AF37]! text-[#D4AF37]! hover:bg-[#D4AF37]! hover:text-black! py-3! px-8!"
            />
            <ButtonComponents
              Title={t("btnPathways")}
              Onclic={() => {}}
              className="bg-[#1A1A1A]! text-gray-500! border! border-[#333333]! py-3! px-8! opacity-50! cursor-not-allowed!"
            />
          </div>
        </div>

      </div>
    </section>
  );
};

export default Evaluating;
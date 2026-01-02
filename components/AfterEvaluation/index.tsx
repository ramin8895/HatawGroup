"use client";
import React from 'react';
import { motion } from 'framer-motion';
import { useTranslations, useLocale } from 'next-intl';
import { CheckCircle2 } from 'lucide-react';

const AfterEvaluation = () => {
  const t = useTranslations("AfterEvaluation");
  const locale = useLocale();
  const isRTL = locale === "ku" || locale === "fa";

  const pathways = t.raw("pathways");

  return (
    <section className="bg-primary! py-24! px-6!" dir={isRTL ? "rtl" : "ltr"}>
      <div className="max-w-7xl! mx-auto!">
        
        {/* Header */}
        <div className="text-center! mb-16!">
          <motion.h2 
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-3xl! md:text-5xl! font-bold! text-white! mb-6!"
          >
            {t("title")}
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-gray-400! text-lg! max-w-2xl! mx-auto!"
          >
            {t("subtitle")}
          </motion.p>
        </div>

        {/* Pathways Cards */}
        <div className="grid! grid-cols-1! lg:grid-cols-3! gap-8!">
          {pathways.map((path: any, index: number) => (
            <motion.div
              key={path.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-transparent! border! border-[#333333]! rounded-[2rem]! p-10! flex! flex-col! items-center! text-center!"
            >
              {/* Number Badge */}
              <div className="bg-[#D4AF37]! w-16! h-16! rounded-xl! flex! items-center! justify-center! text-2xl! font-bold! text-black! mb-8!">
                {path.id}
              </div>

              {/* Title & Subtitle */}
              <h3 className="text-2xl! font-bold! text-white! mb-2!">
                {path.title}
              </h3>
              <p className="text-gray-500! text-sm! mb-10!">
                {path.subtitle}
              </p>

              {/* Features List */}
              <ul className="w-full! space-y-5! mb-12! text-start!">
                {path.features.map((feature: string, fIdx: number) => (
                  <li key={fIdx} className="flex! items-start! gap-3! text-gray-300! text-sm!">
                    <CheckCircle2 size={18} className="text-[#D4AF37]! shrink-0! mt-0.5!" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>

              {/* Recommended Footer */}
              <div className="mt-auto! pt-6! w-full!">
                <p className="text-gray-500! text-xs! mb-3!">
                  {t("recommendedLabel")}
                </p>
                <p className="text-white! text-sm! font-medium!">
                  {path.recommendedWhen}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default AfterEvaluation;
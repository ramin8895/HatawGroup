"use client";
import React from 'react';
import { motion } from 'framer-motion';
import { useTranslations, useLocale } from 'next-intl';
import { FileText, BarChart3, Zap, DollarSign } from 'lucide-react';

const Assessment = () => {
  const t = useTranslations("Assessment");
  const locale = useLocale();
  const isRTL = locale === "ku" || locale === "fa";

  // آیکون‌ها بر اساس چیدمان تصویر از چپ به راست
  const icons = [
    <FileText key="1" size={32} className="text-white!" />,
    <BarChart3 key="2" size={32} className="text-white!" />,
    <Zap key="3" size={32} className="text-white!" />,
    <DollarSign key="4" size={32} className="text-white!" />,
  ];

  // دریافت آرایه داده‌ها از فایل JSON
  const outcomes = t.raw("outcomes");

  return (
    <section className="bg-primary! py-24! px-6!" dir={isRTL ? "rtl" : "ltr"}>
      <div className="max-w-7xl! mx-auto!">
        
        {/* بخش عنوان و زیرعنوان */}
        <div className="text-center! mb-20!">
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
            className="text-gray-400! text-lg! max-w-3xl! mx-auto!"
          >
            {t("subtitle")}
          </motion.p>
        </div>

        {/* گرید کارت‌های خروجی */}
        <div className="grid! grid-cols-1! md:grid-cols-2! lg:grid-cols-4! gap-6!">
          {outcomes.map((item: any, index: number) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-[#b3b3b3]! rounded-3xl! p-8! flex! flex-col! items-start! min-h-[420px]!"
            >
              {/* محفظه آیکون تیره رنگ */}
              <div className="bg-[#575757]! p-4! rounded-2xl! mb-8!">
                {icons[index]}
              </div>

              {/* تیتر کارت - مشکی */}
              <h3 className="text-2xl! font-bold! text-black! mb-6! leading-tight!">
                {item.title}
              </h3>
              
              {/* متن توضیحات - خاکستری تیره */}
              <p className="text-[#4d4d4d]! text-base! leading-relaxed!">
                {item.description}
              </p>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default Assessment;
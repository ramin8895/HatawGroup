"use client";
import React from 'react';
import { motion } from 'framer-motion';
import { useTranslations, useLocale } from 'next-intl';

const AssessmentForm = () => {
  const t = useTranslations("AssessmentForm");
  const locale = useLocale();
  const isRTL = locale === "ku" || locale === "fa";

  // بزرگ‌تر کردن فونت ورودی‌ها (از text-sm به text-lg)
  const inputClass = "w-full! bg-transparent! border! border-[#a3a3a3]! rounded-lg! p-4! text-lg! text-black! placeholder:text-[#888888]! focus:outline-none! focus:border-black!";
  
  // بزرگ‌تر کردن فونت لیبل‌ها (از text-xs به text-base)
  const labelClass = "block! text-base! font-bold! text-black! mb-3!";

  return (
    <section className="bg-primary!  px-6!" dir={isRTL ? "rtl" : "ltr"}>
      <div className="max-w-4xl! mx-auto!">
        
        {/* Header */}
        <div className="text-center! mb-16!">
          <h2 className="text-4xl! md:text-5xl! font-bold! text-white! mb-6!">
            {t("title")} {t("titleAccent")}
          </h2>
          <p className="text-gray-400! text-xl!">{t("subtitle")}</p>
        </div>

        {/* Form Container */}
        <div className="bg-[#b3b3b3]! rounded-[2.5rem]! p-10! md:p-16!">
          <form className="space-y-8!">
            <div className="grid! grid-cols-1! md:grid-cols-2! gap-8!">
              <div>
                <label className={labelClass}>{t("labels.businessName")}</label>
                <input type="text" placeholder={t("placeholders.businessName")} className={inputClass} />
              </div>
              <div>
                <label className={labelClass}>{t("labels.businessField")}</label>
                <input type="text" placeholder={t("placeholders.businessField")} className={inputClass} />
              </div>
            </div>

            <div>
              <label className={labelClass}>{t("labels.address")}</label>
              <input type="text" placeholder={t("placeholders.address")} className={inputClass} />
            </div>

            <div className="grid! grid-cols-1! md:grid-cols-2! gap-8!">
              <div>
                <label className={labelClass}>{t("labels.whatsapp")}</label>
                <input type="text" placeholder="+1234567890" className={inputClass} />
              </div>
              <div>
                <label className={labelClass}>{t("labels.phone")}</label>
                <input type="text" placeholder="+1234567890" className={inputClass} />
              </div>
            </div>

            <div>
              <label className={labelClass}>{t("labels.problem")}</label>
              <textarea rows={4} placeholder={t("placeholders.problem")} className={inputClass}></textarea>
            </div>

            <div>
              <label className={labelClass}>{t("labels.goal")}</label>
              <textarea rows={4} placeholder={t("placeholders.goal")} className={inputClass}></textarea>
            </div>

            <div className="grid! grid-cols-1! md:grid-cols-2! gap-8!">
              <div>
                <label className={labelClass}>{t("labels.isActive")}</label>
                <div className="flex! gap-6!">
                  <label className="flex! items-center! gap-3! text-lg! text-black! cursor-pointer!">
                    <input type="radio" name="active" className="w-5! h-5! accent-black!" /> {t("options.yes")}
                  </label>
                  <label className="flex! items-center! gap-3! text-lg! text-black! cursor-pointer!">
                    <input type="radio" name="active" className="w-5! h-5! accent-black!" /> {t("options.no")}
                  </label>
                </div>
              </div>
              <div>
                <label className={labelClass}>{t("labels.hasMarketing")}</label>
                <div className="flex! gap-6!">
                  <label className="flex! items-center! gap-3! text-lg! text-black! cursor-pointer!">
                    <input type="radio" name="marketing" className="w-5! h-5! accent-black!" /> {t("options.yes")}
                  </label>
                  <label className="flex! items-center! gap-3! text-lg! text-black! cursor-pointer!">
                    <input type="radio" name="marketing" className="w-5! h-5! accent-black!" /> {t("options.no")}
                  </label>
                </div>
              </div>
            </div>

            <div className="text-center! pt-10!">
              <button className="bg-[#1a1a1a]! text-[#D4AF37]! border-2! border-[#D4AF37]! px-12! py-5! rounded-xl! text-xl! font-bold! hover:bg-[#D4AF37]! hover:text-black! transition-all!">
                {t("submitBtn")}
              </button>
              <p className="text-[#4d4d4d]! text-lg! mt-6! font-medium!">{t("footerNote")}</p>
            </div>
          </form>
        </div>

        {/* Bottom Banner */}
        <div className="mt-28! text-center! max-w-4xl! mx-auto!">
          <h2 className="text-5xl! md:text-7xl! font-bold! text-white! mb-10! leading-tight!">
            {t("bottomTitle")}
          </h2>
          <div className="text-gray-400! text-xl! md:text-2xl! leading-relaxed!">
            <p>{t("bottomDesc")}</p>
          </div>
        </div>

      </div>
    </section>
  );
};

export default AssessmentForm;
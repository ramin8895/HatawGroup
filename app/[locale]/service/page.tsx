"use client";
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslations, useLocale } from 'next-intl';
import { ChevronDown, Target, Zap, ShieldCheck, BarChart3 } from 'lucide-react';

const ServicePage = () => {
  const t = useTranslations("ServicePage");
  const locale = useLocale();
  const isRTL = locale === "ku" || locale === "fa";

  const [activeStage, setActiveStage] = useState<number | null>(1);

  const stages = [
    { id: 1, title: "Brand Foundation", icon: <Target size={24} /> },
    { id: 2, title: "Digital Brand Infrastructure", icon: <Zap size={24} /> },
    { id: 3, title: "Content Engine & Campaigns", icon: <BarChart3 size={24} /> },
    { id: 4, title: "Brand Governance & Support", icon: <ShieldCheck size={24} /> },
  ];

  return (
    <main className="bg-[#0a0a0a]! text-white! py-20! px-6!" dir={isRTL ? "rtl" : "ltr"}>
      <div className="max-w-5xl! mx-auto!">
        
        {/* Header Section */}
        <section className="flex! flex-col! md:flex-row! justify-between! items-start! gap-12! mb-32!">
          <div className="flex-1!">
            <h1 className="text-5xl! md:text-6xl! font-bold! mb-6! leading-tight!">
              {t("mainTitle")}
            </h1>
            <p className="text-gray-400! text-lg!">{t("mainSubtitle")}</p>
            <button className="mt-8! border! border-[#D4AF37]! text-[#D4AF37]! px-8! py-3! rounded-lg! hover:bg-[#D4AF37]! hover:text-black! transition-all!">
              Start Brand Review
            </button>
          </div>
          <div className="flex-1! bg-[#111111]! border! border-gray-800! p-8! rounded-2xl!">
            <p className="text-lg! leading-relaxed! text-gray-300!">{t("topNote")}</p>
          </div>
        </section>

        {/* Why Brands Fail Section */}
        <section className="text-center! mb-40!">
          <h2 className="text-2xl! md:text-3xl! font-bold! mb-10! max-w-2xl! mx-auto!">
            {t("whyTitle")}
          </h2>
          <div className="bg-[#111111]! border! border-gray-800! p-10! rounded-3xl! relative!">
            <p className="text-gray-400! mb-4!">{t("whyBox").split('.')[0]}.</p>
            <p className="text-[#D4AF37]! text-2xl! font-bold! mb-4!">A brand is a system.</p>
            <p className="text-gray-400!">{t("whyBox").split('system.')[1]}</p>
          </div>
        </section>

        {/* The 4 Core Stages (Accordion) */}
        <section className="mb-40!">
          <div className="flex! justify-between! items-end! mb-12! gap-6!">
            <h2 className="text-3xl! md:text-4xl! font-bold!">{t("stagesTitle")}</h2>
            <div className="max-w-xs! bg-[#1a1a1a]! p-4! border-l-4! border-[#D4AF37]! rounded-r-lg!">
              <p className="text-xs! text-gray-400!">{t("importantRule")}</p>
            </div>
          </div>

          <div className="space-y-4!">
            {stages.map((stage) => (
              <div key={stage.id} className="border! border-gray-800! rounded-2xl! overflow-hidden!">
                <button 
                  onClick={() => setActiveStage(activeStage === stage.id ? null : stage.id)}
                  className="w-full! flex! items-center! justify-between! p-6! bg-[#111111]! hover:bg-[#161616]! transition-all!"
                >
                  <div className="flex! items-center! gap-4!">
                    <span className="bg-[#D4AF37]! text-black! w-8! h-8! rounded! flex! items-center! justify-center! font-bold!">
                      {stage.id}
                    </span>
                    <span className="text-xl! font-semibold!">{stage.title}</span>
                  </div>
                  <ChevronDown className={`transition-transform! ${activeStage === stage.id ? 'rotate-180!' : ''}`} />
                </button>
                <AnimatePresence>
                  {activeStage === stage.id && (
                    <motion.div 
                      initial={{ height: 0 }} animate={{ height: 'auto' }} exit={{ height: 0 }}
                      className="bg-[#0f0f0f]! px-8! py-8! border-t! border-gray-800!"
                    >
                      <div className="grid! grid-cols-1! md:grid-cols-3! gap-8!">
                        <div>
                          <p className="text-[#D4AF37]! text-xs! uppercase! mb-4!">Purpose</p>
                          <p className="text-sm! text-gray-400!">In this level, the business clearly knows who it is, what it says, and why it should be chosen.</p>
                        </div>
                        <div>
                          <p className="text-[#D4AF37]! text-xs! uppercase! mb-4!">Sub-services</p>
                          <ul className="text-sm! text-gray-300! space-y-2!">
                            <li>• Current brand status analysis</li>
                            <li>• Core message definition</li>
                            <li>• Visual Identity design</li>
                          </ul>
                        </div>
                        <div>
                          <p className="text-[#D4AF37]! text-xs! uppercase! mb-4!">Output</p>
                          <p className="text-sm! text-gray-300!">Clear identity + explainable message + defined path for future decisions.</p>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </section>

        {/* Difference Cards */}
        <section className="text-center! mb-40!">
          <h2 className="text-3xl! font-bold! mb-2!">{t("differenceTitle")}</h2>
          <p className="text-gray-500! mb-12!">{t("diffSubtitle")}</p>
          <div className="grid! grid-cols-1! md:grid-cols-3! gap-6!">
            {[1, 2, 3].map((item) => (
              <div key={item} className="bg-[#b3b3b3]! p-10! rounded-3xl! text-black! text-start!">
                <div className="bg-gray-700! w-10! h-10! rounded! mb-6!"></div>
                <h3 className="font-bold! mb-4!">We build paths, not scattered services</h3>
                <p className="text-sm! text-gray-700!">Every service connects to the next, creating a complete system.</p>
              </div>
            ))}
          </div>
        </section>

        {/* Cost Section */}
        <section className="bg-[#111111]! p-12! rounded-[3rem]! border! border-gray-800! text-center! mb-40!">
          <h2 className="text-2xl! font-bold! mb-4!">{t("costTitle")}</h2>
          <p className="text-gray-500! mb-10!">{t("costNote")}</p>
          <div className="flex! flex-wrap! justify-center! gap-8!">
            {t.raw("costSteps").map((step: string, i: number) => (
              <div key={i} className="flex! items-center! gap-3!">
                <span className="bg-gray-800! text-white! w-8! h-8! rounded! flex! items-center! justify-center! text-xs!">{i+1}</span>
                <span className="text-sm! font-medium!">{step}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Collaboration Footer */}
        <section className="text-center!">
          <h2 className="text-2xl! font-bold! mb-4!">{t("collabTitle")}</h2>
          <p className="text-gray-500! mb-12!">{t("collabSubtitle")}</p>
          <div className="grid! grid-cols-1! md:grid-cols-3! gap-4! mb-12!">
            {t.raw("collabItems").map((item: string, i: number) => (
              <div key={i} className="border! border-gray-800! p-6! rounded-xl! text-sm!">
                {item}
              </div>
            ))}
          </div>
          <button className="bg-[#D4AF37]! text-black! px-10! py-4! rounded-xl! font-bold! mb-20!">
            Start Brand Review
          </button>
          <p className="text-gray-500! text-lg! max-w-2xl! mx-auto! italic! border-t! border-gray-900! pt-10!">
            "{t("footerNote")}"
          </p>
        </section>

      </div>
    </main>
  );
};

export default ServicePage;
"use client";

import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import Image from "next/image";
import ButtonComponents from "@/components/ButtonComponents";

export function HomeContent({ locale, translations }: any) {
  const isRtl = locale === "fa" || locale === "ku";
  const router = useRouter();

  // ۱. دسترسی به بخش Home (که شامل Hero، WhyBrand و Services است)
  const homeData = translations?.Home || {};

  // ۲. استخراج بخش‌های مختلف از داخل Home
  const hero = homeData.Hero || {};
  const whyBrand = homeData.WhyBrand || {};
  const servicesHeader = homeData.Services || {}; // عنوان و دکمه بخش سرویس در Home

  // ۳. دسترسی به جزئیات سرویس‌ها از بخش مستقل Services در انتهای فایل JSON
  const allServices = translations?.Services || {};
  const serviceItems = allServices.items || {};

  // ۴. آماده‌سازی داده‌های اسلایدر سرویس‌ها
  const servicesData = [
    { ...serviceItems.branding, src: "/service/s1.png" },
    { ...serviceItems.strategy, src: "/service/s2.png" },
    { ...serviceItems.digital, src: "/service/s3.png" },
    { ...serviceItems.consultancy, src: "/service/s4.png" },
  ];

  return (
    <main
      className="bg-primary text-[#E0E0E0]! overflow-x-hidden! selection:bg-[#D4AF37]/30 selection:text-[#D4AF37]"
      dir={isRtl ? "rtl" : "ltr"}
    >
      {/* --- SECTION 1: HERO --- */}
      <section className="relative! min-h-screen! flex! flex-col! items-center! justify-center! text-center! px-6! pt-32! pb-20!">
        <div className="max-w-5xl! mx-auto!">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-6xl! md:text-8xl! font-bold! text-gray-400! mb-4!"
          >
            {hero.titlePart1}
          </motion.h1>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-5xl! md:text-7xl! font-bold! text-white! mb-10!"
          >
            {hero.titlePart2}
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-gray-400! text-lg! max-w-2xl! mx-auto! mb-12! leading-relaxed!"
          >
            {hero.description}
          </motion.p>
          <motion.button
            onClick={() => router.push(`/${locale}/assessment`)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="border-2! border-[#D4AF37]! text-[#D4AF37]! px-12! py-4! rounded-xl! text-xl! font-bold! hover:bg-[#D4AF37]! hover:text-black! transition-all!"
          >
            {hero.mainBtn}
          </motion.button>
        </div>
      </section>

      {/* --- SECTION 2: WHY BRAND --- */}
      <section className="py-24! px-6!">
        <div className="max-w-7xl! mx-auto! space-y-16!">
          {/* Row 1: Intro */}
          <div className="flex! flex-col! md:flex-row! items-center! gap-12!">
            <div className="w-full! md:w-1/2! h-[400px]! relative! border border-darkGray rounded-2xl overflow-hidden">
              <Image
                src="/home/1.png"
                alt="Why Brand"
                fill
                className="object-cover!"
              />
            </div>
            <div className="w-full! md:w-1/2!">
              <h2 className="text-3xl! md:text-5xl! font-bold! text-white! mb-6!">
                {whyBrand.title}
              </h2>
              <p className="text-gray-400! text-lg! mb-4!">{whyBrand.desc1}</p>
              <p className="text-gray-400! text-lg!">{whyBrand.desc2}</p>
            </div>
          </div>

          {/* Row 2: Problems */}
          <div className="flex! flex-col! md:flex-row-reverse! items-center! gap-12!">
            <div className="w-full! md:w-1/2! h-[400px]! relative! border border-darkGray rounded-2xl overflow-hidden">
              <Image
                src="/home/2.png"
                alt="Problems"
                fill
                className="object-cover!"
              />
            </div>
            <div className="w-full! md:w-1/2!">
              <h2 className="text-3xl! md:text-4xl! font-bold! text-white! mb-8!">
                {whyBrand.problemsTitle}
              </h2>
              <ul className="grid grid-cols-1 gap-6!">
                {whyBrand.problems?.map((prob: any, idx: number) => (
                  <li
                    key={idx}
                    className="border-l-2 border-[#D4AF37] pl-4! rtl:pl-0! rtl:pr-4!"
                  >
                    <h4 className="text-xl! font-bold! text-white!">
                      {prob.title}
                    </h4>
                    <p className="text-gray-500! text-sm!">{prob.desc}</p>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Row 3: Footer/CTA */}
          <div className="flex! flex-col! md:flex-row! items-center! gap-12!">
            <div className="w-full! md:w-1/2! h-[400px]! relative! border border-darkGray rounded-2xl overflow-hidden">
              <Image
                src="/home/3.png"
                alt="CTA"
                fill
                className="object-cover!"
              />
            </div>
            <div className="w-full! md:w-1/2!">
              <h2 className="text-3xl! md:text-4xl! font-bold! text-white! mb-6!">
                {whyBrand.footerTitle}
              </h2>
              <p className="text-gray-400! text-lg! mb-10!">
                {whyBrand.footerDesc}
              </p>
              <ButtonComponents
                Title={whyBrand.ctaBtn}
                Onclic={() => router.push(`/${locale}/assessment`)}
                variant="default"
              />
            </div>
          </div>
        </div>
      </section>

      {/* --- SECTION 3: SERVICES --- */}
      <section className="py-20! px-6! bg-[#050505]">
        <div className="max-w-7xl! mx-auto!">
          <h2 className="text-4xl! font-bold text-white text-center mb-16!">
            {/* استفاده از خزمەتگوزارییەکان از داخل آبجکت Home */}
            {servicesHeader.title}
          </h2>

          <div className="grid grid-cols-1! md:grid-cols-2! lg:grid-cols-4! gap-6!">
            {servicesData.map((service, index) => (
              <motion.div
                key={index}
                whileHover={{ y: -10 }}
                className="border border-darkGray rounded-2xl p-6! flex flex-col bg-[#0A0A0A] hover:border-[#D4AF37]/40 transition-all"
              >
                <div className="w-full h-40 relative mb-6 rounded-lg overflow-hidden">
                  <Image
                    src={service.src}
                    alt={service.title || "service"}
                    fill
                    className="object-cover"
                  />
                </div>

                <h3 className="text-xl font-bold text-white mb-4">
                  {service.title}
                </h3>
                <p className="text-gray-400 text-sm mb-8 leading-relaxed line-clamp-3">
                  {service.desc}
                </p>

                <div className="mt-auto">
                  <ButtonComponents
                    Onclic={() => router.push(`/${locale}/services`)}
                    Title={servicesHeader.moreBtn}
                    variant="outline"
                    className="w-full!"
                  />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}

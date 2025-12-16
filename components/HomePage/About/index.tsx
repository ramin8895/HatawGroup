import React from "react";
import { motion } from "framer-motion";

const AboutComponents = () => {
  const container = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.2 } },
  };

  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8 } },
  };

  return (
    <motion.section
      id="about"
      className="section"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      variants={container}
    >
      <div className="about-preview">
        {/* وێنە */}
        <motion.div
          className="about-image flex items-center justify-center rounded-2xl shadow-xl relative overflow-hidden"
          variants={fadeInUp}
        >
          <img
            src="https://source.unsplash.com/400x400/?branding,design"
            alt="دیزاینی براند"
            className="w-full h-full object-cover rounded-2xl"
          />
          <span className="absolute inset-0 bg-gradient-to-tr from-yellow-400 to-purple-600 opacity-10 animate-slide"></span>
        </motion.div>

        {/* دەق */}
        <motion.div className="about-content space-y-6" variants={fadeInUp}>
          <h3 className="text-4xl font-bold text-primary-gold">
            دروستکردنی براندەکان کە بەردەوامن
          </h3>

          <p className="text-primary-silver leading-relaxed">
            لە Hataw Group، باوەڕمان وایە هەموو بازرگانییەک شایەنی ئەوەیە
            ببێتە براندێکی بەهێز. ڕێبازی ستراتیژیمان توێژینەوەی بازاڕی
            قووڵ، داهێنانی پیشەیی و زانیارییەکان بەسەر بنەمای داتادا
            تێکەڵ دەکات بۆ ئەوەی تۆ لە پێشەنگانی بواری خۆت دابنێین.
          </p>

          <p className="text-primary-silver leading-relaxed">
            بە ساڵانێک ئەزموون لە ستراتیژی براند و دیزاینی ناسنامە،
            ئێمە یارمەتیدەری ژمارەیەکی زۆر لە بازرگانییەکان بووین بۆ
            گەیشتن بە سەربەخۆیی دارایی و سەرکەوتنی بازاڕ لە ڕێگەی
            براندکردنی بەهێزەوە.
          </p>

          <a
            href="#contact"
            className="btn-primary mt-6 inline-block px-8 py-3 rounded-full font-semibold text-black bg-primary-gold border-2 border-primary-gold transition-transform hover:bg-transparent hover:text-primary-gold hover:shadow-lg"
          >
            گەشتەکەت دەست پێبکە
          </a>
        </motion.div>
      </div>
    </motion.section>
  );
};

export default AboutComponents;

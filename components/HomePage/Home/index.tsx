import React from "react";
import { motion } from "framer-motion";

const HomeSection = () => {
  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8 } },
  };

  return (
    <section className="hero" id="home">
      <motion.div
        className="hero-content"
        initial="hidden"
        animate="visible"
        variants={fadeInUp}
      >
        <h1>
          بازرگانییەکەت بگۆڕە بۆ{" "}
          <span className="highlight">براندێکی ئەفسانەیی</span>
        </h1>

        <p>
          ناسنامە و شوێنپێدانی ستراتیژیی براند کە تۆ لە بیرناچێت.
          ئێمە تەنها لۆگۆ دیزاین ناکەین — ئیمپراتۆریەکان دروست دەکەین.
        </p>

        <div className="hero-buttons">
          <motion.a
            href="#award"
            className="btn-primary"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            🏆 بەشداری خەڵاتی Hataw بکە
          </motion.a>

          <motion.a
            href="#services"
            className="btn-secondary"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            خزمەتگوزارییەکان ببینە
          </motion.a>
        </div>
      </motion.div>
    </section>
  );
};

export default HomeSection;

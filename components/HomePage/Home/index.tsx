import React from 'react'
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
          Transform Your Business Into a{" "}
          <span className="highlight">Legendary Brand</span>
        </h1>
        <p>
          Strategic brand identity & positioning that makes you unforgettable.
          We don't just design logos — we build empires.
        </p>
        <div className="hero-buttons">
          <motion.a
            href="#award"
            className="btn-primary"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            🏆 Join Hataw Award
          </motion.a>
          <motion.a
            href="#services"
            className="btn-secondary"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Explore Services
          </motion.a>
        </div>
      </motion.div>
    </section>
  );
};

export default HomeSection;

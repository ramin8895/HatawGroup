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
        {/* تصویر */}
        <motion.div
          className="about-image flex items-center justify-center rounded-2xl shadow-xl relative overflow-hidden"
          variants={fadeInUp}
        >
          <img
         src="https://source.unsplash.com/400x400/?branding,design"
            alt="Brand Design"
            className="w-full h-full object-cover rounded-2xl"
          />
          <span className="absolute inset-0 bg-gradient-to-tr from-yellow-400 to-purple-600 opacity-10 animate-slide"></span>
        </motion.div>

        {/* متن */}
        <motion.div className="about-content space-y-6" variants={fadeInUp}>
          <h3 className="text-4xl font-bold text-primary-gold">
            Building Brands That Last
          </h3>
          <p className="text-primary-silver leading-relaxed">
            At Hataw Group, we believe every business deserves to be a brand.
            Our strategic approach combines deep market research, creative
            excellence, and data-driven insights to position you as an industry
            leader.
          </p>
          <p className="text-primary-silver leading-relaxed">
            With years of experience in brand strategy and identity design,
            we've helped countless businesses achieve financial independence and
            market dominance through powerful branding.
          </p>
          <a
            href="#contact"
            className="btn-primary mt-6 inline-block px-8 py-3 rounded-full font-semibold text-black bg-primary-gold border-2 border-primary-gold transition-transform hover:bg-transparent hover:text-primary-gold hover:shadow-lg"
          >
            Start Your Journey
          </a>
        </motion.div>
      </div>
    </motion.section>
  );
};

export default AboutComponents;

import React from 'react'
import { motion } from "framer-motion";

const ServiceComponents = () => {
     const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8 } },
  };
    return (

            <motion.section
        id="services"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
      >
        <div className="section-header">
          <h2>Our Services</h2>
          <p>
            Comprehensive brand strategy solutions designed to elevate your
            business
          </p>
        </div>
        <div className="services-grid">
          {[
            [
              "🎨",
              "Brand Identity Design",
              "Complete visual identity systems including logo design, color palettes, typography, and brand guidelines that ensure consistency across all touchpoints.",
            ],
            [
              "📊",
              "Brand Strategy",
              "In-depth market research and strategic positioning to differentiate your brand and create lasting competitive advantages.",
            ],
            [
              "💡",
              "Brand Consulting",
              "Expert guidance on brand evolution, repositioning, and expansion strategies to help you navigate growth opportunities.",
            ],
            [
              "🚀",
              "Digital Branding",
              "Comprehensive digital presence including website design, social media strategy, and online brand management.",
            ],
            [
              "📱",
              "Brand Experience",
              "Creating memorable customer experiences through storytelling and engagement strategies.",
            ],
            [
              "🎯",
              "Rebranding",
              "Complete brand transformation services for businesses ready to evolve.",
            ],
          ].map(([icon, title, desc]) => (
            <motion.div
              key={title}
              className="service-card"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              variants={fadeInUp}
              whileHover={{ y: -10 }}
            >
              <div className="service-icon">{icon}</div>
              <h3>{title}</h3>
              <p>{desc}</p>
            </motion.div>
          ))}
        </div>
      </motion.section>

      );
}
 
export default ServiceComponents;
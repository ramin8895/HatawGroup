"use client";
import { useEffect } from "react";
import { motion } from "framer-motion";
import HomeSection from "../components/HomePage/Home";
import AboutComponents from "../components/HomePage/About";
import ServiceComponents from "../components/HomePage/Services";
import { useSession } from "next-auth/react";

export default function HomePage() {


const { data: session } = useSession();

console.log(session);

  useEffect(() => {
    const header = document.getElementById("header");
    const mobileMenuBtn = document.getElementById("mobileMenuBtn");
    const navLinks = document.getElementById("navLinks");
    const contactForm = document.querySelector(".contact-form");

    const handleScroll = () => {
      if (window.scrollY > 100) header?.classList.add("scrolled");
      else header?.classList.remove("scrolled");
    };
    window.addEventListener("scroll", handleScroll);

    const toggleMenu = () => {
      navLinks?.classList.toggle("active");
      mobileMenuBtn?.classList.toggle("active");
    };
    mobileMenuBtn?.addEventListener("click", toggleMenu);

    document.querySelectorAll(".nav-links a").forEach((link) =>
      link.addEventListener("click", () => {
        navLinks?.classList.remove("active");
        mobileMenuBtn?.classList.remove("active");
      })
    );

    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
      anchor.addEventListener("click", (e) => {
        e.preventDefault();
        const target = document.querySelector(anchor.getAttribute("href")??"");
        target?.scrollIntoView({ behavior: "smooth", block: "start" });
      });
    });

    contactForm?.addEventListener("submit", (e) => {
      e.preventDefault();
      alert("Thank you! We will contact you soon.");
    });

    return () => {
      window.removeEventListener("scroll", handleScroll);
      mobileMenuBtn?.removeEventListener("click", toggleMenu);
    };
  }, []);

  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8 } },
  };

  const fadeIn = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 1 } },
  };

  return (
    <main>
      <HomeSection />
      {/* About */}
      <AboutComponents />
      {/* Services */}
      <ServiceComponents/>
      {/* Portfolio */}
      <motion.section
        id="portfolio"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
      >
        <div className="section-header">
          <h2>Featured Projects</h2>
          <p>Success stories from brands we've transformed</p>
        </div>
        <div className="portfolio-grid">
          {[
            [
              "Tech Startup Rebrand",
              "Complete brand transformation for emerging technology company",
            ],
            [
              "Luxury Fashion Brand",
              "Premium identity design for high-end fashion retailer",
            ],
            [
              "Restaurant Chain",
              "Multi-location brand system with comprehensive guidelines",
            ],
            [
              "Financial Services",
              "Trust-building brand strategy for fintech startup",
            ],
            [
              "Health & Wellness",
              "Holistic brand experience for wellness center",
            ],
            [
              "E-commerce Platform",
              "Digital-first brand identity for online marketplace",
            ],
          ].map(([title, desc]) => (
            <motion.div
              key={title}
              className="portfolio-item"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              variants={fadeInUp}
              whileHover={{ scale: 1.03 }}
            >
              <div className="portfolio-content">
                <h3>{title}</h3>
                <p>{desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Stats */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={fadeInUp}
      >
        <div className="stats">
          <div className="stats-grid">
            {[
              ["500+", "Projects Completed"],
              ["250+", "Happy Clients"],
              ["15+", "Years Experience"],
              ["98%", "Client Satisfaction"],
            ].map(([num, label]) => (
              <motion.div
                key={label}
                className="stat-item"
                whileHover={{ scale: 1.05 }}
              >
                <h4>{num}</h4>
                <p>{label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Hataw Award */}
      <motion.section
        id="award"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={fadeInUp}
      >
        <div className="award-teaser">
          <h2>🏆 Hataw Award Challenge</h2>
          <p style={{ fontSize: "1.3rem", marginBottom: "2rem" }}>
            Watch. Learn. Win. Repeat.
          </p>
          <div className="prize">$900 Prize Pool</div>
          <p style={{ fontSize: "1.2rem", marginBottom: "1rem" }}>
            180 Educational Videos • 30 Days • Hidden Codes
          </p>
          <p style={{ maxWidth: "700px", margin: "0 auto 2rem" }}>
            Watch our exclusive branding tutorials on YouTube, collect secret
            codes, earn points, and compete for cash prizes. First 500
            participants get 3,000 bonus points!
          </p>
          <a
            href="#"
            className="btn-primary"
            style={{ display: "inline-block", fontSize: "1.2rem" }}
          >
            Join the Challenge
          </a>
          <p
            style={{
              marginTop: "1.5rem",
              fontSize: "0.9rem",
              color: "var(--primary-silver)",
            }}
          >
            Next round starts in:{" "}
            <span style={{ color: "var(--primary-gold)", fontWeight: 700 }}>
              12 days
            </span>
          </p>
        </div>
      </motion.section>

      {/* Testimonials */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={fadeInUp}
      >
        <div className="section-header">
          <h2>Client Success Stories</h2>
          <p>What our partners say about working with us</p>
        </div>
        <div className="testimonials-slider">
          {[
            [
              "JD",
              "John Davidson",
              "CEO, TechVision Inc",
              "Hataw Group completely transformed our brand identity. The strategic approach and attention to detail exceeded expectations. Our engagement increased by 300%.",
            ],
            [
              "SM",
              "Sarah Martinez",
              "Founder, Bloom Wellness",
              "Working with Hataw was a game-changer. They didn't just design a logo – they gave us a complete brand strategy that positioned us as leaders.",
            ],
            [
              "MK",
              "Michael Kim",
              "Director, Urban Eats",
              "The ROI on our rebranding investment was phenomenal. Hataw Group's insights helped us triple our revenue within the first year.",
            ],
          ].map(([avatar, name, title, text]) => (
            <motion.div
              key={name}
              className="testimonial-card"
              whileHover={{ y: -5 }}
            >
              <div className="testimonial-text">"{text}"</div>
              <div className="testimonial-author">
                <div className="author-avatar">{avatar}</div>
                <div className="author-info">
                  <h4>{name}</h4>
                  <p>{title}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Blog */}
      <motion.section
        id="blog"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={fadeInUp}
      >
        <div className="section-header">
          <h2>Latest Insights</h2>
          <p>Expert perspectives on branding and strategy</p>
        </div>
        <div className="blog-grid">
          {[
            [
              "📝",
              "Oct 20, 2025",
              "Brand Strategy",
              "5 Signs Your Brand Needs a Refresh",
              "Discover the key indicators that it's time to invest in your brand identity and how to approach the transformation process strategically.",
            ],
            [
              "🎨",
              "Oct 18, 2025",
              "Design",
              "The Psychology of Color in Branding",
              "Understanding how color choices impact consumer perception and decision-making.",
            ],
            [
              "💡",
              "Oct 15, 2025",
              "Business",
              "Building a Brand That Lasts",
              "Long-term strategies for creating sustainable brand equity and maintaining relevance.",
            ],
          ].map(([icon, date, category, title, desc]) => (
            <motion.div
              key={title}
              className="blog-card"
              whileHover={{ y: -10 }}
            >
              <div className="blog-image">{icon}</div>
              <div className="blog-content">
                <div className="blog-meta">
                  <span>{date}</span>
                  <span>•</span>
                  <span>{category}</span>
                </div>
                <h3>{title}</h3>
                <p>{desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Contact */}
      <motion.section
        id="contact"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={fadeInUp}
      >
        <div className="contact-cta">
          <h2>Ready to Build Your Brand?</h2>
          <p>Let's start your transformation journey today</p>
          <form className="contact-form">
            <input
              type="email"
              placeholder="Enter your email address"
              required
            />
            <button type="submit">Get Started</button>
          </form>
          <p style={{ marginTop: "1.5rem", fontSize: "0.9rem" }}>
            Or call us at:{" "}
            <a
              href="tel:+1234567890"
              style={{ color: "var(--primary-gold)", textDecoration: "none" }}
            >
              +1 (234) 567-890
            </a>
          </p>
        </div>
      </motion.section>


    </main>
  );
}

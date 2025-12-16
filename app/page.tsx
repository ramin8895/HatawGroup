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
      <ServiceComponents/>
      {/* Portfolio */}
<motion.section
  id="portfolio"
  initial="hidden"
  whileInView="visible"
  viewport={{ once: true, amount: 0.4 }}
>
  <div className="section-header">
    <h2>پڕۆژە دیارەکان</h2>
    <p>چیرۆکەکانی سەرکەوتن لە براندەکان کە گۆڕمانیان کردووە</p>
  </div>

  <div className="portfolio-grid">
    {[
      [
        "نوێکردنەوەی براندی ستارتاپی تەکنەلۆژیا",
        "گۆڕانکاریی تەواوی براند بۆ کۆمپانیای تەکنەلۆژیای نوێ",
      ],
      [
        "براندی فاشیۆنی لوکس",
        "دیزاینی ناسنامەی پێشکەوتوو بۆ فرۆشگای فاشیۆنی پلە بەرز",
      ],
      [
        "زنجیرەی چێشتخانە",
        "سیستەمی براند بۆ چەند شوێنێک لەگەڵ ڕێنمایی تەواو",
      ],
      [
        "خزمەتگوزارییە دارایییەکان",
        "ستراتیژی براندی دروستکردنی متمانە بۆ ستارتاپی فینتێک",
      ],
      [
        "تەندروستی و خۆباشی",
        "ئەزموونی براندی تەواو بۆ ناوەندی تەندروستی",
      ],
      [
        "پلاتفۆرمی ئەلیکترۆنی فرۆشتن",
        "ناسنامەی براندی دیجیتاڵ بۆ بازاڕی ئۆنلاین",
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
        ["500+", "پڕۆژە تەواوکراوەکان"],
        ["250+", "کڕیاری دڵخۆش"],
        ["15+", "ساڵان ئەزموون"],
        ["98%", "ڕەزامەندی کڕیاران"],
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
    <h2>🏆 پێشبڕکێی خەڵاتی Hataw</h2>

    <p style={{ fontSize: "1.3rem", marginBottom: "2rem" }}>
      سەیر بکە • فێربە • ببەزە • دووبارە بکە
    </p>

    <div className="prize">900$ کۆی خەڵات</div>

    <p style={{ fontSize: "1.2rem", marginBottom: "1rem" }}>
      180 ڤیدیۆی فێرکاری • 30 ڕۆژ • کۆدی نهێنی
    </p>

    <p style={{ maxWidth: "700px", margin: "0 auto 2rem" }}>
      فێرکارییە تایبەتەکانی براندکردن لە YouTube سەیر بکە، کۆدی نهێنی
      کۆبکەرەوە، خاڵ بەدەست بهێنە و بۆ خەڵاتی پارەیی پێشبڕکێ بکە.
      500 بەشداربووی سەرەتا 3,000 خاڵی زیادە وەردەگرن!
    </p>

    <a
      href="#"
      className="btn-primary"
      style={{ display: "inline-block", fontSize: "1.2rem" }}
    >
      بەشداری پێشبڕکێ بکە
    </a>

    <p
      style={{
        marginTop: "1.5rem",
        fontSize: "0.9rem",
        color: "var(--primary-silver)",
      }}
    >
      دەوری داهاتوو دەست پێدەکات لە:
      <span style={{ color: "var(--primary-gold)", fontWeight: 700 }}>
        {" "}12 ڕۆژ
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
    <h2>چیرۆکەکانی سەرکەوتنی کڕیاران</h2>
    <p>هاوبەشەکانمان چی دەڵێن دەربارەی کارکردن لەگەڵ ئێمە</p>
  </div>

  <div className="testimonials-slider">
    {[
      [
        "JD",
        "John Davidson",
        "CEO، TechVision Inc",
        "Hataw Group ناسنامەی براندەکەمان بە تەواوی گۆڕی. ڕێبازی ستراتیژی و وردبینییان زۆر لە چاوەڕوانییەکانمان بەرزتر بوو. بەشداریکردنمان 300% زیاد بوو.",
      ],
      [
        "SM",
        "Sarah Martinez",
        "دامەزرێنەری Bloom Wellness",
        "کارکردن لەگەڵ Hataw گۆڕانکارییەکی گەورە بوو. تەنها لۆگۆیان دیزاین نەکرد، بەڵکو ستراتیژییەکی تەواوی براندیان پێدان کە وەک پێشەنگ دامەزراندیان.",
      ],
      [
        "MK",
        "Michael Kim",
        "بەڕێوەبەری Urban Eats",
        "گەڕانەوەی پارە (ROI) لە نوێکردنەوەی براند زۆر سەرسوڕهێنەر بوو. بیرۆکەکانی Hataw Group یارمەتیمان دا لە یەک ساڵدا داهاتمان سێهێنابکەین.",
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
    <h2>نوێترین بیرۆکەکان</h2>
    <p>بۆچوونی پسپۆڕانە لەسەر براند و ستراتیژی</p>
  </div>

  <div className="blog-grid">
    {[
      [
        "📝",
        "20ی تشرینی یەکەم، 2025",
        "ستراتیژی براند",
        "5 نیشانە کە براندەکەت پێویستی بە نوێکردنەوەیە",
        "ناسینی ئەو نیشانانەی کە پێویستە لە ناسنامەی براندەکەت وەبەرهێنیت و چۆن بە شێوەی ستراتیژی گۆڕانکاری بکەیت.",
      ],
      [
        "🎨",
        "18ی تشرینی یەکەم، 2025",
        "دیزاین",
        "دەروونناسی ڕەنگ لە براندکردندا",
        "تێگەیشتن لە کاریگەری هەڵبژاردنی ڕەنگ لەسەر هەست و بڕیارەکانی کڕیار.",
      ],
      [
        "💡",
        "15ی تشرینی یەکەم، 2025",
        "بازرگانی",
        "دروستکردنی براندێک کە بەردەوام بێت",
        "ستراتیژییە درێژخایەنەکان بۆ دروستکردنی بەهای براند و پاراستنی گرنگی.",
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
    <h2>ئامادەی بۆ دروستکردنی براندەکەت؟</h2>
    <p>ئەمڕۆ گەشتی گۆڕانکارییەکەت دەست پێبکە</p>

    <form className="contact-form">
      <input
        type="email"
        placeholder="ئیمەیڵەکەت بنووسە"
        required
      />
      <button type="submit">دەست پێبکە</button>
    </form>

    <p style={{ marginTop: "1.5rem", fontSize: "0.9rem" }}>
      یان پەیوەندیمان پێوە بکە لە ڕێگەی:
      <a
        href="tel:+1234567890"
        style={{ color: "var(--primary-gold)", textDecoration: "none" }}
      >
        {" "} +1 (234) 567-890
      </a>
    </p>
  </div>
</motion.section>


    </main>
  );
}

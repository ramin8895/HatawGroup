"use client";
import React from "react";
import { useParams } from "next/navigation";
import { motion, useScroll, useSpring } from "framer-motion";
import { Calendar, Clock, ArrowRight, ArrowLeft, Share2, Bookmark, User } from "lucide-react";
import Link from "next/link";
import { useGetBlogDetail } from "@/api/blogServices/useRequest";
import { useTranslations } from "next-intl"; // فرض بر استفاده از next-intl

const BASE_URL = "https://hataw.wbsoft.ir";

const BlogDetail = () => {
  const params = useParams();
  const locale = params.locale as string;
  const isRTL = locale === "ku" || locale === "fa"; // چک کردن جهت زبان
  const t = useTranslations("blog");

  const blogId = Number(params.code);
  const { data: blogResponse, isLoading, isError } = useGetBlogDetail(blogId);
  const blogData = blogResponse?.data;

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  if (isLoading)
    return (
      <div className="min-h-screen bg-[#121212] flex flex-col items-center justify-center gap-4">
        <div className="w-12 h-12 border-2 border-[#D4AF37] border-t-transparent rounded-full animate-spin" />
        <span className="text-[#D4AF37] font-light tracking-widest animate-pulse">
          {t("loading")}
        </span>
      </div>
    );

  if (isError || !blogData)
    return (
      <div className="min-h-screen bg-[#121212] flex items-center justify-center">
        <div className="text-center space-y-6">
          <p className="text-white/50 text-xl font-light">{t("error_not_found")}</p>
          <Link
            href={`/${locale}/blogs`}
            className="inline-block border border-[#D4AF37] text-[#D4AF37] px-8 py-3 rounded-full hover:bg-[#D4AF37] hover:text-[#121212] transition-all"
          >
            {t("back_to_blog")}
          </Link>
        </div>
      </div>
    );

  return (
    <main 
      dir={isRTL ? "rtl" : "ltr"} 
      className={`min-h-screen! bg-[#121212] text-[#b2b2b2] pb-32! selection:bg-[#D4AF37]/30 overflow-x-hidden ${isRTL ? 'font-kurdish' : 'font-sans'}`}
    >
      <motion.div
        className="fixed top-0! left-0! right-0! h-1! bg-[#D4AF37] z-[100] shadow-[0_0_15px_#D4AF37]"
        style={{ scaleX, originX: isRTL ? 1 : 0 }}
      />

      <header className="relative w-full! h-[85vh]! overflow-hidden flex items-end">
        <div className="absolute inset-0! z-0!">
          <motion.img
            initial={{ scale: 1.15, opacity: 0 }}
            animate={{ scale: 1, opacity: 0.4 }}
            src={blogData.featured_image ? `${BASE_URL}${blogData.featured_image}` : "/placeholder.png"}
            className="w-full! h-full! object-cover grayscale-[40%]"
            alt={blogData.titleBlog}
          />
          <div className="absolute inset-0! bg-gradient-to-t from-[#121212] via-[#121212]/70 to-transparent" />
        </div>

        <div className="max-w-5xl! mx-auto! px-6! relative z-10! w-full! pb-20!">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className={`flex flex-col ${isRTL ? 'items-end text-right' : 'items-start text-left'}`}
          >
            <Link
              href={`/${locale}/blogs`}
              className="group flex items-center gap-2! text-[#D4AF37]/70 text-sm! mb-8! hover:text-[#D4AF37] transition-colors"
            >
              {!isRTL && <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />}
              {t("back")}
              {isRTL && <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />}
            </Link>

            <span className="px-4 py-1.5 bg-[#D4AF37]/10 border border-[#D4AF37]/20 text-[#D4AF37] rounded-md text-[10px] font-bold uppercase tracking-[0.2em] mb-6">
              {blogData.categoryTitle}
            </span>

            <h1 className="text-4xl! md:text-7xl! font-bold leading-tight text-white mb-8! tracking-tight max-w-4xl">
              {blogData.titleBlog}
            </h1>

            <div className={`flex flex-wrap gap-6! text-[#b2b2b2] text-[11px] font-medium uppercase tracking-wider ${isRTL ? 'justify-end' : 'justify-start'}`}>
              <div className="flex items-center gap-2">
                <Clock size={14} className="text-[#D4AF37]" />
                <span>{blogData.languageTitle}</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar size={14} className="text-[#D4AF37]" />
                <span>{new Date().toLocaleDateString(locale === 'en' ? 'en-US' : 'fa-IR')}</span>
              </div>
              <div className={`flex items-center gap-2 ${isRTL ? 'border-r pr-6' : 'border-l pl-6'} border-white/10`}>
                <User size={14} className="text-[#D4AF37]" />
                <span className="text-[#b2b2b2]">{t("author")}</span>
              </div>
            </div>
          </motion.div>
        </div>
      </header>

      <section className={`max-w-6xl! mx-auto! px-6! mt-[-8vh]! relative z-20! flex flex-col ${isRTL ? 'lg:flex-row-reverse' : 'lg:flex-row'} gap-12!`}>
        <aside className="lg:w-20! shrink-0!">
          <div className="sticky top-28! flex lg:flex-col items-center justify-center gap-4! p-3! bg-[#1a1a1a]/80 border border-white/5 rounded-2xl backdrop-blur-md">
            <button title={t("save")} className="p-3 rounded-xl text-[#b2b2b2] hover:text-[#D4AF37] hover:bg-white/5 transition-all">
              <Bookmark size={20} />
            </button>
            <div className="w-6 h-px bg-white/5 lg:w-full" />
            <button title={t("share")} className="p-3 rounded-xl text-[#b2b2b2] hover:text-[#D4AF37] hover:bg-white/5 transition-all">
              <Share2 size={20} />
            </button>
          </div>
        </aside>

        <article className={`flex-1! ${isRTL ? 'text-right' : 'text-left'}`}>
          <div className="bg-[#1a1a1a]/40 border border-white/5! rounded-[2.5rem]! p-8! md:p-16! shadow-2xl relative overflow-hidden backdrop-blur-sm">
            <div className="absolute -top-20 -left-20 w-64 h-64 bg-[#D4AF37]/5 blur-[100px] pointer-events-none" />

            <div className="relative z-10">
              <div
                className={`text-xl! text-[#b2b2b2] leading-[2.2] rich-text-container ${isRTL ? 'rtl-content' : 'ltr-content'}`}
                dangerouslySetInnerHTML={{ __html: blogData.contentBlog }}
              />

              <div className={`mt-20! pt-8! border-t border-white/5 flex flex-wrap gap-3 ${isRTL ? 'justify-end' : 'justify-start'}`}>
                <span className="text-[#b2b2b2] text-xs self-center">{t("tags")}</span>
                <Link href="#" className="px-4! py-1.5! bg-white/5! border border-white/10 rounded-lg text-[11px] text-[#b2b2b2] hover:border-[#D4AF37]/50 hover:text-[#D4AF37] transition-all">
                  #{blogData.slug || "Hataw"}
                </Link>
              </div>
            </div>
          </div>

          <div className={`mt-10! flex flex-col ${isRTL ? 'md:flex-row-reverse' : 'md:flex-row'} gap-6`}>
            <div className={`flex-1 p-8 bg-[#1a1a1a]/20 border border-white/5 rounded-3xl hover:border-[#D4AF37]/30 transition-colors cursor-pointer group ${isRTL ? 'text-right' : 'text-left'}`}>
              <span className="text-[10px] text-[#D4AF37] uppercase tracking-widest block mb-2">{t("prev_post")}</span>
              <h4 className="text-[#b2b2b2] group-hover:text-white transition-colors">How to grow your brand?</h4>
            </div>
            <div className={`flex-1 p-8 bg-[#1a1a1a]/10 border border-white/5 rounded-3xl opacity-50 ${isRTL ? 'text-right' : 'text-left'}`}>
              <span className="text-[10px] text-[#b2b2b2] uppercase tracking-widest block mb-2">{t("next_post")}</span>
              <h4 className="text-[#b2b2b2]">{t("no_next")}</h4>
            </div>
          </div>
        </article>
      </section>

      <style jsx global>{`
        .rtl-content { direction: rtl; text-align: justify; }
        .ltr-content { direction: ltr; text-align: justify; }
        .rich-text-container p { margin-bottom: 1.8rem; }
        .rich-text-container h2, .rich-text-container h3 { color: white; margin-top: 2.5rem; margin-bottom: 1.2rem; font-weight: 700; }
        .rich-text-container strong { color: #d4af37; }
        .rich-text-container img { border-radius: 1.5rem; margin: 2rem auto; border: 1px solid rgba(255, 255, 255, 0.1); }
      `}</style>
    </main>
  );
};

export default BlogDetail;
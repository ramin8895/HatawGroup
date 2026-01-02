"use client";

import { useEffect, useState, useMemo, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import HomeSection from "@/components/HomePage/Home";
import AboutComponents from "@/components/HomePage/About";
import ServiceComponents from "@/components/HomePage/Services";
import { blogAPI } from "@/api";
import {
  ArrowLeft,
  ArrowRight,
  Trophy,
  Users,
  Zap,
  Star,
  Mail,
} from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import Link from "next/link";
import LotterySection from "@/components/LotterySection.tsx";
import Evaluating from "@/components/Evaluating";
import Assessment from "@/components/Assessment";
import AfterEvaluation from "@/components/AfterEvaluation";
import AssessmentForm from "@/components/AssessmentForm";

export function HomeContent({ locale, translations }: any) {
  const isRtl = locale === "fa" || locale === "ku";
  const router = useRouter();

  // استخراج بخش‌های مورد نیاز از فایل ترجمه
  const { Blog = {}, Portfolio = {}, Stats = {}, Contact = {} } = translations;

  const { data: latestBlogs, isLoading: blogsLoading } =
    blogAPI.useGetBlogList();

  // داده‌های بخش پورتفولیو داینامیک
  const portfolioItems = [
    {
      t: Portfolio.item1Title,
      d: Portfolio.item1Desc,
      img: "/api/placeholder/600/400",
    },
    {
      t: Portfolio.item2Title,
      d: Portfolio.item2Desc,
      img: "/api/placeholder/600/401",
    },
    {
      t: Portfolio.item3Title,
      d: Portfolio.item3Desc,
      img: "/api/placeholder/600/402",
    },
  ];

  // داده‌های بخش آمار داینامیک
  const statItems = [
    {
      n: "500+",
      l: Stats.successfulProjects,
      i: <Zap className="text-[#D4AF37]!" />,
    },
    {
      n: "250+",
      l: Stats.happyClients,
      i: <Users className="text-[#D4AF37]/70!" />,
    },
    {
      n: "15+",
      l: Stats.yearsExperience,
      i: <Star className="text-[#D4AF37]!" />,
    },
    {
      n: "98%",
      l: Stats.satisfaction,
      i: <Trophy className="text-[#D4AF37]/80!" />,
    },
  ];

  return (
    <main
      className="bg-[#121212]! text-[#E0E0E0]! overflow-x-hidden! selection:bg-[#D4AF37]/30 selection:text-[#D4AF37]"
      dir={isRtl ? "rtl" : "ltr"}
    >
      <HomeSection  />
      <AboutComponents />
<Evaluating/>

<Assessment/>
      {/* <ServiceComponents /> */}

      {/* --- Blog Section --- */}
      {/* <motion.section
        id="blog"
        className="relative! py-32!  bg-[#121212] overflow-hidden!"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
      >
        <div
          className={`absolute! top-0! ${
            isRtl ? "-right-20!" : "-left-20!"
          } w-[600px]! h-[600px]!  bg-[#D4AF37]/5! blur-[140px]! rounded-full! pointer-events-none!`}
        ></div>

        <div className="max-w-7xl! mx-auto! px-6! relative! z-10!">
          <div
            className={`flex! flex-col! md:flex-row! justify-between! items-end! mb-20! gap-8! ${
              isRtl ? "" : "md:flex-row-reverse"
            }`}
          >
            <div className={isRtl ? "text-right!" : "text-left!"}>
              <div
                className={`flex! items-center! gap-3! mb-4! ${
                  isRtl ? "justify-end!" : "justify-start!"
                }`}
              >
                <span className="text-[#D4AF37]! text-xl! font-black! tracking-[0.4em]! uppercase!">
                  {Blog.badge}
                </span>
                <div className="w-12! h-[1px]! bg-[#D4AF37]/50!"></div>
              </div>
              <h2 className="text-5xl! md:text-7xl! font-black! text-[#FFFFFF]! mb-6! tracking-tighter!">
                {Blog.title}{" "}
                <span className="text-transparent! bg-clip-text! bg-gradient-to-l! text-5xl! md:text-7xl! from-[#F5E1A4]! via-[#D4AF37]! to-[#F5E1A4]! animate-gradient-x!">
                  {Blog.titleAccent}
                </span>
              </h2>
            </div>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => router.push("/blogs")}
              className="group! flex! items-center! gap-4! px-10! py-5! bg-[#FFFFFF]/[0.02]! border! border-[#E0E0E0]/10! rounded-full! font-bold! text-[#E0E0E0]! hover:border-[#D4AF37]/50! transition-all! duration-500! backdrop-blur-md!"
            >
              <span className="group-hover:text-[#D4AF37]! transition-colors!">
                {Blog.viewAll}
              </span>
              <div
                className={`w-10! h-10! bg-[#D4AF37]! rounded-full! flex! items-center! justify-center! text-[#121212]! ${
                  isRtl ? "-mr-2!" : "-ml-2!"
                } group-hover:rotate-45! transition-transform! duration-500!`}
              >
                {isRtl ? <ArrowLeft size={20} /> : <ArrowRight size={20} />}
              </div>
            </motion.button>
          </div>

          <div className="grid grid-cols-1! md:grid-cols-2! lg:grid-cols-3! gap-10!">
            {latestBlogs?.data?.slice(0, 3).map((blog: any, index: number) => (
              <motion.div
                key={blog.id}
                className="group! relative! bg-[#FFFFFF]/[0.01]! border! border-[#E0E0E0]/5! rounded-[3rem]! overflow-hidden! hover:border-[#D4AF37]/30! transition-all! duration-500!"
              >
                <div className="relative! h-[280px]! m-4! overflow-hidden! rounded-[2.2rem]! bg-[#121212]!">
                  <Image
                    fill
                    src={blog.featured_image || "/api/placeholder/400/300"}
                    alt={blog.titleBlog}
                    className="object-cover! grayscale! group-hover:grayscale-0! group-hover:scale-110! transition-all! duration-1000!"
                  />
                  <div
                    className={`absolute! top-5! ${
                      isRtl ? "right-5!" : "left-5!"
                    } px-4! py-2! bg-[#121212]/80! backdrop-blur-md! border! border-[#D4AF37]/20! rounded-xl! text-[10px]! font-black! text-[#D4AF37]! uppercase! tracking-widest!`}
                  >
                    {Blog.category}
                  </div>
                </div>
                <div
                  className={`p-8! pt-2! ${
                    isRtl ? "text-right!" : "text-left!"
                  }`}
                >
                  <div
                    className={`flex! items-center! gap-4! mb-4! text-[#E0E0E0]/40! text-[10px]! font-bold! ${
                      isRtl ? "justify-end!" : "justify-start!"
                    }`}
                  >
                    <span className="w-1! h-1! bg-[#D4AF37]! rounded-full!"></span>
                    <span className="uppercase!">
                      {new Date(blog.createdAt).toLocaleDateString(
                        isRtl ? "fa-IR" : "en-US"
                      )}
                    </span>
                  </div>
                  <h3 className="text-2xl! font-bold! text-[#FFFFFF]! mb-6! leading-snug! group-hover:text-[#D4AF37]! transition-colors! line-clamp-2!">
                    {blog.titleBlog}
                  </h3>
                  <Link
                    href={`/blogs/${blog.slug}`}
                    className="inline-flex! items-center! gap-3! text-xs! font-black! uppercase! tracking-widest! text-[#D4AF37]! group/link!"
                  >
                    <div className="w-8! h-[1px]! bg-[#D4AF37]/30! group-hover/link:w-12! transition-all!"></div>
                    {Blog.readMore}
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section> */}
  <AfterEvaluation/>
      {/* --- Portfolio Section --- */}
      {/* <section
        id="portfolio"
        className="py-32! bg-[#121212]! border-t! border-[#E0E0E0]/5!"
      >
        <div className="max-w-7xl! mx-auto! px-6!">
          <div className="text-center! mb-20!">
            <h2 className="text-4xl! md:text-5xl! font-black! text-[#FFFFFF]! mb-6!">
              {Portfolio.title}{" "}
              <span className="text-[#D4AF37]! text-5xl!">{Portfolio.titleAccent}</span>
            </h2>
            <p className="text-[#E0E0E0]/50!">{Portfolio.subtitle}</p>
          </div>
          <div className="grid! grid-cols-1! md:grid-cols-2! lg:grid-cols-3! gap-8!">
            {portfolioItems.map((item, i) => (
              <motion.div
                key={i}
                whileHover={{ y: -10 }}
                className="group! relative! aspect-[4/5]! rounded-[2.5rem]! overflow-hidden! border! border-[#E0E0E0]/10! hover:border-[#D4AF37]/40! transition-colors!"
              >
                <Image
                  fill
                  src={item.img}
                  alt={item.t}
                  className="object-cover! grayscale! group-hover:grayscale-0! transition-all! duration-700!"
                />
                <div
                  className={`absolute! inset-0! bg-gradient-to-t! from-[#121212]! via-[#121212]/40! to-transparent! p-10! flex! flex-col! justify-end! ${
                    isRtl ? "text-right!" : "text-left!"
                  }`}
                >
                  <h3 className="text-2xl! font-bold! text-[#FFFFFF]! mb-2!">
                    {item.t}
                  </h3>
                  <p className="text-[#D4AF37]! text-sm! font-medium!">
                    {item.d}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section> */}

      {/* --- Stats Section --- */}
      {/* <section className="py-24! border-y! border-[#E0E0E0]/5! bg-[#FFFFFF]/[0.01]!">
        <div className="max-w-7xl! mx-auto! px-6!">
          <div className="grid! grid-cols-2! lg:grid-cols-4! gap-12!">
            {statItems.map((stat, i) => (
              <div key={i} className="text-center! group!">
                <div className="mb-6! flex! justify-center! transition-transform! duration-500! group-hover:scale-110!">
                  <div className="p-5! rounded-2xl! bg-[#D4AF37]/5! group-hover:bg-[#D4AF37]/10! border! border-[#D4AF37]/10!">
                    {stat.i}
                  </div>
                </div>
                <h4 className="text-4xl! md:text-5xl! font-black! text-[#FFFFFF]! mb-2!">
                  {stat.n}
                </h4>
                <p className="text-[#E0E0E0]/40! group-hover:text-[#D4AF37]! transition-colors! text-sm! font-bold! uppercase! tracking-widest!">
                  {stat.l}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section> */}

      {/* <LotterySection  translations={translations} locale={locale}/> */}

      {/* --- Contact Section --- */}
      {/* <section id="contact" className="py-32!">
        <div className="max-w-4xl! mx-auto! px-6! text-center!">
          <h2 className="text-5xl! font-black! text-[#FFFFFF]! mb-6!">
            {Contact.title}
          </h2>
          <p className="text-[#E0E0E0]/60! mb-12! text-lg!">
            {Contact.subtitle}
          </p>
          <form
            className="relative! max-w-lg! mx-auto!"
            onSubmit={(e) => e.preventDefault()}
          >
            <input
              type="email"
              placeholder={Contact.placeholder}
              className={`w-full! bg-[#FFFFFF]/5! border! border-[#E0E0E0]/10! rounded-2xl! py-6! px-8! text-[#FFFFFF]! outline-none! focus:border-[#D4AF37]! focus:bg-[#FFFFFF]/10! transition-all! placeholder:text-[#E0E0E0]/20! ${
                isRtl ? "pl-36!" : "pr-36!"
              }`}
            />
            <button
              className={`absolute! ${
                isRtl ? "left-2!" : "right-2!"
              } top-2! bottom-2! px-8! bg-[#D4AF37]! text-[#121212]! rounded-xl! font-black! hover:bg-[#FFFFFF]! hover:text-[#121212]! transition-all! flex! items-center! gap-2! shadow-[0_10px_20px_-10px_rgba(212,175,55,0.5)]!`}
            >
              {Contact.button} <Mail size={18} />
            </button>
          </form>
        </div>
      </section> */}
<AssessmentForm/>
      <style jsx global>{`
        @keyframes gradient-x {
          0%,
          100% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
        }
        .animate-gradient-x {
          background-size: 200% 200%;
          animation: gradient-x 15s ease infinite;
        }
      `}</style>
    </main>
  );
}

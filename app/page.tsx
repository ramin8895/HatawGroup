"use client";

import { useEffect, useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import HomeSection from "../components/HomePage/Home";
import AboutComponents from "../components/HomePage/About";
import ServiceComponents from "../components/HomePage/Services";
import { useSession } from "next-auth/react";
import { blogAPI } from "@/api";
import {
  ArrowLeft,
  Trophy,
  Users,
  Zap,
  Star,
  ExternalLink,
  Mail,
  Loader2,
} from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import Link from "next/link";
import LotterySection from "@/components/LotterySection.tsx";
import { Calendar } from "antd";

export default function HomePage() {
  const { data: latestBlogs, isLoading: blogsLoading } =
    blogAPI.useGetBlogList();
  const router = useRouter();

  return (
    <main className="bg-[#030712]! text-slate-200! overflow-x-hidden! selection:bg-amber-500/30 selection:text-amber-100">
      <HomeSection />
      <AboutComponents />
      <ServiceComponents />

      {/* --- بخش وبلاگ (Blog) --- */}
 <motion.section
  id="blog"
  className="relative! py-32! bg-[#030712] overflow-hidden!"
  initial="hidden"
  whileInView="visible"
  viewport={{ once: true, amount: 0.2 }}
>
  {/* المان‌های نوری پس‌زمینه */}
  <div className="absolute! top-0! -right-20! w-[600px]! h-[600px]! bg-amber-600/5! blur-[140px]! rounded-full! pointer-events-none!"></div>
  <div className="absolute! bottom-0! -left-20! w-[400px]! h-[400px]! bg-yellow-600/5! blur-[120px]! rounded-full! pointer-events-none!"></div>

  <div className="max-w-7xl! mx-auto! px-6! relative! z-10!">
    {/* هدر بخش وبلاگ */}
    <div className="flex! flex-col! md:flex-row! justify-between! items-end! mb-20! gap-8!">
      <div className="text-right!">
        <div className="flex! items-center! justify-end! gap-3! mb-4!">
          <span className="text-amber-500! text-xs! font-black! tracking-[0.4em]! uppercase!">
            Insights & News
          </span>
          <div className="w-12! h-[1px]! bg-amber-500/50!"></div>
        </div>
        <h2 className="text-5xl! md:text-7xl! font-black! text-white! mb-6! tracking-tighter!">
          دوایین لێدانی{" "}
          <span className="text-transparent! bg-clip-text! bg-gradient-to-l! from-amber-200! via-amber-500! to-amber-200! animate-gradient-x!">
            دنیای براندینگ
          </span>
        </h2>
      </div>
      
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => router.push("/blogs")}
        className="group! flex! items-center! gap-3! px-10! py-5! bg-white/[0.03]! border! border-white/10! rounded-full! font-bold! hover:border-amber-500/50! transition-all! duration-500! backdrop-blur-md!"
      >
        <span className="group-hover:text-amber-400! transition-colors!">بینینی هەموو بابەتەکان</span>
        <div className="w-10! h-10! bg-amber-500! rounded-full! flex! items-center! justify-center! text-black! -mr-2! group-hover:rotate-45! transition-transform! duration-500!">
          <ArrowLeft size={20} />
        </div>
      </motion.button>
    </div>

    {/* لیست کارت‌ها */}
    <div className="grid grid-cols-1! md:grid-cols-2! lg:grid-cols-3! gap-10!">
      {latestBlogs?.data?.slice(0, 3).map((blog: any, index: number) => (
        <motion.div
          key={blog.id}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          className="group! relative! bg-gradient-to-b! from-white/[0.05]! to-transparent! border! border-white/5! rounded-[3rem]! overflow-hidden! hover:border-amber-500/20! transition-all! duration-500!"
        >
          {/* بخش تصویر کارت */}
          <div className="relative! h-[280px]! m-4! overflow-hidden! rounded-[2.2rem]!">
            <Image
              fill
              src={blog.featured_image || "/api/placeholder/400/300"}
              alt={blog.titleBlog}
              className="object-cover! grayscale! group-hover:grayscale-0! group-hover:scale-110! transition-all! duration-1000!"
            />
            {/* تگ روی تصویر */}
            <div className="absolute! top-5! right-5! px-4! py-2! bg-black/60! backdrop-blur-md! border! border-white/10! rounded-xl! text-[10px]! font-black! text-amber-500! uppercase! tracking-widest!">
              Branding
            </div>
          </div>

          {/* محتوای کارت */}
          <div className="p-8! pt-2! text-right!">
            <div className="flex! items-center! justify-end! gap-4! mb-4! text-slate-500! text-[10px]! font-bold!">
              <span className="w-1! h-1! bg-amber-500/50! rounded-full!"></span>
              <span className="uppercase!">{new Date(blog.createdAt).toLocaleDateString("fa-IR")}</span>
            </div>

            <h3 className="text-2xl! font-bold! text-white! mb-6! leading-snug! group-hover:text-amber-400! transition-colors! line-clamp-2!">
              {blog.titleBlog}
            </h3>

            <Link
              href={`/blogs/${blog.slug}`}
              className="inline-flex! items-center! gap-3! text-xs! font-black! uppercase! tracking-widest! text-amber-500! group/link!"
            >
              <div className="w-8! h-[1px]! bg-amber-500/30! group-hover/link:w-12! transition-all!"></div>
              بۆ خوێندنەوە کلیک بکە
            </Link>
          </div>
          
          {/* افکت نوری کف کارت در هاور */}
          <div className="absolute! bottom-0! left-0! right-0! h-1/2! bg-gradient-to-t! from-amber-500/5! to-transparent! opacity-0! group-hover:opacity-100! transition-opacity!"></div>
        </motion.div>
      ))}
    </div>
  </div>
</motion.section>
      {/* --- بخش پورتفولیو (Portfolio) --- */}
      <section id="portfolio" className="py-32! bg-black/40!">
        <div className="max-w-7xl! mx-auto! px-6!">
          <div className="text-center! mb-20!">
            <h2 className="text-4xl! md:text-5xl! font-black! text-white! mb-6!">
              پروژه‌های <span className="text-amber-500!">شاخص</span>
            </h2>
            <p className="text-slate-400!">
              داستان برندهایی که با هم از نو ساختیم
            </p>
          </div>
          <div className="grid! grid-cols-1! md:grid-cols-2! lg:grid-cols-3! gap-8!">
            {[
              {
                t: "استارتاپ نوین",
                d: "بازسازی هویت بصری مدرن",
                img: "/api/placeholder/600/400",
              },
              {
                t: "برند لوکس فشن",
                d: "استراتژی ورود به بازار جهانی",
                img: "/api/placeholder/600/401",
              },
              {
                t: "فین‌تک آینده",
                d: "طراحی تجربه کاربری اختصاصی",
                img: "/api/placeholder/600/402",
              },
            ].map((item, i) => (
              <motion.div
                key={i}
                whileHover={{ y: -10 }}
                className="group! relative! aspect-[4/5]! rounded-[2.5rem]! overflow-hidden! border! border-white/10! hover:border-amber-500/40 transition-colors"
              >
                <Image
                  fill
                  src={item.img}
                  alt={item.t}
                  className="object-cover! grayscale! group-hover:grayscale-0! transition-all! duration-700!"
                />
                <div className="absolute! inset-0! bg-gradient-to-t! from-black! via-black/40! to-transparent! p-10! flex! flex-col! justify-end! text-right!">
                  <h3 className="text-2xl! font-bold! text-white! mb-2!">{item.t}</h3>
                  <p className="text-amber-200/80! text-sm!">{item.d}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* --- بخش آمار (Stats) --- */}
      <section className="py-24! border-y! border-white/5! bg-white/[0.01]!">
        <div className="max-w-7xl! mx-auto! px-6!">
          <div className="grid! grid-cols-2! lg:grid-cols-4! gap-12!">
            {[
              {
                n: "500+",
                l: "پروژه موفق",
                i: <Zap className="text-amber-400!" />,
              },
              {
                n: "250+",
                l: "مشتری راضی",
                i: <Users className="text-amber-200!" />,
              },
              {
                n: "15+",
                l: "سال تجربه",
                i: <Star className="text-amber-500!" />,
              },
              {
                n: "98%",
                l: "رضایت کامل",
                i: <Trophy className="text-amber-300!" />,
              },
            ].map((stat, i) => (
              <div key={i} className="text-center! group!">
                <div className="mb-4! flex! justify-center! group-hover:scale-110! transition-transform! p-4 rounded-full bg-amber-500/5 group-hover:bg-amber-500/10">
                  {stat.i}
                </div>
                <h4 className="text-4xl! md:text-5xl! font-black! text-white! mb-2!">
                  {stat.n}
                </h4>
                <p className="text-slate-500! group-hover:text-amber-500 transition-colors text-sm! font-medium!">
                  {stat.l}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- بخش جایزه (Award) مدرن --- */}
      <LotterySection />

      {/* --- بخش تماس (Contact) --- */}
      <section id="contact" className="py-32!">
        <div className="max-w-4xl! mx-auto! px-6! text-center!">
          <h2 className="text-4xl! font-black! text-white! mb-6!">آماده تغییر هستید؟</h2>
          <p className="text-slate-400! mb-12!">
            ایمیل خود را بگذارید تا مسیر برندینگ شما را ترسیم کنیم.
          </p>
          <form
            className="relative! max-w-lg! mx-auto!"
            onSubmit={(e) => e.preventDefault()}
          >
            <input
              type="email"
              placeholder="Email Address"
              className="w-full! bg-white/5! border! border-white/10! rounded-2xl! py-5! px-8! text-white outline-none! focus:border-amber-500! focus:bg-white/[0.08] transition-all!"
            />
            <button className="absolute! left-2! top-2! bottom-2! px-8! bg-amber-500! text-black! rounded-xl! font-bold! hover:bg-amber-400! transition-all! flex! items-center! gap-2! shadow-[0_0_15px_-3px_rgba(245,158,11,0.3)]">
              ثبت <Mail size={18} />
            </button>
          </form>
        </div>
      </section>

      <style jsx global>{`
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </main>
  );
}
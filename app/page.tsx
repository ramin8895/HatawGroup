"use client";

import { useEffect, useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import HomeSection from "../components/HomePage/Home";
import AboutComponents from "../components/HomePage/About";
import ServiceComponents from "../components/HomePage/Services";
import { useSession } from "next-auth/react";
import { blogAPI } from "@/api";
import { ArrowLeft, Trophy, Users, Zap, Star, ExternalLink, Mail, Loader2 } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import Link from "next/link";
import LotterySection from "@/components/LotterySection.tsx";

export default function HomePage() {
  const { data: latestBlogs, isLoading: blogsLoading } = blogAPI.useGetBlogList();
  const router = useRouter();
  
  // اصلاح سشن برای جلوگیری از ری‌لود مداوم
  // بهینه‌سازی انیمیشن
  const fadeInUp = useMemo(() => ({
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
  }), []);

  return (
    <main className="bg-[#030712]! text-white! overflow-x-hidden! selection:bg-indigo-500/30">
      <HomeSection />
      <AboutComponents />
      <ServiceComponents />

      {/* --- بخش وبلاگ (داینامیک) --- */}
      <motion.section
        id="blog"
        className="relative! py-32! overflow-hidden!"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <div className="absolute! top-0! -right-20! w-[500px]! h-[500px]! bg-indigo-600/10! blur-[120px]! rounded-full! pointer-events-none!"></div>
        <div className="max-w-7xl! mx-auto! px-6! relative! z-10!">
          <div className="flex! flex-col! md:flex-row! justify-between! items-end! mb-16! gap-8!">
            <div className="text-right!">
              <span className="text-indigo-400! text-sm! font-black! tracking-[0.3em]! uppercase! mb-4! block!">Journal</span>
              <h2 className="text-5xl! font-black! text-white! mb-6!">
                آخرین نبض <span className="text-transparent! bg-clip-text! bg-gradient-to-l! from-indigo-400! to-purple-400!">دنیای برندینگ</span>
              </h2>
            </div>
            <button 
              onClick={() => router.push("/blogs")} 
              className="group! flex! items-center! gap-3! px-8! py-4! bg-white/5! border! border-white/10! rounded-2xl! font-bold! hover:bg-indigo-600! transition-all!"
            >
              مشاهده همه مقالات <ArrowLeft size={20} className="group-hover:-translate-x-2! transition-transform!" />
            </button>
          </div>

          <div className="flex! gap-8! overflow-x-auto! pb-10! no-scrollbar! snap-x!">
            {latestBlogs?.data?.slice(0, 4).map((blog: any) => (
              <motion.div key={blog.id} whileHover={{ y: -10 }} className="min-w-[320px]! md:min-w-[400px]! snap-center! bg-white/[0.03]! border! border-white/5! rounded-[2.5rem]! overflow-hidden! group!">
                <div className="relative! h-60! overflow-hidden!">
                  <Image fill src={blog.featured_image || "/api/placeholder/400/300"} alt={blog.titleBlog} className="object-cover! transition-transform! duration-700! group-hover:scale-110!" />
                </div>
                <div className="p-8! text-right!">
                  <span className="text-indigo-400! text-xs! font-bold! mb-4! block!">{new Date(blog.createdAt).toLocaleDateString('fa-IR')}</span>
                  <h3 className="text-xl! font-bold! mb-4! group-hover:text-indigo-300! transition-colors! line-clamp-2!">{blog.titleBlog}</h3>
                  <Link href={`/blogs/${blog.slug}`} className="inline-flex! items-center! gap-2! text-sm! font-bold! text-white/50! group-hover:text-white! transition-colors!">
                    مطالعه کامل <ArrowLeft size={16} />
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* --- بخش پورتفولیو مدرن --- */}
      <section id="portfolio" className="py-32! bg-black/40!">
        <div className="max-w-7xl! mx-auto! px-6!">
          <div className="text-center! mb-20!">
            <h2 className="text-4xl! md:text-5xl! font-black! mb-6!">پروژه‌های <span className="text-indigo-500!">شاخص</span></h2>
            <p className="text-slate-400!">داستان برندهایی که با هم از نو ساختیم</p>
          </div>
          <div className="grid! grid-cols-1! md:grid-cols-2! lg:grid-cols-3! gap-8!">
            {[
              { t: "استارتاپ نوین", d: "بازسازی هویت بصری مدرن", img: "/api/placeholder/600/400" },
              { t: "برند لوکس فشن", d: "استراتژی ورود به بازار جهانی", img: "/api/placeholder/600/401" },
              { t: "فین‌تک آینده", d: "طراحی تجربه کاربری اختصاصی", img: "/api/placeholder/600/402" },
            ].map((item, i) => (
              <motion.div key={i} whileHover={{ y: -10 }} className="group! relative! aspect-[4/5]! rounded-[2.5rem]! overflow-hidden! border! border-white/10!">
                <Image fill src={item.img} alt={item.t} className="object-cover! grayscale! group-hover:grayscale-0! transition-all! duration-700!" />
                <div className="absolute! inset-0! bg-gradient-to-t! from-black! via-black/20! to-transparent! p-10! flex! flex-col! justify-end! text-right!">
                  <h3 className="text-2xl! font-bold! mb-2!">{item.t}</h3>
                  <p className="text-slate-300! text-sm!">{item.d}</p>
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
              { n: "500+", l: "پروژه موفق", i: <Zap className="text-yellow-500!" /> },
              { n: "250+", l: "مشتری راضی", i: <Users className="text-blue-500!" /> },
              { n: "15+", l: "سال تجربه", i: <Star className="text-purple-500!" /> },
              { n: "98%", l: "رضایت کامل", i: <Trophy className="text-indigo-500!" /> },
            ].map((stat, i) => (
              <div key={i} className="text-center! group!">
                <div className="mb-4! flex! justify-center! group-hover:scale-110! transition-transform!">{stat.i}</div>
                <h4 className="text-4xl! md:text-5xl! font-black! mb-2!">{stat.n}</h4>
                <p className="text-slate-500! text-sm! font-medium!">{stat.l}</p>
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
          <h2 className="text-4xl! font-black! mb-6!">آماده تغییر هستید؟</h2>
          <p className="text-slate-400! mb-12!">ایمیل خود را بگذارید تا مسیر برندینگ شما را ترسیم کنیم.</p>
          <form className="relative! max-w-lg! mx-auto!" onSubmit={(e) => e.preventDefault()}>
            <input type="email" placeholder="Email Address" className="w-full! bg-white/5! border! border-white/10! rounded-2xl! py-5! px-8! outline-none! focus:border-indigo-500! transition-all!" />
            <button className="absolute! left-2! top-2! bottom-2! px-8! bg-indigo-600! rounded-xl! font-bold! hover:bg-indigo-500! transition-all! flex! items-center! gap-2!">
              ثبت <Mail size={18} />
            </button>
          </form>
        </div>
      </section>

      <style jsx global>{`
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </main>
  );
}
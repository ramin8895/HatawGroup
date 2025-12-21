"use client";
import React, { useState, useEffect } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';
import { Calendar, Clock, ArrowRight, Share2, Bookmark, User, ChevronLeft } from 'lucide-react';
import Link from 'next/link';

const BlogDetail = () => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const blog = {
    title: "چگونه در دنیای شلوغ امروز، یک برند متمایز و برنده بسازیم؟",
    category: "استراتژی برند",
    date: "۲۰ مهر ۱۴۰۲",
    readTime: "۸ دقیقه مطالعه",
    author: "رضا محمدی",
    image: "/api/placeholder/1200/800",
  };

  return (
    <main className="min-h-screen! bg-[#030712] text-white pb-32! selection:bg-indigo-500/30">
      {/* نوار پیشرفت مطالعه */}
      <motion.div
        className="fixed top-0! left-0! right-0! h-1! bg-indigo-500 z-[100] origin-left"
        style={{ scaleX }}
      />

      {/* بخش هدر سینمایی */}
      <div className="relative w-full! h-[85vh]! overflow-hidden flex items-end">
        <div className="absolute inset-0! z-0!">
          <motion.img 
            initial={{ scale: 1.1 }}
            animate={{ scale: 1 }}
            transition={{ duration: 1.5 }}
            src={blog.image} 
            className="w-full! h-full! object-cover opacity-50" 
            alt={blog.title} 
          />
          <div className="absolute inset-0! bg-gradient-to-t from-[#030712] via-[#030712]/40 to-transparent"></div>
        </div>

        <div className="max-w-5xl! mx-auto! px-6! relative z-10! w-full! pb-20!">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="flex flex-col items-end text-right"
          >
            <Link href="/blogs" className="group flex items-center gap-2! text-indigo-400 text-sm! font-bold mb-8! hover:text-white transition-colors">
               بازگشت به مقالات <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </Link>
            
            <div className="px-5! py-1.5! bg-white/5! backdrop-blur-md border border-white/10 text-indigo-400 rounded-full! text-xs! font-black tracking-widest uppercase mb-6!">
              {blog.category}
            </div>
            
            <h1 className="text-4xl! md:text-7xl! font-black leading-[1.1] text-white mb-8! tracking-tight">
              {blog.title}
            </h1>

            <div className="flex flex-wrap justify-end gap-8! text-slate-400 text-sm! font-medium">
              <div className="flex items-center gap-2.5!">
                <span>{blog.readTime}</span> <Clock size={16} className="text-indigo-500" />
              </div>
              <div className="flex items-center gap-2.5!">
                <span>{blog.date}</span> <Calendar size={16} className="text-indigo-500" />
              </div>
              <div className="flex items-center gap-2.5!">
                <span>{blog.author}</span> <User size={16} className="text-indigo-500" />
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* بدنه مقاله */}
      <section className="max-w-7xl! mx-auto! px-6! mt-20! flex flex-col lg:flex-row-reverse gap-16!">
        
        {/* ابزارهای کناری شناور */}
        <aside className="lg:w-24! shrink-0!">
          <div className="sticky top-32! flex lg:flex-col items-center justify-center gap-4! p-3! bg-white/[0.03] border border-white/10 rounded-full! backdrop-blur-xl">
            <button className="w-14! h-14! rounded-full! flex items-center justify-center text-slate-400 hover:text-white hover:bg-white/10 transition-all">
              <Bookmark size={22} />
            </button>
            <div className="w-8! h-[1px]! bg-white/10 lg:w-full! lg:h-[1px]!"></div>
            <button className="w-14! h-14! rounded-full! flex items-center justify-center text-slate-400 hover:text-white hover:bg-white/10 transition-all">
              <Share2 size={22} />
            </button>
          </div>
        </aside>

        {/* محتوای متنی */}
        <article className="flex-1! text-right">
          <div className="bg-white/[0.02] border border-white/5! rounded-[3.5rem]! p-8! md:p-20! shadow-2xl relative overflow-hidden">
            {/* دکوراسیون نوری پس‌زمینه کارت */}
            <div className="absolute top-0! left-0! w-64! h-64! bg-indigo-500/5! blur-[100px]! rounded-full!"></div>

            <div className="relative z-10! prose prose-invert prose-indigo max-w-none!">
              <p className="text-2xl! md:text-3xl! text-slate-200 mb-16! font-light leading-[1.6]! border-r-4! border-indigo-500! pr-8!">
                دنیای امروز دیگر فضایی برای برندهای کپی‌کار ندارد. تمایز، تنها راه بقا در اقیانوس قرمز رقابت است.
              </p>
              
              <h2 className="text-3xl! md:text-4xl! font-black text-white mt-16! mb-8!">پارادایم‌های جدید برندینگ</h2>
              <p className="text-slate-400 text-lg! leading-[2]! mb-10!">
                لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با استفاده از طراحان گرافیک است. چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است، و برای شرایط فعلی تکنولوژی مورد نیاز.
              </p>

              <div className="my-16! relative group overflow-hidden rounded-[2.5rem]! border border-white/10">
                  <img src="/api/placeholder/900/500" alt="insight" className="w-full! transition-transform duration-700 group-hover:scale-105" />
                  <div className="absolute bottom-6! right-6! bg-black/60 backdrop-blur-md px-4! py-2! rounded-lg text-xs! text-white/70">
                    توضیح تصویر: تحلیل بصری هویت برند در سال ۲۰۲۵
                  </div>
              </div>

              <blockquote className="bg-indigo-500/10! p-10! my-16! rounded-[2rem]! border-r-2! border-indigo-500/50 relative">
                <span className="absolute top-4! right-6! text-6xl! text-indigo-500/20 font-serif">"</span>
                <p className="text-xl! text-slate-200 italic leading-relaxed">
                  برندینگ فراتر از یک لۆگو است؛ برندینگ یعنی قولی که به مشتری می‌دهید و هر روز آن را در تمام نقاط تماس زنده نگه می‌دارید.
                </p>
              </blockquote>

              <h3 className="text-2xl! font-black text-white mb-6!">نقشه راه تحول</h3>
              <ul className="space-y-4! text-slate-400 text-lg!">
                <li className="flex items-center justify-end gap-3!">شناسایی DNA برند <div className="w-2! h-2! bg-indigo-500 rounded-full"></div></li>
                <li className="flex items-center justify-end gap-3!">طراحی زبان بصری اختصاصی <div className="w-2! h-2! bg-indigo-500 rounded-full"></div></li>
                <li className="flex items-center justify-end gap-3!">اجرای یکپارچه در تمام پلتفرم‌ها <div className="w-2! h-2! bg-indigo-500 rounded-full"></div></li>
              </ul>
            </div>

            {/* بخش تگ‌ها */}
            <div className="mt-20! pt-10! border-t border-white/5! flex flex-wrap justify-end gap-3!">
              {["استراتژی", "هویت بصری", "بازاریابی دیجیتال"].map(tag => (
                <button key={tag} className="px-6! py-2.5! bg-white/5! border border-white/10 rounded-full! text-xs! font-bold text-slate-400 hover:bg-indigo-600 hover:text-white transition-all">
                  #{tag}
                </button>
              ))}
            </div>
          </div>

          {/* هدایت بین مقالات (بعدی/قبلی) */}
          <div className="mt-12! grid grid-cols-1 md:grid-cols-2 gap-6!">
            <div className="p-8! bg-white/[0.02] border border-white/5 rounded-[2rem] text-right group hover:bg-white/[0.04] transition-all cursor-pointer">
              <span className="text-[10px]! font-black text-indigo-500 uppercase tracking-widest mb-2! block">مقاله بعدی</span>
              <h4 className="text-lg! font-bold group-hover:text-indigo-400 transition-colors">روانشناسی رنگ‌ها در طراحی وب‌سایت‌های مدرن</h4>
            </div>
            <div className="p-8! bg-white/[0.02] border border-white/5 rounded-[2rem] text-right opacity-50">
              <span className="text-[10px]! font-black text-slate-500 uppercase tracking-widest mb-2! block">مقاله قبلی</span>
              <h4 className="text-lg! font-bold">اصول اولیه طراحی لوگو برای ستارتاپ‌ها</h4>
            </div>
          </div>
        </article>
      </section>

      {/* بخش CTA نهایی */}
      <section className="max-w-5xl! mx-auto! px-6! mt-40!">
        <div className="relative group overflow-hidden bg-gradient-to-br from-indigo-600 to-purple-800! p-12! md:p-20! rounded-[4rem]! shadow-3xl shadow-indigo-500/20 text-center">
          <div className="absolute inset-0! bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10"></div>
          <h3 className="text-4xl! md:text-5xl! font-black mb-6! relative z-10!">برند شما، داستان شماست</h3>
          <p className="text-white/80 text-lg! mb-10! max-w-xl! mx-auto! relative z-10!">آیا آماده‌اید تا فصل جدیدی از هویت کسب‌وکار خود را با تیم هاتا بنویسید؟</p>
          <button className="relative z-10! bg-white text-indigo-600 px-12! py-5! rounded-2xl! font-black text-lg! hover:scale-105 hover:shadow-2xl transition-all flex items-center gap-3! mx-auto!">
             دریافت مشاوره رایگان <ChevronLeft size={20} />
          </button>
        </div>
      </section>
    </main>
  );
};

export default BlogDetail;
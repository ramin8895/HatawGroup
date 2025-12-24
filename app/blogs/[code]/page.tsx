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
    <main className="min-h-screen! bg-[#080808] text-white pb-32! selection:bg-[#D4AF37]/30">
      {/* نوار پیشرفت مطالعه طلایی */}
      <motion.div
        className="fixed top-0! left-0! right-0! h-1! bg-[#D4AF37] z-[100] origin-left shadow-[0_0_10px_#D4AF37]"
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
            className="w-full! h-full! object-cover opacity-40" 
            alt={blog.title} 
          />
          <div className="absolute inset-0! bg-gradient-to-t from-[#080808] via-[#080808]/40 to-transparent"></div>
        </div>

        <div className="max-w-5xl! mx-auto! px-6! relative z-10! w-full! pb-20!">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="flex flex-col items-end text-right"
          >
            <Link href="/blogs" className="group flex items-center gap-2! text-[#D4AF37] text-sm! font-bold mb-8! hover:text-white transition-colors">
               بازگشت به مقالات <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </Link>
            
            <div className="px-5! py-1.5! bg-[#D4AF37]/10! backdrop-blur-md border border-[#D4AF37]/20 text-[#D4AF37] rounded-full! text-xs! font-black tracking-widest uppercase mb-6!">
              {blog.category}
            </div>
            
            <h1 className="text-4xl! md:text-7xl! font-black leading-[1.1] text-white mb-8! tracking-tight">
              {blog.title}
            </h1>

            <div className="flex flex-wrap justify-end gap-8! text-slate-400 text-sm! font-medium">
              <div className="flex items-center gap-2.5!">
                <span>{blog.readTime}</span> <Clock size={16} className="text-[#D4AF37]" />
              </div>
              <div className="flex items-center gap-2.5!">
                <span>{blog.date}</span> <Calendar size={16} className="text-[#D4AF37]" />
              </div>
              <div className="flex items-center gap-2.5!">
                <span>{blog.author}</span> <User size={16} className="text-[#D4AF37]" />
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
            <button className="w-14! h-14! rounded-full! flex items-center justify-center text-slate-400 hover:text-[#D4AF37] hover:bg-[#D4AF37]/10 transition-all">
              <Bookmark size={22} />
            </button>
            <div className="w-8! h-[1px]! bg-white/10 lg:w-full! lg:h-[1px]!"></div>
            <button className="w-14! h-14! rounded-full! flex items-center justify-center text-slate-400 hover:text-[#D4AF37] hover:bg-[#D4AF37]/10 transition-all">
              <Share2 size={22} />
            </button>
          </div>
        </aside>

        {/* محتوای متنی */}
        <article className="flex-1! text-right">
          <div className="bg-white/[0.01] border border-white/5! rounded-[3.5rem]! p-8! md:p-20! shadow-2xl relative overflow-hidden">
            {/* دکوراسیون نوری طلایی */}
            <div className="absolute top-0! left-0! w-64! h-64! bg-[#D4AF37]/5! blur-[100px]! rounded-full!"></div>

            <div className="relative z-10! prose prose-invert max-w-none!">
              <p className="text-2xl! md:text-3xl! text-slate-200 mb-16! font-light leading-[1.6]! border-r-4! border-[#D4AF37]! pr-8!">
                دنیای امروز دیگر فضایی برای برندهای کپی‌کار ندارد. تمایز، تنها راه بقا در اقیانوس قرمز رقابت است.
              </p>
              
              <h2 className="text-3xl! md:text-4xl! font-black text-white mt-16! mb-8!">پارادایم‌های جدید برندینگ</h2>
              <p className="text-slate-400 text-lg! leading-[2]! mb-10!">
                برندینگ در سال ۲۰۲۵ دیگر صرفاً درباره زیبایی بصری نیست؛ بلکه درباره ایجاد یک تجربه عاطفی عمیق در تمام نقاط تماس مشتری است.
              </p>

              <blockquote className="bg-[#D4AF37]/5! p-10! my-16! rounded-[2rem]! border-r-4! border-[#D4AF37] relative">
                <span className="absolute top-4! right-6! text-6xl! text-[#D4AF37]/20 font-serif">"</span>
                <p className="text-xl! text-slate-200 italic leading-relaxed">
                  برندینگ فراتر از یک لۆگو است؛ برندینگ یعنی قولی که به مشتری می‌دهید و هر روز آن را زنده نگه می‌دارید.
                </p>
              </blockquote>

              <h3 className="text-2xl! font-black text-white mb-6!">نقشه راه تحول</h3>
              <ul className="space-y-4! text-slate-400 text-lg!">
                <li className="flex items-center justify-end gap-3!">شناسایی DNA برند <div className="w-2! h-2! bg-[#D4AF37] rounded-full shadow-[0_0_8px_#D4AF37]"></div></li>
                <li className="flex items-center justify-end gap-3!">طراحی زبان بصری اختصاصی <div className="w-2! h-2! bg-[#D4AF37] rounded-full shadow-[0_0_8px_#D4AF37]"></div></li>
                <li className="flex items-center justify-end gap-3!">اجرای یکپارچه در پلتفرم‌ها <div className="w-2! h-2! bg-[#D4AF37] rounded-full shadow-[0_0_8px_#D4AF37]"></div></li>
              </ul>
            </div>

            {/* بخش تگ‌ها */}
            <div className="mt-20! pt-10! border-t border-white/5! flex flex-wrap justify-end gap-3!">
              {["استراتژی", "هویت بصری", "بازاریابی"].map(tag => (
                <button key={tag} className="px-6! py-2.5! bg-white/5! border border-white/10 rounded-full! text-xs! font-bold text-slate-400 hover:border-[#D4AF37] hover:text-[#D4AF37] transition-all">
                  #{tag}
                </button>
              ))}
            </div>
          </div>

          {/* هدایت بین مقالات */}
          <div className="mt-12! grid grid-cols-1 md:grid-cols-2 gap-6!">
            <div className="p-8! bg-white/[0.02] border border-white/5 rounded-[2.5rem] text-right group hover:border-[#D4AF37]/30 transition-all cursor-pointer">
              <span className="text-[10px]! font-black text-[#D4AF37] uppercase tracking-widest mb-2! block">مقاله بعدی</span>
              <h4 className="text-lg! font-bold group-hover:text-[#D4AF37] transition-colors">روانشناسی رنگ‌ها در طراحی مدرن</h4>
            </div>
            <div className="p-8! bg-white/[0.01] border border-white/5 rounded-[2.5rem] text-right opacity-40">
              <span className="text-[10px]! font-black text-slate-500 uppercase tracking-widest mb-2! block">مقاله قبلی</span>
              <h4 className="text-lg! font-bold">اصول اولیه طراحی لوگو</h4>
            </div>
          </div>
        </article>
      </section>

      {/* بخش CTA نهایی طلایی */}
      <section className="max-w-5xl! mx-auto! px-6! mt-40!">
        <div className="relative group overflow-hidden bg-black! border border-[#D4AF37]/30 p-12! md:p-20! rounded-[4rem]! text-center">
          <div className="absolute inset-0! bg-gradient-to-br from-[#D4AF37]/10 to-transparent opacity-50"></div>
          <h3 className="text-4xl! md:text-5xl! font-black mb-6! relative z-10!">برند شما، داستان شماست</h3>
          <p className="text-white/60 text-lg! mb-10! max-w-xl! mx-auto! relative z-10!">آیا آماده‌اید تا فصل جدیدی از هویت کسب‌وکار خود را با تیم هاتا بنویسید؟</p>
          <button className="relative z-10! bg-gradient-to-r from-[#B8860B] via-[#D4AF37] to-[#FFD700] text-black px-12! py-5! rounded-2xl! font-black text-lg! hover:scale-105 hover:shadow-[0_0_30px_rgba(212,175,55,0.4)] transition-all flex items-center gap-3! mx-auto!">
              دریافت مشاوره رایگان <ChevronLeft size={20} />
          </button>
        </div>
      </section>
    </main>
  );
};

export default BlogDetail;
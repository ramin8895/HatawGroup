"use client";
import React from 'react';
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
    title: "چۆن لە جیهانی قەرەباڵغی ئەمڕۆدا، براندێکی جیاواز و براوە دروست بکەین؟",
    category: "ستراتیژی براند",
    date: "٢٠ی ئۆکتۆبەری ٢٠٢٥",
    readTime: "٨ خولەک خوێندنەوە",
    author: "هاتا گروپ",
    image: "https://images.unsplash.com/photo-1497215728101-856f4ea42174?q=80&w=1200&auto=format&fit=crop",
  };

  return (
    <main className="min-h-screen! bg-[#121212] text-[#FFFFFF] pb-32! selection:bg-[#D4AF37]/30">
      {/* نوار پیشرفت مطالعه متالیک */}
      <motion.div
        className="fixed top-0! left-0! right-0! h-1.5! bg-gradient-to-r from-[#B8860B] via-[#D4AF37] to-[#F5E1A4] z-[100] origin-left shadow-[0_0_15px_#D4AF37]"
        style={{ scaleX }}
      />

      {/* بخش هدر سینمایی با اورلی تیره */}
      <div className="relative w-full! h-[90vh]! overflow-hidden flex items-end">
        <div className="absolute inset-0! z-0!">
          <motion.img 
            initial={{ scale: 1.1 }}
            whileInView={{ scale: 1 }}
            transition={{ duration: 2 }}
            src={blog.image} 
            className="w-full! h-full! object-cover opacity-30 grayscale-[50%]" 
            alt={blog.title} 
          />
          <div className="absolute inset-0! bg-gradient-to-t from-[#121212] via-[#121212]/60 to-transparent"></div>
        </div>

        <div className="max-w-5xl! mx-auto! px-6! relative z-10! w-full! pb-24!">
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="flex flex-col items-end text-right"
          >
            <Link href="/blogs" className="group flex items-center gap-2! text-[#D4AF37] text-sm! font-black mb-10! tracking-widest hover:text-white transition-all">
               گەڕانەوە بۆ وتارەکان <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </Link>
            
            <div className="px-6! py-2! bg-[#D4AF37]/10! backdrop-blur-xl border border-[#D4AF37]/30 text-[#D4AF37] rounded-full! text-[10px]! font-black tracking-[0.3em] uppercase mb-8!">
              {blog.category}
            </div>
            
            <h1 className="text-5xl! md:text-8xl! font-black leading-[1] text-white mb-10! tracking-tighter">
              {blog.title}
            </h1>

            <div className="flex flex-wrap justify-end gap-8! text-[#E0E0E0]/40 text-xs! font-black uppercase tracking-widest">
              <div className="flex items-center gap-3!">
                <span>{blog.readTime}</span> <Clock size={16} className="text-[#D4AF37]" />
              </div>
              <div className="flex items-center gap-3!">
                <span>{blog.date}</span> <Calendar size={16} className="text-[#D4AF37]" />
              </div>
              <div className="flex items-center gap-3!">
                <span>{blog.author}</span> <User size={16} className="text-[#D4AF37]" />
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* بدنه مقاله */}
      <section className="max-w-7xl! mx-auto! px-6! mt-[-10vh]! relative z-20! flex flex-col lg:flex-row-reverse gap-16!">
        
        {/* ابزارهای کناری (Floating Sidebar) */}
        <aside className="lg:w-24! shrink-0!">
          <div className="sticky top-32! flex lg:flex-col items-center justify-center gap-6! p-4! bg-[#121212]/50! border border-[#E0E0E0]/10 rounded-full! backdrop-blur-2xl shadow-2xl">
            <button className="w-14! h-14! rounded-full! flex items-center justify-center text-[#E0E0E0]/40 hover:text-[#D4AF37] hover:bg-[#D4AF37]/10 transition-all group">
              <Bookmark size={22} className="group-hover:scale-110 transition-transform" />
            </button>
            <div className="w-8! h-[1px]! bg-[#E0E0E0]/10 lg:w-full! lg:h-[1px]!"></div>
            <button className="w-14! h-14! rounded-full! flex items-center justify-center text-[#E0E0E0]/40 hover:text-[#D4AF37] hover:bg-[#D4AF37]/10 transition-all group">
              <Share2 size={22} className="group-hover:scale-110 transition-transform" />
            </button>
          </div>
        </aside>

        {/* محتوای متنی با پلت تیره */}
        <article className="flex-1! text-right">
          <div className="bg-[#FFFFFF]/[0.02] border border-[#E0E0E0]/5! rounded-[4rem]! p-10! md:p-24! shadow-3xl relative overflow-hidden">
            {/* Ambient Gold Glow */}
            <div className="absolute top-0! left-0! w-96! h-96! bg-[#D4AF37]/5! blur-[120px]! rounded-full! pointer-events-none"></div>

            <div className="relative z-10! prose prose-invert max-w-none!">
              <p className="text-2xl! md:text-4xl! text-[#E0E0E0] mb-16! font-medium leading-[1.6]! border-r-[6px]! border-[#D4AF37]! pr-10!">
                دنیای ئەمڕۆ چیتر شوێنی براندە کۆپیکەرەکان نییە. جیاوازی، تەنها ڕێگەی مانەوەیە لە دەریای سووری ڕکابەریدا.
              </p>
              
              <h2 className="text-4xl! md:text-5xl! font-black text-white mt-20! mb-10!">پارادایمە نوێیەکانی براندینگ</h2>
              <p className="text-[#E0E0E0]/60 text-xl! leading-[2.2]! mb-12!">
                براندینگ لە ساڵی ٢٠٢٥ چیتر تەنها دەربارەی جوانی بینین نییە؛ بەڵکو دەربارەی دروستکردنی ئەزموونێکی سۆزداری قووڵە لە هەموو خاڵەکانی پەیوەندی کڕیاردا.
              </p>

              <blockquote className="bg-[#D4AF37]/5! p-12! my-20! rounded-[3rem]! border-r-4! border-[#D4AF37] relative overflow-hidden">
                <span className="absolute -top-6! -right-2! text-[12rem]! text-[#D4AF37]/10 font-serif leading-none">"</span>
                <p className="text-2xl! text-[#E0E0E0] italic leading-relaxed relative z-10!">
                  براندینگ فرەتر لە لۆگۆیە؛ براندینگ واتە ئەو بەڵێنەی بە کڕیار دەیدەیت و هەموو ڕۆژێک بە زیندویی دەیهێڵیتەوە.
                </p>
              </blockquote>

              <h3 className="text-3xl! font-black text-white mb-8!">نەخشەی ڕێگای گۆڕانکاری</h3>
              <ul className="space-y-6! text-[#E0E0E0]/60 text-xl!">
                {[
                  "ناسینەوەی DNAی براند",
                  "دیزاینی زمانی بینینی تایبەت",
                  "جێبەجێکردنی یەکگرتوو لە هەموو پلاتفۆرمەکان"
                ].map((item, idx) => (
                  <li key={idx} className="flex items-center justify-end gap-4!">
                    {item} <div className="w-2.5! h-2.5! bg-[#D4AF37] rounded-full shadow-[0_0_12px_#D4AF37]"></div>
                  </li>
                ))}
              </ul>
            </div>

            {/* بخش تگ‌ها */}
            <div className="mt-24! pt-12! border-t border-[#E0E0E0]/5! flex flex-wrap justify-end gap-4!">
              {["ستراتیژی", "ناسنامەی بصری", "بازاڕگەری"].map(tag => (
                <button key={tag} className="px-8! py-3! bg-[#121212]! border border-[#E0E0E0]/10 rounded-full! text-[11px]! font-black text-[#E0E0E0]/40 hover:border-[#D4AF37] hover:text-[#D4AF37] transition-all uppercase tracking-widest">
                  #{tag}
                </button>
              ))}
            </div>
          </div>

          {/* هدایت بین مقالات (Next/Prev) */}
          <div className="mt-12! grid grid-cols-1 md:grid-cols-2 gap-8!">
            <div className="p-10! bg-[#FFFFFF]/[0.03] border border-[#E0E0E0]/5 rounded-[3rem] text-right group hover:border-[#D4AF37]/40 transition-all cursor-pointer">
              <span className="text-[10px]! font-black text-[#D4AF37] uppercase tracking-[0.3em] mb-4! block">وتاری داهاتوو</span>
              <h4 className="text-xl! font-bold group-hover:text-[#D4AF37] transition-colors leading-tight">دەروونناسی ڕەنگەکان لە دیزاینی مۆدێرندا</h4>
            </div>
            <div className="p-10! bg-[#FFFFFF]/[0.01] border border-[#E0E0E0]/5 rounded-[3rem] text-right opacity-40 grayscale!">
              <span className="text-[10px]! font-black text-[#E0E0E0]/40 uppercase tracking-[0.3em] mb-4! block">وتاری پێشوو</span>
              <h4 className="text-xl! font-bold leading-tight">بنەما سەرەتاییەکانی دیزاینی لۆگۆ</h4>
            </div>
          </div>
        </article>
      </section>

      {/* بخش CTA نهایی لوکس */}
      <section className="max-w-5xl! mx-auto! px-6! mt-48!">
        <div className="relative group overflow-hidden bg-[#121212]! border border-[#D4AF37]/20 p-16! md:p-28! rounded-[5rem]! text-center shadow-3xl">
          <div className="absolute inset-0! bg-gradient-to-br from-[#D4AF37]/10 via-transparent to-transparent opacity-40 group-hover:opacity-60 transition-opacity"></div>
          <h3 className="text-5xl! md:text-7xl! font-black mb-8! relative z-10! tracking-tighter">براندەکەت، چیرۆکی تۆیە</h3>
          <p className="text-[#E0E0E0]/50 text-xl! mb-12! max-w-xl! mx-auto! relative z-10! font-medium">ئامادەیت بۆ نووسینەوەی بەشێکی نوێ لە گەشتە بازرگانییەکەت لەگەڵ تیمەکامان؟</p>
          <button className="relative z-10! bg-[#D4AF37] text-[#121212] px-16! py-6! rounded-[2rem]! font-black text-xl! hover:scale-105 hover:shadow-[0_20px_40px_rgba(212,175,55,0.3)] transition-all flex items-center gap-4! mx-auto!">
              وەرگرتنی ڕاوێژی بێبەرامبەر <ChevronLeft size={24} />
          </button>
        </div>
      </section>
    </main>
  );
};

export default BlogDetail;
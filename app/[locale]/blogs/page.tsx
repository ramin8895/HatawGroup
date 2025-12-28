"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  Search,
  Calendar,
  ArrowUpLeft,
  Clock,
  ChevronLeft,
} from "lucide-react";
import Link from "next/link";
import { blogAPI } from "@/api";

const BlogPage = () => {
  const [selectedCategory, setSelectedCategory] = useState("همه");
  const categories = ["همه", "استراتژی", "برندینگ", "دیزاین", "تجربه کاربری"];
  const { data: latestBlogs, isLoading } = blogAPI.useGetBlogList();

  return (
    <main className="min-h-screen! bg-[#080808] text-white py-32! px-6! overflow-hidden">
      <div className="max-w-7xl! mx-auto!">
        <div className="flex flex-col lg:flex-row-reverse gap-16! items-start">
          {/* Sidebar (سمت راست) */}
          <aside className="w-full! lg:w-72! sticky top-32! z-20!">
            <div className="bg-white/[0.02] border border-white/5! rounded-[2.5rem]! p-8! backdrop-blur-xl">
              {/* جستجو */}
              <div className="relative mb-10!">
                <input
                  type="text"
                  placeholder="جستجو در مقالات..."
                  className="w-full! bg-white/5! border border-white/10! rounded-2xl! py-3! pr-12! pl-4! text-sm! outline-none focus:border-[#D4AF37]/50 transition-all"
                />
                <Search
                  className="absolute right-4! top-1/2! -translate-y-1/2! text-slate-500"
                  size={18}
                />
              </div>

              {/* فیلترها */}
              <div className="space-y-6!">
                <h3 className="text-xs! font-bold text-slate-500 uppercase tracking-widest text-right">
                  فیلتر موضوعی
                </h3>
                <div className="flex flex-wrap lg:flex-col gap-2!">
                  {categories.map((cat) => (
                    <button
                      key={cat}
                      onClick={() => setSelectedCategory(cat)}
                      className={`px-5! py-2.5! rounded-xl! text-sm! text-right transition-all duration-300 ${
                        selectedCategory === cat
                          ? "bg-[#D4AF37] text-black shadow-lg shadow-[#D4AF37]/20"
                          : "bg-transparent text-slate-400 hover:bg-white/5 hover:text-white"
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </aside>

          {/* لیست مقالات */}
          <div className="flex-1! w-full!">
            <div className="grid grid-cols-1! gap-12!">
              {latestBlogs?.data.map((item: any, index: number) => (
                <motion.article
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="group relative"
                >
                  <Link
                    href={`/blogs/${item.id}`}
                    className="block relative overflow-hidden bg-white/[0.02] border border-white/5! rounded-[3rem]! p-6! md:p-10! hover:bg-white/[0.04] hover:border-[#D4AF37]/30 transition-all duration-500"
                  >
                    <div className="flex flex-col md:flex-row-reverse gap-10! items-center">
                      {/* تصویر مقاله */}
                      <div className="relative w-full! md:w-80! shrink-0! aspect-[16/10]! md:aspect-square! rounded-[2.5rem]! overflow-hidden shadow-2xl">
                        <img
                          src={`/api/placeholder/800/800`}
                          alt="blog"
                          className="w-full! h-full! object-cover transition-transform duration-1000 group-hover:scale-110"
                        />
                        <div className="absolute inset-0! bg-[#D4AF37]/10! opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                      </div>

                      {/* محتوای مقاله */}
                      <div className="flex-1! text-right w-full!">
                        <div className="flex items-center justify-end gap-6! text-[11px]! font-bold text-[#D4AF37]/70 mb-6! uppercase tracking-widest">
                          <span className="flex items-center gap-2!">
                            <Clock size={14} /> ۵ دقیقه مطالعه
                          </span>
                          <span className="flex items-center gap-2!">
                            <Calendar size={14} /> ۱۴۰۲/۱۰/۱۲
                          </span>
                        </div>

                        <h2 className="text-2xl! md:text-3xl! font-bold leading-tight mb-6! group-hover:text-[#D4AF37] transition-colors">
                          {item.titleBlog || "عنوان مقاله"}
                        </h2>

                        <p className="text-slate-400 text-sm! leading-relaxed line-clamp-2 mb-8! font-light">
                          تمایز تنها یک انتخاب نیست، یک ضرورت است. در این مطلب
                          به بررسی استراتژی‌هایی می‌پردازیم که برندهای معمولی را
                          به رهبران بازار تبدیل می‌کند.
                        </p>

                        <div className="flex items-center justify-end">
                          <div className="flex items-center gap-3! text-sm! font-black text-white group/btn">
                            <span className="group-hover/btn:text-[#D4AF37] transition-colors">
                              مشاهده مقاله
                            </span>
                            <div className="w-10! h-10! rounded-full! bg-white/5! border border-white/10! flex items-center justify-center group-hover/btn:bg-[#D4AF37] group-hover/btn:border-[#D4AF37] group-hover/btn:text-black transition-all">
                              <ArrowUpLeft size={18} />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Link>
                </motion.article>
              ))}
            </div>

            {/* Pagination */}
            <div className="mt-20! flex justify-center gap-4!">
              <button className="w-12! h-12! rounded-full! border border-white/10! flex items-center justify-center hover:bg-[#D4AF37] hover:text-black hover:border-[#D4AF37] transition-all">
                <ChevronLeft size={20} />
              </button>
              {latestBlogs?.data &&
                Array.from({
                  length: Math.ceil(latestBlogs.data.length / 6) || 3,
                }).map((_, index) => {
                  const pageNumber = index + 1;
                  return (
                    <button
                      key={pageNumber}
                      className={`w-12! h-12! rounded-full! border transition-all ${
                        pageNumber === 1 // اینجا بعداً می‌توانید یک State برای currentPage تعریف کنید
                          ? "bg-[#D4AF37] border-[#D4AF37] text-black font-bold"
                          : "border-white/10 text-white hover:bg-white/5"
                      }`}
                    >
                      {pageNumber}
                    </button>
                  );
                })}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default BlogPage;

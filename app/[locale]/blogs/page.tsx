"use client";
import React, { useState, useMemo } from "react";
import { useParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Calendar, ArrowUpLeft, ArrowUpRight, Hash } from "lucide-react";
import Link from "next/link";
import { blogAPI } from "@/api";

const BASE_URL = "https://hataw.wbsoft.ir";

const BlogPage = () => {
  const params = useParams();
  const locale = (params.locale as string) || "ku";
  const isRTL = locale === "ku" || locale === "fa";

  const [searchTerm, setSearchTerm] = useState("");
  const { data: latestBlogs, isLoading } = blogAPI.useGetBlogList();

  const dict = {
    title: isRTL ? "گۆشەی" : "THE",
    titleBold: isRTL ? "بیرکردنەوە" : "JOURNAL",
    description: isRTL 
      ? "لێرەدا نوێترین وتار و بیرۆکەکانمان لەسەر تەکنەلۆژیا و دیزاین دەخەینە ڕوو." 
      : "Exploring the intersection of design, technology, and future-forward ideas.",
    searchPlaceholder: isRTL ? "گەڕان لە وتارەکان..." : "Search articles...",
    categoriesTitle: isRTL ? "پۆلێنەکان" : "CATEGORIES",
    all: isRTL ? "هەموو" : "All",
    readMore: isRTL ? "خوێندنەوەی زیاتر" : "READ ARTICLE",
    noResult: isRTL ? "هیچ بابەتێک نەدۆزرایەوە" : "No articles found",
  };

  const [selectedCategory, setSelectedCategory] = useState(dict.all);

  const blogsByLanguage = useMemo(() => {
    if (!latestBlogs?.data) return [];
    return latestBlogs.data.filter((blog: any) => {
      if (locale === "en") {
        return blog.languageTitle === "English" || blog.languageId === 2;
      }
      return blog.languageTitle !== "English";
    });
  }, [latestBlogs, locale]);

  const dynamicCategories = useMemo(() => {
    const cats = blogsByLanguage.map((item: any) => item.categoryTitle);
    return [dict.all, ...Array.from(new Set(cats))];
  }, [blogsByLanguage, dict.all]);

  const filteredBlogs = useMemo(() => {
    return blogsByLanguage.filter((blog: any) => {
      const matchesSearch = blog.titleBlog?.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategory === dict.all || blog.categoryTitle === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [blogsByLanguage, searchTerm, selectedCategory, dict.all]);

  const stripHtml = (html: string) => (html ? html.replace(/<[^>]*>/g, "") : "");

  return (
    <main 
      dir={isRTL ? "rtl" : "ltr"}
      className="min-h-screen! bg-[#0a0a0a]! text-[#E0E0E0]! py-24! px-6! md:px-12! overflow-x-hidden! selection:bg-[#D4AF37]/30! selection:text-[#FFD700]!"
    >
      {/* Background Gradients for Depth */}
      <div className="fixed! top-0! left-0! w-full! h-full! bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))]! from-[#1a1a1a]! via-[#0a0a0a]! to-[#0a0a0a]! -z-10!" />
      
      <div className="max-w-7xl! mx-auto!">
        
        {/* Header Section */}
        <header className={`mb-24! relative! ${isRTL ? 'text-right!' : 'text-left!'}`}>
          <motion.div 
            initial={{ opacity: 0, x: isRTL ? -50 : 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1 }}
            className={`absolute! ${isRTL ? '-left-20!' : '-right-20!'} -top-20! text-[140px]! lg:text-[180px]! font-black! text-white/[0.02]! select-none! pointer-events-none! hidden! md:block!`}
          >
            {isRTL ? "JOURNAL" : "BLOG"}
          </motion.div>
          
          <div className="relative! z-10!">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex! items-center! gap-4! mb-6!"
            >
               <span className="h-px! w-12! bg-[#D4AF37]! inline-block!" />
               <span className="text-[#D4AF37]! text-xs! uppercase! tracking-[0.3em]! font-bold!">
                 {isRTL ? "بلۆگی فەرمی" : "Official Blog"}
               </span>
            </motion.div>

            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-5xl! md:text-7xl! lg:text-8xl! font-light! tracking-tight! mb-8! text-white!"
            >
              {dict.title} <span className="font-serif! italic! text-transparent! bg-clip-text! bg-gradient-to-r! from-[#D4AF37]! to-[#F4CF57]! pr-2!">{dict.titleBold}</span>
            </motion.h1>
            
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className={`text-white/50! text-lg! md:text-xl! max-w-2xl! leading-relaxed! ${isRTL ? 'mr-0! ml-auto!' : 'ml-0! mr-auto!'}`}
            >
              {dict.description}
            </motion.p>
          </div>
        </header>

        <div className={`flex! flex-col! ${isRTL ? 'lg:flex-row-reverse!' : 'lg:flex-row!'} gap-16! lg:gap-24! items-start!`}>
          
          {/* Sidebar */}
          <aside className="w-full! lg:w-72! sticky! top-8! z-20!">
            <div className="p-6! rounded-3xl! bg-white/[0.02]! border! border-white/[0.05]! backdrop-blur-sm!">
              {/* Search */}
              <div className="relative! group! mb-12!">
                <input
                  type="text"
                  placeholder={dict.searchPlaceholder}
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className={`w-full! bg-[#121212]! border! border-white/10! rounded-2xl! py-4! text-sm! text-white! placeholder:text-white/20! outline-none! focus:border-[#D4AF37]/50! focus:bg-black! transition-all! duration-300! ${isRTL ? 'pr-12! pl-4! text-right!' : 'pl-12! pr-4! text-left!'}`}
                />
                <Search className={`absolute! ${isRTL ? 'right-4!' : 'left-4!'} top-1/2! -translate-y-1/2! text-white/30! group-focus-within:text-[#D4AF37]! transition-colors!`} size={18} />
              </div>

              {/* Navigation */}
              <nav className={isRTL ? 'text-right!' : 'text-left!'}>
                <h3 className="text-[11px]! font-bold! text-white/30! uppercase! tracking-[0.2em]! mb-6! px-2!">{dict.categoriesTitle}</h3>
                <ul className="space-y-2!">
                  {dynamicCategories.map((cat: any) => (
                    <li key={cat}>
                      <button
                        onClick={() => setSelectedCategory(cat)}
                        className={`group! flex! items-center! gap-3! w-full! py-3! px-4! rounded-xl! text-sm! transition-all! duration-300! ${
                          selectedCategory === cat 
                            ? "bg-[#D4AF37]/10! text-[#D4AF37]!" 
                            : "text-white/50! hover:bg-white/[0.03]! hover:text-white!"
                        } ${isRTL ? 'justify-end!' : 'justify-start!'}`}
                      >
                        {!isRTL && <span className={`w-1.5! h-1.5! rounded-full! transition-colors! ${selectedCategory === cat ? 'bg-[#D4AF37]!' : 'bg-white/10! group-hover:bg-white/30!'}`} />}
                        <span className="font-medium!">{cat}</span>
                        {isRTL && <span className={`w-1.5! h-1.5! rounded-full! transition-colors! ${selectedCategory === cat ? 'bg-[#D4AF37]!' : 'bg-white/10! group-hover:bg-white/30!'}`} />}
                      </button>
                    </li>
                  ))}
                </ul>
              </nav>
            </div>
          </aside>

          {/* Article Feed */}
          <div className="flex-1! w-full!">
            {isLoading ? (
              <div className="space-y-12!">
                {[1, 2].map((n) => (
                  <div key={n} className="w-full! h-[300px]! bg-white/[0.02]! rounded-3xl! animate-pulse! border! border-white/5!" />
                ))}
              </div>
            ) : (
              <div className="space-y-16!">
                <AnimatePresence mode="popLayout">
                  {filteredBlogs.map((item: any) => (
                    <motion.article
                      key={item.id}
                      layout
                      initial={{ opacity: 0, y: 40 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ duration: 0.5, ease: "easeOut" }}
                      className="group! relative! bg-white/[0.02]! rounded-3xl! border! border-white/[0.06]! overflow-hidden! hover:border-[#D4AF37]/30! hover:bg-white/[0.04]! transition-all! duration-500! shadow-2xl!"
                    >
                      <Link href={`/${locale}/blogs/${item.id}`} className="block!">
                        <div className={`flex! flex-col! ${isRTL ? 'md:flex-row-reverse!' : 'md:flex-row!'} items-stretch!`}>
                          
                          {/* Image Section */}
                          <div className="w-full! md:w-[45%]! relative! overflow-hidden! min-h-[280px]! md:min-h-full!">
                            <div className="absolute! inset-0! bg-[#1a1a1a]! z-0!" />
                            <img
                              src={item.featured_image ? `${BASE_URL}${item.featured_image}` : ""}
                              alt={item.titleBlog}
                              className="w-full! h-full! object-cover! absolute! inset-0! opacity-90! group-hover:opacity-100! group-hover:scale-105! transition-all! duration-700! ease-in-out!"
                              onError={(e: any) => { e.target.src = "https://via.placeholder.com/800x600/121212/D4AF37?text=Hataw"; }}
                            />
                            {/* Overlay Gradient */}
                            <div className="absolute! inset-0! bg-gradient-to-t! from-[#0a0a0a]! via-transparent! to-transparent! opacity-60! md:opacity-30!" />
                          </div>

                          {/* Content Section */}
                          <div className={`flex-1! p-8! md:p-10! flex! flex-col! justify-between! ${isRTL ? 'text-right!' : 'text-left!'}`}>
                            
                            <div>
                              {/* Meta Tags */}
                              <div className={`flex! flex-wrap! items-center! gap-4! mb-6! ${isRTL ? 'justify-end!' : 'justify-start!'}`}>
                                <div className="flex! items-center! gap-2! text-[#D4AF37]! bg-[#D4AF37]/10! px-3! py-1! rounded-full! border! border-[#D4AF37]/20!">
                                  <Hash size={12} />
                                  <span className="text-[11px]! font-bold! tracking-wide! uppercase!">{item.categoryTitle}</span>
                                </div>
                                <div className="flex! items-center! gap-2! text-white/40! text-[11px]! font-medium! tracking-widest! uppercase!">
                                  <Calendar size={12} />
                                  <span>{item.created_at ? new Date(item.created_at).toLocaleDateString(isRTL ? 'fa-IR' : 'en-US') : ''}</span>
                                </div>
                              </div>

                              <h2 className="text-2xl! md:text-3xl! font-semibold! leading-tight! text-white! group-hover:text-[#D4AF37]! transition-colors! duration-300! mb-4!">
                                {item.titleBlog}
                              </h2>

                              <p className="text-white/60! text-base! leading-relaxed! line-clamp-3! font-light!">
                                {item.excerpt || stripHtml(item.contentBlog).substring(0, 160)}...
                              </p>
                            </div>

                            {/* Footer/Action */}
                            <div className={`mt-8! pt-6! border-t! border-white/5! flex! items-center! ${isRTL ? 'justify-end!' : 'justify-start!'}`}>
                              <div className={`flex! items-center! gap-3! text-sm! font-bold! tracking-widest! uppercase! group/btn! ${isRTL ? 'flex-row' : 'flex-row-reverse'}`}>
                                <span className="text-white/80! group-hover:text-white! transition-colors!">{dict.readMore}</span>
                                <div className={`w-10! h-10! rounded-full! bg-white/5! flex! items-center! justify-center! group-hover:bg-[#D4AF37]! group-hover:text-black! transition-all! duration-300! ${isRTL ? 'group-hover:-translate-x-2' : 'group-hover:translate-x-2'}`}>
                                  {isRTL ? <ArrowUpLeft size={18} /> : <ArrowUpRight size={18} />}
                                </div>
                              </div>
                            </div>

                          </div>
                        </div>
                      </Link>
                    </motion.article>
                  ))}
                </AnimatePresence>
                
                {filteredBlogs.length === 0 && !isLoading && (
                  <div className="py-32! text-center! border! border-dashed! border-white/10! rounded-3xl! bg-white/[0.01]!">
                    <p className="text-white/30! text-lg!">{dict.noResult}</p>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
};

export default BlogPage;
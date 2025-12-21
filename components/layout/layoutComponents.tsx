"use client";
import React, { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { usePathname, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Instagram, 
  Twitter, 
  Linkedin, 
  Facebook, 
  Mail, 
  Phone, 
  MapPin, 
  Clock,
  Menu,
  X,
  ChevronLeft
} from "lucide-react";

const LayoutComponents = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();
  const router = useRouter();
  const { data: session } = useSession();
  
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const isDashboard = pathname.startsWith("/dashboard") || pathname.startsWith("/userDashboard");

  // افکت برای تغییر استایل منو هنگام اسکرول
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (isDashboard) return <>{children}</>;

  return (
    <div className="min-h-screen! bg-[#030712] text-white flex flex-col!">
      {/* --- Navigation Bar --- */}
      <nav className={`fixed top-0! left-0! right-0! z-100 transition-all duration-500 ${
        isScrolled ? "py-4! bg-[#030712]/80! backdrop-blur-xl! border-b border-white/5!" : "py-8! bg-transparent!"
      }`}>
        <div className="max-w-7xl! mx-auto! px-6! flex items-center justify-between!">
          {/* دکمه CTA / ورود */}
          <div className="hidden md:flex! items-center gap-4!">
             <button 
              onClick={() => router.push(session?.userRoleCaption==="userRole" ? "/userDashboard" : "/login")}
              className="px-6! py-2.5! bg-indigo-600 rounded-xl! font-black text-sm! hover:bg-indigo-500 transition-all shadow-lg shadow-indigo-600/20 flex items-center gap-2!"
            >
              {session?.backendToken ? "داشبۆرد" : "بەشداری خەڵات بکە"}
              <ChevronLeft size={16} />
            </button>
          </div>

          {/* منوی اصلی */}
          <ul className="hidden lg:flex! items-center gap-8! text-sm! font-bold text-slate-400">
            <li><a href="#about" className="hover:text-white transition-colors">دەربارەی ئێمە</a></li>
            <li>
              <a href="#award" className="relative group hover:text-white transition-colors">
                خەڵاتی Hataw
                <span className="absolute -top-4! -right-4! bg-indigo-500 text-[10px]! px-1.5! py-0.5! rounded-md animate-pulse">NEW</span>
              </a>
            </li>
            <li><a href="#blog" className="hover:text-white transition-colors">بلۆگ</a></li>
            <li><a href="#portfolio" className="hover:text-white transition-colors">پۆرتفۆلیۆ</a></li>
            <li><a href="#services" className="hover:text-white transition-colors">خزمەتگوزارییەکان</a></li>
            <li><a href="#home" className="text-white">سەرەتا</a></li>
          </ul>

          {/* لوگو */}
          <div className="flex items-center gap-4!">
            <img
              src="https://via.placeholder.com/60x60/6366f1/ffffff?text=H"
              alt="Hataw Group"
              className="w-12! h-12! rounded-2xl! shadow-2xl"
            />
            <span className="text-xl! font-black tracking-tighter!">HATAW <span className="text-indigo-500">GROUP</span></span>
          </div>

          {/* موبایل منو تگل */}
          <button className="lg:hidden! p-2!" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            {mobileMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </nav>

      {/* --- Mobile Menu Overlay --- */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 100 }}
            className="fixed inset-0! z-[90] bg-[#030712] p-10! flex flex-col! justify-center items-end! gap-8!"
          >
            {["سەرەتا", "خزمەتگوزارییەکان", "پۆرتفۆلیۆ", "بلۆگ", "خەڵاتی Hataw", "دەربارەی ئێمە"].map((item) => (
              <a key={item} href="#" className="text-3xl! font-black hover:text-indigo-500 transition-colors" onClick={() => setMobileMenuOpen(false)}>
                {item}
              </a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* --- Main Content Area --- */}
      <main className="flex-grow! pt-32!">
        {children}
      </main>

      {/* --- Footer Area --- */}
      <footer className="bg-white/[0.02] border-t border-white/5! pt-20! pb-10!">
        <div className="max-w-7xl! mx-auto! px-6!">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12! mb-20!">
            {/* بخش تماس */}
            <div className="flex flex-col! items-end! text-right!">
              <h3 className="text-white font-black text-lg! mb-6!">پەیوەندی</h3>
              <ul className="space-y-4! text-slate-400 text-sm!">
                <li className="flex items-center gap-3! justify-end">info@hatawgroup.com <Mail size={16} className="text-indigo-500" /></li>
                <li className="flex items-center gap-3! justify-end" dir="ltr">+1 (234) 567-890 <Phone size={16} className="text-indigo-500" /></li>
                <li className="flex items-center gap-3! justify-end">هەولێر، هەرێمی کوردستان <MapPin size={16} className="text-indigo-500" /></li>
                <li className="flex items-center gap-3! justify-end">٩ی بەیانی – ٦ی ئێوارە <Clock size={16} className="text-indigo-500" /></li>
              </ul>
            </div>

            {/* لینک‌های سریع ۲ */}
            <div className="flex flex-col! items-end! text-right!">
              <h3 className="text-white font-black text-lg! mb-6!">کۆمپانیا</h3>
              <ul className="space-y-4! text-slate-400 text-sm!">
                <li><a href="#" className="hover:text-indigo-400">دەربارەی ئێمە</a></li>
                <li><a href="#" className="hover:text-indigo-400">پۆرتفۆلیۆ</a></li>
                <li><a href="#" className="hover:text-indigo-400">بلۆگ</a></li>
                <li><a href="#" className="hover:text-indigo-400">خەڵاتی Hataw</a></li>
              </ul>
            </div>

            {/* لینک‌های سریع ۱ */}
            <div className="flex flex-col! items-end! text-right!">
              <h3 className="text-white font-black text-lg! mb-6!">خزمەتگوزارییەکان</h3>
              <ul className="space-y-4! text-slate-400 text-sm!">
                <li><a href="#" className="hover:text-indigo-400">دیزاینی ناسنامەی براند</a></li>
                <li><a href="#" className="hover:text-indigo-400">ستراتیژی براند</a></li>
                <li><a href="#" className="hover:text-indigo-400">ڕاوێژکاری براند</a></li>
                <li><a href="#" className="hover:text-indigo-400">براندی دیجیتاڵ</a></li>
              </ul>
            </div>

            {/* درباره گروه */}
            <div className="flex flex-col! items-end! text-right!">
              <h3 className="text-2xl! font-black mb-6!">HATAW <span className="text-indigo-500">GROUP</span></h3>
              <p className="text-slate-400 leading-relaxed! mb-8!">
                گۆڕینی بازرگانییەکان بۆ براندی ئەفسانەیی بە شوێنپێدانی ستراتیژی و داهێنانی پیشەیی.
              </p>
              <div className="flex items-center gap-4!">
                <a href="#" className="w-10! h-10! rounded-full! bg-white/5! flex items-center justify-center hover:bg-indigo-600 transition-all"><Instagram size={18} /></a>
                <a href="#" className="w-10! h-10! rounded-full! bg-white/5! flex items-center justify-center hover:bg-indigo-600 transition-all"><Twitter size={18} /></a>
                <a href="#" className="w-10! h-10! rounded-full! bg-white/5! flex items-center justify-center hover:bg-indigo-600 transition-all"><Linkedin size={18} /></a>
                <a href="#" className="w-10! h-10! rounded-full! bg-white/5! flex items-center justify-center hover:bg-indigo-600 transition-all"><Facebook size={18} /></a>
              </div>
            </div>
          </div>

          <div className="pt-10! border-t border-white/5! flex flex-col md:flex-row-reverse justify-between items-center gap-6! text-slate-500 text-xs!">
            <p>© 2025 Hataw Group. هەموو مافەکان پارێزراون</p>
            <div className="flex items-center gap-6!">
              <a href="#" className="hover:text-white transition-colors">سیاسەتی تایبەتمەندی</a>
              <a href="#" className="hover:text-white transition-colors">مەرجەکانی خزمەتگوزاری</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LayoutComponents;
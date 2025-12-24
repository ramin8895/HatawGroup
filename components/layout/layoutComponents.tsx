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
  ChevronLeft,
} from "lucide-react";

const LayoutComponents = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();
  const router = useRouter();
  const { data: session } = useSession();

  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const isDashboard =
    pathname.startsWith("/dashboard") || pathname.startsWith("/userDashboard");

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (isDashboard) return <>{children}</>;

  return (
    <div className="min-h-screen! bg-black text-white flex flex-col!">
      {/* --- Navigation Bar --- */}
      <nav
        className={`fixed top-0! left-0! right-0! z-[100] transition-all duration-500 ${
          isScrolled
            ? "py-4! bg-black/95! border-b border-[#D4AF37]/30! backdrop-blur-md!"
            : "py-8! bg-transparent!"
        }`}
      >
        <div className="max-w-7xl! mx-auto! px-6! flex items-center justify-between!">
          {/* Gold CTA Button */}
          <div className="hidden md:flex! items-center gap-4!">
            <button
              onClick={() =>
                router.push(
                  session?.userRoleCaption === "userRole"
                    ? "/userDashboard"
                    : "/login"
                )
              }
              className="px-6! py-2.5! bg-gradient-to-r from-[#B8860B] via-[#D4AF37] to-[#FFD700] rounded-xl! font-black text-sm! text-black hover:scale-105 hover:shadow-[0_0_25px_rgba(212,175,55,0.4)] transition-all flex items-center gap-2!"
            >
              {session?.backendToken ? "داشبۆرد" : "بەشداری خەڵات بکە"}
              <ChevronLeft size={16} />
            </button>
          </div>

          {/* Main Menu */}
          <ul className="hidden lg:flex! items-center gap-8! text-sm! font-bold text-gray-300">
            {/* لیست آیتم‌ها با هاور طلایی */}
            {[
              { name: "دەربارەی ئێمه", href: "#about" },
              { name: "پەیوەندی", href: "#Contact" },
              { name: "بلۆگ", href: "#blog" },
              { name: "نمونە کارەکان", href: "#portfolio" },
              { name: "خزمەتگوزاریەکان", href: "#services" },
            ].map((link) => (
              <li key={link.href}>
                <a href={link.href} className="hover:text-[#D4AF37] transition-colors">
                  {link.name}
                </a>
              </li>
            ))}
            <li>
              <a href="#award" className="relative group hover:text-[#D4AF37] transition-colors">
                هەتاو و خەڵات
                <span className="absolute -top-4! -right-4! bg-[#D4AF37] text-black text-[10px]! px-1.5! py-0.5! rounded-md font-black animate-pulse shadow-[0_0_10px_rgba(212,175,55,0.5)]">
                  NEW
                </span>
              </a>
            </li>
            <li>
              <a href="#home" className="text-[#D4AF37] border-b-2 border-[#D4AF37] pb-1">
                ماڵەوە
              </a>
            </li>
          </ul>

          {/* Logo with Gold Style */}
          <div className="flex items-center gap-4!">
        
            <div className="relative group" onClick={()=>router.push("/")}>
              <img
                src="/Hataw-Logo-01.png"
                alt="Hataw Group"
                className="w-28! h-12!  transition-all"
              />
              <div className="absolute inset-0! rounded-2xl! border cursor-pointer border-[#D4AF37]/20 animate-pulse"></div>
            </div>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            className="lg:hidden! p-2! text-[#D4AF37]"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </nav>

      {/* --- Mobile Menu Overlay --- */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 50 }}
            className="fixed inset-0! z-[90] bg-black p-10! flex flex-col! justify-center items-end! gap-8! border-l border-[#D4AF37]/20"
          >
            {["سەرەتا", "خزمەتگوزارییەکان", "پۆرتفۆلیۆ", "بلۆگ", "خەڵاتی Hataw", "دەربارەی ئێمە"].map((item) => (
              <a
                key={item}
                href="#"
                className="text-3xl! font-black text-white hover:text-[#D4AF37] transition-colors text-right!"
                onClick={() => setMobileMenuOpen(false)}
              >
                {item}
              </a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      <main className="flex-grow!">{children}</main>

      {/* --- Footer Area --- */}
      <footer className="bg-[#050505] border-t border-[#D4AF37]/20! pt-20! pb-10!">
        <div className="max-w-7xl! mx-auto! px-6!">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12! mb-20!">
            {/* Contact Section */}
            <div className="flex flex-col! items-end! text-right!">
              <h3 className="text-[#D4AF37] font-black text-lg! mb-6! border-b border-[#D4AF37]/20! pb-2! w-full">
                پەیوەندی
              </h3>
              <ul className="space-y-4! text-gray-400 text-sm!">
                <li className="flex items-center gap-3! justify-end hover:text-[#D4AF37] transition-colors cursor-pointer">
                  info@hatawgroup.com <Mail size={16} className="text-[#D4AF37]" />
                </li>
                <li className="flex items-center gap-3! justify-end hover:text-[#D4AF37] transition-colors cursor-pointer" dir="ltr">
                  +1 (234) 567-890 <Phone size={16} className="text-[#D4AF37]" />
                </li>
                <li className="flex items-center gap-3! justify-end">
                  هەولێر، هەرێمی کوردستان <MapPin size={16} className="text-[#D4AF37]" />
                </li>
                <li className="flex items-center gap-3! justify-end">
                  ٩ی بەیانی – ٦ی ئێوارە <Clock size={16} className="text-[#D4AF37]" />
                </li>
              </ul>
            </div>

            {/* Quick Links */}
            <div className="flex flex-col! items-end! text-right!">
              <h3 className="text-white font-black text-lg! mb-6!">کۆمپانیا</h3>
              <ul className="space-y-4! text-gray-400 text-sm!">
                <li><a href="#" className="hover:text-[#D4AF37] transition-colors">دەربارەی ئێمە</a></li>
                <li><a href="#" className="hover:text-[#D4AF37] transition-colors">پۆرتفۆلیۆ</a></li>
                <li><a href="#" className="hover:text-[#D4AF37] transition-colors">بلۆگ</a></li>
                <li><a href="#" className="hover:text-[#D4AF37] transition-colors">خەڵاتی Hataw</a></li>
              </ul>
            </div>

            {/* Services */}
            <div className="flex flex-col! items-end! text-right!">
              <h3 className="text-white font-black text-lg! mb-6!">خزمەتگوزارییەکان</h3>
              <ul className="space-y-4! text-gray-400 text-sm!">
                <li><a href="#" className="hover:text-[#D4AF37] transition-colors">دیزاینی ناسنامەی براند</a></li>
                <li><a href="#" className="hover:text-[#D4AF37] transition-colors">ستراتژی براند</a></li>
                <li><a href="#" className="hover:text-[#D4AF37] transition-colors">ڕاوێژکاری براند</a></li>
              </ul>
            </div>

            {/* Footer Brand */}
            <div className="flex flex-col! items-end! text-right!">
              <h3 className="text-2xl! font-black mb-6! text-white">
                HATAW <span className="text-[#D4AF37]">GROUP</span>
              </h3>
              <p className="text-gray-400 leading-relaxed! mb-8!">
                گۆڕینی بازرگانییەکان بۆ براندی ئەفسانەیی بە شوێنپێدانی ستراتیژی
                و داهێنانی پیشەیی.
              </p>
              <div className="flex items-center gap-4!">
                {[Instagram, Twitter, Linkedin, Facebook].map((Icon, idx) => (
                  <a
                    key={idx}
                    href="#"
                    className="w-10! h-10! rounded-full! bg-[#D4AF37]/5! border border-[#D4AF37]/20 flex items-center justify-center text-[#D4AF37] hover:bg-[#D4AF37] hover:text-black transition-all shadow-sm hover:shadow-[#D4AF37]/40"
                  >
                    <Icon size={18} />
                  </a>
                ))}
              </div>
            </div>
          </div>

          <div className="pt-10! border-t border-white/5! flex flex-col md:flex-row-reverse justify-between items-center gap-6! text-gray-500 text-[10px]! font-bold uppercase tracking-widest!">
            <p>© 2025 Hataw Group. هەموو مافەکان پارێزراون</p>
            <div className="flex items-center gap-6!">
              <a href="#" className="hover:text-[#D4AF37] transition-colors">سیاسەتی تایبەتمەندی</a>
              <a href="#" className="hover:text-[#D4AF37] transition-colors">مەرجەکانی خزمەتگوزاری</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LayoutComponents;
"use client";
import React, { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { usePathname, useRouter } from "next/navigation";
import { useTranslations, useLocale } from "next-intl";
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
import LanguageSwitcher from "@/components/LanguageSwitcher/LanguageSwitcher";

const LayoutComponents = ({ children }: { children: React.ReactNode }) => {
  const t = useTranslations("Layout");
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();
  const { data: session } = useSession();

  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const isActive = (href: string) => pathname === href || pathname === `/${locale}${href}`;

  const isDashboardOrAuth = 
    pathname.includes("/dashboard") || 
    pathname.includes("/userDashboard") || 
    pathname.includes("/login") || 
    pathname.includes("/register");

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (isDashboardOrAuth) {
    return <main className="min-h-screen bg-[#121212]">{children}</main>;
  }

  const menuItems = [
    { name: t("menu.about"), href: "/#about" },
    { name: t("menu.contact"), href: "/#contact" },
    { name: t("menu.blog"), href: "/#blog" },
    { name: t("menu.portfolio"), href: "/#portfolio" },
    { name: t("menu.services"), href: "/#services" },
    { name: t("menu.award"), href: "/#award", isNew: true },
  ];

  // تابع مشترک برای هندل کردن کلیک دکمه داشبورد
  const handleDashboardClick = () => {
    setMobileMenuOpen(false);
    router.push(
      session?.userRoleCaption === "userRole"
        ? `/${locale}/userDashboard`
        : `/${locale}/login`
    );
  };

  return (
    <div className="min-h-screen bg-black text-white flex flex-col">
      <nav
  dir="ltr"
  className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-500 ${
    isScrolled
      ? "py-4! bg-black/95 border-b border-[#D4AF37]/30 backdrop-blur-md"
      : "py-8! bg-transparent"
  }`}
>
  <div className=" mx-auto px-8! lg:px-20! flex items-center justify-between">
    
    {/* --- LEFT: Desktop Buttons & Mobile Menu Toggle --- */}
    <div className="flex-1 flex items-center justify-start gap-4">
      {/* دکمه منو در موبایل (سمت چپ قرار گرفت تا لوگو وسط بماند) */}
      <button
        className="lg:hidden p-2! text-[#D4AF37] bg-white/5 rounded-lg"
        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
      >
        {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
      </button>

      {/* محتوای سمت چپ دسکتاپ */}
      <div className="hidden lg:flex items-center gap-4">
        <LanguageSwitcher />
        <button
          onClick={handleDashboardClick}
          className="px-6! py-2.5! bg-gradient-to-r from-[#B8860B] via-[#D4AF37] to-[#FFD700] rounded-xl font-black text-sm text-black hover:scale-105 transition-all flex items-center gap-2"
        >
          {session?.backendToken ? t("nav.dashboard") : t("nav.joinAward")}
          <ChevronLeft size={16} />
        </button>
      </div>
    </div>

    {/* --- CENTER: Main Menu (Desktop) & Logo (Mobile) --- */}
 <div className="flex-[2] lg:flex-1 flex items-center justify-center">
  {/* منوی دسکتاپ */}
  <ul className="hidden lg:flex flex-row-reverse items-center justify-center gap-6 xl:gap-8 text-sm font-bold text-gray-300">
    <li className="whitespace-nowrap">
      <a 
        href={`/${locale}`} 
        className={`transition-colors pb-1! ${isActive('/') ? "text-[#D4AF37] border-b-2 border-[#D4AF37]" : "hover:text-[#D4AF37]"}`}
      >
        {t("menu.home")}
      </a>
    </li>
    {[...menuItems].reverse().map((link) => (
      <li key={link.href} className="whitespace-nowrap"> {/* اضافه شدن کلاس برای جلوگیری از شکستن متن */}
        <a 
          href={`/${locale}${link.href}`} 
          className={`relative group transition-colors pb-1! ${pathname.includes(link.href) ? "text-[#D4AF37] border-b-2 border-[#D4AF37]" : "hover:text-[#D4AF37]"}`}
        >
          {link.name}
 
        </a>
      </li>
    ))}
  </ul>

  {/* لوگو در حالت موبایل */}
  <div className="lg:hidden relative cursor-pointer" onClick={() => router.push(`/${locale}`)}>
    <img src="/Hataw-Logo-01.svg" alt="Logo" className="h-10! w-auto" />
  </div>
</div>

    {/* --- RIGHT: Logo (Desktop) & LanguageSwitcher (Mobile) --- */}
    <div className="flex-1 flex items-center justify-end">
      {/* لوگوی دسکتاپ */}
      <div className="hidden lg:block relative group cursor-pointer" onClick={() => router.push(`/${locale}`)}>
        <img src="/Hataw-Logo-01.svg" alt="Logo" className="h-16! w-auto" />
      </div>

      {/* نمایش LanguageSwitcher در سمت راست موبایل برای حفظ تقارن */}
      <div className="hidden md:flex">
        {/* <LanguageSwitcher /> */}
      </div>
    </div>
    
  </div>
</nav>
      {/* --- MOBILE SIDEBAR --- */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 100 }}
            className="fixed inset-0 z-[90] bg-black/98 backdrop-blur-xl p-10! flex flex-col justify-center items-center gap-6 border-l border-[#D4AF37]/20"
          >
            {/* دکمه ورود/داشبورد در بالای منوی موبایل */}
            <button
              onClick={handleDashboardClick}
              className="w-full max-w-[250px] mb-8! px-6! py-4! bg-gradient-to-r from-[#B8860B] via-[#D4AF37] to-[#FFD700] rounded-2xl font-black text-black flex items-center justify-center gap-3 shadow-[0_10px_30px_rgba(212,175,55,0.3)]"
            >
              {session?.backendToken ? t("nav.dashboard") : t("nav.joinAward")}
              <ChevronLeft size={20} />
            </button>

            <a href={`/${locale}`} className="text-2xl font-bold text-white hover:text-[#D4AF37]" onClick={() => setMobileMenuOpen(false)}>{t("menu.home")}</a>
            
            {menuItems.map((item) => (
              <a
                key={item.href}
                href={`/${locale}${item.href}`}
                className="text-2xl font-bold text-white hover:text-[#D4AF37] transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                {item.name}
              </a>
            ))}
            
            <div className="mt-10! pt-10! border-t  border-white/10 w-full flex justify-center">
              <LanguageSwitcher />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <main className="grow">{children}</main>

      {/* Footer (Same as before) */}
      <footer className="bg-[#050505] border-t border-[#D4AF37]/20 pt-20! pb-10!">
        <div className="  mx-auto px-28!">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12! mb-20!">
            <div className="flex flex-col items-end text-right">
              <h3 className="text-[#D4AF37] font-black text-lg mb-6! border-b border-[#D4AF37]/20 pb-2! w-full">
                {t("footer.contactTitle")}
              </h3>
              <ul className="space-y-4! text-gray-400 text-sm">
                <li className="flex items-center gap-3 justify-end hover:text-[#D4AF37] cursor-pointer">
                  info@hatawgroup.com <Mail size={16} className="text-[#D4AF37]" />
                </li>
                <li className="flex items-center gap-3 justify-end" dir="ltr">
                  +1 (234) 567-890 <Phone size={16} className="text-[#D4AF37]" />
                </li>
              </ul>
            </div>

            <div className="flex flex-col items-end text-right">
              <h3 className="text-white font-black text-lg mb-6!">{t("footer.companyTitle")}</h3>
              <ul className="space-y-4! text-gray-400 text-sm">
                {menuItems.map(item => (
                  <li key={item.href}><a href={`/${locale}${item.href}`} className="hover:text-[#D4AF37]">{item.name}</a></li>
                ))}
              </ul>
            </div>

            <div className="flex flex-col items-end text-right">
              <h3 className="text-white font-black text-lg mb-6!">{t("footer.servicesTitle")}</h3>
              <ul className="space-y-4! text-gray-400 text-sm">
                <li><a href={`/${locale}/#services`} className="hover:text-[#D4AF37]">{t("footer.service1")}</a></li>
                <li><a href={`/${locale}/#services`} className="hover:text-[#D4AF37]">{t("footer.service2")}</a></li>
              </ul>
            </div>

            <div className="flex flex-col items-end text-right">
              <h3 className="text-2xl font-black mb-6! text-white">
                HATAW <span className="text-[#D4AF37]">GROUP</span>
              </h3>
              <p className="text-gray-400 leading-relaxed mb-8!">
                {t("footer.description")}
              </p>
              <div className="flex items-center gap-4!">
                {[Instagram, Twitter, Linkedin, Facebook].map((Icon, idx) => (
                  <a key={idx} href="#" className="w-10! h-10! rounded-full bg-[#D4AF37]/5 border border-[#D4AF37]/20 flex items-center justify-center text-[#D4AF37] hover:bg-[#D4AF37] hover:text-black transition-all">
                    <Icon size={18} />
                  </a>
                ))}
              </div>
            </div>
          </div>

          <div className="pt-10! border-t border-white/5 flex flex-col md:flex-row-reverse justify-between items-center gap-6! text-gray-500 text-[10px] font-bold uppercase tracking-widest">
            <p>{t("footer.copyright")}</p>
            <div className="flex items-center gap-6!">
              <LanguageSwitcher />
              <a href="#" className="hover:text-[#D4AF37]">{t("footer.privacy")}</a>
              <a href="#" className="hover:text-[#D4AF37]">{t("footer.terms")}</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LayoutComponents;
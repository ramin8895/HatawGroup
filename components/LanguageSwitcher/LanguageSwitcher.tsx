"use client";
import { useLocale } from 'next-intl';
import { usePathname, useRouter } from 'next/navigation';
import { motion } from 'framer-motion';

export default function LanguageSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  const toggleLanguage = () => {
    const nextLocale = locale === 'en' ? 'ku' : 'en';
    const newPath = pathname.replace(`/${locale}`, `/${nextLocale}`);
    router.push(newPath);
  };

  return (
    <button
      onClick={toggleLanguage}
      className="group relative flex items-center gap-3! px-4! py-2! bg-white/5! border border-[#D4AF37]/20! rounded-2xl! hover:border-[#D4AF37]/60! transition-all duration-300 shadow-lg backdrop-blur-sm"
    >
      {/* نمایش پرچم و متن بر اساس زبان فعلی */}
      <div className="flex items-center gap-2!">
        {locale === 'en' ? (
          <>
            <img 
              src="/Flag_of_Kurdistan.svg.png" 
              className="w-5! h-3.5! rounded-sm! object-cover shadow-sm" 
              alt="Kurdish"
            />
            <span className="text-[11px]! font-black uppercase tracking-wider text-[#D4AF37] group-hover:text-white transition-colors">
              Kurdî
            </span>
          </>
        ) : (
          <>
            <img 
              src="https://flagcdn.com/w40/gb.png" 
              className="w-5! h-3.5! rounded-sm! object-cover shadow-sm" 
              alt="English"
            />
            <span className="text-[11px]! font-black uppercase tracking-wider text-[#D4AF37] group-hover:text-white transition-colors">
              English
            </span>
          </>
        )}
      </div>

      {/* یک نقطه نوری کوچک که نشان‌دهنده تعاملی بودن است */}
      <motion.div 
        animate={{ scale: [1, 1.2, 1] }}
        transition={{ repeat: Infinity, duration: 2 }}
        className="w-1! h-1! bg-[#D4AF37] rounded-full shadow-[0_0_8px_#D4AF37]"
      />
      
      {/* افکت پس‌زمینه هنگام هاور */}
      <div className="absolute inset-0! bg-[#D4AF37]/5! opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl!"></div>
    </button>
  );
}
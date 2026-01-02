"use client";
import { useLocale } from "next-intl";
import { usePathname, useRouter } from "next/navigation";

export default function LanguageSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  const handleLanguageChange = (nextLocale: string) => {
    if (nextLocale === locale) return;
    const newPath = pathname.replace(`/${locale}`, `/${nextLocale}`);
    router.push(newPath);
  };

  return (
    <div 
      className="flex! items-center! justify-center! border! border-white! rounded-lg! px-3! py-1.5! bg-transparent! transition-all!"
      style={{ minWidth: '80px' }}
    >
      <button
        onClick={() => handleLanguageChange("en")}
        className={`text-sm! font-bold! transition-colors! ${
          locale === "en" ? "text-[#D4AF37]!" : "text-white/60! hover:text-white!"
        }`}
      >
        EN
      </button>

      <span className="text-white/40! mx-2! font-light!">/</span>

      <button
        onClick={() => handleLanguageChange("ku")}
        className={`text-sm! font-bold! transition-colors! ${
          locale === "ku" ? "text-[#D4AF37]!" : "text-white/60! hover:text-white!"
        }`}
      >
        KU
      </button>
    </div>
  );
}
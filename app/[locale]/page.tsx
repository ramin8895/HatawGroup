import { getTranslations } from "next-intl/server";
import { HomeContent } from "./Home";

export default async function rootPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations();

  const translations = {
    // کلیدهای بخش Home را دقیقاً مطابق ساختار جدید JSON مپ می‌کنیم
    Home: {
      Hero: {
        titlePart1: t("Home.Hero.titlePart1"),
        titlePart2: t("Home.Hero.titlePart2"),
        description: t("Home.Hero.description"),
        mainBtn: t("Home.Hero.mainBtn"),
      },
      WhyBrand: {
        title: t("Home.WhyBrand.title"),
        desc1: t("Home.WhyBrand.desc1"),
        desc2: t("Home.WhyBrand.desc2"),
        problemsTitle: t("Home.WhyBrand.problemsTitle"),
        // برای آرایه‌ها در next-intl باید از raw استفاده کرد یا تک‌تک مپ کرد
        problems: t.raw("Home.WhyBrand.problems"), 
        footerTitle: t("Home.WhyBrand.footerTitle"),
        footerDesc: t("Home.WhyBrand.footerDesc"),
        ctaBtn: t("Home.WhyBrand.ctaBtn"),
      },
      Services: {
        title: t("Home.Services.title"),
        moreBtn: t("Home.Services.moreBtn"),
      },
    },
    
    // بخش سرویس‌های کلی (برای کارت‌ها)
    Services: {
      title: t("Services.title"),
      items: {
        branding: { 
          title: t("Services.items.branding.title"), 
          desc: t("Services.items.branding.desc") 
        },
        strategy: { 
          title: t("Services.items.strategy.title"), 
          desc: t("Services.items.strategy.desc") 
        },
        consultancy: { 
          title: t("Services.items.consultancy.title"), 
          desc: t("Services.items.consultancy.desc") 
        },
        digital: { 
          title: t("Services.items.digital.title"), 
          desc: t("Services.items.digital.desc") 
        },
      }
    },

    Blog: {
      badge: t("Blog.badge"),
      title: t("Blog.title"),
      titleAccent: t("Blog.titleAccent"),
      viewAll: t("Blog.viewAll"),
      readMore: t("Blog.readMore"),
    },

    Stats: {
      successfulProjects: t("Stats.successfulProjects"),
      happyClients: t("Stats.happyClients"),
      yearsExperience: t("Stats.yearsExperience"),
      satisfaction: t("Stats.satisfaction"),
    },
  };

  return <HomeContent locale={locale} translations={translations} />;
}
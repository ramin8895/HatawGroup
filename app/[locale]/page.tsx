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
    // بخش Hero
    Hero: {
      title: t("Hero.title"),
      title1: t("Hero.title1"),
      title2: t("Hero.title2"),
      btn1: t("Hero.btn1"),
      btn2: t("Hero.btn2"),
    },
    // بخش About
    About: {
      badge: t("About.badge"),
      title: t("About.title"),
      description: t("About.description"),
      feat1: t("About.feat1"),
      feat2: t("About.feat2"),
      feat3: t("About.feat3"),
      feat4: t("About.feat4"),
      cta: t("About.cta"),
      yearsExp: t("About.yearsExp"),
    },
    // بخش Services
    Services: {
      badge: t("Services.badge"),
      title: t("Services.title"),
      description: t("Services.description"),
      more: t("Services.more"),
      items: {
        branding: { title: t("Services.items.branding.title"), desc: t("Services.items.branding.desc") },
        strategy: { title: t("Services.items.strategy.title"), desc: t("Services.items.strategy.desc") },
        consultancy: { title: t("Services.items.consultancy.title"), desc: t("Services.items.consultancy.desc") },
        digital: { title: t("Services.items.digital.title"), desc: t("Services.items.digital.desc") },
        experience: { title: t("Services.items.experience.title"), desc: t("Services.items.experience.desc") },
        refresh: { title: t("Services.items.refresh.title"), desc: t("Services.items.refresh.desc") },
      }
    },
    // بخش Blog
    Blog: {
      badge: t("Blog.badge"),
      title: t("Blog.title"),
      titleAccent: t("Blog.titleAccent"),
      viewAll: t("Blog.viewAll"),
      readMore: t("Blog.readMore"),
      category: t("Blog.category"),
    },
    // بخش Portfolio
    Portfolio: {
      title: t("Portfolio.title"),
      titleAccent: t("Portfolio.titleAccent"),
      subtitle: t("Portfolio.subtitle"),
      item1Title: t("Portfolio.item1Title"),
      item1Desc: t("Portfolio.item1Desc"),
      item2Title: t("Portfolio.item2Title"),
      item2Desc: t("Portfolio.item2Desc"),
      item3Title: t("Portfolio.item3Title"),
      item3Desc: t("Portfolio.item3Desc"),
    },
    // بخش Stats
    Stats: {
      successfulProjects: t("Stats.successfulProjects"),
      happyClients: t("Stats.happyClients"),
      yearsExperience: t("Stats.yearsExperience"),
      satisfaction: t("Stats.satisfaction"),
    },
    // بخش Lottery (بخش جدید)
    Lottery: {
      title: t("Lottery.title"),
      brandName: t("Lottery.brandName"),
      prizePool: t("Lottery.prizePool"),
      description: t("Lottery.description"),
      checkingAccess: t("Lottery.checkingAccess"),
      inputPlaceholder: t("Lottery.inputPlaceholder"),
      submitButton: t("Lottery.submitButton"),
      joinButton: t("Lottery.joinButton"),
      countdown: t("Lottery.countdown"),
    },
    // بخش Contact
    Contact: {
      title: t("Contact.title"),
      subtitle: t("Contact.subtitle"),
      placeholder: t("Contact.placeholder"),
      button: t("Contact.button"),
    },
  };

  return <HomeContent locale={locale} translations={translations} />;
}
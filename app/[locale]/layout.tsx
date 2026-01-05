import type { Metadata } from "next";
import "./globals.css";
import LayoutComponents from "@/components/layout/layoutComponents";
import SessionProvider from "@/components/SessionProvider";
import QueryProvider from "@/components/QueryProvider";
import { ToastProvider } from "@/components/Dashbord/TostComponents";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { notFound } from "next/navigation";

// --- بخش متا تگ‌های داینامیک ---
export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;

  const content = {
    en: {
      title: "Hataw Group | Business to Brand Transformation",
      description:
        "Hataw Group helps businesses transition from fragmentation to a unified brand system through strategic identity, infrastructure, and content engines.",
    },
    ku: {
      title: "گرووپی هەتاو | گۆڕینی بزنس بۆ براند",
      description:
        "گرووپی هەتاو یارمەتی بزنسەکان دەدات لە پارچەپارچەبوونەوە بگۆڕێن بۆ سیستەمێکی براندی یەکگرتوو لە ڕێگەی ناسنامەی ستراتیژی و ژێرخانی دیجیتاڵی.",
    },
  };

  const current = locale === "ku" ? content.ku : content.en;

  return {
    title: {
      template: `%s | ${current.title}`,
      default: current.title,
    },
    description: current.description,
    icons: {
      icon: "/favicon.ico",
      shortcut: "/favicon-16x16.png",
    },
    openGraph: {
      title: current.title,
      description: current.description,
      url: "https://hatawgroup.com/",
      siteName: "Hataw Group",
      images: [
        {
          url: "/Hataw-Logo-01.svg",
          width: 1200,
          height: 630,
          alt: "Hataw Group Open Graph Image",
        },
      ],
      locale: locale === "ku" ? "ku-IQ" : "en-US",
      type: "website",
    },
    keywords:
      locale === "ku"
        ? ["براندینگ", "ستراتیژی بزنس", "گرووپی هەتاو", "مارکێتینگ"]
        : ["Branding", "Business Strategy", "Hataw Group", "Marketing System"],
    verification: {
      google: "1oBwSRa6P8Fhb5q6zp6HeOX2OJ-UQdKf61-7xujkWIY", // کدی که فرستادید
    },
    alternates: {
      canonical: "/",
      languages: {
        "en-US": "/en",
        "ku-IQ": "/ku",
      },
    },
    robots: "index, follow",
  };
}

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!["en", "ku"].includes(locale)) {
    notFound();
  }

  const messages = await getMessages();
  const direction = locale === "ku" ? "rtl" : "ltr";

  return (
    <html lang={locale} dir={direction}>
      <body className="antialiased main-root">
        <NextIntlClientProvider messages={messages} locale={locale}>
          <QueryProvider>
            <ToastProvider>
              <SessionProvider>
                <LayoutComponents>{children}</LayoutComponents>
              </SessionProvider>
            </ToastProvider>
          </QueryProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}

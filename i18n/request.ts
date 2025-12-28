import { getRequestConfig } from "next-intl/server";
import { notFound } from "next/navigation";

const locales = ["en", "ku"];
export default getRequestConfig(async ({ requestLocale }) => {
  // ۱. گرفتن مقدار زبان از پروامیس
  const locale = await requestLocale;

  // ۲. تایید اعتبار
  if (!locale || !locales.includes(locale as any)) notFound();

  return {
    locale,
    messages: (await import(`../messages/${locale}.json`)).default,
  };
});

import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";
import createMiddleware from 'next-intl/middleware';

// 1. تعریف میدلور زبان
const intlMiddleware = createMiddleware({
  locales: ["en", "ku"],
  defaultLocale: 'en'
});

export default async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // مسیرهای سیستمی و API را نادیده بگیر
  if (
    pathname.startsWith("/api") ||
    pathname.startsWith("/_next") ||
    pathname === "/favicon.ico"
  ) {
    return NextResponse.next();
  }

  // 2. دریافت توکن
  const token = await getToken({
    req,
    secret: process.env.NEXTAUTH_SECRET,
  });

  // استخراج زبان از مسیر (مثلاً /en/dashboard -> en)
  const pathnameHasLocale = ["/en", "/ku"].some(
    (locale) => pathname.startsWith(locale + "/") || pathname === locale
  );

  // پیدا کردن مسیر بدون زبان برای چک کردن منطق (مثلاً /en/dashboard -> /dashboard)
  const purePathname = pathnameHasLocale 
    ? pathname.replace(/^\/(en|ku)/, "") 
    : pathname;

  const url = req.nextUrl.clone();
  const localePrefix = pathnameHasLocale ? pathname.split('/')[1] : 'en';

  // 3. چک کردن دسترسی‌ها (RBAC)
  const isAdminDashboard = purePathname.startsWith("/dashboard");
  const isUserDashboard = purePathname.startsWith("/userDashboard");

  // اگر لاگین نکرده و می‌خواهد به داشبورد برود
  if ((isAdminDashboard || isUserDashboard) && !token) {
    url.pathname = `/${localePrefix}/login`;
    return NextResponse.redirect(url);
  }

  // اگر لاگین کرده و می‌خواهد به صفحه لاگین برود
  if (token && purePathname === "/login") {
    url.pathname = token.userRoleCaption === "adminRole" 
      ? `/${localePrefix}/dashboard` 
      : `/${localePrefix}/userDashboard`;
    return NextResponse.redirect(url);
  }

  // کنترل نقش‌ها
  if (token) {
    if (token.userRoleCaption === "adminRole" && isUserDashboard) {
      url.pathname = `/${localePrefix}/dashboard`;
      return NextResponse.redirect(url);
    }
    if (token.userRoleCaption === "userRole" && isAdminDashboard) {
      url.pathname = `/${localePrefix}/userDashboard`;
      return NextResponse.redirect(url);
    }
  }

  // 4. در نهایت اجرای میدلور زبان برای بقیه مسیرها
  return intlMiddleware(req);
}

export const config = {
  // این matcher استاندارد برای ترکیب هر دو حالت است
  matcher: ['/((?!api|_next|.*\\..*).*)']
};
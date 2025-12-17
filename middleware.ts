import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

const locales = ["fa", "en"];
const defaultLocale = "fa";

function getLocale(request: NextRequest) {
  const header = request.headers.get("accept-language");
  if (!header) return defaultLocale;

  return (
    header
      .split(",")
      .map((l) => l.split(";")[0])
      .find((l) => locales.some((locale) => l.startsWith(locale))) ||
    defaultLocale
  );
}

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // ⛔ skip internal & public files
  if (
    pathname.startsWith("/api") ||
    pathname.startsWith("/_next") ||
    pathname === "/favicon.ico"
  ) {
    return NextResponse.next();
  }

  // 🌍 check locale in url
  const pathnameHasLocale = locales.some(
    (locale) => pathname === `/${locale}` || pathname.startsWith(`/${locale}/`)
  );

  // 🌍 i18n proxy
  if (!pathnameHasLocale) {
    const locale = getLocale(req);
    req.nextUrl.pathname = `/${locale}${pathname}`;
    return NextResponse.redirect(req.nextUrl);
  }

  // 🔐 auth (بعد از اینکه locale مشخص شد)
  const token = await getToken({
    req,
    secret: process.env.NEXTAUTH_SECRET,
  });

  // locale فعلی
  const locale = pathname.split("/")[1];

  // 🔐 /dashboard نیاز به login دارد
  if (pathname.startsWith(`/${locale}/dashboard`) && !token) {
    return NextResponse.redirect(new URL(`/${locale}/login`, req.url));
  }

  // 🔁 اگر لاگین هست و رفت login
  if (token && pathname === `/${locale}/login`) {
    return NextResponse.redirect(new URL(`/${locale}/dashboard`, req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next|favicon.ico).*)"],
};

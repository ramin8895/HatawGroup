import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

export async function middleware(req: NextRequest) {
  const token = await getToken({
    req,
    secret: process.env.NEXTAUTH_SECRET,
  });

  const { pathname } = req.nextUrl;

  // صفحات عمومی و فایل‌های next.js
  if (
    pathname.startsWith("/api") ||
    pathname.startsWith("/_next") ||
    pathname === "/favicon.ico"
  ) {
    return NextResponse.next();
  }

  // صفحه /dashboard نیاز به login دارد
  if (pathname.startsWith("/dashboard") && !token) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  // اگر لاگین هست و رفت login → هدایت به /dashboard یا / (می‌تونی تنظیم کنی)
  if (token && pathname === "/login") {
    return NextResponse.redirect(new URL("/dashboard", req.url));
  }

  // صفحه اصلی / بدون توکن دسترسی دارد
  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next|favicon.ico).*)"], // همه صفحات غیر از فایل‌های next
};

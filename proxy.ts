import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

export async function proxy(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // 1️⃣ مسیرهای عمومی و سیستمی (خیلی مهم: قبل از getToken)
  if (
    pathname === "/" ||
    pathname.startsWith("/api") ||
    pathname.startsWith("/_next") ||
    pathname === "/favicon.ico"
  ) {
    return NextResponse.next();
  }

  // 2️⃣ فقط اینجا توکن رو بگیر
  const token = await getToken({
    req,
    secret: process.env.NEXTAUTH_SECRET,
  });

  const url = req.nextUrl.clone();

  // 3️⃣ مسیرهای محافظت‌شده
  const isAdminDashboard = pathname.startsWith("/dashboard");
  const isUserDashboard = pathname.startsWith("/userDashboard");

  // کاربر لاگین نکرده
  if ((isAdminDashboard || isUserDashboard) && !token) {
    url.pathname = "/login";
    return NextResponse.redirect(url);
  }

  // 4️⃣ جلوگیری از ورود دوباره به لاگین
  if (token && pathname === "/login") {
    url.pathname =
      token.userRoleCaption === "adminRole"
        ? "/dashboard"
        : "/userDashboard";
    return NextResponse.redirect(url);
  }

  // 5️⃣ RBAC (کنترل نقش)
  if (token) {
    if (
      token.userRoleCaption === "adminRole" &&
      isUserDashboard
    ) {
      url.pathname = "/dashboard";
      return NextResponse.redirect(url);
    }

    if (
      token.userRoleCaption === "userRole" &&
      isAdminDashboard
    ) {
      url.pathname = "/userDashboard";
      return NextResponse.redirect(url);
    }
  }

  return NextResponse.next();
}

// 6️⃣ matcher تمیز
export const config = {
  matcher: ["/((?!api|_next|favicon.ico).*)"],
};

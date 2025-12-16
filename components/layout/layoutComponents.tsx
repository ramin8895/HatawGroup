"use client";
import { useSession } from "next-auth/react";
import { usePathname, useRouter } from "next/navigation";

const LayoutComponents = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const pathname = usePathname();
  const isDashboard = pathname.startsWith("/dashboard");
  const isDashboardUser = pathname.startsWith("/userDashboard");

  const route = useRouter();

  const { data: Session } = useSession();
  console.log(Session, "user Session");

  return (
    <>
      {!isDashboard && (
        <div className="user">
          <header id="header">
            <nav>
              <img
                src="https://via.placeholder.com/60x60/D4AF37/121212?text=H"
                alt="Hataw Group"
                className="logo"
              />

              <ul className="nav-links" id="navLinks">
                <li>
                  <a href="#home">سەرەتا</a>
                </li>
                <li>
                  <a href="#services">خزمەتگوزارییەکان</a>
                </li>
                <li>
                  <a href="#portfolio">پۆرتفۆلیۆ</a>
                </li>
                <li>
                  <a href="#blog">بلۆگ</a>
                </li>
                <li>
                  <a href="#award" className="award-link">
                    خەڵاتی Hataw <span className="new-badge">نوێ</span>
                  </a>
                </li>
                <li>
                  <a href="#about">دەربارەی ئێمە</a>
                </li>
              </ul>

              <a
                className="cta-button"
                onClick={() => route.push("/login")}
              >
                {!Session?.backendToken ? "بەشداری خەڵات بکە" : "داشبۆرد"}
              </a>

              <button className="mobile-menu-btn" id="mobileMenuBtn">
                <span></span>
                <span></span>
                <span></span>
              </button>
            </nav>
          </header>

          {children}

          <footer>
            <div className="footer-content">
              <div className="footer-section">
                <h3>Hataw Group</h3>
                <p>
                  گۆڕینی بازرگانییەکان بۆ براندی ئەفسانەیی بە
                  شوێنپێدانی ستراتیژی و داهێنانی پیشەیی.
                </p>
                <div className="social-links">
                  <a href="#">📘</a>
                  <a href="#">📷</a>
                  <a href="#">🐦</a>
                  <a href="#">💼</a>
                </div>
              </div>

              <div className="footer-section">
                <h3>خزمەتگوزارییەکان</h3>
                <ul>
                  <li><a href="#">دیزاینی ناسنامەی براند</a></li>
                  <li><a href="#">ستراتیژی براند</a></li>
                  <li><a href="#">ڕاوێژکاری براند</a></li>
                  <li><a href="#">براندی دیجیتاڵ</a></li>
                  <li><a href="#">نوێکردنەوەی براند</a></li>
                </ul>
              </div>

              <div className="footer-section">
                <h3>کۆمپانیا</h3>
                <ul>
                  <li><a href="#">دەربارەی ئێمە</a></li>
                  <li><a href="#">پۆرتفۆلیۆ</a></li>
                  <li><a href="#">بلۆگ</a></li>
                  <li><a href="#">خەڵاتی Hataw</a></li>
                  <li><a href="#">پەیوەندی</a></li>
                </ul>
              </div>

              <div className="footer-section">
                <h3>پەیوەندی</h3>
                <ul>
                  <li>📧 info@hatawgroup.com</li>
                  <li>📞 +1 (234) 567-890</li>
                  <li>📍 هەولێر، هەرێمی کوردستان</li>
                  <li>🕐 دووشەممە – هەینی: ٩ی بەیانی – ٦ی ئێوارە</li>
                </ul>
              </div>
            </div>

            <div className="footer-bottom">
              <p>
                © 2025 Hataw Group. هەموو مافەکان پارێزراون |
                <a href="#"> سیاسەتی تایبەتمەندی </a> |
                <a href="#"> مەرجەکانی خزمەتگوزاری </a>
              </p>
            </div>
          </footer>
        </div>
      )}

      {isDashboard && children}
    </>
  );
};

export default LayoutComponents;

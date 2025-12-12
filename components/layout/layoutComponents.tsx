"use client";
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
  return (
    <>
      {!isDashboard  && (
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
                  <a href="#home">Home</a>
                </li>
                <li>
                  <a href="#services">Services</a>
                </li>
                <li>
                  <a href="#portfolio">Portfolio</a>
                </li>
                <li>
                  <a href="#blog">Blog</a>
                </li>
                <li>
                  <a href="#award" className="award-link">
                    Hataw Award <span className="new-badge">NEW</span>
                  </a>
                </li>
                <li>
                  <a href="#about">About</a>
                </li>
              </ul>
              <a
                href="#award"
                className="cta-button"
                onClick={() => route.push("/login")}
              >
                Join Award
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
                  Transforming businesses into legendary brands through
                  strategic positioning and creative excellence.
                </p>
                <div className="social-links">
                  <a href="#">📘</a>
                  <a href="#">📷</a>
                  <a href="#">🐦</a>
                  <a href="#">💼</a>
                </div>
              </div>

              <div className="footer-section">
                <h3>Services</h3>
                <ul>
                  <li>
                    <a href="#">Brand Identity Design</a>
                  </li>
                  <li>
                    <a href="#">Brand Strategy</a>
                  </li>
                  <li>
                    <a href="#">Brand Consulting</a>
                  </li>
                  <li>
                    <a href="#">Digital Branding</a>
                  </li>
                  <li>
                    <a href="#">Rebranding</a>
                  </li>
                </ul>
              </div>

              <div className="footer-section">
                <h3>Company</h3>
                <ul>
                  <li>
                    <a href="#">About Us</a>
                  </li>
                  <li>
                    <a href="#">Portfolio</a>
                  </li>
                  <li>
                    <a href="#">Blog</a>
                  </li>
                  <li>
                    <a href="#">Hataw Award</a>
                  </li>
                  <li>
                    <a href="#">Contact</a>
                  </li>
                </ul>
              </div>

              <div className="footer-section">
                <h3>Contact</h3>
                <ul>
                  <li>📧 info@hatawgroup.com</li>
                  <li>📞 +1 (234) 567-890</li>
                  <li>📍 Erbil, Kurdistan Region</li>
                  <li>🕐 Mon-Fri: 9AM - 6PM</li>
                </ul>
              </div>
            </div>

            <div className="footer-bottom">
              <p>
                © 2025 Hataw Group. All rights reserved. |{" "}
                <a href="#">Privacy Policy</a> |{" "}
                <a href="#">Terms of Service</a>
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

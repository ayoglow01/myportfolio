import { memo, useCallback } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FiGithub, FiLinkedin, FiMail, FiArrowUp } from "react-icons/fi";
import { FaWhatsapp } from "react-icons/fa";
import { personalInfo, navLinks } from "../../data/portfolio";
import Container from "../common/Container";

function Footer() {
  const currentYear = new Date().getFullYear();
  const location = useLocation();
  const navigate = useNavigate();
  const isHome = location.pathname === "/";

  const scrollToTop = useCallback(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const handleQuickLink = useCallback(
    (sectionId) => {
      if (isHome) {
        const el = document.getElementById(sectionId);
        if (el) {
          el.scrollIntoView({ behavior: "smooth" });
        }
      } else {
        navigate("/");

        setTimeout(() => {
          const el = document.getElementById(sectionId);
          if (el) {
            el.scrollIntoView({ behavior: "smooth" });
          }
        }, 200);
      }
    },
    [isHome, navigate],
  );

  const socialLinks = [
    {
      icon: <FiGithub />,
      href: personalInfo.socials.github,
      label: "GitHub",
    },
    {
      icon: <FiLinkedin />,
      href: personalInfo.socials.linkedin,
      label: "LinkedIn",
    },
    {
      icon: <FaWhatsapp />,
      href: personalInfo.socials.whatsapp,
      label: "WhatsApp",
    },
    {
      icon: <FiMail />,
      href: personalInfo.socials.email,
      label: "Email",
    },
  ];

  return (
    <footer
      className="dark:bg-surface bg-surface-light border-t dark:border-border border-border-light"
      role="contentinfo"
    >
      <Container>
        <div className="py-10 sm:py-12 md:py-16">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10">
            {/* Brand */}
            <div className="sm:col-span-2 lg:col-span-1">
              <Link
                to="/"
                className="flex items-center gap-2 group shrink-0"
                aria-label="Go to homepage"
              >
                <img
                  src="/favicon.svg"
                  alt="Ayomide Logo"
                  className="w-8 h-8 rounded-lg object-cover transition-transform duration-300 group-hover:scale-105"
                />

                <span className="font-bold text-lg hover:text-primary transition-colors">
                  Ayomide<span className="text-primary">.</span>
                </span>
              </Link>

              <p className="dark:text-muted text-muted-light mt-3 text-sm leading-relaxed max-w-xs">
                Building modern, performant web applications with clean code and
                intuitive user experiences.
              </p>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="dark:text-text text-text-light font-semibold mb-4 text-base">
                Quick Links
              </h3>

              <nav
                className="flex flex-col gap-2"
                aria-label="Footer navigation"
              >
                {navLinks.map((link) => (
                  <button
                    key={link.to}
                    onClick={() => handleQuickLink(link.to)}
                    className="text-sm dark:text-muted text-muted-light hover:text-primary transition-colors text-left py-1"
                  >
                    {link.label}
                  </button>
                ))}

                <Link
                  to="/projects"
                  className="text-sm dark:text-muted text-muted-light hover:text-primary transition-colors py-1"
                >
                  All Projects
                </Link>
              </nav>
            </div>

            {/* Social Links */}
            <div>
              <h3 className="dark:text-text text-text-light font-semibold mb-4 text-base">
                Connect
              </h3>

              <div className="flex gap-3 mb-4 flex-wrap">
                {socialLinks.map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    target={
                      social.href?.startsWith("http") ? "_blank" : undefined
                    }
                    rel={
                      social.href?.startsWith("http")
                        ? "noopener noreferrer"
                        : undefined
                    }
                    className="w-10 h-10 rounded-xl dark:bg-card bg-card-light border dark:border-border border-border-light flex items-center justify-center dark:text-muted text-muted-light hover:text-primary hover:border-primary transition-all"
                    aria-label={social.label}
                  >
                    {social.icon}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t dark:border-border border-border-light py-5 sm:py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs sm:text-sm dark:text-muted text-muted-light text-center sm:text-left">
            © {currentYear} Ayomide Emmanuel. All rights reserved.
          </p>
        </div>
      </Container>
    </footer>
  );
}

export default memo(Footer);

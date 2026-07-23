import { useState, useEffect, useCallback, memo } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { FiMenu, FiX, FiSun, FiMoon, FiDownload } from "react-icons/fi";
import { navLinks, personalInfo } from "../../data/portfolio";
import { useScrollDirection } from "../../hooks/useScrollDirection";
import { useTheme } from "../../hooks/useTheme";
import Container from "../common/Container";

function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const { scrollDirection, scrollY } = useScrollDirection();
  const { isDark, toggleTheme } = useTheme();
  const location = useLocation();
  const navigate = useNavigate();
  const isHome = location.pathname === "/";

  useEffect(() => {
    setMobileOpen(false);
  }, [location]);

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  useEffect(() => {
    if (!isHome) {
      setActiveSection("");
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { rootMargin: "-40% 0px -40% 0px" }
    );

    navLinks.forEach((link) => {
      const el = document.getElementById(link.to);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [isHome]);

  const handleNavClick = useCallback(
    (link) => {
      setMobileOpen(false);
      if (isHome) {
        const el = document.getElementById(link.to);
        if (el) {
          el.scrollIntoView({ behavior: "smooth" });
        }
      } else {
        navigate("/");
        setTimeout(() => {
          const el = document.getElementById(link.to);
          if (el) {
            el.scrollIntoView({ behavior: "smooth" });
          }
        }, 300);
      }
    },
    [isHome, navigate]
  );

  const isHidden = scrollDirection === "down" && scrollY > 100 && !mobileOpen;

  return (
    <motion.nav
      className={`fixed top-0 left-0 right-0 z-50 transition-transform duration-300 ${
        isHidden ? "-translate-y-full" : "translate-y-0"
      }`}
      initial={{ y: -100 }}
      animate={{ y: isHidden ? -100 : 0 }}
      transition={{ duration: 0.3 }}
    >
      <div
        className={`${
          scrollY > 10
            ? "dark:bg-surface/80 bg-surface-light/80 backdrop-blur-xl shadow-lg dark:shadow-black/20 shadow-black/5 border-b dark:border-border/50 border-border-light/50"
            : "bg-transparent"
        } transition-all duration-300`}
      >
        <Container>
          <div className="flex items-center justify-between h-16 md:h-20">
            {/* Logo */}
            <Link
              to="/"
              className="flex items-center gap-2 group"
              aria-label="Home"
            >
                <img
                className="w-9 h-9 rounded-lg bg-primary flex items-center justify-center text-white font-bold text-sm"
                src="/favicon.svg" alt="img" />
              <span class="hover:text-primary">
                Ayomide<span className="text-primary">.</span>
              </span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-1">
              {navLinks.map((link) => (
                <button
                  key={link.to}
                  onClick={() => handleNavClick(link)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 cursor-pointer ${
                    activeSection === link.to
                      ? "text-primary bg-primary/10"
                      : "dark:text-muted text-muted-light hover:text-primary dark:hover:text-primary"
                  }`}
                  aria-label={`Navigate to ${link.label}`}
                >
                  {link.label}
                </button>
              ))}
            </div>

            {/* Actions */}
            <div className="flex items-center gap-2">
              <button
                onClick={toggleTheme}
                className="w-10 h-10 rounded-xl dark:bg-surface bg-card-light border dark:border-border border-border-light flex items-center justify-center dark:text-muted text-muted-light hover:text-primary dark:hover:text-primary transition-all cursor-pointer"
                aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
              >
                {isDark ? <FiSun className="text-lg" /> : <FiMoon className="text-lg" />}
              </button>

              <a
                href={personalInfo.resumeUrl}
                className="hidden md:inline-flex items-center gap-2 px-4 py-2 bg-primary hover:bg-primary-hover text-white rounded-xl text-sm font-semibold transition-all"
                aria-label="Download Resume"
              >
                <FiDownload />
                Resume
              </a>

              {/* Mobile Menu Button */}
              <button
                onClick={() => setMobileOpen(!mobileOpen)}
                className="md:hidden w-10 h-10 rounded-xl dark:bg-surface bg-card-light border dark:border-border border-border-light flex items-center justify-center dark:text-text text-text-light cursor-pointer"
                aria-label={mobileOpen ? "Close menu" : "Open menu"}
                aria-expanded={mobileOpen}
              >
                <AnimatePresence mode="wait">
                  {mobileOpen ? (
                    <motion.div
                      key="close"
                      initial={{ rotate: -90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: 90, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <FiX className="text-xl" />
                    </motion.div>
                  ) : (
                    <motion.div
                      key="menu"
                      initial={{ rotate: 90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: -90, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <FiMenu className="text-xl" />
                    </motion.div>
                  )}
                </AnimatePresence>
              </button>
            </div>
          </div>
        </Container>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              className="fixed inset-0 bg-black/50 backdrop-blur-sm md:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileOpen(false)}
              aria-hidden="true"
            />
            <motion.div
              className="fixed top-16 right-0 w-72 h-[calc(100dvh-4rem)] dark:bg-surface bg-surface-light border-l dark:border-border border-border-light md:hidden overflow-y-auto"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
            >
              <div className="p-6 flex flex-col gap-2">
                {navLinks.map((link, idx) => (
                  <motion.button
                    key={link.to}
                    onClick={() => handleNavClick(link)}
                    className={`w-full text-left px-4 py-3 rounded-xl text-base font-medium transition-all cursor-pointer ${
                      activeSection === link.to
                        ? "text-primary bg-primary/10"
                        : "dark:text-muted text-muted-light hover:text-primary hover:bg-primary/5"
                    }`}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.05 }}
                    aria-label={`Navigate to ${link.label}`}
                  >
                    {link.label}
                  </motion.button>
                ))}

                <motion.a
                  href={personalInfo.resumeUrl}
                  className="mt-4 flex items-center justify-center gap-2 px-4 py-3 bg-primary hover:bg-primary-hover text-white rounded-xl text-base font-semibold transition-all"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  aria-label="Download Resume"
                >
                  <FiDownload />
                  Download Resume
                </motion.a>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}

export default memo(Navbar);

import { useState, useEffect, useCallback, memo } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { FiMenu, FiX, FiSun, FiMoon, FiDownload } from "react-icons/fi";
import CVDownloadButton from "../common/CVDownloadButton";
import { navLinks } from "../../data/portfolio";
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

  // Close mobile menu on route change
  useEffect(() => {
    setMobileOpen(false);
  }, [location]);

  // Lock body scroll when mobile menu is open
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

  // Track active section on homepage
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

  // Handle navigation click
  const handleNavClick = useCallback(
    (link) => {
      setMobileOpen(false);
      
      if (isHome) {
        const el = document.getElementById(link.to);
        if (el) {
          el.scrollIntoView({ behavior: "smooth" });
        }
      } else {
        navigate("/", { replace: false });
        // Wait for navigation then scroll
        setTimeout(() => {
          const el = document.getElementById(link.to);
          if (el) {
            el.scrollIntoView({ behavior: "smooth" });
          }
        }, 150);
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
      role="navigation"
      aria-label="Main navigation"
    >
      <div
        className={`${
          scrollY > 10
            ? "dark:bg-surface/80 bg-surface-light/80 backdrop-blur-xl shadow-lg dark:shadow-black/20 shadow-black/5 border-b dark:border-border/50 border-border-light/50"
            : "bg-transparent"
        } transition-all duration-300`}
      >
        <Container>
          <div className="flex items-center justify-between h-14 sm:h-16 md:h-20">
            {/* Logo - Always links to home */}
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
              <span className="font-bold text-base sm:text-lg dark:text-text text-text-light group-hover:text-primary transition-colors hidden sm:block">
                Ayomide<span className="text-primary">.</span>
              </span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-1">
              {navLinks.map((link) => (
                <button
                  key={link.to}
                  onClick={() => handleNavClick(link)}
                  className={`px-3 xl:px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 cursor-pointer ${
                    activeSection === link.to
                      ? "text-primary bg-primary/10"
                      : "dark:text-muted text-muted-light hover:text-primary dark:hover:text-primary"
                  }`}
                  aria-label={`Navigate to ${link.label} section`}
                  aria-current={activeSection === link.to ? "true" : undefined}
                >
                  {link.label}
                </button>
              ))}
            </div>

            {/* Actions */}
            <div className="flex items-center gap-2">
              {/* Theme Toggle */}
              <button
                onClick={toggleTheme}
                className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl dark:bg-surface bg-card-light border dark:border-border border-border-light flex items-center justify-center dark:text-muted text-muted-light hover:text-primary dark:hover:text-primary transition-all cursor-pointer"
                aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
              >
                {isDark ? <FiSun className="text-base sm:text-lg" /> : <FiMoon className="text-base sm:text-lg" />}
              </button>

              {/* Resume Button - Desktop (password protected) */}
              <CVDownloadButton
                plain
                icon={<FiDownload />}
                className="hidden lg:inline-flex items-center gap-2 px-4 py-2 bg-primary hover:bg-primary-hover text-white rounded-xl text-sm font-semibold transition-all cursor-pointer"
                aria-label="Download Resume"
              >
                Resume
              </CVDownloadButton>

              {/* Mobile Menu Button */}
              <button
                onClick={() => setMobileOpen(!mobileOpen)}
                className="lg:hidden w-9 h-9 sm:w-10 sm:h-10 rounded-xl dark:bg-surface bg-card-light border dark:border-border border-border-light flex items-center justify-center dark:text-text text-text-light cursor-pointer"
                aria-label={mobileOpen ? "Close menu" : "Open menu"}
                aria-expanded={mobileOpen}
                aria-controls="mobile-menu"
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
                      <FiX className="text-lg sm:text-xl" />
                    </motion.div>
                  ) : (
                    <motion.div
                      key="menu"
                      initial={{ rotate: 90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: -90, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <FiMenu className="text-lg sm:text-xl" />
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
            {/* Backdrop */}
            <motion.div
              className="fixed inset-0 bg-black/50 backdrop-blur-sm lg:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileOpen(false)}
              aria-hidden="true"
            />
            {/* Drawer */}
            <motion.div
              id="mobile-menu"
              className="fixed top-14 sm:top-16 right-0 w-full xs:w-80 max-w-[calc(100vw-1rem)] h-[calc(100dvh-3.5rem)] sm:h-[calc(100dvh-4rem)] dark:bg-surface bg-surface-light border-l dark:border-border border-border-light lg:hidden overflow-y-auto"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              role="dialog"
              aria-modal="true"
              aria-label="Mobile navigation menu"
            >
              <div className="p-4 sm:p-6 flex flex-col gap-2">
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
                    aria-label={`Navigate to ${link.label} section`}
                  >
                    {link.label}
                  </motion.button>
                ))}

                {/* All Projects Link */}
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: navLinks.length * 0.05 }}
                >
                  <Link
                    to="/projects"
                    className="w-full text-left px-4 py-3 rounded-xl text-base font-medium dark:text-muted text-muted-light hover:text-primary hover:bg-primary/5 transition-all block"
                    onClick={() => setMobileOpen(false)}
                  >
                    All Projects
                  </Link>
                </motion.div>

                {/* Resume Button (password protected) */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="mt-4"
                >
                  <CVDownloadButton
                    plain
                    icon={<FiDownload />}
                    className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-primary hover:bg-primary-hover text-white rounded-xl text-base font-semibold transition-all cursor-pointer"
                    aria-label="Download Resume"
                    aria-haspopup="dialog"
                    onOpen={() => setMobileOpen(false)}
                  >
                    Download Resume
                  </CVDownloadButton>
                </motion.div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}

export default memo(Navbar);

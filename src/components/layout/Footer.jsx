import { memo } from "react";
import { Link } from "react-router-dom";
import {
  FiGithub,
  FiLinkedin,
  FiTwitter,
  FiMail,
  FiArrowUp,
} from "react-icons/fi";

import { personalInfo, navLinks } from "../../data/portfolio";
import Container from "../common/Container";

function Footer() {
  const currentYear = new Date().getFullYear();

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const socialLinks = [
    {
      icon: <FiGithub />,
      href: personalInfo.socials?.github,
      label: "GitHub",
    },
    {
      icon: <FiLinkedin />,
      href: personalInfo.socials?.linkedin,
      label: "LinkedIn",
    },
    {
      icon: <FiTwitter />,
      href: personalInfo.socials?.twitter,
      label: "Twitter",
    },
    {
      icon: <FiMail />,
      href: personalInfo.socials?.email,
      label: "Email",
    },
  ].filter((social) => social.href);

  return (
    <footer className="bg-surface-light dark:bg-surface border-t border-border-light dark:border-border">
      <Container>
        <div className="grid grid-cols-1 gap-10 py-12 md:grid-cols-3 md:py-16">
          {/* Brand */}
          <div>
            <Link
              to="/"
              className="mb-4 flex items-center gap-2"
              aria-label="Go to homepage"
            >
              <img
                className="w-9 h-9 rounded-lg bg-primary flex items-center justify-center text-white font-bold text-sm"
                src="/favicon.svg" alt="img" />
              <span class="hover:text-primary">
                Ayomide<span className="text-primary">.</span>
              </span>
            </Link>

            <p className="max-w-sm leading-7 text-muted-light dark:text-muted">
              Building modern, responsive and accessible web applications with
              React, JavaScript and modern frontend technologies.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="mb-4 font-semibold text-text-light dark:text-text">
              Quick Links
            </h3>

            <nav className="flex flex-col gap-3">
              {navLinks.map((link) => (
                <button
                  key={link.to}
                  onClick={() => {
                    const section = document.getElementById(link.to);

                    if (section) {
                      section.scrollIntoView({
                        behavior: "smooth",
                      });
                    }
                  }}
                  className="cursor-pointer text-left text-muted-light transition hover:text-primary dark:text-muted"
                >
                  {link.label}
                </button>
              ))}

              <Link
                to="/projects"
                className="text-muted-light transition hover:text-primary dark:text-muted"
              >
                All Projects
              </Link>
            </nav>
          </div>

          {/* Social */}
          <div>
            <h3 className="mb-4 font-semibold text-text-light dark:text-text">
              Connect
            </h3>

            <div className="mb-5 flex gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target={
                    social.href?.startsWith("http")
                      ? "_blank"
                      : undefined
                  }
                  rel={
                    social.href?.startsWith("http")
                      ? "noopener noreferrer"
                      : undefined
                  }
                  aria-label={social.label}
                  className="flex h-10 w-10 items-center justify-center rounded-xl border border-border-light bg-card-light text-muted-light transition-all hover:border-primary hover:text-primary dark:border-border dark:bg-card dark:text-muted"
                >
                  {social.icon}
                </a>
              ))}
            </div>

            <a
              href={`mailto:${personalInfo.email}`}
              className="text-sm text-muted-light transition hover:text-primary dark:text-muted"
            >
              {personalInfo.email}
            </a>
          </div>
        </div>

        {/* Bottom */}
        <div className="flex flex-col items-center justify-between gap-4 border-t border-border-light py-6 dark:border-border sm:flex-row">
          <p className="text-sm text-muted-light dark:text-muted">
            © {currentYear} {personalInfo.name}. All rights reserved.
          </p>

        </div>
      </Container>
    </footer>
  );
}

export default memo(Footer);
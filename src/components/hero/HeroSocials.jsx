import { memo } from "react";
import { motion } from "framer-motion";
import { FiGithub, FiLinkedin, FiMail } from "react-icons/fi";
import { personalInfo } from "../../data/portfolio";

const socials = [
  { icon: <FiGithub />, href: personalInfo.socials.github, label: "GitHub" },
  { icon: <FiLinkedin />, href: personalInfo.socials.linkedin, label: "LinkedIn" },
  { icon: <FiMail />, href: `mailto:${personalInfo.email}`, label: "Email" },
];

function HeroSocials() {
  return (
    <motion.div
      className="flex items-center gap-3"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1, duration: 0.5 }}
    >
      {socials.map((social, idx) => (
        <motion.a
          key={social.label}
          href={social.href}
          target={social.href.startsWith("http") ? "_blank" : undefined}
          rel={social.href.startsWith("http") ? "noopener noreferrer" : undefined}
          className="w-11 h-11 rounded-xl dark:bg-surface/80 bg-card-light border dark:border-border border-border-light flex items-center justify-center dark:text-muted text-muted-light hover:text-primary dark:hover:text-primary hover:border-primary transition-all"
          whileHover={{ scale: 1.1, y: -2 }}
          whileTap={{ scale: 0.9 }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 + idx * 0.1 }}
          aria-label={social.label}
        >
          <span className="text-lg">{social.icon}</span>
        </motion.a>
      ))}
    </motion.div>
  );
}

export default memo(HeroSocials);

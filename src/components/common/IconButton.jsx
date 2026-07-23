import { memo } from "react";
import { motion } from "framer-motion";

function IconButton({ icon, onClick, href, ariaLabel, className = "", size = "md" }) {
  const sizeClasses = {
    sm: "w-8 h-8 text-sm",
    md: "w-10 h-10 text-base",
    lg: "w-12 h-12 text-lg",
  };

  const baseClasses = `inline-flex items-center justify-center rounded-xl dark:bg-surface bg-card-light dark:text-muted text-muted-light dark:hover:text-primary hover:text-primary dark:border-border border-border-light border transition-all duration-300 cursor-pointer ${sizeClasses[size]} ${className}`;

  if (href) {
    return (
      <motion.a
        href={href}
        className={baseClasses}
        target={href.startsWith("http") ? "_blank" : undefined}
        rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        aria-label={ariaLabel}
      >
        {icon}
      </motion.a>
    );
  }

  return (
    <motion.button
      className={baseClasses}
      onClick={onClick}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      aria-label={ariaLabel}
    >
      {icon}
    </motion.button>
  );
}

export default memo(IconButton);

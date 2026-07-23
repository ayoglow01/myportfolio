import { memo } from "react";
import { motion } from "framer-motion";

function Card({ children, className = "", hover = true, onClick }) {
  return (
    <motion.div
      className={`dark:bg-card bg-card-light rounded-2xl border dark:border-border border-border-light overflow-hidden ${hover ? "hover:border-primary/50 dark:hover:border-primary/50" : ""} transition-all duration-300 ${className}`}
      whileHover={hover ? { y: -4 } : {}}
      onClick={onClick}
      role={onClick ? "button" : undefined}
      tabIndex={onClick ? 0 : undefined}
    >
      {children}
    </motion.div>
  );
}

export default memo(Card);

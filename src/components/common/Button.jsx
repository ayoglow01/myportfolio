import { memo } from "react";
import { motion } from "framer-motion";

const variants = {
  primary:
    "bg-primary hover:bg-primary-hover text-white shadow-lg shadow-primary/25",
  secondary:
    "bg-transparent border-2 border-primary text-primary hover:bg-primary hover:text-white",
  outline:
    "bg-transparent border-2 dark:border-border border-border-light dark:text-text text-text-light hover:border-primary hover:text-primary",
  ghost:
    "bg-transparent dark:text-muted text-muted-light hover:text-primary dark:hover:text-primary",
};

const sizes = {
  sm: "px-4 py-2 text-sm",
  md: "px-6 py-3 text-base",
  lg: "px-8 py-4 text-lg",
};

function Button({
  children,
  variant = "primary",
  size = "md",
  className = "",
  href,
  icon,
  iconRight,
  disabled = false,
  type = "button",
  onClick,
  ariaLabel,
  ...props
}) {
  const baseClasses =
    "inline-flex items-center justify-center gap-2 font-semibold rounded-xl transition-all duration-300 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed";
  const classes = `${baseClasses} ${variants[variant]} ${sizes[size]} ${className}`;

  const content = (
    <>
      {icon && <span className="text-lg">{icon}</span>}
      {children}
      {iconRight && <span className="text-lg">{iconRight}</span>}
    </>
  );

  if (href) {
    return (
      <motion.a
        href={href}
        className={classes}
        target={href.startsWith("http") ? "_blank" : undefined}
        rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.97 }}
        aria-label={ariaLabel}
        {...props}
      >
        {content}
      </motion.a>
    );
  }

  return (
    <motion.button
      type={type}
      className={classes}
      onClick={onClick}
      disabled={disabled}
      whileHover={disabled ? {} : { scale: 1.03 }}
      whileTap={disabled ? {} : { scale: 0.97 }}
      aria-label={ariaLabel}
      {...props}
    >
      {content}
    </motion.button>
  );
}

export default memo(Button);

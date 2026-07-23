import { memo } from "react";

function Badge({ children, variant = "default", className = "" }) {
  const baseClasses = "inline-flex items-center px-3 py-1 rounded-full text-xs font-medium";
  const variantClasses = {
    default: "dark:bg-card bg-card-light dark:text-muted text-muted-light border dark:border-border border-border-light",
    primary: "bg-primary/10 text-primary border border-primary/20",
    secondary: "bg-secondary/10 text-secondary border border-secondary/20",
  };

  return (
    <span className={`${baseClasses} ${variantClasses[variant]} ${className}`}>
      {children}
    </span>
  );
}

export default memo(Badge);

import { memo } from "react";
import { motion } from "framer-motion";

function SectionTitle({ title, subtitle, center = true }) {
  return (
    <motion.div
      className={`mb-16 ${center ? "text-center" : ""}`}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6 }}
    >
      <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold dark:text-text text-text-light mb-4">
        {title}
      </h2>
      {subtitle && (
        <p className="text-lg dark:text-muted text-muted-light max-w-2xl mx-auto">
          {subtitle}
        </p>
      )}
      <div className="mt-6 flex items-center justify-center gap-2">
        <span className="h-1 w-12 bg-primary rounded-full" />
        <span className="h-1 w-4 bg-secondary rounded-full" />
        <span className="h-1 w-2 bg-primary rounded-full" />
      </div>
    </motion.div>
  );
}

export default memo(SectionTitle);

import { memo } from "react";
import { motion } from "framer-motion";
import { personalInfo } from "../../data/portfolio";

function HeroImage() {
  return (
    <motion.div
      className="relative flex items-center justify-center"
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 0.4, duration: 0.8, ease: "easeOut" }}
    >
      {/* Glow ring */}
      <motion.div
        className="absolute w-72 h-72 sm:w-80 sm:h-80 lg:w-96 lg:h-96 rounded-full bg-primary/20 blur-2xl"
        animate={{ scale: [1, 1.1, 1], opacity: [0.3, 0.5, 0.3] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        aria-hidden="true"
      />

      {/* Border ring */}
      <motion.div
        className="absolute w-64 h-64 sm:w-72 sm:h-72 lg:w-[340px] lg:h-[340px] rounded-full border-2 border-primary/30"
        animate={{ rotate: 360 }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        aria-hidden="true"
      >
        <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3 h-3 bg-primary rounded-full" />
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-2 h-2 bg-secondary rounded-full" />
      </motion.div>

      {/* Image */}
      <div className="relative w-56 h-56 sm:w-64 sm:h-64 lg:w-80 lg:h-80 rounded-full overflow-hidden border-4 dark:border-card border-border-light shadow-2xl">
       <img
  src={personalInfo.profileImage}
  alt={`${personalInfo.name} - Software Developer`}
  className="w-full h-full object-cover object-[center_5%] scale-110"
  loading="eager"
  width="320"
  height="320"
/>
      </div>
    </motion.div>
  );
}

export default memo(HeroImage);

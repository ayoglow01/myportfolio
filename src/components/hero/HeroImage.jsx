import { memo } from "react";
import { motion } from "framer-motion";
import { personalInfo } from "../../data/portfolio";

function HeroImage() {
  return (
    <motion.div
      className="relative mx-auto w-[260px] h-[260px] sm:w-[320px] sm:h-[320px] lg:w-[380px] lg:h-[380px] flex items-center justify-center"
      initial={{ opacity: 0, scale: 0.85 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{
        duration: 0.8,
        delay: 0.4,
        ease: "easeOut",
      }}
    >
      {/* Animated Glow */}
      <motion.div
        className="absolute inset-0 rounded-full bg-primary/20 blur-3xl"
        animate={{
          scale: [1, 1.08, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Rotating Ring */}
      <motion.div
        className="absolute w-[90%] h-[90%] rounded-full border-2 border-primary/30"
        animate={{ rotate: 360 }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "linear",
        }}
      >
        <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-primary shadow-lg" />
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-3 h-3 rounded-full bg-secondary shadow-lg" />
      </motion.div>

      {/* Profile Image */}
      <div className="relative w-[78%] h-[78%] rounded-full overflow-hidden border-4 border-primary/20 shadow-2xl bg-card">
        <img
          src={personalInfo.profileImage}
          alt={`${personalInfo.name} - Software Developer`}
          className="w-full h-full object-cover object-center"
          loading="eager"
          draggable={false}
        />
      </div>
    </motion.div>
  );
}

export default memo(HeroImage);
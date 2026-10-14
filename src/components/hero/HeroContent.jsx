import { memo } from "react";
import { motion } from "framer-motion";
import { Typewriter } from "react-simple-typewriter";
import { personalInfo } from "../../data/portfolio";
import HeroButtons from "./HeroButtons";
import HeroSocials from "./HeroSocials";

function HeroContent() {
  return (
    <div className="flex flex-col gap-6">
      {/* Greeting */}
      <motion.p
        className="text-secondary font-semibold text-lg"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.2, duration: 0.5 }}
      >
        {personalInfo.greeting}
      </motion.p>

      {/* Name */}
      <motion.h1
        className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold dark:text-text text-text-light leading-tight"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.5 }}
      >
        {personalInfo.name}
      </motion.h1>

      {/* Typewriter */}
      <motion.div
        className="text-xl sm:text-2xl lg:text-3xl font-semibold"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.5 }}
      >
        <span className="dark:text-muted text-muted-light">I&apos;m </span>
        <span className="text-secondary">
          <Typewriter
            words={personalInfo.roles}
            loop
            cursor
            cursorStyle="|"
            typeSpeed={80}
            deleteSpeed={50}
            delaySpeed={2000}
          />
        </span>
      </motion.div>

      {/* Description */}
      <motion.p
        className="text-base sm:text-lg dark:text-muted text-muted-light max-w-lg leading-relaxed"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.5 }}
      >
        {personalInfo.description}
      </motion.p>

      {/* Buttons */}
      <HeroButtons />

      {/* Socials */}
      <HeroSocials />
    </div>
  );
}

export default memo(HeroContent);

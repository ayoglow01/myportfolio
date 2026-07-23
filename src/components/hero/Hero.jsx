import { memo } from "react";
import { motion } from "framer-motion";
import { FiChevronDown } from "react-icons/fi";
import Container from "../common/Container";
import BackgroundGlow from "./BackgroundGlow";
import HeroContent from "./HeroContent";
import HeroImage from "./HeroImage";

function Hero() {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center pt-20 pb-12 overflow-hidden"
    >
      <BackgroundGlow />
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8 items-center">
          <HeroContent />
          <div className="order-first lg:order-last flex justify-center">
            <HeroImage />
          </div>
        </div>
      </Container>

      {/* Scroll Down Indicator */}
      <motion.button
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 dark:text-muted text-muted-light cursor-pointer"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, y: [0, 8, 0] }}
        transition={{
          opacity: { delay: 1.5 },
          y: { duration: 2, repeat: Infinity },
        }}
        onClick={() => {
          const el = document.getElementById("about");
          if (el) el.scrollIntoView({ behavior: "smooth" });
        }}
        aria-label="Scroll to about section"
      >
        <span className="text-xs font-medium tracking-wider uppercase">Scroll</span>
        <FiChevronDown className="text-xl" />
      </motion.button>
    </section>
  );
}

export default memo(Hero);

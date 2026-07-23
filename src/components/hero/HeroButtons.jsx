import { memo } from "react";
import { motion } from "framer-motion";
import { FiDownload, FiArrowRight } from "react-icons/fi";
import { personalInfo } from "../../data/portfolio";
import Button from "../common/Button";

function HeroButtons() {
  const scrollToProjects = () => {
    const el = document.getElementById("projects");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <motion.div
      className="flex flex-wrap gap-4"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.8, duration: 0.5 }}
    >
      <Button
        href={personalInfo.resumeUrl}
        variant="primary"
        icon={<FiDownload />}
        ariaLabel="Download Resume"
      >
        Download Resume
      </Button>
      <Button
        variant="secondary"
        iconRight={<FiArrowRight />}
        onClick={scrollToProjects}
        ariaLabel="View Projects"
      >
        View Projects
      </Button>
    </motion.div>
  );
}

export default memo(HeroButtons);

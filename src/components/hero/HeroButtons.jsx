import { memo } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { FiDownload, FiArrowRight } from "react-icons/fi";
import Button from "../common/Button";
import CVDownloadButton from "../common/CVDownloadButton";

function HeroButtons() {
  const location = useLocation();
  const navigate = useNavigate();

  const scrollToProjects = () => {
    if (location.pathname === "/") {
      const el = document.getElementById("projects");
      if (el) el.scrollIntoView({ behavior: "smooth" });
    } else {
      navigate("/");
      setTimeout(() => {
        const el = document.getElementById("projects");
        if (el) el.scrollIntoView({ behavior: "smooth" });
      }, 100);
    }
  };

  return (
    <motion.div
      className="flex flex-col xs:flex-row flex-wrap justify-center lg:justify-start gap-3 sm:gap-4 px-2 sm:px-0"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.8, duration: 0.5 }}
    >
      <CVDownloadButton
        variant="primary"
        size="md"
        icon={<FiDownload />}
        className="w-full xs:w-auto text-sm sm:text-base"
      >
        Download Resume
      </CVDownloadButton>
      <Button
        variant="secondary"
        size="md"
        iconRight={<FiArrowRight />}
        onClick={scrollToProjects}
        ariaLabel="View Projects"
        className="w-full xs:w-auto text-sm sm:text-base"
      >
        View Projects
      </Button>
    </motion.div>
  );
}

export default memo(HeroButtons);

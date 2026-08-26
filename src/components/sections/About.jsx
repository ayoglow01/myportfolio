import { memo } from "react";
import { motion } from "framer-motion";
import { FiDownload, FiTarget, FiTrendingUp, FiBookOpen } from "react-icons/fi";
import Section from "../common/Section";
import SectionTitle from "../common/SectionTitle";
import AnimatedSection from "../common/AnimatedSection";
import CVDownloadButton from "../common/CVDownloadButton";
import { aboutData } from "../../data/portfolio";

const staggerContainer = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.1 },
  },
};

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

function About() {
  return (
    <Section id="about">
      <SectionTitle
        title="About Me"
        subtitle="Get to know me better — my background, goals, and what drives me."
      />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 xl:gap-16">
        {/* Bio & Education */}
        <AnimatedSection direction="left">
          <div className="space-y-4 sm:space-y-5">
            {aboutData.bio.map((paragraph, idx) => (
              <p
                key={idx}
                className="dark:text-muted text-muted-light leading-relaxed text-sm sm:text-base"
              >
                {paragraph}
              </p>
            ))}

            {/* Education */}
            {aboutData.education.map((edu, idx) => (
              <div
                key={idx}
                className="mt-5 sm:mt-6 p-4 sm:p-5 rounded-xl sm:rounded-2xl dark:bg-card bg-card-light border dark:border-border border-border-light"
              >
                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl bg-primary/10 flex items-center justify-center text-primary shrink-0">
                    <FiBookOpen className="text-sm sm:text-base" />
                  </div>
                  <div className="min-w-0">
                    <h4 className="font-semibold dark:text-text text-text-light text-sm sm:text-base">
                      {edu.degree}
                    </h4>
                    <p className="text-xs sm:text-sm dark:text-muted text-muted-light">
                      {edu.school} · {edu.year}
                    </p>
                    <p className="text-xs sm:text-sm dark:text-muted text-muted-light mt-1">
                      {edu.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}

            <div className="pt-3 sm:pt-4">
              <CVDownloadButton
                variant="primary"
                size="md"
                icon={<FiDownload />}
                className="w-full xs:w-auto"
              >
                Download CV
              </CVDownloadButton>
            </div>
          </div>
        </AnimatedSection>

        {/* Goals & Stats */}
        <div className="space-y-4 sm:space-y-6">
          {/* Mission & Goals Cards */}
          <AnimatedSection direction="right" delay={0.1}>
            <div className="p-4 sm:p-5 rounded-xl sm:rounded-2xl dark:bg-card bg-card-light border dark:border-border border-border-light">
              <div className="flex items-start gap-3 mb-2">
                <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl bg-secondary/10 flex items-center justify-center text-secondary shrink-0">
                  <FiTarget className="text-sm sm:text-base" />
                </div>
                <div className="min-w-0">
                  <h4 className="font-semibold dark:text-text text-text-light text-sm sm:text-base">
                    Current Focus
                  </h4>
                  <p className="text-xs sm:text-sm dark:text-muted text-muted-light mt-1 leading-relaxed">
                    {aboutData.currentFocus}
                  </p>
                </div>
              </div>
            </div>
          </AnimatedSection>

          <AnimatedSection direction="right" delay={0.2}>
            <div className="p-4 sm:p-5 rounded-xl sm:rounded-2xl dark:bg-card bg-card-light border dark:border-border border-border-light">
              <div className="flex items-start gap-3 mb-2">
                <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl bg-primary/10 flex items-center justify-center text-primary shrink-0">
                  <FiTrendingUp className="text-sm sm:text-base" />
                </div>
                <div className="min-w-0">
                  <h4 className="font-semibold dark:text-text text-text-light text-sm sm:text-base">
                    Career Goals
                  </h4>
                  <p className="text-xs sm:text-sm dark:text-muted text-muted-light mt-1 leading-relaxed">
                    {aboutData.careerGoals}
                  </p>
                </div>
              </div>
            </div>
          </AnimatedSection>

          {/* Stats */}
          <AnimatedSection direction="up" delay={0.3}>
            <motion.div
              className="grid grid-cols-2 gap-3 sm:gap-4"
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              {aboutData.stats.map((stat) => (
                <motion.div
                  key={stat.label}
                  className="p-3 sm:p-4 md:p-5 rounded-xl sm:rounded-2xl dark:bg-card bg-card-light border dark:border-border border-border-light text-center"
                  variants={fadeUp}
                >
                  <p className="text-xl sm:text-2xl md:text-3xl font-bold text-primary">
                    {stat.value}
                  </p>
                  <p className="text-xs sm:text-sm dark:text-muted text-muted-light mt-1">
                    {stat.label}
                  </p>
                </motion.div>
              ))}
            </motion.div>
          </AnimatedSection>
        </div>
      </div>
    </Section>
  );
}

export default memo(About);

import { memo } from "react";
import { motion } from "framer-motion";
import { FiDownload, FiTarget, FiTrendingUp, FiBookOpen } from "react-icons/fi";
import Section from "../common/Section";
import SectionTitle from "../common/SectionTitle";
import AnimatedSection from "../common/AnimatedSection";
import Button from "../common/Button";
import { aboutData, personalInfo } from "../../data/portfolio";

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

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
        {/* Bio & Education */}
        <AnimatedSection direction="left">
          <div className="space-y-5">
            {aboutData.bio.map((paragraph, idx) => (
              <p
                key={idx}
                className="dark:text-muted text-muted-light leading-relaxed text-base"
              >
                {paragraph}
              </p>
            ))}

            {/* Education */}
            {aboutData.education.map((edu, idx) => (
              <div
                key={idx}
                className="mt-6 p-5 rounded-2xl dark:bg-card bg-card-light border dark:border-border border-border-light"
              >
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary shrink-0">
                    <FiBookOpen />
                  </div>
                  <div>
                    <h4 className="font-semibold dark:text-text text-text-light">
                      {edu.degree}
                    </h4>
                    <p className="text-sm dark:text-muted text-muted-light">
                      {edu.school} · {edu.year}
                    </p>
                    <p className="text-sm dark:text-muted text-muted-light mt-1">
                      {edu.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}

            <div className="pt-4">
              <Button
                href={personalInfo.resumeUrl}
                variant="primary"
                icon={<FiDownload />}
                ariaLabel="Download CV"
              >
                Download CV
              </Button>
            </div>
          </div>
        </AnimatedSection>

        {/* Goals & Stats */}
        <div className="space-y-6">
          {/* Mission & Goals Cards */}
          <AnimatedSection direction="right" delay={0.1}>
            <div className="p-5 rounded-2xl dark:bg-card bg-card-light border dark:border-border border-border-light">
              <div className="flex items-start gap-3 mb-2">
                <div className="w-10 h-10 rounded-xl bg-secondary/10 flex items-center justify-center text-secondary shrink-0">
                  <FiTarget />
                </div>
                <div>
                  <h4 className="font-semibold dark:text-text text-text-light">Current Focus</h4>
                  <p className="text-sm dark:text-muted text-muted-light mt-1">
                    {aboutData.currentFocus}
                  </p>
                </div>
              </div>
            </div>
          </AnimatedSection>

          <AnimatedSection direction="right" delay={0.2}>
            <div className="p-5 rounded-2xl dark:bg-card bg-card-light border dark:border-border border-border-light">
              <div className="flex items-start gap-3 mb-2">
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary shrink-0">
                  <FiTrendingUp />
                </div>
                <div>
                  <h4 className="font-semibold dark:text-text text-text-light">Career Goals</h4>
                  <p className="text-sm dark:text-muted text-muted-light mt-1">
                    {aboutData.careerGoals}
                  </p>
                </div>
              </div>
            </div>
          </AnimatedSection>

          {/* Stats */}
          <AnimatedSection direction="up" delay={0.3}>
            <motion.div
              className="grid grid-cols-2 gap-4"
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              {aboutData.stats.map((stat) => (
                <motion.div
                  key={stat.label}
                  className="p-5 rounded-2xl dark:bg-card bg-card-light border dark:border-border border-border-light text-center"
                  variants={fadeUp}
                >
                  <p className="text-2xl sm:text-3xl font-bold text-primary">
                    {stat.value}
                  </p>
                  <p className="text-sm dark:text-muted text-muted-light mt-1">
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

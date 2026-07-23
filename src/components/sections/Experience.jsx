import { memo } from "react";
import { motion } from "framer-motion";
import { FiBriefcase } from "react-icons/fi";
import Section from "../common/Section";
import SectionTitle from "../common/SectionTitle";
import Badge from "../common/Badge";
import { experiences } from "../../data/experience";

function Experience() {
  return (
    <Section id="experience">
      <SectionTitle
        title="Experience"
        subtitle="My professional journey and the roles that shaped my career."
      />

      <div className="relative max-w-3xl mx-auto">
        {/* Timeline line */}
        <div
          className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px dark:bg-border bg-border-light md:-translate-x-px"
          aria-hidden="true"
        />

        {experiences.map((exp, idx) => {
          const isLeft = idx % 2 === 0;
          return (
            <motion.div
              key={exp.id}
              className={`relative flex flex-col md:flex-row gap-8 mb-12 last:mb-0 ${
                isLeft ? "md:flex-row" : "md:flex-row-reverse"
              }`}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: idx * 0.15 }}
            >
              {/* Dot */}
              <div
                className="absolute left-4 md:left-1/2 top-0 w-8 h-8 -translate-x-1/2 rounded-full bg-primary flex items-center justify-center z-10 shadow-lg shadow-primary/30"
                aria-hidden="true"
              >
                <FiBriefcase className="text-white text-sm" />
              </div>

              {/* Content */}
              <div
                className={`ml-12 md:ml-0 md:w-1/2 ${
                  isLeft ? "md:pr-12 md:text-right" : "md:pl-12"
                }`}
              >
                <div className="p-6 rounded-2xl dark:bg-card bg-white border dark:border-border border-border-light hover:border-primary/30 dark:hover:border-primary/30 transition-all duration-300">
                  <span className="text-xs font-medium text-primary bg-primary/10 px-3 py-1 rounded-full">
                    {exp.period}
                  </span>
                  <h3 className="text-lg font-bold dark:text-text text-text-light mt-3">
                    {exp.role}
                  </h3>
                  <p className="text-sm dark:text-muted text-muted-light mb-3">
                    {exp.company} · {exp.location}
                  </p>
                  <p className="text-sm dark:text-muted text-muted-light mb-4 leading-relaxed">
                    {exp.description}
                  </p>

                  <ul className={`space-y-2 mb-4 ${isLeft ? "md:text-left" : ""}`}>
                    {exp.responsibilities.map((item, i) => (
                      <li
                        key={i}
                        className="text-sm dark:text-muted text-muted-light flex items-start gap-2"
                      >
                        <span className="text-primary mt-1 shrink-0">▸</span>
                        {item}
                      </li>
                    ))}
                  </ul>

                  <div className={`flex flex-wrap gap-2 ${isLeft ? "md:justify-end" : ""}`}>
                    {exp.technologies.map((tech) => (
                      <Badge key={tech} variant="primary">
                        {tech}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </Section>
  );
}

export default memo(Experience);

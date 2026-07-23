import { memo } from "react";
import { motion } from "framer-motion";
import Section from "../common/Section";
import SectionTitle from "../common/SectionTitle";
import { skillCategories } from "../../data/skills";

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20, scale: 0.9 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.4 },
  },
};

function Skills() {
  return (
    <Section id="skills" className="dark:bg-surface/50 bg-card-light/50">
      <SectionTitle
        title="Skills & Technologies"
        subtitle="The tools and technologies I use to bring ideas to life."
      />

      <div className="space-y-12">
        {skillCategories.map((category) => (
          <motion.div
            key={category.title}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5 }}
          >
            <h3 className="text-xl font-semibold dark:text-text text-text-light mb-6 flex items-center gap-3">
              <span className="h-px flex-1 max-w-[40px] bg-primary" />
              {category.title}
            </h3>

            <motion.div
              className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4"
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              {category.skills.map((skill) => {
                const Icon = skill.icon;
                return (
                  <motion.div
                    key={skill.name}
                    className="group p-5 rounded-2xl dark:bg-card bg-white border dark:border-border border-border-light hover:border-primary/50 dark:hover:border-primary/50 transition-all duration-300 text-center cursor-default"
                    variants={itemVariants}
                    whileHover={{ y: -4, scale: 1.02 }}
                  >
                    <div className="flex flex-col items-center gap-3">
                      <Icon
                        className="text-3xl transition-transform duration-300 group-hover:scale-110"
                        style={{ color: skill.color }}
                        aria-hidden="true"
                      />
                      <span className="text-sm font-medium dark:text-text text-text-light">
                        {skill.name}
                      </span>
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>
          </motion.div>
        ))}
      </div>
    </Section>
  );
}

export default memo(Skills);

import { useState, useMemo, memo } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FiArrowRight } from "react-icons/fi";
import Section from "../common/Section";
import SectionTitle from "../common/SectionTitle";
import ProjectCard from "../cards/ProjectCard";
import Button from "../common/Button";
import { projects, projectCategories } from "../../data/projects";

function Projects() {
  const [activeFilter, setActiveFilter] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredProjects = useMemo(() => {
    return projects.filter((project) => {
      const matchesCategory =
        activeFilter === "All" || project.category === activeFilter;
      const matchesSearch =
        searchQuery === "" ||
        project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.shortDescription
          .toLowerCase()
          .includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [activeFilter, searchQuery]);

  return (
    <Section id="projects" className="dark:bg-surface/50 bg-card-light/50">
      <SectionTitle
        title="Featured Projects"
        subtitle="A selection of projects that showcase my skills and experience."
      />

      {/* Search & Filter */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-10">
        <div className="flex flex-wrap justify-center gap-2">
          {projectCategories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveFilter(cat)}
              className={`px-4 py-2 rounded-xl text-sm font-medium transition-all cursor-pointer ${
                activeFilter === cat
                  ? "bg-primary text-white shadow-lg shadow-primary/25"
                  : "dark:bg-card bg-white dark:text-muted text-muted-light border dark:border-border border-border-light hover:border-primary/50"
              }`}
              aria-label={`Filter by ${cat}`}
              aria-pressed={activeFilter === cat}
            >
              {cat}
            </button>
          ))}
        </div>

        <input
          type="text"
          placeholder="Search projects..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full sm:w-64 px-4 py-2.5 rounded-xl dark:bg-card bg-white border dark:border-border border-border-light dark:text-text text-text-light placeholder:dark:text-muted placeholder:text-muted-light focus:border-primary outline-none transition-all text-sm"
          aria-label="Search projects"
        />
      </div>

      {/* Projects Grid */}
      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8"
        layout
      >
        {filteredProjects.length > 0 ? (
          filteredProjects.map((project, idx) => (
            <ProjectCard key={project.id} project={project} index={idx} />
          ))
        ) : (
          <div className="col-span-full text-center py-16">
            <p className="dark:text-muted text-muted-light text-lg">
              No projects found matching your criteria.
            </p>
          </div>
        )}
      </motion.div>

      {/* View All */}
      <div className="text-center mt-12">
        <Link to="/projects">
          <Button variant="secondary" iconRight={<FiArrowRight />}>
            View All Projects
          </Button>
        </Link>
      </div>
    </Section>
  );
}

export default memo(Projects);

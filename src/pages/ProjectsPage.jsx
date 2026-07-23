import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import SEO from "../components/common/SEO";
import Section from "../components/common/Section";
import SectionTitle from "../components/common/SectionTitle";
import ProjectCard from "../components/cards/ProjectCard";
import { projects, projectCategories } from "../data/projects";

export default function ProjectsPage() {
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
          .includes(searchQuery.toLowerCase()) ||
        project.technologies.some((tech) =>
          tech.toLowerCase().includes(searchQuery.toLowerCase())
        );
      return matchesCategory && matchesSearch;
    });
  }, [activeFilter, searchQuery]);

  return (
    <>
      <SEO
        title="Projects"
        description="Explore all projects by Ayomide Akinola — web applications, frontend projects, and full-stack solutions."
        canonical="/projects"
        keywords="projects, web applications, react projects, portfolio projects, ayomide akinola"
      />

      <div className="pt-24">
        <Section>
          <SectionTitle
            title="All Projects"
            subtitle="A comprehensive showcase of my work, featuring web applications and creative solutions."
          />

          {/* Filters */}
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

          {/* Grid */}
          <motion.div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8" layout>
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
        </Section>
      </div>
    </>
  );
}

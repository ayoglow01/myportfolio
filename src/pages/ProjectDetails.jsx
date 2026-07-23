import { useMemo, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  FiArrowLeft,
  FiGithub,
  FiExternalLink,
  FiCalendar,
  FiLayers,
} from "react-icons/fi";
import SEO from "../components/common/SEO";
import Container from "../components/common/Container";
import Badge from "../components/common/Badge";
import Button from "../components/common/Button";
import AnimatedSection from "../components/common/AnimatedSection";
import ProjectCard from "../components/cards/ProjectCard";
import { projects } from "../data/projects";

export default function ProjectDetails() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [activeImage, setActiveImage] = useState(0);

  const project = useMemo(
    () => projects.find((p) => p.slug === slug),
    [slug]
  );

  const relatedProjects = useMemo(() => {
    if (!project) return [];
    return projects
      .filter((p) => p.id !== project.id && p.category === project.category)
      .slice(0, 2);
  }, [project]);

  if (!project) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-20">
        <div className="text-center">
          <h1 className="text-4xl font-bold dark:text-text text-text-light mb-4">
            Project Not Found
          </h1>
          <p className="dark:text-muted text-muted-light mb-6">
            The project you&apos;re looking for doesn&apos;t exist.
          </p>
          <Button onClick={() => navigate("/projects")} variant="primary">
            View All Projects
          </Button>
        </div>
      </div>
    );
  }

  const sections = [
    { title: "Overview", content: project.overview },
    { title: "The Problem", content: project.problem },
    { title: "The Solution", content: project.solution },
    { title: "Challenges", content: project.challenges },
    { title: "Lessons Learned", content: project.lessons },
  ];

  return (
    <>
      <SEO
        title={project.title}
        description={project.shortDescription}
        canonical={`/projects/${project.slug}`}
        keywords={project.technologies.join(", ")}
        ogType="article"
      />

      <div className="pt-24 pb-16">
        <Container>
          {/* Back */}
          <motion.div
            className="mb-8"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4 }}
          >
            <Link
              to="/projects"
              className="inline-flex items-center gap-2 dark:text-muted text-muted-light hover:text-primary transition-colors text-sm font-medium"
            >
              <FiArrowLeft /> Back to Projects
            </Link>
          </motion.div>

          {/* Hero Image */}
          <AnimatedSection direction="up">
            <div className="relative rounded-2xl overflow-hidden mb-10 aspect-video">
              <img
                src={project.gallery[activeImage]}
                alt={project.title}
                className="w-full h-full object-cover"
                loading="eager"
              />
            </div>

            {/* Gallery Thumbnails */}
            {project.gallery.length > 1 && (
              <div className="flex gap-3 mb-10 justify-center">
                {project.gallery.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImage(idx)}
                    className={`w-20 h-14 rounded-lg overflow-hidden border-2 transition-all cursor-pointer ${
                      activeImage === idx
                        ? "border-primary"
                        : "border-transparent dark:border-border border-light opacity-60 hover:opacity-100"
                    }`}
                    aria-label={`View image ${idx + 1}`}
                  >
                    <img
                      src={img}
                      alt={`${project.title} screenshot ${idx + 1}`}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                  </button>
                ))}
              </div>
            )}
          </AnimatedSection>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-10">
              <AnimatedSection direction="up" delay={0.1}>
                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold dark:text-text text-text-light mb-4">
                  {project.title}
                </h1>
                <p className="text-lg dark:text-muted text-muted-light leading-relaxed">
                  {project.description}
                </p>
              </AnimatedSection>

              {/* Sections */}
              {sections.map((section, idx) => (
                <AnimatedSection key={section.title} direction="up" delay={0.1 + idx * 0.05}>
                  <h2 className="text-xl font-bold dark:text-text text-text-light mb-3">
                    {section.title}
                  </h2>
                  <p className="dark:text-muted text-muted-light leading-relaxed">
                    {section.content}
                  </p>
                </AnimatedSection>
              ))}

              {/* Features */}
              <AnimatedSection direction="up" delay={0.3}>
                <h2 className="text-xl font-bold dark:text-text text-text-light mb-4">
                  Key Features
                </h2>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {project.features.map((feature, idx) => (
                    <li
                      key={idx}
                      className="flex items-start gap-3 p-3 rounded-xl dark:bg-card bg-card-light border dark:border-border border-border-light"
                    >
                      <span className="text-primary mt-0.5 shrink-0">✦</span>
                      <span className="text-sm dark:text-text text-text-light">
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>
              </AnimatedSection>
            </div>

            {/* Sidebar */}
            <AnimatedSection direction="right" delay={0.2} className="space-y-6">
              {/* Actions */}
              <div className="p-6 rounded-2xl dark:bg-card bg-white border dark:border-border border-border-light space-y-3">
                <Button
                  href={project.liveDemo}
                  variant="primary"
                  icon={<FiExternalLink />}
                  className="w-full"
                >
                  Live Demo
                </Button>
                <Button
                  href={project.github}
                  variant="secondary"
                  icon={<FiGithub />}
                  className="w-full"
                >
                  View Source
                </Button>
              </div>

              {/* Project Info */}
              <div className="p-6 rounded-2xl dark:bg-card bg-white border dark:border-border border-border-light space-y-4">
                <h3 className="font-semibold dark:text-text text-text-light">
                  Project Info
                </h3>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <FiCalendar className="text-primary" />
                    <div>
                      <p className="text-xs dark:text-muted text-muted-light">Year</p>
                      <p className="text-sm font-medium dark:text-text text-text-light">
                        {project.year}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <FiLayers className="text-primary" />
                    <div>
                      <p className="text-xs dark:text-muted text-muted-light">Category</p>
                      <p className="text-sm font-medium dark:text-text text-text-light">
                        {project.category}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Technologies */}
              <div className="p-6 rounded-2xl dark:bg-card bg-white border dark:border-border border-border-light">
                <h3 className="font-semibold dark:text-text text-text-light mb-3">
                  Technologies
                </h3>
                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((tech) => (
                    <Badge key={tech} variant="primary">
                      {tech}
                    </Badge>
                  ))}
                </div>
              </div>
            </AnimatedSection>
          </div>

          {/* Related Projects */}
          {relatedProjects.length > 0 && (
            <div className="mt-20">
              <h2 className="text-2xl font-bold dark:text-text text-text-light mb-8 text-center">
                Related Projects
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {relatedProjects.map((p, idx) => (
                  <ProjectCard key={p.id} project={p} index={idx} />
                ))}
              </div>
            </div>
          )}
        </Container>
      </div>
    </>
  );
}

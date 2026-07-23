import { memo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { FiGithub, FiExternalLink, FiArrowRight } from "react-icons/fi";
import Badge from "../common/Badge";

function ProjectCard({ project, index = 0 }) {
  const navigate = useNavigate();
  const [imageLoaded, setImageLoaded] = useState(false);

  return (
    <motion.article
      className="group rounded-2xl dark:bg-card bg-white border dark:border-border border-border-light overflow-hidden hover:border-primary/50 dark:hover:border-primary/50 transition-all duration-300"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ y: -6 }}
    >
      {/* Image */}
      <div className="relative aspect-video overflow-hidden bg-surface">
        <img
          src={project.image}
          alt={project.title}
          className={`w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 ${
            imageLoaded ? "opacity-100" : "opacity-0"
          }`}
          loading="lazy"
          onLoad={() => setImageLoaded(true)}
          width="600"
          height="338"
        />
        {!imageLoaded && (
          <div className="absolute inset-0 dark:bg-card bg-card-light animate-pulse" />
        )}

        {/* Overlay */}
        <div className="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-between p-4">
          <div className="flex gap-2">
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="w-9 h-9 rounded-lg bg-white/20 backdrop-blur-sm flex items-center justify-center text-white hover:bg-white/30 transition-all"
              aria-label={`View ${project.title} on GitHub`}
              onClick={(e) => e.stopPropagation()}
            >
              <FiGithub />
            </a>
            <a
              href={project.liveDemo}
              target="_blank"
              rel="noopener noreferrer"
              className="w-9 h-9 rounded-lg bg-white/20 backdrop-blur-sm flex items-center justify-center text-white hover:bg-white/30 transition-all"
              aria-label={`View ${project.title} live demo`}
              onClick={(e) => e.stopPropagation()}
            >
              <FiExternalLink />
            </a>
          </div>
        </div>

        {/* Category */}
        {project.featured && (
          <div className="absolute top-3 right-3">
            <span className="text-xs font-medium bg-primary text-white px-2.5 py-1 rounded-full">
              Featured
            </span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-6">
        <h3 className="text-lg font-bold dark:text-text text-text-light mb-2 group-hover:text-primary transition-colors">
          {project.title}
        </h3>
        <p className="text-sm dark:text-muted text-muted-light mb-4 leading-relaxed line-clamp-2">
          {project.shortDescription}
        </p>

        {/* Tech badges */}
        <div className="flex flex-wrap gap-2 mb-4">
          {project.technologies.slice(0, 4).map((tech) => (
            <Badge key={tech}>{tech}</Badge>
          ))}
          {project.technologies.length > 4 && (
            <Badge>+{project.technologies.length - 4}</Badge>
          )}
        </div>

        {/* Read More */}
        <button
          onClick={() => navigate(`/projects/${project.slug}`)}
          className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:gap-3 transition-all cursor-pointer"
          aria-label={`Read more about ${project.title}`}
        >
          Read More <FiArrowRight />
        </button>
      </div>
    </motion.article>
  );
}

export default memo(ProjectCard);

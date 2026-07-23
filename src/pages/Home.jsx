import { lazy, Suspense } from "react";
import SEO from "../components/common/SEO";
import LoadingSpinner from "../components/common/LoadingSpinner";
import Hero from "../components/hero/Hero";

// Lazy load sections for better performance
const About = lazy(() => import("../components/sections/About"));
const Skills = lazy(() => import("../components/sections/Skills"));
const Experience = lazy(() => import("../components/sections/Experience"));
const Projects = lazy(() => import("../components/sections/Projects"));
const Contact = lazy(() => import("../components/sections/Contact"));

function SectionFallback() {
  return (
    <div className="py-16 sm:py-20">
      <LoadingSpinner size="md" className="min-h-[150px] sm:min-h-[200px]" />
    </div>
  );
}

export default function Home() {
  return (
    <>
      <SEO
        canonical="/"
        title={null}
        description="Portfolio of Ayomide Emmanuel — a Software Developer specializing in React, JavaScript, and modern web technologies. Explore my projects, skills, and experience."
      />
      <Hero />
      <Suspense fallback={<SectionFallback />}>
        <About />
      </Suspense>
      <Suspense fallback={<SectionFallback />}>
        <Skills />
      </Suspense>
      <Suspense fallback={<SectionFallback />}>
        <Experience />
      </Suspense>
      <Suspense fallback={<SectionFallback />}>
        <Projects />
      </Suspense>
      <Suspense fallback={<SectionFallback />}>
        <Contact />
      </Suspense>
    </>
  );
}

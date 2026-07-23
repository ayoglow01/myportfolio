import { lazy, Suspense, memo } from "react";
import { Routes, Route } from "react-router-dom";
import LoadingSpinner from "../components/common/LoadingSpinner";
import Home from "../pages/Home";

// Lazy load pages for better performance
const ProjectsPage = lazy(() => import("../pages/ProjectsPage"));
const ProjectDetails = lazy(() => import("../pages/ProjectDetails"));
const NotFound = lazy(() => import("../pages/NotFound"));

function PageFallback() {
  return (
    <div className="min-h-screen flex items-center justify-center" role="status" aria-label="Loading page">
      <LoadingSpinner size="lg" />
    </div>
  );
}

function AppRoutes() {
  return (
    <Suspense fallback={<PageFallback />}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/projects" element={<ProjectsPage />} />
        <Route path="/projects/:slug" element={<ProjectDetails />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Suspense>
  );
}

export default memo(AppRoutes);

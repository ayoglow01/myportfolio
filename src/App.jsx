import { useEffect, useCallback } from "react";
import { useLocation } from "react-router-dom";
import Layout from "./components/layout/Layout";
import AppRoutes from "./routes/AppRoutes";

// Scroll to top on route change (not on hash navigation)
function ScrollToTopOnRouteChange() {
  const { pathname, hash } = useLocation();
  
  useEffect(() => {
    // Only scroll to top if there's no hash (section anchor)
    if (!hash) {
      window.scrollTo({ top: 0, behavior: "instant" });
    }
  }, [pathname, hash]);
  
  return null;
}

export default function App() {
  // Handle hash navigation for section links
  const handleHashNavigation = useCallback(() => {
    const hash = window.location.hash;
    if (hash) {
      const element = document.querySelector(hash);
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: "smooth" });
        }, 100);
      }
    }
  }, []);

  useEffect(() => {
    handleHashNavigation();
    window.addEventListener("hashchange", handleHashNavigation);
    return () => window.removeEventListener("hashchange", handleHashNavigation);
  }, [handleHashNavigation]);

  return (
    <>
      <ScrollToTopOnRouteChange />
      <Layout>
        <AppRoutes />
      </Layout>
    </>
  );
}

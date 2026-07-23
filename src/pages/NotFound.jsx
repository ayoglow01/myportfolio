import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FiHome, FiArrowLeft } from "react-icons/fi";
import SEO from "../components/common/SEO";
import Button from "../components/common/Button";

export default function NotFound() {
  return (
    <>
      <SEO title="404 — Page Not Found" description="The page you're looking for doesn't exist." />
      <div className="min-h-screen flex items-center justify-center px-4">
        <motion.div
          className="text-center max-w-lg"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <motion.div
            className="text-8xl sm:text-9xl font-bold text-primary mb-4"
            initial={{ scale: 0.5 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
          >
            404
          </motion.div>
          <h1 className="text-2xl sm:text-3xl font-bold dark:text-text text-text-light mb-3">
            Page Not Found
          </h1>
          <p className="dark:text-muted text-muted-light mb-8 leading-relaxed">
            The page you&apos;re looking for doesn&apos;t exist or has been moved.
            Let&apos;s get you back on track.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/">
              <Button variant="primary" icon={<FiHome />}>
                Back to Home
              </Button>
            </Link>
            <Button
              variant="outline"
              icon={<FiArrowLeft />}
              onClick={() => window.history.back()}
            >
              Go Back
            </Button>
          </div>
        </motion.div>
      </div>
    </>
  );
}

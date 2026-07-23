import { memo } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import ScrollTop from "../common/ScrollTop";

function Layout({ children }) {
  return (
    <div className="min-h-dvh flex flex-col dark:bg-bg bg-bg-light overflow-x-hidden">
      <a 
        href="#main-content" 
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-100 focus:px-4 focus:py-2 focus:bg-primary focus:text-white focus:rounded-lg"
      >
        Skip to main content
      </a>
      <Navbar />
      <main id="main-content" className="flex-1" tabIndex="-1">
        {children}
      </main>
      <Footer />
      <ScrollTop />
    </div>
  );
}

export default memo(Layout);

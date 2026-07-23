import { memo } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import ScrollTop from "../common/ScrollTop";

function Layout({ children }) {
  return (
    <div className="min-h-screen flex flex-col dark:bg-bg bg-bg-light">
      <Navbar />
      <main className="flex-1">{children}</main>
      <Footer />
      <ScrollTop />
    </div>
  );
}

export default memo(Layout);

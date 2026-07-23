import { memo } from "react";
import Container from "./Container";

function Section({ children, id, className = "", containerClass = "" }) {
  return (
    <section id={id} className={`py-20 md:py-28 ${className}`}>
      <Container className={containerClass}>{children}</Container>
    </section>
  );
}

export default memo(Section);

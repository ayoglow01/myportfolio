import { useState, useCallback, memo } from "react";
import Button from "./Button";
import CVPasswordModal from "./CVPasswordModal";

/**
 * Drop-in replacement for the old public "Download CV" anchor.
 * Renders a button (or a plain styled element when `plain` is set) that
 * opens the password modal; the CV is only fetched after the server has
 * validated the password.
 *
 * Used by: Navbar (desktop + mobile), HeroButtons, About section.
 */
function CVDownloadButton({
  children = "Download CV",
  variant = "primary",
  size = "md",
  icon,
  className = "",
  plain = false,
  onOpen,
  ...props
}) {
  const [open, setOpen] = useState(false);

  const openModal = useCallback(() => {
    onOpen?.();
    setOpen(true);
  }, [onOpen]);

  const closeModal = useCallback(() => setOpen(false), []);

  return (
    <>
      {plain ? (
        <button
          type="button"
          onClick={openModal}
          className={className}
          aria-haspopup="dialog"
          {...props}
        >
          {icon}
          {children}
        </button>
      ) : (
        <Button
          variant={variant}
          size={size}
          icon={icon}
          className={className}
          onClick={openModal}
          ariaLabel={typeof children === "string" ? children : "Download CV"}
        >
          {children}
        </Button>
      )}
      <CVPasswordModal open={open} onClose={closeModal} />
    </>
  );
}

export default memo(CVDownloadButton);

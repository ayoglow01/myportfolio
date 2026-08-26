import {
  useState,
  useEffect,
  useCallback,
  useRef,
  memo,
} from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FiFileText,
  FiX,
  FiEye,
  FiEyeOff,
  FiLock,
  FiAlertCircle,
  FiCheck,
} from "react-icons/fi";
import { unlockCV, downloadCV } from "../../services/cv";

const ERROR_MESSAGES = {
  incorrect: "Incorrect password. Please try again.",
  "rate-limited": "Too many attempts. Please try again later.",
  unconfigured:
    "CV_PASSWORD is not configured in your .env file or server environment.",
  unavailable: "Unable to access the CV right now. Please try again later.",
  download: "Unable to download the CV. Please try again.",
};

function CVPasswordModal({ open, onClose }) {
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [status, setStatus] = useState("idle"); // idle | verifying | success | error
  const [errorMessage, setErrorMessage] = useState("");

  const inputRef = useRef(null);
  const dialogRef = useRef(null);
  const triggerRef = useRef(null);

  // Reset state + manage focus whenever the modal opens/closes
  useEffect(() => {
    if (open) {
      triggerRef.current = document.activeElement;
      setPassword("");
      setShowPassword(false);
      setStatus("idle");
      setErrorMessage("");
      document.body.style.overflow = "hidden";
      // Defer focus until after the entrance animation starts
      const id = window.setTimeout(() => inputRef.current?.focus(), 80);
      return () => {
        window.clearTimeout(id);
        document.body.style.overflow = "";
      };
    }
    // Restore focus to the element that opened the modal
    if (triggerRef.current && typeof triggerRef.current.focus === "function") {
      triggerRef.current.focus();
    }
  }, [open]);

  // Keyboard handling: Escape to close + focus trap (Tab cycling)
  useEffect(() => {
    if (!open) return undefined;

    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        if (status !== "verifying") {
          e.preventDefault();
          onClose();
        }
        return;
      }

      if (e.key === "Tab" && dialogRef.current) {
        const focusable = dialogRef.current.querySelectorAll(
          'button:not([disabled]), input:not([disabled]), [href], [tabindex]:not([tabindex="-1"])'
        );
        if (focusable.length === 0) return;
        const first = focusable[0];
        const last = focusable[focusable.length - 1];

        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [open, status, onClose]);

  const handleOverlayClick = useCallback(() => {
    if (status !== "verifying") onClose();
  }, [status, onClose]);

  const toggleShowPassword = useCallback(() => {
    setShowPassword((prev) => !prev);
  }, []);

  const handleSubmit = useCallback(
    async (e) => {
      e.preventDefault();
      if (status === "verifying" || !password.trim()) return;

      setStatus("verifying");
      setErrorMessage("");

      try {
        const result = await unlockCV(password);

        if (!result.ok) {
          setErrorMessage(
            ERROR_MESSAGES[result.reason] || ERROR_MESSAGES.unavailable
          );
          setStatus("error");
          // Return focus to the input so keyboard users can retry immediately
          inputRef.current?.focus();
          return;
        }

        setStatus("success");

        const downloadResult = await downloadCV(result.token);
        if (!downloadResult.ok) {
          setErrorMessage(
            downloadResult.error || ERROR_MESSAGES.download
          );
          setStatus("error");
          return;
        }

        // Brief success confirmation, then close and reset
        window.setTimeout(() => onClose(), 1400);
      } catch {
        setErrorMessage(ERROR_MESSAGES.unavailable);
        setStatus("error");
      } finally {
        // Never keep the password in state longer than necessary
        setPassword("");
      }
    },
    [password, status, onClose]
  );

  const isVerifying = status === "verifying";
  const isSuccess = status === "success";
  const canClose = !isVerifying;

  return (
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
          {/* Overlay */}
          <motion.div
            className="fixed inset-0 bg-black/60 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={handleOverlayClick}
            aria-hidden="true"
          />

          {/* Dialog */}
          <motion.div
            ref={dialogRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby="cv-modal-title"
            aria-describedby="cv-modal-description"
            className="relative w-full max-w-sm sm:max-w-md dark:bg-card bg-white border dark:border-border border-border-light rounded-2xl shadow-2xl dark:shadow-black/40 p-6 sm:p-8"
            initial={{ opacity: 0, scale: 0.95, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 16 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
          >
            {/* Close button */}
            <button
              type="button"
              onClick={onClose}
              disabled={!canClose}
              className="absolute top-4 right-4 w-9 h-9 rounded-xl dark:bg-surface bg-card-light border dark:border-border border-border-light flex items-center justify-center dark:text-muted text-muted-light hover:text-primary dark:hover:text-primary transition-all cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
              aria-label="Close dialog"
            >
              <FiX className="text-base" />
            </button>

            {/* Header */}
            <div className="flex flex-col items-center text-center mb-6">
              <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center text-primary mb-4">
                <FiFileText className="text-2xl" aria-hidden="true" />
              </div>
              <h2
                id="cv-modal-title"
                className="text-xl sm:text-2xl font-bold dark:text-text text-text-light"
              >
                Protected CV
              </h2>
              <p
                id="cv-modal-description"
                className="text-sm dark:text-muted text-muted-light mt-2 leading-relaxed"
              >
                Enter the password to access my CV.
              </p>
            </div>

            {/* Success state */}
            {isSuccess ? (
              <div
                className="flex flex-col items-center text-center gap-3 py-4"
                role="status"
                aria-live="polite"
              >
                <div className="w-12 h-12 rounded-full bg-success/10 flex items-center justify-center text-success">
                  <FiCheck className="text-xl" aria-hidden="true" />
                </div>
                <p className="text-sm font-medium text-success">
                  Access granted.
                  <br />
                  Downloading CV...
                </p>
              </div>
            ) : (
              /* Form state */
              <form onSubmit={handleSubmit} noValidate>
                <div className="mb-5">
                  <label
                    htmlFor="cv-password"
                    className="block text-sm font-medium dark:text-text text-text-light mb-1.5"
                  >
                    Password <span className="text-error">*</span>
                  </label>
                  <div className="relative">
                    <FiLock
                      className="absolute left-3.5 top-1/2 -translate-y-1/2 dark:text-muted text-muted-light text-sm pointer-events-none"
                      aria-hidden="true"
                    />
                    <input
                      ref={inputRef}
                      id="cv-password"
                      name="password"
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      disabled={isVerifying}
                      placeholder="Enter password"
                      autoComplete="current-password"
                      className={`w-full pl-10 pr-12 py-3 rounded-xl dark:bg-surface bg-card-light border ${
                        status === "error" && errorMessage
                          ? "border-error focus:border-error"
                          : "dark:border-border border-border-light focus:border-primary"
                      } dark:text-text text-text-light placeholder:dark:text-muted/50 placeholder:text-muted-light/50 outline-none transition-all text-sm disabled:opacity-60`}
                      aria-invalid={status === "error" && !!errorMessage}
                      aria-describedby={
                        status === "error" && errorMessage
                          ? "cv-password-error"
                          : undefined
                      }
                    />
                    <button
                      type="button"
                      onClick={toggleShowPassword}
                      disabled={isVerifying}
                      className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-lg flex items-center justify-center dark:text-muted text-muted-light hover:text-primary dark:hover:text-primary transition-all cursor-pointer disabled:opacity-40"
                      aria-label={
                        showPassword ? "Hide password" : "Show password"
                      }
                      aria-pressed={showPassword}
                    >
                      {showPassword ? (
                        <FiEyeOff className="text-base" />
                      ) : (
                        <FiEye className="text-base" />
                      )}
                    </button>
                  </div>

                  {/* Error message — text + icon, not color alone */}
                  {status === "error" && errorMessage && (
                    <motion.p
                      id="cv-password-error"
                      className="text-error text-xs mt-2 flex items-center gap-1.5"
                      role="alert"
                      initial={{ opacity: 0, y: -4 }}
                      animate={{ opacity: 1, y: 0 }}
                    >
                      <FiAlertCircle className="shrink-0" aria-hidden="true" />
                      {errorMessage}
                    </motion.p>
                  )}
                </div>

                <div className="flex flex-col xs:flex-row gap-3">
                  <button
                    type="button"
                    onClick={onClose}
                    disabled={isVerifying}
                    className="flex-1 inline-flex items-center justify-center px-4 py-2.5 sm:py-3 rounded-xl border-2 dark:border-border border-border-light dark:text-text text-text-light hover:border-primary hover:text-primary font-semibold text-sm transition-all cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isVerifying || !password.trim()}
                    className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 sm:py-3 rounded-xl bg-primary hover:bg-primary-hover text-white font-semibold text-sm shadow-lg shadow-primary/25 transition-all cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isVerifying ? (
                      <>
                        <span
                          className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"
                          aria-hidden="true"
                        />
                        Verifying...
                      </>
                    ) : (
                      <>
                        <FiLock className="text-sm" aria-hidden="true" />
                        Unlock CV
                      </>
                    )}
                  </button>
                </div>
              </form>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

export default memo(CVPasswordModal);

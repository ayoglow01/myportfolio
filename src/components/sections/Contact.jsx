import { useState, memo, useCallback } from "react";
import { motion } from "framer-motion";
import { FiMail, FiMapPin, FiSend, FiGithub, FiLinkedin } from "react-icons/fi";
import { FaWhatsapp } from "react-icons/fa";
import Section from "../common/Section";
import SectionTitle from "../common/SectionTitle";
import AnimatedSection from "../common/AnimatedSection";
import { personalInfo } from "../../data/portfolio";

const initialForm = { name: "", email: "", subject: "", message: "" };

function Contact() {
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState("idle");

  const validate = useCallback(() => {
    const errs = {};
    if (!form.name.trim()) errs.name = "Name is required";
    if (!form.email.trim()) {
      errs.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      errs.email = "Invalid email address";
    }
    if (!form.subject.trim()) errs.subject = "Subject is required";
    if (!form.message.trim()) {
      errs.message = "Message is required";
    } else if (form.message.trim().length < 10) {
      errs.message = "Message must be at least 10 characters";
    }
    return errs;
  }, [form]);

  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  }, []);

  const handleSubmit = useCallback(
    async (e) => {
      e.preventDefault();
      const errs = validate();
      if (Object.keys(errs).length > 0) {
        setErrors(errs);
        return;
      }

      setStatus("loading");

      // EmailJS integration — replace with your service, template, and public key
      try {
        // Dynamic import to avoid loading EmailJS unless needed
        const emailjs = await import("@emailjs/browser");
        await emailjs.send(
          "service_uezj9va",
          "template_f8woytf",
          {
            from_name: form.name,
            from_email: form.email,
            subject: form.subject,
            message: form.message,
          },
          "3Qu_MxuDDCFMLo9f6",
        );
        setStatus("success");
        setForm(initialForm);
        setTimeout(() => setStatus("idle"), 5000);
      } catch {
        setStatus("error");
        setTimeout(() => setStatus("idle"), 5000);
      }
    },
    [form, validate],
  );

  const contactInfo = [
    {
      icon: <FiMail />,
      label: "Email",
      value: personalInfo.email,
      href: `mailto:${personalInfo.email}`,
    },
    {
      icon: <FiMapPin />,
      label: "Location",
      value: personalInfo.location,
      href: null,
    },
  ];

  const socialLinks = [
    { icon: <FiGithub />, href: personalInfo.socials.github, label: "GitHub" },
    {
      icon: <FiLinkedin />,
      href: personalInfo.socials.linkedin,
      label: "LinkedIn",
    },
    {
      label: "WhatsApp",
      icon: <FaWhatsapp/>,
      href: personalInfo.socials.whatsapp,
    },
  ];

  return (
    <Section id="contact">
      <SectionTitle
        title="Get In Touch"
        subtitle="Have a project in mind or want to collaborate? Let's talk!"
      />

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 lg:gap-12 max-w-5xl mx-auto">
        {/* Contact Info */}
        <AnimatedSection direction="left" className="lg:col-span-2 space-y-6">
          <div>
            <h3 className="text-xl font-bold dark:text-text text-text-light mb-2">
              Let&apos;s work together
            </h3>
            <p className="dark:text-muted text-muted-light text-sm leading-relaxed">
              I&apos;m always interested in new opportunities and exciting
              projects. Feel free to reach out!
            </p>
          </div>

          <div className="space-y-4">
            {contactInfo.map((item) => (
              <div key={item.label} className="flex items-center gap-4">
                <div className="w-11 h-11 rounded-xl bg-primary/10 flex items-center justify-center text-primary shrink-0">
                  {item.icon}
                </div>
                <div>
                  <p className="text-xs dark:text-muted text-muted-light">
                    {item.label}
                  </p>
                  {item.href ? (
                    <a
                      href={item.href}
                      className="text-sm font-medium dark:text-text text-text-light hover:text-primary transition-colors"
                    >
                      {item.value}
                    </a>
                  ) : (
                    <p className="text-sm font-medium dark:text-text text-text-light">
                      {item.value}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>

          <div>
            <p className="text-sm dark:text-muted text-muted-light mb-3">
              Find me on
            </p>
            <div className="flex gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-xl dark:bg-card bg-card-light border dark:border-border border-border-light flex items-center justify-center dark:text-muted text-muted-light hover:text-primary hover:border-primary transition-all"
                  aria-label={social.label}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>
        </AnimatedSection>

        {/* Form */}
        <AnimatedSection direction="right" className="lg:col-span-3">
          <form
            onSubmit={handleSubmit}
            className="p-6 sm:p-8 rounded-2xl dark:bg-card bg-white border dark:border-border border-border-light"
            noValidate
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-5">
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium dark:text-text text-text-light mb-1.5"
                >
                  Name
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="Your name"
                  className={`w-full px-4 py-3 rounded-xl dark:bg-surface bg-card-light border ${
                    errors.name
                      ? "border-error"
                      : "dark:border-border border-border-light focus:border-primary"
                  } dark:text-text text-text-light placeholder:dark:text-muted/50 placeholder:text-muted-light/50 outline-none transition-all text-sm`}
                  aria-invalid={!!errors.name}
                  aria-describedby={errors.name ? "name-error" : undefined}
                />
                {errors.name && (
                  <p id="name-error" className="text-error text-xs mt-1">
                    {errors.name}
                  </p>
                )}
              </div>
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium dark:text-text text-text-light mb-1.5"
                >
                  Email
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="your@email.com"
                  className={`w-full px-4 py-3 rounded-xl dark:bg-surface bg-card-light border ${
                    errors.email
                      ? "border-error"
                      : "dark:border-border border-border-light focus:border-primary"
                  } dark:text-text text-text-light placeholder:dark:text-muted/50 placeholder:text-muted-light/50 outline-none transition-all text-sm`}
                  aria-invalid={!!errors.email}
                  aria-describedby={errors.email ? "email-error" : undefined}
                />
                {errors.email && (
                  <p id="email-error" className="text-error text-xs mt-1">
                    {errors.email}
                  </p>
                )}
              </div>
            </div>

            <div className="mb-5">
              <label
                htmlFor="subject"
                className="block text-sm font-medium dark:text-text text-text-light mb-1.5"
              >
                Subject
              </label>
              <input
                id="subject"
                name="subject"
                type="text"
                value={form.subject}
                onChange={handleChange}
                placeholder="What's this about?"
                className={`w-full px-4 py-3 rounded-xl dark:bg-surface bg-card-light border ${
                  errors.subject
                    ? "border-error"
                    : "dark:border-border border-border-light focus:border-primary"
                } dark:text-text text-text-light placeholder:dark:text-muted/50 placeholder:text-muted-light/50 outline-none transition-all text-sm`}
                aria-invalid={!!errors.subject}
                aria-describedby={errors.subject ? "subject-error" : undefined}
              />
              {errors.subject && (
                <p id="subject-error" className="text-error text-xs mt-1">
                  {errors.subject}
                </p>
              )}
            </div>

            <div className="mb-6">
              <label
                htmlFor="message"
                className="block text-sm font-medium dark:text-text text-text-light mb-1.5"
              >
                Message
              </label>
              <textarea
                id="message"
                name="message"
                rows="5"
                value={form.message}
                onChange={handleChange}
                placeholder="Tell me about your project..."
                className={`w-full px-4 py-3 rounded-xl dark:bg-surface bg-card-light border ${
                  errors.message
                    ? "border-error"
                    : "dark:border-border border-border-light focus:border-primary"
                } dark:text-text text-text-light placeholder:dark:text-muted/50 placeholder:text-muted-light/50 outline-none transition-all text-sm resize-none`}
                aria-invalid={!!errors.message}
                aria-describedby={errors.message ? "message-error" : undefined}
              />
              {errors.message && (
                <p id="message-error" className="text-error text-xs mt-1">
                  {errors.message}
                </p>
              )}
            </div>

            <motion.button
              type="submit"
              disabled={status === "loading"}
              className="w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-primary hover:bg-primary-hover text-white rounded-xl font-semibold transition-all disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
              whileHover={status !== "loading" ? { scale: 1.02 } : {}}
              whileTap={status !== "loading" ? { scale: 0.98 } : {}}
            >
              {status === "loading" ? (
                <>
                  <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Sending...
                </>
              ) : (
                <>
                  <FiSend />
                  Send Message
                </>
              )}
            </motion.button>

            {status === "success" && (
              <motion.p
                className="text-success text-sm text-center mt-4"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
              >
                Message sent successfully! I&apos;ll get back to you soon.
              </motion.p>
            )}

            {status === "error" && (
              <motion.p
                className="text-error text-sm text-center mt-4"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
              >
                Failed to send message. Please try again or email me directly.
              </motion.p>
            )}
          </form>
        </AnimatedSection>
      </div>
    </Section>
  );
}

export default memo(Contact);

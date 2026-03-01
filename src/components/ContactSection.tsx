import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Github, Linkedin, Mail } from "lucide-react";

const ContactSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-120px" });

  return (
    <section id="contact" className="scroll-mt-24 border-t border-border/40" aria-label="Contact">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 12 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="grid grid-cols-1 gap-8 lg:grid-cols-12"
        >
          <div className="lg:col-span-7">
            <p className="text-sm font-medium text-primary">Get in touch</p>
            <h2 className="mt-2 text-3xl font-semibold tracking-tight sm:text-4xl">Let’s build something useful.</h2>
            <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted-foreground">
              If you want to collaborate on a risk/finance tool, an automation workflow, or a clean UI for a complex idea,
              reach out.
            </p>
            <p className="mt-3 text-sm text-muted-foreground">
              (Note: this portfolio is for learning and showcasing work, not for selling SAP-related products.)
            </p>
          </div>

          <div className="lg:col-span-5">
            <div className="grid grid-cols-1 gap-3">
              <a
                className="flex items-center justify-between rounded-2xl border border-border/60 bg-background/50 p-5 shadow-sm transition hover:bg-accent"
                href="https://github.com/marcioherlein"
                target="_blank"
                rel="noreferrer"
              >
                <div className="flex items-center gap-3">
                  <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-background">
                    <Github className="h-5 w-5" />
                  </span>
                  <div>
                    <p className="font-medium">GitHub</p>
                    <p className="text-sm text-muted-foreground">Code, experiments, and projects</p>
                  </div>
                </div>
              </a>

              <a
                className="flex items-center justify-between rounded-2xl border border-border/60 bg-background/50 p-5 shadow-sm transition hover:bg-accent"
                href="https://www.linkedin.com"
                target="_blank"
                rel="noreferrer"
              >
                <div className="flex items-center gap-3">
                  <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-background">
                    <Linkedin className="h-5 w-5" />
                  </span>
                  <div>
                    <p className="font-medium">LinkedIn</p>
                    <p className="text-sm text-muted-foreground">Posts and longer write-ups</p>
                  </div>
                </div>
              </a>

              <a
                className="flex items-center justify-between rounded-2xl border border-border/60 bg-background/50 p-5 shadow-sm transition hover:bg-accent"
                href="mailto:YOUR_EMAIL_HERE"
              >
                <div className="flex items-center gap-3">
                  <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-background">
                    <Mail className="h-5 w-5" />
                  </span>
                  <div>
                    <p className="font-medium">Email</p>
                    <p className="text-sm text-muted-foreground">Update mailto in code</p>
                  </div>
                </div>
              </a>
            </div>
          </div>
        </motion.div>

        <div className="mt-12 border-t border-border/40 pt-6 text-sm text-muted-foreground">
          © {new Date().getFullYear()} Marcio Herlein.
        </div>
      </div>
    </section>
  );
};

export default ContactSection;

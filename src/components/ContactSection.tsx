import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Github, Linkedin, Mail } from "lucide-react";
import ScrollBackdrop from "./ScrollBackdrop";

const ContactSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-120px" });

  return (
    <section id="contact" className="relative scroll-mt-24 border-t border-border/40" aria-label="Contact">
      <ScrollBackdrop />

      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 12 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="max-w-3xl"
        >
          <p className="text-sm font-medium text-primary">Contact</p>
          <h2 className="mt-3 text-4xl font-semibold tracking-tight sm:text-5xl">
            Let’s keep it{" "}
            <span className="bg-gradient-to-r from-violet-600 via-indigo-600 to-emerald-600 bg-clip-text text-transparent">
              simple.
            </span>
          </h2>
          <p className="mt-5 text-base leading-relaxed text-foreground/75">
            If you want to discuss risk frameworks, valuation modeling, or small internal tools/automation ideas, I’m happy to chat.
          </p>

          <div className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-3">
            <a
              href="mailto:YOUR_EMAIL_HERE"
              className="inline-flex items-center justify-center gap-2 rounded-2xl border border-foreground/10 bg-background/70 px-5 py-4 text-sm font-medium text-foreground/80 shadow-sm backdrop-blur transition hover:bg-accent"
            >
              <Mail className="h-4 w-4" />
              Email
            </a>

            <a
              href="https://github.com/marcioherlein"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-2xl border border-foreground/10 bg-background/70 px-5 py-4 text-sm font-medium text-foreground/80 shadow-sm backdrop-blur transition hover:bg-accent"
            >
              <Github className="h-4 w-4" />
              GitHub
            </a>

            <a
              href="https://www.linkedin.com/"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-2xl border border-foreground/10 bg-background/70 px-5 py-4 text-sm font-medium text-foreground/80 shadow-sm backdrop-blur transition hover:bg-accent"
            >
              <Linkedin className="h-4 w-4" />
              LinkedIn
            </a>
          </div>

          <p className="mt-6 text-xs text-foreground/60">
            Educational portfolio only — no commercial offering, no data scraping, no customer work.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default ContactSection;

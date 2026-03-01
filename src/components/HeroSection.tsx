import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import marcioPhoto from "@/assets/marcio.png";

const HeroSection = () => {
  return (
    <section className="relative overflow-hidden pt-24" aria-label="Hero">
      {/* Background */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -top-40 left-1/2 h-[520px] w-[520px] -translate-x-1/2 rounded-full bg-gradient-to-br from-primary/25 via-primary/10 to-transparent blur-3xl" />
        <div className="absolute -bottom-40 left-1/3 h-[420px] w-[420px] -translate-x-1/2 rounded-full bg-gradient-to-br from-muted/40 via-muted/10 to-transparent blur-3xl" />
      </div>

      <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-10 px-4 pb-16 pt-10 sm:px-6 lg:grid-cols-12 lg:px-8 lg:pb-20">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="lg:col-span-7"
        >
          <div className="inline-flex items-center gap-2 rounded-full border border-border/60 bg-background/70 px-4 py-2 text-xs text-muted-foreground">
            <span className="h-1.5 w-1.5 rounded-full bg-primary" />
            Finance × Technology
          </div>

          <h1 className="mt-6 text-4xl font-semibold tracking-tight sm:text-5xl">
            Marcio
            <span className="block text-primary">Herlein</span>
          </h1>

          <p className="mt-4 max-w-2xl text-base text-muted-foreground sm:text-lg">
            Enterprise Risk Manager focused on turning ambiguity into structure — from board-ready risk narratives to
            valuation engines and small automation projects.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <a
              href="#projects"
              className="rounded-lg bg-foreground px-5 py-3 text-sm font-medium text-background transition hover:opacity-90"
            >
              View projects
            </a>
            <a
              href="#contact"
              className="rounded-lg border border-border px-5 py-3 text-sm font-medium transition hover:bg-accent"
            >
              Get in touch
            </a>
          </div>

          <p className="mt-6 text-xs text-muted-foreground">
            I’m not a “full-stack guru.” I build to learn — especially around AI, automation, and financial models.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="lg:col-span-5"
        >
          <div className="relative mx-auto w-full max-w-sm">
            <div className="absolute -inset-3 -z-10 rounded-3xl bg-gradient-to-br from-primary/35 via-primary/10 to-transparent blur-xl" />
            <div className="overflow-hidden rounded-3xl border border-border/60 bg-background/50 shadow-sm">
              <img
                src={marcioPhoto}
                alt="Marcio Herlein"
                className="h-[420px] w-full object-cover"
                loading="eager"
              />
            </div>
          </div>
        </motion.div>
      </div>

      <div className="mx-auto flex max-w-7xl justify-center px-4 pb-10 sm:px-6 lg:px-8">
        <a
          href="#about"
          className="inline-flex items-center gap-2 rounded-full border border-border/60 bg-background/70 px-4 py-2 text-xs text-muted-foreground transition hover:bg-accent"
        >
          <ChevronDown className="h-4 w-4" />
          Scroll
        </a>
      </div>
    </section>
  );
};

export default HeroSection;

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { ChevronDown, ArrowRight } from "lucide-react";
import marcioPhoto from "@/assets/marcio.png";
import ScrollBackdrop from "./ScrollBackdrop";

const HeroSection = () => {
  const ref = useRef<HTMLElement | null>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });

  const portraitY = useTransform(scrollYProgress, [0, 1], [0, 60]);
  const portraitScale = useTransform(scrollYProgress, [0, 1], [1.02, 1.14]);

  return (
    <section ref={ref as any} className="relative overflow-hidden pt-24" aria-label="Hero">
      <ScrollBackdrop />

      <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-12 px-4 pb-16 pt-10 sm:px-6 lg:grid-cols-12 lg:px-8 lg:pb-20">
        {/* Copy */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="lg:col-span-7"
        >
          <div className="inline-flex items-center gap-2 rounded-full border border-foreground/10 bg-background/70 px-4 py-2 text-xs text-foreground/70 shadow-sm backdrop-blur">
            <span className="h-1.5 w-1.5 rounded-full bg-primary" />
            Finance × Risk × Product thinking
          </div>

          <h1 className="mt-6 text-5xl font-semibold tracking-tight sm:text-6xl">
            Marcio{" "}
            <span className="bg-gradient-to-r from-violet-600 via-indigo-600 to-emerald-600 bg-clip-text text-transparent">
              Herlein
            </span>
          </h1>

          <p className="mt-5 max-w-2xl text-base leading-relaxed text-foreground/75 sm:text-lg">
            I work in Enterprise Risk Management (ERM). Outside work, I build educational tools that turn messy reality
            into simple models: risk narratives, valuation frameworks, and lightweight automations.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <a
              href="#projects"
              className="group relative inline-flex items-center gap-2 overflow-hidden rounded-full bg-gradient-to-r from-violet-600 via-indigo-600 to-emerald-600 px-7 py-3 text-sm font-medium text-white shadow-lg shadow-indigo-500/25 transition-all duration-300 hover:shadow-xl hover:shadow-indigo-500/40 hover:brightness-110"
            >
              <span className="relative z-10">View projects</span>
              <ArrowRight className="relative z-10 h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" />
            </a>
            <a
              href="#experience"
              className="group relative inline-flex items-center gap-2 overflow-hidden rounded-full border border-foreground/10 bg-background/60 px-7 py-3 text-sm font-medium text-foreground/80 shadow-sm backdrop-blur transition-all duration-300 hover:border-indigo-400/30 hover:shadow-lg hover:shadow-indigo-500/10"
            >
              <span className="relative z-10 bg-gradient-to-r from-violet-600 via-indigo-600 to-emerald-600 bg-clip-text text-transparent">
                ERM work
              </span>
              <ArrowRight className="relative z-10 h-4 w-4 text-indigo-500 transition-transform duration-300 group-hover:translate-x-0.5" />
            </a>
          </div>

          <p className="mt-6 text-xs leading-relaxed text-foreground/60">
            This site is a learning portfolio. It's designed to show how I think (structure, stress tests, clarity) — not
            to sell services or compete with anyone.
          </p>
        </motion.div>

        {/* Portrait — bleed into background */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="lg:col-span-5 lg:flex lg:justify-center"
        >
          <div className="relative mx-auto w-full max-w-md">
            {/* Soft glow behind portrait */}
            <div className="absolute -inset-6 -z-10 rounded-full bg-gradient-to-br from-indigo-500/20 via-emerald-500/10 to-violet-500/15 blur-3xl" />

            <motion.div
              style={{ y: portraitY, scale: portraitScale }}
              className="relative overflow-hidden rounded-[36px]"
            >
              <img
                src={marcioPhoto}
                alt="Marcio Herlein"
                className="h-[480px] w-full object-cover object-center"
                loading="eager"
              />

              {/* Gradient mask — photo fades into page */}
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-background via-background/0 to-background/10" />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-l from-background/30 via-transparent to-background/30" />

              {/* Hover gloss */}
              <div className="pointer-events-none absolute inset-0 opacity-0 transition duration-700 group-hover:opacity-100">
                <div className="absolute -left-24 -top-24 h-72 w-72 rounded-full bg-white/15 blur-2xl" />
              </div>
            </motion.div>

            <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 rounded-full border border-foreground/10 bg-background/80 px-4 py-2 text-xs text-foreground/70 shadow-sm backdrop-blur">
              Risk → Model → Decision
            </div>
          </div>
        </motion.div>
      </div>

      <div className="mx-auto flex max-w-7xl justify-center px-4 pb-10 sm:px-6 lg:px-8">
        <a
          href="#about"
          className="inline-flex items-center gap-2 rounded-full border border-foreground/10 bg-background/70 px-4 py-2 text-xs text-foreground/70 shadow-sm backdrop-blur transition hover:bg-accent"
        >
          <ChevronDown className="h-4 w-4" />
          Scroll
        </a>
      </div>
    </section>
  );
};

export default HeroSection;

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Dumbbell, LineChart, Sparkles, Trophy } from "lucide-react";
import tennis1 from "@/assets/tennis-1.jpeg";
import tennis2 from "@/assets/tennis-2.jpeg";
import ScrollBackdrop from "./ScrollBackdrop";

const cards = [
  {
    icon: LineChart,
    title: "How I think",
    body: "First principles, receipts on every number, and a bias for simple models that survive stress tests.",
  },
  {
    icon: Sparkles,
    title: "What I’m learning",
    body: "AI workflows, lightweight agents, and product-like interfaces for complex financial/risk concepts.",
  },
  {
    icon: Trophy,
    title: "Sport",
    body: "Tennis + padel, plus CrossFit-style training. I like measurable progress and hard feedback loops.",
  },
  {
    icon: Dumbbell,
    title: "Outside work",
    body: "Building small tools and dashboards (valuation, risk, automation) — mostly to learn and share.",
  },
];

const AboutSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-120px" });

  return (
    <section id="about" className="relative scroll-mt-24 border-t border-border/40" aria-label="About">
      <ScrollBackdrop
        vignette="soft"
        layers={[
          {
            src: tennis1,
            className: "absolute -left-32 top-28 h-[320px] w-[320px] rounded-[44px] object-cover mix-blend-multiply",
            opacity: 0.20,
            blur: 1,
            rotate: "-10deg",
            speed: 55,
          },
          {
            src: tennis2,
            className: "absolute -right-28 bottom-20 h-[340px] w-[340px] rounded-[48px] object-cover mix-blend-multiply",
            opacity: 0.18,
            blur: 1,
            rotate: "10deg",
            speed: 70,
          },
        ]}
      />

      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 12 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="grid grid-cols-1 gap-12 lg:grid-cols-12"
        >
          <div className="lg:col-span-12">
            <p className="text-sm font-medium text-primary">About</p>
            <h2 className="mt-3 text-4xl font-semibold tracking-tight sm:text-5xl">
              Finance-minded.{" "}
              <span className="bg-gradient-to-r from-violet-600 via-indigo-600 to-emerald-600 bg-clip-text text-transparent">
                Product-curious.
              </span>
            </h2>

            <p className="mt-5 max-w-3xl text-base leading-relaxed text-foreground/75">
              I work in Enterprise Risk Management (ERM) and spend a lot of my free time building. The common thread:
              taking complex systems (risk, accounting, valuation, regulation) and turning them into clear narratives,
              decision-ready frameworks, and simple tools people can actually use.
            </p>

            <div className="mt-9 grid grid-cols-1 gap-4 sm:grid-cols-2">
              {cards.map((c, i) => {
                const Icon = c.icon;
                return (
                  <motion.div
                    key={c.title}
                    initial={{ opacity: 0, y: 10 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.5, delay: 0.08 + i * 0.05 }}
                    className="group relative overflow-hidden rounded-2xl border border-foreground/10 bg-background/65 p-5 shadow-sm backdrop-blur"
                  >
                    <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-gradient-to-br from-indigo-500/20 to-transparent blur-2xl opacity-0 transition duration-700 group-hover:opacity-100" />
                    <div className="flex items-start gap-3">
                      <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-foreground/5 text-foreground">
                        <Icon className="h-5 w-5" />
                      </span>
                      <div>
                        <p className="text-sm font-semibold tracking-tight">{c.title}</p>
                        <p className="mt-1 text-sm leading-relaxed text-foreground/70">{c.body}</p>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>

            <div className="mt-8 rounded-2xl border border-foreground/10 bg-background/65 p-5 text-sm text-foreground/70 shadow-sm backdrop-blur">
              <span className="font-medium text-foreground">What this is:</span> a clean, educational portfolio of how I
              reason and build. <span className="font-medium text-foreground">What this is not:</span> a job-hunt site or
              a commercial product.
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default AboutSection;

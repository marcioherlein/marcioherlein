import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Dumbbell, LineChart, Sparkles, Trophy } from "lucide-react";
import marcioPhoto from "@/assets/marcio.png";
import tennis1 from "@/assets/tennis-1.jpeg";
import tennis2 from "@/assets/tennis-2.jpeg";

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
    <section id="about" className="scroll-mt-24 border-t border-border/40">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 12 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="grid grid-cols-1 gap-10 lg:grid-cols-12"
        >
          <div className="lg:col-span-5">
            <div className="relative">
              <div className="overflow-hidden rounded-3xl border border-border/70 bg-background/60 shadow-sm backdrop-blur">
                <img src={marcioPhoto} alt="Marcio Herlein" className="h-[420px] w-full object-cover" loading="lazy" />
              </div>

              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="absolute -left-6 -top-6 hidden w-44 overflow-hidden rounded-2xl border border-border/70 bg-background/60 shadow-sm backdrop-blur md:block"
              >
                <motion.img
                  src={tennis1}
                  alt="Tennis photo"
                  className="h-44 w-full object-cover"
                  animate={{ y: [0, -6, 0] }}
                  transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                  loading="lazy"
                />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="absolute -bottom-6 -right-6 hidden w-48 overflow-hidden rounded-2xl border border-border/70 bg-background/60 shadow-sm backdrop-blur md:block"
              >
                <motion.img
                  src={tennis2}
                  alt="Tennis serve"
                  className="h-48 w-full object-cover"
                  animate={{ y: [0, 7, 0] }}
                  transition={{ duration: 6.5, repeat: Infinity, ease: "easeInOut" }}
                  loading="lazy"
                />
              </motion.div>
            </div>
          </div>

          <div className="lg:col-span-7">
            <p className="text-sm font-medium text-primary">About</p>
            <h2 className="mt-2 text-3xl font-semibold tracking-tight sm:text-4xl">
              Finance-minded, product-curious.
            </h2>
            <p className="mt-4 max-w-3xl text-base leading-relaxed text-foreground/80">
              I work in Enterprise Risk Management (ERM) and spend a lot of my free time building.
              The common thread: taking complex systems (risk, accounting, valuation, regulation) and turning them into
              clear narratives, decision-ready frameworks, and simple tools people can actually use.
            </p>

            <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
              {cards.map((c, i) => {
                const Icon = c.icon;
                return (
                  <motion.div
                    key={c.title}
                    initial={{ opacity: 0, y: 10 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.5, delay: 0.05 + i * 0.05 }}
                    className="rounded-2xl border border-border/60 bg-background/50 p-5 shadow-sm"
                  >
                    <div className="flex items-start gap-3">
                      <span className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-accent">
                        <Icon className="h-5 w-5" />
                      </span>
                      <div>
                        <p className="font-medium">{c.title}</p>
                        <p className="mt-1 text-sm text-foreground/80">{c.body}</p>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default AboutSection;

import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import {
  ShieldCheck,
  FileBarChart,
  Scale,
  Target,
  TrendingUp,
  AlertTriangle,
  BookOpen,
  Building2,
} from "lucide-react";

const workActivities = [
  {
    icon: ShieldCheck,
    title: "Regulatory Analysis",
    description:
      "Deep-diving into Basel III/IV, IFRS 9, and local regulatory frameworks to ensure enterprise-wide compliance and capital adequacy.",
    regulations: ["Basel III/IV", "IFRS 9", "BCBS 239", "SOX"],
  },
  {
    icon: FileBarChart,
    title: "Board Risk Reporting",
    description:
      "Crafting executive-level risk reports and dashboards that translate complex exposures into actionable insights for C-suite and board committees.",
    regulations: ["KRI Dashboards", "Heat Maps", "Trend Analysis", "Executive Summaries"],
  },
  {
    icon: Target,
    title: "Strategic Risk Assessment",
    description:
      "Evaluating corporate strategy through a risk lens — stress testing business plans, M&A scenarios, and market entry decisions against risk appetite.",
    regulations: ["Scenario Analysis", "Stress Testing", "Risk Appetite", "Strategic Alignment"],
  },
  {
    icon: Scale,
    title: "Risk Framework Design",
    description:
      "Architecting enterprise risk management frameworks — from governance structures to risk taxonomies and three lines of defense models.",
    regulations: ["COSO ERM", "ISO 31000", "Three Lines", "Risk Taxonomy"],
  },
  {
    icon: TrendingUp,
    title: "Quantitative Modeling",
    description:
      "Building VaR models, credit risk scorecards, and operational risk quantification to provide data-driven risk measurements.",
    regulations: ["VaR Models", "Monte Carlo", "Credit Scoring", "Loss Distribution"],
  },
  {
    icon: AlertTriangle,
    title: "Incident & Issue Management",
    description:
      "Leading root cause analysis on risk events, managing remediation plans, and ensuring lessons learned feed back into the control environment.",
    regulations: ["RCA", "Remediation", "Control Testing", "Audit Findings"],
  },
];

const regulatoryFrameworks = [
  { name: "Basel III/IV", category: "Capital" },
  { name: "IFRS 9", category: "Accounting" },
  { name: "BCBS 239", category: "Data" },
  { name: "SOX", category: "Controls" },
  { name: "COSO ERM", category: "Framework" },
  { name: "ISO 31000", category: "Standard" },
  { name: "MiFID II", category: "Markets" },
  { name: "DORA", category: "Resilience" },
];

const ExperienceSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const regulatoryRef = useRef<HTMLDivElement>(null);
  const isHeaderInView = useInView(headerRef, { once: true, margin: "-100px" });
  const isGridInView = useInView(gridRef, { once: true, margin: "-50px" });
  const isRegInView = useInView(regulatoryRef, { once: true, margin: "-50px" });

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const bgY = useTransform(scrollYProgress, [0, 1], [0, -60]);

  return (
    <section id="experience" ref={sectionRef} className="relative py-32 md:py-48 overflow-hidden">
      {/* Animated background elements */}
      <motion.div style={{ y: bgY }} className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 right-10 w-72 h-72 rounded-full bg-accent/[0.04] blur-3xl" />
        <div className="absolute bottom-40 left-10 w-96 h-96 rounded-full bg-accent/[0.03] blur-3xl" />
      </motion.div>

      <div className="relative z-10 px-6">
        {/* Header */}
        <div ref={headerRef} className="max-w-4xl mx-auto mb-24">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isHeaderInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-sm tracking-[0.3em] uppercase text-accent mb-8"
          >
            What I Do
          </motion.p>

          <motion.h2
            initial={{ opacity: 0, y: 40 }}
            animate={isHeaderInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-3xl md:text-5xl lg:text-6xl font-semibold tracking-tight text-foreground leading-tight mb-8"
          >
            Managing risk at the{" "}
            <span className="text-accent">enterprise level</span>.
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={isHeaderInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-lg md:text-xl text-muted-foreground font-light leading-relaxed max-w-3xl"
          >
            As an Enterprise Risk Manager, I navigate the complex landscape of financial regulations, 
            strategic risk, and data-driven reporting — turning uncertainty into structured, 
            board-ready insights that drive better decision-making.
          </motion.p>
        </div>

        {/* Activity Grid */}
        <div ref={gridRef} className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-32">
          {workActivities.map((activity, i) => {
            const Icon = activity.icon;
            return (
              <motion.div
                key={activity.title}
                initial={{ opacity: 0, y: 50 }}
                animate={isGridInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                className="group relative p-8 rounded-2xl bg-card border border-border/50 hover:border-accent/30 transition-all duration-500 hover:shadow-lg hover:shadow-accent/5"
              >
                {/* Hover gradient */}
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-accent/[0.03] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                <div className="relative z-10">
                  <motion.div
                    whileHover={{ rotate: -5, scale: 1.1 }}
                    transition={{ type: "spring", stiffness: 300 }}
                    className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center mb-6"
                  >
                    <Icon className="w-6 h-6 text-accent" />
                  </motion.div>

                  <h3 className="text-lg font-semibold text-foreground mb-3 tracking-tight">
                    {activity.title}
                  </h3>

                  <p className="text-sm text-muted-foreground leading-relaxed mb-5">
                    {activity.description}
                  </p>

                  <div className="flex flex-wrap gap-1.5">
                    {activity.regulations.map((reg) => (
                      <span
                        key={reg}
                        className="px-2 py-0.5 text-[10px] tracking-wider uppercase rounded-full bg-secondary text-muted-foreground border border-border/50 font-medium"
                      >
                        {reg}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Regulatory Frameworks Ticker */}
        <div ref={regulatoryRef} className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isRegInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <p className="text-sm tracking-[0.3em] uppercase text-muted-foreground mb-4">
              Regulatory Expertise
            </p>
            <p className="text-base text-muted-foreground font-light">
              Deep knowledge across key financial regulatory frameworks
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={isRegInView ? { opacity: 1 } : {}}
            transition={{ duration: 1, delay: 0.2 }}
            className="flex flex-wrap justify-center gap-3"
          >
            {regulatoryFrameworks.map((fw, i) => (
              <motion.div
                key={fw.name}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={isRegInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.4, delay: 0.3 + i * 0.08 }}
                whileHover={{ scale: 1.05, y: -2 }}
                className="group relative px-5 py-3 rounded-xl bg-card border border-border/50 hover:border-accent/40 transition-all duration-300 cursor-default"
              >
                <span className="text-sm font-medium text-foreground">{fw.name}</span>
                <span className="block text-[10px] uppercase tracking-widest text-muted-foreground mt-0.5">
                  {fw.category}
                </span>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Visual Timeline Accent */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isRegInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="max-w-4xl mx-auto mt-32"
        >
          <div className="relative p-10 rounded-2xl bg-gradient-to-br from-foreground to-foreground/90 text-background overflow-hidden">
            {/* Decorative elements */}
            <div className="absolute top-0 right-0 w-40 h-40 rounded-full bg-accent/20 blur-3xl" />
            <div className="absolute bottom-0 left-0 w-32 h-32 rounded-full bg-accent/10 blur-2xl" />

            <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center gap-8">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-4">
                  <Building2 className="w-5 h-5 text-accent" />
                  <span className="text-sm tracking-widest uppercase text-background/60">
                    Day to Day
                  </span>
                </div>
                <h3 className="text-2xl md:text-3xl font-semibold tracking-tight mb-3">
                  From regulation to boardroom.
                </h3>
                <p className="text-background/70 font-light leading-relaxed">
                  Every day I translate dense regulatory requirements into strategic risk insights — 
                  connecting compliance obligations with business objectives to help leadership 
                  make informed decisions under uncertainty.
                </p>
              </div>

              <div className="flex flex-col gap-3 min-w-[180px]">
                {[
                  { icon: BookOpen, label: "Analyze regulations" },
                  { icon: Target, label: "Assess strategy" },
                  { icon: FileBarChart, label: "Report to board" },
                ].map((step, i) => (
                  <motion.div
                    key={step.label}
                    initial={{ opacity: 0, x: 20 }}
                    animate={isRegInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.5, delay: 0.8 + i * 0.15 }}
                    className="flex items-center gap-3"
                  >
                    <div className="w-8 h-8 rounded-lg bg-accent/20 flex items-center justify-center shrink-0">
                      <step.icon className="w-4 h-4 text-accent" />
                    </div>
                    <span className="text-sm text-background/80">{step.label}</span>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ExperienceSection;

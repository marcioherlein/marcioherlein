import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { ShieldCheck, FileBarChart, Scale, Target, AlertTriangle, Cloud } from "lucide-react";
import ScrollBackdrop from "./ScrollBackdrop";

const workBoxes = [
  {
    icon: Scale,
    title: "Revenue accounting risk (IFRS 15)",
    description:
      "Structuring and quantifying risks tied to contract data quality, fulfillment timing, and tool/process gaps — so finance teams can act before a quarter closes.",
    tags: ["IFRS 15", "Contract data", "RAR", "Fulfillment"],
  },
  {
    icon: ShieldCheck,
    title: "Privacy & compliance enablement",
    description:
      "Driving clarity on what must be true for compliance processes to work at scale (GDPR, data protection operations, audit readiness).",
    tags: ["GDPR", "Controls", "Audit", "Data protection"],
  },
  {
    icon: Cloud,
    title: "Sovereign cloud & data sovereignty",
    description:
      "Mapping sovereignty expectations to real mitigations (encryption, key management, operational ownership) and tracking gaps as enterprise risks.",
    tags: ["Sovereign cloud", "Encryption", "Key mgmt", "Resilience"],
  },
  {
    icon: Target,
    title: "Regulatory change as a risk pipeline",
    description:
      "Turning fast-moving regulations and executive orders into structured obligations, impacted products, and mitigation workstreams.",
    tags: ["EU regulation", "Executive orders", "Obligations", "Impact analysis"],
  },
  {
    icon: FileBarChart,
    title: "Board-ready risk reporting",
    description:
      "Condensing messy reality into clear narratives, KRIs, trends, and quantified loss scenarios that leadership can actually decide on.",
    tags: ["KRIs", "Trend", "Scenario", "Expected loss"],
  },
  {
    icon: AlertTriangle,
    title: "Issues, remediation, and control maturity",
    description:
      "Root-cause mindset: track issues to closure, validate mitigations, and prevent repeat incidents by strengthening the control environment.",
    tags: ["RCA", "Remediation", "Control design", "Assurance"],
  },
];

const frameworks = [
  "IFRS 15",
  "GDPR",
  "EU AI Act",
  "EU Data Act",
  "DORA",
  "Cyber Resilience Act",
  "Executive Order 14117",
  "ISO 31000",
];

const ExperienceSection = () => {
  const sectionRef = useRef(null);
  const headerRef = useRef(null);
  const gridRef = useRef(null);

  const isHeaderInView = useInView(headerRef, { once: true, margin: "-120px" });
  const isGridInView = useInView(gridRef, { once: true, margin: "-80px" });

  return (
    <section id="experience" ref={sectionRef} className="relative scroll-mt-24 border-t border-border/40" aria-label="Experience">
      <ScrollBackdrop />

      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <motion.div
          ref={headerRef}
          initial={{ opacity: 0, y: 12 }}
          animate={isHeaderInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="max-w-3xl"
        >
          <p className="text-sm font-medium text-primary">ERM</p>
          <h2 className="mt-3 text-4xl font-semibold tracking-tight sm:text-5xl">
            Enterprise Risk Management{" "}
            <span className="bg-gradient-to-r from-violet-600 via-indigo-600 to-emerald-600 bg-clip-text text-transparent">
              — in real life.
            </span>
          </h2>
          <p className="mt-5 text-base leading-relaxed text-foreground/75">
            My job is to translate ambiguity into action: risk statements, KRIs, mitigations, ownership, and loss scenarios.
            This section is intentionally non-sensitive — it describes the type of work, not internal details.
          </p>

          <div className="mt-7 rounded-2xl border border-foreground/10 bg-background/65 p-5 shadow-sm backdrop-blur">
            <p className="text-sm font-semibold tracking-tight text-foreground">Regulatory context</p>
            <p className="mt-1 text-sm text-foreground/70">
              Frameworks I frequently reference when translating requirements into risk statements and mitigations.
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              {frameworks.map((f) => (
                <span
                  key={f}
                  className="rounded-full border border-foreground/10 bg-foreground/5 px-3 py-1 text-xs font-medium text-foreground/80"
                >
                  {f}
                </span>
              ))}
            </div>
          </div>
        </motion.div>

        <motion.div
          ref={gridRef}
          initial={{ opacity: 0, y: 12 }}
          animate={isGridInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.05 }}
          className="mt-10 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3"
        >
          {workBoxes.map((b, idx) => {
            const Icon = b.icon;
            return (
              <motion.div
                key={b.title}
                initial={{ opacity: 0, y: 10 }}
                animate={isGridInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.06 + idx * 0.03 }}
                className="group relative overflow-hidden rounded-2xl border border-foreground/10 bg-background/65 p-5 shadow-sm backdrop-blur"
              >
                <div className="absolute -right-14 -top-14 h-40 w-40 rounded-full bg-gradient-to-br from-indigo-500/14 to-transparent blur-2xl opacity-0 transition duration-700 group-hover:opacity-100" />
                <div className="flex items-start gap-3">
                  <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-foreground/5 text-foreground">
                    <Icon className="h-5 w-5" />
                  </span>
                  <div>
                    <p className="text-sm font-semibold tracking-tight">{b.title}</p>
                    <p className="mt-2 text-sm leading-relaxed text-foreground/70">{b.description}</p>
                  </div>
                </div>

                <div className="mt-4 flex flex-wrap gap-2">
                  {b.tags.map((t) => (
                    <span
                      key={t}
                      className="rounded-full border border-foreground/10 bg-background/60 px-3 py-1 text-xs text-foreground/70"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};

export default ExperienceSection;

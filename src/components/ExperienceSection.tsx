import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import {
  ShieldCheck,
  FileBarChart,
  Scale,
  Target,
  AlertTriangle,
  Cloud,
} from "lucide-react";

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
    <section
      id="experience"
      ref={sectionRef}
      className="scroll-mt-24 border-t border-border/40"
      aria-label="Experience"
    >
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <motion.div
          ref={headerRef}
          initial={{ opacity: 0, y: 12 }}
          animate={isHeaderInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="max-w-3xl"
        >
          <p className="text-sm font-medium text-primary">ERM</p>
          <h2 className="mt-2 text-3xl font-semibold tracking-tight sm:text-4xl">
            Enterprise Risk Management — in real life.
          </h2>
          <p className="mt-4 text-base leading-relaxed text-muted-foreground">
            I work at the intersection of finance, compliance, and operations. The job is less about buzzwords and more
            about making risks legible: what’s happening, why it matters, what it could cost, and what people need to do
            next.
          </p>
        </motion.div>

        <motion.div
          ref={gridRef}
          initial={{ opacity: 0, y: 12 }}
          animate={isGridInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.05 }}
          className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3"
        >
          {workBoxes.map((b) => {
            const Icon = b.icon;
            return (
              <div
                key={b.title}
                className="group rounded-2xl border border-border/60 bg-background/50 p-5 shadow-sm transition hover:bg-accent"
              >
                <div className="flex items-start gap-3">
                  <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-background">
                    <Icon className="h-5 w-5" />
                  </span>
                  <div>
                    <p className="font-medium">{b.title}</p>
                    <p className="mt-1 text-sm text-muted-foreground">{b.description}</p>
                  </div>
                </div>

                <div className="mt-4 flex flex-wrap gap-2">
                  {b.tags.map((t) => (
                    <span
                      key={t}
                      className="rounded-full border border-border/60 bg-background/60 px-3 py-1 text-xs text-muted-foreground"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            );
          })}
        </motion.div>

        <div className="mt-10 rounded-2xl border border-border/60 bg-background/50 p-5 shadow-sm">
          <p className="text-sm font-medium">Regulatory context</p>
          <p className="mt-1 text-sm text-muted-foreground">
            Frameworks I frequently reference when translating requirements into risk statements and mitigations.
          </p>
          <div className="mt-4 flex flex-wrap gap-2">
            {frameworks.map((f) => (
              <span
                key={f}
                className="rounded-full bg-accent px-3 py-1 text-xs text-muted-foreground"
              >
                {f}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ExperienceSection;

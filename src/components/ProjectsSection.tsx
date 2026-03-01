import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { ExternalLink } from "lucide-react";
import ProjectCaseStudy from "./ProjectCaseStudy";

import valxScreenshot from "@/assets/valx-screenshot.png";
import cdpScreenshot from "@/assets/cdp-screenshot.png";

const caseStudies = [
  {
    title: "VAL-X",
    subtitle: "Case Study 01",
    description:
      "A valuation dashboard that aggregates market data and supports deterministic DCF workflows. Built for analysts who want fast context and consistent inputs.",
    features: [
      "Live market data and quick comparables context",
      "DCF-focused workflow (assumption discipline + scenarios)",
      "Global tickers / sector context for fast triangulation",
      "Designed for readability and speed",
    ],
    techStack: ["React", "TypeScript", "Tailwind", "Vercel"],
    liveUrl: "https://valuation-dashboard-orcin.vercel.app",
    screenshotUrl: valxScreenshot,
  },
  {
    title: "CDP",
    subtitle: "Case Study 02",
    description:
      "A creative portfolio concept with scroll-driven motion and editorial layout — built as a design + interaction study.",
    features: [
      "Scroll-triggered parallax",
      "Responsive layout",
      "Motion-driven storytelling",
      "High contrast, clean typography",
    ],
    techStack: ["React", "TypeScript", "Framer Motion", "Tailwind", "Vercel"],
    liveUrl: "https://cdp-three.vercel.app",
    screenshotUrl: cdpScreenshot,
  },
];

const valuationWriteups = [
  {
    title: "Valuation write-up #1",
    description:
      "A structured valuation note focused on deterministic modeling, scenario thinking, and explicitly stating what must be true.",
    highlights: [
      "DCF + sensitivity grid",
      "Reverse-DCF reality check",
      "Clear risk list (drivers → failure modes)",
    ],
    url: "https://www.linkedin.com/posts/activity-7388576566148157440-hVJC",
  },
  {
    title: "Valuation write-up #2",
    description:
      "A follow-up analysis emphasizing input traceability and model discipline (no hand-wavy numbers).",
    highlights: [
      "Receipts on key inputs",
      "Consistency checks (growth, margin, reinvestment)",
      "Base/Bull/Bear scenario framing",
    ],
    url: "https://www.linkedin.com/posts/activity-7381333710815657986-gRjX",
  },
  {
    title: "Valuation write-up #3",
    description:
      "A deeper dive into valuation mechanics and how narrative ties back to cash flows (and not the other way around).",
    highlights: [
      "Driver-based narrative",
      "Risk-to-cash-flow mapping",
      "Outputs formatted for sharing",
    ],
    url: "https://www.linkedin.com/posts/activity-7351724788022751235-xoJP",
  },
];

const explorations = [
  {
    title: "Morning brief automation",
    body: "A daily HTML briefing that consolidates tasks, markets, and work context into one readable page.",
  },
  {
    title: "ERM workflow prompts",
    body: "Prompt systems to standardize risk intake, quantification (Expected Loss), and board-ready writeups.",
  },
  {
    title: "AI agent experiments",
    body: "Small agents that summarize meetings, extract action items, and generate structured memos.",
  },
  {
    title: "Branding / local discovery audits",
    body: "A repeatable audit template for local businesses (Google Maps + social presence) to improve conversion.",
  },
];

const ProjectsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-120px" });

  return (
    <section id="projects" className="scroll-mt-24 border-t border-border/40" aria-label="Projects">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 12 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="max-w-3xl"
        >
          <p className="text-sm font-medium text-primary">Selected work</p>
          <h2 className="mt-2 text-3xl font-semibold tracking-tight sm:text-4xl">Projects</h2>
          <p className="mt-4 text-base leading-relaxed text-muted-foreground">
            I build projects to learn. I’m not a backend/frontend specialist — I’m a finance + risk person who enjoys
            product thinking, clean UI, and tools that make decisions easier.
          </p>
        </motion.div>

        <div className="mt-10 space-y-10">
          {caseStudies.map((p, i) => (
            <ProjectCaseStudy key={p.title} {...p} index={i} />
          ))}
        </div>

        {/* Valuation writeups */}
        <div className="mt-14">
          <div className="max-w-3xl">
            <p className="text-sm font-medium text-primary">Valuation</p>
            <h3 className="mt-2 text-2xl font-semibold tracking-tight">Valuation projects & write-ups</h3>
            <p className="mt-3 text-sm text-muted-foreground">
              Detailed notes and model write-ups. Links point to LinkedIn posts.
            </p>
          </div>

          <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-3">
            {valuationWriteups.map((v) => (
              <div
                key={v.title}
                className="rounded-2xl border border-border/60 bg-background/50 p-5 shadow-sm"
              >
                <div className="flex items-start justify-between gap-4">
                  <p className="font-medium">{v.title}</p>
                  <a
                    href={v.url}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1 rounded-md px-2 py-1 text-xs text-muted-foreground transition hover:bg-accent hover:text-foreground"
                  >
                    Open <ExternalLink className="h-3.5 w-3.5" />
                  </a>
                </div>

                <p className="mt-2 text-sm text-muted-foreground">{v.description}</p>

                <ul className="mt-4 space-y-2 text-sm">
                  {v.highlights.map((h) => (
                    <li key={h} className="flex items-start gap-2 text-muted-foreground">
                      <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                      <span>{h}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Explorations */}
        <div className="mt-14">
          <div className="max-w-3xl">
            <p className="text-sm font-medium text-primary">Exploration</p>
            <h3 className="mt-2 text-2xl font-semibold tracking-tight">What I’m exploring</h3>
            <p className="mt-3 text-sm text-muted-foreground">
              These are not polished products — they’re experiments that help me learn faster.
            </p>
          </div>

          <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
            {explorations.map((e) => (
              <div
                key={e.title}
                className="rounded-2xl border border-border/60 bg-background/50 p-5 shadow-sm"
              >
                <p className="font-medium">{e.title}</p>
                <p className="mt-2 text-sm text-muted-foreground">{e.body}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;

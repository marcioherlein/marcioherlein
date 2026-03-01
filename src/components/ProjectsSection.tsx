import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { ExternalLink } from "lucide-react";
import ProjectCaseStudy from "./ProjectCaseStudy";
import ValuationChart from "./ValuationChart";

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

type KV = { k: string; v: string };

type DcfRow = {
  scenario: string;
  growth: string;
  wacc: string;
  g: string;
  price: string;
};

type ValuationReport = {
  id: string;
  title: string;
  ticker: string;
  subtitle: string;
  oneLiner: string;
  highlights: string[];
  keyFinancials: KV[];
  dcf: {
    assumptions: string;
    rows: DcfRow[];
    market: string;
  };
  notes?: string[];
  risks?: string[];
  links: {
    pdf: string;
    linkedin: string;
  };
};

const valuationReports: ValuationReport[] = [
  {
    id: "tgs",
    title: "Transportadora de Gas del Sur",
    ticker: "TGS",
    subtitle: "Trailing 12-month analysis — Oct 2025",
    oneLiner:
      "Argentina’s largest natural-gas pipeline operator with a blended regulated pipeline + USD-linked liquids export profile.",
    highlights: [
      "TTM (Sep-2025): Revenue ~$931M, Net Income ~$245M, FCF ~$207M (~22% margin)",
      "DCF base-case: $27.9/ADR vs market ~$20.3 (Oct-25) → ~+35% upside",
      "Update: ADR later traded around ~$32.4 (post update), surpassing the base target",
    ],
    keyFinancials: [
      { k: "Revenue (TTM)", v: "~USD 931M" },
      { k: "Net income (TTM)", v: "~USD 245M" },
      { k: "Free cash flow (TTM)", v: "~USD 207M (~22% margin)" },
      { k: "Net cash", v: "~USD 250M" },
      { k: "Shares / ADRs", v: "~150.5M" },
      { k: "Mix", v: "Regulated ARS-indexed pipeline + USD-linked liquids exports" },
    ],
    dcf: {
      assumptions: "Base FCF USD 207M, 5-year projection, WACC 9.5%, terminal growth 2%.",
      rows: [
        { scenario: "Bull", growth: "+12%", wacc: "8.5%", g: "3%", price: "$44.8" },
        { scenario: "Base", growth: "+7%", wacc: "9.5%", g: "2%", price: "$27.9" },
        { scenario: "Bear", growth: "+2%", wacc: "11%", g: "1%", price: "$15.9" },
      ],
      market: "Market price (Oct-25): ~$20.3/ADR",
    },
    risks: [
      "Regulatory risk (tariff lags, intervention)",
      "FX / inflation (peso devaluation impacts USD value)",
      "Commodity exposure (LPG/NGL export volatility)",
      "Execution risk (midstream project delays)",
      "Country risk premium keeps WACC elevated",
    ],
    links: {
      pdf: "/valuations/TGS_Equity_Valuation_Oct_2025.pdf",
      linkedin: "https://www.linkedin.com/posts/activity-7388576566148157440-hVJC",
    },
  },
  {
    id: "pags",
    title: "PagSeguro Digital (PagBank)",
    ticker: "PAGS",
    subtitle: "Equity valuation report — Oct 2025",
    oneLiner:
      "A diversified Brazilian fintech bridging payment acquiring, digital banking, and credit — trading at a discount vs peers despite improving fundamentals.",
    highlights: [
      "Stock ~7× earnings; peers trade materially higher",
      "DCF base-case: $13.6/ADR vs ~$9.2 current → ~+48% upside",
      "Cross-check: peer-median multiples imply ~$13.8–$14.4/ADR",
    ],
    keyFinancials: [
      { k: "FY2024 revenue", v: "R$ 18.3B (USD ~3.45B), +17%" },
      { k: "FY2024 net income", v: "R$ 2.12B (USD ~399M), +28%" },
      { k: "Gross margin", v: "~49%" },
      { k: "Net margin", v: "~11–12%" },
      { k: "ROE", v: "~15%" },
      { k: "Operating cash flow", v: "Positive (R$ 3.45B in Q2 2025)" },
    ],
    dcf: {
      assumptions: "Scenario DCF (growth/WACC/terminal g) + sensitivity cross-check.",
      rows: [
        { scenario: "Bull", growth: "12%", wacc: "9%", g: "3%", price: "$24.5" },
        { scenario: "Base", growth: "7%", wacc: "10%", g: "2%", price: "$13.6" },
        { scenario: "Bear", growth: "2%", wacc: "12%", g: "1%", price: "$8.5" },
      ],
      market: "Current price referenced: ~$9.2/ADR",
    },
    notes: [
      "Comparable set includes STNE / NU / Cielo / MELI; peer-median P/E ~12.7× and EV/EBITDA ~11.2×.",
      "Implied value using multiples: P/E ≈ $14.4 and EV/EBITDA ≈ $13.8.",
      "Narrative driver: if Brazil rates ease into 2026, cost of capital drops and margins can expand.",
    ],
    links: {
      pdf: "/valuations/PAGS_Equity_Valuation_Oct_2025.pdf",
      linkedin: "https://www.linkedin.com/posts/activity-7351724788022751235-xoJP",
    },
  },
  {
    id: "nu",
    title: "Nubank",
    ticker: "NU",
    subtitle: "Equity valuation report — July 2025",
    oneLiner:
      "LatAm digital banking leader valued with a driver-based DCF (customers × ARPAC → revenue → margins) and scenario ranges tied to Brazil macro.",
    highlights: [
      "Share price (Jul-2025): $14; base-case DCF fair value: $17.13 → >22% upside",
      "Scenario range: ~$9.1 (worst) to ~$25.6 (bull)",
      "Key debate: premium multiple (33× P/E) vs industry average (21×)",
    ],
    keyFinancials: [
      { k: "Market cap", v: "$67.8B" },
      { k: "2024 revenue", v: "$11.5B" },
      { k: "2024 net income", v: "$2.0B" },
      { k: "2024 net margin", v: "17%" },
      { k: "P/E", v: "33× (industry avg ~21×)" },
      { k: "DCF fair value (base)", v: "$17.13" },
    ],
    dcf: {
      assumptions:
        "Bottom-up DCF: forecast customers × ARPAC, apply margin; discount at scenario-specific cost of equity; terminal growth varies by scenario.",
      rows: [
        { scenario: "Worst", growth: "Cust 12% / ARPAC 5%", wacc: "15%", g: "2%", price: "$9.1" },
        { scenario: "Base", growth: "Cust 17% / ARPAC 9%", wacc: "12%", g: "4%", price: "$17.13" },
        { scenario: "Bull", growth: "Cust 21% / ARPAC 13%", wacc: "11%", g: "5%", price: "$25.6" },
      ],
      market: "Share price referenced: $14 (Jul-2025)",
    },
    notes: [
      "Multiple cross-check: implied 2025 price @ 33× P/E ≈ $19.7; @ 21× ≈ $12.5.",
      "Macro framing: Selic ~15% and inflation ~5% (as of Jul-2025) meaningfully affects discount rates and credit growth assumptions.",
    ],
    links: {
      pdf: "/valuations/NU_Equity_Valuation_Report_July_2025.pdf",
      linkedin: "https://www.linkedin.com/posts/activity-7381333710815657986-gRjX",
    },
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

        {/* Valuation */}
        <div className="mt-14">
          <div className="max-w-3xl">
            <p className="text-sm font-medium text-primary">Valuation</p>
            <h3 className="mt-2 text-2xl font-semibold tracking-tight">Valuation projects & write-ups</h3>
            <p className="mt-3 text-sm text-muted-foreground">
              Short, educational write-ups where I turn a messy narrative into a simple model, stress-test the assumptions, and show ranges (bull/base/bear).
              This is a learning portfolio (not investment advice) — built to demonstrate how I think.
            </p>
          </div>

          <div className="mt-6 grid grid-cols-1 gap-4">
            {valuationReports.map((r) => (
              <div key={r.id} className="rounded-2xl border border-border/60 bg-background/50 p-5 shadow-sm">
                <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                  <div>
                    <p className="text-sm font-medium text-primary">{r.ticker}</p>
                    <p className="mt-1 text-xl font-semibold tracking-tight">{r.title}</p>
                    <p className="mt-1 text-sm text-muted-foreground">{r.subtitle}</p>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    <a
                      href={r.links.pdf}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1 rounded-lg border border-border/60 bg-background px-3 py-2 text-xs font-medium text-muted-foreground transition hover:bg-accent hover:text-foreground"
                    >
                      Download PDF <ExternalLink className="h-3.5 w-3.5" />
                    </a>
                    <a
                      href={r.links.linkedin}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1 rounded-lg border border-border/60 bg-background px-3 py-2 text-xs font-medium text-muted-foreground transition hover:bg-accent hover:text-foreground"
                    >
                      LinkedIn <ExternalLink className="h-3.5 w-3.5" />
                    </a>
                  </div>
                </div>

                <p className="mt-3 text-sm text-muted-foreground">{r.oneLiner}</p>

                <ul className="mt-4 space-y-2 text-sm">
                  {r.highlights.map((h) => (
                    <li key={h} className="flex items-start gap-2 text-muted-foreground">
                      <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                      <span>{h}</span>
                    </li>
                  ))}
                </ul>

                <div className="mt-5">
                  <ValuationChart
                    title={`${r.ticker} — price history (interactive)`}
                    csvDefaultPath={`/valuations/data/${r.ticker}.csv`}
                    educationalNote="The chart is interactive on purpose: it helps explain drawdowns, volatility, and why a valuation range matters. Replace the default CSV with your own export if you want real prices."
                  />
                </div>

                <details className="mt-5 rounded-xl border border-border/60 bg-background/40 p-4">
                  <summary className="cursor-pointer select-none text-sm font-medium">
                    Open details (key financials, DCF scenarios, risks)
                  </summary>

                  <div className="mt-4 grid grid-cols-1 gap-4 lg:grid-cols-2">
                    <div className="rounded-xl border border-border/60 bg-background/50 p-4">
                      <p className="text-sm font-medium">Key financials</p>
                      <div className="mt-3 space-y-2 text-sm">
                        {r.keyFinancials.map((it) => (
                          <div key={it.k} className="flex items-start justify-between gap-4">
                            <span className="text-muted-foreground">{it.k}</span>
                            <span className="font-medium">{it.v}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="rounded-xl border border-border/60 bg-background/50 p-4">
                      <p className="text-sm font-medium">DCF scenarios</p>
                      <p className="mt-2 text-xs text-muted-foreground">{r.dcf.assumptions}</p>
                      <div className="mt-3 overflow-x-auto">
                        <table className="w-full min-w-[520px] text-left text-sm">
                          <thead>
                            <tr className="border-b border-border/60 text-xs text-muted-foreground">
                              <th className="py-2 pr-3 font-medium">Scenario</th>
                              <th className="py-2 pr-3 font-medium">Growth</th>
                              <th className="py-2 pr-3 font-medium">WACC / Disc.</th>
                              <th className="py-2 pr-3 font-medium">Terminal g</th>
                              <th className="py-2 font-medium">Value / ADR</th>
                            </tr>
                          </thead>
                          <tbody>
                            {r.dcf.rows.map((row) => (
                              <tr key={row.scenario} className="border-b border-border/40">
                                <td className="py-2 pr-3 font-medium">{row.scenario}</td>
                                <td className="py-2 pr-3 text-muted-foreground">{row.growth}</td>
                                <td className="py-2 pr-3 text-muted-foreground">{row.wacc}</td>
                                <td className="py-2 pr-3 text-muted-foreground">{row.g}</td>
                                <td className="py-2 font-medium">{row.price}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                      <p className="mt-3 text-xs text-muted-foreground">{r.dcf.market}</p>
                    </div>
                  </div>

                  {r.notes?.length ? (
                    <div className="mt-4 rounded-xl border border-border/60 bg-background/50 p-4">
                      <p className="text-sm font-medium">Notes / cross-checks</p>
                      <ul className="mt-3 space-y-2 text-sm">
                        {r.notes.map((n) => (
                          <li key={n} className="flex items-start gap-2 text-muted-foreground">
                            <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                            <span>{n}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ) : null}

                  {r.risks?.length ? (
                    <div className="mt-4 rounded-xl border border-border/60 bg-background/50 p-4">
                      <p className="text-sm font-medium">Risks</p>
                      <ul className="mt-3 space-y-2 text-sm">
                        {r.risks.map((risk) => (
                          <li key={risk} className="flex items-start gap-2 text-muted-foreground">
                            <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                            <span>{risk}</span>
                          </li>
                        ))}
                      </ul>
                      <p className="mt-3 text-xs text-muted-foreground">
                        Disclaimer: these notes are for informational purposes only and are not investment advice.
                      </p>
                    </div>
                  ) : null}
                </details>
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
              <div key={e.title} className="rounded-2xl border border-border/60 bg-background/50 p-5 shadow-sm">
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

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { ExternalLink, ArrowUpRight, TrendingDown, TrendingUp, AlertTriangle, Flame } from "lucide-react";
import ProjectCaseStudy from "./ProjectCaseStudy";
import ValuationChart from "./ValuationChart";
import ScrollBackdrop from "./ScrollBackdrop";

import valxScreenshot from "@/assets/valx-screenshot.png";
import cdpScreenshot from "@/assets/cdp-screenshot.png";

/* ─── Morning Brief live data (extracted from latest briefing) ─── */
const briefData = {
  date: "Monday, March 2, 2026",
  headline: "US Strikes Iran — Khamenei Killed, Hormuz Closed",
  sentiment: "Full Risk-Off",
  sentimentColor: "text-red-500",
  tickers: [
    { symbol: "Brent", value: "~$79", change: "+9%", up: true },
    { symbol: "Gold", value: "~$5,350", change: "+2%", up: true },
    { symbol: "S&P Fut.", value: "−1.5%", change: "−1.5%", up: false },
    { symbol: "VIX", value: ">25", change: "Spiking", up: false },
  ],
  keyActions: [
    "S16M6 Letes mature Mar 16 — convert to USD MEP or roll?",
    "VIST / YPFD / PBR — oil spike beneficiaries, consider adding",
    "SPY/QQQ/NVDA — hedge or trim US tech cluster (~30%)",
    "Germany NIS2 BSI registration — 5 weeks to deadline",
  ],
};

const caseStudies = [
  {
    title: "VAL-X",
    subtitle: "Case Study 01",
    description:
      "A valuation dashboard that aggregates market context and supports deterministic DCF workflows. Built as an educational interface for fast triangulation.",
    features: [
      "Market context + quick comparables",
      "DCF workflow (assumption discipline + scenarios)",
      "Global tickers / sector context",
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
      "A creative portfolio concept with motion + editorial layout — built as a design and interaction study.",
    features: ["Scroll-triggered parallax", "Responsive layout", "Motion-driven storytelling", "High-contrast typography"],
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

type Targets = {
  bull?: number;
  base?: number;
  bear?: number;
  current?: number;
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
  targets: Targets;
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
    subtitle: "DCF (per ADR) — Oct 2025",
    oneLiner:
      "Argentina’s largest natural-gas pipeline operator with a blended regulated pipeline + USD-linked liquids export profile.",
    highlights: [
      "TTM (Sep-2025): Revenue ~$931M, Net Income ~$245M, FCF ~$207M (~22% margin)",
      "DCF base-case: $27.9/ADR vs market ~$20.3 (Oct-25) → ~+35% upside",
      "Post update: ADR traded around ~$32.4, surpassing the base target",
    ],
    targets: { bull: 44.8, base: 27.9, bear: 15.9, current: 32.4 },
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
      market: "Market price referenced (Oct-25): ~$20.3/ADR",
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
    subtitle: "DCF (per ADR) — Oct 2025",
    oneLiner:
      "A diversified Brazilian fintech bridging payment acquiring, digital banking, and credit — trading at a discount vs peers despite improving fundamentals.",
    highlights: [
      "Stock referenced at ~7× earnings (peer discount)",
      "DCF base-case: $13.6/ADR vs ~$9.2 current → ~+48% upside",
      "If Brazil rates ease, cost of capital can drop and margins can expand",
    ],
    targets: { bull: 24.5, base: 13.6, bear: 8.5, current: 9.2 },
    keyFinancials: [
      { k: "FY2024 revenue", v: "R$ 18.3B (USD ~3.45B), +17%" },
      { k: "FY2024 net income", v: "R$ 2.12B (USD ~399M), +28%" },
      { k: "Gross margin", v: "~49%" },
      { k: "Net margin", v: "~11–12%" },
      { k: "ROE", v: "~15%" },
      { k: "Operating cash flow", v: "Positive (example: R$ 3.45B in Q2 2025)" },
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
      "Narrative driver: rates easing into 2026 can compress discount rates and lift valuation.",
      "This is an educational write-up: the goal is to show the reasoning chain, not to recommend a trade.",
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
    subtitle: "DCF (per share) — July 2025",
    oneLiner:
      "LatAm digital banking leader valued with a driver-based DCF (customers × ARPAC → revenue → margins) and scenario ranges tied to Brazil macro.",
    highlights: [
      "Share price referenced (Jul-2025): ~$14; base-case DCF fair value: $17.13 → >22% upside",
      "Scenario range: ~$9.1 (worst) to ~$25.6 (bull)",
      "Key debate: premium multiple vs industry average",
    ],
    targets: { bull: 25.6, base: 17.13, bear: 9.1, current: 14.0 },
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
      market: "Share price referenced: ~$14 (Jul-2025)",
    },
    notes: [
      "Macro sensitivity is the point: small discount-rate changes can dominate valuation ranges.",
      "Educational framing only — not investment advice.",
    ],
    links: {
      pdf: "/valuations/NU_Equity_Valuation_Report_July_2025.pdf",
      linkedin: "https://www.linkedin.com/posts/activity-7381333710815657986-gRjX",
    },
  },
];

const ProjectsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-120px" });

  return (
    <section id="projects" className="relative scroll-mt-24 border-t border-border/40" aria-label="Projects">
      <ScrollBackdrop />

      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 12 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="max-w-3xl"
        >
          <p className="text-sm font-medium text-primary">Selected work</p>
          <h2 className="mt-3 text-4xl font-semibold tracking-tight sm:text-5xl">
            Projects{" "}
            <span className="bg-gradient-to-r from-violet-600 via-indigo-600 to-emerald-600 bg-clip-text text-transparent">
              — built to learn.
            </span>
          </h2>
          <p className="mt-5 text-base leading-relaxed text-foreground/75">
            I build projects to learn. I’m not a backend/frontend specialist — I’m a finance + risk person who enjoys
            product thinking, clean UI, and tools that make decisions easier.
          </p>
        </motion.div>

        <div className="mt-10 space-y-10">
          {caseStudies.map((p, i) => (
            <ProjectCaseStudy key={p.title} {...p} index={i} />
          ))}

          {/* Morning Brief — Live Preview Card */}
          <motion.article
            initial={{ opacity: 0, y: 12 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="group relative overflow-hidden rounded-[32px] border border-foreground/10 bg-background/65 p-6 shadow-sm backdrop-blur"
          >
            <div className="pointer-events-none absolute -right-20 -top-20 h-80 w-80 rounded-full bg-gradient-to-br from-red-500/12 via-amber-500/8 to-transparent blur-3xl" />

            <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:items-start">
              {/* Live data card */}
              <div className="lg:col-span-6 lg:order-2">
                <div className="overflow-hidden rounded-[28px] border border-foreground/10 bg-gradient-to-br from-foreground/[0.03] to-foreground/[0.08] p-5 shadow-sm">
                  {/* Header */}
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="text-xs font-medium text-foreground/50">Latest brief</p>
                      <p className="mt-1 text-sm font-semibold tracking-tight">{briefData.date}</p>
                    </div>
                    <span className="inline-flex items-center gap-1.5 rounded-full border border-red-200 bg-red-50 px-3 py-1 text-xs font-semibold text-red-600 dark:border-red-900 dark:bg-red-950 dark:text-red-400">
                      <Flame className="h-3 w-3" />
                      {briefData.sentiment}
                    </span>
                  </div>

                  <p className="mt-3 text-sm font-semibold text-foreground/90 leading-snug">
                    <AlertTriangle className="mr-1 inline h-3.5 w-3.5 text-amber-500" />
                    {briefData.headline}
                  </p>

                  {/* Ticker grid */}
                  <div className="mt-4 grid grid-cols-2 gap-2">
                    {briefData.tickers.map((t) => (
                      <div key={t.symbol} className="rounded-xl border border-foreground/10 bg-background/60 px-3 py-2.5">
                        <p className="text-[10px] font-semibold uppercase tracking-wider text-foreground/50">{t.symbol}</p>
                        <p className="mt-0.5 text-lg font-bold tracking-tight text-foreground">{t.value}</p>
                        <p className={`mt-0.5 flex items-center gap-1 text-xs font-medium ${t.up ? "text-emerald-600 dark:text-emerald-400" : "text-red-600 dark:text-red-400"}`}>
                          {t.up ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
                          {t.change}
                        </p>
                      </div>
                    ))}
                  </div>

                  {/* Key actions */}
                  <div className="mt-4">
                    <p className="text-[10px] font-semibold uppercase tracking-wider text-foreground/50">Key actions</p>
                    <ul className="mt-2 space-y-1.5">
                      {briefData.keyActions.map((a, i) => (
                        <li key={i} className="flex items-start gap-2 text-xs leading-relaxed text-foreground/70">
                          <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-foreground/40" />
                          {a}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              {/* Description */}
              <div className="lg:col-span-6 lg:order-1">
                <p className="text-xs font-medium text-foreground/60">UI study (daily dashboard)</p>
                <h3 className="mt-2 text-3xl font-semibold tracking-tight">Morning Brief</h3>
                <p className="mt-4 text-sm leading-relaxed text-foreground/70">
                  A daily HTML briefing that consolidates tasks, markets, geopolitics, and portfolio context into one readable page.
                  Built to practice information design (clarity &gt; complexity).
                </p>

                <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2">
                  {["Digestible sections + pill navigation", "Clear status tags (risk-on / risk-off)", "Readable typography and spacing", "Designed for daily use"].map((f) => (
                    <div key={f} className="rounded-2xl border border-foreground/10 bg-background/60 px-4 py-3 text-sm text-foreground/70 shadow-sm">
                      {f}
                    </div>
                  ))}
                </div>

                <div className="mt-5 flex flex-wrap gap-2">
                  {["React", "TypeScript", "Tailwind", "Framer Motion"].map((t) => (
                    <span key={t} className="rounded-full border border-foreground/10 bg-foreground/5 px-3 py-1 text-xs font-medium text-foreground/70">
                      {t}
                    </span>
                  ))}
                </div>

                <div className="mt-6 text-xs text-foreground/60">No public demo link — shared as an educational UI study.</div>
              </div>
            </div>
          </motion.article>
        </div>

        {/* Valuation */}
        <div className="mt-16">
          <div className="max-w-3xl">
            <p className="text-sm font-medium text-primary">Valuation</p>
            <h3 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
              Valuation projects{" "}
              <span className="bg-gradient-to-r from-violet-600 via-indigo-600 to-emerald-600 bg-clip-text text-transparent">
                & write-ups.
              </span>
            </h3>
            <p className="mt-4 text-sm leading-relaxed text-foreground/70">
              Educational write-ups where I turn a narrative into a simple model, stress-test assumptions, and show bull/base/bear ranges.
              This is a learning portfolio (not investment advice).
            </p>
          </div>

          <div className="mt-7 grid grid-cols-1 gap-6">
            {valuationReports.map((r) => (
              <div key={r.id} className="relative overflow-hidden rounded-[32px] border border-foreground/10 bg-background/65 p-6 shadow-sm backdrop-blur">
                <div className="pointer-events-none absolute -right-20 -top-20 h-80 w-80 rounded-full bg-gradient-to-br from-indigo-500/16 via-emerald-500/10 to-transparent blur-3xl" />

                <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                  <div className="flex items-start gap-3">
                    <img
                      src={`/valuations/logos/${r.ticker}.svg`}
                      alt={`${r.ticker} logo`}
                      className="h-11 w-11 rounded-2xl border border-foreground/10 bg-background p-2 shadow-sm"
                      loading="lazy"
                    />
                    <div>
                      <div className="flex items-center gap-2">
                        <p className="text-sm font-semibold text-foreground">{r.ticker}</p>
                        <span className="rounded-full border border-foreground/10 bg-foreground/5 px-2.5 py-1 text-xs font-medium text-foreground/70">
                          Targets: {r.targets.bear} / {r.targets.base} / {r.targets.bull}
                        </span>
                      </div>
                      <p className="mt-1 text-xl font-semibold tracking-tight">{r.title}</p>
                      <p className="mt-1 text-sm text-foreground/65">{r.subtitle}</p>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    <a
                      href={r.links.pdf}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1 rounded-full border border-foreground/10 bg-background/70 px-4 py-2 text-xs font-medium text-foreground/70 shadow-sm backdrop-blur transition hover:bg-accent hover:text-foreground"
                    >
                      PDF <ExternalLink className="h-3.5 w-3.5" />
                    </a>
                    <a
                      href={r.links.linkedin}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1 rounded-full border border-foreground/10 bg-background/70 px-4 py-2 text-xs font-medium text-foreground/70 shadow-sm backdrop-blur transition hover:bg-accent hover:text-foreground"
                    >
                      LinkedIn <ExternalLink className="h-3.5 w-3.5" />
                    </a>
                  </div>
                </div>

                <p className="mt-4 text-sm text-foreground/70">{r.oneLiner}</p>

                <ul className="mt-4 grid grid-cols-1 gap-2 text-sm sm:grid-cols-2">
                  {r.highlights.map((h) => (
                    <li key={h} className="flex items-start gap-2 text-foreground/70">
                      <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                      <span>{h}</span>
                    </li>
                  ))}
                </ul>

                <div className="mt-6">
                  <ValuationChart
                    title={`${r.ticker} — last 3 years`}
                    csvDefaultPath={`/valuations/data/${r.ticker}.csv`}
                    targets={r.targets}
                    educationalNote="Chart reads a local CSV kept in-repo (defaults to a sample 3-year dataset). Replace the CSV with your own export any time."
                  />
                </div>

                <details className="mt-6 rounded-2xl border border-foreground/10 bg-background/55 p-5">
                  <summary className="cursor-pointer select-none text-sm font-semibold text-foreground">
                    Open details (key financials, DCF scenarios, risks)
                  </summary>

                  <div className="mt-5 grid grid-cols-1 gap-4 lg:grid-cols-2">
                    <div className="rounded-2xl border border-foreground/10 bg-background/60 p-5">
                      <p className="text-sm font-semibold">Key financials</p>
                      <div className="mt-3 space-y-2 text-sm text-foreground/70">
                        {r.keyFinancials.map((kv) => (
                          <div key={kv.k} className="flex items-start justify-between gap-4">
                            <span className="text-foreground/60">{kv.k}</span>
                            <span className="text-right font-medium text-foreground">{kv.v}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="rounded-2xl border border-foreground/10 bg-background/60 p-5">
                      <p className="text-sm font-semibold">DCF scenarios</p>
                      <p className="mt-2 text-sm text-foreground/70">{r.dcf.assumptions}</p>
                      <div className="mt-4 overflow-hidden rounded-xl border border-foreground/10">
                        <table className="w-full text-left text-sm">
                          <thead className="bg-foreground/5">
                            <tr>
                              <th className="px-3 py-2 font-semibold">Scenario</th>
                              <th className="px-3 py-2 font-semibold">Growth</th>
                              <th className="px-3 py-2 font-semibold">WACC</th>
                              <th className="px-3 py-2 font-semibold">g</th>
                              <th className="px-3 py-2 font-semibold">Value</th>
                            </tr>
                          </thead>
                          <tbody>
                            {r.dcf.rows.map((row) => (
                              <tr key={row.scenario} className="border-t border-foreground/10">
                                <td className="px-3 py-2 font-medium">{row.scenario}</td>
                                <td className="px-3 py-2 text-foreground/70">{row.growth}</td>
                                <td className="px-3 py-2 text-foreground/70">{row.wacc}</td>
                                <td className="px-3 py-2 text-foreground/70">{row.g}</td>
                                <td className="px-3 py-2 font-medium">{row.price}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                      <p className="mt-3 text-xs text-foreground/60">{r.dcf.market}</p>
                    </div>
                  </div>

                  {r.risks?.length ? (
                    <div className="mt-4 rounded-2xl border border-foreground/10 bg-background/60 p-5">
                      <p className="text-sm font-semibold">Risks & sensitivities</p>
                      <ul className="mt-3 grid grid-cols-1 gap-2 text-sm text-foreground/70 sm:grid-cols-2">
                        {r.risks.map((risk) => (
                          <li key={risk} className="flex items-start gap-2">
                            <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                            <span>{risk}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ) : null}

                  {r.notes?.length ? (
                    <div className="mt-4 rounded-2xl border border-foreground/10 bg-background/60 p-5">
                      <p className="text-sm font-semibold">Notes</p>
                      <ul className="mt-3 space-y-2 text-sm text-foreground/70">
                        {r.notes.map((n) => (
                          <li key={n} className="flex items-start gap-2">
                            <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                            <span>{n}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ) : null}
                </details>

                <p className="mt-4 text-[11px] leading-relaxed text-foreground/60">
                  Educational note: these write-ups are about the modeling process (assumptions → ranges → risks). They are not investment advice.
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;

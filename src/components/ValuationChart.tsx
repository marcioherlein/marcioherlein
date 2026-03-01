import { useEffect, useMemo, useState } from "react";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  ReferenceLine,
  Legend,
} from "recharts";
import { Upload } from "lucide-react";

type Point = { date: string; value: number };

type Targets = {
  bull?: number;
  base?: number;
  bear?: number;
  current?: number;
};

function normalizeTo100(points: Point[]): Point[] {
  if (!points.length) return points;
  const first = points[0].value || 1;
  return points.map((p) => ({ ...p, value: Math.round((p.value / first) * 10000) / 100 }));
}

function parseCsv(text: string): Point[] {
  // Expected headers: Date, Close (or date/close). This is intentionally forgiving.
  const lines = text.split(/\r?\n/).filter(Boolean);
  if (lines.length < 2) return [];
  const headers = lines[0].split(",").map((h) => h.trim().toLowerCase());
  const dateIdx = headers.findIndex((h) => h === "date" || h === "time");
  const closeIdx = headers.findIndex((h) => h === "close" || h === "adj close" || h === "adj_close");
  if (dateIdx === -1 || closeIdx === -1) return [];

  const out: Point[] = [];
  for (let i = 1; i < lines.length; i++) {
    const cols = lines[i].split(",").map((c) => c.trim());
    const d = cols[dateIdx];
    const v = Number(cols[closeIdx]);
    if (!d || !Number.isFinite(v)) continue;
    out.push({ date: d, value: v });
  }

  // Sort by date ascending (best effort)
  out.sort((a, b) => {
    const da = new Date(a.date).getTime();
    const db = new Date(b.date).getTime();
    if (!Number.isFinite(da) || !Number.isFinite(db)) return 0;
    return da - db;
  });

  return out;
}

function lastThreeYears(points: Point[]): Point[] {
  // If the CSV is monthly (36 rows), keep as-is.
  // If it is daily, keep last ~780 trading days (~3 years) to stay responsive.
  if (points.length <= 40) return points;
  return points.slice(-780);
}

const fmt = new Intl.NumberFormat(undefined, { maximumFractionDigits: 2 });

const ValuationChart = ({
  title,
  csvDefaultPath,
  educationalNote,
  targets,
}: {
  title: string;
  csvDefaultPath: string;
  educationalNote: string;
  targets?: Targets;
}) => {
  const [mode, setMode] = useState<"normalized" | "price">("price");
  const [showTargets, setShowTargets] = useState(true);
  const [custom, setCustom] = useState<Point[] | null>(null);
  const [defaultData, setDefaultData] = useState<Point[] | null>(null);

  useEffect(() => {
    let isMounted = true;
    fetch(csvDefaultPath)
      .then((r) => r.text())
      .then((t) => {
        if (!isMounted) return;
        const parsed = lastThreeYears(parseCsv(t));
        setDefaultData(parsed);
      })
      .catch(() => setDefaultData([]));
    return () => {
      isMounted = false;
    };
  }, [csvDefaultPath]);

  const raw = useMemo(() => {
    const base = custom ?? defaultData ?? [];
    return lastThreeYears(base);
  }, [custom, defaultData]);

  const data = useMemo(() => (mode === "normalized" ? normalizeTo100(raw) : raw), [mode, raw]);

  const yFormatter = (v: any) => (mode === "normalized" ? `${v}` : fmt.format(Number(v)));

  const targetLinesEnabled = mode === "price" && showTargets && !!targets;

  return (
    <div className="rounded-[28px] border border-foreground/10 bg-background/70 p-5 shadow-sm backdrop-blur">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h4 className="text-sm font-semibold tracking-tight text-foreground">{title}</h4>
          <p className="mt-1 text-xs leading-relaxed text-foreground/65">{educationalNote}</p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={() => setMode("price")}
            className={`rounded-full px-3 py-1 text-xs transition ${
              mode === "price"
                ? "bg-foreground text-background"
                : "border border-foreground/10 bg-background hover:bg-accent"
            }`}
          >
            Price
          </button>
          <button
            onClick={() => setMode("normalized")}
            className={`rounded-full px-3 py-1 text-xs transition ${
              mode === "normalized"
                ? "bg-foreground text-background"
                : "border border-foreground/10 bg-background hover:bg-accent"
            }`}
          >
            Normalized (start=100)
          </button>

          <button
            onClick={() => setShowTargets((s) => !s)}
            className={`rounded-full px-3 py-1 text-xs transition ${
              showTargets ? "border border-foreground/10 bg-background hover:bg-accent" : "border border-foreground/10 bg-background hover:bg-accent"
            }`}
            title="Toggle valuation target lines (bull/base/bear)"
          >
            Targets {showTargets ? "on" : "off"}
          </button>

          <label className="inline-flex cursor-pointer items-center gap-2 rounded-full border border-foreground/10 bg-background px-3 py-1 text-xs text-foreground/80 transition hover:bg-accent">
            <Upload className="h-3.5 w-3.5" />
            Load CSV
            <input
              type="file"
              accept=".csv,text/csv"
              className="hidden"
              onChange={(e) => {
                const f = e.target.files?.[0];
                if (!f) return;
                const reader = new FileReader();
                reader.onload = () => {
                  const text = String(reader.result || "");
                  const parsed = lastThreeYears(parseCsv(text));
                  setCustom(parsed.length ? parsed : []);
                };
                reader.readAsText(f);
              }}
            />
          </label>
        </div>
      </div>

      <div className="mt-4 h-[280px] w-full">
        <ResponsiveContainer>
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" tick={{ fontSize: 11 }} minTickGap={28} />
            <YAxis tick={{ fontSize: 11 }} width={46} tickFormatter={yFormatter} />
            <Tooltip formatter={(v: any) => yFormatter(v)} labelFormatter={(l) => `Date: ${l}`} />
            <Legend wrapperStyle={{ fontSize: 11 }} />
            <Line type="monotone" name="Price" dataKey="value" strokeWidth={2} dot={false} />

            {targetLinesEnabled && targets?.bear != null ? (
              <ReferenceLine y={targets.bear} strokeDasharray="6 6" ifOverflow="extendDomain" label={{ value: `Bear ${targets.bear}`, position: "insideTopLeft", fontSize: 10 }} />
            ) : null}
            {targetLinesEnabled && targets?.base != null ? (
              <ReferenceLine y={targets.base} strokeDasharray="6 6" ifOverflow="extendDomain" label={{ value: `Base ${targets.base}`, position: "insideTopLeft", fontSize: 10 }} />
            ) : null}
            {targetLinesEnabled && targets?.bull != null ? (
              <ReferenceLine y={targets.bull} strokeDasharray="6 6" ifOverflow="extendDomain" label={{ value: `Bull ${targets.bull}`, position: "insideTopLeft", fontSize: 10 }} />
            ) : null}
            {targetLinesEnabled && targets?.current != null ? (
              <ReferenceLine y={targets.current} strokeDasharray="2 6" ifOverflow="extendDomain" label={{ value: `Ref ${targets.current}`, position: "insideTopRight", fontSize: 10 }} />
            ) : null}
          </LineChart>
        </ResponsiveContainer>
      </div>

      <p className="mt-3 text-[11px] leading-relaxed text-foreground/60">
        Default data is a local CSV in this repo (a sample dataset unless you replace it). You can upload your own export any time.
        This keeps the site educational and avoids turning it into a market-data product.
      </p>
    </div>
  );
};

export default ValuationChart;

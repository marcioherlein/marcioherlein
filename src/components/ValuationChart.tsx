import { useMemo, useState } from "react";
import { ResponsiveContainer, LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip } from "recharts";
import { Upload } from "lucide-react";

type Point = { date: string; value: number };

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
  return out;
}

const fmt = new Intl.NumberFormat(undefined, { maximumFractionDigits: 2 });

const ValuationChart = ({
  title,
  csvDefaultPath,
  educationalNote,
}: {
  title: string;
  csvDefaultPath: string;
  educationalNote: string;
}) => {
  const [mode, setMode] = useState<"normalized" | "price">("normalized");
  const [custom, setCustom] = useState<Point[] | null>(null);

  const [defaultData, setDefaultData] = useState<Point[] | null>(null);

  useMemo(() => {
    let isMounted = true;
    fetch(csvDefaultPath)
      .then((r) => r.text())
      .then((t) => {
        if (!isMounted) return;
        const parsed = parseCsv(t);
        setDefaultData(parsed);
      })
      .catch(() => setDefaultData([]));
    return () => {
      isMounted = false;
    };
  }, [csvDefaultPath]);

  const raw = custom ?? defaultData ?? [];
  const data = mode === "normalized" ? normalizeTo100(raw) : raw;

  return (
    <div className="rounded-2xl border border-border/70 bg-background/70 p-5 shadow-sm backdrop-blur">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h4 className="text-sm font-semibold tracking-tight text-foreground">{title}</h4>
          <p className="mt-1 text-xs text-muted-foreground">{educationalNote}</p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={() => setMode("normalized")}
            className={`rounded-full px-3 py-1 text-xs transition ${
              mode === "normalized" ? "bg-foreground text-background" : "border border-border bg-background hover:bg-accent"
            }`}
          >
            Normalized (start=100)
          </button>
          <button
            onClick={() => setMode("price")}
            className={`rounded-full px-3 py-1 text-xs transition ${
              mode === "price" ? "bg-foreground text-background" : "border border-border bg-background hover:bg-accent"
            }`}
          >
            Price
          </button>

          <label className="inline-flex cursor-pointer items-center gap-2 rounded-full border border-border bg-background px-3 py-1 text-xs text-foreground transition hover:bg-accent">
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
                  const parsed = parseCsv(text);
                  setCustom(parsed.length ? parsed : []);
                };
                reader.readAsText(f);
              }}
            />
          </label>
        </div>
      </div>

      <div className="mt-4 h-[260px] w-full">
        <ResponsiveContainer>
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" tick={{ fontSize: 11 }} minTickGap={24} />
            <YAxis
              tick={{ fontSize: 11 }}
              width={44}
              tickFormatter={(v) => (mode === "normalized" ? `${v}` : fmt.format(v))}
            />
            <Tooltip
              formatter={(v: any) => (mode === "normalized" ? `${v}` : fmt.format(Number(v)))}
              labelFormatter={(l) => `Date: ${l}`}
            />
            <Line type="monotone" dataKey="value" strokeWidth={2} dot={false} />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <p className="mt-3 text-[11px] leading-relaxed text-muted-foreground">
        Data source: local CSV in this repo (default) or your uploaded CSV. This is intentional — it keeps the site
        educational and non-commercial, and avoids scraping market data.
      </p>
    </div>
  );
};

export default ValuationChart;

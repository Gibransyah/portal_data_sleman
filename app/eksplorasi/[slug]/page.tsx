"use client";

import { useEffect, useMemo, useState } from "react";
import { useParams } from "next/navigation";
import {
  ExternalLink,
  Loader2,
  Database,
  Table as TableIcon,
  BarChart as BarIcon,
  LineChart as LineIcon,
  AreaChart as AreaIcon,
  Download,
} from "lucide-react";
import {
  ResponsiveContainer,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  BarChart,
  Bar,
  LineChart,
  Line,
  AreaChart,
  Area,
} from "recharts";

/* ---------- TYPES ---------- */
type CkanResource = {
  id: string;
  name?: string;
  url: string;
  format?: string;
  mimetype?: string;
  datastore_active?: boolean;
  state?: string;
};

type CkanPackage = {
  id: string;
  name: string;
  title: string;
  notes?: string;
  private?: boolean;
  state?: string;
  tags?: { name: string; display_name?: string }[];
  resources?: CkanResource[];
};

type Row = Record<string, any>;
const PAGE_SIZE = 50;

/* ---------- HELPERS ---------- */
function parseCSV(text: string): Row[] {
  const rows: string[][] = [];
  let cur = "";
  let inQuotes = false;
  let row: string[] = [];
  for (let i = 0; i < text.length; i++) {
    const c = text[i];
    if (c === '"') {
      if (inQuotes && text[i + 1] === '"') {
        cur += '"';
        i++;
      } else {
        inQuotes = !inQuotes;
      }
    } else if (c === "," && !inQuotes) {
      row.push(cur);
      cur = "";
    } else if ((c === "\n" || c === "\r") && !inQuotes) {
      if (cur !== "" || row.length) {
        row.push(cur);
        rows.push(row);
        row = [];
        cur = "";
      }
    } else {
      cur += c;
    }
  }
  if (cur !== "" || row.length) {
    row.push(cur);
    rows.push(row);
  }
  if (!rows.length) return [];
  const headers = rows[0].map((h) => h.trim());
  return rows.slice(1).map((r) => {
    const obj: Row = {};
    headers.forEach((h, i) => (obj[h] = r[i]));
    return obj;
  });
}

function toNumberSmart(v: unknown): number | null {
  if (typeof v === "number") return Number.isFinite(v) ? v : null;
  if (v === null || v === undefined) return null;
  let s = String(v).trim();
  if (!s) return null;
  s = s.replace(/\s/g, "");
  if (/^-?\d+(\.\d+)?$/.test(s)) return parseFloat(s);
  const hasComma = s.includes(",");
  const hasDot = s.includes(".");
  if (hasComma && !hasDot) {
    s = s.replace(/\./g, "").replace(",", ".");
    const n = parseFloat(s);
    return Number.isNaN(n) ? null : n;
  }
  if (hasComma && hasDot) {
    const lastComma = s.lastIndexOf(",");
    const lastDot = s.lastIndexOf(".");
    if (lastComma > lastDot) s = s.replace(/\./g, "").replace(",", ".");
    else s = s.replace(/,/g, "");
    const n = parseFloat(s);
    return Number.isNaN(n) ? null : n;
  }
  const n = parseFloat(s.replace(/,/g, ""));
  return Number.isNaN(n) ? null : n;
}

/* ---------- COMPONENT ---------- */
export default function DatasetDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const [pkg, setPkg] = useState<CkanPackage | null>(null);
  const [resources, setResources] = useState<CkanResource[]>([]);
  const [activeRes, setActiveRes] = useState<CkanResource | null>(null);
  const [rows, setRows] = useState<Row[]>([]);
  const [loadingMeta, setLoadingMeta] = useState(false);
  const [loadingData, setLoadingData] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [chartType, setChartType] = useState<"bar" | "line" | "area">("bar");
  const [catKey, setCatKey] = useState<string>("");
  const [numKey, setNumKey] = useState<string>("");
  const [page, setPage] = useState(1);

  const portalLink = useMemo(
    () =>
      `https://data.slemankab.go.id/data/dataset/${encodeURIComponent(
        String(slug)
      )}`,
    [slug]
  );

  /* ---------- FETCH METADATA ---------- */
  useEffect(() => {
    const controller = new AbortController();
    (async () => {
      try {
        setLoadingMeta(true);
        const url = new URL(
          "https://data.slemankab.go.id/data/api/3/action/package_show"
        );
        url.searchParams.set("id", String(slug));
        const res = await fetch(url.toString(), { signal: controller.signal });
        const json = await res.json();
        if (!json?.success) throw new Error("Gagal memuat metadata paket.");
        const _pkg: CkanPackage = json.result;
        setPkg(_pkg);
        const resList = (_pkg.resources || []).filter(
          (r) => (r.state || "active") === "active"
        );
        resList.sort((a, b) => {
          const score = (r: CkanResource) =>
            (r.datastore_active ? 100 : 0) +
            (/csv|json/i.test(r.format || "") ? 10 : 0);
          return score(b) - score(a);
        });
        setResources(resList);
        setActiveRes(resList[0] || null);
      } catch (e: any) {
        if (e.name !== "AbortError") setError(e.message);
      } finally {
        setLoadingMeta(false);
      }
    })();
    return () => controller.abort();
  }, [slug]);

  /* ---------- FETCH PREVIEW ---------- */
  useEffect(() => {
    const controller = new AbortController();
    (async () => {
      if (!activeRes) return setRows([]);
      setLoadingData(true);
      try {
        let preview: Row[] = [];
        if (activeRes.datastore_active) {
          const ds = new URL(
            "https://data.slemankab.go.id/data/api/3/action/datastore_search"
          );
          ds.searchParams.set("resource_id", activeRes.id);
          ds.searchParams.set("limit", "500");
          const r = await fetch(ds.toString(), { signal: controller.signal });
          const j = await r.json();
          preview = j?.result?.records || [];
        }
        if (!preview.length && activeRes.url) {
          const resp = await fetch(activeRes.url, { signal: controller.signal });
          const ct = (resp.headers.get("content-type") || "").toLowerCase();
          if (/json/.test(ct)) {
            const j = await resp.json();
            preview = Array.isArray(j)
              ? j
              : Array.isArray(j?.data)
              ? j.data
              : Array.isArray(j?.result)
              ? j.result
              : [];
          } else if (/csv|text\/plain/.test(ct)) {
            const raw = await resp.text();
            preview = parseCSV(raw);
          }
        }
        setRows(preview.slice(0, 2000));
      } catch (e: any) {
        if (e.name !== "AbortError") {
          setError(e.message);
          setRows([]);
        }
      } finally {
        setLoadingData(false);
      }
    })();
    return () => controller.abort();
  }, [activeRes]);

  /* ---------- AUTO COLUMN DETECTION ---------- */
  useEffect(() => {
    if (!rows.length) return setCatKey(""), setNumKey("");
    const sample = rows[0];
    const keys = Object.keys(sample);
    const cat =
      keys.find((k) => typeof sample[k] === "string" && sample[k]) || keys[0];
    const num =
      keys.find((k) => typeof sample[k] === "number") ||
      keys.find((k) => toNumberSmart(sample[k]) !== null) ||
      "";
    setCatKey(cat);
    setNumKey(num);
  }, [rows]);

  /* ---------- AGGREGATION ---------- */
  const aggregated = useMemo(() => {
    if (!rows.length || !catKey || !numKey) return [];
    const map = new Map<string, number>();
    for (const r of rows) {
      const c = String(r[catKey] ?? "");
      const n = toNumberSmart(r[numKey]);
      if (n !== null) map.set(c, (map.get(c) || 0) + n);
    }
    return Array.from(map.entries())
      .map(([k, v]) => ({ [catKey]: k, [numKey]: v }))
      .sort((a, b) => (b[numKey] as number) - (a[numKey] as number))
      .slice(0, 50);
  }, [rows, catKey, numKey]);

  const totalPages = Math.max(1, Math.ceil(rows.length / PAGE_SIZE));
  const pageRows = rows.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);
  const columns = useMemo(
    () => (rows.length ? Object.keys(rows[0]) : []),
    [rows]
  );

  /* ---------- RENDER ---------- */
  return (
    <main className="flex-1 pt-28 pb-16 bg-background text-foreground transition-colors duration-500">
      <div className="max-w-7xl mx-auto px-6">
        {/* HEADER */}
        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6 mb-6">
          <div>
            <h1 className="text-3xl font-bold text-blue-600">
              {pkg?.title || "Dataset"}
            </h1>
            <p className="text-muted-foreground mt-2 max-w-3xl">
              {pkg?.notes || "Tidak ada deskripsi."}
            </p>
            {pkg?.tags?.length ? (
              <div className="flex flex-wrap gap-2 mt-3">
                {pkg.tags.slice(0, 8).map((t) => (
                  <span
                    key={t.name}
                    className="px-2 py-1 rounded bg-blue-50 text-blue-800 text-xs"
                  >
                    {t.display_name || t.name}
                  </span>
                ))}
              </div>
            ) : null}
          </div>
          <a
            href={portalLink}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border text-sm font-semibold 
                       border-blue-600 text-blue-600 hover:bg-blue-50 transition-colors"
          >
            <ExternalLink className="w-4 h-4" />
            Buka di Portal
          </a>
        </div>

        {/* ---------- RESOURCE PICKER ---------- */}
        <div className="bg-card border border-border rounded-xl p-4 mb-6">
          <h2 className="font-semibold mb-3 flex items-center gap-2 text-blue-700">
            <Database className="w-4 h-4 text-blue-600" />
            Sumber Data (Resource)
          </h2>
          {loadingMeta ? (
            <div className="text-muted-foreground flex items-center gap-2">
              <Loader2 className="w-4 h-4 animate-spin" /> Memuat…
            </div>
          ) : resources.length ? (
            <div className="flex flex-wrap gap-2">
              {resources.map((r) => {
                const label =
                  r.name ||
                  r.format ||
                  (r.url ? new URL(r.url).pathname.split("/").pop() : r.id);
                const active = activeRes?.id === r.id;
                return (
                  <button
                    key={r.id}
                    onClick={() => setActiveRes(r)}
                    className={`px-3 py-1.5 rounded-full border text-sm transition-colors ${
                      active
                        ? "bg-blue-600 text-white border-blue-600"
                        : "bg-blue-50 text-blue-700 border-blue-200 hover:bg-blue-100"
                    }`}
                  >
                    {label}
                  </button>
                );
              })}
            </div>
          ) : (
            <p className="text-muted-foreground">Tidak ada resource tersedia.</p>
          )}
        </div>

        {/* ---------- CHART + TABLE ---------- */}
        <div className="grid lg:grid-cols-2 gap-6">
          {/* Chart */}
          <div className="bg-card border border-border rounded-xl p-5">
            <h3 className="font-semibold mb-3 flex items-center gap-2 text-blue-700">
              <BarIcon className="w-4 h-4 text-blue-600" />
              Visualisasi (Aggregated)
            </h3>
            {!aggregated.length || !numKey ? (
              <p className="text-muted-foreground">
                Data belum siap divisualkan.
              </p>
            ) : (
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  {chartType === "bar" ? (
                    <BarChart data={aggregated}>
                      <CartesianGrid strokeDasharray="3 3" strokeOpacity={0.2} />
                      <XAxis dataKey={catKey} tick={{ fontSize: 12 }} />
                      <YAxis />
                      <Tooltip />
                      <Bar dataKey={numKey} fill="#2563eb" />
                    </BarChart>
                  ) : chartType === "line" ? (
                    <LineChart data={aggregated}>
                      <CartesianGrid strokeDasharray="3 3" strokeOpacity={0.2} />
                      <XAxis dataKey={catKey} tick={{ fontSize: 12 }} />
                      <YAxis />
                      <Tooltip />
                      <Line type="monotone" dataKey={numKey} stroke="#2563eb" />
                    </LineChart>
                  ) : (
                    <AreaChart data={aggregated}>
                      <CartesianGrid strokeDasharray="3 3" strokeOpacity={0.2} />
                      <XAxis dataKey={catKey} tick={{ fontSize: 12 }} />
                      <YAxis />
                      <Tooltip />
                      <Area
                        type="monotone"
                        dataKey={numKey}
                        stroke="#2563eb"
                        fill="#2563eb"
                        fillOpacity={0.25}
                      />
                    </AreaChart>
                  )}
                </ResponsiveContainer>
              </div>
            )}
            {catKey && numKey && (
              <p className="text-xs text-muted-foreground mt-2">
                Sumbu-X: <b>{catKey}</b> • Nilai agregat: <b>{numKey}</b>
              </p>
            )}
          </div>

          {/* Table */}
          <div className="bg-card border border-border rounded-xl p-5">
            <h3 className="font-semibold mb-3 flex items-center gap-2 text-blue-700">
              <TableIcon className="w-4 h-4 text-blue-600" />
              Pratinjau Tabel
            </h3>
            {loadingData ? (
              <div className="text-muted-foreground flex items-center gap-2">
                <Loader2 className="w-4 h-4 animate-spin" /> Memuat…
              </div>
            ) : !rows.length ? (
              <p className="text-muted-foreground">
                Data belum bisa ditampilkan.
              </p>
            ) : (
              <>
                <div className="overflow-auto border border-border rounded-lg">
                  <table className="min-w-full text-sm">
                    <thead className="bg-muted sticky top-0">
                      <tr>
                        {columns.map((k) => (
                          <th
                            key={k}
                            className="text-left px-3 py-2 font-semibold"
                          >
                            {k}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {pageRows.map((r, i) => (
                        <tr
                          key={i}
                          className="odd:bg-card even:bg-muted/50 border-t border-border"
                        >
                          {columns.map((k) => (
                            <td key={k} className="px-3 py-2 whitespace-nowrap">
                              {String(r[k] ?? "")}
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <div className="flex items-center justify-between mt-3 text-sm text-muted-foreground">
                  <span>
                    Halaman {page} / {totalPages} • {rows.length} baris
                  </span>
                  <div className="flex gap-2">
                    <button
                      disabled={page <= 1}
                      onClick={() => setPage((p) => Math.max(1, p - 1))}
                      className={`px-3 py-1.5 rounded-lg border transition-colors ${
                        page <= 1
                          ? "text-muted-foreground border-border opacity-50"
                          : "text-blue-600 border-blue-600 hover:bg-blue-50"
                      }`}
                    >
                      Prev
                    </button>
                    <button
                      disabled={page >= totalPages}
                      onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                      className={`px-3 py-1.5 rounded-lg border transition-colors ${
                        page >= totalPages
                          ? "text-muted-foreground border-border opacity-50"
                          : "text-blue-600 border-blue-600 hover:bg-blue-50"
                      }`}
                    >
                      Next
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>

        {error && <p className="text-red-500 mt-4">{error}</p>}
      </div>
    </main>
  );
}

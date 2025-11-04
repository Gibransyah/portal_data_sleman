"use client";

import { useEffect, useMemo, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { Search, Database, Download, ExternalLink } from "lucide-react";

/* =========================
   Types
========================= */
type CkanResource = {
  id: string;
  url: string;
  format?: string;
  name?: string;
  mimetype?: string;
  state?: string;
};

type CkanPackage = {
  id: string;
  name: string;
  title: string;
  notes?: string;
  private?: boolean;
  state?: string;
  tags?: { id?: string; name: string; display_name?: string }[];
  resources?: CkanResource[];
};

const TOPIK_LIST = [
  { label: "Semua", value: "" },
  { label: "Kesehatan", value: "kesehatan" },
  { label: "Pendidikan", value: "pendidikan" },
  { label: "Kebudayaan", value: "kebudayaan" },
  { label: "Infrastruktur", value: "infrastruktur" },
  { label: "Lingkungan", value: "lingkungan" },
  { label: "Sosial", value: "sosial" },
  { label: "Ekonomi", value: "ekonomi" },
];

const TOPIK_TO_TAG: Record<string, string> = {
  kesehatan: "kesehatan",
  pendidikan: "pendidikan",
  kebudayaan: "kebudayaan",
  infrastruktur: "infrastruktur",
  lingkungan: "lingkungan",
  sosial: "sosial",
  ekonomi: "ekonomi",
};

/* =========================
   Component
========================= */
function EksplorasiDataPageContent() {
  const params = useSearchParams();
  const [search, setSearch] = useState("");
  const [datasets, setDatasets] = useState<CkanPackage[]>([]);
  const [loading, setLoading] = useState(false);

  const selectedTopic = useMemo(
    () => (params.get("topik") || "").toLowerCase(),
    [params]
  );

  const fetchData = async () => {
    setLoading(true);
    try {
      const base = "https://data.slemankab.go.id/data/api/3/action/package_search";
      const url = new URL(base);

      const qParts = [search.trim()];
      if (selectedTopic) qParts.push(selectedTopic);
      const q = qParts.filter(Boolean).join(" ");
      if (q) url.searchParams.set("q", q);

      if (selectedTopic && TOPIK_TO_TAG[selectedTopic]) {
        url.searchParams.set("fq", `tags:"${TOPIK_TO_TAG[selectedTopic]}"`);
      }

      url.searchParams.set("rows", "60");
      const res = await fetch(url.toString());
      const json = await res.json();
      const raw: CkanPackage[] = json?.result?.results || [];

      const publicOnly = raw.filter(
        (pkg) => !pkg.private && (pkg.state || "active") === "active"
      );

      setDatasets(publicOnly);
    } catch (e) {
      console.error("CKAN fetch error:", e);
      setDatasets([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedTopic]);

  const handleSearch = () => fetchData();

  const firstDownloadable = (pkg: CkanPackage) => {
    if (!Array.isArray(pkg.resources)) return null;
    const pref = pkg.resources.find(
      (r) =>
        /csv|json/i.test(r.format || "") ||
        /csv|json/i.test(r.mimetype || "")
    );
    return pref || pkg.resources.find((r) => (r.state || "active") === "active") || null;
  };

  /* =========================
     RENDER
  ========================= */
  return (
    <main className="flex-1 pt-28 pb-16 bg-blue-50 text-blue-950 transition-colors duration-500">
      <div className="max-w-7xl mx-auto px-6">
        <h1 className="text-4xl font-bold text-blue-900 mb-2">
          Eksplorasi Data Sleman
        </h1>
        <p className="text-blue-700/80 mb-6">
          Jelajahi kumpulan data resmi berdasarkan topik seperti kesehatan,
          pendidikan, kebudayaan, infrastruktur, dan lainnya.
        </p>

        {selectedTopic && (
          <div className="mb-4">
            <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full 
                             bg-blue-100 text-blue-800 text-sm">
              Topik: <strong className="capitalize">{selectedTopic}</strong>
            </span>
          </div>
        )}

        {/* Search */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="flex-1 relative">
            <input
              type="text"
              placeholder="Cari dataset..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSearch()}
              className="w-full px-6 py-4 rounded-lg border border-blue-200 
                         bg-white text-blue-900
                         placeholder:text-blue-400
                         focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all"
            />
            <Search className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-blue-400" />
          </div>
          <button
            onClick={handleSearch}
            className="bg-blue-700 hover:bg-blue-800 
                       text-white px-8 py-4 rounded-lg font-semibold 
                       transition-all flex items-center justify-center gap-2"
          >
            <Search className="w-5 h-5" />
            Cari
          </button>
        </div>

        {/* Tombol topik */}
        <div className="flex flex-wrap gap-2 mb-10">
          {TOPIK_LIST.map((t) => {
            const href = t.value ? `/eksplorasi?topik=${t.value}` : "/eksplorasi";
            const active = selectedTopic === t.value;
            return (
              <a
                key={t.value}
                href={href}
                className={`px-4 py-2 rounded-full border text-sm font-medium transition-colors ${
                  active
                    ? "bg-blue-700 text-white border-blue-700"
                    : "bg-white text-blue-700 border-blue-200 hover:bg-blue-100"
                }`}
              >
                {t.label}
              </a>
            );
          })}
        </div>

        {/* Grid datasets */}
        {loading ? (
          <p className="text-blue-500">Memuat data…</p>
        ) : datasets.length ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {datasets.map((d) => {
              const res = firstDownloadable(d);
              const portalUrl = `https://data.slemankab.go.id/data/dataset/${encodeURIComponent(
                d.name
              )}`;
              const internalUrl = `/eksplorasi/${encodeURIComponent(d.name)}`;

              return (
                <div
                  key={d.id}
                  className="bg-white border border-blue-200 
                             rounded-xl p-6 hover:shadow-lg 
                             transition-all flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center gap-3 mb-3">
                      <Database className="w-5 h-5 text-blue-600" />
                      <h3 className="text-lg font-semibold text-blue-900 line-clamp-2">
                        {d.title}
                      </h3>
                    </div>

                    <p className="text-sm text-blue-700/80 line-clamp-3 mb-4">
                      {d.notes || "Tidak ada deskripsi."}
                    </p>

                    {Array.isArray(d.tags) && d.tags.length > 0 && (
                      <div className="flex flex-wrap gap-2 mb-4">
                        {d.tags.slice(0, 4).map((t) => (
                          <span
                            key={t.id || t.name}
                            className="px-2 py-1 rounded bg-blue-100 text-blue-700 text-xs"
                          >
                            {t.display_name || t.name}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>

                  <div className="flex flex-wrap items-center gap-4 mt-auto pt-3 border-t border-blue-100">
                    <a
                      href={internalUrl}
                      className="text-blue-700 font-semibold text-sm hover:underline"
                    >
                      Ringkasan →
                    </a>

                    <a
                      href={portalUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-sm text-blue-600 hover:text-blue-800"
                    >
                      <ExternalLink className="w-4 h-4" />
                      Portal
                    </a>

                    {res?.url && (
                      <a
                        href={res.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-sm text-blue-600 hover:text-blue-800"
                        title={`Unduh ${res.format || ""}`.trim()}
                      >
                        <Download className="w-4 h-4" />
                        Unduh {res.format ? `(${res.format})` : ""}
                      </a>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <p className="text-blue-600">
            Tidak ada dataset ditemukan.
          </p>
        )}
      </div>
    </main>
  );
}

export default function EksplorasiDataPage() {
  return (
    <Suspense fallback={
      <main className="flex-1 pt-28 pb-16 bg-blue-50">
        <div className="max-w-7xl mx-auto px-6">
          <p className="text-blue-600">Memuat...</p>
        </div>
      </main>
    }>
      <EksplorasiDataPageContent />
    </Suspense>
  );
}

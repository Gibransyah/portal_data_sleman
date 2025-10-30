"use client";

import { useEffect, useState } from "react";
import { Database, ExternalLink, Link as LinkIcon } from "lucide-react";

type CkanPackage = {
  id: string;
  name: string;
  title: string;
  notes?: string;
  tags?: { name: string; display_name?: string }[];
  image_display_url?: string;
};

export default function HighlightCards() {
  const [datasets, setDatasets] = useState<CkanPackage[]>([]);
  const [loading, setLoading] = useState(true);

  const featuredSlugs = [
    "overview-pariwisata-kabupaten-sleman",
    "overview-lingkungan-kabupaten-sleman",
    "jumlah-sekolah-guru-dan-siswa",
    "overview-ekonomi-kabupaten-sleman",
    "dashboard-kesehatan",
    "dashboard-infrastruktur",
  ];

  useEffect(() => {
    const fetchFeatured = async () => {
      try {
        const base = "https://data.slemankab.go.id/data/api/3/action/package_show";

        const fetchedData = await Promise.all(
          featuredSlugs.map(async (slug) => {
            try {
              const res = await fetch(`${base}?id=${slug}`);
              const json = await res.json();
              return json?.result || null;
            } catch {
              return null;
            }
          })
        );

        const validData = fetchedData.filter(Boolean) as CkanPackage[];
        setDatasets(validData);
      } catch (error) {
        console.error("Gagal memuat data unggulan:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchFeatured();
  }, []);

  return (
    <section className="py-20 px-6 bg-gray-50">
      <div className="container mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-10">
          <h2 className="text-3xl font-bold text-gray-800">
            Dashboard Pilihan Sleman
          </h2>
          <a
            href="/eksplorasi"
            className="text-green-700 font-semibold hover:underline flex items-center gap-1"
          >
            Eksplor lebih banyak
            <ExternalLink className="w-4 h-4" />
          </a>
        </div>

        {/* Grid */}
        {loading ? (
          <p className="text-gray-500">Memuat dashboard unggulan…</p>
        ) : datasets.length === 0 ? (
          <p className="text-gray-500">
            Tidak ada dashboard unggulan ditemukan.
          </p>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {datasets.map((d) => {
              const topic =
                d.tags && d.tags.length > 0
                  ? d.tags[0].display_name || d.tags[0].name
                  : "Umum";

              const portalUrl = `https://data.slemankab.go.id/data/dataset/${encodeURIComponent(
                d.name
              )}`;
              const internalUrl = `/eksplorasi/${encodeURIComponent(d.name)}`;

              return (
                <div
                  key={d.id}
                  className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center gap-3 mb-3">
                      <Database className="w-6 h-6 text-green-600" />
                      <h3 className="text-lg font-semibold text-gray-800 line-clamp-2">
                        {d.title}
                      </h3>
                    </div>
                    <p className="text-sm text-gray-600 line-clamp-3 mb-4">
                      {d.notes || "Tidak ada deskripsi."}
                    </p>

                    {d.tags?.length > 0 && (
                      <div className="flex flex-wrap gap-2 mb-4">
                        {d.tags.slice(0, 3).map((t) => (
                          <span
                            key={t.name}
                            className="px-2 py-1 text-xs bg-gray-100 text-gray-700 rounded-full"
                          >
                            {t.display_name || t.name}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>

                  <div className="flex items-center justify-between mt-2">
                    <a
                      href={internalUrl}
                      className="text-green-700 text-sm font-medium hover:underline flex items-center gap-1"
                    >
                      Lihat Visualisasi
                      <LinkIcon className="w-4 h-4" />
                    </a>
                    <a
                      href={portalUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-500 text-sm hover:text-green-600 flex items-center gap-1"
                    >
                      Portal
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}

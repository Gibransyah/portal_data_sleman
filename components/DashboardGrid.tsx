"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { ExternalLink } from "lucide-react";

type CkanPackage = {
  id: string;
  name: string;
  title: string;
  notes?: string;
  tags?: { name: string; display_name?: string }[];
  image_display_url?: string;
};

export default function DashboardGrid() {
  const [datasets, setDatasets] = useState<CkanPackage[]>([]);
  const [loading, setLoading] = useState(true);

  // daftar slug dataset unggulan (kamu bisa sesuaikan)
  const featuredSlugs = [
    "overview-pariwisata-kabupaten-sleman",
    "overview-lingkungan-kabupaten-sleman",
    "jumlah-sekolah-guru-dan-siswa",
    "overview-ekonomi-kabupaten-sleman",
  ];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const base = "https://data.slemankab.go.id/data/api/3/action/package_show";
        const all = await Promise.all(
          featuredSlugs.map(async (slug) => {
            const res = await fetch(`${base}?id=${slug}`);
            const json = await res.json();
            return json?.success ? json.result : null;
          })
        );
        setDatasets(all.filter(Boolean) as CkanPackage[]);
      } catch (err) {
        console.error("Gagal memuat data:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <section className="py-10 px-6 bg-white">
      <div className="container mx-auto">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-semibold text-gray-800">
            Dashboard Pilihan
          </h2>
          <a
            href="/eksplorasi"
            className="text-green-700 text-sm font-medium hover:underline flex items-center gap-1"
          >
            Eksplor lebih banyak
            <ExternalLink className="w-4 h-4" />
          </a>
        </div>

        {loading ? (
          <p className="text-gray-500">Memuat dashboard unggulan…</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {datasets.map((d) => {
              const portalUrl = `https://data.slemankab.go.id/data/dataset/${encodeURIComponent(
                d.name
              )}`;
              const internalUrl = `/eksplorasi/${encodeURIComponent(d.name)}`;
              const topic =
                d.tags?.[0]?.display_name || d.tags?.[0]?.name || "Umum";

              return (
                <a
                  key={d.id}
                  href={internalUrl}
                  className="block rounded-xl overflow-hidden bg-white border border-gray-200 shadow-sm hover:shadow-md transition group"
                >
                  {/* Gambar */}
                  <div className="relative aspect-video bg-gray-100">
                    <Image
                      src={d.image_display_url || "/images/placeholder.svg"}
                      alt={d.title}
                      fill
                      className="object-cover"
                    />
                    <div className="absolute top-2 right-2 bg-white/70 rounded-md p-1">
                      <ExternalLink className="w-4 h-4 text-gray-600" />
                    </div>
                  </div>

                  {/* Caption */}
                  <div className="p-3">
                    <h3 className="text-sm font-semibold text-gray-900 group-hover:text-green-700 line-clamp-2">
                      {d.title}
                    </h3>
                    <p className="text-xs text-gray-500 mt-1">{topic}</p>
                  </div>
                </a>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}

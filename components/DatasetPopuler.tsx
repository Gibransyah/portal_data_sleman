"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Database, ArrowRight, ExternalLink, Download } from "lucide-react";

type Resource = {
  id: string;
  url: string;
  format?: string;
  mimetype?: string;
  name?: string;
  datastore_active?: boolean;
};

type Dataset = {
  id: string;
  name: string;
  title: string;
  notes?: string;
  tags?: { name: string; display_name?: string }[];
  resources?: Resource[];
};

export default function DatasetPopuler() {
  const [datasets, setDatasets] = useState<Dataset[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchDatasets() {
      try {
        const res = await fetch(
          "https://data.slemankab.go.id/data/api/3/action/package_list"
        );
        const json = await res.json();
        if (json.success) {
          const limited = json.result.slice(0, 6);
          const details = await Promise.all(
            limited.map(async (name: string) => {
              const r = await fetch(
                `https://data.slemankab.go.id/data/api/3/action/package_show?id=${name}`
              );
              const j = await r.json();
              return j.result;
            })
          );
          setDatasets(details);
        }
      } catch (err) {
        console.error("Gagal memuat dataset:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchDatasets();
  }, []);

  return (
    <section
      className="
        py-20 px-6 
        bg-blue-50 dark:bg-blue-950 
        transition-colors duration-500
      "
    >
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold text-blue-900 dark:text-white mb-10 text-center">
          Dataset Populer
        </h2>

        {loading ? (
          <p className="text-gray-500 dark:text-blue-200 text-center">
            Memuat dataset populer...
          </p>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {datasets.map((d) => {
              const topic =
                d.tags?.[0]?.display_name || d.tags?.[0]?.name || "Umum";
              const desc =
                d.notes && d.notes.length > 110
                  ? d.notes.slice(0, 110) + "..."
                  : d.notes || "Tidak ada deskripsi.";
              const csv = d.resources?.find(
                (r) =>
                  /csv|xls|xlsx/i.test(r.format || "") ||
                  /csv|xls|xlsx/i.test(r.mimetype || "")
              );
              const portalUrl = `https://data.slemankab.go.id/data/dataset/${d.name}`;
              const internalUrl = `/eksplorasi/${encodeURIComponent(d.name)}`;

              return (
                <div
                  key={d.id}
                  className="
                    bg-white dark:bg-blue-900/20 
                    border border-blue-100 dark:border-blue-800 
                    rounded-xl p-6 
                    hover:shadow-lg dark:hover:shadow-blue-800/30 
                    transition-all 
                    flex flex-col justify-between
                  "
                >
                  {/* Header */}
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <Database className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                      <h3 className="font-semibold text-lg text-blue-900 dark:text-white leading-tight">
                        {d.title}
                      </h3>
                    </div>
                    <p className="text-sm text-gray-700 dark:text-blue-200 mb-3">
                      {desc}
                    </p>

                    <span
                      className="
                        inline-block 
                        bg-blue-100 dark:bg-blue-800/40 
                        text-blue-700 dark:text-blue-300 
                        text-xs px-3 py-1 rounded-full mb-4
                      "
                    >
                      {topic.toLowerCase()}
                    </span>
                  </div>

                  {/* Footer actions */}
                  <div className="flex items-center justify-between mt-auto pt-3 border-t border-blue-100 dark:border-blue-800">
                    <Link
                      href={internalUrl}
                      className="
                        text-blue-700 dark:text-blue-300 
                        text-sm font-medium 
                        hover:underline flex items-center gap-1
                      "
                    >
                      Ringkasan
                      <ArrowRight className="w-4 h-4" />
                    </Link>

                    <div className="flex items-center gap-4 text-sm text-blue-600 dark:text-blue-300">
                      <a
                        href={portalUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-blue-800 dark:hover:text-blue-400 flex items-center gap-1"
                      >
                        <ExternalLink className="w-4 h-4" /> Portal
                      </a>
                      {csv && (
                        <a
                          href={csv.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="hover:text-blue-800 dark:hover:text-blue-400 flex items-center gap-1"
                        >
                          <Download className="w-4 h-4" /> Unduh
                        </a>
                      )}
                    </div>
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

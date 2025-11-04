"use client";

import {
  Activity,
  GraduationCap,
  Wallet,
  TreePine,
  Building2,
} from "lucide-react";

// 💡 Konsisten palet biru dan netral agar serasi dengan seluruh dashboard
const insights = [
  {
    title: "Angka Harapan Hidup",
    value: "73,63 Tahun",
    icon: Activity,
    color:
      "bg-blue-50 text-blue-700",
  },
  {
    title: "Jumlah Sekolah Terdata",
    value: "215 Sekolah",
    icon: GraduationCap,
    color:
      "bg-indigo-50 text-indigo-700",
  },
  {
    title: "Sektor UMKM Aktif",
    value: "12 Sektor",
    icon: Wallet,
    color:
      "bg-cyan-50 text-cyan-700",
  },
  {
    title: "Kawasan Hijau",
    value: "18 Wilayah",
    icon: TreePine,
    color:
      "bg-teal-50 text-teal-700",
  },
  {
    title: "Proyek Infrastruktur",
    value: "9 Proyek",
    icon: Building2,
    color:
      "bg-slate-50 text-slate-700",
  },
];

export default function InsightHighlights() {
  return (
    <section className="py-20 px-6 bg-white transition-colors duration-500">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold text-blue-900 mb-8 text-center">
          Sekilas Data Kabupaten Sleman
        </h2>

        <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {insights.map((insight) => (
            <div
              key={insight.title}
              className={`${insight.color} rounded-xl p-6 border border-gray-100 
                          shadow-sm hover:shadow-md transition-all flex flex-col items-center justify-center`}
            >
              <insight.icon className="w-10 h-10 mb-3" />
              <p className="text-2xl font-bold">{insight.value}</p>
              <p className="text-sm font-medium text-gray-600 mt-1">
                {insight.title}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

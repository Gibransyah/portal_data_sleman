"use client";

import Link from "next/link";
import {
  Activity,
  GraduationCap,
  LineChart,
  Building2,
  Users,
} from "lucide-react";

// Kategori dengan tone biru & netral senada
const categories = [
  {
    name: "Kesehatan",
    icon: Activity,
    href: "/eksplorasi?kategori=kesehatan",
    color:
      "bg-blue-50 text-blue-700 hover:bg-blue-100",
  },
  {
    name: "Pendidikan",
    icon: GraduationCap,
    href: "/eksplorasi?kategori=pendidikan",
    color:
      "bg-indigo-50 text-indigo-700 hover:bg-indigo-100",
  },
  {
    name: "Ekonomi",
    icon: LineChart,
    href: "/eksplorasi?kategori=ekonomi",
    color:
      "bg-cyan-50 text-cyan-700 hover:bg-cyan-100",
  },
  {
    name: "Infrastruktur",
    icon: Building2,
    href: "/eksplorasi?kategori=infrastruktur",
    color:
      "bg-slate-50 text-slate-700 hover:bg-slate-100",
  },
  {
    name: "Sosial",
    icon: Users,
    href: "/eksplorasi?kategori=sosial",
    color:
      "bg-green-50 text-green-700 hover:bg-green-100",
  },
];

export default function CategorySection() {
  return (
    <section className="py-20 px-6 bg-white transition-colors duration-500">
      <div className="max-w-7xl mx-auto text-center">
        <h2 className="text-3xl font-bold text-gray-800 mb-6">
          Eksplorasi Data Berdasarkan Topik
        </h2>
        <p className="text-gray-600 mb-10">
          Pilih kategori di bawah untuk menjelajahi dataset tematik Kabupaten Sleman.
        </p>

        <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 justify-center">
          {categories.map((cat) => (
            <Link
              key={cat.name}
              href={cat.href}
              className={`${cat.color} rounded-xl py-10 flex flex-col items-center justify-center 
                         shadow-sm border border-gray-100 hover:shadow-md transition-all`}
            >
              <cat.icon className="w-10 h-10 mb-3" />
              <span className="font-semibold text-base">{cat.name}</span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

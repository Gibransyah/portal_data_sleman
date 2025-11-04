"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function HeroSection() {
  const [searchQuery, setSearchQuery] = useState("");
  const router = useRouter();

  const handleSearch = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const trimmed = searchQuery.trim();
    if (!trimmed) return;
    router.push(`/eksplorasi?search=${encodeURIComponent(trimmed)}`);
  };

  return (
    <section
      className="relative overflow-hidden 
                 bg-blue-700 
                 text-white py-28 md:py-32 px-6 
                 transition-colors duration-700"
    >
      {/* Pola latar halus */}
      <div className="absolute inset-0 bg-[url('/pattern-light.svg')] opacity-[0.06]" />

      <div className="max-w-7xl mx-auto relative z-10 grid md:grid-cols-2 gap-12 items-center">
        {/* ===== LEFT CONTENT ===== */}
        <div className="space-y-8">
          <h1 className="text-4xl md:text-5xl font-extrabold leading-tight tracking-tight drop-shadow-sm">
            Data Sleman dalam Satu Dasbor.
          </h1>
          <p className="text-lg text-white/90 max-w-lg">
            Mewujudkan kebijakan dan pelayanan publik berbasis data yang
            transparan, terbuka, dan terintegrasi.
          </p>

          {/* Search bar */}
          <form onSubmit={handleSearch} className="flex gap-3 max-w-xl mt-6">
            <div className="flex-1 relative">
              <input
                type="text"
                placeholder="Cari data atau dashboard..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSearch(e)}
                className="w-full px-6 py-4 rounded-lg text-gray-800
                           bg-white/95
                           placeholder-gray-500
                           focus:outline-none focus:ring-2 focus:ring-blue-400
                           shadow-sm transition duration-300"
              />
            </div>
            <button
              type="submit"
              className="bg-blue-800 text-white px-8 py-4 rounded-lg font-semibold 
                         hover:bg-blue-900
                         shadow-md transition-all duration-300"
            >
              Cari
            </button>
          </form>
        </div>

        {/* ===== RIGHT VISUAL ===== */}
        <div className="hidden md:flex justify-center relative">
          <div
            className="relative w-[90%] h-[320px] rounded-3xl 
                       bg-white/10
                       border border-white/10 backdrop-blur-sm
                       flex items-center justify-center shadow-inner"
          >
            <div className="text-[5rem] text-white/30 select-none">
              📊
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

"use client";

import { useEffect, useState } from "react";
import { Moon, Sun, ChevronDown } from "lucide-react";
import Link from "next/link";

export default function Header() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(false);

  // Baca preferensi tema dari localStorage
  useEffect(() => {
    const saved = localStorage.getItem("theme");
    if (
      saved === "dark" ||
      (!saved && window.matchMedia("(prefers-color-scheme: dark)").matches)
    ) {
      document.documentElement.classList.add("dark");
      setIsDarkMode(true);
    }
  }, []);

  // Toggle tema
  const toggleTheme = () => {
    const next = !isDarkMode;
    setIsDarkMode(next);
    document.documentElement.classList.toggle("dark", next);
    localStorage.setItem("theme", next ? "dark" : "light");
  };

  const toggleDropdown = () => setOpenDropdown(!openDropdown);

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 w-full
                 bg-blue-700 dark:bg-blue-950
                 text-white shadow-md transition-all duration-500"
    >
      <div className="max-w-screen-2xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* ==================== LOGO ==================== */}
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-white text-blue-700 dark:bg-blue-500 dark:text-white 
                          rounded-full flex items-center justify-center font-bold text-sm">
            ▲
          </div>
          <span className="font-bold text-xl tracking-tight">Dashboard Sleman</span>
        </div>

        {/* ==================== NAVIGATION ==================== */}
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium relative">
          {/* Dropdown Topik */}
          <div className="relative">
            <button
              onClick={toggleDropdown}
              className="flex items-center gap-1 hover:text-blue-200 dark:hover:text-blue-300 transition-colors"
            >
              Topik
              <ChevronDown className="w-4 h-4" />
            </button>

            {openDropdown && (
              <div
                className="absolute left-0 mt-2 w-48 bg-white text-gray-800 dark:bg-gray-900 dark:text-gray-100
                           rounded-lg shadow-lg overflow-hidden border border-gray-200 dark:border-gray-700"
                onMouseLeave={() => setOpenDropdown(false)}
              >
                {[
                  { label: "Kesehatan", value: "kesehatan" },
                  { label: "Pendidikan", value: "pendidikan" },
                  { label: "Kebudayaan", value: "kebudayaan" },
                  { label: "Infrastruktur", value: "infrastruktur" },
                  { label: "Lingkungan", value: "lingkungan" },
                  { label: "Sosial", value: "sosial" },
                  { label: "Ekonomi", value: "ekonomi" },
                ].map((topic) => (
                  <Link
                    key={topic.value}
                    href={`/eksplorasi?topik=${topic.value}`}
                    className="block px-4 py-2 text-sm hover:bg-blue-100 hover:text-blue-800 
                               dark:hover:bg-blue-950 dark:hover:text-blue-200 transition-colors"
                    onClick={() => setOpenDropdown(false)}
                  >
                    {topic.label}
                  </Link>
                ))}
              </div>
            )}
          </div>

          <Link
            href="/eksplorasi"
            className="hover:text-blue-200 dark:hover:text-blue-300 transition-colors"
          >
            Eksplorasi Data
          </Link>
          <a href="/tentang" className="hover:text-blue-200 dark:hover:text-blue-300 transition-colors">
            Tentang
          </a>
          <a href="#" className="hover:text-blue-200 dark:hover:text-blue-300 transition-colors">
            Executive Dashboard
          </a>
        </nav>

        {/* ==================== THEME TOGGLE ====================
        <button
          onClick={toggleTheme}
          className="flex items-center gap-2 bg-white/20 dark:bg-gray-800/60
                     px-3 py-1.5 rounded-full hover:bg-white/30 dark:hover:bg-gray-700/80
                     transition"
        >
          {isDarkMode ? (
            <Moon className="w-5 h-5 text-white" />
          ) : (
            <Sun className="w-5 h-5 text-yellow-300" />
          )}
          <span className="text-sm font-medium">
            {isDarkMode ? "Gelap" : "Terang"}
          </span>
        </button> */}
      </div>
    </header>
  );
}

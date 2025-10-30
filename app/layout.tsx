"use client";

import { useEffect, useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import "./globals.css";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const [mounted, setMounted] = useState(false);

  // =============================
  //  Load preferensi tema dari localStorage
  // =============================
  useEffect(() => {
    const saved = localStorage.getItem("theme");
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;

    if (saved === "dark" || (!saved && prefersDark)) {
      document.documentElement.classList.add("dark");
      setTheme("dark");
    }
    setMounted(true);
  }, []);

  // =============================
  //  Toggle tema dan simpan preferensi
  // =============================
  // const toggleTheme = () => {
  //   const next = theme === "light" ? "dark" : "light";
  //   setTheme(next);
  //   document.documentElement.classList.toggle("dark", next === "dark");
  //   localStorage.setItem("theme", next);
  // };

  // // =============================
  // //  Hindari flash putih sebelum mount
  // // =============================
  // if (!mounted) {
  //   return (
  //     <html lang="id" className="bg-gray-900 text-gray-100">
  //       <body />
  //     </html>
  //   );
  // }

  // =============================
  //  Struktur layout utama
  // =============================
  return (
    <html lang="id" suppressHydrationWarning>
      <body
        className="bg-background text-foreground transition-colors duration-500 
                   antialiased overflow-x-hidden flex flex-col min-h-screen"
      >
        {/* HEADER */}
        <Header />

        {/* MAIN CONTENT */}
        <main className="flex-1 relative z-0 bg-background dark:bg-background">
          {children}
        </main>

        {/* FOOTER (hanya 1x di sini) */}
        <Footer />
      </body>
    </html>
  );
}

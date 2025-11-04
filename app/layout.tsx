"use client";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import "./globals.css";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="id">
      <body
        className="bg-background text-foreground transition-colors duration-500 
                   antialiased overflow-x-hidden flex flex-col min-h-screen"
      >
        {/* HEADER */}
        <Header />

        {/* MAIN CONTENT */}
        <main className="flex-1 relative z-0 bg-background">
          {children}
        </main>

        {/* FOOTER (hanya 1x di sini) */}
        <Footer />
      </body>
    </html>
  );
}

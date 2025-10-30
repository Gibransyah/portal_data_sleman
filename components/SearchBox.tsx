"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function SearchBox() {
  const [keyword, setKeyword] = useState("");
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = keyword.trim();
    if (!trimmed) return;
    router.push(`/eksplorasi?search=${encodeURIComponent(trimmed)}`);
  };

  return (
    <form onSubmit={handleSubmit} className="flex justify-center my-6">
      <input
        type="text"
        placeholder="Cari data atau dashboard..."
        className="w-[520px] max-w-full py-4 px-5 rounded-lg bg-gray-50 placeholder-gray-500 text-base text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-sm"
        value={keyword}
        onChange={e => setKeyword(e.target.value)}
      />
      <button
        type="submit"
        className="ml-3 px-6 py-3 rounded-lg bg-blue-800 hover:bg-blue-900 text-white text-base font-semibold shadow"
      >
        Cari
      </button>
    </form>
  );
}

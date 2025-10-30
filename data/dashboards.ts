import { Dashboard, LatestDashboard, HighlightCard, MapData } from "@/types";

/**
 * Kartu “Dashboard Pilihan” di beranda.
 * - title & category pakai konteks Sleman
 * - tambahkan `slug` untuk link internal /eksplorasi/[slug]
 * - image boleh diganti kapan saja (pakai placeholder dulu)
 */
export const dashboards: Dashboard[] = [
  {
    id: "1",
    title: "Overview Pariwisata",
    category: "Pariwisata",
    image: "/images/placeholder.svg",
    featured: true,
    // slug dataset CKAN yang valid:
    slug: "overview-pariwisata-kabupaten-sleman",
  },
  {
    id: "2",
    title: "Overview Lingkungan",
    category: "Lingkungan",
    image: "/images/placeholder.svg",
    featured: true,
    slug: "overview-lingkungan-kabupaten-sleman",
  },
  {
    id: "3",
    title: "Jumlah Sekolah, Guru dan Siswa",
    category: "Pendidikan",
    image: "/images/placeholder.svg",
    slug: "jumlah-sekolah-guru-dan-siswa",
  },
  {
    id: "4",
    title: "Overview Ekonomi",
    category: "Ekonomi",
    image: "/images/placeholder.svg",
    featured: true,
    slug: "overview-ekonomi-kabupaten-sleman",
  },
  // kamu bisa tambah item lain di bawah ini (tetap unik id & slug)
];

/**
 * Carousel “Dashboard Terbaru”.
 * - ganti copy, logo, & warna ke Sleman
 * - buttonLink diarahkan ke halaman eksplorasi atau slug tertentu
 */
export const latestDashboards: LatestDashboard[] = [
  {
    id: "1",
    title: "Dasbor Rekomendasi Layanan Publik",
    description:
      "Jelajahi indikator kunci dan layanan prioritas berbasis data resmi Sleman.",
    image: "/images/placeholder.svg",
    logo1: "DASHBOARD SLEMAN",
    logo2: "DISKOMINFO SLEMAN",
    buttonText: "Lihat Dasbor",
    buttonLink: "/eksplorasi", // atau ke /eksplorasi/<slug>
    bgColor: "bg-white",
  },
  {
    id: "2",
    title: "Tren Pendidikan & Kesehatan",
    description:
      "Pantau perkembangan sekolah, fasilitas kesehatan, dan capaian layanan.",
    image: "/images/placeholder.svg",
    bgColor: "bg-green-500",
  },
];

/**
 * Highlight kecil (stat ring) — sementara isi placeholder Sleman.
 * Nanti angka bisa diganti dari API/DB kamu.
 */
export const highlightCards: HighlightCard[] = [
  {
    id: "1",
    title: "Kependudukan",
    icon: "👥",
    bgColor: "bg-primary-500",
    textColor: "text-white",
    metrics: [
      { label: "Jumlah Penduduk", value: "1.2 Juta Jiwa", year: "Estimasi 2024" },
      { label: "Luas Wilayah", value: "574.82 km²" },
      { label: "Kepadatan", value: "± 2,100 Jiwa/km²", year: "Estimasi 2024" },
    ],
  },
  {
    id: "2",
    title: "Kesehatan",
    icon: "🏥",
    bgColor: "bg-white",
    textColor: "text-gray-700",
    metrics: [
      { label: "Akses Faskes", value: "100% Kapanewon", year: "2024" },
      { label: "RS/PKM", value: "Puluhan Unit", year: "2024" },
      { label: "Nakes", value: "Bertumbuh", year: "Tren 2022–2024" },
    ],
  },
  {
    id: "3",
    title: "Pendidikan",
    icon: "🎓",
    bgColor: "bg-primary-500",
    textColor: "text-white",
    metrics: [
      { label: "Sekolah (SD–SMA/SMK)", value: "Ribuan Unit", year: "2024" },
      { label: "APK/APS", value: "Tinggi", year: "2024" },
      { label: "Prestasi", value: "Stabil", year: "2024" },
    ],
  },
  {
    id: "4",
    title: "Ekonomi & UMKM",
    icon: "🏭",
    bgColor: "bg-white",
    textColor: "text-gray-700",
    metrics: [
      { label: "UMKM Terdata", value: "Ratusan Ribu", year: "2023" },
      { label: "Kontribusi Ekonomi", value: "Kuat", year: "2023" },
      { label: "Pariwisata", value: "Tumbuh", year: "2023–2024" },
    ],
  },
];

/**
 * Data peta — sesuaikan ke konteks Sleman (per-kapanewon/kalurahan).
 * Nanti sumbernya bisa diarahkan ke dataset CKAN atau DB kamu.
 */
export const mapData: MapData[] = [
  {
    id: "1",
    title: "Jumlah Penduduk per Kapanewon di Sleman",
    year: "2023",
    dataCategory: "kependudukan",
  },
  {
    id: "2",
    title: "Fasilitas Kesehatan per Kapanewon",
    year: "2023",
    dataCategory: "kesehatan",
  },
  {
    id: "3",
    title: "Sekolah (SD–SMA/SMK) per Kapanewon",
    year: "2023",
    dataCategory: "pendidikan",
  },
  {
    id: "4",
    title: "Indeks Lingkungan per Kapanewon",
    year: "2023",
    dataCategory: "lingkungan",
  },
  {
    id: "5",
    title: "UMKM Terdata per Kapanewon",
    year: "2023",
    dataCategory: "ekonomi",
  },
];

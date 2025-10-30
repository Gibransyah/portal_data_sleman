# Dashboard Data Kabupaten Sleman

![Next.js](https://img.shields.io/badge/next.js-14-black?logo=nextdotjs)
![Node.js](https://img.shields.io/badge/node-%3E=18.0.0-green?logo=node.js)
![License](https://img.shields.io/badge/license-MIT-blue)

Dashboard interaktif untuk visualisasi, eksplorasi, dan pencarian data resmi Pemerintah Kabupaten Sleman yang dibangun menggunakan Next.js (App Router) dan TypeScript.

---

## ✨ Fitur Utama

- **Landing page informatif** dengan Hero Section, search data/dashboard, dan highlight visual.
- **Pencarian cerdas** dataset/dashboard dengan input kata kunci (smart search box di halaman depan).
- **Eksplorasi berdasarkan topik:** Kesehatan, Pendidikan, Ekonomi, dll.
- **Visualisasi ringkasan & detail data** yang mudah dipahami.
- **Responsive & Mobile-Friendly**: tampil prima di smartphone maupun desktop.
- **Dark mode/Light mode** otomasis.
- **Integrasi CKAN API** (data resmi Pemkab Sleman).
- **Kontak, halaman Tentang, serta navigasi yang mudah.**

---

## 🚀 Teknologi yang Digunakan

- [**Next.js**](https://nextjs.org/) 14 (React + SSG/SSR)
- [**TypeScript**](https://www.typescriptlang.org/) (type safety)
- [**Tailwind CSS**](https://tailwindcss.com/) (utility-first styling)
- [**Lucide React**](https://lucide.dev/) (ikon modern)
- [CKAN API](https://data.slemankab.go.id/data) – Data Sleman

---

## 📦 Instalasi & Menjalankan Local

1. **Clone repository:**
    ```bash
    git clone https://github.com/username/dashboard-sleman.git
    cd dashboard-sleman
    ```
2. **Install dependencies:**
    ```bash
    npm install
    # atau
    yarn install
    ```
3. **Jalankan local dev server:**
    ```bash
    npm run dev
    # atau
    yarn dev
    ```
4. **Buka** di browser: [http://localhost:3000](http://localhost:3000)

---

## 📁 Struktur Proyek

```
.
├── app/                    # Halaman Next.js (App Router)
│   ├── layout.tsx          # Root layout aplikasi
│   ├── page.tsx            # Homepage
│   ├── tentang/            # Info dan kontak
│   └── eksplorasi/         # Fitur eksplorasi dan pencarian
├── components/             # Semua komponen UI modular
│   ├── Header.tsx
│   ├── HeroSection.tsx
│   ├── SearchBox.tsx
│   ├── DashboardGrid.tsx
│   └── ...
├── data/                   # Data statis (opsional)
├── public/                 # Aset, gambar statik
├── types/                  # Definisi TypeScript
├── .gitignore
├── README.md
└── ...
```

---

## 🔗 Data

- **Sumber utama:** [Portal Data Terbuka Sleman (CKAN)](https://data.slemankab.go.id/data)
- Data bisa di-fetch otomatis (menggunakan API) atau menggunakan dummy di `data/dashboards.ts` saat pengembangan.

---

## ⚙️ Kustomisasi

- **Ubah branding/logo/kata-kata:** edit komponen di `components/` atau ganti konten di halaman `app/`.
- **Ubah tema/warna:** modifikasi di `tailwind.config.ts`.
- **Tambah topik/halaman:** buat file baru di `app/` atau tambahkan props baru di halaman komponen.

---

## 🏗️ Build Production

Untuk build dan menjalankan app production:
```bash
npm run build
npm start
```

---

## 🤝 Kontribusi

Pull Request & saran sangat diterima! Silakan ajukan issue atau PR jika ada saran/fitur.

---

## 📋 Lisensi & Kredensial

MIT License © 2025 Pemerintah Kabupaten Sleman. Bebas dimodifikasi dan digunakan selama mencantumkan atribusi.

Inspirasi UI/struktur halaman dari [dashboard.jabarprov.go.id](https://dashboard.jabarprov.go.id/id/about)

---

## 📬 Kontak & Bantuan
- Email: [data@slemankab.go.id](mailto:data@slemankab.go.id)
- Info portal: [https://data.slemankab.go.id](https://data.slemankab.go.id)



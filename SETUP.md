# Panduan Setup Dashboard Jabar

## Prerequisites

- Node.js 18+ 
- npm atau yarn

## Instalasi

1. Install dependencies:
```bash
npm install
```

Atau menggunakan yarn:
```bash
yarn install
```

## Menjalankan Development Server

```bash
npm run dev
```

Aplikasi akan berjalan di [http://localhost:3000](http://localhost:3000)

## Struktur Folder

```
dashboard-jabar/
├── app/                    # Next.js app directory
│   ├── layout.tsx        # Root layout
│   ├── page.tsx          # Home page
│   ├── globals.css       # Global styles
│   ├── dashboards/       # Dashboard pages
│   └── map/              # Map visualization
├── components/           # React components
│   ├── Header.tsx
│   ├── HeroSection.tsx
│   ├── DashboardGrid.tsx
│   ├── CarouselSection.tsx
│   ├── HighlightCards.tsx
│   ├── MapVisualization.tsx
│   └── Footer.tsx
├── data/                 # Data files
│   └── dashboards.ts
├── types/                # TypeScript types
│   └── index.ts
└── public/              # Static files
    └── images/
```

## Halaman yang Tersedia

- **/** - Landing page dengan hero section dan grid dashboard
- **/dashboards** - Halaman dashboard dengan carousel dan highlight cards
- **/map** - Halaman visualisasi peta

## Mengganti Data

Edit file `data/dashboards.ts` atau koneksikan ke API Anda. Lihat `DATA_GUIDE.md` untuk detail lengkap.

## Customization

### Mengubah Warna

Edit `tailwind.config.ts`:

```typescript
colors: {
  primary: {
    500: '#2196f3', // Ganti warna ini
  },
}
```

### Menambahkan Halaman Baru

```bash
# Buat folder baru di app/
mkdir app/new-page

# Buat file page.tsx
touch app/new-page/page.tsx
```

## Build untuk Production

```bash
npm run build
npm start
```

## Deployment

### Vercel (Recommended)

1. Push ke GitHub
2. Import di Vercel
3. Deploy otomatis

### Manual Deployment

```bash
npm run build
# Upload folder .next ke hosting Anda
```

## Troubleshooting

### Error: module not found

```bash
rm -rf node_modules
npm install
```

### Port already in use

```bash
# Gunakan port berbeda
npm run dev -- -p 3001
```

### Style tidak tampil

Periksa apakah Tailwind CSS sudah diinstal dan diimport di `globals.css`

## Support

Untuk pertanyaan atau bantuan, silakan hubungi tim development.



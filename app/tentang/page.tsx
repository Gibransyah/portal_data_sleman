"use client";

export default function TentangPage() {
  return (
    <main className="min-h-screen bg-blue-50 text-blue-950">
      {/* Hero */}
      <section className="pt-28 pb-14 px-6 bg-gradient-to-b from-blue-700 to-blue-600 text-white">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-extrabold leading-tight">
            Tentang Portal Data Kabupaten Sleman
          </h1>
          <p className="mt-4 text-blue-100 max-w-3xl text-lg">
            Portal ini menyajikan data resmi Pemerintah Kabupaten Sleman dalam
            bentuk dashboard interaktif untuk mendukung perumusan kebijakan,
            perencanaan, dan evaluasi pembangunan yang berbasis data.
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="px-6 py-12">
        <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-8">
          {/* Misi */}
          <div className="md:col-span-2 space-y-10">
            <div className="bg-white rounded-2xl p-6 md:p-8 border border-blue-200">
              <h2 className="text-2xl font-bold mb-3">Misi</h2>
              <p className="text-blue-800/80">
                Menyediakan akses data yang akurat, mutakhir, dan mudah dipahami
                untuk mendorong tata kelola pemerintahan yang transparan,
                partisipatif, dan berorientasi hasil di Kabupaten Sleman.
              </p>
              <ul className="list-disc pl-6 mt-4 space-y-2 text-blue-800/80">
                <li>Mempermudah penelusuran dan pemanfaatan data lintas perangkat daerah.</li>
                <li>Menyajikan ringkasan visual agar pengambil keputusan bergerak cepat.</li>
                <li>Mendorong kolaborasi pemerintah, akademisi, dunia usaha, dan masyarakat.</li>
              </ul>
            </div>

            {/* Prinsip */}
            <div className="bg-white rounded-2xl p-6 md:p-8 border border-blue-200">
              <h2 className="text-2xl font-bold mb-3">Prinsip</h2>
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="p-4 rounded-xl bg-blue-50 border border-blue-200">
                  <h3 className="font-semibold">Keterbukaan & Transparansi</h3>
                  <p className="text-sm mt-1 text-blue-700/80">
                    Data dan metodologi disajikan secara terbuka sejauh tidak melanggar ketentuan privasi dan keamanan.
                  </p>
                </div>
                <div className="p-4 rounded-xl bg-blue-50 border border-blue-200">
                  <h3 className="font-semibold">Kualitas & Keandalan</h3>
                  <p className="text-sm mt-1 text-blue-700/80">
                    Mengutamakan keakuratan, konsistensi, dan pembaruan berkala dengan sumber resmi.
                  </p>
                </div>
                <div className="p-4 rounded-xl bg-blue-50 border border-blue-200">
                  <h3 className="font-semibold">Kemudahan Akses</h3>
                  <p className="text-sm mt-1 text-blue-700/80">
                    Navigasi sederhana, pencarian cepat, dan dokumentasi ringkas agar data mudah dipakai.
                  </p>
                </div>
                <div className="p-4 rounded-xl bg-blue-50 border border-blue-200">
                  <h3 className="font-semibold">Keberlanjutan</h3>
                  <p className="text-sm mt-1 text-blue-700/80">
                    Pengelolaan jangka panjang dengan mekanisme pemutakhiran dan pemantauan kualitas.
                  </p>
                </div>
              </div>
            </div>

            {/* Sumber Data */}
            <div className="bg-white rounded-2xl p-6 md:p-8 border border-blue-200">
              <h2 className="text-2xl font-bold mb-3">Sumber Data</h2>
              <p className="text-blue-800/80">
                Data bersumber dari perangkat daerah di lingkungan Pemerintah Kabupaten Sleman
                serta instansi terkait. Portal data terbuka utama dapat diakses di:
              </p>
              <ul className="list-disc pl-6 mt-3 space-y-2">
                <li>
                  <a className="text-blue-700 hover:underline" href="https://data.slemankab.go.id/data" target="_blank" rel="noreferrer">
                    Portal Data Terbuka Kabupaten Sleman
                  </a>
                </li>
              </ul>
              <p className="text-sm text-blue-700/70 mt-4">
                Catatan: Beberapa data mungkin mengalami penyesuaian format dan agregasi
                guna penyajian ringkas di dashboard.
              </p>
            </div>

            {/* Fitur Portal */}
            <div className="bg-white rounded-2xl p-6 md:p-8 border border-blue-200">
              <h2 className="text-2xl font-bold mb-3">Fitur Portal</h2>
              <ul className="grid sm:grid-cols-2 gap-3">
                <li className="p-4 rounded-xl bg-blue-50 border border-blue-200">
                  <span className="font-semibold">Pencarian cerdas</span>
                  <p className="text-sm text-blue-700/80 mt-1">Cari dataset dan dashboard berdasarkan kata kunci/topik.</p>
                </li>
                <li className="p-4 rounded-xl bg-blue-50 border border-blue-200">
                  <span className="font-semibold">Ringkasan visual</span>
                  <p className="text-sm text-blue-700/80 mt-1">Visualisasi yang memudahkan pemahaman cepat.</p>
                </li>
                <li className="p-4 rounded-xl bg-blue-50 border border-blue-200">
                  <span className="font-semibold">Detail dataset</span>
                  <p className="text-sm text-blue-700/80 mt-1">Akses ke portal asal dan tautan unduhan bila tersedia.</p>
                </li>
                <li className="p-4 rounded-xl bg-blue-50 border border-blue-200">
                  <span className="font-semibold">Topik & kategori</span>
                  <p className="text-sm text-blue-700/80 mt-1">Jelajahi berdasarkan topik seperti kesehatan, pendidikan, dan lainnya.</p>
                </li>
              </ul>
            </div>
          </div>

          {/* Sidebar Info */}
          <aside className="space-y-6">
            <div className="bg-white rounded-2xl p-6 border border-blue-200">
              <h3 className="text-lg font-bold mb-2">Kontak</h3>
              <p className="text-sm text-blue-800/80">
                Saran, kolaborasi, atau pertanyaan terkait data:
              </p>
              <ul className="mt-3 space-y-2 text-sm">
                <li>
                  Email: <a href="mailto:data@slemankab.go.id" className="text-blue-700 hover:underline">data@slemankab.go.id</a>
                </li>
                <li>
                  Website: <a href="https://www.slemankab.go.id" target="_blank" rel="noreferrer" className="text-blue-700 hover:underline">slemankab.go.id</a>
                </li>
              </ul>
            </div>

            <div className="bg-white rounded-2xl p-6 border border-blue-200">
              <h3 className="text-lg font-bold mb-2">Kebijakan Data</h3>
              <p className="text-sm text-blue-800/80">
                Penggunaan data mengikuti ketentuan yang berlaku di Pemerintah Kabupaten Sleman
                serta peraturan perundangan terkait keterbukaan informasi publik dan perlindungan data.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-6 border border-blue-200">
              <h3 className="text-lg font-bold mb-2">Referensi</h3>
              <p className="text-sm text-blue-800/80">
                Inspirasi antarmuka dan struktur halaman merujuk pada praktik baik dari berbagai portal data, termasuk
                <a href="https://dashboard.jabarprov.go.id/id/about" target="_blank" rel="noreferrer" className="text-blue-700 hover:underline"> halaman Tentang Dashboard Jabar</a>.
              </p>
            </div>
          </aside>
        </div>
      </section>
    </main>
  );
}

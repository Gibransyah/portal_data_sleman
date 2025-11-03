# 🚀 Panduan Deploy Dashboard Data Sleman

Dokumentasi lengkap untuk mempublikasikan portal Dashboard Data Kabupaten Sleman agar dapat diakses oleh semua orang.

---

## ✅ Persiapan Sebelum Deploy

### 1. Pastikan Semua File Sudah Siap
- ✅ Source code sudah clean dan tidak ada error
- ✅ `.gitignore` sudah benar (tidak upload `.env`, `node_modules`, dll)
- ✅ `package.json` sudah sesuai
- ✅ README.md sudah lengkap

### 2. Test Local Build
Sebelum deploy, test build production di local:
```bash
npm run build
npm start
```
Buka http://localhost:3000 dan pastikan tidak ada error.

---

## 🎯 Opsi Hosting

### **Opsi 1: Vercel (DIREKOMENDASIKAN) ⭐**

**Keuntungan:**
- ⚡ **GRATIS** untuk project kecil-menengah
- 🚀 Deploy dalam hitungan detik
- 🔒 SSL otomatis
- 🌍 CDN global (cepat di mana saja)
- 📊 Analytics gratis
- 🔄 Auto-deploy dari GitHub

**Cara Deploy:**

#### A. Via Website Vercel

1. **Buat akun di Vercel:**
   - Kunjungi: https://vercel.com
   - Daftar dengan GitHub/GitLab/Bitbucket

2. **Push code ke GitHub** (jika belum):
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin https://github.com/username/dashboard-sleman.git
   git push -u origin main
   ```

3. **Import project ke Vercel:**
   - Klik "Add New" → "Project"
   - Pilih repository GitHub Anda
   - Klik "Import"

4. **Konfigurasi (default sudah OK):**
   - Framework Preset: **Next.js**
   - Root Directory: `./`
   - Build Command: `npm run build` (otomatis)
   - Output Directory: `.next` (otomatis)

5. **Deploy:**
   - Klik "Deploy"
   - Tunggu proses build (2-3 menit)
   - Setelah selesai, dapatkan URL: `https://dashboard-sleman.vercel.app`

6. **Setup Custom Domain (Opsional):**
   - Pergi ke Settings → Domains
   - Masukkan domain: `dashboard.slemankab.go.id`
   - Ikuti instruksi DNS di hosting domain

#### B. Via Command Line

```bash
# Install Vercel CLI
npm i -g vercel

# Login
vercel login

# Deploy
vercel

# Follow prompts:
# ? Set up and deploy? Yes
# ? Which scope? (pilih akun Anda)
# ? Link to existing project? No
# ? What's your project's name? dashboard-sleman
# ? In which directory is your code? ./

# Production deploy
vercel --prod
```

**URL Hasil:**
- Preview: `https://dashboard-sleman-[hash].vercel.app`
- Production: `https://dashboard-sleman.vercel.app`

---

### **Opsi 2: Netlify**

**Keuntungan:**
- Gratis untuk project kecil
- Deploy otomatis dari GitHub
- SSL otomatis
- CDN global

**Cara Deploy:**

1. Buat akun: https://app.netlify.com
2. Push code ke GitHub
3. Klik "Add new site" → "Import from Git"
4. Pilih GitHub repo
5. Build settings:
   - Build command: `npm run build`
   - Publish directory: `.next`
6. Deploy

---

### **Opsi 3: Cloud VPS (DigitalOcean, AWS, dll)**

**Jika butuh kontrol penuh:**

1. **Sewa VPS:**
   - DigitalOcean: https://www.digitalocean.com (mulai $6/bulan)
   - AWS EC2: https://aws.amazon.com
   - Vultr: https://www.vultr.com

2. **Setup Server:**
   ```bash
   # Install Node.js & Nginx
   sudo apt update
   sudo apt install nodejs npm nginx -y

   # Clone repo
   git clone https://github.com/username/dashboard-sleman.git
   cd dashboard-sleman

   # Install dependencies
   npm install

   # Build
   npm run build

   # Install PM2 untuk run production
   npm install -g pm2
   pm2 start npm --name "dashboard-sleman" -- start
   pm2 save
   pm2 startup

   # Setup Nginx reverse proxy
   sudo nano /etc/nginx/sites-available/dashboard-sleman
   ```

   Isi Nginx config:
   ```nginx
   server {
       listen 80;
       server_name dashboard.slemankab.go.id;

       location / {
           proxy_pass http://localhost:3000;
           proxy_http_version 1.1;
           proxy_set_header Upgrade $http_upgrade;
           proxy_set_header Connection 'upgrade';
           proxy_set_header Host $host;
           proxy_cache_bypass $http_upgrade;
       }
   }
   ```

   ```bash
   # Enable site
   sudo ln -s /etc/nginx/sites-available/dashboard-sleman /etc/nginx/sites-enabled/
   sudo nginx -t
   sudo systemctl restart nginx

   # Install SSL dengan Let's Encrypt
   sudo apt install certbot python3-certbot-nginx -y
   sudo certbot --nginx -d dashboard.slemankab.go.id
   ```

---

## 🔒 Security Checklist

Setelah deploy, pastikan:

- ✅ **Tidak ada file `.env` di GitHub**
- ✅ **HTTPS aktif** (SSL certificate)
- ✅ **Environment variables** di-set di dashboard hosting (jika ada)
- ✅ **Rate limiting** aktif (otomatis di Vercel/Netlify)
- ✅ **CORS** sudah benar jika fetch dari API eksternal
- ✅ **Content Security Policy** di-set di `next.config.js` (opsional)

---

## 📊 Monitoring & Analytics

Setelah deploy, setup monitoring:

1. **Vercel Analytics** (otomatis tersedia)
2. **Google Analytics** (jika perlu)
3. **Sentry** untuk error tracking (opsional)

---

## 🐛 Troubleshooting

### Build Error
```bash
# Hapus cache dan rebuild
rm -rf .next node_modules
npm install
npm run build
```

### Deploy Lambat
- Gunakan CDN (Vercel/Netlify sudah termasuk)
- Optimize images (gunakan Next.js Image component)
- Check bundle size dengan `npm run build --analyze`

### Domain Tidak Jalan
- Check DNS settings (A record atau CNAME)
- Tunggu propagasi DNS (bisa sampai 24 jam)
- Clear browser cache

---

## 📈 Post-Deploy

Setelah sukses deploy:

1. ✅ Test semua fitur di production
2. ✅ Share URL ke stakeholders
3. ✅ Dokumentasi akses untuk admin
4. ✅ Setup backup (otomatis di Vercel/Netlify)
5. ✅ Monitoring traffic & errors

---

## 💡 Tips Pro

- **Auto-deploy:** Setiap push ke `main` branch akan auto-deploy (Vercel/Netlify)
- **Preview Deploy:** Setiap PR akan dapat preview URL otomatis
- **Rollback:** Vercel/Netlify bisa rollback ke versi sebelumnya
- **Environment:** Bisa set staging/production environment variables

---

## 📞 Support

Jika ada masalah:
- Vercel Support: https://vercel.com/support
- Netlify Support: https://www.netlify.com/support/
- Check logs di dashboard hosting Anda

---

**Selamat! Project Anda sekarang sudah live dan bisa diakses oleh semua orang! 🎉**


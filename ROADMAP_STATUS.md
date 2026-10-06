# ☕ KopiFinder Mobile - Status Proyek & Roadmap Pengembangan

Dokumen ini berisi rangkuman status pengerjaan aplikasi **KopiFinder**, penjelasan arsitektur data, serta daftar lengkap hal-hal yang belum selesai untuk persiapan rilis publik (*Production-Ready*).

---

## ✅ Bagian 1: Yang Sudah Selesai 100%

### 1. Frontend (Tampilan & Interaksi Pengguna)
- [x] **17 Layar Lengkap:** Onboarding, Sign In, Sign Up, Home, Detail Kafe, Peta, Passport Digital, AI Barista Matchmaker, Review Cupping, Voucher Diskon, Profil User, dll.
- [x] **Filter Sliders & Bottom Sheet:** Filter interaktif untuk harga, rating minimal (4.5+, 4.8+), fasilitas (*Wi-Fi kencang, colokan banyak, roastery, pet friendly*), dan sorting jarak/rating.
- [x] **Simulator Frame Mobile:** Opsi toggle tampilan frame smartphone iOS (iPhone 16 Pro) dan Android di browser.
- [x] **District Selector Terhubung:** Pilihan wilayah (*Senopati, Menteng, Dharmawangsa*) otomatis tersinkronisasi dengan daftar kafe di Home.
- [x] **Penyimpanan Lokal:** Progres user tidak hilang saat halaman di-refresh.

### 2. Database (SQLite + Prisma ORM)
- [x] **Database File:** File lokal SQLite di `prisma/dev.db` (ringan, tanpa perlu install server database terpisah).
- [x] **Skema Tabel Lengkap (`prisma/schema.prisma`):**
  - `User`: Profil, level, XP poin, stempel passport.
  - `Cafe`: Profil roastery, fasilitas, rating, spesifikasi Wi-Fi & colokan.
  - `MenuItem`: Daftar menu kopi filter (V60, Cold Drip), espresso, dan pastry.
  - `Stamp`: Catatan stempel passport yang telah divalidasi per user.
  - `CuppingReview`: Catatan rasa ulasan kopi (*SCA sensory notes*).
  - `SavedCafe`: Bookmark kafe favorit.
- [x] **Seeder Data (`prisma/seed.ts`):** Terisi 5 kafe roastery Jakarta, puluhan menu seduhan, dan data awal user.

### 3. Backend REST API (Express.js + TypeScript)
- [x] **Server Aktif (`server/index.ts`):** Berjalan di port `3001` dengan Hot Reloading (`tsx watch`).
- [x] **Endpoint REST API:**
  - `GET /api/health` → Status server & konektivitas database SQLite.
  - `GET /api/cafes` → Query pencarian dan filter kafe dinamis.
  - `GET /api/cafes/:id` → Detail lengkap kafe dan menu seduhannya.
  - `GET /api/user` & `PUT /api/user` → Manajemen profil pengguna.
  - `POST /api/user/bookmark` → Toggle simpan/hapus bookmark kafe di database.
  - `POST /api/stamps` → Klaim stempel passport digital (+150 Poin Perk).
  - `POST /api/reviews` → Kirim ulasan cupping kopi (+200 Poin Perk).
  - `POST /api/ai/match` → Algoritma rekomendasi Barista AI.
- [x] **Interactive API Tester Web GUI:** Halaman pengujian 1-klik di `http://localhost:3001/api/docs`.
- [x] **Full-Stack Integration:** Frontend (port 3000) dan Backend (port 3001) terhubung via proxy Vite.

---

## ☕ Bagian 2: Penjelasan Data Kafe (Sekarang vs Aplikasi Riil)

### Dari mana data kafe yang ada sekarang?
Data 5 kafe saat ini adalah **data kurasi manual** yang dimasukkan melalui script seeder database (`prisma/seed.ts`). Kafenya adalah roastery nyata di Jakarta (*Tanamera Senopati, Giyanti Menteng, Anomali, Kroma, Two Roasters*), namun daftar menu, foto, dan spesifikasi Wi-Fi-nya di-input manual sebagai sampel awal.

### Dari mana data kafe diambil jika aplikasi sudah riil (Production)?
1. **Google Places API:** Menarik data otomatis dari Google Maps (nama kafe, alamat, foto, rating, dan jam operasional) berdasarkan radius GPS pengguna.
2. **Dashboard Admin / Portal Mitra Kafe:** Pemilik kafe atau tim internal mendaftarkan kafenya sendiri melalui form web admin khusus.
3. **Crowdsourcing Komunitas:** Pengguna aplikasi dapat mengajukan kedai kopi baru melalui fitur *"Tambah Kafe Baru"*.

---

## 📋 Bagian 3: Daftar Lengkap Hal yang Belum Ada / Masih Kurang (Roadmap Production)

Jika Anda ingin membawa aplikasi ini dari tahap **Prototipe** menuju tahap **Rilis Publik (Production-Ready)**, berikut daftar hal yang masih perlu dikerjakan:

### 1. 🗄️ Konten & Kelengkapan Data
- [x] **Arsitektur Data Modular & Cakupan Seluruh Jakarta:** Data kini dipecah rapi menjadi 7 file JSON modular di `src/data/` (cafes, districts, cuppingPosts, badges, vouchers, beanStory, userProfile) dan mencakup 5 penjuru Jakarta (Jaksel, Jakpus, Jakbar, Jakut, Jaktim) serta ter-seed ke database SQLite.
- [ ] **Penambahan Data Skala Besar (Ratusan Kafe):** Saat ini tersedia kurasi perwakilan tiap penjuru Jakarta. Dapat ditambah lebih masif seiring onboarding mitra.
- [ ] **Belum Ada Dashboard Admin / CMS:** Belum tersedia portal web bagi pemilik kedai kopi untuk mengelola menu, foto, dan event promosi mereka sendiri.
- [ ] **Belum Ada Integrasi Google Places API:** Data kafe belum tersinkronisasi otomatis dari database Google Maps.

### 2. 📱 Format Aplikasi (Mobile vs Web)
- [ ] **Masih Berjalan di Browser Web:** Saat ini aplikasi masih berupa prototipe web simulator di browser.
- [ ] **Export ke Native Mobile (React Native / Expo):** Memindahkan kode komponen ke framework **Expo** murni agar dapat di-build menjadi file installer Android (**`.apk`**) atau iOS (**`.ipa`**) untuk di-publish ke Google Play Store / App Store.

### 3. ⚙️ Fitur-Fitur di Dalam Aplikasi
- [ ] **Peta GPS Interaktif Asli (Tab Map):**
  - Layar peta saat ini masih berupa gambar ilustrasi jalanan vektor (SVG).
  - Perlu dipasang **Google Maps SDK / Mapbox / Leaflet** asli yang dapat membaca lokasi GPS pengguna secara *real-time* ("Lokasi Saya Saat Ini") dan menampilkan rute navigasi jalan kaki/kendaraan.
- [ ] **Scanner QR Code Kamera Asli:**
  - Layar *Active Counter Session* saat ini menggunakan simulasi tombol klik.
  - Perlu mengintegrasikan akses kamera perangkat untuk memindai QR code fisik yang ada di meja kasir barista.
- [ ] **Upload Foto Nyata (Cloud Storage):**
  - Form ulasan kopi (*Log Visit*) saat ini masih menggunakan URL gambar sampel.
  - Perlu menambahkan integrasi penyimpanan cloud (seperti Cloudinary atau AWS S3) agar pengguna bisa mengambil foto langsung dari kamera HP atau galeri.
- [ ] **Sistem Autentikasi Multi-User Nyata:**
  - Saat ini aplikasi otomatis menggunakan akun sampel (*Maya Putri*).
  - Perlu membuat sistem Registrasi Akun baru, verifikasi OTP nomor HP / Email, atau Google Sign-In dengan pengamanan token JWT.
- [ ] **Gemini API Key Asli:**
  - AI Barista saat ini berjalan dengan algoritma heuristik lokal.
  - Memasukkan API Key Google Gemini resmi ke file `.env` agar narasi rekomendasi dibuat langsung oleh model LLM Gemini secara *live*.

### 4. 🌐 Server & Hosting (Online)
- [ ] **Masih Berjalan di Komputer Lokal (`localhost`):**
  - Server Express dan database SQLite masih berada di komputer lokal.
  - Perlu di-deploy ke server online (misalnya Railway, Render, atau VPS) dan database cloud (seperti PostgreSQL Supabase / Neon) agar dapat diakses oleh publik 24/7 tanpa bergantung pada laptop lokal.

---

*Terakhir diperbarui: 6 Oktober 2026*

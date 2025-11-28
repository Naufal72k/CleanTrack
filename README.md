# webdesign_DNEDevs_technoversary25

## 👨‍💻 Identitas Tim

**Nama Tim:** DNE Devs  
**Instansi:** Universitas Mataram

**Anggota Tim:**

1. **Naufal Ihsanul Islam**
2. **Pudael Zikri**
3. **Valerin Jesika Dewi**

---

## 🌍 Tentang CleanTrack

**CleanTrack** adalah platform _Smart City_ inovatif yang dirancang untuk merevolusi manajemen kebersihan kota melalui partisipasi aktif warga. Aplikasi ini mengubah cara masyarakat melaporkan masalah sampah dengan pendekatan teknologi yang modern, transparan, dan bermanfaat.

### Fitur Unggulan:

- **🤖 AI-Powered Reporting:** Simulasi deteksi objek cerdas untuk memvalidasi foto laporan sampah secara otomatis sebelum dikirim.
- **📍 Geolocation Precision:** Integrasi GPS (_Leaflet.js_) untuk mengunci lokasi kejadian secara akurat.
- **🎁 Eco-Reward System:** Sistem gamifikasi dimana warga mendapatkan poin untuk setiap laporan valid, yang bisa ditukar dengan token listrik atau pulsa.
- **🗺️ Transparansi Publik:** Peta persebaran sampah yang dapat diakses publik untuk memonitor kinerja kebersihan kota.
- **🛡️ Admin War Room:** Dashboard pusat kendali bagi petugas untuk memantau statistik dan memvalidasi laporan secara _real-time_.

---

## 🛠️ Teknologi yang Digunakan

Aplikasi ini dibangun menggunakan **Native Web Technologies** (Vanilla) untuk performa yang ringan tanpa perlu instalasi backend yang rumit.

- **Frontend:** HTML5, CSS3, JavaScript (ES6+).
- **Styling:** [Tailwind CSS](https://tailwindcss.com/) (CDN).
- **Maps:** [Leaflet.js](https://leafletjs.com/) (OpenStreetMap).
- **Animations:** [AOS](https://michalsnik.github.io/aos/).
- **Charts:** [Chart.js](https://www.chartjs.org/).
- **Database:** `sessionStorage`.

---

## 🚀 Cara Instalasi & Menjalankan Project

Aplikasi ini **SIAP PAKAI** (Ready to use). Tidak perlu instalasi `npm`, `node_modules`, atau database server.

### Langkah-langkah:

1.  **Buka Folder Proyek** di Visual Studio Code (VS Code).
2.  Pastikan ekstensi **Live Server** (by Ritwick Dey) sudah terinstal di VS Code Anda.
3.  Cari file **`index.html`**.
4.  Klik kanan pada file tersebut, lalu pilih **"Open with Live Server"**.
5.  Selesai! Website akan otomatis terbuka di browser Anda.

> **Catatan Penting:** Wajib menggunakan _Live Server_ agar fitur simulasi database (`sessionStorage`) dan modul JavaScript dapat berjalan lancar tanpa terblokir kebijakan keamanan browser (CORS).

---

## 🔐 Akses Akun Demo (Credentials)

Gunakan akun berikut untuk menguji fitur aplikasi sebagai juri/pengguna:

### 1. Akun Administrator (Super Admin)

_Akses ke Dashboard, Validasi Laporan, dan Manajemen User._

- **Username:** `admin`
- **Password:** `admin123`

### 2. Akun Warga (User)

_Akses ke Pelaporan, Peta Publik, dan Penukaran Poin._

- **Username:** `naufal`
- **Password:** `123`

_(Bisa juga bisa mendaftar akun baru melalui menu Register)_

---

## 📂 Struktur Folder

```text
/webdesign_DNEDevs_technoversary25
│
├── 📄 index.html                  # [LANDING] Halaman Utama & Promosi
├── 📄 Login.html                  # [AUTH] Halaman Masuk Akun
├── 📄 Register.html               # [AUTH] Halaman Pendaftaran Warga
│
├── 📂 Core Logic (JavaScript)
│   ├── 📜 user-utils.js           # Sistem Database Simulasi (User, Laporan, Transaksi)
│   ├── 📜 user-header.js          # Komponen Navigasi & Sidebar User
│   ├── 📜 admin-utils.js          # Sistem Database Admin & Export CSV
│   └── 📜 admin-header.js         # Komponen Navigasi Admin
│
├── 📂 Halaman Warga (User Interface)
│   ├── 📄 MyWasteReports.html     # Dashboard Pribadi Warga
│   ├── 📄 ReportNew.html          # Form Pelaporan (Kamera AI & Peta)
│   ├── 📄 UserProfile.html        # Profil, Dompet Poin & Katalog Hadiah
│   ├── 📄 MapView.html            # Peta Transparansi Publik
│   └── 📄 Notifications.html      # Pusat Notifikasi Status Laporan
│
├── 📂 Halaman Admin (Petugas)
│   ├── 📄 AdministratorDashboard.html # Dashboard Statistik Utama
│   ├── 📄 AdminReports.html       # Tabel Manajemen Laporan Masuk
│   ├── 📄 AdminReportDetail.html  # Halaman Validasi Laporan
│   ├── 📄 AdminMap.html           # War Room (Peta Operasional Live)
│   ├── 📄 AdminUsers.html         # Manajemen Data Pengguna
│   └── 📄 AdminRewards.html       # Manajemen Stok Hadiah
│
└── 📄 README.md                   # Dokumentasi Proyek
```

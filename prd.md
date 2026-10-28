# PRODUCT REQUIREMENT DOCUMENT (PRD)
## Cermin Kreatif — Social Media & Video Production Agency Platform

| Dokumen Spesifikasi | Detail Produk & Sistem Operasional Produksi |
| :--- | :--- |
| **Nama Produk** | Cermin Kreatif Digital Operating Platform (Client Portal & Agency Command Center) |
| **Versi Dokumen** | v4.0 (Production-Grade Architecture & Multi-Tenant Specification) |
| **Tumpukan Teknologi (Tech Stack)** | Next.js (App Router) + shadcn/ui + Tailwind CSS + PostgreSQL (Supabase) + GSAP |
| **Domain & Hosting** | Domain Utama Resmi Klien (`cerminkreatif.com`), Deployed via Vercel Edge Network |
| **Target Pengguna** | 1. Klien Retainer (Brand Owner, Marketing Director, PIC Bisnis)<br>2. Tim Internal Agensi (Creative Director, Editor, Videografer, Account Manager) |
| **Status Dokumen** | Disetujui untuk Tahap Implementasi (*Approved for Production Sprint*) |

---

## 1. Executive Summary & Visi Produk

### 1.1 Permasalahan Industri Agensi Kreatif (Problem Statement)
Kolaborasi retainer antara agensi video/social media dan pemilik brand sering kali menghadapi 4 hambatan klasik yang menguras waktu dan profit:
1. **Chat WhatsApp Tercecer & Berantakan:** Diskusi naskah, draf video revisi V1–V3, link Google Drive, dan revisi cover hilang tertimbun obrolan chat harian.
2. **Ketidakjelasan Penanggung Jawab (*Ball-in-Court Confusion*):** Agensi menunggu persetujuan (*approval*), sementara klien mengira tim agensi masih proses *editing*. Hal ini memicu keterlambatan posting yang merusak algoritma akun klien.
3. **Kebocoran Jam Kerja (*Scope Creep*):** Tidak ada batas kuota yang transparan membuat klien meminta revisi tanpa batas atau menambah video di luar kontrak tanpa penyesuaian biaya (*add-on billing*).
4. **Birokrasi Keuangan yang Mengganjal Produksi:** Jadwal syuting studio tertunda karena tim internal menunggu konfirmasi manual dari divisi finance terkait apakah klien sudah transfer Down Payment (DP) atau belum.

### 1.2 Solusi Produk (Product Solution)
Cermin Kreatif Platform menghadirkan **"One-Stop Agency Portal"** yang menyatukan:
- **Eksklusivitas Landing Page Publik:** Showcase portofolio berkelas tinggi dengan animasi interaktif (GSAP) dan SEO optimal untuk akuisisi klien baru.
- **Transparansi Kolaborasi Retainer:** Portal klien mandiri untuk mereview naskah/video, sistem persetujuan 1-klik (*1-Click Approval*), dan pelacakan kuota bulanan.
- **Pencegahan *Scope Creep* Otomatis:** Sistem SLA revisi (maksimal 2 putaran per draf) dan fitur pengajuan *Add-on Quota* langsung dari portal.
- **Pintu Akses Terproteksi (DP-Gated Access):** Fitur kalender kerja aktif otomatis segera setelah bukti transfer DP Termin 1 (50%) diverifikasi di dashboard admin.
- **Pusat Komando Admin Multi-Tenant:** Manajemen operasional multi-brand dengan *5-Stage Kanban SOP*, kontrol kapasitas tim, dan pelacakan studio syuting di Malang.

---

## 2. Arsitektur Domain, Navigasi, & Hirarki Akses

Platform dirancang berjalan **100% di bawah domain utama murni agensi** (`cerminkreatif.com`), tanpa subdomain membingungkan, membagi area publik dan privat secara terisolasi:

```
                                ┌───────────────────────────────────────────────┐
                                │             CERMINKREATIF.COM                 │
                                └───────────────────────┬───────────────────────┘
                                                        │
                      ┌─────────────────────────────────┴─────────────────────────────────┐
                      ▼                                                                   ▼
       ┌─────────────────────────────┐                                     ┌─────────────────────────────┐
       │   AREA PUBLIK (SEO-INDEX)   │                                     │  AREA APLIKASI (NO-INDEX)   │
       │   Rendering: SSR / SSG      │                                     │  Rendering: Auth Middleware │
       └──────────────┬──────────────┘                                     └──────────────┬──────────────┘
                      │                                                                   │
        ┌─────────────┴─────────────┐                                       ┌─────────────┴─────────────┐
        ▼                           ▼                                       ▼                           ▼
┌───────────────┐           ┌───────────────┐                       ┌───────────────┐           ┌───────────────┐
│ Landing Page  │           │ Formulir      │                       │ Portal Klien  │           │ Dasbor Admin  │
│ `/`           │           │ Brief `/brief`│                       │ `/portal`     │           │ `/admin`      │
└───────────────┘           └───────────────┘                       └───────┬───────┘           └───────┬───────┘
                                                                            │                           │
                                                            ┌───────────────┴───────────────┐           ▼
                                                            ▼                               ▼    ┌─────────────┐
                                                    ┌───────────────┐               ┌───────────┐│Multi-Tenant │
                                                    │ Mode Demo     │               │Klien Resmi││SOP & Finance│
                                                    │ (Terkunci)    │               │(Unlocked) │└─────────────┘
                                                    └───────────────┘               └───────────┘
```

### 2.1 Matriks Peran Pengguna (User Role Matrix)

| Peran (Role) | Hak Akses Rute | Kemampuan Akses Data | Proteksi & Validasi |
| :--- | :--- | :--- | :--- |
| **Pengunjung Publik** | `/`, `/about`, `/services`, `/brief` | Membaca portofolio, mengirimkan formulir brief awal. | Rate limiting per IP, Google indexing aktif. |
| **Klien Mode Demo** | `/portal` (Status: `is_unlocked: false`) | Melihat overview simulasi; menu Kalender & Video terkunci (memicu ajakan bayar DP/WhatsApp). | RLS membaca mock/demo row saja. |
| **Klien Resmi (Retainer)** | `/portal` (Status: `is_unlocked: true`) | Akses penuh kalender brand miliknya, approve video, submit revisi draf, request konten mandiri, akses Google Drive 4K, dan lihat invoice. | Terisolasi ketat oleh **Row-Level Security (RLS)** via `auth.uid() = client_user_id`. |
| **Tim Agensi (Admin)** | `/admin` (Role: `admin` / `creative_lead`) | Manajemen multi-brand, kanban 5-tahap, approval invoice DP, kontrol kuota, studio tasks, dan pengaturan beban tim. | Middleware proteksi role `admin`, full access bypass RLS via Service Role Key. |

---

## 3. SOP Bisnis Standar Agensi & Siklus Konten (Agency Business Logic)

Untuk menjamin operasional agensi berjalan sehat dan akuntabel, platform mengadopsi standar operasional agensi kelas atas:

### 3.1 Siklus Hidup Konten 5 Tahap (*The 5-Stage Content Lifecycle*)

```
[ 1. Draf Naskah ] ──▶ [ 2. Produksi / Edit ] ──▶ [ 3. Review Klien ] ──▶ [ 5. Disetujui ]
  (Copywriter)          (Studio & Editor)         (Bola di Klien)        (Siap Tayang H-1)
                                                         │
                                                         ▼ (Maks. 2x Putaran)
                                                  [ 4. Revisi Editor ]
                                                    (Bola di Agensi)
```

1. **Tahap 1: Riset & Naskah (Scripting):** Tim kreatif menyusun konsep, hook, dan alur naskah. Klien juga dapat menginisiasi naskah melalui tombol *Request Konten Mandiri*.
2. **Tahap 2: Produksi & Editing:** Naskah dieksekusi di Studio Malang, di-edit oleh tim video (*rough cut* + *color grading* + *sound design*).
3. **Tahap 3: Review Klien (*Ball in Client's Court*):** Draf video V1 diunggah ke portal. Notifikasi otomatis dikirim ke klien. Status: `Menunggu Review`.
4. **Tahap 4: Revisi Editor (*Ball in Agency's Court*):**
   - **SOP Batasan Revisi (Anti-Scope Creep):** Maksimal 2 kali putaran revisi per item konten. Revisi hanya mencakup elemen minor (teks, pemotongan detik tertentu, pergantian audio). Perubahan konsep total dihitung sebagai kuota konten baru.
   - Admin/Editor mengunggah Draf V2/V3 beserta *Catatan Solusi Perbaikan*, mengembalikan bola ke tangan klien.
5. **Tahap 5: Disetujui & Terjadwal (Scheduled & Locked):** Klien menekan `Setujui Konten (1-Click Approve)`. Konten terkunci (*Final Locked*) dan masuk antrean penayangan tim media sosial.

### 3.2 Siklus Keuangan & Kontrak Retainer
- **Termin 1 (DP 50%):** Ditagihkan saat pendaftaran / awal bulan kerja. Berfungsi sebagai syarat mutlak membuka gembok kalender kerja (`is_unlocked: true`) dan mengamankan slot jadwal syuting di Studio Malang.
- **Termin 2 (Pelunasan 50%):** Ditagihkan pada hari ke-20 siklus kerja, sebelum penyerahan master file dan pembaharuan kalender bulan berikutnya.
- **Sistem Upsell Kuota (+Slot Add-on):** Jika kuota konten habis di tengah bulan, klien dapat mengajukan *Add-on Video* (+2 Reels atau +4 Reels) yang langsung menambahkan kuota sistem dan menerbitkan invoice penyesuaian secara otomatis.

---

## 4. Spesifikasi Fungsional Per Modul

### 4.1 Halaman Publik (Landing Page & Briefing Engine)
- **Visual Branding & Interaksi GSAP:**
  - Animasi *Smooth Scroll* dan *Text Reveal* tipografi modern pada headline utama.
  - Video showcase portofolio interaktif rasio 9:16 dengan efek hover sinematik.
  - Social proof marquee logo brand klien yang pernah ditangani (*Arche, Maven, Lumen*).
- **Formulir Brief Kilat (`/brief`):**
  - Mengambil data: Nama PIC, Nama Brand, Akun Instagram, Pilihan Paket, Email, Password, dan Catatan Target/Goal.
  - Output otomatis: Membuat akun di Supabase Auth, mencatat antrean klien baru di database, menerbitkan nomor faktur proforma (`INV/2026/CK/...`), dan menghubungkan klien langsung ke chat WhatsApp PIC Agensi dengan format pesan terstruktur.

### 4.2 Portal Klien (`/portal`)
- **Mode Demo vs Mode Resmi:** Jika status `is_unlocked: false`, kartu kalender dan video menampilkan ikon gembok elegan dengan ajakan konfirmasi DP.
- **Dasbor Ikhtisar (Overview):** Kartu ringkasan pemakaian kuota (*misal: 4/12 Reels terpakai*), nama PIC Creative Lead yang bertugas, dan widget *Tindakan Diperlukan* (daftar konten pending review).
- **Kalender Distribusi Konten:**
  - **Monthly Grid View:** Matriks kalender 1–31 dengan indikator titik status warna (Hijau = Siap Tayang, Kuning = Butuh Review, Merah = Sedang Direvisi).
  - **Feed Preview 3x3:** Simulasi tata letak feed Instagram untuk memastikan harmoni visual cover.
- **Modal Review Draf & Approval (Klien):**
  - Pratinjau video rasio vertikal 9:16 dengan kontrol pemutar video bawaan.
  - Panel salinan copywriting (*Hook, Caption, Hashtags*).
  - Tombol aksi utama: `Setujui Konten (Approve)` atau `Minta Revisi` (membuka formulir masukan dengan counter revisi 1/2).
- **Vault Aset & Progres Studio:** Menampilkan bilah kemajuan syuting studio (25% Naskah, 65% Editing, 100% Selesai) dan tautan aman ke Google Drive mentahan 4K.

### 4.3 Dasbor Admin Cermin (`/admin`)
- **Multi-Tenant Brand Switcher:** Dropdown selektor untuk berpindah antar brand klien (*Maven Coffee*, *Lumen Skin Clinic*, *Arche Apparel*) secara instan dengan isolasi data terjamin.
- **Mission Control (Executive Overview):**
  - Pemantauan Total Retainer MRR aktif.
  - Radar Konten Macet (*Stalled in Review* > 48 jam) dilengkapi tombol 1-klik kirim pengingat WhatsApp ke klien.
  - Monitor kapasitas beban kerja tim internal (*misal: Dimas 85%, Farhan 92%, Reza 60%*).
- **Manajemen Konten (5-Stage Kanban SOP):**
  - Drag-and-drop atau dropdown pemindahan status antar kolom: *Draf Naskah $\rightarrow$ Produksi/Edit $\rightarrow$ Review Klien $\rightarrow$ Revisi Editor $\rightarrow$ Disetujui*.
- **Studio Ops & Production Scheduler:** Pengendali tahapan syuting tim lapangan di Studio Malang beserta penanggung jawab kamera.
- **Finansial & Verifikasi Pembayaran:**
  - Tabel antrean pembayaran DP dan pelunasan.
  - Modal inspeksi bukti transfer bank (gambar slip bayar).
  - Tombol aksi `Verifikasi & Buka Akses` yang langsung mengubah flag `is_unlocked: true` dan mengirim notifikasi aktif ke portal klien.

---

## 5. Arsitektur Database Relasional (PostgreSQL / Supabase Schema)

Data tidak lagi disimpan di mock memory frontend, melainkan menggunakan skema relasional PostgreSQL dengan dukungan **Database Migrations** dan **Row-Level Security (RLS)**.

### 5.1 ERD & Relasi Antar Tabel

```
┌─────────────────────────┐           ┌─────────────────────────┐
│     auth.users          │           │       invoices          │
│  (Supabase Auth Engine) │           ├─────────────────────────┤
└────────────┬────────────┘           │ id (UUID, PK)           │
             │ 1:1                    │ client_id (FK) ─────────┤◄───┐
             ▼                        │ amount, term, proof_url │    │
┌─────────────────────────┐           │ status: pending/paid    │    │
│  public.profiles (Users)│           └─────────────────────────┘    │
├─────────────────────────┤                                          │
│ id (UUID, PK)           │                                          │
│ email, full_name, role  │                                          │
└────────────┬────────────┘                                          │
             │ 1:1                                                   │
             ▼                                                       │
┌─────────────────────────┐                                          │
│       clients           │                                          │
├─────────────────────────┤                                          │
│ id (UUID, PK)           │                                          │
│ user_id (FK -> profiles)│◄─────────────────────────────────────────┤
│ brand_name, pic_name    │                                          │
│ package_type            │                                          │
│ reels_used, reels_max   │                                          │
│ posts_used, posts_max   │                                          │
│ is_unlocked (Boolean)   │                                          │
└────────────┬────────────┘                                          │
             │ 1:N                                                   │
             ├────────────────────────┐                              │
             ▼                        ▼                              │
┌─────────────────────────┐  ┌─────────────────────────┐             │
│        contents         │  │       video_tasks       │             │
├─────────────────────────┤  ├─────────────────────────┤             │
│ id (UUID, PK)           │  │ id (UUID, PK)           │             │
│ client_id (FK)          │  │ client_id (FK) ─────────┼─────────────┘
│ publish_date (DATE)     │  │ title, phase            │
│ title, content_type     │  │ progress (0 - 100)      │
│ stage, status           │  │ raw_drive_url, pic_name │
│ ball_in_court           │  └─────────────────────────┘
│ version, media_url      │
│ caption_text            │
└────────────┬────────────┘
             │ 1:N
             ▼
┌─────────────────────────┐
│    content_feedbacks    │
├─────────────────────────┤
│ id (UUID, PK)           │
│ content_id (FK)         │
│ sender_role: client/team│
│ message_text            │
│ created_at (TIMESTAMP)  │
└─────────────────────────┘
```

### 5.2 Spesifikasi Kolom Tabel Kunci

```sql
-- 1. TABEL PENGGUNA & AKUN SISTEM (Users & Profiles)
CREATE TABLE public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email VARCHAR(255) UNIQUE NOT NULL,
  full_name VARCHAR(100) NOT NULL,
  avatar_url TEXT,
  role VARCHAR(20) NOT NULL DEFAULT 'client', -- 'admin' (Internal Agensi) | 'client' (Brand Owner) | 'team_member'
  phone_number VARCHAR(30),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. TABEL KLIEN & KONTRAK RETAINER (Multi-Tenant Profile)
CREATE TABLE public.clients (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  pic_name VARCHAR(100) NOT NULL,
  brand_name VARCHAR(100) NOT NULL,
  instagram_handle VARCHAR(50),
  package_type VARCHAR(50) NOT NULL DEFAULT 'Growth Video',
  reels_used INT DEFAULT 0,
  reels_max INT DEFAULT 12,
  posts_used INT DEFAULT 0,
  posts_max INT DEFAULT 8,
  total_contract_value NUMERIC(12, 2) NOT NULL,
  is_unlocked BOOLEAN DEFAULT FALSE, -- Flag gembok kalender (DP verification)
  pic_assigned VARCHAR(100) DEFAULT 'Creative Director Cermin',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. TABEL KONTEN KALENDER
CREATE TABLE public.contents (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  client_id UUID REFERENCES public.clients(id) ON DELETE CASCADE,
  publish_date DATE NOT NULL,
  title VARCHAR(200) NOT NULL,
  content_type VARCHAR(50) NOT NULL DEFAULT 'Reels', -- 'Reels' | 'Carousel' | 'Single Post'
  stage VARCHAR(30) NOT NULL DEFAULT 'script', -- 'script' | 'production' | 'review' | 'revision' | 'scheduled'
  status VARCHAR(40) NOT NULL DEFAULT 'Draf Naskah',
  ball_in_court VARCHAR(20) NOT NULL DEFAULT 'agency', -- 'agency' | 'client'
  version VARCHAR(20) NOT NULL DEFAULT 'V1',
  media_url TEXT, -- Preview video atau cover thumbnail
  caption_text TEXT,
  revision_count INT DEFAULT 0, -- Counter revisi (Maksimal 2x sesuai SLA)
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. TABEL AUDIT TRAIL FEEDBACK / REVISI
CREATE TABLE public.content_feedbacks (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  content_id UUID REFERENCES public.contents(id) ON DELETE CASCADE,
  sender_role VARCHAR(20) NOT NULL, -- 'client' | 'agency'
  sender_name VARCHAR(100) NOT NULL,
  message_text TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 5. TABEL OPERASIONAL STUDIO (Malang Core)
CREATE TABLE public.video_tasks (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  client_id UUID REFERENCES public.clients(id) ON DELETE CASCADE,
  title VARCHAR(200) NOT NULL,
  phase VARCHAR(50) NOT NULL DEFAULT 'Riset & Naskah',
  progress INT NOT NULL DEFAULT 0 CHECK (progress BETWEEN 0 AND 100),
  status VARCHAR(30) NOT NULL DEFAULT 'Dalam Antrean',
  raw_drive_url TEXT,
  pic_shooter VARCHAR(100),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 6. TABEL KEUANGAN & TERMIN DP
CREATE TABLE public.invoices (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  client_id UUID REFERENCES public.clients(id) ON DELETE CASCADE,
  invoice_number VARCHAR(50) UNIQUE NOT NULL,
  term_type VARCHAR(50) NOT NULL, -- 'Termin 1 (DP 50%)' | 'Termin 2 (Pelunasan)' | 'Add-on Quota'
  amount NUMERIC(12, 2) NOT NULL,
  status VARCHAR(30) NOT NULL DEFAULT 'Menunggu Verifikasi', -- 'Menunggu Verifikasi' | 'Lunas'
  transfer_proof_url TEXT,
  verified_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW()
);
```

---

## 6. Standar Keamanan & Proteksi Data (Security Architecture)

1. **Row-Level Security (RLS) di PostgreSQL:**
   - Memastikan tidak ada celah *IDOR (Insecure Direct Object Reference)*. Klien A (`CK-091`) tidak akan pernah bisa membaca atau memperbarui data konten milik Klien B (`CK-092`), bahkan jika mereka mencoba memanipulasi kueri API melalui console browser.
   - Kebijakan RLS memverifikasi `auth.uid() = clients.user_id` secara langsung di mesin database.
2. **Penyimpanan Slip Transfer Bank Terproteksi:**
   - Bukti transfer bank berisi nomor rekening dan identitas pribadi. Disimpan di bucket privat Supabase Storage. Akses gambar hanya bisa dibuka menggunakan **Pre-Signed URLs** sementara (masa aktif 10 menit) yang di-generate server saat admin membuka modal verifikasi.
3. **Penyimpanan Video 4K Mentahan:**
   - Mentahan syuting kamera 4K studio tetap dialokasikan pada Google Drive / Cloudflare R2 folder terproteksi melalui tautan terautentikasi, menghindari beban memori berlebih pada server Next.js.
4. **Proteksi Form Publik Anti-Spam:**
   - Formulir brief publik `/brief` dilengkapi sistem *Honeypot* dan rate limiting (maksimal 5 request per jam per IP) untuk mencegah spam bot pada database dan nomor WhatsApp agensi.
5. **Enkripsi & Cookie Session:**
   - Autentikasi sesi menggunakan token JWT di dalam `httpOnly, secure, sameSite=lax` cookie, mencegah serangan Cross-Site Scripting (XSS).

---

## 7. Strategi SEO & Optimasi Mesin Pencari (Search Engine Optimization)

Agar website agensi mudah ditemukan calon klien bisnis di Google saat mencari jasa produksi video dan kelola sosial media:

### 7.1 Pembagian Arsitektur Pengindeksan (Robots Directives)
- **Halaman Publik (`/`, `/about`, `/services`, `/brief`):**
  - Diindeks penuh oleh mesin pencari (`robots: index, follow`).
  - Menggunakan SSR/SSG di Next.js untuk waktu muat halaman awal (*First Contentful Paint*) di bawah 1 detik.
- **Halaman Aplikasi Privat (`/portal/*`, `/admin/*`):**
  - Wajib memiliki header keamanan: `X-Robots-Tag: noindex, nofollow, noarchive`.
  - Terdaftar di `robots.txt` di bawah direktori `Disallow: /portal/` dan `Disallow: /admin/`.

### 7.2 Structured Data (Schema.org JSON-LD)
Tanamkan skema terstruktur di halaman depan untuk pengenalan bisnis lokal Google Search:
```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "MarketingAgency",
  "name": "Cermin Kreatif",
  "url": "https://cerminkreatif.com",
  "logo": "https://cerminkreatif.com/logo.png",
  "description": "Agensi produksi video komersial dan strategi social media retainer berbasis retensi penonton.",
  "address": {
    "@type": "PostalAddress",
    "addressLocality": "Malang",
    "addressRegion": "Jawa Timur",
    "addressCountry": "ID"
  },
  "serviceArea": "Indonesia"
}
</script>
```

### 7.3 Target Kata Kunci Utama
- *Social Media Agency Malang / Surabaya*
- *Jasa Pembuatan Video Reels & TikTok Komersial*
- *Production House Video Iklan Brand Lokal*
- *Paket Retainer Pengelolaan Instagram Brand*

---

## 8. Panduan Desain Antarmuka & Interaksi (UI/UX Guidelines)

Sesuai arahan: **Klien belum menentukan warna brand resmi**, sehingga platform mengusung pendekatan **Brand-Neutral Monochrome Architecture** (bersih, minimalis, netral, elegan, dan siap disuntik warna brand di masa depan via CSS Design Tokens):

1. **Gaya Visual Netral Monokrom (*Brand-Agnostic Minimalist Luxury*):**
   - **Kanvas Utama:** *Pure White* (`#FFFFFF`) untuk memberi kesan luas, bersih, dan profesional.
   - **Latar Sekunder / Card Surface:** *Neutral Off-White / Zinc-50* (`#FAFAFA` / `#F8FAFC`).
   - **Garis Batas (*Subtle Borders*):** Garis tepi presisi yang sangat halus dan rapi (`border-zinc-200` atau `border-neutral-200/80`). Tidak ada garis tebal yang mengganggu mata.
   - **Tipografi & Kontras:** Tipografi modern sans-serif (*Plus Jakarta Sans* / *Inter*). Teks utama menggunakan *Deep Carbon Neutral* (`#09090B`), teks sekunder/caption menggunakan *Muted Gray* (`#71717A`).
   - **Status Badge Fungsional (Netral & Muted):**
     - Menggunakan badge monokromik / *soft-tinted muted badge* dengan kontras lembut, bukan warna mencolok neon yang merusak estetika putih.
     - *Approved:* Muted soft green/neutral tag (`bg-zinc-100 text-zinc-900 border-zinc-300`).
     - *Review:* Soft amber/warm gray tag (`bg-stone-100 text-stone-800 border-stone-300`).
     - *Revision:* Soft rose/cool gray tag (`bg-slate-100 text-slate-800 border-slate-300`).
   - **Sistem Token Warna Brand Adaptif (*CSS Variable Tokens*):**
     - Seluruh warna komponen utama di-bind ke CSS variable `--primary`, `--primary-foreground`, `--accent`.
     - *Default saat ini:* Monokrom hitam-putih netral yang elegan.
     - Begitu klien memutuskan palet warna brand mereka (misal: deep navy, emerald luxury, terracotta, dll), pengembang cukup mengganti 1 baris nilai CSS variable di `globals.css` tanpa perlu mengubah kode komponen sama sekali.
2. **Koreografi Animasi (GSAP & Framer Motion):**
   - **Landing Page Publik:** Pemanfaatan **GSAP ScrollTrigger** untuk *staggered entrance* kartu portofolio video, parallax halus pada showreel, dan text-splitting pada kata kunci utama.
   - **Dashboard Klien & Admin:** Tidak menggunakan ScrollTrigger berat. Menggunakan transisi mikro yang cepat (durasi 150ms–200ms) untuk pembukaan modal, pergantian tab, dan badge notifikasi agar platform terasa instan (*snappy*).
3. **Pemberantasan Dialog Native Browser:**
   - Dilarang keras menggunakan `alert()`, `confirm()`, atau `window.prompt()`.
   - Seluruh interaksi revisi, upload bukti bayar, dan submit konten menggunakan komponen dialog modal responsif berbasis **shadcn/ui (Radix Dialog)** dengan efek *backdrop blur* halus.

---

## 9. Rencana Tahapan Rilis (Development Roadmap)

- **Sprint 1 (Pondasi & Landing Page):** Setup Next.js App Router, integrasi shadcn/ui tema putih minimalis, konfigurasi GSAP animasi, SEO metadata publik, dan form brief kilat.
- **Sprint 2 (Database & Autentikasi Supabase):** Setup schema PostgreSQL, implementasi Supabase Auth, aktivasi Row-Level Security (RLS), dan API routes.
- **Sprint 3 (Portal Klien Resmi):** Kalender bulanan, pratinjau feed 3x3, modal review draf video vertikal 9:16, audit trail revisi, dan form request konten mandiri.
- **Sprint 4 (Dasbor Komando Admin):** Multi-tenant brand switcher, Kanban SOP 5-tahap, modul verifikasi DP invoice, dan studio ops tracker.
- **Sprint 5 (Quality Assurance & Deployment):** Uji coba celah keamanan multi-tenant, optimasi skor Lighthouse SEO (target > 90), dan penautan domain resmi di Vercel.

---

*Dokumen ini merupakan panduan tunggal kebenaran arsitektur (*Single Source of Truth*) untuk pengembangan platform Cermin Kreatif.*
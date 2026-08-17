# Muhammad Alwizard — Portfolio Website

Website portfolio dibangun dengan **Next.js 14** + **Tailwind CSS** + **Prisma ORM** +
**MySQL**. Semua konten (project, sertifikat, pendidikan, pengalaman kerja, pesan
contact form) disimpan di database — jadi nambah project/sertifikat/degree baru di
kemudian hari tinggal insert data, **tanpa ubah kode sama sekali**.

---

## 1. Struktur Database

| Tabel           | Isi                                                              |
|-----------------|-------------------------------------------------------------------|
| `Project`       | Judul, kategori, deskripsi, business problem, stack, cover image  |
| `ProjectImage`  | Galeri foto tambahan per project (1 project → banyak foto)        |
| `Certificate`   | Sertifikat & training                                             |
| `Education`     | Riwayat pendidikan + status (ongoing / graduated)                 |
| `Experience`    | Pengalaman kerja/magang                                           |
| `Skill`         | Skill per kategori                                                 |
| `Message`       | Pesan masuk dari contact form                                     |

Detail lengkap ada di `prisma/schema.prisma`.

---

## 2. Setup Database MySQL (Gratis)

Pilih salah satu (rekomendasi: **PlanetScale**):

### Opsi A — PlanetScale
1. Daftar di https://planetscale.com (gratis)
2. Buat database baru, misal nama `portfolio`
3. Buka tab **Connect** → pilih **Prisma** → copy connection string-nya
4. Tempel ke file `.env` sebagai `DATABASE_URL`

### Opsi B — Railway
1. Daftar di https://railway.app
2. New Project → Provision MySQL
3. Buka tab **Variables**, copy `MYSQL_URL` / connection string
4. Tempel ke `.env` sebagai `DATABASE_URL`

### Opsi C — Aiven
1. Daftar di https://aiven.io, buat service MySQL (free tier)
2. Copy connection string dari dashboard
3. Tempel ke `.env` sebagai `DATABASE_URL`

Format `DATABASE_URL`:
```
mysql://USER:PASSWORD@HOST:PORT/DATABASE_NAME
```

---

## 3. Menjalankan di Lokal

```bash
# 1. Install dependencies
npm install

# 2. Copy env file lalu isi DATABASE_URL
cp .env.example .env

# 3. Push schema ke database MySQL kamu (bikin semua tabel)
npm run db:push

# 4. Isi database dengan data portfolio (dari PPTX referensi)
npm run db:seed

# 5. Jalankan development server
npm run dev
```

Buka http://localhost:3000

---

## 4. Deploy ke Vercel

1. Push folder ini ke GitHub repo baru
2. Buka https://vercel.com → **Add New Project** → import repo tadi
3. Di step **Environment Variables**, tambahkan:
   - `DATABASE_URL` = connection string MySQL kamu (harus yang sama dengan yang dipakai untuk seed)
4. Klik **Deploy**

Vercel otomatis menjalankan `npm install` dan `npm run build` (yang sudah termasuk
`prisma generate`). Karena database sudah di-push & di-seed dari langkah sebelumnya,
begitu deploy selesai website langsung tampil dengan data lengkap.

> **Catatan:** `npm run db:push` dan `npm run db:seed` dijalankan **sekali dari
> komputer kamu** (bukan di Vercel), supaya nembak ke database yang sama dengan yang
> dipakai production.

---

## 5. Cara Menambah Data di Kemudian Hari

Semua data ada di database, jadi ada 2 cara paling gampang untuk menambah/mengubah:

### Cara A — Prisma Studio (GUI, paling mudah)
```bash
npm run db:studio
```
Ini membuka editor visual di browser (seperti spreadsheet) untuk tabel `Project`,
`ProjectImage`, `Certificate`, `Education`, dll. Tinggal klik **Add record**.

### Cara B — Edit `prisma/seed.ts`
Tambahkan project/sertifikat/pendidikan baru di file itu, lalu jalankan lagi:
```bash
npm run db:seed
```
(Perhatikan: seed script ini akan **menghapus dan mengisi ulang** tabel Project,
Certificate, Education, Experience, Skill — cocok untuk kelola versi konten lewat
kode. Kalau mau nambah tanpa menghapus data lain, pakai Prisma Studio saja.)

### Menambah Foto ke Project yang Sudah Ada
Foto disimpan sebagai URL di tabel `ProjectImage`. Untuk upload file gambar
(bukan cuma link), disarankan pakai storage eksternal gratis seperti:
- **Vercel Blob** (https://vercel.com/docs/storage/vercel-blob) — paling gampang diintegrasikan
- **Cloudinary** (https://cloudinary.com) — free tier besar, ada image optimization

Upload gambar ke sana, lalu simpan URL-nya ke kolom `url` di tabel `ProjectImage`
lewat Prisma Studio.

### Update Status Kelulusan
Buka tabel `Education` di Prisma Studio, ubah `status` dari `ONGOING` ke
`GRADUATED`, isi `endYear` dan `gpa` kalau perlu. Halaman otomatis update.

---

## 6. Struktur Folder

```
src/
  app/
    page.tsx           → halaman utama (merangkai semua section)
    layout.tsx          → layout root, font, metadata
    api/contact/route.ts → API endpoint contact form (simpan ke tabel Message)
  components/            → semua section (Hero, About, Projects, dll)
  lib/
    prisma.ts            → koneksi database
    data.ts               → fungsi pengambilan data dari database
prisma/
  schema.prisma           → struktur tabel database
  seed.ts                 → data awal (dari PPTX referensi)
public/images/             → semua gambar project & sertifikat
```

---

## 7. Tech Stack

- **Next.js 14** (App Router) — frontend + API routes
- **Tailwind CSS** — styling
- **Prisma ORM** — akses database MySQL
- **TypeScript**
- **react-icons** — ikon

Tema visual: dark navy (`#0B1120`) dengan aksen emas (`#D4AF5A`), tipografi
Fraunces (display) + Inter (body) — disesuaikan dengan gaya personal branding
di PPTX referensi.

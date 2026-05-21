# VMI Frontend PLN Nusa Daya

Frontend aplikasi Vendor Managed Inventory untuk pilot project kurir pengiriman KWH Meter dari pabrikan, Gudang PLN Nusa Daya Makassar, UP3, sampai ULP tujuan.

## Fitur utama

- Auth: login, register, lupa password, simulasi SSO.
- Dashboard: aktivitas material, stok gudang, kebutuhan ULP, dan alur bisnis proses.
- Permintaan Material: datatable, filter, approval action, export action, form order dengan auto-fill alamat/telepon, kalkulasi berat dan harga.
- Pengambilan Material: datatable inspeksi, wizard data material, checklist, bukti foto, keputusan akhir, GPS pickup, dan board analisis.
- Pengiriman Material: informasi pengiriman, form surat jalan, status tracking, laporan pengiriman.
- Tracking Pengiriman: simulasi map, progres armada, dan kesiapan integrasi Google Maps/GPS IoT.
- Finansial, Laporan Kerusakan, Master Data, dan Setting Super Admin.

## Stack

- Vite, React, TypeScript.
- Tailwind CSS v4.
- React Router DOM, Redux Toolkit, React Redux.
- TanStack Query, Axios API client.
- React Hook Form, Zod validation.
- Lucide React, SweetAlert2.
- PWA, i18n, Sentry hook.
- ESLint, Prettier, Husky, lint-staged.
- Docker dan Docker Compose.

## Menjalankan lokal

```bash
npm install
npm run dev
```

Dev server default:

```text
http://127.0.0.1:5173
```

Build produksi:

```bash
npm run build
```

Lint:

```bash
npm run lint
```

## Environment

Salin `.env.example` menjadi `.env` lalu isi ketika backend dan integrasi sudah tersedia.

```text
VITE_API_BASE_URL=
VITE_SENTRY_DSN=
VITE_GOOGLE_MAPS_API_KEY=
```

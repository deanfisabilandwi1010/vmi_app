Saya sedang membangun proyek Aplikasi Web Jasa Pengiriman Barang dan Gudang PT. PLN Nusa Daya. Aplikasi ini bernama "VMI".
Berikut ini keterangan terkait Aplikasi yang akan saya bangun.

A. FITUR MENU
        Dalam aplikasi ini, fitur menu yang dibuat adalah sebagai berikut
        1.  Authentikasi
            Proses authentikasi melibatkan beberapa halaman sebagai berikut :
            a.  Halaman Login
                    Pada halaman login, form input yang dipakai yaitu :
                    >   Email (Text Email, Required, dan RegEx : example@gmail.com)
                    >   Password : (Text, Required, Min : 8 Karakter)
                    >   Checkbox (Remember Me, Optional)

            b.  Halaman Register
                    Pada halaman manual registrasi, form input yang dipakai yaitu :
                        >   Nama Depan (Text, Required)
                        >   Nama Belakang (Text, Optional)
                        >   Email (Text Email, Required, dan RegEx : example@gmail.com)
                        >   Password (Text, Required, Min : 8 Karakter)
                        >   Konfirmasi Password (Text, Required, Min: 8 Karakter, Match: Password)
                        >   Checkbox :
                            1.  Menyetujui persyaratan pendaftaran
                            2.  Konfirmasi pendaftaran

            c.  Halaman Lupa Password Password
                    Pada halaman lni, form yang dipakai yaitu :
                        >   Email (Text Email, Required, dan RegEx : example@gmail.com)

            d.  Halaman Single Sign On (dengan Akun Google, Facebook atau Instagram)
                    Halaman ini akan berintegrasi dengan platgorm Google, Facebook atau Instagram sebagai penyedia layanan single sign on

        2.  Dashboard
            Di dalam fitur menu dashboard akan ada 4 Tab navigasi, yang mana masing-masing navigasi memiliki informasi sebagai berikut:
                >   Aktivitas Material (Jumlah Permintaan & Pengiriman Material (/Harian/Bulanan/Tahunan)),
                >   Kondisi Stok Material di Gudang PT. PLN Nusa Daya.
                >   Kebutuhan Material Per Unit (UP3) secara Realtime

        3.  Permintaan Material
                Di dalam Fitur menu ini berisi :
                    >   Datatable permintaan material yang dikirimkan/diinput oleh UP3 (user Unit UP3).
                        Di dalam setiap row tabel ini akan ada menu aksi yang terdiri dari beberapa button, yaitu:
                            >   Button Edit data permintaan
                            >   Button Detail data permintaan
                            >   Button Hapus data permintaan (Hanya bisa dilakukan jika status permintaan belum di konfirmasi/approve oleh user PT. PLN)
                            >   Button Akses Approve User PT. PLN Pusat terhadap data-data permintaan.
                    >   Button Tambah data permintaan
                    >   Button Export Data Permintaan
                    >   Custom Filter Pencarian Berdasarkan Kategori (Pemesan, Penerima, Jumlah Material Permintaan, Status Permintaan).
                        Catatan: Master Status Permintaan Material yaitu :
                        -   "Pending" => "Permintaan Material Baru oleh Unit UP3",
                        -   "Approve" => "Perminaan Material telah disetujui oleh PT. PLN",
                        -   "Process" => "PT. PLN Nusa Daya, mempersiapkan pengiriman material ke unit penerima",
                        -   "Done"  => "Proses permintaan selesai dan material telah sampai"

                Berikut ini form Tambah/Update data permintaan :
                    a.  Form Pemesan
                        >   Unit Pemesan (UP3) (Dropdown, Required)
                        >   Alamat Unit (Auto fill dari Unit Pemesan yang dipilih)
                        >   Telepon/WA (Auto fill dari Unit Pemesan yang dipilih)
                        >   Nama Pemesan (Text, Required)

                    b. Form Unit Penerima
                        >   Unit Penerima (ULP) (Dropdown, Required)
                        >   Alamat Unit (Auto fill dari Unit Penerima  yang dipilih)
                        >   Telepon/WA (Auto fill dari Unit Penerima  yang dipilih)
                        >   Nama Penerima (Text, Required)

                    c. Form Pemesanan Material
                        >   Jenis Barang (Static, Readonly. Isinya KwH Meter)
                        >   Jumlah Barang (Number, Required, Min: 1000)
                        >   Berat Barang (Readonly, Auto Fill,  Formula: Jumlah Barang * 1.2)
                        >   Harga Barang (Readnoly, Auto Fill, Formula: (Jumlah Barang * 1.2) * Price ULP)
                                Catatan: Price ULP didapat dari Harga Ketentuan Lokasi dari Unit Penerima
                        >   Upload File/Dokumen Surat Permintaan (Required, Extension: Pdf,docx,jpg,jpeg,xlsx)

        4.  Pengambilan Material
                Menu ini adalah, proses pengambilan dan inspeksi material dari Pabrik untuk di angkut ke Gudang PT. PLN Nusa Daya. Di dalam menu ini akan berisi beberapa tab navigasi konten sebagai berikut :
                -   Informasi Pengambilan Material
                    Didalam konten tab navigasi ini terdapat datatable dan button Tambah Inspeksi Material.Form inspeksi material ini menggunakan konsep template Form Wizard, yang isinya sebagai berikut :
                        a.  Step 1: Form Pengisian Data Material
                            >   No. PO/Purchase Order (Text, Required)
                            >   Nama Matrial (Text, Readonly, Auto Fill: KwH Meter)
                            >   Nama Supplier/Vendor (Dropdown, (Data diambil dari API Master Supplier))
                            >   Qty Dipesan (Number, Required)
                            >   Satuan (Text, Readonly, Auto Fill : pcs)
                            >   Nama Inspektor (Text, Required)
                            >   No. DO/Delivery Order (Text, Required)
                            >   Kode File Verifikasi (Text, Required)
                            >   Upload Bukti File Lebel Verifikasi (Required, Dokumen, Ekstension: docs, pdf, jpg | Multifile)

                        b.  Step 2: Form Checklist Hasil Inspeksi
                            > Bentuk form pada step ini isinya form radio button (memilih salah satu. "Ada" atau "Tidak Ada"). Kontentnya adalah sebagai berikut :
                              - Dokumen Surat Jalan/Delivery Order.
                              - Kuantitas sesuai dengan yang dipesan.
                              - Label & marking material terbaca jelas.
                              - Kondisi kemasan dalam keadaan baik.
                              - Tidak ada kerusakan fisik pada material.
                              - Dokumen Sertifikat/CoA/CoC tersedia.
                              - Tanggal kadaluarsa masih berlaku.
                              - Spesifikasi sesuai dokumen teknis.
                              - Segel/seal tidak rusak (jika ada).
                              - Material tidak berbahaya/B3 sesuai MSDS.
                              - Invoice/Faktur tersedia dan sesuai.
                            > Catatan Temuan (Textarea, Opsional)

                        c.  Step 3: Form Bukti Foto Pemeriksaan
                            >  Bentuk form pada step meliputi Pengisian Penilaian Kondisi yaitu :
                               - Kondisi Kemasan            (*****)
                               - Kondisi Material/Fisi      (*****)
                               - Kelengkapan Dokument       (*****)

                            > Upload Bukti Foto Kondisi Material (Extension: jpg, jpeg)


                        d.  Step 3: Form Hasil Keputusan Final
                            > Bentuk form pada step berisikan:
                                - Board Ringkasan Inspeksi, contoh :
                                 0 Item OK
                                 0 Item NG
                                 0% Pass Rate

                                - Informasi Material, contoh :
                                    Material                1
                                    Supplier                1
                                    No. PO                  1
                                    Qty Diterima            1 pcs
                                    Foto Bukti              0 foto
                                    Inspector               1

                                -  Keputusan Akhir
                                    isinya radio button pilihannya :
                                    > Terima        (Accept)
                                    > Tahan         (On Hold)
                                    > Tolak         (Reject)

                            > Alasan / Justifikasi Keputusan (Textarea)

                -   Tracking GPS Kendaraan yang dalam Perjalanan Penjemputan dan Penghantaran Material dari Pabrik Ke Gudang PT. PLN Nusa daya
                -   Board Analisis, Status, Jumlah Barang Mulai dari Inspeksi, Penghantaran sampai ke gudang PT. PLN Nusa daya

        5.  Pengiriman Material
                Di dalam menu ini ada beberapa sub menu, antara lain sebagai berikut :
                a.  Informasi Pengiriman
                        Halaman Informasi pengiriman berisikan datatable pengiriman material dan fitur terbitkan surat pengiriman di setiap row datatablenya. Form Terbit Surat Pengiriman yaitur :
                        >   No. Pengiriman (Text, Auto Generate)
                        >   No. Pemesanan (Text, Readonly, Auto Fill berdasarkan id yang link ke permintaan unit)
                        >   Pengirim (Text, Readonly, Auto Fill : PT. PLN Nusa Daya)
                        >   Unit Pemesan (UP3) (Text, Readonly, Auto Fill dari No. Pemesanan)
                        >   Unit Penerima (ULP) (Text, Readonly, Auto Fill dari No. Pemesanan)
                        >   Jadwal Pengiriman (Date Input, Required)
                        >   Estimasi Tiba (Date Input, Required)
                        >   Kilometer Perjalanan (Text, Readonly, Auto Fill: Dari longitude dan latitiude lokasi Penerima)
                        >   Moda Transportasi (Text, Required)
                        >   No. Plat Kendaraan (Text, Required)
                        >   Driver/Pengemudi (Text, Required)
                        >   Upload File/Dokumen Surat Jalan (Required, Extension: pdf, docs, jpg,jpeg | Multi file)


                b.  Tracking Pengiriman
                    >   Berisi board informasi status pengiriman. (Tolong buatkan Statusnya)
                    >   Berisi informasi tracking posisi transportasi secara realtime. (khusus untuk mobile applikasi nantinya)
                    >   Menggunakan platform Google Map dan Custom pergerakan kendaraan. (khusus untuk mobile applikasi nantinya).

                b.  Laporan Pengiriman (Reporting)

        6.  Finansial
                1.  Laporan Tagihan Permintaan Material (Khusus Untuk Material yang telah dikirim ke Unit ULP)
                2.  Laporan Draf Tagihan Permintaan Material (Khusus Untuk Permintaan Material Yang Masuk, Menunggu Approve dan dalam Proses Pengiriman)
                3.  Laporan Kerugian Akibat Kerusakan (Termasuk Asuransi yang telah dikeluarkan)

        7.  Laporan Kerusakan
            Fitur menu ini berisi tentang informasi kerusakan material baik dalam perjalanan penghantaran, pengiriman ke penerima (ULP) maupun informasi cacat/kehilangan material di gudang.

        8.  Master Data
            Fitur ini berisikan data-data master, yang meliputi :
                a. Master Pengguna
                b. Master Roles (staff, manager, supplier, customer, recipient)
                d. Master Menu
                e. Master Permission
                c. Master Supplier/Vendor
                d. Master Unit UP3
                e. Master Unit ULP
                f. Master Status Tracking
                g. Master Pegawai

        9.  Setting/Konfigurasi (Khusus Super Admin)


B. TEKNOLOGI STACK
    Berikut ini teknologi yang akan digunakan dalam pengembangan aplikasi tersebut.
    1. Docker and Docker Compose Setup
    2. Vite sebagai Frontend Tooling
    3. NPM/YARN/PNMP pilih salah satu tools yang akan dipakai untuk proses install dependencies
    4. React Library dan Typescript
    5. Modern Icon yang mendukung lintas library React, React Hook Form dan Validation
    6. Implementasikan React Memo, Callback dan Lainnya
    7. Manajemen Routing dengan React Router DOM (Versi Terakhir)
    8. Implementasikan Code Quality & Formatting (Penggunaan Eslint dan Prettier)
    9. Implementasikan Git Hooks (Automation)
    10. Implementasikan Styling & UI Components menggunakan Tailwind CSS (versi terakhir) + Custom Theme 11. Implementasi State Management (Redux Toolkit dan React Redux)
    12. Implementasikan Private Route dan Public Route
    13. Implementasikan Auth Guard and Permission Guard 14. Implementasikan Login SSO
    15. Implementasikan TanStack Query
    16. Implementasikan Middleware
    17. Implementasikan SEO
    18. Implementasikan Reusable Component
    19. Implementasikan API Client using Axios
    20. Implementasikan Feature-Based Architecture
    21. Implementasikan Konsep API Layer / Service Isolation
    22. Sweet Alert atau Tooltip
    23. Implementasikan manajemen struktur folder project yang kolaboratif
    24. Implementasikan beberapa rekomendasi tools, platform lainnya
    25. Implementasikan Code Splitting / Lazy Loading
    26. Integrasikan Performance Monitoring (Menggunakan Sentry)



C. PERMINTAAN:
Tolong buatkan proyek web aplikasi tersebut, tetapi hanya bagian Frontend nya saja.


D. Catatan:
    1. Khusus untuk project backend service (Rest API), tidak perlu dibuat lagi, karena sudah ada.
    2. Fitur Menu Tracking Barang Pada Moda Transportasi (Berkaitan dengan GPS Tracking Barang dalam perjalanan)
    Dalam hal ini kita akan menggunakan platform Google Map dan Geolocation serta Alat GPS Tracking sebagai teknologi IOT
    3. Pastikan semua dependencies/library/package yang digunakan adalah versi terakhir atau stable.

E. INFROMASI TAMBAHAN.
    1. Project Supported
        ✅ Tailwind CSS v4 (Latest)
        ✅ Bahasa Indonesia sepenuhnya
        ✅ PWA + i18n support

    2. Buatlah tampilan templatenya lebih responsive dengan scaling multi device view



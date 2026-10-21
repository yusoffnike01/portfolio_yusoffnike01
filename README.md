# Modern Dark Portfolio — Tengku Yusoff

Portfolio dwibahasa BM/EN bertema Modern Dark dengan pilihan tema cerah, setup MacBook Pro 3D dan terminal pilihan. Next.js App Router, React, JavaScript, CSS Modules dan static export. Tiada backend, database, analitik, shell sebenar atau sambungan AI.

Halaman utama menggunakan lebar penuh dengan padding responsif. Nama, biodata, pengalaman dan CTA berada dalam kolum kiri; portrait besar berada dalam kolum kanan (sehingga 440 × 550px). Pada skrin sehingga 1000px, susunan menjadi satu kolum dengan portrait di atas biodata. Foto asal dikekalkan, hanya crop paparan berubah.

Three.js aktif secara automatik selepas JavaScript dimuatkan, menggunakan iframe same-origin dan vendor setempat dalam `public/workspace/`. Tiada CDN diperlukan. Tanpa JavaScript atau apabila WebGL gagal, imej gantian kekal. Putaran ialah pilihan; kandungan portfolio tidak memerlukan interaksi 3D. Latar iframe transparent disahkan melalui ujian piksel untuk kedua-dua tema.

Penutup belakang MacBook mempunyai logo Apple setempat. Monitor memaparkan wordmark `AOC` berwarna putih pada depan dan belakang supaya boleh dibaca ketika setup dipusing. Wordmark dilukis setempat pada canvas tanpa aset luaran. Sumber scene ialah `design-previews/threejs-coding/macbook-desk.js`; aset runtime disediakan oleh `scripts/prepare-workspace.mjs`, termasuk fallback daripada `macbook-branded-transparent.png`.

Kerusi menggunakan ilustrasi 3D bergaya berasaskan rujukan Tomaz Syrix II Brown: upholsteri coklat tan, sisi hitam, sandaran racing tinggi, bantal kepala dan lumbar hitam, serta wordmark setempat `TOMAZ Heritage`. Ia bukan model produk rasmi atau replika tepat. Imej fallback dijana daripada scene yang sama.

Baris di bawah nama menggunakan animasi menaip/padam yang bergilir antara enam ayat peranan dan minat, dalam BM/EN, tanpa butang pause. DevOps dan AI automation dilabel sebagai bidang yang sedang diterokai. Ruang teks dikhaskan untuk mengelakkan susun atur melompat. Tetapan sistem reduced motion memaparkan ayat pertama secara statik; pembaca skrin menerima keseluruhan ringkasan tanpa pengumuman setiap aksara. Tiada pustaka animasi tambahan.

## Jalankan secara setempat

Projek menggunakan `.node-version` = `20.11.1` melalui nodenv. Tiada tetapan global diperlukan.

    nodenv exec npm ci --ignore-scripts
    NEXT_TELEMETRY_DISABLED=1 nodenv exec npm run build
    nodenv exec npm run preview

Buka http://localhost:3000/ms/ atau http://localhost:3000/en/.
Preview mengikat 127.0.0.1 sahaja. Tekan Ctrl+C untuk menghentikan proses foreground. Port 3000 mesti kosong. Preview menyajikan fail sebenar daripada `out/`, termasuk respons HTTP 404; ia bukan server produksi.

Untuk pembangunan dengan hot reload:

    NEXT_TELEMETRY_DISABLED=1 nodenv exec npm run dev

Jangan jalankan dev dan preview serentak pada port sama.

## Kandungan dan struktur

    src/lib/site.mjs                 Profil, kamus BM/EN, projek dan metadata
    src/lib/terminal.mjs             Parser serta state terminal tanpa paparan
    src/components/ModernPortfolio.js  Halaman dan bahagian kandungan aktif
    src/components/ProfilePhoto.js     Foto profil sebenar
    src/components/WorkspaceScene.js   Aktivasi/fallback dan kawalan 3D
    src/components/Terminal.js      Terminal React
    src/components/Navigation.js    Navigasi dan penukar bahasa
    src/components/ModernPortfolio.module.css
    public/workspace/               Scene, vendor Three.js dan lesen setempat
    scripts/prepare-workspace.mjs   Penjana aset daripada sumber pratonton
    src/styles/globals.css          Token warna dan asas aksesibiliti
    src/app/[lang]/[[...section]]/   Halaman bahasa yang dijana ketika build
    src/app/(entry)/                Halaman akar BM
    src/app/global-not-found.js     404 dwibahasa
    public/_headers                Cadangan header Cloudflare Pages
    public/social/portfolio.png    Imej perkongsian sosial
    tests/                         Unit, HTML export, SEO produksi dan E2E

Layout akar berasingan membolehkan atribut HTML lang yang betul untuk BM dan EN. `experimental.globalNotFound` digunakan untuk 404 merentas layout; semak semula sokongan apabila menaik taraf Next.js. Laluan dalaman menggunakan pautan HTML biasa supaya kandungan masih boleh diteroka tanpa JavaScript.

## Kandungan sebenar sebelum penerbitan

Nama paparan dan nama penuh sudah digunakan. Biodata pengguna ialah Full-Stack & Mobile App Developer dengan 5 tahun pengalaman pembangunan serta 3 tahun pengalaman freelance membina sistem dan aplikasi. Tempoh dipaparkan berasingan, bukan dijumlahkan sebagai 8 tahun. Fokus utama ialah Node.js, React, Next.js, NestJS dan Flutter. DevOps dan AI automation dilabel sedang diterokai. PHP dikeluarkan; konsep dashboard menggunakan JavaScript.

Tiga projek masih konsep DEMO, bukan aplikasi siap atau pengalaman kerja. Butiran organisasi/tarikh dan resume belum tersedia. E-mel yang diberikan pengguna, `tengkuyusoff19@gmail.com`, tersedia sebagai pautan mailto pada halaman utama, halaman hubungan BM/EN dan output terminal `contact` serta `sudo hire-me`. Tiada e-mel dihantar dan tiada akaun disambungkan.

Gantikan kandungan dalam `src/lib/site.mjs` dan semak kedua-dua bahasa. Hubungan menggunakan komponen berkongsi `ContactEmail`; fail resume sebenar boleh ditambah apabila tersedia. Jangan hanya menukar label demo untuk menyamar konsep sebagai projek siap.

## SEO dan domain

Tanpa `SITE_URL`, build ditandakan `noindex, follow`, tidak menjana canonical produksi dan mengeluarkan sitemap kosong. Crawler dibenarkan membaca halaman supaya arahan noindex boleh dibaca. Imej perkongsian domain mutlak dan structured data Person diaktifkan apabila domain HTTPS sah diberikan.

Untuk build produksi, tetapkan `SITE_URL` kepada origin domain sebenar, tanpa subpath, query atau hash. Jangan gunakan domain ujian dalam penerbitan. Ini ialah konfigurasi awam ketika build, bukan rahsia; tidak perlu fail `.env`.

Butiran konsep demo kekal noindex dan tidak masuk sitemap walaupun domain telah ditetapkan. Preview hosting dengan SITE_URL produksi juga perlu perlindungan noindex tersendiri; jangan aktifkan tetapan domain produksi pada preview awam sebelum polisi indeks diputuskan. Halaman akar mempunyai canonical ke /ms/.

## Cloudflare Pages — setup sendiri oleh pemilik

Tiada akaun disambungkan dan tiada deployment dibuat.

    Framework preset: Next.js (Static HTML Export)
    Build command: npm run build
    Build output directory: out
    SITE_URL: origin HTTPS domain sebenar, ditetapkan ketika build produksi
    Node.js: pilih versi serasi; versi tempatan diuji ialah 20.11.1

Bukan deployment Workers dan tidak memerlukan `next-on-pages`. Rujukan rasmi: https://developers.cloudflare.com/pages/framework-guides/nextjs/deploy-a-static-nextjs-site/

`public/_headers` disalin ke output untuk Pages. Ia menetapkan nosniff, referrer policy, frame protection, permissions policy dan CSP asas. CSP membenarkan unsafe-inline untuk skrip bootstrap Next.js; ini bukan CSP ketat berasaskan hash. Render input terminal kekal sebagai teks React, bukan HTML. Jangan anggap CSP atau audit automatik sebagai bukti keselamatan penuh.

Semak semula selepas hosting: HTTPS, kedua-dua bahasa, direct URL dan refresh, aset, 404 sebenar, header respons, canonical, hreflang, sitemap, kandungan demo dan imej sosial. Hosting sebenar belum diuji.

## Terminal

    help, whoami, about, skills, projects, experience, ai-lab,
    resume, contact, clear, history, theme, sudo hire-me

Input maksimum 200 aksara; input lebih panjang ditolak. Sejarah maksimum 50 entri, output maksimum 100 blok. `clear` mengosongkan output sahaja, `history` memaparkan arahan sebelum history semasa. Input asal kekal dalam sejarah; padanan arahan mengabaikan huruf besar/kecil dan ruang luar. Sintaks pipe/chaining tidak dijalankan. Sejarah dan mod efek tidak disimpan kekal. Pautan tidak dibuka automatik.

## Ujian

    nodenv exec npm test
    nodenv exec npm run build
    nodenv exec npm run test:export

Ujian export di atas menjangka build preview tanpa SITE_URL.

Pasang Chromium khusus projek untuk E2E (tiada sudo atau install-deps):

    PLAYWRIGHT_BROWSERS_PATH=./.playwright-browsers nodenv exec npx playwright install chromium --only-shell

Dengan preview sedang berjalan:

    PLAYWRIGHT_BROWSERS_PATH=./.playwright-browsers nodenv exec npm run test:e2e

Playwright 1.62.0 dipin kerana 1.64.1 tidak menyokong Ubuntu 20.04 untuk muat turun Chromium. axe-core/playwright 4.10.2 dipin agar serasi Node.js tempatan. Semak advisori dan keserasian sebelum naik taraf; jangan ubah Node.js global untuk projek ini.

Ujian E2E meliputi semua arahan, sejarah, input berbahaya sebagai teks, had input, penukar bahasa, 404, menu telefon, reduced motion, lebar 320/390/768/1440 dan kandungan tanpa JavaScript. Audit axe automatik bukan pensijilan WCAG; Safari/Firefox, pembaca skrin dan telefon fizikal masih perlu semakan manual.

Ujian SEO produksi menggunakan domain ujian sahaja dan mesti diikuti build preview semula:

    SITE_URL=https://portfolio.test NEXT_TELEMETRY_DISABLED=1 nodenv exec npm run build
    nodenv exec node --test tests/production/seo.test.mjs
    NEXT_TELEMETRY_DISABLED=1 nodenv exec npm run build

Imej sosial boleh dijana semula melalui:

    PLAYWRIGHT_BROWSERS_PATH=./.playwright-browsers nodenv exec node scripts/social-image.mjs

Cache npm dan browser ujian berada di dalam direktori projek dan diabaikan Git. Tiada Git repository dimulakan, commit dibuat atau deployment dilaksanakan oleh tugas ini.

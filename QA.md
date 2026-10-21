# Laporan pengesahan Modern Dark Portfolio

Direktori projek: /home/tengku/portfolio_yusoff
Runtime ujian: nodenv Node.js 20.11.1, npm 10.2.4.
Stack dipasang: Next.js 16.4.2, React 19.3.1. Tiada Node.js global diubah.

## Semakan e-mel hubungan

- Alamat tepat `tengkuyusoff19@gmail.com` dengan href `mailto:tengkuyusoff19@gmail.com` dipaparkan pada halaman utama dan halaman hubungan BM/EN, serta output `contact` dan `sudo hire-me`.
- `nodenv exec npm test`: 13 ujian lulus; build berjaya; `nodenv exec npm run test:export`: 3 ujian lulus.
- Browser Use mengesahkan 8 sasaran halaman/output dan 6 semakan responsif halaman hubungan pada lebar 320, 390 dan 768px untuk BM/EN, tanpa overflow. Bukti: `test-results/contact-email-check.json`.
- Pautan mailto disahkan tanpa mengaktifkan aplikasi e-mel atau menghantar mesej. Suite Playwright penuh tidak dijalankan semula.

## Semakan pengenalan beranimasi

- `nodenv exec npm test`: 13 ujian lulus; build berjaya; `nodenv exec npm run test:export`: 2 ujian lulus, termasuk HTML pengenalan tanpa JavaScript.
- Pelayar alternatif mengesahkan keenam-enam ayat penuh BM/EN, fasa menaip dan kitaran berulang kembali ke ayat pertama. Tiada butang pause, mengikut permintaan pengguna.
- Tinggi pengenalan kekal stabil sepanjang kitaran yang diperiksa. Sepuluh semakan responsif (BM/EN pada 320, 390, 768, 1440 dan 1920px) tiada overflow mendatar; reduced motion disahkan statik bagi kedua-dua bahasa.
- Bukti berstruktur: `test-results/intro-animation-check.json`. Suite Playwright pengenalan disediakan tetapi tidak dilaporkan sebagai telah dijalankan; pengesahan interaktif menggunakan Browser Use tersedia.
- Teks bergerak disembunyikan daripada pembaca skrin; ringkasan statik penuh disediakan. Reduced motion dihormati. Tiada dakwaan pematuhan WCAG menyeluruh dibuat bagi animasi berulang tanpa kawalan jeda.

## Semakan kerusi Tomaz coklat

- `nodenv exec npm test`: 12 ujian lulus, termasuk regresi kerusi dan branding AOC.
- Arah sandaran mengikut anotasi pengguna: bahagian atas menjauhi meja, bukan menunduk ke atas tempat duduk. Sudut terkini ialah 100 darjah atas permintaan pengguna, disahkan menggunakan vektor transform Three.js. Semakan pelayar mengesahkan arah belakang dan sudut 100 darjah; fallback dijana semula daripada pose ini.
- `NEXT_TELEMETRY_DISABLED=1 nodenv exec npm run build`: berjaya.
- `nodenv exec npm run test:export`: 1 ujian lulus.
- Pelayar tersedia mengesahkan metadata kerusi, warna tan `b47b49`, bantal hitam `111316`, dan tekstur wordmark depan/belakang. Branding AOC serta Apple kekal dan tekstur mempunyai piksel.
- Paparan belakang, sisi dan hadapan diperiksa secara visual. Scene mencatat 48 draw calls dalam semakan ini. Fallback PNG dirender semula pada komposisi asal, ditukar kepada WebP dan diperiksa.
- Ujian E2E kerusi ditambah untuk larian Playwright akan datang; suite Playwright CLI tidak dijalankan semula dalam perubahan kerusi ini. Semakan pelayar alternatif bukan dakwaan suite E2E lulus.
- Kerusi ialah ilustrasi bergaya berdasarkan rujukan visual, bukan model rasmi atau replika produk tepat. Tiada dependency dipasang atau tetapan sistem diubah.

## Rekod pengesahan terdahulu

- `npm test`: 6 ujian lulus (biodata, Flutter, parser, state, data/SEO dan konfigurasi hosting).
- `npm run build`: berjaya menghasilkan static export dalam `out/`.
- `npm run test:export`: 1 ujian lulus, memeriksa semua laluan BM/EN, lang HTML, H1, metadata, pautan tempatan, label demo, 404 dan aset sosial.
- Build dengan SITE_URL=https://portfolio.test: berjaya.
- `node --test tests/production/seo.test.mjs`: 1 ujian lulus, canonical/hreflang, structured data, metadata sosial dan sitemap tidak menyenaraikan butiran demo.
- Build akhir dijalankan semula TANPA SITE_URL: mod preview noindex dipulihkan. Domain ujian tidak digunakan dalam canonical output akhir.
- `npm run test:e2e`: 20 ujian Chromium lulus dalam larian terakhir selepas penambahan logo Apple dan tulisan monitor.
- E2E menguji semua arahan terminal, sejarah dan clear, input HTML sebagai teks, had panjang, pilihan efek, keyboard, penukar bahasa pada butiran projek, respons HTTP 404, menu telefon, reduced motion dan halaman tanpa JavaScript.
- Layout diperiksa pada lebar 320, 390, 768, 1024, 1440, 1920 dan 2560 piksel: tiada overflow mendatar halaman utama dalam ujian. Ujian regresi turut mengesahkan lebar main memenuhi viewport, kandungan desktop menggunakan sekurang-kurangnya 88% lebar skrin, teks pengenalan 22px, navigasi dan input terminal 20px serta label sokongan 18px. Ujian font besar menyemak kedua-dua bahasa dan halaman Tentang; semakan overflow tambahan meliputi halaman utama, Tentang, Projek, satu butiran projek, Pengalaman, AI Lab dan Hubungi pada lebar 320, 390, 768, 1024 dan 1920px.
- Audit axe pada semua laluan BM/EN: tiada violations untuk aturan wcag2a, wcag2aa, wcag21aa dan wcag22aa yang diperiksa.
- Tiada pageerror pelayar dalam aliran terminal dan semakan semua laluan.
- `npm audit --omit=dev`: found 0 vulnerabilities pada masa pemeriksaan.
- Respons localhost /ms/: HTTP 200; header nosniff, frame protection, referrer policy dan CSP hadir.
- Screenshot desktop dan telefon diperiksa secara visual: tiada pertindihan atau pemotongan layout jelas.
- Portrait halaman utama kini 440 × 550px pada viewport 1920px, berada dalam kolum kanan sejajar bahagian nama, About, pengalaman dan CTA di kiri. Pada telefon, portrait berada di atas biodata. Ujian geometri mengesahkan teks tidak mengalir di bawah kolum foto untuk kedua-dua bahasa pada desktop.
- Three.js dimuatkan secara automatik, dengan MacBook Pro, satu monitor luaran, tanpa manusia dan tanpa PC tower; 38 draw calls diperhatikan dalam ujian.
- Logo Apple berada pada belakang penutup MacBook. Tulisan monitor lama diganti dengan wordmark putih `AOC` pada depan dan belakang monitor; kedua-dua tekstur mempunyai piksel dan kedua-dua sudut diperiksa melalui pelayar tersedia. Fallback transparent dijana semula daripada scene AOC sebenar.
- Kegagalan vendor/WebGL mengekalkan fallback imej. Kawalan putar/reset diuji; kandungan tanpa JavaScript kekal tersedia.
- Petak putih iframe diperbetulkan melalui color-scheme yang sepadan. Ujian piksel mengesahkan penjuru iframe menyamai warna latar halaman dalam tema gelap dan cerah.

## Bukti visual

- test-results/desktop.png
- test-results/mobile.png
- test-results/bio-home-1920.png
- test-results/bio-about-1920.png
- test-results/profile-right-desktop.png
- test-results/profile-right-mobile.png

Fail ini dijana semula apabila ujian pelayar dijalankan.

## Isu yang ditemui dan dibetulkan

- Had lebar 1280px dibuang selepas maklum balas pengguna. Pada viewport 1920px, main kini 1920px dengan padding tepi 76.8px.
- Tipografi isi dan kawalan diperbesar; tiada lagi label UI terlihat 8–13px pada halaman utama dalam ujian.
- Nama input terminal kini mempunyai aria-label yang eksplisit.
- Ruang antara nama dalam H1 dikekalkan walaupun paparan berbilang baris.
- Titik hiasan tajuk diasingkan daripada teks kandungan.
- Metadata imej sosial domain mutlak tidak dijana tanpa domain sah; amaran metadataBase telah diselesaikan.
- Konfigurasi _routes.json mengandungi include yang sah dan exclude untuk semua laluan Functions.
- Playwright 1.64.1 tidak menyokong muat turun browser pada Ubuntu 20.04; 1.62.0 berjaya dipasang dan digunakan. axe-core/playwright dipin pada 4.10.2 untuk keserasian Node.js 20.11.1.

## Batas pengesahan dan perkara belum selesai

- Semakan AOC: ujian Playwright CLI tidak dapat dimulakan kerana executable Chromium yang diperlukan tiada. Semakan DOM scene, piksel tekstur serta visual depan/belakang dibuat melalui pelayar Browser Use yang tersedia, tanpa pemasangan tambahan. Keputusan E2E terdahulu di atas ialah rekod larian lama, bukan larian semasa perubahan AOC.
- Tiada Cloudflare deployment atau pengesahan respons hosting sebenar.
- Biodata kini menggunakan maklumat pengguna: Full-Stack Developer, 5 tahun pengalaman pembangunan dan 3 tahun freelance, dipaparkan berasingan tanpa dakwaan jumlah 8 tahun. Fokus utama ialah Node.js, React, Next.js dan NestJS; DevOps serta AI automation dilabel sedang diterokai. PHP dikeluarkan daripada kandungan dan imej sosial, dan konsep dashboard ditukar kepada JavaScript.
- Domain produksi, resume, profil profesional lain, butiran organisasi/tarikh dan projek sebenar masih belum diberikan. E-mel hubungan telah ditambah daripada maklumat pengguna.
- Projek contoh kekal DEMO; tiada dakwaan projek siap, pelanggan atau pencapaian rekaan.
- Firefox, Safari, pembaca skrin dan telefon fizikal belum diuji.
- Audit automatik bukan pensijilan WCAG atau audit keselamatan penuh.
- CSP asas membenarkan unsafe-inline untuk bootstrap Next.js. Polisi berasaskan hash yang lebih ketat tidak dilaksanakan.
- globalNotFound ialah pilihan eksperimen Next.js; semak semula ketika menaik taraf.
- Server preview ialah proses tempatan sesi pembangunan, bukan servis produksi atau proses kekal.
- Node.js 20 mengeluarkan ExperimentalWarning berkaitan import JSON ketika larian ujian imej; build dan semua ujian tetap selesai dengan exit 0.
- Tiada Git init, commit, push, sambungan akaun hosting, perubahan DNS atau akses fail rahsia dilakukan.

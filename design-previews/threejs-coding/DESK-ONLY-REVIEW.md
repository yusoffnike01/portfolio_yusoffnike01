# Pratonton V2 — Setup meja PC tanpa watak

Arah rujukan diterjemahkan kepada scene 3D di bahagian atas, ucapan ringkas, nama dan gambar profil, kemudian biodata di bawah. Nama, kandungan, warna aksen dan geometri adalah khusus untuk Tengku Yusoff; logo atau aset pihak lain tidak disalin.

## Gambar untuk review

- desk-only-portfolio.png: mockup atas halaman, 1920 × 1350.
- desk-only-full-page.png: seluruh halaman konsep.
- desk-only-scene.png: render workstation sahaja, 1600 × 1100.
- desk-only-transparent.png: render WebGL dengan latar transparen.
- desk-only-mobile.png: susunan telefon.

Scene mengandungi meja kayu, dua monitor, papan kekunci beraksen hijau, mouse, telefon, mug, casing PC dan kerusi kosong. Tiada mesh manusia, animasi tangan atau platform berwarna cerah. Scene berlatarkan transparent untuk menyatu dengan laman Modern Dark.

## Pemeriksaan sebenar

Render Three.js r186 berjaya di Chromium/WebGL2. Putaran, reset kamera, butang tema dan reduced motion diperiksa. Layout tiada overflow mendatar pada lebar 320, 390, 768, 1440 dan 1920px yang diuji. Gambar profil dimuatkan dan tiada pageerror pelayar dilaporkan. Keputusan terperinci: desk-only-verification.json.

## Buka pratonton interaktif

Dari /home/tengku/portfolio_yusoff:

    nodenv exec node design-previews/threejs-coding/serve.mjs

Kemudian buka http://127.0.0.1:3011/desk-only.html. Server menggunakan localhost sahaja; hentikan dengan Ctrl+C.

## Jana semula

    PLAYWRIGHT_BROWSERS_PATH=./.playwright-browsers nodenv exec node design-previews/threejs-coding/render-desk-only.mjs

Versi dengan watak dikekalkan dalam index.html dan scene.js. V2 menggunakan desk-only.html dan desk-only.js. Tiada dependencies baharu dipasang untuk V2. Aplikasi portfolio sebenar tidak diubah; penerbitan dan pengoptimuman prestasi produksi belum dilakukan.

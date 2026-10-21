# Pratonton V3 — MacBook Pro + satu monitor

Perubahan visual daripada V2:

- MacBook Pro stylized terbuka di sebelah kiri meja.
- Satu monitor luaran, keyboard dan mouse di tengah/kanan.
- Casing PC, telefon dan monitor kedua tidak dimasukkan dalam V3.
- Kerusi kosong, meja kayu dan tema Modern Dark dikekalkan.
- Scene 3D di atas, biodata di bawah.

Model laptop ialah ilustrasi prosedural asal dengan badan aluminium, keyboard hitam, trackpad dan skrin bertakuk. Ia bukan model CAD rasmi atau representasi spesifikasi generasi MacBook Pro tertentu.

## Fail gambar

- macbook-desk-portfolio.png — mockup atas halaman, 1920 × 1350.
- macbook-desk-scene.png — render setup sahaja, 1600 × 1100.
- macbook-desk-full-page.png — seluruh halaman.
- macbook-desk-transparent.png — scene berlatar transparen.
- macbook-desk-mobile.png — susunan telefon.

## Semakan sebenar

Three.js/WebGL berjaya dirender. Scene mempunyai satu objek macbook-pro dan satu monitor luaran, tanpa pc-tower atau watak manusia. Putaran, reset, tema, reduced motion dan overflow pada 320/390/768/1440/1920px diperiksa. Tiada pageerror dilaporkan. Lihat macbook-desk-verification.json.

## Jana semula

Dari /home/tengku/portfolio_yusoff:

    PLAYWRIGHT_BROWSERS_PATH=./.playwright-browsers nodenv exec node design-previews/threejs-coding/render-macbook-desk.mjs

Untuk pratonton interaktif, jalankan serve.mjs seperti panduan folder dan buka /macbook-desk.html pada localhost port 3011.

V1 dan V2 dikekalkan. Tiada pemasangan tambahan atau perubahan pada aplikasi portfolio utama dibuat untuk V3.

# Modern Dark — Three.js coding workspace

Pratonton visual sahaja, mengikut pilihan Modern Dark. Tiada komponen atau routing aplikasi portfolio diubah untuk menghasilkan scene ini.

## Fail untuk semakan

- portfolio-hero-preview.png — mockup hero 1920 × 1080 dengan biodata di kiri dan scene 3D di kanan.
- coding-workspace.png — ilustrasi scene 1600 × 1200 dengan latar gelap.
- coding-workspace-transparent.png — render scene dengan latar transparen untuk komposisi lain.
- mobile-preview.png — susunan telefon.
- verification.json — hasil pengesahan browser sebenar.

Ini ialah render geometri Three.js/WebGL sebenar, bukan gambar stok, foto atau imej AI yang dilabel sebagai 3D. Watak ialah ilustrasi stylized, bukan replika wajah pemilik portfolio. Semua geometri, tekstur kod pada monitor dan props dihasilkan setempat. Tiada model atau tekstur luaran dimuat turun.

## Pratonton interaktif

Dari direktori /home/tengku/portfolio_yusoff:

    nodenv exec node design-previews/threejs-coding/serve.mjs

Kemudian buka http://127.0.0.1:3011. Server mengikat localhost sahaja dan tidak mengubah server portfolio port 3000. Tekan Ctrl+C apabila selesai.

- Seret untuk memutar kamera, skrol untuk zum.
- Gerakan tangan: mula/henti animasi ringkas.
- Reset sudut: pulihkan kamera dan zum.
- Simpan PNG: eksport render dengan latar transparen.
- Animasi dimatikan secara lalai dan tidak diaktifkan apabila reduced motion dipilih.

## Jana semula render dan pemeriksaan

    PLAYWRIGHT_BROWSERS_PATH=./.playwright-browsers nodenv exec node design-previews/threejs-coding/render.mjs

Pemeriksaan menggunakan Chromium tempatan dengan SwiftShader. Server pengujian sementara menggunakan port localhost rawak dan ditutup apabila selesai.

## Pengasingan dependencies

Three.js 0.186.1 dipasang dalam node_modules folder pratonton ini, bersama package.json dan package-lock.json tersendiri. Dependencies aplikasi utama tidak diubah. Pemasangan awal melaporkan 0 kerentanan.

Scene menggunakan pencahayaan studio, bayang, kamera ortografik dan material clay/stylized. Ia masih prototaip visual, belum melalui pengoptimuman prestasi untuk produksi atau ujian GPU telefon fizikal. Semakan prestasi, pilihan fallback PNG dan integrasi ke laman memerlukan kerja berasingan selepas kelulusan visual.

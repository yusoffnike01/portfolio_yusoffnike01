import { chromium } from '@playwright/test';
import sharp from 'sharp';
import { writeFile } from 'node:fs/promises';
import { pathToFileURL } from 'node:url';
import { resolve } from 'node:path';

const directory=resolve('design-previews');
const variants=[['A-modern-dark','A · MODERN DARK','Gelap, moden; teks kiri dan potret kanan.'],['B-clean-light','B · CLEAN LIGHT','Cerah, profesional; potret dan biodata seimbang.'],['C-editorial','C · EDITORIAL','Tipografi berkarakter; nama dan kandungan utama.']];
await sharp('public/social/profile_profolio.jpeg').rotate().extract({left:330,top:530,width:360,height:450}).webp({quality:90}).toFile(resolve(directory,'portrait.webp'));
const browser=await chromium.launch({headless:true});
const results=[];
try {
 for(const [name] of variants) {
  const page=await browser.newPage({viewport:{width:1440,height:1080},deviceScaleFactor:1,reducedMotion:'reduce'});
  const errors=[];page.on('pageerror',e=>errors.push(e.message));
  await page.goto(pathToFileURL(resolve(directory,name+'.html')).href);
  await page.locator('img').evaluateAll(images=>Promise.all(images.map(img=>img.decode())));
  await page.screenshot({path:resolve(directory,name+'.png'),fullPage:true});
  await page.screenshot({path:resolve(directory,name+'-hero.png')});
  for(const width of [1920,1440,390,320]) {
   await page.setViewportSize({width,height:1080});
   const metrics=await page.evaluate(()=>({viewport:innerWidth,scrollWidth:document.documentElement.scrollWidth,images:[...document.images].map(i=>({loaded:i.complete&&i.naturalWidth>0,src:i.getAttribute('src')}))}));
   results.push({variant:name,...metrics,errors});
   if(width===390) await page.screenshot({path:resolve(directory,name+'-mobile.png'),fullPage:true});
  }
  await page.close();
 }
} finally {await browser.close();}
const tiles=[];
for(let i=0;i<variants.length;i++) {
 const [name,title,description]=variants[i];
 const image=await sharp(resolve(directory,name+'-hero.png')).resize(608,456).png().toBuffer();
 const x=24+i*632;
 tiles.push({input:image,left:x,top:160});
 const label=Buffer.from(`<svg width="608" height="112"><rect width="608" height="112" fill="#202523"/><text x="16" y="34" fill="#f5f6ef" font-family="Arial" font-size="24" font-weight="bold">${title}</text><text x="16" y="68" fill="#c3ccc5" font-family="Arial" font-size="18">${description}</text><text x="16" y="96" fill="#a6e3b5" font-family="Arial" font-size="16">Mockup sahaja · gambar sebenar · tiada terminal dominan</text></svg>`);
 tiles.push({input:label,left:x,top:616});
}
const heading=Buffer.from('<svg width="1920" height="136"><text x="32" y="56" fill="#f5f6ef" font-family="Arial" font-size="36" font-weight="bold">TENGKU YUSOFF / 3 ARAH REKA BENTUK MODEN</text><text x="32" y="100" fill="#bfc9c2" font-family="Arial" font-size="22">Pilih komposisi dan suasana dahulu. Laman sedia ada belum ditukar.</text></svg>');
tiles.push({input:heading,left:0,top:0});
await sharp({create:{width:1920,height:752,channels:4,background:'#151917'}}).composite(tiles).png().toFile(resolve(directory,'comparison.png'));
await writeFile(resolve(directory,'verification.json'),JSON.stringify(results,null,2));
console.log(JSON.stringify(results,null,2));
if(results.some(r=>r.scrollWidth>r.viewport||r.errors.length||r.images.some(i=>!i.loaded)))process.exitCode=1;
else console.log('PASS: three concepts rendered; images loaded; no horizontal overflow at all checked widths.');

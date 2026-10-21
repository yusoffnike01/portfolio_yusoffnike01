import { chromium } from '@playwright/test';
import { mkdir } from 'node:fs/promises';
await mkdir('public/social',{recursive:true});
const browser=await chromium.launch({headless:true});
try {
 const page=await browser.newPage({viewport:{width:1200,height:630},deviceScaleFactor:1});
 await page.setContent(`<!doctype html><html lang="en"><style>*{box-sizing:border-box}body{margin:0;background:#1d2024;color:#e5e7eb;font-family:Arial,sans-serif;padding:72px;border:18px solid #2b3034;width:1200px;height:630px}header{font:18px monospace;color:#4ade80;letter-spacing:3px;margin-bottom:45px}h1{font-size:94px;line-height:1;margin:0 0 30px;letter-spacing:-5px;font-weight:600}h1 span{color:#4ade80}p{font-size:25px;color:#a7b5ab;margin-bottom:44px}footer{border-top:1px solid #294333;padding-top:22px;font:17px monospace;color:#4ade80}</style><body><header>TENGKU YUSOFF / PORTFOLIO</header><h1>Tengku Yusoff<span>_</span></h1><p>Full-Stack &amp; Mobile App Developer</p><footer>Node.js / React / Next.js / NestJS / Flutter</footer></body></html>`);
 await page.screenshot({path:'public/social/portfolio.png'});
 console.log('Generated public/social/portfolio.png (1200x630)');
} finally { await browser.close(); }

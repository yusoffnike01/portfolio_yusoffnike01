import {test,expect} from '@playwright/test';

test('profile photo loads on home and about pages in both languages and remains responsive',async({page,request})=>{
 for(const lang of ['ms','en']) for(const section of ['','about/']) {
  for(const width of [320,390,768,1440,1920]) {
   await page.setViewportSize({width,height:1080});
   await page.goto(`/${lang}/${section}`);
   const photo=page.getByRole('img',{name:lang==='ms'?'Gambar profil Tengku Yusoff':'Profile photo of Tengku Yusoff',exact:true});
   await expect(photo).toBeVisible();
   await expect(photo).toHaveAttribute('src','/social/profile-portrait.webp');
   expect(await photo.evaluate(el=>el.complete && el.naturalWidth>0)).toBeTruthy();
   const box=await photo.boundingBox();
   expect(box.width).toBeGreaterThanOrEqual(100);
   expect(box.height).toBeGreaterThan(box.width);
   expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBeTruthy();
  }
 }
 const response=await request.get('/social/profile-portrait.webp');
 expect(response.status()).toBe(200);
 expect(response.headers()['content-type']).toContain('image/webp');
});

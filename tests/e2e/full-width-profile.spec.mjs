import {test,expect} from '@playwright/test';

test('content uses screen width and profile photo is prominent on desktop',async({page})=>{
 await page.setViewportSize({width:1920,height:1200});
 for(const lang of ['ms','en'])for(const section of ['','about/']){
  await page.goto(`/${lang}/${section}`);
  const width=await page.getByTestId('portfolio-content').evaluate(el=>el.getBoundingClientRect().width);
  expect(width,`content spans desktop at ${lang}/${section}`).toBeGreaterThanOrEqual(1920*0.88);
  const photo=page.getByRole('img',{name:lang==='ms'?'Gambar profil Tengku Yusoff':'Profile photo of Tengku Yusoff',exact:true});
  const box=await photo.boundingBox();expect(box.width).toBeGreaterThanOrEqual(section?260:220);
 }
});

test('fuller layout and large portrait reflow on phones without horizontal scrolling',async({page})=>{
 for(const width of [320,390,768,1440,1920,2560]){
  await page.setViewportSize({width,height:1100});await page.goto('/en/');
  expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBeTruthy();
  const photo=page.getByRole('img',{name:'Profile photo of Tengku Yusoff',exact:true});
  expect((await photo.boundingBox()).width).toBeGreaterThanOrEqual(width<=600?160:180);
 }
});

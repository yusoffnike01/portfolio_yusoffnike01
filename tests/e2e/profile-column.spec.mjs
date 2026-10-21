import {test,expect} from '@playwright/test';

test('portrait occupies the right column beside the complete introduction on desktop',async({page})=>{
 for(const lang of ['ms','en'])for(const width of [1440,1920]){
  await page.setViewportSize({width,height:1200});await page.goto(`/${lang}/`);
  const photo=page.getByRole('img',{name:lang==='ms'?'Gambar profil Tengku Yusoff':'Profile photo of Tengku Yusoff',exact:true});
  const portrait=await photo.evaluate(el=>{const b=el.parentElement.getBoundingClientRect();return{x:b.x,y:b.y,width:b.width,height:b.height};});
  expect(portrait.width).toBeGreaterThanOrEqual(360);
  expect(portrait.height).toBeGreaterThan(portrait.width);
  const heading=await page.getByRole('heading',{level:1}).boundingBox();
  expect(Math.abs(heading.y-portrait.y)).toBeLessThanOrEqual(4);
  for(const content of [page.getByTestId('portfolio-intro'),page.getByTestId('experience-summary')]){
   const box=await content.boundingBox();expect(box.x+box.width).toBeLessThanOrEqual(portrait.x-24);
  }
  const contact=await page.locator('main').getByRole('link',{name:lang==='ms'?'Hubungi':'Get in touch',exact:true}).first().boundingBox();
  expect(contact.x+contact.width).toBeLessThan(portrait.x);
 }
});

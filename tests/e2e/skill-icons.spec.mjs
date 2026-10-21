import {test,expect} from '@playwright/test';
import {skills} from '../../src/lib/site.mjs';

for(const lang of ['ms','en'])test(`all technology logos load and remain centered in both themes (${lang})`,async({page})=>{
 for(const section of ['','about/']){
  await page.goto(`/${lang}/${section}`);
  const logos=page.getByTestId('skill-logo');
  await expect(logos).toHaveCount(skills.length);
  for(const theme of ['dark','light']){
   await page.evaluate(value=>document.documentElement.dataset.theme=value,theme);
   const results=await logos.evaluateAll(async images=>{
    await Promise.all(images.map(image=>{image.loading='eager';return image.decode();}));
    return images.map(image=>{
     const box=image.getBoundingClientRect(),frame=image.parentElement.getBoundingClientRect();
     return {src:image.getAttribute('src'),loaded:image.complete&&image.naturalWidth>0,alt:image.alt,hidden:image.parentElement.getAttribute('aria-hidden'),centerX:Math.abs(box.x+box.width/2-frame.x-frame.width/2),centerY:Math.abs(box.y+box.height/2-frame.y-frame.height/2)};
    });
   });
   for(const result of results){
    expect(result.loaded).toBe(true);expect(result.alt).toBe('');expect(result.hidden).toBe('true');
    expect(result.centerX).toBeLessThan(1);expect(result.centerY).toBeLessThan(1);
   }
  }
  for(const width of [320,390,768,1440,1920]){
   await page.setViewportSize({width,height:1000});
   expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBe(true);
  }
 }
});

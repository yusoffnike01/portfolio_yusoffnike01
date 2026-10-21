import {test,expect} from '@playwright/test';

for(const lang of ['en','ms']){
 test(`introduction continuously types all roles and interests without pause controls (${lang})`,async({page})=>{
  test.setTimeout(65000);
  await page.goto(`/${lang}/`);
  const intro=page.getByTestId('rotating-intro'),text=page.getByTestId('rotating-intro-text');
  await intro.scrollIntoViewIfNeeded();
  await expect(intro).toHaveAttribute('data-active','true');
  const initial=await intro.boundingBox(),seen=new Set();
  const deadline=Date.now()+45000;
  while(seen.size<6&&Date.now()<deadline){
   if(await intro.getAttribute('data-phase')==='hold')seen.add(await intro.getAttribute('data-index'));
   const box=await intro.boundingBox();
   expect(Math.abs(box.height-initial.height)).toBeLessThan(1);
   await page.waitForTimeout(100);
  }
  expect(seen.size).toBe(6);
  await expect(intro.getByRole('button')).toHaveCount(0);
  await expect(intro).toHaveAttribute('data-active','true');
 });
 test(`introduction is static with reduced motion and reflows on phones (${lang})`,async({page})=>{
  await page.emulateMedia({reducedMotion:'reduce'});
  await page.goto(`/${lang}/`);
  const intro=page.getByTestId('rotating-intro'),text=page.getByTestId('rotating-intro-text');
  for(const width of [320,390,768,1440,1920]){
   await page.setViewportSize({width,height:1000});
   await intro.scrollIntoViewIfNeeded();
   await expect(intro).toHaveAttribute('data-reduced','true');
   await expect(intro.getByRole('button')).toHaveCount(0);
   const box=await intro.boundingBox();
   expect(box.x+box.width).toBeLessThanOrEqual(width);
   expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBe(true);
  }
  const stopped=await text.innerText();
  await page.waitForTimeout(1000);
  expect(await text.innerText()).toBe(stopped);
 });
}

test('introduction remains readable without JavaScript',async({browser})=>{
 const context=await browser.newContext({javaScriptEnabled:false});
 const page=await context.newPage();
 try{
  await page.goto('/en/');
  await expect(page.getByTestId('rotating-intro-text')).toHaveText("I'm a Full-Stack Developer.");
  await expect(page.getByTestId('rotating-intro').getByRole('button')).toHaveCount(0);
 }finally{await context.close();}
});

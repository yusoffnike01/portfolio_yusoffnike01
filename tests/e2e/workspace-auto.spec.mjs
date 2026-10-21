import {test,expect} from '@playwright/test';
import sharp from 'sharp';

test('3D activates automatically without pressing an activation button',async({page})=>{
 test.setTimeout(60000);
 await page.goto('/ms/');
 await expect(page.getByTestId('workspace-scene')).toHaveAttribute('data-mode','interactive',{timeout:30000});
 await expect(page.getByRole('button',{name:'Putar setup',exact:true})).toBeVisible();
 await expect(page.getByRole('button',{name:'Aktifkan 3D',exact:true})).toHaveCount(0);
});

test('transparent WebGL iframe matches the page background in dark and light themes',async({page})=>{
 test.setTimeout(60000);
 await page.setViewportSize({width:1440,height:1000});await page.goto('/en/');
 const activate=page.getByRole('button',{name:'Activate 3D',exact:true});if(await activate.isVisible())await activate.click();
 await expect(page.getByTestId('workspace-scene')).toHaveAttribute('data-mode','interactive',{timeout:30000});
 const frame=page.locator('iframe[title="Interactive MacBook Pro workspace"]');
 for(const theme of ['dark','light']){
  if(await page.locator('html').getAttribute('data-theme')!==theme)await page.getByTestId('theme-toggle').click();
  const expected=await page.locator('body').evaluate(el=>getComputedStyle(el).backgroundColor.match(/\d+/g).slice(0,3).map(Number));
  const buffer=await frame.screenshot();
  const pixel=[...await sharp(buffer).extract({left:8,top:8,width:1,height:1}).removeAlpha().raw().toBuffer()];
  expect(pixel,`iframe corner must match ${theme} page, not opaque white`).toEqual(expected);
 }
 await page.getByTestId('theme-toggle').click();
 await page.screenshot({path:'test-results/modern-transparent-3d.png',fullPage:true});
});

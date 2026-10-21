import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import { locales, paths, route } from '../../src/lib/site.mjs';
test('every bilingual route has no serious accessibility violations or browser errors', async ({page})=>{
 test.setTimeout(90000);
 const errors=[];
 page.on('pageerror',error=>errors.push(error.message));
 for(const lang of locales) for(const path of paths) {
   const response=await page.goto(route(lang,path));
   expect(response.status(), route(lang,path)).toBe(200);
   await expect(page.locator('html')).toHaveAttribute('lang',lang);
   await expect(page.getByRole('heading',{level:1})).toHaveCount(1);
   const results=await new AxeBuilder({page}).withTags(['wcag2a','wcag2aa','wcag21aa','wcag22aa']).analyze();
   expect(results.violations,route(lang,path)).toEqual([]);
 }
 expect(errors).toEqual([]);
});

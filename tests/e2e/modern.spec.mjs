import {test,expect} from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

test('approved Modern Dark composition, Flutter and real profile are visible before optional terminal',async({page})=>{
 await page.goto('/ms/');
 await expect(page.getByTestId('workspace-scene')).toBeVisible();
 await expect(page.getByRole('img',{name:'Gambar profil Tengku Yusoff',exact:true})).toBeVisible();
 await expect(page.getByRole('heading',{level:1})).toHaveText('Tengku Yusoff');
 await expect(page.getByTestId('portfolio-intro')).toContainText('Flutter');
 const positions=await page.evaluate(()=>({scene:document.querySelector('[data-testid=workspace-scene]').getBoundingClientRect().top,identity:document.querySelector('h1').getBoundingClientRect().top}));
 expect(positions.scene).toBeLessThan(positions.identity);
 const terminal=page.locator('details[data-testid=optional-terminal]');
 await expect(terminal).not.toHaveAttribute('open','');
 await expect(page.getByRole('textbox',{name:'Arahan terminal',exact:true})).not.toBeVisible();
 await page.getByTestId('theme-toggle').click();await expect(page.locator('html')).toHaveAttribute('data-theme','light');
 expect((await new AxeBuilder({page}).withTags(['wcag2a','wcag2aa','wcag21aa','wcag22aa']).analyze()).violations).toEqual([]);
 await page.getByTestId('theme-toggle').click();await expect(page.locator('html')).toHaveAttribute('data-theme','dark');
});

test('workspace Three.js loads locally and has MacBook Pro, one monitor, no person and no tower',async({page})=>{
 test.setTimeout(90000);
 await page.setViewportSize({width:1920,height:1350});
 await page.goto('/en/');
 // The approved scene now activates automatically after hydration.
 await expect(page.getByTestId('workspace-scene')).toHaveAttribute('data-mode','interactive',{timeout:60000});
 const frame=page.frameLocator('iframe[title="Interactive MacBook Pro workspace"]');
 const features=await frame.locator('body').evaluate(()=>({features:window.__deskReview.features,calls:window.__deskReview.renderer.info.render.calls}));
 expect(features.features.macBookPro).toBe(true);expect(features.features.person).toBe(false);expect(features.features.monitors).toBe(1);expect(features.features.pcTower).toBe(false);
 expect(features.calls).toBeLessThan(100);
 await page.getByRole('button',{name:'Rotate setup',exact:true}).click();
 await expect(page.getByRole('button',{name:'Rotate setup',exact:true})).toHaveAttribute('aria-pressed','true');
 await page.getByRole('button',{name:'Reset view',exact:true}).click();
 await expect(page.getByRole('button',{name:'Rotate setup',exact:true})).toHaveAttribute('aria-pressed','false');
 await expect(frame.locator('canvas')).toBeVisible();
 await frame.locator('canvas').evaluate(()=>window.__deskReview.render());
 await page.screenshot({path:'test-results/modern-desktop-3d.png',fullPage:true});
 console.log('Optimized workspace draw calls:',features.calls);
});

test('workspace image remains when WebGL modules fail',async({page})=>{
 await page.route('**/workspace/vendor/**',route=>route.abort());
 await page.goto('/en/');
 await expect(page.getByTestId('workspace-scene')).toHaveAttribute('data-mode','fallback',{timeout:20000});
 await expect(page.getByRole('img',{name:'MacBook Pro setup with an external monitor and empty chair',exact:true})).toBeVisible();
 await expect(page.getByTestId('workspace-status')).toContainText('3D is unavailable');
});

import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
test('terminal commands, history, safety, effects and keyboard navigation', async ({ page }) => {
  const errors = []; page.on('pageerror', error => errors.push(error.message));
  await page.goto('/ms/');
  await page.getByTestId('optional-terminal').locator('summary').click();
  const input = page.getByLabel('Arahan terminal', {exact:true});
  await expect(input).not.toBeFocused();
  const run = async (value) => { await input.fill(value); await input.press('Enter'); };
  for (const command of ['help','whoami','about','skills','projects','experience','resume','contact','sudo hire-me','theme']) {
    await run(command); await expect(page.getByTestId('terminal-entry').last()).toContainText(command);
  }
  await page.getByRole('button', {name:'Matrix tanpa efek',exact:true}).last().click();
  await expect(page.getByTestId('terminal')).toHaveAttribute('data-effects','off');
  await run('history'); await expect(page.getByTestId('terminal-entry').last()).toContainText('sudo hire-me');
  await run('clear'); await expect(page.getByTestId('terminal-entry')).toHaveCount(0);
  await input.press('ArrowUp'); await expect(input).toHaveValue('clear');
  await run('history'); await expect(page.getByTestId('terminal-entry').last()).toContainText('clear');
  await run('<img src=x onerror="alert(1)">');
  await expect(page.getByTestId('terminal-entry').last()).toContainText('Arahan tidak dikenali');
  await expect(page.getByTestId('terminal-entry').last().locator('img')).toHaveCount(0);
  await run('x'.repeat(201)); await expect(page.getByTestId('terminal-entry').last()).toContainText('maksimum 200');
  await page.reload(); await expect(page.getByTestId('terminal-entry')).toHaveCount(0);
  await page.getByTestId('optional-terminal').locator('summary').click();
  await input.focus(); await input.press('Tab'); await expect(page.getByRole('button',{name:'Hantar',exact:true})).toBeFocused();
  expect(errors).toEqual([]);
});
test('language switching keeps equivalent project, metadata and 404 are correct', async ({ page, request }) => {
  await page.goto('/ms/projects/forecastify-edu/');
  await page.getByRole('link', {name:'EN',exact:true}).click();
  await expect(page).toHaveURL(/\/en\/projects\/forecastify-edu\//);
  await expect(page.locator('html')).toHaveAttribute('lang','en');
  await expect(page.getByRole('heading',{level:1})).toHaveText('Forecastify Edu');
  await expect(page.locator('meta[name=robots]')).toHaveAttribute('content','noindex, follow');
  expect((await request.get('/missing-page/')).status()).toBe(404);
  expect((await request.get('/fr/')).status()).toBe(404);
  expect((await request.get('/en/projects/missing/')).status()).toBe(404);
});
test('responsive layout, mobile menu, reduced motion and automated accessibility', async ({ page }) => {
  for (const width of [320,390,768,1440]) {
    await page.setViewportSize({width,height:900}); await page.goto('/ms/');
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBeTruthy();
    await expect(page.getByRole('heading',{level:1})).toBeVisible();
  }
  await page.setViewportSize({width:390,height:844});
  await page.getByRole('button',{name:'Menu',exact:true}).click();
  await page.getByRole('link',{name:'Tentang',exact:true}).click();
  await expect(page).toHaveURL(/\/ms\/about\//);
  await page.emulateMedia({reducedMotion:'reduce'}); await page.goto('/en/');
  await expect(page.getByTestId('terminal')).toHaveAttribute('data-effects','off');
  const result = await new AxeBuilder({page}).withTags(['wcag2a','wcag2aa','wcag21aa','wcag22aa']).analyze();
  expect(result.violations).toEqual([]);
  await page.screenshot({path:'test-results/mobile.png',fullPage:true});
  await page.setViewportSize({width:1440,height:1000}); await page.goto('/ms/');
  await page.screenshot({path:'test-results/desktop.png',fullPage:true});
});
test('core content works with JavaScript disabled', async ({browser}) => {
  const context = await browser.newContext({javaScriptEnabled:false});
  const page = await context.newPage(); await page.goto('http://127.0.0.1:3000/en/');
  await expect(page.getByRole('heading',{level:1})).toContainText('Tengku Yusoff');
  await page.getByRole('link',{name:'Explore projects',exact:true}).click();
  await expect(page).toHaveURL(/\/en\/projects\//);
  await expect(page.getByRole('heading',{level:2})).toHaveCount(3);
  await context.close();
});

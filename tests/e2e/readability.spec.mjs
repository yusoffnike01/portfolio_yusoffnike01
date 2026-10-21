import { test, expect } from '@playwright/test';

test('layout uses the full viewport with readable typography on wide and mobile screens', async ({ page }) => {
  for (const width of [320, 390, 768, 1024, 1440, 1920, 2560]) {
    await page.setViewportSize({ width, height: 1080 });
    await page.goto('/ms/');
    const layout = await page.locator('main').evaluate(el => {
      const box = el.getBoundingClientRect();
      const style = getComputedStyle(el);
      return { width: box.width, contentWidth: box.width-parseFloat(style.paddingLeft)-parseFloat(style.paddingRight) };
    });
    expect(layout.width, `main fills viewport at ${width}px`).toBeGreaterThanOrEqual(width - 1);
    if (width >= 1440) expect(layout.contentWidth / width, 'content uses at least 88% of desktop width').toBeGreaterThanOrEqual(0.88);
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth), `no overflow at ${width}`).toBeTruthy();
    const intro = page.getByTestId('portfolio-intro');
    expect(await intro.evaluate(el=>parseFloat(getComputedStyle(el).fontSize))).toBeGreaterThanOrEqual(18);
    await page.getByTestId('optional-terminal').locator('summary').click();
    const input = page.getByRole('textbox', {name:'Arahan terminal',exact:true});
    expect(await input.evaluate(el=>parseFloat(getComputedStyle(el).fontSize))).toBeGreaterThanOrEqual(16);
  }
});

test('visible interface labels do not use micro text', async ({ page }) => {
  for (const width of [390, 1920]) {
    await page.setViewportSize({width,height:1080});
    await page.goto('/ms/');
    const undersized = await page.locator('body').evaluate(body => [...body.querySelectorAll('p,a,button,input,strong,small,span,label')].filter(el => {
      if (el.closest('[aria-hidden="true"], .sr-only')) return false;
      if (!el.getClientRects().length || getComputedStyle(el).visibility === 'hidden') return false;
      if (!el.matches('input') && ![...el.childNodes].some(n=>n.nodeType===Node.TEXT_NODE && n.textContent.trim())) return false;
      return parseFloat(getComputedStyle(el).fontSize)<14;
    }).map(el=>({text:el.textContent.trim().slice(0,80),size:getComputedStyle(el).fontSize})));
    expect(undersized, `no visible UI text below 14px at ${width}`).toEqual([]);
  }
});

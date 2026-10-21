import {test,expect} from '@playwright/test';

test('real biodata appears in both languages, terminal and experience without old placeholders',async({page,request})=>{
  for(const lang of ['ms','en']) {
    await page.goto(`/${lang}/`);
    await expect(page.getByTestId('portfolio-intro')).toContainText('5');
    await expect(page.getByTestId('portfolio-intro')).toContainText('3');
    await expect(page.getByTestId('portfolio-intro')).toContainText('Full-Stack Developer');
    for(const skill of ['Node.js','React','Next.js','NestJS']) await expect(page.locator('main strong').filter({hasText:new RegExp('^'+skill.replace(/[.*+?^${}()|[\]\\]/g,'\\$&')+'$')})).toBeVisible();
    await page.getByTestId('optional-terminal').locator('summary').click();
    const input=page.getByRole('textbox',{name:lang==='ms'?'Arahan terminal':'Terminal command',exact:true});
    await input.fill('experience');await input.press('Enter');
    const entry=page.getByTestId('terminal-entry').last();
    await expect(entry).toContainText('5');await expect(entry).toContainText('3');
    await input.fill('skills');await input.press('Enter');
    await expect(page.getByTestId('terminal-entry').last()).toContainText(lang==='ms'?'Sedang diterokai':'Currently exploring');
    await page.goto(`/${lang}/about/`);
    await expect(page.getByTestId('experience-summary')).toContainText('5');
    await expect(page.getByTestId('experience-summary')).toContainText('3');
    await expect(page.getByRole('main')).toContainText('brainstorming');
    await expect(page.getByRole('main')).toContainText('vibe coding');
    await page.goto(`/${lang}/experience/`);
    await expect(page.getByTestId('experience-summary')).toContainText(lang==='ms'?'Pembangunan full-stack':'Full-stack development');
    for(const section of ['','about/','projects/']) {
      await page.goto(`/${lang}/${section}`);
      expect(await page.locator('body').innerText()).not.toMatch(/\bPHP\b|8 (years|tahun)|Pengalaman sebenar akan ditambah|Real experience will be added/i);
    }
  }
  expect((await request.get('/ms/projects/php-dashboard/')).status()).toBe(404);
  expect((await request.get('/ms/projects/javascript-dashboard/')).status()).toBe(200);
});

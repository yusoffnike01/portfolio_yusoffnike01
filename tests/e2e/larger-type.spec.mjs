import {test,expect} from '@playwright/test';

test('larger type applies to navigation, languages, terminal caption and both language page bodies',async({page})=>{
  await page.setViewportSize({width:1920,height:1080});
  for(const lang of ['ms','en']) {
    await page.goto(`/${lang}/`);
    const font=locator=>locator.evaluate(el=>parseFloat(getComputedStyle(el).fontSize));
    const navigation=page.locator('header nav').first();
    expect(await font(navigation.getByRole('link').first())).toBeGreaterThanOrEqual(20);
    expect(await font(page.getByRole('link',{name:'EN',exact:true}))).toBeGreaterThanOrEqual(18);
    expect(await font(page.getByTestId('workspace-status'))).toBeGreaterThanOrEqual(18);
    await page.getByTestId('optional-terminal').locator('summary').click();
    expect(await font(page.getByTestId('terminal').locator('input'))).toBeGreaterThanOrEqual(20);
    expect(await font(page.getByTestId('portfolio-intro'))).toBeGreaterThanOrEqual(22);
    await page.goto(`/${lang}/about/`);
    expect(await font(page.getByTestId('page-description'))).toBeGreaterThanOrEqual(22);
    expect(await page.locator('main').evaluate(el=>el.getBoundingClientRect().width)).toBeGreaterThanOrEqual(1919);
  }
});

test('larger text remains readable without horizontal overflow on every page at narrow widths',async({page})=>{
  test.setTimeout(90000);
  const sections=['','about','projects','projects/forecastify-edu','experience','contact'];
  for(const lang of ['ms','en']) for(const width of [320,390,768,1024,1920]) {
    await page.setViewportSize({width,height:1080});
    for(const section of sections) {
      await page.goto(`/${lang}/${section?section+'/':''}`);
      expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),`${lang}/${section} at ${width}`).toBeTruthy();
    }
  }
});

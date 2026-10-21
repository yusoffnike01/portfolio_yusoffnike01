import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync,existsSync} from 'node:fs';
import {locales,paths} from '../../src/lib/site.mjs';

test('static export contains no AI Lab page or navigation links',()=>{
 for(const lang of locales){
  assert.ok(!existsSync(`out/${lang}/ai-lab/index.html`),`${lang} must not export AI Lab`);
  for(const path of paths){
   const html=readFileSync(`out/${lang}/${path?path+'/':''}index.html`,'utf8');
   assert.ok(!html.includes(`href="/${lang}/ai-lab/"`),`${lang}/${path} must not link to AI Lab`);
  }
  const home=readFileSync(`out/${lang}/index.html`,'utf8');
  assert.ok(home.includes(`href="/${lang}/contact/"`));
  assert.ok(home.includes('href="mailto:tengkuyusoff19@gmail.com"'));
 }
 assert.ok(!readFileSync('out/sitemap.xml','utf8').includes('/ai-lab/'));
});

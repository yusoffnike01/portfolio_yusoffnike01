import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';

test('home and contact exports expose the exact approved email in BM and EN',()=>{
 for(const lang of ['ms','en'])for(const section of ['','contact/']){
  const html=readFileSync(`out/${lang}/${section}index.html`,'utf8');
  assert.ok(html.includes('href="mailto:tengkuyusoff19@gmail.com"'),`${lang}/${section} must contain the approved mailto link`);
  assert.ok(html.includes('tengkuyusoff19@gmail.com'));
  assert.ok(!html.includes('Contact channels coming soon.'));
  assert.ok(!html.includes('Saluran hubungan akan ditambah.'));
 }
});

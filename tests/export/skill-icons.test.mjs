import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync,existsSync} from 'node:fs';
import {skills} from '../../src/lib/site.mjs';

test('all skill logos are present in static HTML and copied into the export',()=>{
 for(const lang of ['ms','en'])for(const section of ['','about/']){
  const html=readFileSync(`out/${lang}/${section}index.html`,'utf8');
  assert.equal((html.match(/data-testid="skill-logo"/g)||[]).length,skills.length);
  for(const skill of skills){
   assert.ok(html.includes(`src="${skill.icon}"`),`${lang}/${section} must show ${skill.name} logo`);
   assert.ok(existsSync(`out${skill.icon}`),`${skill.icon} must be exported locally`);
  }
 }
});

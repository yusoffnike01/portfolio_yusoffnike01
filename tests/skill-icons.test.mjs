import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {skills} from '../src/lib/site.mjs';

test('every skill has a safe local SVG icon without remote runtime dependencies',()=>{
 assert.equal(skills.length,10);
 for(const skill of skills){
  assert.match(skill.icon||'',/^\/icons\/skills\/[a-z0-9-]+\.svg$/,`${skill.name} needs a local icon`);
  const svg=readFileSync(`public${skill.icon}`,'utf8');
  assert.match(svg,/<svg\b/);
  assert.match(svg,/viewBox="0 0 24 24"/);
  assert.match(svg,/<path\b/);
  assert.doesNotMatch(svg,/<script|<foreignObject|<image|onload=|javascript:|href=/i);
 }
});

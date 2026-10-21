import test from 'node:test';
import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';

for(const file of ['design-previews/threejs-coding/macbook-desk.js','public/workspace/scene.js']){
 test(`${file} uses AOC branding instead of the old monitor username`,async()=>{
  const scene=await readFile(new URL(`../${file}`,import.meta.url),'utf8');
  assert.ok(!scene.includes('yusoffnike01'),'old monitor username must be removed');
  assert.ok(scene.includes("screenTexture(i?'code':'workspace','AOC')"));
  assert.ok(scene.includes("fillText('AOC',600,370)"));
  for(const side of ['front','back'])assert.ok(scene.includes(`name='monitor-aoc-${side}'`));
  assert.equal(scene.match(/branding:'monitor-aoc',text:'AOC'/g)?.length,2);
  assert.ok(scene.includes("name='macbook-apple-logo'"),'Apple lid logo must remain');
 });
}

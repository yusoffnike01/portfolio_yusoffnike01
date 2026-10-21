import test from 'node:test';
import assert from 'node:assert/strict';
import {dictionaries} from '../src/lib/site.mjs';

test('animated introduction has six equivalent roles and interests in both languages',()=>{
 for(const lang of ['ms','en']){
  const intro=dictionaries[lang].rotatingIntro;
  assert.ok(intro,'localized animated introduction must be available');
  assert.equal(intro.phrases.length,6);
  assert.match(intro.phrases[0],/Full-Stack/);
  assert.match(intro.phrases[1],/Mobile|mobile/);
  assert.match(intro.phrases[2],/DevOps/);
  assert.match(intro.phrases[3],/AI automation/);
  assert.match(intro.phrases[4],/coding|kod/);
  assert.match(intro.phrases[5],/badminton/);
  assert.ok(intro.label);
 }
 assert.match(dictionaries.en.rotatingIntro.phrases[2],/exploring/i);
 assert.match(dictionaries.en.rotatingIntro.phrases[3],/exploring/i);
 assert.match(dictionaries.ms.rotatingIntro.phrases[2],/meneroka/i);
 assert.match(dictionaries.ms.rotatingIntro.phrases[3],/meneroka/i);
});

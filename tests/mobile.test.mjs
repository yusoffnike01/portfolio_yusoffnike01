import {test} from 'node:test';
import assert from 'node:assert/strict';
import {profile,skills,dictionaries,pageMetadata} from '../src/lib/site.mjs';
test('mobile profile and bilingual scene labels use confirmed Flutter experience',()=>{
 assert.equal(profile.displayTitle,'Full-Stack & Mobile App Developer');
 assert.ok(skills.some(s=>s.name==='Flutter'&&s.status==='core'));
 for(const lang of ['ms','en']){
  const d=dictionaries[lang];assert.match(d.intro,/Flutter/);assert.match(d.aboutBody,/Flutter/);
  for(const key of ['greeting','sceneAlt','activate3d','sceneUnavailable','rotateScene','resetScene','themeLight','themeDark','optionalTerminal'])assert.ok(d[key],`${lang}/${key}`);
  assert.match(pageMetadata(lang,'').title,/Mobile/);
 }
});

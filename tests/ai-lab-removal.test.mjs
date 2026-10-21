import test from 'node:test';
import assert from 'node:assert/strict';
import {sections,paths,dictionaries,getPage,pageMetadata,skills,profile} from '../src/lib/site.mjs';
import {COMMANDS,parseCommand} from '../src/lib/terminal.mjs';

test('AI Lab is absent from routes, navigation, metadata and terminal commands',()=>{
 assert.deepEqual(sections,['','about','projects','experience','contact']);
 assert.ok(!paths.includes('ai-lab'));
 assert.ok(!COMMANDS.includes('ai-lab'));
 assert.equal(parseCommand('ai-lab').status,'unknown');
 for(const lang of ['ms','en']){
  assert.ok(!dictionaries[lang].nav.includes('AI Lab'));
  assert.equal(dictionaries[lang].nav.length,sections.length);
  assert.equal(getPage(lang,'ai-lab'),null);
  assert.deepEqual(pageMetadata(lang,'ai-lab'),{});
  assert.equal(dictionaries[lang].help['ai-lab'],undefined);
  assert.equal(getPage(lang,'contact').title,lang==='ms'?'Hubungi':'Contact');
 }
});

test('removing AI Lab preserves the approved AI automation interest and contact email',()=>{
 assert.ok(profile.contacts.some(contact=>contact.href==='mailto:tengkuyusoff19@gmail.com'));
 assert.ok(skills.some(skill=>skill.name==='AI Automation'&&skill.status==='exploring'));
 for(const lang of ['ms','en'])assert.ok(dictionaries[lang].rotatingIntro.phrases.some(phrase=>phrase.includes('AI automation')));
});

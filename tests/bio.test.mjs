import {test} from 'node:test';
import assert from 'node:assert/strict';
import {profile,skills,projects,dictionaries,pageMetadata} from '../src/lib/site.mjs';
test('biodata uses user-provided experience and JavaScript skills without inventing combined years',()=>{
 assert.equal(profile.jobTitle,'Full-Stack Developer');
 assert.equal(profile.experienceYears,5);
 assert.equal(profile.freelanceYears,3);
 for(const name of ['Node.js','React','Next.js','NestJS']) assert.ok(skills.some(s=>s.name===name && s.status==='core'));
 for(const name of ['DevOps','AI Automation']) assert.ok(skills.some(s=>s.name===name && s.status==='exploring'));
 assert.ok(!JSON.stringify({profile,skills,projects,dictionaries}).match(/php/i));
 for(const lang of ['ms','en']) {
   const d=dictionaries[lang];
   assert.match(d.intro,/5/); assert.match(d.intro,/3/);
   assert.match(d.aboutBody,/Full-Stack.*Developer/);
   assert.match(d.experienceSummary,/5/);assert.match(d.experienceSummary,/3/);
   assert.ok(d.aiApproach.includes('brainstorming'));
   assert.ok(d.learningNote && d.exploringLabel && d.coreLabel);
   assert.match(pageMetadata(lang,'').title,/Full-Stack.*Developer/);
   assert.ok(!/8\s*(years|tahun)/i.test(JSON.stringify(d)));
 }
});

import test from 'node:test';
import assert from 'node:assert/strict';
import {skills,dictionaries} from '../src/lib/site.mjs';

test('approved infrastructure skills appear once with neutral skill labels in BM and EN',()=>{
 for(const name of ['Docker','Docker Swarm','Kubernetes (K8s)']){
  const matches=skills.filter(skill=>skill.name===name);
  assert.equal(matches.length,1,`${name} must appear exactly once`);
  assert.equal(matches[0].status,'skill','do not infer core focus or proficiency from a confirmed skill');
 }
 for(const lang of ['ms','en']){
  assert.ok(dictionaries[lang].skillLabel);
  for(const name of ['Docker','Docker Swarm','Kubernetes (K8s)'])assert.ok(dictionaries[lang].skillsNote.includes(name));
  assert.doesNotMatch(dictionaries[lang].skillsNote,/expert|certified|pakar|bertauliah/i);
 }
 assert.ok(skills.some(skill=>skill.name==='DevOps'&&skill.status==='exploring'));
 assert.ok(skills.some(skill=>skill.name==='AI Automation'&&skill.status==='exploring'));
});

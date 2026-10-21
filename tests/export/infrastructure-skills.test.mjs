import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';

test('home and about exports contain the approved infrastructure skills with neutral labels',()=>{
 for(const lang of ['ms','en'])for(const section of ['','about/']){
  const html=readFileSync(`out/${lang}/${section}index.html`,'utf8');
  const label=lang==='ms'?'Kemahiran':'Skill';
  for(const name of ['Docker','Docker Swarm','Kubernetes (K8s)'])assert.ok(html.includes(`<strong>${name}</strong><span>${label}</span>`),`${lang}/${section} must render ${name} as ${label}`);
 }
});

import test from 'node:test';
import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
import {Vector3,Euler} from '../public/workspace/vendor/three.module.js';

for(const file of ['design-previews/threejs-coding/macbook-desk.js','public/workspace/scene.js']){
 test(`${file} contains the tan Tomaz-style chair rather than green upholstery`,async()=>{
  const source=await readFile(new URL(`../${file}`,import.meta.url),'utf8');
  const chair=source.slice(source.indexOf('// Tomaz Syrix II'),source.indexOf('let rotating=false'));
  assert.ok(chair.includes("model:'Tomaz Syrix II',color:'brown'"),'brown Tomaz chair must be present');
  for(const name of ['chair-tan-back','chair-tan-seat','chair-head-pillow','chair-lumbar-pillow','chair-tomaz-wordmark'])assert.ok(chair.includes(`'${name}'`),`${name} must be present`);
  assert.ok(chair.includes("fillText('TOMAZ'"));
  assert.ok(chair.includes("fillText('Heritage'"));
  assert.ok(!/M\.(fabric|trim)/.test(chair),'old green upholstery must not be used');
 });
 test(`${file} sets a 100-degree angle between the seat and backrest`,async()=>{
  const source=await readFile(new URL(`../${file}`,import.meta.url),'utf8');
  const angle=Number(source.match(/chairBack\.rotation\.x=(-?[\d.]+)/)?.[1]);
  const backDirection=new Vector3(0,1,0).applyEuler(new Euler(angle,0,0));
  const seatForward=new Vector3(0,0,-1);
  assert.ok(backDirection.z>0,'top of backrest must lean away from the desk, not over the seat');
  assert.ok(Math.abs(backDirection.angleTo(seatForward)*180/Math.PI-100)<0.000001,'physical seat-to-backrest angle must be 100 degrees');
 });
}

import {chromium} from '@playwright/test';
import assert from 'node:assert/strict';
import {writeFile,copyFile} from 'node:fs/promises';
import {dirname,resolve} from 'node:path';
import {fileURLToPath} from 'node:url';
import {createPreviewServer} from './serve.mjs';
const directory=dirname(fileURLToPath(import.meta.url));
await copyFile(resolve(directory,'../portrait.webp'),resolve(directory,'desk-profile.webp'));
const server=createPreviewServer();await new Promise(resolve=>server.listen(0,'127.0.0.1',resolve));
const url=`http://127.0.0.1:${server.address().port}/desk-only.html`;
const browser=await chromium.launch({args:['--use-angle=swiftshader','--enable-unsafe-swiftshader']});
const errors=[],checks=[];
try{
 const page=await browser.newPage({viewport:{width:1600,height:1100},deviceScaleFactor:1});page.on('pageerror',e=>errors.push(e.message));
 await page.goto(url+'?capture=scene');await page.waitForSelector('body[data-scene-ready=true]',{timeout:60000});
 const scene=await page.evaluate(()=>{const r=window.__deskReview;r.render();return {engine:r.engine,revision:r.revision,features:r.features,monitors:r.setup.children.filter(o=>o.name.startsWith('monitor-')).length,chair:!!r.setup.getObjectByName('empty-chair'),triangles:r.renderer.info.render.triangles,calls:r.renderer.info.render.calls};});
 assert.equal(scene.engine,'Three.js');assert.equal(scene.features.person,false);assert.equal(scene.monitors,2);assert.equal(scene.chair,true);assert.equal(scene.features.platform,false);
 checks.push({test:'workstation scene with two monitors, empty chair, no person or platform',status:'pass',...scene});
 await page.locator('canvas').screenshot({path:resolve(directory,'desk-only-scene.png')});
 const transparent=await page.evaluate(()=>window.__deskReview.renderer.domElement.toDataURL('image/png').split(',')[1]);await writeFile(resolve(directory,'desk-only-transparent.png'),Buffer.from(transparent,'base64'));
 await page.setViewportSize({width:1920,height:1350});await page.goto(url+'?capture=page');await page.waitForSelector('body[data-scene-ready=true]');await page.locator('img').evaluateAll(imgs=>Promise.all(imgs.map(i=>i.decode())));
 await page.screenshot({path:resolve(directory,'desk-only-portfolio.png')});await page.screenshot({path:resolve(directory,'desk-only-full-page.png'),fullPage:true});
 checks.push({test:'top scene / biography below, portrait loaded',status:'pass'});
 await page.goto(url);await page.waitForSelector('body[data-scene-ready=true]');
 await page.getByRole('button',{name:'Putar setup',exact:true}).click();await page.waitForFunction(()=>window.__deskReview.setup.rotation.y>0.004);
 await page.getByRole('button',{name:'Reset sudut',exact:true}).click();assert.equal(await page.evaluate(()=>window.__deskReview.setup.rotation.y),0);assert.equal(await page.evaluate(()=>window.__deskReview.rotating),false);
 checks.push({test:'rotate and reset empty desk',status:'pass'});
 await page.getByRole('button',{name:'Tukar tema',exact:true}).click();assert.equal(await page.locator('body').evaluate(el=>el.classList.contains('theme-light')),true);await page.getByRole('button',{name:'Tukar tema',exact:true}).click();
 checks.push({test:'light/dark theme button',status:'pass'});
 await page.emulateMedia({reducedMotion:'reduce'});await page.getByRole('button',{name:'Putar setup',exact:true}).click();assert.equal(await page.evaluate(()=>window.__deskReview.rotating),false);checks.push({test:'reduced motion blocks automatic rotation',status:'pass'});
 for(const width of [320,390,768,1440,1920]){
  await page.setViewportSize({width,height:1000});await page.waitForFunction(()=>{const c=document.querySelector('canvas'),s=document.getElementById('stage');return Math.abs(c.width-s.clientWidth)<2;});
  const metrics=await page.evaluate(()=>({width:innerWidth,scroll:document.documentElement.scrollWidth,canvas:document.querySelector('canvas').width}));assert.ok(metrics.scroll<=width);checks.push({test:'responsive layout',status:'pass',...metrics});
 }
 await page.setViewportSize({width:390,height:1000});await page.waitForFunction(()=>document.querySelector('canvas').width===document.getElementById('stage').clientWidth);await page.screenshot({path:resolve(directory,'desk-only-mobile.png'),fullPage:true});
 assert.deepEqual(errors,[]);await writeFile(resolve(directory,'desk-only-verification.json'),JSON.stringify({checks,errors},null,2));console.log(JSON.stringify({checks,errors},null,2));
}finally{await browser.close();await new Promise(resolve=>server.close(resolve));}

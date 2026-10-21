import {chromium} from '@playwright/test';
import assert from 'node:assert/strict';
import {writeFile} from 'node:fs/promises';
import {resolve,dirname} from 'node:path';
import {fileURLToPath} from 'node:url';
import {createPreviewServer} from './serve.mjs';

const directory=dirname(fileURLToPath(import.meta.url));
const server=createPreviewServer();
await new Promise((resolve,reject)=>{server.once('error',reject);server.listen(0,'127.0.0.1',resolve);});
const url=`http://127.0.0.1:${server.address().port}`;
const browser=await chromium.launch({args:['--use-angle=swiftshader','--enable-unsafe-swiftshader']});
const errors=[];
const checks=[];
try{
 const page=await browser.newPage({viewport:{width:1600,height:1200},deviceScaleFactor:1});
 page.on('pageerror',error=>errors.push(error.message));
 await page.goto(url+'/?capture=scene');
 await page.waitForSelector('body[data-scene-ready=true]',{timeout:60000});
 const stats=await page.evaluate(()=>{
  const review=window.__sceneReview;review.render();
  return {engine:review.engine,revision:review.revision,webgl2:review.renderer.getContext() instanceof WebGL2RenderingContext,objects:review.scene.children[0].children.length,triangles:review.renderer.info.render.triangles,drawCalls:review.renderer.info.render.calls,width:review.renderer.domElement.width,height:review.renderer.domElement.height};
 });
 assert.equal(stats.engine,'Three.js');assert.equal(stats.webgl2,true);assert.ok(stats.triangles>1000);
 await page.locator('canvas').screenshot({path:resolve(directory,'coding-workspace.png')});
 const transparent=await page.evaluate(()=>{window.__sceneReview.render();return window.__sceneReview.renderer.domElement.toDataURL('image/png').split(',')[1];});
 await writeFile(resolve(directory,'coding-workspace-transparent.png'),Buffer.from(transparent,'base64'));
 checks.push({test:'actual Three.js WebGL2 render',status:'pass',...stats});
 await page.setViewportSize({width:1920,height:1080});
 await page.goto(url+'/?capture=hero');
 await page.waitForSelector('body[data-scene-ready=true]');
 await page.locator('canvas').evaluate(()=>window.__sceneReview.render());
 await page.screenshot({path:resolve(directory,'portfolio-hero-preview.png')});
 checks.push({test:'portfolio hero context image',status:'pass',width:1920,height:1080});
 await page.goto(url+'/');await page.waitForSelector('body[data-scene-ready=true]');
 await page.getByRole('button',{name:'Gerakan tangan',exact:true}).click();
 await page.waitForFunction(()=>window.__sceneReview.animationActive);
 const before=await page.evaluate(()=>window.__sceneReview.renderer.info.render.frame);
 await page.waitForFunction(frame=>window.__sceneReview.renderer.info.render.frame>frame+1,before);
 await page.getByRole('button',{name:'Gerakan tangan',exact:true}).click();
 assert.equal(await page.evaluate(()=>window.__sceneReview.animationActive),false);
 checks.push({test:'typing animation starts, renders frames and stops',status:'pass'});
 await page.evaluate(()=>{window.__sceneReview.camera.zoom=1.3;window.__sceneReview.camera.position.x+=0.4;window.__sceneReview.controls.update();});
 await page.getByRole('button',{name:'Reset sudut',exact:true}).click();
 assert.equal(await page.evaluate(()=>window.__sceneReview.camera.zoom),1);
 assert.ok(Math.abs(await page.evaluate(()=>window.__sceneReview.camera.position.x)+7.5)<0.001);
 checks.push({test:'reset camera position and zoom',status:'pass'});
 await page.emulateMedia({reducedMotion:'reduce'});
 await page.getByRole('button',{name:'Gerakan tangan',exact:true}).click();
 assert.equal(await page.evaluate(()=>window.__sceneReview.animationActive),false);
 checks.push({test:'reduced motion prevents typing animation',status:'pass'});
 for(const width of [320,390,768,1440,1920]){
  await page.setViewportSize({width,height:1000});
  await page.waitForFunction(()=>{const c=document.querySelector('canvas'),s=document.getElementById('stage');return Math.abs(c.width-s.clientWidth*Math.min(devicePixelRatio,2))<2 && Math.abs(c.height-s.clientHeight*Math.min(devicePixelRatio,2))<2;});
  const dimensions=await page.evaluate(()=>({width:innerWidth,scroll:document.documentElement.scrollWidth,canvas:document.querySelector('canvas').width}));
  assert.ok(dimensions.scroll<=width,`horizontal overflow at ${width}`);assert.ok(dimensions.canvas>0);
  checks.push({test:'responsive scene and layout',status:'pass',...dimensions});
 }
 await page.setViewportSize({width:390,height:1000});
 await page.locator('canvas').evaluate(()=>window.__sceneReview.render());
 await page.screenshot({path:resolve(directory,'mobile-preview.png'),fullPage:true});
 assert.deepEqual(errors,[]);
 checks.push({test:'browser page errors',status:'pass',errors});
 await writeFile(resolve(directory,'verification.json'),JSON.stringify({checks,errors},null,2));
 console.log(JSON.stringify({checks,errors},null,2));
}finally{
 await browser.close();
 await new Promise(resolve=>server.close(resolve));
}

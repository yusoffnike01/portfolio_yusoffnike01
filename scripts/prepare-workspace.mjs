import {mkdir,readFile,writeFile,copyFile} from 'node:fs/promises';
import {resolve,dirname} from 'node:path';
import sharp from 'sharp';

// Export already-approved, pinned Three.js files; no npm installation or CDN.
const root=resolve('.');
const library=resolve(root,'design-previews/threejs-coding/node_modules/three');
const destination=resolve(root,'public/workspace');
await mkdir(resolve(destination,'vendor'),{recursive:true});
await mkdir(resolve(root,'public/images'),{recursive:true});
await mkdir(resolve(root,'public/social'),{recursive:true});
for(const file of ['three.module.js','three.core.js'])await copyFile(resolve(library,'build',file),resolve(destination,'vendor',file));
for(const [source,name] of [['controls/OrbitControls.js','OrbitControls.js'],['geometries/RoundedBoxGeometry.js','RoundedBoxGeometry.js'],['utils/BufferGeometryUtils.js','BufferGeometryUtils.js']]){
 const text=(await readFile(resolve(library,'examples/jsm',source),'utf8')).replaceAll("from 'three'","from './three.module.js'");
 await writeFile(resolve(destination,'vendor',name),text);
}
await copyFile(resolve(library,'LICENSE'),resolve(destination,'vendor','THREE-LICENSE.txt'));
await sharp(resolve(root,'design-previews/threejs-coding/macbook-branded-transparent.png')).resize({width:1400,withoutEnlargement:true}).webp({quality:88,alphaQuality:90}).toFile(resolve(root,'public/images/workspace.webp'));
await sharp(resolve(root,'public/social/profile_profolio.jpeg')).rotate().extract({left:330,top:530,width:360,height:450}).webp({quality:88}).toFile(resolve(root,'public/social/profile-portrait.webp'));
let scene=await readFile(resolve(root,'design-previews/threejs-coding/macbook-desk.js'),'utf8');
scene=scene.replace("from 'three'","from './vendor/three.module.js'").replace("from 'three/addons/geometries/RoundedBoxGeometry.js'","from './vendor/RoundedBoxGeometry.js'").replace("from 'three/addons/controls/OrbitControls.js'","from './vendor/OrbitControls.js'");
scene="import {mergeGeometries} from './vendor/BufferGeometryUtils.js';\n"+scene;
scene=scene.replace('Math.min(devicePixelRatio,2)','Math.min(devicePixelRatio,1.5)').replace('key.shadow.mapSize.set(2048,2048)','key.shadow.mapSize.set(1024,1024)').replace('new RoundedBoxGeometry(w,h,d,2,','new RoundedBoxGeometry(w,h,d,1,');
scene=scene.replace('controls.target.copy(target);controls.enablePan=false;','controls.target.copy(target);controls.enableZoom=false;controls.enablePan=false;');
scene=scene.replace("renderer.domElement.setAttribute('aria-label','MacBook Pro 3D dengan satu monitor luaran, papan kekunci dan kerusi kosong tanpa orang');","renderer.domElement.setAttribute('aria-label',document.documentElement.lang==='ms'?'MacBook Pro 3D dengan monitor luaran dan kerusi kosong':'3D MacBook Pro setup with an external monitor and empty chair');");
scene=scene.replace("let rotating=false,raf=0,last=0;",`// Merge static meshes by material to reduce draw calls without changing placement.
setup.updateMatrixWorld(true);
const buckets=new Map(),originals=[];
setup.traverse(object=>{
 if(!object.isMesh||Array.isArray(object.material)||object.userData.branding||object.userData.chairDetail)return;
 const key=object.material.uuid+'|'+object.castShadow+'|'+object.receiveShadow;
 if(!buckets.has(key))buckets.set(key,{material:object.material,cast:object.castShadow,receive:object.receiveShadow,geometries:[]});
 let geometry=object.geometry.index?object.geometry.toNonIndexed():object.geometry.clone();
 for(const attr of Object.keys(geometry.attributes))if(!['position','normal','uv'].includes(attr))geometry.deleteAttribute(attr);
 geometry.applyMatrix4(object.matrixWorld);buckets.get(key).geometries.push(geometry);originals.push(object);
});
for(const bucket of buckets.values()){
 const geometry=mergeGeometries(bucket.geometries,false);
 if(!geometry)throw new Error('Workspace geometry merge failed');
 const batch=new THREE.Mesh(geometry,bucket.material);batch.castShadow=bucket.cast;batch.receiveShadow=bucket.receive;setup.add(batch);
 for(const source of bucket.geometries)source.dispose();
}
for(const object of originals){object.parent.remove(object);object.geometry.dispose();}
let rotating=false,raf=0,last=0;`);
scene=scene.replace("if(rotating)raf=requestAnimationFrame(tick);else render();}","if(rotating)raf=requestAnimationFrame(tick);else render();if(parent!==window)parent.postMessage({type:'workspace:rotation',rotating},location.origin);}");
scene+=`\nwindow.addEventListener('message',event=>{if(event.origin!==location.origin||event.source!==parent||event.data?.type!=='workspace:command')return;if(event.data.command==='rotate')setRotation(!rotating);if(event.data.command==='reset')document.getElementById('reset').click();});
document.addEventListener('visibilitychange',()=>{if(document.hidden)setRotation(false);});
window.addEventListener('pagehide',()=>{setRotation(false);controls.dispose();renderer.dispose();});
if(parent!==window)parent.postMessage({type:'workspace:ready'},location.origin);\n`;
await writeFile(resolve(destination,'scene.js'),scene);
console.log('Prepared local Three.js workspace, merged geometry, portrait and transparent fallback.');

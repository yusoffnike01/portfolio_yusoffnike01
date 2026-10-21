import * as THREE from 'three';
import {RoundedBoxGeometry} from 'three/addons/geometries/RoundedBoxGeometry.js';
import {OrbitControls} from 'three/addons/controls/OrbitControls.js';

// Revision 2: workstation only. No human geometry or character animation.
const stage=document.getElementById('stage');
const scene=new THREE.Scene();
const setup=new THREE.Group();setup.name='workstation';scene.add(setup);
const camera=new THREE.OrthographicCamera(-5,5,4,-4,0.1,100);
const initialPosition=new THREE.Vector3(-7,5.6,9);
const target=new THREE.Vector3(0,1.65,0.3);
camera.position.copy(initialPosition);camera.lookAt(target);
let renderer;
try{renderer=new THREE.WebGLRenderer({antialias:true,alpha:true,preserveDrawingBuffer:true,powerPreference:'low-power'});}
catch(error){stage.textContent='WebGL tidak tersedia. Gunakan PNG pratonton yang disediakan.';throw error;}
renderer.setPixelRatio(Math.min(devicePixelRatio,2));
renderer.setClearColor('#1d2024',0);
renderer.outputColorSpace=THREE.SRGBColorSpace;
renderer.toneMapping=THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure=1.02;
renderer.shadowMap.enabled=true;renderer.shadowMap.type=THREE.PCFSoftShadowMap;
renderer.domElement.setAttribute('role','img');
renderer.domElement.setAttribute('aria-label','Meja PC 3D dengan dua monitor, papan kekunci hijau dan kerusi kosong tanpa orang');
stage.appendChild(renderer.domElement);
const controls=new OrbitControls(camera,renderer.domElement);
controls.target.copy(target);controls.enablePan=false;controls.enableDamping=false;
controls.minPolarAngle=Math.PI/5;controls.maxPolarAngle=Math.PI/2.15;
controls.minZoom=0.7;controls.maxZoom=1.8;controls.update();
const mat=(color,extra={})=>new THREE.MeshStandardMaterial({color,roughness:0.8,...extra});
const M={wood:mat('#927b64'),edge:mat('#665544'),black:mat('#181d21'),case:mat('#293037'),chair:mat('#22282c'),fabric:mat('#293733'),trim:mat('#4b7660'),metal:mat('#526367',{metalness:0.48,roughness:0.42}),keys:mat('#26342a'),keyLight:mat('#83c293',{emissive:'#457a4b',emissiveIntensity:0.3}),led:mat('#a6efb6',{emissive:'#64bc82',emissiveIntensity:0.6}),cream:mat('#d5cfbf')};
function mesh(geometry,material,parent=setup){const m=new THREE.Mesh(geometry,material);m.castShadow=true;m.receiveShadow=true;parent.add(m);return m;}
function box(w,h,d,material,p,parent=setup,r=0.035){const o=mesh(new RoundedBoxGeometry(w,h,d,2,Math.min(r,w/2,h/2,d/2)),material,parent);o.position.set(...p);return o;}
function cylinder(rt,rb,h,material,p,parent=setup){const o=mesh(new THREE.CylinderGeometry(rt,rb,h,24),material,parent);o.position.set(...p);return o;}
function bar(a,b,r,material,parent=setup){const start=new THREE.Vector3(...a),end=new THREE.Vector3(...b),delta=end.clone().sub(start);const o=mesh(new THREE.CylinderGeometry(r,r,delta.length(),16),material,parent);o.position.copy(start.add(end).multiplyScalar(0.5));o.quaternion.setFromUnitVectors(new THREE.Vector3(0,1,0),delta.normalize());return o;}
function ring(radius,tube,material,p,parent=setup){const o=mesh(new THREE.TorusGeometry(radius,tube,8,36),material,parent);o.position.set(...p);return o;}
scene.add(new THREE.HemisphereLight('#e7eee8','#68716c',2.1));
const key=new THREE.DirectionalLight('#fff0dd',3.4);key.position.set(-4,8,5);key.castShadow=true;key.shadow.mapSize.set(2048,2048);Object.assign(key.shadow.camera,{left:-7,right:7,top:7,bottom:-6,near:0.5,far:25});key.shadow.bias=-0.0003;key.shadow.normalBias=0.018;scene.add(key);
const fill=new THREE.DirectionalLight('#b5d1c3',1.15);fill.position.set(5,4,-4);scene.add(fill);
const shadow=new THREE.Mesh(new THREE.PlaneGeometry(50,50),new THREE.ShadowMaterial({opacity:0.25}));shadow.rotation.x=-Math.PI/2;shadow.position.y=-0.015;shadow.receiveShadow=true;scene.add(shadow);

// Slim desktop and rectangular frame; no raised platform.
const desk=new THREE.Group();desk.name='desk';setup.add(desk);
box(5.9,0.17,2.15,M.wood,[0,1.98,0],desk,0.035);
box(5.82,0.07,2.09,M.edge,[0,1.88,0],desk,0.02);
for(const x of [-2.65,2.65]){
 for(const z of [-0.86,0.86])box(0.11,1.82,0.11,M.case,[x,0.94,z],desk,0.015);
 box(0.12,0.1,1.92,M.case,[x,0.09,0],desk,0.015);
}
box(5.3,0.1,0.1,M.case,[0,0.65,-0.86],desk,0.01);
box(5.2,0.018,1.37,M.black,[-0.12,2.075,0.22],desk,0.05);

function screenTexture(kind){
 const c=document.createElement('canvas');c.width=1200;c.height=740;const ctx=c.getContext('2d');
 ctx.fillStyle='#0b1211';ctx.fillRect(0,0,1200,740);ctx.fillStyle='#1b2722';ctx.fillRect(0,0,1200,65);
 ctx.font='22px monospace';ctx.fillStyle='#9ab6a4';ctx.fillText(kind==='code'?'workspace / developer.ts':'projects / web + mobile',36,42);
 ctx.fillStyle='#17231c';ctx.fillRect(0,65,152,675);ctx.font='20px monospace';ctx.fillStyle='#6c9a7a';['src','app','api','mobile','tests'].forEach((s,i)=>ctx.fillText(s,22,117+i*53));
 const rows=kind==='code'?['const developer = {','  name: "Tengku Yusoff",','  web: ["React", "Next.js"],','  api: ["Node.js", "NestJS"],','  mobile: "Flutter"','};','','// Build. Review. Improve.']:['function build() {','  plan();','  develop();','  review();','  test();','}','','// Concept workspace'];
 ctx.font='27px monospace';rows.forEach((s,i)=>{ctx.fillStyle='#49684f';ctx.fillText(String(i+1),180,120+i*62);ctx.fillStyle=i%3===0?'#9dd7ab':'#72ad82';ctx.fillText(s,225,120+i*62);});
 const texture=new THREE.CanvasTexture(c);texture.colorSpace=THREE.SRGBColorSpace;texture.anisotropy=renderer.capabilities.getMaxAnisotropy();return texture;
}
for(const [i,x,y,z,angle]of [[0,-1.27,2.93,-0.53,0.19],[1,1.02,3.00,-0.56,-0.16]]){
 const monitor=new THREE.Group();monitor.name='monitor-'+i;monitor.position.set(x,y,z);monitor.rotation.y=angle;setup.add(monitor);
 box(2.20,1.46,0.12,M.black,[0,0,0],monitor,0.04);
 const screen=new THREE.Mesh(new THREE.PlaneGeometry(2.04,1.28),new THREE.MeshBasicMaterial({map:screenTexture(i?'code':'workspace')}));screen.position.set(0,0.025,0.065);monitor.add(screen);
 box(0.08,0.03,0.012,M.led,[0.94,-0.65,0.068],monitor,0.005);
 const standHeight=y-2.12-0.73;
 box(0.10,standHeight+0.05,0.1,M.case,[0,-0.73-standHeight/2,0],monitor,0.02);
 box(0.70,0.05,0.36,M.case,[0,2.11-y,0.03],monitor,0.02);
}
const keyboard=new THREE.Group();keyboard.name='keyboard';keyboard.position.set(-0.93,2.11,0.54);setup.add(keyboard);
box(1.65,0.075,0.60,M.black,[0,0,0],keyboard,0.025);
box(1.59,0.012,0.55,M.led,[0,0.035,0],keyboard,0.02);
for(let row=0;row<4;row++)for(let col=0;col<13;col++){
 if(row===3&&col>=3&&col<=8)continue;
 box(0.10,0.032,0.10,(row+col)%6===0?M.keyLight:M.keys,[-0.75+col*0.125,0.061,-0.22+row*0.145],keyboard,0.008);
}
box(0.73,0.033,0.10,M.keys,[-0.06,0.061,0.215],keyboard,0.008);
const mouse=mesh(new THREE.SphereGeometry(0.17,24,16),M.black);mouse.position.set(0.24,2.17,0.59);mouse.scale.set(0.8,0.35,1.08);
box(0.014,0.02,0.06,M.led,[0.24,2.23,0.54],setup,0.005);
box(0.36,0.035,0.64,M.case,[1.10,2.12,0.6],setup,0.04);
box(0.30,0.006,0.53,mat('#526559'),[1.10,2.142,0.59],setup,0.025);
const cup=new THREE.Group();cup.position.set(2.20,2.22,-0.12);setup.add(cup);
cylinder(0.14,0.125,0.26,M.cream,[0,0,0],cup);const rim=ring(0.128,0.014,M.cream,[0,0.13,0],cup);rim.rotation.x=Math.PI/2;
cylinder(0.115,0.115,0.005,mat('#48382c'),[0,0.13,0],cup);ring(0.09,0.02,M.cream,[0.16,0,0],cup);

const tower=new THREE.Group();tower.name='pc-tower';tower.position.set(2.08,0.71,-0.35);setup.add(tower);
box(0.65,1.28,1.0,M.case,[0,0,0],tower,0.05);box(0.56,1.14,0.02,M.black,[0,0,0.51],tower,0.02);
for(const y of [-0.27,0.26]){ring(0.19,0.016,M.led,[0,y,0.53],tower);for(let i=0;i<5;i++){const a=i*2*Math.PI/5;const blade=box(0.055,0.13,0.01,M.case,[Math.sin(a)*0.1,y+Math.cos(a)*0.1,0.534],tower,0.015);blade.rotation.z=-a+0.4;}}
box(0.04,0.018,0.015,M.led,[0.20,0.52,0.535],tower,0.004);
const cableCurve=new THREE.CatmullRomCurve3([new THREE.Vector3(1.1,2.20,-0.60),new THREE.Vector3(1.5,1.60,-0.91),new THREE.Vector3(2.0,1.4,-0.88),new THREE.Vector3(2.0,0.75,-0.80)]);
mesh(new THREE.TubeGeometry(cableCurve,20,0.018,6,false),M.black);

// Empty gaming-style chair: geometric upholstery, slim accent panels.
const chair=new THREE.Group();chair.name='empty-chair';chair.position.set(-1.25,0,1.77);chair.rotation.y=-0.15;setup.add(chair);
box(1.10,0.18,0.98,M.chair,[0,1.05,-0.03],chair,0.08);
box(0.78,0.04,0.84,M.fabric,[0,1.15,-0.02],chair,0.065);
const shape=new THREE.Shape();shape.moveTo(-0.35,0);shape.lineTo(0.35,0);shape.lineTo(0.49,0.35);shape.lineTo(0.46,1.10);shape.lineTo(0.29,1.46);shape.lineTo(-0.29,1.46);shape.lineTo(-0.46,1.10);shape.lineTo(-0.49,0.35);shape.closePath();
const backGeometry=new THREE.ExtrudeGeometry(shape,{depth:0.14,bevelEnabled:true,bevelSegments:2,steps:1,bevelSize:0.035,bevelThickness:0.025});
const back=mesh(backGeometry,M.chair,chair);back.position.set(0,1.08,0.40);back.rotation.x=-0.10;
box(0.56,1.06,0.08,M.fabric,[0,1.87,0.57],chair,0.12);
for(const x of [-0.33,0.33]){const strip=box(0.10,1.12,0.05,M.trim,[x,1.83,0.57],chair,0.035);strip.rotation.z=x<0?-0.10:0.10;}
box(0.42,0.21,0.09,M.black,[0,2.29,0.59],chair,0.065);
box(0.50,0.08,0.02,M.trim,[0,1.58,0.64],chair,0.025);
for(const x of [-0.59,0.59]){bar([x,1.1,0],[x,1.61,0],0.035,M.case,chair);box(0.13,0.07,0.59,M.case,[x,1.63,0.01],chair,0.035);}
cylinder(0.075,0.095,0.7,M.metal,[0,0.61,0],chair);
for(let i=0;i<5;i++){const a=i*Math.PI*2/5,x=Math.sin(a)*0.68,z=Math.cos(a)*0.68;bar([0,0.31,0],[x,0.19,z],0.042,M.case,chair);const wheel=cylinder(0.09,0.09,0.1,M.black,[x,0.105,z],chair);wheel.rotation.z=Math.PI/2;}

let rotating=false,raf=0,last=0;
const reduced=matchMedia('(prefers-reduced-motion: reduce)');
function render(){renderer.render(scene,camera);}
function resize(){const width=stage.clientWidth,height=stage.clientHeight,aspect=width/height;const spanX=Math.max(8.9,5.1*aspect),spanY=spanX/aspect;camera.left=-spanX/2;camera.right=spanX/2;camera.top=spanY/2;camera.bottom=-spanY/2;camera.updateProjectionMatrix();renderer.setSize(width,height,false);render();}
function tick(time){if(!rotating)return;if(time-last>1000/24){setup.rotation.y+=0.0025;render();last=time;}raf=requestAnimationFrame(tick);}
function setRotation(value){rotating=Boolean(value)&&!reduced.matches;cancelAnimationFrame(raf);document.getElementById('rotate').setAttribute('aria-pressed',String(rotating));if(rotating)raf=requestAnimationFrame(tick);else render();}
controls.addEventListener('change',render);new ResizeObserver(resize).observe(stage);
document.getElementById('rotate').addEventListener('click',()=>setRotation(!rotating));
document.getElementById('reset').addEventListener('click',()=>{setRotation(false);setup.rotation.y=0;camera.position.copy(initialPosition);camera.zoom=1;controls.target.copy(target);controls.update();camera.updateProjectionMatrix();render();});
document.getElementById('download').addEventListener('click',()=>{render();const a=document.createElement('a');a.download='desk-only-threejs.png';a.href=renderer.domElement.toDataURL('image/png');a.click();});
reduced.addEventListener('change',()=>{if(reduced.matches)setRotation(false);});
window.__deskReview={engine:'Three.js',revision:THREE.REVISION,scene,setup,renderer,camera,controls,render,setRotation,get rotating(){return rotating;},features:{person:false,monitors:2,emptyChair:true,platform:false}};
resize();document.body.dataset.sceneReady='true';

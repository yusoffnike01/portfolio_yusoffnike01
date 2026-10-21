import * as THREE from 'three';
import {RoundedBoxGeometry} from 'three/addons/geometries/RoundedBoxGeometry.js';
import {OrbitControls} from 'three/addons/controls/OrbitControls.js';

// Revision 3: stylized MacBook Pro with one external display. No person.
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
renderer.domElement.setAttribute('aria-label','MacBook Pro 3D dengan satu monitor luaran, papan kekunci dan kerusi kosong tanpa orang');
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

function screenTexture(kind,brand=''){
 const c=document.createElement('canvas');c.width=1200;c.height=740;const ctx=c.getContext('2d');
 ctx.fillStyle='#0b1211';ctx.fillRect(0,0,1200,740);ctx.fillStyle='#1b2722';ctx.fillRect(0,0,1200,65);
 ctx.font='22px monospace';ctx.fillStyle='#9ab6a4';ctx.fillText(kind==='code'?'workspace / developer.ts':'projects / web + mobile',36,42);
 ctx.fillStyle='#17231c';ctx.fillRect(0,65,152,675);ctx.font='20px monospace';ctx.fillStyle='#6c9a7a';['src','app','api','mobile','tests'].forEach((s,i)=>ctx.fillText(s,22,117+i*53));
 const rows=kind==='code'?['const developer = {','  name: "Tengku Yusoff",','  web: ["React", "Next.js"],','  api: ["Node.js", "NestJS"],','  mobile: "Flutter"','};','','// Build. Review. Improve.']:['function build() {','  plan();','  develop();','  review();','  test();','}','','// Concept workspace'];
 if(brand){ctx.font='italic 900 110px Arial, sans-serif';ctx.fillStyle='#e5e8eb';ctx.textAlign='center';ctx.fillText(brand,690,175);ctx.textAlign='left';}
 const start=brand?250:120,gap=brand?50:62;
 ctx.font='27px monospace';rows.forEach((s,i)=>{ctx.fillStyle='#49684f';ctx.fillText(String(i+1),180,start+i*gap);ctx.fillStyle=i%3===0?'#9dd7ab':'#72ad82';ctx.fillText(s,225,start+i*gap);});
 const texture=new THREE.CanvasTexture(c);texture.colorSpace=THREE.SRGBColorSpace;texture.anisotropy=renderer.capabilities.getMaxAnisotropy();return texture;
}
for(const [i,x,y,z,angle]of [[1,0.80,3.04,-0.56,-0.14]]){
 const monitor=new THREE.Group();monitor.name='monitor-'+i;monitor.position.set(x,y,z);monitor.rotation.y=angle;setup.add(monitor);
 box(2.20,1.46,0.12,M.black,[0,0,0],monitor,0.04);
 const screen=new THREE.Mesh(new THREE.PlaneGeometry(2.04,1.28),new THREE.MeshBasicMaterial({map:screenTexture(i?'code':'workspace','AOC')}));screen.position.set(0,0.025,0.065);screen.name='monitor-aoc-front';screen.userData={branding:'monitor-aoc',text:'AOC'};monitor.add(screen);
 // Branding on the rear remains readable when the user orbits behind the desk.
 const labelCanvas=document.createElement('canvas');labelCanvas.width=1200;labelCanvas.height=740;
 const labelContext=labelCanvas.getContext('2d');labelContext.font='italic 900 180px Arial, sans-serif';labelContext.fillStyle='#e5e8eb';labelContext.textAlign='center';labelContext.textBaseline='middle';labelContext.fillText('AOC',600,370);
 const labelTexture=new THREE.CanvasTexture(labelCanvas);labelTexture.colorSpace=THREE.SRGBColorSpace;
 const rearLabel=new THREE.Mesh(new THREE.PlaneGeometry(2.04,1.28),new THREE.MeshBasicMaterial({map:labelTexture,transparent:true,depthWrite:false,toneMapped:false}));rearLabel.position.set(0,0.025,-0.063);rearLabel.rotation.y=Math.PI;rearLabel.name='monitor-aoc-back';rearLabel.userData={branding:'monitor-aoc',text:'AOC'};monitor.add(rearLabel);
 box(0.08,0.03,0.012,M.led,[0.94,-0.65,0.068],monitor,0.005);
 const standHeight=y-2.12-0.73;
 box(0.10,standHeight+0.05,0.1,M.case,[0,-0.73-standHeight/2,0],monitor,0.02);
 box(0.70,0.05,0.36,M.case,[0,2.11-y,0.03],monitor,0.02);
}
const keyboard=new THREE.Group();keyboard.name='keyboard';keyboard.position.set(0.60,2.11,0.54);setup.add(keyboard);
box(1.65,0.075,0.60,M.black,[0,0,0],keyboard,0.025);
box(1.59,0.012,0.55,M.led,[0,0.035,0],keyboard,0.02);
for(let row=0;row<4;row++)for(let col=0;col<13;col++){
 if(row===3&&col>=3&&col<=8)continue;
 box(0.10,0.032,0.10,(row+col)%6===0?M.keyLight:M.keys,[-0.75+col*0.125,0.061,-0.22+row*0.145],keyboard,0.008);
}
box(0.73,0.033,0.10,M.keys,[-0.06,0.061,0.215],keyboard,0.008);
const mouse=mesh(new THREE.SphereGeometry(0.17,24,16),M.black);mouse.position.set(1.84,2.17,0.59);mouse.scale.set(0.8,0.35,1.08);
box(0.014,0.02,0.06,M.led,[1.84,2.23,0.54],setup,0.005);
// Clear space in front of the monitor: no phone or extra desktop accessories.
const cup=new THREE.Group();cup.position.set(2.30,2.22,-0.30);setup.add(cup);
cylinder(0.14,0.125,0.26,M.cream,[0,0,0],cup);const rim=ring(0.128,0.014,M.cream,[0,0.13,0],cup);rim.rotation.x=Math.PI/2;
cylinder(0.115,0.115,0.005,mat('#48382c'),[0,0.13,0],cup);ring(0.09,0.02,M.cream,[0.16,0,0],cup);

// Stylized MacBook Pro: aluminium chassis, black keyboard, large trackpad and notched display.
// This is an original illustration, not an exact product-CAD model or hardware specification.
const aluminium=mat('#626b73',{metalness:0.72,roughness:0.38});
const deckMetal=mat('#7c858d',{metalness:0.60,roughness:0.43});
const trackpadMetal=mat('#929ba1',{metalness:0.62,roughness:0.36});
const macbook=new THREE.Group();macbook.name='macbook-pro';macbook.position.set(-1.76,2.12,0.03);macbook.rotation.y=-0.12;setup.add(macbook);
box(1.86,0.065,1.22,aluminium,[0,0,0],macbook,0.025);
box(1.81,0.011,1.17,deckMetal,[0,0.036,0],macbook,0.02);
box(1.40,0.007,0.47,M.black,[0,0.044,-0.19],macbook,0.025);
for(let row=0;row<5;row++)for(let col=0;col<13;col++){
 if(row===4&&col>=3&&col<=8)continue;
 box(0.079,0.010,0.063,M.black,[-0.555+col*0.092,0.054,-0.37+row*0.088],macbook,0.008);
}
box(0.54,0.010,0.063,M.black,[-0.049,0.054,-0.018],macbook,0.009);
box(0.70,0.003,0.33,trackpadMetal,[0,0.045,0.345],macbook,0.018);
for(const side of [-1,1])for(let slot=0;slot<10;slot++)box(0.070,0.002,0.009,M.black,[side*0.814,0.044,-0.37+slot*0.045],macbook,0.003);
for(const z of [-0.35,-0.10,0.18])box(0.009,0.020,0.12,M.black,[-0.933,-0.005,z],macbook,0.006);
for(const x of [-0.70,0.70])for(const z of [-0.43,0.43])cylinder(0.035,0.035,0.012,M.black,[x,-0.037,z],macbook);
const hinge=cylinder(0.035,0.035,1.49,M.black,[0,0.039,-0.55],macbook);hinge.rotation.z=Math.PI/2;
const lid=new THREE.Group();lid.name='macbook-display';lid.position.set(0,0.045,-0.55);lid.rotation.x=-0.22;macbook.add(lid);
box(1.86,1.18,0.055,aluminium,[0,0.59,0],lid,0.025);
// Local transparent Apple silhouette: no remote asset or font dependency.
const appleCanvas=document.createElement('canvas');appleCanvas.width=512;appleCanvas.height=512;
const appleContext=appleCanvas.getContext('2d');appleContext.fillStyle='#e5e8eb';
appleContext.beginPath();appleContext.moveTo(260,135);appleContext.bezierCurveTo(205,98,148,132,125,184);appleContext.bezierCurveTo(82,276,131,370,179,425);appleContext.bezierCurveTo(201,452,224,433,255,433);appleContext.bezierCurveTo(288,433,311,452,334,421);appleContext.bezierCurveTo(366,387,390,337,395,307);appleContext.bezierCurveTo(323,282,322,211,385,181);appleContext.bezierCurveTo(354,131,311,111,260,135);appleContext.closePath();appleContext.fill();
appleContext.beginPath();appleContext.moveTo(255,110);appleContext.bezierCurveTo(250,61,288,32,329,30);appleContext.bezierCurveTo(332,79,291,116,255,110);appleContext.closePath();appleContext.fill();
const appleTexture=new THREE.CanvasTexture(appleCanvas);appleTexture.colorSpace=THREE.SRGBColorSpace;
const appleLogo=new THREE.Mesh(new THREE.PlaneGeometry(0.5,0.5),new THREE.MeshBasicMaterial({map:appleTexture,transparent:true,depthWrite:false,toneMapped:false}));appleLogo.position.set(0,0.62,-0.031);appleLogo.rotation.y=Math.PI;appleLogo.name='macbook-apple-logo';appleLogo.userData={branding:'apple-logo'};lid.add(appleLogo);
box(1.78,1.10,0.008,M.black,[0,0.59,0.031],lid,0.02);
const laptopTexture=screenTexture('code');
const laptopContext=laptopTexture.image.getContext('2d');laptopContext.fillStyle='#1b2722';laptopContext.fillRect(0,0,1200,65);laptopContext.font='22px monospace';laptopContext.fillStyle='#c0d4c5';laptopContext.fillText('MacBook Pro / developer.ts',36,42);laptopTexture.needsUpdate=true;
const laptopScreen=new THREE.Mesh(new THREE.PlaneGeometry(1.70,1.04),new THREE.MeshBasicMaterial({map:laptopTexture}));laptopScreen.position.set(0,0.594,0.037);lid.add(laptopScreen);
box(0.20,0.064,0.008,M.black,[0,1.087,0.042],lid,0.010);
const cameraDot=new THREE.Mesh(new THREE.CircleGeometry(0.005,12),mat('#536979',{roughness:0.25}));cameraDot.position.set(0,1.09,0.047);lid.add(cameraDot);
const cableCurve=new THREE.CatmullRomCurve3([new THREE.Vector3(-0.86,2.115,-0.19),new THREE.Vector3(-0.50,2.108,-0.74),new THREE.Vector3(0.40,2.108,-0.82),new THREE.Vector3(0.80,2.17,-0.56)]);
mesh(new THREE.TubeGeometry(cableCurve,24,0.012,6,false),M.black);

// Tomaz Syrix II brown reference: stylized illustration, not an exact product model.
const chair=new THREE.Group();chair.name='empty-chair';chair.userData={model:'Tomaz Syrix II',color:'brown'};chair.position.set(0.28,0,1.89);chair.rotation.y=-0.15;setup.add(chair);
const tanLeather=mat('#b47b49',{roughness:0.67}),tanBolster=mat('#9c653c',{roughness:0.72}),blackLeather=mat('#17191c',{roughness:0.84}),pillowFabric=mat('#111316',{roughness:0.98});
box(1.15,0.18,1.02,blackLeather,[0,1.05,-0.03],chair,0.08);
const seat=box(0.86,0.09,0.88,tanLeather,[0,1.17,-0.07],chair,0.07);seat.name='chair-tan-seat';seat.userData.chairDetail=true;
for(const x of [-0.49,0.49]){const bolster=box(0.16,0.18,0.94,tanBolster,[x,1.18,-0.02],chair,0.065);bolster.rotation.z=x<0?-0.16:0.16;}
// Seat faces local -Z; positive X reclines the backrest away from the desk (+Z).
// 100-degree seat-to-backrest angle: recline 10 degrees from vertical.
const chairBack=new THREE.Group();chairBack.name='chair-backrest';chairBack.position.set(0,1.12,0.39);chairBack.rotation.x=0.17453292519943295;chair.add(chairBack);
const outline=[[-0.39,0],[0.39,0],[0.49,0.61],[0.57,1.12],[0.39,1.36],[0.28,1.70],[-0.28,1.70],[-0.39,1.36],[-0.57,1.12],[-0.49,0.61]];
const shape=new THREE.Shape();outline.forEach(([x,y],i)=>i?shape.lineTo(x,y):shape.moveTo(x,y));shape.closePath();
const backGeometry=new THREE.ExtrudeGeometry(shape,{depth:0.15,bevelEnabled:true,bevelSegments:3,steps:1,bevelSize:0.035,bevelThickness:0.025});
mesh(backGeometry,blackLeather,chairBack);
const tanShape=new THREE.Shape();outline.forEach(([x,y],i)=>i?tanShape.lineTo(x*0.89,y*0.96+0.035):tanShape.moveTo(x*0.89,y*0.96+0.035));tanShape.closePath();
const tanBack=mesh(new THREE.ExtrudeGeometry(tanShape,{depth:0.19,bevelEnabled:true,bevelSegments:3,steps:1,bevelSize:0.018,bevelThickness:0.015}),tanLeather,chairBack);tanBack.position.z=-0.02;tanBack.name='chair-tan-back';tanBack.userData.chairDetail=true;
// Raised brown side bolsters, black shoulder openings and pillow straps.
for(const x of [-0.38,0.38]){
 const bolster=box(0.15,0.92,0.17,tanBolster,[x,0.56,-0.08],chairBack,0.065);bolster.rotation.z=x<0?-0.12:0.12;
 const slot=box(0.17,0.21,0.025,blackLeather,[x*0.87,1.17,-0.047],chairBack,0.04);slot.rotation.z=x<0?-0.22:0.22;
 box(0.035,0.84,0.016,blackLeather,[x*0.72,0.75,-0.074],chairBack,0.006);
}
const headPillowShape=new THREE.Shape();headPillowShape.moveTo(-0.28,-0.12);headPillowShape.quadraticCurveTo(-0.39,-0.26,-0.35,0.17);headPillowShape.quadraticCurveTo(-0.33,0.22,-0.20,0.14);headPillowShape.quadraticCurveTo(0,0.07,0.20,0.14);headPillowShape.quadraticCurveTo(0.33,0.22,0.35,0.17);headPillowShape.quadraticCurveTo(0.39,-0.26,0.28,-0.12);headPillowShape.quadraticCurveTo(0,-0.03,-0.28,-0.12);
const headPillow=mesh(new THREE.ExtrudeGeometry(headPillowShape,{depth:0.10,bevelEnabled:true,bevelSegments:3,steps:1,bevelSize:0.025,bevelThickness:0.025}),pillowFabric,chairBack);headPillow.position.set(0,1.27,-0.23);headPillow.name='chair-head-pillow';headPillow.userData.chairDetail=true;
const lumbarPillow=box(0.70,0.30,0.20,pillowFabric,[0,0.29,-0.17],chairBack,0.095);lumbarPillow.name='chair-lumbar-pillow';lumbarPillow.userData.chairDetail=true;
// Local canvas wordmark and seam illustration, with no remote image dependency.
const chairCanvas=document.createElement('canvas');chairCanvas.width=768;chairCanvas.height=1024;
const chairContext=chairCanvas.getContext('2d');chairContext.fillStyle='#27201b';chairContext.textAlign='center';
chairContext.font='bold 94px Georgia, serif';chairContext.fillText('TOMAZ',384,400);chairContext.font='italic 65px Georgia, serif';chairContext.fillText('Heritage',384,474);
chairContext.lineWidth=3;chairContext.strokeStyle='#80502e';chairContext.setLineDash([8,6]);
for(const y of [610,720,830]){chairContext.beginPath();chairContext.moveTo(160,y-75);chairContext.lineTo(384,y+50);chairContext.lineTo(608,y-75);chairContext.stroke();}
const chairTexture=new THREE.CanvasTexture(chairCanvas);chairTexture.colorSpace=THREE.SRGBColorSpace;
for(const rear of [false,true]){
 const label=new THREE.Mesh(new THREE.PlaneGeometry(0.78,1.12),new THREE.MeshBasicMaterial({map:chairTexture,transparent:true,depthWrite:false,toneMapped:false}));label.position.set(0,0.88,rear?0.188:-0.039);if(!rear)label.rotation.y=Math.PI;label.name=rear?'chair-tomaz-wordmark-rear':'chair-tomaz-wordmark';label.userData.chairDetail=true;chairBack.add(label);
}
const pillowCanvas=document.createElement('canvas');pillowCanvas.width=512;pillowCanvas.height=256;
const pillowContext=pillowCanvas.getContext('2d');pillowContext.fillStyle='#c2925e';pillowContext.textAlign='center';pillowContext.font='bold 72px Georgia, serif';pillowContext.fillText('TOMAZ',256,150);
const pillowTexture=new THREE.CanvasTexture(pillowCanvas);pillowTexture.colorSpace=THREE.SRGBColorSpace;
const pillowLabel=new THREE.Mesh(new THREE.PlaneGeometry(0.47,0.18),new THREE.MeshBasicMaterial({map:pillowTexture,transparent:true,depthWrite:false,toneMapped:false}));pillowLabel.position.set(0,0.29,-0.275);pillowLabel.rotation.y=Math.PI;pillowLabel.userData.chairDetail=true;chairBack.add(pillowLabel);
const emblemCanvas=document.createElement('canvas');emblemCanvas.width=256;emblemCanvas.height=256;
const emblemContext=emblemCanvas.getContext('2d');emblemContext.strokeStyle='#bd8d58';emblemContext.lineWidth=15;emblemContext.beginPath();emblemContext.moveTo(50,48);emblemContext.lineTo(113,69);emblemContext.lineTo(128,205);emblemContext.lineTo(143,69);emblemContext.lineTo(206,48);emblemContext.lineTo(174,139);emblemContext.moveTo(50,48);emblemContext.lineTo(82,139);emblemContext.stroke();
const emblemTexture=new THREE.CanvasTexture(emblemCanvas);emblemTexture.colorSpace=THREE.SRGBColorSpace;
const emblem=new THREE.Mesh(new THREE.PlaneGeometry(0.22,0.22),new THREE.MeshBasicMaterial({map:emblemTexture,transparent:true,depthWrite:false,toneMapped:false}));emblem.position.set(0,1.28,-0.26);emblem.rotation.y=Math.PI;emblem.userData.chairDetail=true;chairBack.add(emblem);
for(const x of [-0.64,0.64]){bar([x,1.1,0],[x,1.61,0],0.035,M.case,chair);box(0.16,0.08,0.63,blackLeather,[x,1.66,-0.06],chair,0.035);}
cylinder(0.075,0.095,0.7,M.metal,[0,0.61,0],chair);
for(let i=0;i<5;i++){const a=i*Math.PI*2/5,x=Math.sin(a)*0.68,z=Math.cos(a)*0.68;bar([0,0.31,0],[x,0.19,z],0.042,M.case,chair);const wheel=cylinder(0.09,0.09,0.1,blackLeather,[x,0.105,z],chair);wheel.rotation.z=Math.PI/2;}

let rotating=false,raf=0,last=0;
const reduced=matchMedia('(prefers-reduced-motion: reduce)');
function render(){renderer.render(scene,camera);}
function resize(){const width=stage.clientWidth,height=stage.clientHeight,aspect=width/height;const spanX=Math.max(8.9,5.1*aspect),spanY=spanX/aspect;camera.left=-spanX/2;camera.right=spanX/2;camera.top=spanY/2;camera.bottom=-spanY/2;camera.updateProjectionMatrix();renderer.setSize(width,height,false);render();}
function tick(time){if(!rotating)return;if(time-last>1000/24){setup.rotation.y+=0.0025;render();last=time;}raf=requestAnimationFrame(tick);}
function setRotation(value){rotating=Boolean(value)&&!reduced.matches;cancelAnimationFrame(raf);document.getElementById('rotate').setAttribute('aria-pressed',String(rotating));if(rotating)raf=requestAnimationFrame(tick);else render();}
controls.addEventListener('change',render);new ResizeObserver(resize).observe(stage);
document.getElementById('rotate').addEventListener('click',()=>setRotation(!rotating));
document.getElementById('reset').addEventListener('click',()=>{setRotation(false);setup.rotation.y=0;camera.position.copy(initialPosition);camera.zoom=1;controls.target.copy(target);controls.update();camera.updateProjectionMatrix();render();});
document.getElementById('download').addEventListener('click',()=>{render();const a=document.createElement('a');a.download='macbook-pro-workspace.png';a.href=renderer.domElement.toDataURL('image/png');a.click();});
reduced.addEventListener('change',()=>{if(reduced.matches)setRotation(false);});
window.__deskReview={engine:'Three.js',revision:THREE.REVISION,scene,setup,renderer,camera,controls,render,setRotation,get rotating(){return rotating;},features:{person:false,monitors:1,macBookPro:true,pcTower:false,emptyChair:true,platform:false}};
resize();document.body.dataset.sceneReady='true';

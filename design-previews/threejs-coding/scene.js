import * as THREE from 'three';
import { RoundedBoxGeometry } from 'three/addons/geometries/RoundedBoxGeometry.js';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

// A procedural stylized illustration. No downloaded models or portrait likeness.
const stage = document.getElementById('stage');
const scene = new THREE.Scene();
const world = new THREE.Group();
scene.add(world);
const camera = new THREE.OrthographicCamera(-5, 5, 4, -4, 0.1, 100);
const initialPosition = new THREE.Vector3(-7.5, 6.2, 10.5);
const target = new THREE.Vector3(0, 1.65, 0);
camera.position.copy(initialPosition);
camera.lookAt(target);

let renderer;
try {
  renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, preserveDrawingBuffer: true, powerPreference: 'low-power' });
} catch (error) {
  stage.innerHTML = '<p class="error">WebGL tidak tersedia. Sila buka fail PNG yang disediakan untuk semakan visual.</p>';
  document.body.dataset.sceneError = 'WebGL unavailable';
  throw error;
}
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
renderer.setClearColor(0x11191e, 0);
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
renderer.outputColorSpace = THREE.SRGBColorSpace;
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure = 1.05;
renderer.domElement.setAttribute('role', 'img');
renderer.domElement.setAttribute('aria-label', 'Ilustrasi 3D developer berkaca mata sedang coding di meja PC');
stage.appendChild(renderer.domElement);

const controls = new OrbitControls(camera, renderer.domElement);
controls.target.copy(target);
controls.enableDamping = false;
controls.enablePan = false;
controls.minZoom = 0.7;
controls.maxZoom = 1.8;
controls.minPolarAngle = Math.PI / 5;
controls.maxPolarAngle = Math.PI / 2.25;
controls.update();

const material = (color, roughness = 0.7, extra = {}) => new THREE.MeshStandardMaterial({ color, roughness, ...extra });
const M = {
  skin: material('#d6a381', 0.85), hair: material('#24221f', 0.84),
  hoodie: material('#467f70', 0.95), hoodieLight: material('#579383', 0.93),
  pants: material('#2b3a4c', 0.92), sole: material('#d9ddd6', 0.84),
  shoe: material('#f3eee3', 0.83), black: material('#192328', 0.6),
  charcoal: material('#29343b', 0.76), chair: material('#344447', 0.92),
  metal: material('#64757a', 0.4, { metalness: 0.52 }),
  wood: material('#c6a17c', 0.86), woodEdge: material('#9e7c59', 0.88),
  mat: material('#24473e', 0.98), cream: material('#e8e0ce', 0.78),
  key: material('#38464b', 0.66), mint: material('#a4e4b6', 0.62),
  led: material('#a8ffd0', 0.35, { emissive: '#7fd9a7', emissiveIntensity: 0.65 }),
  terra: material('#bd896e', 0.95), leaf: material('#57846a', 0.88),
  leafLight: material('#8db59a', 0.86), platform: material('#b8c8be', 0.96)
};

function mesh(geometry, mat, parent = world) {
  const object = new THREE.Mesh(geometry, mat);
  object.castShadow = true;
  object.receiveShadow = true;
  parent.add(object);
  return object;
}
function box(w, h, d, mat, position, parent = world, radius = 0.08) {
  const object = mesh(new RoundedBoxGeometry(w, h, d, 3, Math.min(radius, w/2, h/2, d/2)), mat, parent);
  object.position.set(...position);
  return object;
}
function sphere(radius, mat, position, parent = world, scale = [1,1,1]) {
  const object = mesh(new THREE.SphereGeometry(radius, 24, 18), mat, parent);
  object.position.set(...position);
  object.scale.set(...scale);
  return object;
}
function cylinder(rTop, rBottom, height, mat, position, parent = world, segments = 28) {
  const object = mesh(new THREE.CylinderGeometry(rTop, rBottom, height, segments), mat, parent);
  object.position.set(...position);
  return object;
}
function segment(a, b, radius, mat, parent = world) {
  const from = new THREE.Vector3(...a), to = new THREE.Vector3(...b);
  const delta = to.clone().sub(from);
  const object = mesh(new THREE.CylinderGeometry(radius, radius, delta.length(), 20), mat, parent);
  object.position.copy(from.add(to).multiplyScalar(0.5));
  object.quaternion.setFromUnitVectors(new THREE.Vector3(0,1,0), delta.normalize());
  return object;
}
function ring(radius, tube, mat, position, parent = world) {
  const object = mesh(new THREE.TorusGeometry(radius, tube, 10, 36), mat, parent);
  object.position.set(...position);
  return object;
}

// Soft studio lighting and an unobtrusive contact shadow.
scene.add(new THREE.HemisphereLight('#e1f2f1', '#6b796d', 2.2));
const key = new THREE.DirectionalLight('#fff0dc', 4.1);
key.position.set(-3, 8, 6);
key.castShadow = true;
key.shadow.mapSize.set(2048, 2048);
Object.assign(key.shadow.camera, { left: -6, right: 6, top: 7, bottom: -5, near: 0.5, far: 25 });
key.shadow.bias = -0.0003;
key.shadow.normalBias = 0.025;
scene.add(key);
const fill = new THREE.DirectionalLight('#a3d9ce', 1.5);
fill.position.set(5, 5, -4);
scene.add(fill);
const ground = new THREE.Mesh(new THREE.PlaneGeometry(40,40), new THREE.ShadowMaterial({ opacity: 0.2 }));
ground.rotation.x = -Math.PI/2;
ground.position.y = -0.14;
ground.receiveShadow = true;
scene.add(ground);
box(7, 0.22, 5.15, M.platform, [0, -0.02, 0], world, 0.2);

// Desk: warm timber top, restrained dark frame and generous workspace.
box(3.9, 0.2, 2.55, M.wood, [0.8,2.05,0], world, 0.1);
box(3.76, 0.10, 2.44, M.woodEdge, [0.8,1.94,0], world, 0.05);
for (const x of [-0.86,2.46]) {
  for (const z of [-1.02,1.02]) box(0.13,1.83,0.13,M.black,[x,1.01,z],world,0.035);
  box(0.2,0.13,2.36,M.black,[x,0.17,0],world,0.045);
}
box(3.3,0.1,0.11,M.black,[0.8,0.72,-1.0]);
box(1.75,0.026,1.65,M.mat,[-0.05,2.17,0.1],world,0.08);

// Monitor screen is a locally generated canvas texture, not a remote image.
const screenCanvas = document.createElement('canvas');
screenCanvas.width = 1400;
screenCanvas.height = 900;
const ctx = screenCanvas.getContext('2d');
ctx.fillStyle = '#101c28';ctx.fillRect(0,0,1400,900);
ctx.fillStyle = '#1b2c38';ctx.fillRect(0,0,1400,90);
for (const [i,color] of ['#e6a09a','#e9ce88','#8acba0'].entries()) {
  ctx.fillStyle=color;ctx.beginPath();ctx.arc(44+i*36,44,11,0,Math.PI*2);ctx.fill();
}
ctx.font='25px monospace';ctx.fillStyle='#afc7c9';ctx.fillText('developer.ts  /  workspace',210,54);
ctx.fillStyle='#172734';ctx.fillRect(0,90,170,810);
ctx.font='22px monospace';ctx.fillStyle='#89b49d';
['src','  app','  api','  mobile','tests'].forEach((text,i)=>ctx.fillText(text,22,152+i*66));
const codeLines = [
 ['#c5a8df', 'const developer = {'], ['#a2d7b1', '  name: "Tengku Yusoff",'],
 ['#d0dce6', '  web: ["React", "Next.js"],'], ['#d0dce6', '  api: ["Node.js", "NestJS"],'],
 ['#c8b37f', '  mobile: "Flutter",'], ['#91b6c7', '  learning: ["DevOps", "AI"]'],
 ['#c5a8df', '};'], ['#799495', ''], ['#799495', '// Think. Build. Review.'],
 ['#9de2b5', 'await buildSomethingUseful();']
];
ctx.font='30px monospace';
codeLines.forEach(([color,text],i)=>{ctx.fillStyle='#536c7b';ctx.fillText(String(i+1).padStart(2,' '),195,164+i*60);ctx.fillStyle=color;ctx.fillText(text,260,164+i*60);});
ctx.fillStyle='#244638';ctx.fillRect(0,852,1400,48);ctx.fillStyle='#c8ead4';ctx.font='24px monospace';ctx.fillText('main   JavaScript + Flutter',34,884);
const texture = new THREE.CanvasTexture(screenCanvas);
texture.colorSpace = THREE.SRGBColorSpace;
texture.anisotropy = renderer.capabilities.getMaxAnisotropy();
const monitor = new THREE.Group();
monitor.position.set(1.38,3.17,-0.28);
monitor.rotation.y = -1.05;
world.add(monitor);
box(2.42,1.64,0.15,M.black,[0,0,0],monitor,0.07);
const display = new THREE.Mesh(new THREE.PlaneGeometry(2.24,1.44), new THREE.MeshBasicMaterial({map:texture}));
display.position.set(0,0.025,0.081);monitor.add(display);
sphere(0.018,M.led,[1.02,-0.74,0.086],monitor);
box(0.13,0.4,0.13,M.metal,[0,-1.01,0],monitor,0.03);
box(0.83,0.065,0.5,M.black,[0,-1.02-0.2,0.05],monitor,0.04);

// Mechanical keyboard, mouse, notebook and coffee cup.
const keyboard = new THREE.Group();keyboard.position.set(-0.22,2.2,0.25);keyboard.rotation.y=-Math.PI/2;world.add(keyboard);
box(1.55,0.085,0.62,M.black,[0,0,0],keyboard,0.04);
for(let row=0;row<4;row++) for(let col=0;col<12;col++) {
  if(row===3&&col>=3&&col<=8)continue;
  box(0.103,0.043,0.105,(row===0&&col===0)||(row===2&&col===11)?M.mint:M.key,[-0.685+col*0.124,0.06,-0.22+row*0.14],keyboard,0.012);
}
box(0.71,0.043,0.105,M.cream,[-0.005,0.06,0.20],keyboard,0.015);
const mouse=sphere(0.17,M.cream,[-0.2,2.24,1.18],world,[1.1,0.44,0.76]);
segment([-0.2,2.315,1.11],[-0.2,2.315,1.18],0.012,M.black);
const notebook=box(0.58,0.06,0.78,M.cream,[0.55,2.2,-0.9],world,0.025);notebook.rotation.y=-0.16;
box(0.045,0.012,0.67,M.woodEdge,[0.42,2.24,-0.88],world,0.008);
segment([0.43,2.25,-0.68],[0.78,2.25,-1.04],0.018,M.charcoal);
const mug=new THREE.Group();mug.position.set(0.72,2.3,0.86);world.add(mug);
cylinder(0.16,0.145,0.29,M.cream,[0,0,0],mug);
const rim=ring(0.148,0.018,M.cream,[0,0.147,0],mug);rim.rotation.x=Math.PI/2;
const coffee=cylinder(0.132,0.132,0.01,material('#4c3428'),[0,0.145,0],mug);
ring(0.105,0.027,M.cream,[0.18,0.01,0],mug);

// Desktop lamp, low-key workstation tower and a small plant.
const lamp=new THREE.Group();lamp.position.set(2.21,2.16,-0.97);world.add(lamp);
cylinder(0.3,0.32,0.065,M.charcoal,[0,0,0],lamp);
segment([0,0.03,0],[0,1.35,0],0.035,M.charcoal,lamp);
segment([0,1.35,0],[-0.40,1.48,0],0.04,M.charcoal,lamp);
cylinder(0.12,0.33,0.31,M.cream,[-0.44,1.34,0],lamp);
const lampInside=cylinder(0.26,0.26,0.012,M.led,[-0.44,1.185,0],lamp);
const lampGlow=new THREE.PointLight('#e6efcb',0.8,3,2);lampGlow.position.set(-0.44,1.13,0);lamp.add(lampGlow);
const tower=new THREE.Group();tower.position.set(1.95,0.78,-0.68);tower.rotation.y=-0.3;world.add(tower);
box(0.72,1.24,1.04,M.charcoal,[0,0,0],tower,0.07);
box(0.59,1.10,0.025,M.black,[0,0,0.532],tower,0.03);
for(const y of [-0.27,0.24]){
 const outer=ring(0.20,0.018,M.led,[0,y,0.554],tower);
 cylinder(0.065,0.065,0.025,M.metal,[0,y,0.564],tower).rotation.x=Math.PI/2;
 for(let i=0;i<5;i++){
  const blade=box(0.07,0.15,0.016,M.key,[Math.sin(i*Math.PI*2/5)*0.105,y+Math.cos(i*Math.PI*2/5)*0.105,0.561],tower,0.025);
  blade.rotation.z=-i*Math.PI*2/5+0.45;
 }
}
sphere(0.018,M.led,[0.20,0.49,0.556],tower);
const plant=new THREE.Group();plant.position.set(2.75,0.16,1.43);world.add(plant);
cylinder(0.31,0.23,0.49,M.terra,[0,0.25,0],plant);
cylinder(0.27,0.27,0.015,material('#4d4c3a'),[0,0.505,0],plant);
for(let i=0;i<9;i++) {
 const angle=i*2.4;
 const end=[Math.sin(angle)*0.29,0.88+(i%3)*0.16,Math.cos(angle)*0.28];
 segment([0,0.52,0],end,0.014,M.leaf,plant);
 const leaf=sphere(0.17,i%2?M.leaf:M.leafLight,end,plant,[0.50,1.75,0.38]);
 leaf.rotation.z=Math.sin(angle)*-0.45;leaf.rotation.x=Math.cos(angle)*0.35;
}

// Character and chair are authored in local coordinates, facing +Z.
const person=new THREE.Group();person.position.set(-1.87,0.11,0.23);person.rotation.y=Math.PI/2;world.add(person);
const chair=new THREE.Group();person.add(chair);
box(1.25,0.2,1.12,M.chair,[0,1.2,0.04],chair,0.12);
const back=box(1.16,1.28,0.18,M.chair,[0,1.93,-0.49],chair,0.16);back.rotation.x=-0.08;
box(0.80,0.35,0.1,M.charcoal,[0,2.36,-0.59],chair,0.08);
cylinder(0.075,0.10,0.86,M.metal,[0,0.71,0.04],chair);
for(let i=0;i<5;i++){
 const a=i*Math.PI*2/5, x=Math.sin(a)*0.72,z=Math.cos(a)*0.72+0.04;
 segment([0,0.34,0.04],[x,0.24,z],0.048,M.charcoal,chair);
 const wheel=cylinder(0.095,0.095,0.10,M.black,[x,0.18,z],chair);wheel.rotation.z=Math.PI/2;
}
for(const x of [-0.65,0.65]){
 segment([x,1.23,0.05],[x,1.75,0.05],0.04,M.charcoal,chair);
 box(0.13,0.085,0.66,M.charcoal,[x,1.77,0.17],chair,0.04);
}
box(0.86,0.35,0.65,M.pants,[0,1.47,0.18],person,0.16);
for(const x of [-0.27,0.27]){
 segment([x,1.40,0.22],[x,1.27,0.84],0.19,M.pants,person);
 sphere(0.19,M.pants,[x,1.25,0.84],person);
 segment([x,1.22,0.85],[x,0.42,0.97],0.155,M.pants,person);
 box(0.39,0.15,0.66,M.sole,[x,0.21,1.11],person,0.055);
 box(0.36,0.20,0.59,M.shoe,[x,0.31,1.09],person,0.075);
 for(let j=0;j<3;j++) box(0.22,0.015,0.017,M.metal,[x,0.417,1.04+j*0.065],person,0.006);
}
const torso=mesh(new THREE.CapsuleGeometry(0.43,0.60,8,24),M.hoodie,person);torso.position.set(0,2.22,0.06);torso.scale.set(1,1,0.82);
const hood=ring(0.25,0.105,M.hoodieLight,[0,2.77,-0.02],person);hood.rotation.x=Math.PI/2;
cylinder(0.16,0.18,0.24,M.skin,[0,2.91,0.09],person);
box(0.37,0.18,0.025,M.hoodieLight,[0,1.92,0.422],person,0.04);
for(const x of [-0.12,0.12]) segment([x,2.67,0.34],[x*0.9,2.30,0.44],0.012,M.cream,person);

const hands=[];
for(const side of [-1,1]){
 const shoulder=[side*0.43,2.62,0.09],elbow=[side*0.52,2.12,0.47],wrist=[side*0.44,2.19,1.24];
 sphere(0.21,M.hoodie,shoulder,person);
 segment(shoulder,elbow,0.16,M.hoodie,person);sphere(0.16,M.hoodie,elbow,person);
 segment(elbow,wrist,0.125,M.hoodie,person);
 const hand=new THREE.Group();hand.position.set(...wrist);person.add(hand);
 sphere(0.135,M.skin,[0,0.015,0.05],hand,[0.9,0.56,1.2]);
 for(let finger=0;finger<4;finger++){
  const f=sphere(0.036,M.skin,[-0.081+finger*0.052,-0.01,0.17],hand,[0.62,0.68,1.9]);
  f.rotation.x=-0.1;
 }
 hands.push({object:hand,y:wrist[1],phase:side<0?0:1.6});
}

const head=new THREE.Group();head.position.set(0,3.40,0.10);head.rotation.y=-0.63;head.rotation.x=-0.05;person.add(head);
sphere(0.46,M.skin,[0,0,0],head,[1,1.12,0.96]);
for(const side of [-1,1])sphere(0.115,M.skin,[side*0.435,-0.025,-0.005],head,[0.62,1,0.73]);
sphere(0.47,M.hair,[0,0.29,-0.025],head,[1,0.64,0.98]);
sphere(0.31,M.hair,[0,0.11,-0.25],head,[1.32,1.12,0.6]);
const quiff=box(0.66,0.19,0.41,M.hair,[0.01,0.40,0.14],head,0.08);quiff.rotation.z=-0.08;quiff.rotation.x=0.1;
sphere(0.092,M.skin,[0,-0.005,0.433],head,[0.8,0.9,1.1]);
const eyeWhite=material('#ede9da',0.5),eyeDark=material('#282d2c',0.4);
const lensMat=new THREE.MeshStandardMaterial({color:'#80b0ad',transparent:true,opacity:0.19,roughness:0.2});
for(const side of [-1,1]){
 const x=side*0.18;
 sphere(0.075,eyeWhite,[x,0.045,0.405],head,[1,0.74,0.34]);
 sphere(0.038,eyeDark,[x+0.008,0.042,0.431],head,[0.6,0.78,0.3]);
 const frame=ring(0.128,0.023,M.black,[x,0.045,0.443],head);frame.scale.set(1.12,0.88,1);
 const lens=new THREE.Mesh(new THREE.CircleGeometry(0.119,32),lensMat);lens.position.set(x,0.045,0.445);lens.scale.set(1.12,0.88,1);head.add(lens);
 segment([side*0.31,0.05,0.43],[side*0.43,0.04,-0.04],0.018,M.black,head);
 const brow=box(0.17,0.032,0.028,M.hair,[x,0.217,0.386],head,0.012);brow.rotation.z=-side*0.10;
}
segment([-0.04,0.05,0.45],[0.04,0.05,0.45],0.018,M.black,head);
const smile=new THREE.CatmullRomCurve3([new THREE.Vector3(-0.11,-0.215,0.39),new THREE.Vector3(0,-0.235,0.416),new THREE.Vector3(0.11,-0.215,0.39)]);
mesh(new THREE.TubeGeometry(smile,16,0.012,6,false),material('#84594b'),head);

// Render on demand by default: orbital inspection without an idle animation loop.
let active=false, raf=0, previousFrame=0;
const reduced=window.matchMedia('(prefers-reduced-motion: reduce)');
function render(){renderer.render(scene,camera);}
function resize(){
 const width=Math.max(1,stage.clientWidth),height=Math.max(1,stage.clientHeight),aspect=width/height;
 const spanX=Math.max(8.9,6.8*aspect),spanY=spanX/aspect;
 camera.left=-spanX/2;camera.right=spanX/2;camera.top=spanY/2;camera.bottom=-spanY/2;camera.updateProjectionMatrix();
 renderer.setSize(width,height,false);render();
}
function tick(time){
 if(!active)return;
 if(time-previousFrame>1000/24){for(const h of hands)h.object.position.y=h.y+Math.sin(time*0.009+h.phase)*0.028;render();previousFrame=time;}
 raf=requestAnimationFrame(tick);
}
function setAnimation(value){
 active=Boolean(value)&&!reduced.matches;
 cancelAnimationFrame(raf);
 document.getElementById('animate').setAttribute('aria-pressed',String(active));
 if(active)raf=requestAnimationFrame(tick);else{for(const h of hands)h.object.position.y=h.y;render();}
}
controls.addEventListener('change',render);
new ResizeObserver(resize).observe(stage);
document.getElementById('animate').addEventListener('click',()=>setAnimation(!active));
document.getElementById('reset').addEventListener('click',()=>{camera.position.copy(initialPosition);camera.zoom=1;controls.target.copy(target);controls.update();camera.updateProjectionMatrix();render();});
document.getElementById('download').addEventListener('click',()=>{render();const link=document.createElement('a');link.download='coding-workspace-threejs.png';link.href=renderer.domElement.toDataURL('image/png');link.click();});
reduced.addEventListener('change',()=>{if(reduced.matches)setAnimation(false);});
window.__sceneReview={engine:'Three.js',revision:THREE.REVISION,render,renderer,scene,camera,controls,get animationActive(){return active;},setAnimation};
resize();
document.body.dataset.sceneReady='true';

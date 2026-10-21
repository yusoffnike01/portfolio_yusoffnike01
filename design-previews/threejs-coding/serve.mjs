import http from 'node:http';
import { readFile, realpath, stat } from 'node:fs/promises';
import { resolve, dirname, sep, extname } from 'node:path';
import { fileURLToPath } from 'node:url';

const root=dirname(fileURLToPath(import.meta.url));
const types={'.html':'text/html; charset=utf-8','.js':'text/javascript; charset=utf-8','.mjs':'text/javascript; charset=utf-8','.json':'application/json; charset=utf-8','.png':'image/png','.webp':'image/webp'};
export function createPreviewServer(){
 return http.createServer(async(req,res)=>{
  if(!['GET','HEAD'].includes(req.method)){res.writeHead(405);res.end();return;}
  try{
   const pathname=decodeURIComponent(new URL(req.url,'http://localhost').pathname);
   let path=resolve(root,'.'+pathname);
   if(path!==root&&!path.startsWith(root+sep)){res.writeHead(403);res.end();return;}
   if((await stat(path)).isDirectory())path=resolve(path,'index.html');
   const canonical=await realpath(path);
   if(!canonical.startsWith(root+sep)){res.writeHead(403);res.end();return;}
   const data=await readFile(canonical);
   res.writeHead(200,{'Content-Type':types[extname(canonical)]||'application/octet-stream','Cache-Control':'no-store','X-Content-Type-Options':'nosniff'});
   res.end(req.method==='HEAD'?undefined:data);
  }catch{res.writeHead(404,{'Content-Type':'text/plain; charset=utf-8'});res.end('Not found');}
 });
}
if(process.argv[1]&&resolve(process.argv[1])===fileURLToPath(import.meta.url)){
 const server=createPreviewServer();
 server.listen(3011,'127.0.0.1',()=>console.log('Three.js preview: http://127.0.0.1:3011 — localhost only'));
}

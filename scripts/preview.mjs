import http from 'node:http';
import { readFile, stat } from 'node:fs/promises';
import { resolve, sep, extname } from 'node:path';
const root=resolve('out');
const types={'.html':'text/html; charset=utf-8','.js':'text/javascript; charset=utf-8','.css':'text/css; charset=utf-8','.svg':'image/svg+xml','.png':'image/png','.webp':'image/webp','.txt':'text/plain; charset=utf-8','.xml':'application/xml; charset=utf-8','.json':'application/json'};
const server=http.createServer(async(req,res)=>{
  try {
    const path=decodeURIComponent(new URL(req.url,'http://localhost').pathname);
    let file=resolve(root,'.'+path);
    if(file!==root && !file.startsWith(root+sep)) {res.writeHead(403);res.end();return;}
    let status=200;
    try { if((await stat(file)).isDirectory()) file=resolve(file,'index.html'); await stat(file); }
    catch {file=resolve(root,'404.html');status=404;}
    const content=await readFile(file);
    res.writeHead(status,{'Content-Type':types[extname(file)]||'application/octet-stream','X-Content-Type-Options':'nosniff','X-Frame-Options':'SAMEORIGIN','Referrer-Policy':'strict-origin-when-cross-origin','Content-Security-Policy':"default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline'; img-src 'self' data:; font-src 'self'; connect-src 'self'; frame-ancestors 'self'; base-uri 'self'; form-action 'self'; object-src 'none'"});
    res.end(req.method==='HEAD'?undefined:content);
  } catch { res.writeHead(400);res.end('Bad request'); }
});
server.listen(3000,'127.0.0.1',()=>console.log('Static preview: http://127.0.0.1:3000'));

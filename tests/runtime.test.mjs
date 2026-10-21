import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';

test('project, lockfile and Cloudflare-compatible version file target Node.js 22',()=>{
 const version=readFileSync('.node-version','utf8').trim();
 const pkg=JSON.parse(readFileSync('package.json','utf8'));
 const lock=JSON.parse(readFileSync('package-lock.json','utf8'));
 assert.equal(version,'22.23.3');
 assert.equal(pkg.engines.node,'22.x');
 assert.equal(lock.packages[''].engines.node,pkg.engines.node);
});

test('verification commands execute with Node.js 22',()=>{
 assert.equal(process.versions.node.split('.')[0],'22','use nodenv exec for project commands');
});

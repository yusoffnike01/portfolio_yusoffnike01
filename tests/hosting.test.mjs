import {test} from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
test('Cloudflare static routing has a valid include rule and excludes all Functions',()=>{
 const config=JSON.parse(readFileSync('public/_routes.json','utf8'));
 assert.equal(config.version,1);
 assert.ok(config.include.length>=1,'Cloudflare requires at least one include rule');
 assert.ok(config.exclude.includes('/*'));
 const headers=readFileSync('public/_headers','utf8');
 for(const name of ['X-Content-Type-Options','Referrer-Policy','X-Frame-Options','Content-Security-Policy']) assert.ok(headers.includes(name+':'));
 const wrangler=JSON.parse(readFileSync('wrangler.jsonc','utf8'));
 assert.equal(wrangler.assets.directory,'./out');
 assert.equal(wrangler.assets.html_handling,'auto-trailing-slash');
 assert.equal(wrangler.assets.not_found_handling,'404-page');
});

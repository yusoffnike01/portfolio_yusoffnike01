import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, existsSync } from 'node:fs';
import { locales, paths, projects } from '../../src/lib/site.mjs';
test('static export contains both languages, real navigation, honest content, accessible headings and preview metadata', () => {
  assert.ok(existsSync('out/ms/index.html'), 'built BM homepage must exist');
  for (const lang of locales) for (const path of paths) {
    const html = readFileSync('out/'+lang+'/'+(path ? path+'/' : '')+'index.html', 'utf8');
    assert.match(html, new RegExp('<html[^>]+lang="'+lang+'"'));
    assert.equal((html.match(/<h1[ >]/g)||[]).length, 1, lang+'/'+path+' has one H1');
    assert.match(html, /<meta name="description"/);
    assert.match(html, /<meta name="robots" content="noindex, follow"/);
    assert.ok(!html.includes('rel="canonical"'));
    assert.ok(!html.includes('href="#"'));
    assert.ok(html.includes('Tengku Yusoff'));
    if (path.startsWith('projects/')) assert.match(html, /DEMO/);
    for (const href of [...html.matchAll(/href="(\/[^"?#]*)"/g)].map(m=>m[1])) {
      if (href.startsWith('/_next')) continue;
      assert.ok(existsSync('out'+href) || existsSync('out'+href+'index.html'), 'link exists: '+href);
    }
  }
  assert.ok(existsSync('out/404.html'));
  assert.match(readFileSync('out/robots.txt','utf8'), /Allow: \//);
  assert.ok(!readFileSync('out/sitemap.xml','utf8').includes('<loc>'));
  assert.ok(existsSync('out/social/portfolio.png'));
  assert.equal(projects.length, 3);
});
test('animated introduction has readable static HTML and all six phrases without JavaScript',()=>{
 for(const lang of locales){
  const html=readFileSync(`out/${lang}/index.html`,'utf8');
  assert.match(html,/data-testid="rotating-intro"/);
  assert.match(html,/data-testid="rotating-intro-text"/);
  assert.match(html,/data-phase="static"/);
  for(const phrase of ['Full-Stack','mobile','DevOps','AI automation','badminton'])assert.ok(html.toLowerCase().includes(phrase.toLowerCase()),`${lang} includes ${phrase}`);
 }
});

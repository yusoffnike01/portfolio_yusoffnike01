import {test} from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {locales,sections,route,projects,profile} from '../../src/lib/site.mjs';
test('production build emits canonical, hreflang, honest structured data and sitemap excluding demo pages',()=>{
  const origin='https://portfolio.test';
  for(const lang of locales) for(const section of sections) {
    const html=readFileSync('out'+route(lang,section)+'index.html','utf8');
    assert.ok(html.includes('<link rel="canonical" href="'+origin+route(lang,section)+'"'));
    assert.ok(html.includes('hrefLang="en" href="'+origin+route('en',section)+'"'));
    assert.ok(html.includes('hrefLang="ms" href="'+origin+route('ms',section)+'"'));
    assert.ok(html.includes('content="index, follow"'));
    assert.ok(html.includes('application/ld+json'));
    assert.ok(html.includes(profile.fullName));
    assert.ok(html.includes(origin+'/social/portfolio.png'));
  }
  for(const lang of locales) for(const project of projects) assert.ok(readFileSync('out'+route(lang,'projects/'+project.slug)+'index.html','utf8').includes(project.demo?'content="noindex, follow"':'content="index, follow"'));
  const sitemap=readFileSync('out/sitemap.xml','utf8');
  const indexable=sections.length+projects.filter(project=>!project.demo).length;
  assert.equal((sitemap.match(/<loc>/g)||[]).length,indexable*locales.length);
  for(const project of projects) assert.equal(sitemap.includes(project.slug),!project.demo);
  assert.ok(readFileSync('out/robots.txt','utf8').includes(origin+'/sitemap.xml'));
});

import { test } from 'node:test';
import assert from 'node:assert/strict';
const site = await import('../src/lib/site.mjs').catch(() => ({}));
test('bilingual portfolio data is complete, demos honest, routes equivalent and preview SEO safe', () => {
  assert.equal(typeof site.getPage, 'function', 'getPage must exist');
  for (const lang of ['ms','en']) {
    assert.equal(site.dictionaries[lang].nav.length, 5);
    for (const section of ['', 'about', 'projects', 'experience', 'contact']) assert.ok(site.getPage(lang, section).title);
    for (const project of site.projects) {
      assert.equal(project.demo, true);
      assert.ok(project[lang].problem && project[lang].solution && project[lang].role && project[lang].outcome);
      assert.ok(site.getPage(lang, 'projects/'+project.slug).demo);
    }
    const preview = site.pageMetadata(lang, '');
    assert.equal(preview.robots.index, false);
    assert.equal(preview.alternates, undefined);
    const production = site.pageMetadata(lang, 'about', 'https://portfolio.test');
    assert.equal(production.alternates.canonical, 'https://portfolio.test/'+lang+'/about/');
    assert.equal(production.alternates.languages.en, 'https://portfolio.test/en/about/');
    assert.equal(site.pageMetadata(lang, 'projects/'+site.projects[0].slug, 'https://portfolio.test').robots.index, false);
  }
  assert.equal(site.getPage('fr',''), null);
  assert.equal(site.getPage('ms','projects/missing'), null);
  assert.equal(site.profile.resume, null);
  assert.deepEqual(site.profile.contacts, [{type:'email',value:'tengkuyusoff19@gmail.com',href:'mailto:tengkuyusoff19@gmail.com'}]);
  for(const lang of ['ms','en'])assert.doesNotMatch(site.dictionaries[lang].contactNote,/coming soon|will appear|akan dipaparkan|selepas maklumat/i);
  assert.equal(site.pageMetadata('ms', '', 'javascript:alert(1)').robots.index, false);
});

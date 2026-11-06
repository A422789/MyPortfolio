import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { parseHTML } from 'linkedom';
import { auditBuild, inspectDocument, inspectSitemap } from '../scripts/audit-seo.mjs';
import { startServer } from '../scripts/serve-static.mjs';
import { getPages } from '../scripts/route-data.mjs';
import { site, renderMetadata } from '../src/seo/site.js';

const pages = getPages();
const homepage = await readFile('dist/index.html', 'utf8');

test('all generated pages, links, images and structured data pass the build audit', async () => {
  const report = await auditBuild();
  assert.deepEqual(report.errors, []);
  assert.equal(report.pages, 15);
});

test('fault injection detects absent canonical, duplicate title, malformed schema and missing internal link', async () => {
  const faults = [
    [homepage.replace(/<link data-seo rel="canonical"[^>]+>/, ''), /canonical/],
    [homepage.replace('</head>', '<title>Duplicate</title></head>'), /head > title/],
    [homepage.replace('"@context":"https://schema.org"', 'invalid-json'), /Malformed JSON-LD/],
    [homepage.replace('</main>', '<a href="/nonexistent-link">Broken</a></main>'), /Broken internal link/],
  ];
  for (const [html, expected] of faults) assert.match((await inspectDocument(html, pages[0], pages)).join('\n'), expected);
});

test('sitemap rejects wrong hosts and missing routes', async () => {
  const sitemap = await readFile('dist/sitemap.xml', 'utf8');
  assert.equal((await inspectSitemap(sitemap.replaceAll(site.origin, 'https://wrong.example'), pages)).length, 1);
  assert.equal((await inspectSitemap(sitemap.replace(/\s*<url>.*?<\/url>/, ''), pages)).length, 1);
});

test('initial HTML has visible content, complete IBM credentials and no browser PDF renderer', async () => {
  for (const filename of ['index', 'projects', 'experience/ibm', 'work/he-skincare']) {
    const document = parseHTML(await readFile(`dist/${filename}.html`, 'utf8')).document;
    assert.ok(document.querySelector('main').textContent.length > 100);
    assert.equal(document.querySelectorAll('div[hidden], template[data-msg], template[data-dgst]').length, 0);
    assert.equal(document.querySelectorAll('iframe, canvas').length, 0);
  }
  const ibm = parseHTML(await readFile('dist/experience/ibm.html', 'utf8')).document;
  assert.equal(ibm.querySelectorAll('a[aria-label^="Verify official credential"]').length, 12);
  assert.equal(ibm.querySelectorAll('img').length, 13);
});

test('metadata escapes HTML and JSON script delimiters', () => {
  const html = renderMetadata({ ...pages[0], title: '<script>bad</script>', description: '</script><script>bad</script>' });
  const document = parseHTML(`<html><head>${html}</head></html>`).document;
  assert.equal(document.querySelectorAll('script').length, 1);
  assert.doesNotThrow(() => JSON.parse(document.querySelector('script').textContent));
});

test('static preview enforces status codes, redirects, content types and every original PDF URL', async () => {
  const hosted = await startServer();
  try {
    const report = await auditBuild({ baseUrl: hosted.url });
    assert.deepEqual(report.errors, []);
  } finally { await new Promise((done) => hosted.server.close(done)); }
});

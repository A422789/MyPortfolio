import { parseHTML, DOMParser } from 'linkedom';
import { readFile, mkdir, writeFile, access, readdir } from 'node:fs/promises';
import { resolve, sep } from 'node:path';
import { pathToFileURL } from 'node:url';
import { getPages } from './route-data.mjs';
import { site, canonicalUrl } from '../src/seo/site.js';

const exists = (file) => access(file).then(() => true, () => false);
const pageFile = (pathname) => pathname === '/' ? 'index.html' : `${pathname.slice(1)}.html`;
const localPath = (root, pathname) => {
  const file = resolve(root, `.${decodeURIComponent(pathname)}`);
  if (!file.startsWith(`${root}${sep}`)) throw new Error(`Invalid asset path: ${pathname}`);
  return file;
};

export async function inspectDocument(html, page, pages, root = resolve('dist')) {
  const { document } = parseHTML(html);
  const errors = [];
  const fail = (message) => errors.push(`${page.path}: ${message}`);
  const one = (selector) => {
    const items = document.querySelectorAll(selector);
    if (items.length !== 1) fail(`Expected one ${selector}, found ${items.length}`);
    return items[0];
  };
  if (one('head > title')?.textContent !== page.title) fail('Title does not match route');
  if (one('meta[name="description"]')?.getAttribute('content') !== page.description) fail('Description does not match route');
  const canonical = one('link[rel="canonical"]');
  if (canonical?.getAttribute('href') !== canonicalUrl(page.path)) fail('Canonical does not match production route');
  if (one('meta[property="og:url"]')?.getAttribute('content') !== canonicalUrl(page.path)) fail('Open Graph URL mismatch');
  for (const selector of ['meta[property="og:title"]', 'meta[property="og:description"]', 'meta[property="og:image"]', 'meta[name="twitter:card"]', 'link[rel="icon"]']) one(selector);
  const preview = document.documentElement.dataset.noindex === 'true';
  if (one('meta[name="robots"]')?.getAttribute('content') !== (preview ? 'noindex, follow' : 'index, follow')) fail('Incorrect robots metadata');
  one('h1');
  if ((document.querySelector('main')?.textContent.trim().length ?? 0) < 100) fail('Primary content missing from initial HTML');
  for (const element of document.querySelectorAll('[style]')) {
    if (element.style.opacity === '0' && element.textContent.trim()) fail('Text hidden by initial opacity');
  }
  try {
    const schema = JSON.parse(one('script[type="application/ld+json"]')?.textContent ?? 'null');
    if (schema?.['@graph']?.find((item) => item['@type'] === 'Person')?.name !== site.person.name) fail('Structured identity mismatch');
  } catch { fail('Malformed JSON-LD'); }
  for (const image of document.querySelectorAll('img')) {
    if (!image.getAttribute('alt') || !image.getAttribute('width') || !image.getAttribute('height')) fail('Image missing alt or dimensions');
    const url = new URL(image.getAttribute('src'), site.origin);
    if (url.origin !== site.origin || !await exists(localPath(root, url.pathname))) fail(`Missing local image ${url.pathname}`);
  }
  const socialImage = document.querySelector('meta[property="og:image"]')?.getAttribute('content');
  if (socialImage && !await exists(localPath(root, new URL(socialImage).pathname))) fail('Missing social image');
  for (const anchor of document.querySelectorAll('a[href]')) {
    const url = new URL(anchor.getAttribute('href'), canonicalUrl(page.path));
    if (url.origin !== site.origin) continue;
    const target = pages.find((candidate) => candidate.path === url.pathname);
    if (!target) { if (!await exists(localPath(root, url.pathname))) fail(`Broken internal link ${url.pathname}`); continue; }
    if (url.hash) {
      const targetDocument = parseHTML(await readFile(resolve(root, pageFile(target.path)), 'utf8')).document;
      if (!targetDocument.getElementById(decodeURIComponent(url.hash.slice(1)))) fail(`Missing anchor ${url.pathname}${url.hash}`);
    }
  }
  return errors;
}

export async function inspectSitemap(xml, pages) {
  const document = new DOMParser().parseFromString(xml, 'text/xml');
  const urls = [...document.querySelectorAll('loc')].map((element) => element.textContent);
  const expected = pages.map((page) => canonicalUrl(page.path));
  return urls.length === expected.length && new Set(urls).size === urls.length && expected.every((url) => urls.includes(url)) ? [] : ['Sitemap does not match canonical route inventory'];
}

async function auditHttp(baseUrl, pages) {
  const errors = [];
  const fetchUrl = (path) => fetch(new URL(path, baseUrl), { redirect: 'manual', signal: AbortSignal.timeout(20000) });
  for (const page of pages) {
    const response = await fetchUrl(page.path);
    if (response.status !== 200 || !response.headers.get('content-type')?.includes('text/html')) errors.push(`${page.path}: HTTP ${response.status}, expected HTML 200`);
    const { document } = parseHTML(await response.text());
    if (document.querySelector('link[rel="canonical"]')?.getAttribute('href') !== canonicalUrl(page.path)) errors.push(`${page.path}: deployed canonical mismatch`);
  }
  for (const path of ['/unknown-page', '/work/unknown', '/experience/unknown']) {
    if ((await fetchUrl(path)).status !== 404) errors.push(`${path}: expected HTTP 404`);
  }
  const redirect = await fetchUrl('/credentials');
  if (redirect.status !== 308 || new URL(redirect.headers.get('location') ?? '', baseUrl).href !== new URL('/#experience', baseUrl).href) errors.push('Legacy route must redirect permanently to /#experience');
  for (const path of ['/projects/', '/projects.html', '/index.html']) {
    const response = await fetchUrl(path);
    const target = path === '/index.html' ? '/' : '/projects';
    if (![301, 308].includes(response.status) || new URL(response.headers.get('location') ?? '', baseUrl).pathname !== target) errors.push(`${path}: missing canonical redirect`);
  }
  for (const [path, type] of [['/robots.txt', 'text/plain'], ['/sitemap.xml', 'xml'], ['/llms.txt', 'text/plain']]) {
    const response = await fetchUrl(path);
    if (response.status !== 200 || !response.headers.get('content-type')?.includes(type)) errors.push(`${path}: wrong status or content type`);
    if (path === '/sitemap.xml') errors.push(...await inspectSitemap(await response.text(), pages));
  }
  const pdfs = (await readdir('public/certificates', { recursive: true })).filter((file) => file.endsWith('.pdf'));
  for (const pdf of pdfs) {
    const path = `/certificates/${pdf.replaceAll('\\', '/').split('/').map(encodeURIComponent).join('/')}`;
    const response = await fetchUrl(path);
    const bytes = Buffer.from(await response.arrayBuffer());
    if (response.status !== 200 || !response.headers.get('content-type')?.includes('application/pdf') || bytes.subarray(0, 5).toString() !== '%PDF-') errors.push(`${path}: invalid PDF response`);
  }
  return errors;
}

export async function auditBuild({ root = resolve('dist'), baseUrl } = {}) {
  const pages = getPages();
  const errors = [];
  for (const field of ['title', 'description']) if (new Set(pages.map((page) => page[field])).size !== pages.length) errors.push(`Duplicate ${field}`);
  for (const page of pages) errors.push(...await inspectDocument(await readFile(resolve(root, pageFile(page.path)), 'utf8'), page, pages, root));
  errors.push(...await inspectSitemap(await readFile(resolve(root, 'sitemap.xml'), 'utf8'), pages));
  const robots = await readFile(resolve(root, 'robots.txt'), 'utf8');
  if (!robots.includes(`Sitemap: ${site.origin}/sitemap.xml`)) errors.push('Robots sitemap host mismatch');
  const llms = await readFile(resolve(root, 'llms.txt'), 'utf8');
  if (!pages.every((page) => llms.includes(canonicalUrl(page.path))) || !llms.includes(site.person.name)) errors.push('LLM discovery file out of sync');
  for (const name of ['robots.txt', 'sitemap.xml', 'llms.txt', 'index.html']) {
    const text = await readFile(resolve(root, name), 'utf8');
    if (/ahmad-ayyad\.vercel\.app|my-protofoilo-rtte\.vercel\.app|Ahmad Ayyad/.test(text)) errors.push(`${name}: stale public identity/domain`);
  }
  const notFound = parseHTML(await readFile(resolve(root, '404.html'), 'utf8')).document;
  if (!notFound.querySelector('meta[name="robots"]')?.getAttribute('content')?.includes('noindex') || notFound.querySelector('link[rel="canonical"]')) errors.push('404 must be noindex without a canonical');
  if (baseUrl) errors.push(...await auditHttp(baseUrl, pages));
  return { date: new Date().toISOString(), pages: pages.length, checks: { build: 'checked', deployedHttp: baseUrl ?? 'pending: no deployment URL supplied', fieldCwv: 'pending: requires field data', externalIssuerAvailability: 'not checked; advisory' }, errors, passed: errors.length === 0 };
}

if (process.argv[1] && import.meta.url === pathToFileURL(resolve(process.argv[1])).href) {
  let report;
  try {
    const index = process.argv.indexOf('--base-url');
    const baseUrl = index >= 0 ? process.argv[index + 1] : undefined;
    if (index >= 0 && !baseUrl) throw new Error('--base-url requires a deployment URL');
    if (baseUrl && !['http:', 'https:'].includes(new URL(baseUrl).protocol)) throw new Error('Invalid deployment URL');
    report = await auditBuild({ baseUrl });
  }
  catch (error) { report = { passed: false, errors: [error.message] }; }
  await mkdir('reports', { recursive: true });
  await writeFile('reports/seo.json', JSON.stringify(report, null, 2) + '\n');
  console.log(JSON.stringify(report, null, 2));
  if (!report.passed) process.exitCode = 1;
}

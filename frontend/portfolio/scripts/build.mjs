import { build } from 'vite';
import { prepareAssets } from './assets.mjs';
import { readFile, writeFile, mkdir } from 'node:fs/promises';
import { resolve, dirname } from 'node:path';
import { getPages } from './route-data.mjs';
import { getPageMetadata, renderMetadata, site, canonicalUrl } from '../src/seo/site.js';

await prepareAssets();
await build();
await build({ build: { ssr: 'src/entry-server.jsx', outDir: 'dist-ssr' } });
const { render } = await import('../dist-ssr/entry-server.js');
const pages = getPages();
const template = await readFile('dist/index.html', 'utf8');
const noindex = process.env.VERCEL_ENV === 'preview';
for (const pathname of [...pages.map((page) => page.path), '/404']) {
  const page = getPageMetadata(pages, pathname);
  const html = template
    .replace(/<!--seo:start-->[\s\S]*?<!--seo:end-->/, renderMetadata(page, { noindex }))
    .replace('<!--app-html-->', await render(pathname))
    .replace('<html lang="en">', `<html lang="en" data-noindex="${noindex}">`);
  const destination = resolve('dist', pathname === '/' ? 'index.html' : pathname === '/404' ? '404.html' : `${pathname.slice(1)}.html`);
  await mkdir(dirname(destination), { recursive: true });
  await writeFile(destination, html);
}
await writeFile('dist/sitemap.xml', `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${pages.map((page) => `  <url><loc>${canonicalUrl(page.path)}</loc></url>`).join('\n')}\n</urlset>\n`);
await writeFile('dist/robots.txt', `User-agent: *\n${noindex ? 'Disallow: /' : 'Allow: /'}\n\nSitemap: ${site.origin}/sitemap.xml\n`);
await writeFile('dist/llms.txt', `# ${site.person.name} — ${site.person.title}\n\n> ${site.description}\n\nThis static portfolio describes projects, coursework, internship training and verified credentials. IBM represents professional certification, not employment.\n\n## Pages\n${pages.map((page) => `- [${page.title}](${canonicalUrl(page.path)}): ${page.description}`).join('\n')}\n\n## Evidence\n- GitHub: ${site.person.sameAs[0]}\n- LinkedIn: ${site.person.sameAs[1]}\n\nThis file is supplementary. See the linked pages for project scope, trade-offs and issuer verification links.\n`);
console.log(`Generated ${pages.length} public pages, 404, sitemap, robots and llms.txt (${noindex ? 'preview: noindex' : 'production: indexable'}).`);

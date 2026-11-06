import { createServer } from 'node:http';
import { readFile } from 'node:fs/promises';
import { resolve, sep, extname } from 'node:path';
import { brotliCompressSync } from 'node:zlib';
import { pathToFileURL } from 'node:url';

const types = { '.html': 'text/html; charset=utf-8', '.js': 'text/javascript', '.mjs': 'text/javascript', '.css': 'text/css', '.xml': 'application/xml', '.txt': 'text/plain', '.json': 'application/json', '.pdf': 'application/pdf', '.svg': 'image/svg+xml', '.webp': 'image/webp', '.png': 'image/png', '.jpg': 'image/jpeg', '.woff2': 'font/woff2' };

export async function startServer({ root = resolve('dist'), port = 0 } = {}) {
  const server = createServer(async (request, response) => {
    try {
      const pathname = decodeURIComponent(new URL(request.url, 'http://localhost').pathname);
      if (pathname === '/credentials') { response.writeHead(308, { location: '/#experience' }).end(); return; }
      const normalized = pathname.replace(/\/index\.html$/, '/').replace(/\.html$/, '').replace(/\/$/, '') || '/';
      if (normalized !== pathname) { response.writeHead(308, { location: normalized }).end(); return; }
      const file = resolve(root, pathname === '/' ? 'index.html' : `.${pathname}${extname(pathname) ? '' : '.html'}`);
      if (!file.startsWith(`${root}${sep}`)) { response.writeHead(400).end(); return; }
      let bytes;
      let status = 200;
      try { bytes = await readFile(file); }
      catch { bytes = await readFile(resolve(root, '404.html')); status = 404; }
      const type = status === 404 ? types['.html'] : types[extname(file)] ?? 'application/octet-stream';
      const headers = { 'content-type': type, 'cache-control': /^\/(assets|media)\//.test(pathname) ? 'public, max-age=31536000, immutable' : 'public, max-age=0, must-revalidate' };
      if (String(request.headers['accept-encoding']).includes('br') && /text|javascript|xml|json/.test(type)) {
        bytes = brotliCompressSync(bytes); headers['content-encoding'] = 'br'; headers.vary = 'Accept-Encoding';
      }
      response.writeHead(status, { ...headers, 'content-length': bytes.length });
      response.end(request.method === 'HEAD' ? undefined : bytes);
    } catch { response.writeHead(400).end(); }
  });
  await new Promise((resolveReady, reject) => { server.once('error', reject); server.listen(port, '127.0.0.1', resolveReady); });
  return { server, url: `http://127.0.0.1:${server.address().port}` };
}

if (process.argv[1] && import.meta.url === pathToFileURL(resolve(process.argv[1])).href) {
  const { url } = await startServer({ port: Number(process.env.PORT ?? 4173) });
  console.log(`Static preview: ${url}`);
}

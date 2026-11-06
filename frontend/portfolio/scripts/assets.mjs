import { createHash } from 'node:crypto';
import { readFile, writeFile, mkdir, readdir, access } from 'node:fs/promises';
import { basename, extname, join } from 'node:path';
import sharp from 'sharp';
import { profileData } from '../src/content/profileData.js';
import { projectsData } from '../src/content/projectsData.js';
import { caseStudiesData } from '../src/content/caseStudiesData.js';

const hash = (value) => createHash('sha256').update(value).digest('hex').slice(0, 16);
const sources = [...new Set(JSON.stringify([profileData, projectsData, caseStudiesData]).match(/https:\/\/res\.cloudinary\.com\/[^"\s]+/g))].sort();
const exists = (file) => access(file).then(() => true, () => false);
const sourceName = (url) => `${hash(url)}${extname(new URL(url).pathname)}`;

export async function syncSources() {
  await mkdir('assets-source', { recursive: true });
  for (const url of sources) {
    const destination = join('assets-source', sourceName(url));
    if (await exists(destination)) continue;
    const response = await fetch(url, { signal: AbortSignal.timeout(60000) });
    if (!response.ok) throw new Error(`Asset download failed: ${response.status} ${url}`);
    const bytes = Buffer.from(await response.arrayBuffer());
    if (extname(destination).toLowerCase() === '.pdf' && bytes.subarray(0, 5).toString() !== '%PDF-') throw new Error(`Invalid PDF: ${url}`);
    if (extname(destination).toLowerCase() !== '.pdf') await sharp(bytes).metadata();
    await writeFile(destination, bytes);
    console.log(`Saved ${basename(destination)} (${bytes.length} bytes)`);
  }
  await writeFile('assets-source/sources.json', JSON.stringify(Object.fromEntries(sources.map((url) => [sourceName(url), url])), null, 2) + '\n');
}

async function imageVariants(bytes, name, output) {
  const image = sharp(bytes).rotate();
  const metadata = await image.metadata();
  const width = metadata.autoOrient?.width ?? metadata.width;
  const height = metadata.autoOrient?.height ?? metadata.height;
  const widths = [...new Set([320, 640, 960, 1600].map((size) => Math.min(size, width)))].sort((a, b) => a - b);
  const variants = [];
  for (const size of widths) {
    const filename = `${name}-${size}.webp`;
    if (!await exists(join('public/media', filename))) await image.clone().resize({ width: size, withoutEnlargement: true }).webp({ quality: 82 }).toFile(join('public/media', filename));
    variants.push({ src: `/media/${filename}`, width: size });
  }
  output.src = variants.at(-1).src;
  output.width = width;
  output.height = height;
  output.variants = variants;
}

export async function prepareAssets() {
  await Promise.all(['public/media', 'public/social', 'src/generated'].map((directory) => mkdir(directory, { recursive: true })));
  const manifest = {};
  for (const url of sources) {
    const filename = join('assets-source', sourceName(url));
    if (!await exists(filename)) throw new Error(`Missing local source ${filename}. Run npm run assets:sync before building.`);
    const bytes = await readFile(filename);
    const name = hash(bytes);
    manifest[url] = {};
    if (extname(filename).toLowerCase() === '.pdf') {
      manifest[url].src = `/media/Ahmed-Ayyad-CV-${name}.pdf`;
      await writeFile(`public${manifest[url].src}`, bytes);
    } else await imageVariants(bytes, name, manifest[url]);
  }

  // PDF rendering is build-time only; the browser receives ordinary responsive images.

  const canvas = await import('@napi-rs/canvas');
  Object.assign(globalThis, { DOMMatrix: canvas.DOMMatrix, ImageData: canvas.ImageData, Path2D: canvas.Path2D });
  const { getDocument } = await import('pdfjs-dist/legacy/build/pdf.mjs');
  const pdfFiles = await readdir('public/certificates', { recursive: true });
  for (const file of pdfFiles.filter((name) => name.toLowerCase().endsWith('.pdf'))) {

    const bytes = await readFile(join('public/certificates', file));
    const key = `/certificates/${file.replaceAll('\\', '/')}`;
    const name = `certificate-${hash(bytes)}`;
    const cached = `public/media/${name}-960.webp`;
    let preview;
    if (await exists(cached)) preview = await sharp(cached).toBuffer();
    else {
      const pdf = await getDocument({ data: new Uint8Array(bytes), useSystemFonts: true, isEvalSupported: false }).promise;

      try {
        const page = await pdf.getPage(1);

        const initial = page.getViewport({ scale: 1 });
        const viewport = page.getViewport({ scale: 960 / initial.width });
        const surface = canvas.createCanvas(Math.ceil(viewport.width), Math.ceil(viewport.height));

        await page.render({ canvasContext: surface.getContext('2d'), viewport }).promise;

        preview = surface.toBuffer('image/png');
      } finally { await pdf.destroy(); }
    }
    manifest[key] = {};
    await imageVariants(preview, name, manifest[key]);
  }

  const socialSources = [['default', profileData.aboutImage.url], ...caseStudiesData.map((study) => [study.slug, study.heroImages?.storefront?.url ?? profileData.aboutImage.url])];
  for (const [name, url] of socialSources) {
    await sharp(join('assets-source', sourceName(url))).rotate().resize(1200, 630, { fit: 'contain', background: '#141414' }).flatten({ background: '#141414' }).jpeg({ quality: 85 }).toFile(`public/social/${name}.jpg`);
  }
  await writeFile('src/generated/media.json', JSON.stringify(manifest) + '\n');
  console.log(`Prepared ${sources.length} remote originals locally, ${pdfFiles.filter((name) => name.endsWith('.pdf')).length} PDF previews and ${socialSources.length} social images.`);
}

if (process.argv[1]?.endsWith('assets.mjs')) {
  if (process.argv.includes('--sync')) await syncSources();
  else await prepareAssets();
}

import { readFile, writeFile, mkdir, readdir } from 'node:fs/promises';
import { gzipSync } from 'node:zlib';
import { execFile } from 'node:child_process';
import { promisify } from 'node:util';
import { execFileSync } from 'node:child_process';
import { startServer } from './serve-static.mjs';
import { auditPaths } from './route-data.mjs';

const execute = promisify(execFile);
const manifest = JSON.parse(await readFile('dist/.vite/manifest.json', 'utf8'));
const baseline = JSON.parse(await readFile('scripts/performance-baseline.json', 'utf8'));
const files = await Promise.all((await readdir('dist/assets')).filter((file) => /\.(js|css|mjs)$/.test(file)).map(async (file) => {
  const bytes = await readFile(`dist/assets/${file}`);
  return { file, bytes: bytes.length, gzipBytes: gzipSync(bytes).length };
}));
const initialChunks = new Set();
function addImports(key) {
  const entry = manifest[key];
  if (!entry || initialChunks.has(entry.file)) return;
  initialChunks.add(entry.file);
  for (const imported of entry.imports ?? []) addImports(imported);
}
addImports('index.html');
const initialGzipBytes = files.filter((file) => initialChunks.has(`assets/${file.file}`)).reduce((sum, file) => sum + file.gzipBytes, 0);
const baselineInitialGzipBytes = baseline.files.filter((file) => /^(index-.*\.js|vendor-.*\.js)$/.test(file.file)).reduce((sum, file) => sum + file.gzipBytes, 0);
const report = {
  date: new Date().toISOString(), revision: execFileSync('git', ['rev-parse', 'HEAD'], { encoding: 'utf8' }).trim(),
  workingTree: execFileSync('git', ['status', '--porcelain'], { encoding: 'utf8' }).trim() ? 'contains uncommitted changes' : 'clean',
  node: process.version, files, initialChunks: [...initialChunks], initialGzipBytes, baselineInitialGzipBytes,
  initialGzipReductionPercent: Number(((1 - initialGzipBytes / baselineInitialGzipBytes) * 100).toFixed(1)),
  fieldCwv: 'pending: requires eligible real-user data; lab results do not establish field INP',
  lab: { status: 'not run', measurements: [] },
};
await mkdir('reports/lighthouse', { recursive: true });

if (!process.argv.includes('--sizes-only')) {
  const hosted = await startServer();
  try {
    const median = (numbers) => [...numbers].sort((a, b) => a - b)[Math.floor(numbers.length / 2)];
    for (const path of auditPaths) for (const profile of ['mobile', 'desktop']) {
      const runs = [];
      for (let run = 1; run <= 3; run++) {
        const filename = `reports/lighthouse/${path.replaceAll('/', '-') || 'home'}-${profile}-${run}.json`;
        const args = ['node_modules/lighthouse/cli/index.js', `${hosted.url}${path}`, '--quiet', '--only-categories=performance,accessibility,best-practices,seo', '--output=json', `--output-path=${filename}`, '--chrome-flags=--headless=new --no-sandbox --disable-dev-shm-usage'];
        if (profile === 'desktop') args.push('--preset=desktop');
        await execute(process.execPath, args, { timeout: 180000, maxBuffer: 1024 * 1024 });
        const result = JSON.parse(await readFile(filename, 'utf8'));
        if (result.runtimeError) throw new Error(result.runtimeError.message);
        const metric = (name) => result.audits[name]?.numericValue;
        const transfer = result.audits['network-requests']?.details?.items ?? [];
        runs.push({ performance: result.categories.performance.score, lcpMs: metric('largest-contentful-paint'), cls: metric('cumulative-layout-shift'), tbtMs: metric('total-blocking-time'), requests: transfer.length, transferBytes: transfer.reduce((sum, item) => sum + (item.transferSize ?? 0), 0) });
        report.lab.lighthouseVersion = result.lighthouseVersion;
      }
      report.lab.measurements.push({ path, profile, cache: 'three independent cold-load runs', median: Object.fromEntries(Object.keys(runs[0]).map((key) => [key, median(runs.map((run) => run[key]))])), runs });
    }
    report.lab.status = 'completed';
  } catch (error) { report.lab.status = 'failed'; report.lab.error = error.message; process.exitCode = 1; }
  finally { await new Promise((done) => hosted.server.close(done)); }
}
await writeFile('reports/performance.json', JSON.stringify(report, null, 2) + '\n');
console.log(JSON.stringify({ initialGzipBytes, baselineInitialGzipBytes, initialGzipReductionPercent: report.initialGzipReductionPercent, lab: report.lab.status, fieldCwv: report.fieldCwv }, null, 2));

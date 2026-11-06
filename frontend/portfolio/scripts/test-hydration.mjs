import { build } from 'vite';
import { execFile } from 'node:child_process';
import { promisify } from 'node:util';

await build({ build: { ssr: 'tests/client-entry.jsx', outDir: 'dist-tests' } });
const execute = promisify(execFile);
for (const pathname of ['/', '/projects', '/work/he-skincare', '/experience/ibm', '/experience/codealpha', '/experience/riphah', '/unknown-page']) {
  const result = await execute(process.execPath, ['tests/hydrate-page.mjs', pathname], { timeout: 15000, env: { ...process.env, NODE_ENV: 'development' } });
  process.stdout.write(result.stdout);
}
const reduced = await execute(process.execPath, ['tests/hydrate-page.mjs', '/', '--reduced-motion'], { timeout: 15000, env: { ...process.env, NODE_ENV: 'development' } });
process.stdout.write(reduced.stdout);

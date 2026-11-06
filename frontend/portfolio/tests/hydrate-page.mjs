import { readFile, writeFile } from 'node:fs/promises';
import assert from 'node:assert/strict';
import { JSDOM } from 'jsdom';

const pathname = process.argv[2] ?? '/';
const filename = pathname === '/' ? 'index.html' : pathname === '/unknown-page' ? '404.html' : `${pathname.slice(1)}.html`;
const dom = new JSDOM(await readFile(`dist/${filename}`, 'utf8'), { url: 'http://localhost' + pathname, pretendToBeVisual: true });
const { window } = dom;
Object.assign(globalThis, { window, document: window.document, HTMLElement: window.HTMLElement, Element: window.Element, Node: window.Node, SVGElement: window.SVGElement });
Object.assign(window, {
  innerWidth: 1280, innerHeight: 900, scrollY: 0, scrollTo() {},
  matchMedia: () => ({ matches: process.argv.includes('--reduced-motion'), addListener() {}, removeListener() {}, addEventListener() {}, removeEventListener() {} }),
  getComputedStyle: (element) => ({ ...element.style, getPropertyValue: (key) => element.style.getPropertyValue(key), display: 'block', position: 'static', overflow: 'visible' }),
});
globalThis.getComputedStyle = window.getComputedStyle;
globalThis.requestAnimationFrame = window.requestAnimationFrame = (callback) => setTimeout(() => callback(performance.now()), 16);
globalThis.cancelAnimationFrame = window.cancelAnimationFrame = clearTimeout;
globalThis.ResizeObserver = class { observe() {} disconnect() {} };
globalThis.IntersectionObserver = class {
  constructor(callback) { this.callback = callback; }
  observe(target) { queueMicrotask(() => { if (!this.disconnected) this.callback([{ target, isIntersecting: true, intersectionRatio: 1 }]); }); }
  disconnect() { this.disconnected = true; }
  unobserve() {}
};
window.HTMLElement.prototype.scrollIntoView = () => {};
window.HTMLElement.prototype.getBoundingClientRect = () => ({ x: 0, y: 0, top: 0, left: 0, right: 1200, bottom: 300, width: 1200, height: 300 });
const errors = [];
const { hydrate } = await import('../dist-tests/client-entry.js');
const root = hydrate(document.getElementById('root'), (error) => errors.push(error.message));
await new Promise((done) => setTimeout(done, 250));
if (errors.length) await writeFile('reports/hydration-failure.json', JSON.stringify(errors, null, 2));
assert.equal(errors.length, 0, `Hydration mismatch on ${pathname}; see reports/hydration-failure.json`);
assert.equal(document.head.querySelectorAll('title').length, 1);
assert.ok(document.querySelector('main').textContent.length > 40);
root.unmount();
console.log(`Hydration passed: ${pathname}${process.argv.includes('--reduced-motion') ? ' (reduced motion)' : ''}`);

dom.window.close();
process.exit(0);

---
name: performance-optimization
description: >-
  Use this skill when auditing or optimizing web application performance, bundle size,
  loading speed, asset delivery, database queries, and Core Web Vitals (LCP, FID/INP, CLS)
  across React, Vite, Node.js, and MongoDB.
---

# Full-Stack Performance Optimization & Core Web Vitals

This skill provides actionable optimization strategies for high-performance React frontends and Node.js/MongoDB backends.

---

## 1. Frontend Performance (React & Vite)

### Dynamic Imports & Lazy Loading
Never bundle heavy third-party libraries (e.g., PDF renderers, charting libraries, 3D engines) into the main chunk. Use `React.lazy` with `Suspense`:

```jsx
import React, { Suspense, lazy } from 'react';

const HeavyPdfViewer = lazy(() => import('./Components/PdfViewer'));

export default function DocumentSection() {
  return (
    <Suspense fallback={<div className="loading-spinner">Loading preview...</div>}>
      <HeavyPdfViewer />
    </Suspense>
  );
}
```

### Vite Bundle Chunk Splitting
In `vite.config.js`, configure `rollupOptions.output.manualChunks` to split vendor dependencies:

```javascript
build: {
  rollupOptions: {
    output: {
      manualChunks: {
        vendor: ['react', 'react-dom'],
        icons: ['react-icons'],
      },
    },
  },
}
```

### Eliminating Redundant Network Calls
Avoid having multiple child components independently fetch the same endpoint (e.g. `/api/profile`).
- Use a **single shared Context** (`ProfileContext`) or cache manager (TanStack Query / SWR).
- Fetch data once at the parent/provider level and distribute via context.

---

## 2. Asset & Media Optimization

### Cloudinary Dynamic Transformations
Always inject automated format and quality flags on remote Cloudinary URLs:

```javascript
export function optimizeCloudinary(url, options = {}) {
  if (!url || !url.includes('cloudinary.com')) return url;
  const { width, quality = 'auto', format = 'auto' } = options;
  const transform = [`f_${format}`, `q_${quality}`];
  if (width) transform.push(`w_${width}`);
  return url.replace('/upload/', `/upload/${transform.join(',')}/`);
}
```

### Static Image Guidelines
- Convert PNG/JPEG images to WebP or AVIF for 60-80% file size reduction.
- Explicitly define `width` and `height` attributes (or CSS aspect-ratio) to prevent Cumulative Layout Shift (CLS).
- Add `loading="lazy"` on below-the-fold images.
- Prune unused images and assets from `public/` and `src/assets/`.

---

## 3. Backend & Database Performance

- **Mongoose `.lean()`**: Add `.lean()` to all read queries where full Mongoose document methods are not required.
- **Field Projection**: Use `.select('title summary image')` to omit heavy text/blobs in listing endpoints.
- **Indexes**: Verify that queries involving sorting or filtering use MongoDB indexes (`explain('executionStats')`).
- **Gzip / Brotli Compression**: Enable `compression()` middleware in Express for JSON payloads > 1KB.

---

## 4. Performance Checklist
- [ ] Bundle analyzer reveals no single chunk > 500 KB (except vendor libraries).
- [ ] Heavy components (PDF viewers, modals, charts) are code-split with `React.lazy`.
- [ ] Cloudinary images use `f_auto,q_auto`.
- [ ] No redundant duplicate API calls on page mount.
- [ ] MongoDB queries use `.lean()` and targeted field projections.
- [ ] Below-the-fold images use `loading="lazy"`.

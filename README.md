# Ahmed Ayyad — Backend-Focused Full-Stack Developer Portfolio

**Live site:** [https://my-portfolio-rtte.vercel.app](https://my-portfolio-rtte.vercel.app)  
**GitHub:** [A422789](https://github.com/A422789) · **LinkedIn:** [Ahmed Ayyad](https://www.linkedin.com/in/ahmad-ayyad-608293304/)

---

## Overview

A production-grade, static-first personal portfolio built with React, Vite, and Tailwind CSS. The project showcases backend-focused full-stack projects, case studies, IBM professional certifications, and two internship experiences through a fully pre-rendered, SEO-optimised, and AI-agent-auditable web platform.

All content is statically embedded at build time — no backend server, no database, no runtime API. Every page is generated as a standalone HTML file and served directly from Vercel CDN.

---

## Architecture

```
frontend/
└── portfolio/          ← The only active application
    ├── scripts/        ← Build, asset-sync, audit, and static server scripts
    ├── src/
    │   ├── content/    ← All static data (projects, certifications, experience, profile)
    │   ├── seo/        ← Canonical URLs, JSON-LD schemas, per-route metadata
    │   ├── components/ ← Reusable UI and layout components
    │   ├── sections/   ← Landing page section components
    │   ├── pages/      ← Route-level page components
    │   ├── layouts/    ← Shared page shell
    │   ├── context/    ← Profile context provider
    │   └── utils/      ← Contact form validation
    ├── public/
    │   ├── certificates/ ← Local certificate PDFs + pre-rendered PNG thumbnails
    │   └── favicon.svg
    ├── tests/          ← Automated audit tests (Node native test runner)
    ├── vercel.json     ← Hosting rules (redirects, cache headers, clean URLs)
    └── vite.config.js
```

---

## Features

### Static Pre-rendering (Phase 1 — Technical SEO)
- Build script ([`scripts/build.mjs`](frontend/portfolio/scripts/build.mjs)) pre-renders all **15 public routes** into standalone HTML files using `react-dom/server` and `StaticRouter`.
- Every page receives its own `<title>`, `<meta name="description">`, `<link rel="canonical">`, OpenGraph/Twitter card metadata, and a linked JSON-LD structured data graph (`Person`, `WebSite`, `WebPage`, `BreadcrumbList`).
- Build automatically emits `sitemap.xml`, `robots.txt` (auto-noindex on preview deployments), and `llms.txt`.
- Vercel is configured for HTTP 308 permanent redirect from `/credentials` to `/#experience`, real 404 handling, and long-lived immutable caching for hashed assets.

### Local Assets & Performance (Phase 2)
- 20 Cloudinary media sources are mirrored locally at build time ([`scripts/assets.mjs`](frontend/portfolio/scripts/assets.mjs)).
- Sharp generates responsive WebP image variants (320w–1600w) with automatic `srcset`, `sizes`, and explicit aspect ratios to prevent layout shift.
- All 15 certificate PDFs are stored locally in `public/certificates/`; first-page PNG thumbnails are pre-rendered at build time — no PDF.js is loaded during normal browsing.
- Route-level code splitting via `React.lazy` keeps the initial client bundle at ~122 kB gzip (~389 kB uncompressed).

### AI Search Visibility (Phase 3)
- Technical case studies, project architecture, trade-offs, and credential summaries are fully present in server-rendered HTML — readable by Googlebot and AI crawlers (`OAI-SearchBot`) without JavaScript execution.
- Machine-readable `llms.txt` reflects verified facts aligned with the official identity document.

### Automated Testing & CI (Phase 4)
- **7 / 7 test suites** pass via `npm test` (Node's native test runner), covering: build output validation, fault injection (broken canonical / duplicate title / malformed schema / dead link detection), sitemap integrity, HTML content checks, metadata escaping, and static preview HTTP status codes.
- `npm run audit:seo` verifies all 15 generated pages with 0 errors.
- GitHub Actions CI runs linting, build, tests, and SEO audit on every pull request and push.

---

## Public Routes (15)

| Route | Description |
| :--- | :--- |
| `/` | Landing — Hero, Featured Work, Experience, Tech Stack, Background, Contact |
| `/projects` | Full Projects & Case Studies archive |
| `/work/he-skincare` | HE Skincare e-commerce case study |
| `/work/project-management` | Project Engagement Tool case study |
| `/work/neoteric-cms` | Neoteric CMS case study |
| `/work/ecommerce-platform` | E-commerce Platform case study |
| `/work/giftlink` | GiftLink IBM Capstone case study |
| `/work/kubernetes-deployment` | Kubernetes Deployment case study |
| `/work/enterprise-dashboard` | Enterprise Dashboard case study |
| `/work/chat-boot` | Chat Bot case study |
| `/work/cpp-hospital-system` | C++ Hospital System case study |
| `/work/java-oop-system` | Java OOP System case study |
| `/experience/ibm` | IBM Full-Stack Developer Professional Certificate experience |
| `/experience/codealpha` | CodeAlpha Full-Stack Internship experience |
| `/experience/riphah` | Riphah International University — Education |

---

## Tech Stack

| Layer | Technology |
| :--- | :--- |
| **Framework** | React 19, Vite 7 |
| **Styling** | Tailwind CSS v4 |
| **Routing** | React Router DOM v7 |
| **Animation** | Framer Motion |
| **Forms** | React Hook Form + Zod |
| **Contact Delivery** | Formspree (static — no backend) |
| **Image Processing (Build)** | Sharp, @napi-rs/canvas |
| **PDF Thumbnails (Build)** | pdfjs-dist (Node build-time only) |
| **Testing** | Node native test runner |
| **Deployment** | Vercel (static output) |

---

## Running Locally

```bash
# 1. Clone the repository
git clone https://github.com/A422789/MyPortfolio.git
cd MyPortfolio/frontend/portfolio

# 2. Install dependencies
npm install

# 3. Sync remote assets locally (run once — requires internet connection)
npm run assets:sync

# 4. Start the development server
npm run dev
```

> **Note:** `npm run dev` automatically calls `assets:prepare` to generate local WebP variants and certificate thumbnails before starting Vite.

## Building for Production

```bash
npm run build
```

Outputs a fully pre-rendered `dist/` folder with 15 static HTML pages, hashed assets, `sitemap.xml`, `robots.txt`, and `llms.txt`.

## Running Tests & Audits

```bash
# Automated test suite (7 test files)
npm test

# Static SEO audit against the build output
npm run audit:seo

# Lighthouse performance baseline (runs against a local static server)
npm run audit:performance

# Preview the production build locally
npm run preview
```

---

## Content Structure

All portfolio data is managed as static JavaScript modules in `frontend/portfolio/src/content/`:

| File | Contents |
| :--- | :--- |
| `profileData.js` | Name, title, bio, contact details, CV link |
| `projectsData.js` | Project cards for the archive |
| `caseStudiesData.js` | Full case study data (problem, approach, results, links) |
| `experienceData.js` | Internship and certification experience entries |
| `certificationsData.js` | IBM and CodeAlpha certificates |
| `skillsData.js` | Categorised technical skill matrix |
| `socialLinksData.js` | GitHub, LinkedIn, WhatsApp links |
| `backgroundData.js` | Education and background section content |

To update any displayed content, edit the relevant file in `src/content/` and rebuild.

---

## Deployment (Vercel)

| Setting | Value |
| :--- | :--- |
| **Root Directory** | `frontend/portfolio` |
| **Framework Preset** | Vite |
| **Build Command** | `npm run build` |
| **Output Directory** | `dist` |
| **Production Branch** | `main` (or your preferred branch) |

The `vercel.json` file at `frontend/portfolio/vercel.json` handles all routing rules.

---

## Contact

- **Email:** ahmadayyad.se.dev@gmail.com
- **WhatsApp:** +20 122 504 4423
- **LinkedIn:** [Ahmed Ayyad](https://www.linkedin.com/in/ahmad-ayyad-608293304/)
- **GitHub:** [A422789](https://github.com/A422789)

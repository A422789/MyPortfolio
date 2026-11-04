export const caseStudiesData = [
  {
    slug: 'he-skincare',
    projectId: 'he-skincare',
    badge: 'FLAGSHIP 01 · FULL-STACK E-COMMERCE & HEADLESS CMS',
    title: 'HE Skincare — Bilingual E-Commerce Storefront & Headless Admin CMS',
    subtitle:
      'Architecting a dual-interface luxury e-commerce ecosystem from the backend up — uniting a bilingual (Arabic/English) customer storefront, a real-time executive Admin CMS, an Express.js REST API, and an automated WhatsApp order notification pipeline.',
    readTime: '8 min engineering read',
    context: 'CodeAlpha Full-Stack Internship · Client-Connected System',
    timeline: 'July 2026 – August 2026',
    role: 'Full-Stack Developer (Backend Architecture, Data Modeling, Auth, Storefront & Admin CMS, Testing & Cloud Deployment)',
    heroImages: {
      storefront: {
        url: 'https://res.cloudinary.com/djwqb3ibk/image/upload/v1786234794/portfolio/projects/1786234793366-788351808_wzbwiw.jpg',
        caption: 'Customer-Facing Bilingual Storefront (Arabic RTL & English LTR)',
      },
      admin: {
        url: 'https://res.cloudinary.com/djwqb3ibk/image/upload/v1786236859/portfolio/projects/1786236857496-215232632_rjidht.jpg',
        caption: 'Headless Admin CMS & Order Operations Dashboard',
      },
    },
    links: {
      storefront: {
        label: 'Live Customer Storefront',
        url: 'https://skin-care-react-project.vercel.app',
      },
      adminDashboard: {
        label: 'Live Admin Dashboard',
        url: 'https://skin-care-react-project-h8cw.vercel.app',
      },
      backendApi: {
        label: 'Production REST API (Railway)',
        url: 'https://skincarereactproject-production.up.railway.app',
      },
      repo: {
        label: 'GitHub Monorepo',
        url: 'https://github.com/A422789/SkinCareReactProject',
      },
    },
    demoCredentials: {
      note: 'Read-only sandbox mode enabled so reviewers can safely explore the Admin CMS without mutating production catalog data.',
      email: 'demo@skincareproject.com',
      password: 'demo1234',
    },
    techStack: {
      backend: ['Node.js', 'Express.js', 'MongoDB', 'Mongoose', 'JWT', 'Express-Session', 'bcryptjs', 'Rate Limiting'],
      frontend: ['React.js', 'Tailwind CSS', 'Vanilla CSS', 'Bilingual RTL/LTR Engine'],
      integrations: ['WhatsApp Web.js', 'Puppeteer', 'Cloudinary CDN'],
      testingAndDevOps: ['Jest', 'Supertest', 'Vitest', 'Cypress', 'Docker', 'Railway', 'Vercel', 'GitHub Actions CI'],
    },
    editorialLead:
      'Most entry-level e-commerce builds stop at a static product grid and a local cart. HE Skincare was engineered to solve the operational reality of a regional luxury brand: managing a bilingual Arabic/English catalog from a non-technical Admin CMS, enforcing strict session and token security across public and administrative surfaces, and dispatching instant WhatsApp order alerts when customers check out.',
    problemAndContext: {
      headline: '1. The Business & Engineering Problem',
      narrative: [
        'A regional skincare brand needed more than a single promotional website — it required two synchronized software applications powered by one authoritative backend API: a high-conversion customer storefront supporting seamless Arabic (RTL) and English (LTR) shopping, and a private Headless CMS dashboard where store operators could manage inventory, categories, dynamic storefront banners, customer inquiries, and order fulfillment without touching code.',
        'From an engineering standpoint, building this system introduced three core challenges: designing a database schema that treats bilingual content as a first-class citizen rather than an afterthought, protecting administrative endpoints while allowing public reviewers to test the dashboard safely via a Demo Sandbox role, and integrating automated WhatsApp order notifications on cloud infrastructure.',
      ],
    },
    dualSystemBreakdown: {
      headline: '2. Dual-Interface System Architecture (Storefront + Admin CMS)',
      intro:
        'Rather than coupling the customer UI and management views into a bloated monolith, the frontend tier is split into two purpose-built React applications communicating with a unified Express.js and MongoDB REST API:',
      surfaces: [
        {
          name: 'Surface A — Customer E-Commerce Storefront',
          url: 'https://skin-care-react-project.vercel.app',
          image: 'https://res.cloudinary.com/djwqb3ibk/image/upload/v1786234794/portfolio/projects/1786234793366-788351808_wzbwiw.jpg',
          highlights: [
            'Dynamic bilingual switching (Arabic RTL / English LTR) backed directly by localized sub-documents from the API.',
            'Category filtering, product detail views, persistent shopping cart, and validated checkout flow.',
            'Dynamic hero banners, brand story sections, and payment instructions controlled remotely from the Admin CMS.',
          ],
        },
        {
          name: 'Surface B — Executive Admin Dashboard & Headless CMS',
          url: 'https://skin-care-react-project-h8cw.vercel.app',
          image: 'https://res.cloudinary.com/djwqb3ibk/image/upload/v1786236859/portfolio/projects/1786236857496-215232632_rjidht.jpg',
          highlights: [
            'Full bilingual CRUD for products and categories with Cloudinary image upload pipelines.',
            'Real-time order management pipeline (status transitions, customer contact details, and revenue analytics).',
            'WhatsApp Gateway pairing & notification control panel for automated order confirmation messages.',
            'Built-in Demo Sandbox guard (`demo@skincareproject.com`) allowing recruiters to inspect every dashboard screen while blocking destructive mutations on the backend.',
          ],
        },
      ],
    },
    architectureTiers: [
      {
        tier: 'Client Tier (Dual React SPAs)',
        summary: 'Storefront SPA + Admin CMS SPA deployed independently on Vercel, consuming REST endpoints with localized state synchronization.',
      },
      {
        tier: 'API & Security Middleware Tier',
        summary: 'Node.js & Express.js REST API enforcing rate limiting, input sanitization, JWT verification, stateful session checks, and role-based access control (Admin vs. Demo Sandbox).',
      },
      {
        tier: 'Persistence Tier (MongoDB & Mongoose)',
        summary: 'Bilingual sub-document schemas (`{ en, ar }`) for products/categories, order state machines, and a MongoDB TTL-indexed Token Blacklist collection.',
      },
      {
        tier: 'Messaging & Cloud Infrastructure Tier',
        summary: 'Dockerized backend hosted on Railway with a persistent volume for WhatsApp Web.js session state, Cloudinary media storage, and GitHub Actions CI.',
      },
    ],
    engineeringDecisions: [
      {
        title: 'Bilingual Sub-Document Schema Design vs. Client Translation Files',
        decision: 'Stored localized fields (`name: { en, ar }`, `description: { en, ar }`) directly inside Mongoose sub-documents instead of relying on static frontend JSON translation files.',
        rationale: 'Static translation files only work for hardcoded UI labels. In a real e-commerce CMS, store owners create new products daily and must publish both Arabic and English copy dynamically from the Admin Dashboard.',
        tradeOff: 'Slightly increases document payload size, mitigated by selective field projection and clean indexing.',
      },
      {
        title: 'Short-Lived JWTs + Stateful Session Validation + TTL Token Blacklist',
        decision: 'Combined short-lived JWT authentication and session checks with a MongoDB Token Blacklist collection using a native TTL (Time-To-Live) index.',
        rationale: 'Purely stateless JWTs cannot be revoked immediately upon logout or credential compromise. Storing revoked token identifiers with a MongoDB TTL index guarantees immediate invalidation while letting MongoDB automatically purge expired entries.',
        tradeOff: 'Adds a lightweight indexed lookup during authenticated requests in exchange for deterministic logout security.',
      },
      {
        title: 'Safe Recruiter Demo Sandbox Role at the Middleware Layer',
        decision: 'Implemented a dedicated read-only demo role (`demo@skincareproject.com`) enforced by Express middleware rather than hiding buttons only in React.',
        rationale: 'Recruiters and hiring managers rarely want to sign up or risk breaking a live store, yet screenshots alone do not prove backend competence. Enforcing sandbox restrictions in backend middleware lets reviewers explore the real live Admin Dashboard safely.',
        tradeOff: 'Required explicit middleware guards across write/delete endpoints, paying off in zero-friction recruiter evaluation.',
      },
    ],
    testingAndVerification: {
      headline: '5. Automated Testing & Verification Strategy',
      intro:
        'To ensure changes to schema validation or auth middleware did not break checkout or admin operations, testing was structured across three complementary layers:',
      layers: [
        {
          layer: 'Backend API Integration Tests (Jest + Supertest)',
          details: 'Verified REST endpoint contracts, authentication guards, bilingual product creation, order submission validation, and Demo Sandbox write-blocking.',
        },
        {
          layer: 'Frontend Component Tests (Vitest)',
          details: 'Tested core React UI state transitions, cart calculations, and bilingual rendering behavior.',
        },
        {
          layer: 'End-to-End Critical Path Flows (Cypress)',
          details: 'Simulated user journeys from storefront product discovery and checkout to Admin Dashboard login and order inspection.',
        },
      ],
    },
    productionPostMortem: {
      headline: '6. Real Production Incident & Engineering Lesson Learned',
      incidentTitle: 'Diagnosing a Headless Chromium / WhatsApp Web.js Memory Leak on Cloud Hosting',
      whatHappened:
        'To send automated WhatsApp order notifications without paid third-party enterprise API fees, the backend integrated `whatsapp-web.js` (which spawns a headless Puppeteer/Chromium browser instance) alongside a persistent session volume on Railway. During live deployment, leaving the background Chromium process running continuously caused steady memory accumulation, high container RAM consumption, and unexpected cloud billing cost.',
      resolutionAndLesson:
        'Investigating container metrics revealed how heavyweight browser automation behaves inside constrained backend containers. This incident became a defining engineering lesson in process lifecycle management, resource monitoring, decoupling heavy background workers from core HTTP API processes, and testing memory behavior under realistic production uptime.',
    },
  },

  {
    slug: 'project-management',
    projectId: 'project-management-tool',
    badge: 'FLAGSHIP 02 · COLLABORATIVE SAAS & SECURITY ARCHITECTURE',
    title: 'Collaborative Project Management Tool — Multi-Workspace Task & Team Engine',
    subtitle:
      'Engineering a collaborative project and task management platform focused on session security, HTTP-only token rotation, role-based access control (RBAC), relational data integrity, and optimistic UI responsiveness.',
    readTime: '7 min engineering read',
    context: 'CodeAlpha Full-Stack Internship · Systems & Security Task',
    timeline: 'July 2026 – August 2026',
    role: 'Full-Stack Developer (API Architecture, Hybrid Auth & Refresh Pipeline, RBAC, Relational Mongoose Schemas, React Frontend & Testing)',
    heroImages: {
      storefront: {
        url: 'https://res.cloudinary.com/djwqb3ibk/image/upload/v1786235781/portfolio/projects/1786235780794-549828611_oab3zl.jpg',
        caption: 'Collaborative Workspace, Task Boards, Member Roles & Activity Engine',
      },
    },
    links: {
      storefront: {
        label: 'Live Web Application',
        url: 'https://project-management-tool-mocha.vercel.app/',
      },
      backendApi: {
        label: 'Production REST API (Railway)',
        url: 'https://project-management-tool-production-6dab.up.railway.app/',
      },
      repo: {
        label: 'GitHub Repository',
        url: 'https://github.com/A422789/Project-Management-Tool',
      },
    },
    demoCredentials: null,
    techStack: {
      backend: ['Node.js', 'Express.js', 'MongoDB', 'Mongoose', 'Short-Lived JWT', 'HTTP-Only Sessions', 'RBAC Middleware'],
      frontend: ['React.js', 'Context API', 'Axios Interceptors', 'Optimistic UI', 'Tailwind CSS'],
      integrations: ['Socket.io / Real-Time Event Architecture', 'Axios Request/Response Interceptors'],
      testingAndDevOps: ['Jest', 'Supertest', 'Vitest', 'Cypress', 'Docker', 'Railway', 'Vercel', 'GitHub Actions CI'],
    },
    editorialLead:
      'Team collaboration tools frequently suffer from two architectural flaws in junior implementations: storing long-lived JWTs in `localStorage` where any XSS vector can exfiltrate sessions, and enforcing project permissions only by hiding buttons in the frontend UI. This platform was architected from day one around server-side authorization gates, automated silent token refresh via HTTP-only sessions, and strict relational cleanup when projects or tasks are deleted.',
    problemAndContext: {
      headline: '1. The Engineering Problem',
      narrative: [
        'Multi-user collaboration workspaces require constant state mutations — creating projects, assigning team members, transitioning task statuses, and posting threaded comments. When multiple users interact with shared resources, naive CRUD APIs quickly run into unauthorized API manipulation, stale UI state, and orphaned database records.',
        'The goal of this project was to design a full-stack collaboration engine where security boundaries are enforced at the Express middleware layer, authentication tokens rotate transparently without interrupting active users, and task transitions feel instantaneous on the client.',
      ],
    },
    dualSystemBreakdown: {
      headline: '2. Workspace & Backend Core Capabilities',
      intro:
        'The application pairs an interactive React workspace client with a defense-in-depth Express/MongoDB backend:',
      surfaces: [
        {
          name: 'Interactive Collaboration Workspace (React Client)',
          url: 'https://project-management-tool-mocha.vercel.app/',
          image: 'https://res.cloudinary.com/djwqb3ibk/image/upload/v1786235781/portfolio/projects/1786235780794-549828611_oab3zl.jpg',
          highlights: [
            'Project workspace creation, member invitation/assignment, and role-aware UI controls.',
            'Task lifecycle management (status workflows, priority tracking, and threaded task comments).',
            'Optimistic UI updates that reflect task status changes immediately while reconciling with the backend API and rolling back gracefully on network failure.',
          ],
        },
        {
          name: 'Defense-in-Depth API & Session Engine (Node.js / Express)',
          url: 'https://project-management-tool-production-6dab.up.railway.app/',
          image: null,
          highlights: [
            'Hybrid authentication combining short-lived access tokens with HTTP-only session refresh endpoints.',
            'Axios response interceptors that queue concurrent 401 requests during silent token rotation to prevent race conditions.',
            'Cascading data integrity logic ensuring that deleting a project or task cleanly removes associated tasks and comments without leaving orphaned documents.',
          ],
        },
      ],
    },
    architectureTiers: [
      {
        tier: 'React Workspace & Axios Interceptor Layer',
        summary: 'Context-driven state with optimistic UI mutations and automatic 401 token refresh retry queues.',
      },
      {
        tier: 'Express Authorization & RBAC Gateways',
        summary: 'Route-level ownership and project-membership middleware verifying user roles before any database read or mutation executes.',
      },
      {
        tier: 'MongoDB Relational Reference Model',
        summary: 'Normalized Mongoose schemas (`Users`, `Projects`, `Tasks`, `Comments`) with schema-level validation and cascading cleanup hooks.',
      },
      {
        tier: 'Docker & CI/CD Pipeline',
        summary: 'Containerized runtime via Docker, deployed on Railway and Vercel with automated GitHub Actions test workflows.',
      },
    ],
    engineeringDecisions: [
      {
        title: 'Hybrid Auth: Short-Lived Access Tokens + HTTP-Only Session Refresh',
        decision: 'Avoided storing long-lived access tokens in `localStorage`; instead, paired short-lived access tokens with an HTTP-only session refresh flow managed by Axios interceptors.',
        rationale: 'Storing persistent JWTs in `localStorage` exposes user sessions if client scripts are compromised. Using an HTTP-only cookie/session channel for refresh rotation keeps long-lived credentials inaccessible to `document.cookie` while maintaining stateless speed for short-lived API calls.',
        tradeOff: 'Requires careful CORS (`credentials: true`) configuration between Vercel and Railway and request-queue handling on token expiry.',
      },
      {
        title: 'Server-Side RBAC & Resource Membership Enforcement',
        decision: 'Every project, task, and comment endpoint validates both the authenticated user identity and their specific role/membership inside the target project on the server.',
        rationale: 'Client-side route guards only improve UX; real security requires assuming an attacker will call REST endpoints directly via Postman or curl.',
        tradeOff: 'Adds membership verification queries on protected routes, ensuring strict tenant and role isolation.',
      },
      {
        title: 'Optimistic UI Updates with Rollback Safety',
        decision: 'Updated task status and comment lists immediately in React state before awaiting the round-trip response from the cloud database, reverting state if the API returns an error.',
        rationale: 'Collaboration tools must feel snappy even over cross-region cloud connections.',
        tradeOff: 'Requires snapshotting previous client state prior to dispatch so failed mutations roll back cleanly without UI desynchronization.',
      },
    ],
    testingAndVerification: {
      headline: '5. Multi-Layer Automated Testing Suite',
      intro:
        'Testing focused on authentication edge cases, permission boundaries, and core workspace workflows:',
      layers: [
        {
          layer: 'API & Auth Integration Tests (Jest + Supertest)',
          details: 'Tested token refresh flows, unauthorized RBAC rejection, project/task CRUD validation, and cascading deletion integrity.',
        },
        {
          layer: 'Component & State Tests (Vitest)',
          details: 'Verified workspace context behavior, task card rendering, and form validation feedback.',
        },
        {
          layer: 'End-to-End Collaboration Workflows (Cypress)',
          details: 'Validated full user flows from authentication and project creation to task status updates and commenting.',
        },
      ],
    },
    productionPostMortem: {
      headline: '6. Key Engineering Outcome & Takeaway',
      incidentTitle: 'Eliminating Token Refresh Race Conditions Across Concurrent Requests',
      whatHappened:
        'When a workspace dashboard loads, the React client often fires multiple API requests simultaneously (fetching projects, member lists, and task notifications). When an access token expired, all concurrent requests received a `401 Unauthorized` at the same instant and attempted to trigger parallel refresh calls.',
      resolutionAndLesson:
        'Implemented an Axios interceptor refresh lock with a subscriber queue so only the first `401` initiates a token refresh while concurrent requests wait in memory and automatically replay with the new token once resolved.',
    },
  },

  {
    slug: 'neoteric-cms',
    projectId: 'neoteric-cms',
    badge: 'FLAGSHIP 03 · CORPORATE WEB PLATFORM & ENTERPRISE CMS',
    title: 'Neoteric Technologies — Public Corporate Website & Full-Stack Admin CMS',
    subtitle:
      'Building a complete full-stack corporate web platform and content management system powered by Node.js, Express.js v5, and MongoDB Atlas — featuring a public multi-page website and a secure executive Admin Dashboard.',
    readTime: '6 min engineering read',
    context: 'Full-Stack Web Platform & Headless CMS Architecture',
    timeline: '2026',
    role: 'Full-Stack Developer (Express v5 REST API, MongoDB Atlas Schemas, Caching, Admin Dashboard & Public Website)',
    heroImages: {
      storefront: {
        url: 'https://res.cloudinary.com/djwqb3ibk/image/upload/v1786237856/portfolio/projects/1786237855572-194685751_vqk3jw.jpg',
        caption: 'Neoteric Technologies Executive Admin CMS & Public Platform',
      },
    },
    links: {
      storefront: {
        label: 'Live Public Corporate Website',
        url: 'https://full-stack-project-eight-ruby.vercel.app/pages/home.html',
      },
      adminDashboard: {
        label: 'Live Admin CMS Dashboard',
        url: 'https://full-stack-project-eight-ruby.vercel.app/dashboard/dashboard-overview.html',
      },
      backendApi: {
        label: 'Production REST API (Railway)',
        url: 'https://fullstackproject-production-c3bd.up.railway.app/',
      },
      repo: {
        label: 'GitHub Repository',
        url: 'https://github.com/A422789/FullStackProject',
      },
    },
    demoCredentials: {
      note: 'Demo Administrator credentials for exploring the live CMS Dashboard and analytics views:',
      email: 'admin@neoteric.tech',
      password: 'NeotericSuperSecureAdmin2026',
    },
    techStack: {
      backend: ['Node.js', 'Express.js v5', 'MongoDB Atlas', 'Mongoose', 'JWT', 'bcryptjs', 'node-cache', 'Nodemailer'],
      frontend: ['Semantic HTML5', 'Modern CSS3', 'Vanilla JavaScript (ES6+)', 'Chart.js', 'Dark/Light Theme Engine', 'Bilingual AR/EN'],
      integrations: ['Automated Email Notifications (Nodemailer)', 'SEO Metadata Management'],
      testingAndDevOps: ['Railway Cloud API', 'Vercel Frontend Hosting', 'Git & GitHub'],
    },
    editorialLead:
      'Before relying on frontend frameworks to abstract away the browser, a strong full-stack engineer must understand how to wire a multi-page frontend directly to a RESTful backend using pure JavaScript, asynchronous Fetch pipelines, and clean DOM state management. Neoteric Technologies was engineered as a two-part system: a public corporate website and a full-featured Admin CMS backed by Node.js, Express.js v5, and MongoDB Atlas.',
    problemAndContext: {
      headline: '1. The Business & Architectural Problem',
      narrative: [
        'Digital agencies and software houses frequently need a fast, SEO-friendly public website where every section — services, portfolio projects, team members, blog articles, client messages, and global site settings — can be updated dynamically by non-technical administrators.',
        'The goal was to build both the public-facing corporate portal and the private executive CMS dashboard without framework overhead on the frontend, while implementing a robust Node.js + Express.js v5 backend with in-memory caching (`node-cache`), email notifications (`Nodemailer`), role-based access control, and interactive analytics (`Chart.js`).',
      ],
    },
    dualSystemBreakdown: {
      headline: '2. Dual-Surface Architecture (Public Corporate Portal + Admin CMS)',
      intro:
        'The platform is divided into two distinct user experiences served from the same codebase and connected to the Railway Express v5 API:',
      surfaces: [
        {
          name: 'Surface A — Public Corporate Website (`/pages/home.html`)',
          url: 'https://full-stack-project-eight-ruby.vercel.app/pages/home.html',
          image: 'https://res.cloudinary.com/djwqb3ibk/image/upload/v1786237856/portfolio/projects/1786237855572-194685751_vqk3jw.jpg',
          highlights: [
            'Dynamic rendering of company services, project showcase, team directory, and blog posts fetched from MongoDB Atlas.',
            'Bilingual Arabic/English support, persistent Dark/Light theme switching, and dynamic SEO metadata.',
            'Interactive client contact & inquiry form integrated with backend validation and Nodemailer email alerts.',
          ],
        },
        {
          name: 'Surface B — Executive Admin CMS (`/dashboard/dashboard-overview.html`)',
          url: 'https://full-stack-project-eight-ruby.vercel.app/dashboard/dashboard-overview.html',
          image: null,
          highlights: [
            'Visual executive overview with `Chart.js` analytics tracking content metrics and incoming inquiries.',
            'Complete CRUD management modules for Services, Projects, Team Members, Blog Articles, Messages, and Site Settings.',
            'Role-Based Access Control (RBAC) and JWT session management with token blacklist enforcement on logout.',
          ],
        },
      ],
    },
    architectureTiers: [
      {
        tier: 'Multi-Page Vanilla JS Client Tier',
        summary: 'Modular ES6+ JavaScript controllers handling API communication, DOM rendering, Chart.js visualizations, and theme/language persistence.',
      },
      {
        tier: 'Express.js v5 REST API & Caching Tier',
        summary: 'RESTful controllers enhanced with `node-cache` in-memory caching on high-read public endpoints and automatic cache invalidation on Admin writes.',
      },
      {
        tier: 'MongoDB Atlas Persistence Tier',
        summary: 'Structured Mongoose collections for Services, Projects, Team, Blog, Messages, Users, Settings, and Token Blacklist.',
      },
      {
        tier: 'Notification & Cloud Delivery Tier',
        summary: 'Nodemailer SMTP pipeline for inquiry alerts, deployed across Railway (API) and Vercel (Static/Multi-page Frontend).',
      },
    ],
    engineeringDecisions: [
      {
        title: 'In-Memory API Caching (`node-cache`) with Write Invalidation',
        decision: 'Cached public read endpoints (services, team, portfolio, settings) in memory using `node-cache` and invalidated cache keys whenever an admin updates content.',
        rationale: 'Public visitors read corporate pages far more frequently than admins edit them. Serving repeated reads from memory reduces MongoDB Atlas round-trips and speeds up initial page rendering.',
        tradeOff: 'Requires explicit cache-invalidation hooks inside every POST/PUT/DELETE controller to prevent stale public content.',
      },
      {
        title: 'Vanilla ES6+ Architecture vs. SPA Framework',
        decision: 'Built the public pages and admin dashboard using clean HTML5, CSS3, and modular Vanilla JavaScript rather than React.',
        rationale: 'Demonstrates strong fundamentals in native browser APIs, DOM manipulation, `fetch` lifecycle handling, and multi-page state management without relying on third-party UI abstractions.',
        tradeOff: 'Manual DOM updates require more boilerplate than declarative React state, reinforcing why component frameworks shine in larger SPAs.',
      },
      {
        title: 'MVP Token Storage Trade-Off (`localStorage` JWT + Server Token Blacklist)',
        decision: 'Used bearer JWTs stored in `localStorage` for the multi-page Vanilla JS client, paired with a server-side token blacklist on logout.',
        rationale: 'Simplified cross-domain authentication between static HTML pages on Vercel and the API on Railway during rapid MVP delivery.',
        tradeOff: 'While practical for an MVP, storing tokens in `localStorage` is vulnerable to XSS compared to HTTP-only cookies — an engineering lesson that directly informed the upgraded HTTP-only session refresh architecture in the Collaborative Project Management Tool and HE Skincare.',
      },
    ],
    testingAndVerification: {
      headline: '5. Verification & Operational Quality',
      intro:
        'Endpoints and dashboard modules were verified across public and administrative flows:',
      layers: [
        {
          layer: 'REST API & CRUD Verification',
          details: 'Validated end-to-end content creation, editing, and deletion across all 6 CMS modules (Services, Projects, Team, Blog, Messages, Settings).',
        },
        {
          layer: 'Cache Invalidation & Auth Guards',
          details: 'Verified that administrative edits immediately bust stale cache entries and that blacklisted tokens cannot access protected routes.',
        },
      ],
    },
    productionPostMortem: {
      headline: '6. Architectural Evolution & Takeaway',
      incidentTitle: 'From Multi-Page Vanilla JS + Bearer Tokens to Hardened React + HTTP-Only Session Architectures',
      whatHappened:
        'Building a full 6-module CMS in Vanilla JavaScript provided deep clarity into state synchronization, manual DOM diffing, and cross-origin token handling.',
      resolutionAndLesson:
        'Recognizing the security trade-offs of `localStorage` JWTs and manual DOM state in this project directly drove the architectural leap in subsequent flagship systems (`HE Skincare` and `Project Management Tool`) toward React 19, HTTP-only session refresh flows, and automated Jest/Cypress test suites.',
    },
  },

  {
    slug: 'ecommerce-platform',
    projectId: 'ecommerce-unified',
    badge: 'CASE STUDY 04 · UNIFIED REACT & CLOUD E-COMMERCE ECOSYSTEM',
    title: 'Full-Feature E-Commerce Ecosystem — Customer Storefront & Cloud Admin Panel',
    subtitle:
      'A unified two-application e-commerce platform combining a responsive React customer storefront with a real-time Firebase & Cloudinary Admin Panel for end-to-end catalog and inventory management.',
    readTime: '5 min engineering read',
    context: 'Unified Frontend & Cloud BaaS Architecture (Storefront + Admin Panel)',
    timeline: '2026',
    role: 'Frontend & Cloud Integration Developer',
    heroImages: {
      storefront: {
        url: 'https://res.cloudinary.com/djwqb3ibk/image/upload/v1786234113/portfolio/projects/1786234112450-830358886_sho89t.jpg',
        caption: 'Customer E-Commerce Storefront (Dynamic Catalog & Persistent Cart)',
      },
      admin: {
        url: 'https://res.cloudinary.com/djwqb3ibk/image/upload/v1783571017/portfolio/projects/AdminPanal_c7wn9n.png',
        caption: 'Cloud Admin Panel (Firebase Firestore CRUD & Cloudinary Media Pipeline)',
      },
    },
    links: {
      storefront: {
        label: 'Live Customer Storefront',
        url: 'https://a422789.github.io/e-commers/',
      },
      adminDashboard: {
        label: 'Live Cloud Admin Panel',
        url: 'https://a422789.github.io/AdminPanal/',
      },
      repo: {
        label: 'Storefront GitHub Repo',
        url: 'https://github.com/A422789/e-commers/',
      },
      secondaryRepo: {
        label: 'Admin Panel GitHub Repo',
        url: 'https://github.com/A422789/AdminPanal/',
      },
    },
    demoCredentials: null,
    techStack: {
      backend: ['Firebase Firestore (Real-Time NoSQL)', 'Firebase Authentication', 'Cloudinary Media API'],
      frontend: ['React', 'Tailwind CSS', 'Bootstrap', 'Protected Routes', 'Local Storage Persistence', 'Dark/Light Mode'],
      integrations: ['Cloudinary Direct Image Upload', 'Real-Time Firestore Listeners'],
      testingAndDevOps: ['GitHub Pages Deployment', 'Git Version Control'],
    },
    editorialLead:
      'Before building custom Node.js/Express backends, this unified e-commerce project explored cloud Backend-as-a-Service (BaaS) architecture by pairing two dedicated React applications: a customer-facing shopping storefront and a protected Cloud Admin Panel powered by Firebase Firestore and Cloudinary.',
    problemAndContext: {
      headline: '1. The Problem & Dual-Application Scope',
      narrative: [
        'An online retail workflow requires two distinct interfaces operating on shared catalog data: a fast, mobile-responsive storefront where shoppers can browse products and persist their shopping cart across browser sessions, and a secure administrative back-office where store managers can upload product imagery and perform real-time inventory CRUD operations.',
        'By uniting the Customer Storefront (`e-commers`) and the Admin Panel (`AdminPanal`) into one cohesive ecosystem, products created and uploaded via Cloudinary in the Admin Panel immediately synchronize with the catalog.',
      ],
    },
    dualSystemBreakdown: {
      headline: '2. Dual-Interface Breakdown (Customer Storefront + Admin Panel)',
      intro:
        'Both applications were built in React and tailored to their specific user personas:',
      surfaces: [
        {
          name: 'Surface A — Customer E-Commerce Storefront',
          url: 'https://a422789.github.io/e-commers/',
          image: 'https://res.cloudinary.com/djwqb3ibk/image/upload/v1786234113/portfolio/projects/1786234112450-830358886_sho89t.jpg',
          highlights: [
            'Dynamic product catalog with category filtering and responsive grid layouts.',
            'Guest shopping cart with automatic `localStorage` persistence across page reloads.',
            'User authentication flows connected with the shared backend store.',
          ],
        },
        {
          name: 'Surface B — E-Commerce Cloud Admin Panel',
          url: 'https://a422789.github.io/AdminPanal/',
          image: 'https://res.cloudinary.com/djwqb3ibk/image/upload/v1783571017/portfolio/projects/AdminPanal_c7wn9n.png',
          highlights: [
            'Complete product CRUD operations backed by real-time Firebase Firestore updates.',
            'Direct image upload integration with Cloudinary CDN for optimized product media.',
            'Protected administrative routes and persistent Dark/Light theme switching.',
          ],
        },
      ],
    },
    architectureTiers: [
      {
        tier: 'Dual React Client Applications',
        summary: 'Separate Storefront and Admin Panel SPAs optimized for shoppers and store operators respectively.',
      },
      {
        tier: 'Cloud NoSQL & Auth Tier (Firebase)',
        summary: 'Firestore real-time document collections and authentication state listeners.',
      },
      {
        tier: 'Media Delivery Tier (Cloudinary)',
        summary: 'Cloud image upload and CDN transformation pipeline for product photography.',
      },
    ],
    engineeringDecisions: [
      {
        title: 'Decoupling Storefront and Admin Panel into Separate React Builds',
        decision: 'Maintained separate repositories and deployments for the customer storefront and the administrative dashboard while connecting them to shared cloud data.',
        rationale: 'Keeps the customer bundle lightweight without shipping heavy admin CRUD forms to shoppers.',
        tradeOff: 'Requires coordinating schema structure across two repositories, which later inspired the unified monorepo approach used in HE Skincare.',
      },
      {
        title: 'Offloading Media Storage to Cloudinary CDN',
        decision: 'Uploaded product images directly to Cloudinary and stored only the optimized secure URL strings in Firestore documents.',
        rationale: 'Prevents bloating database documents with base64 binaries and enables fast CDN delivery.',
        tradeOff: 'Requires managing external upload presets and asynchronous upload states before form submission.',
      },
    ],
    testingAndVerification: {
      headline: '5. Verification & Key Workflows',
      intro:
        'Verified across both deployed applications on GitHub Pages:',
      layers: [
        {
          layer: 'Real-Time Catalog Synchronization',
          details: 'Verified product creation, image upload, editing, and deletion in the Admin Panel and catalog rendering on the Storefront.',
        },
        {
          layer: 'Client Persistence & Route Guards',
          details: 'Tested guest cart persistence in Local Storage, protected admin route redirection, and Dark/Light theme persistence.',
        },
      ],
    },
    productionPostMortem: {
      headline: '6. Outcome & Progression to Custom MERN Backends',
      incidentTitle: 'Transitioning from Firebase BaaS to Custom Node.js, Express & MongoDB Architectures',
      whatHappened:
        'Building this dual e-commerce system with Firebase and Cloudinary established strong fluency in React state, asynchronous data flows, and cloud media pipelines.',
      resolutionAndLesson:
        'Wanting full control over custom REST API design, complex Mongoose sub-document schemas, server-side RBAC middleware, and Dockerized cloud deployment led directly to architecting `HE Skincare` and the `Collaborative Project Management Tool` on Node.js, Express, and MongoDB.',
    },
  },

  {
    slug: 'giftlink',
    projectId: 'giftlink-ibm-capstone',
    badge: 'FULL-STACK CAPSTONE · IBM PROFESSIONAL CERTIFICATE',
    title: 'GiftLink — Full-Stack Community Gift Sharing & Search Platform',
    subtitle:
      'A cloud-native full-stack MERN application built for the IBM Full-Stack JavaScript Developer Capstone — featuring multi-criteria search pipelines, JWT authentication, sentiment analysis integration, and containerized deployment.',
    readTime: '4 min technical read',
    context: 'IBM Full-Stack Software Developer Capstone Project',
    timeline: '2026',
    role: 'Full-Stack Developer (Express API, MongoDB Queries, React Client, Auth & Containerization)',
    heroImages: {
      storefront: {
        url: '', // TODO: Paste GiftLink screenshot URL here when ready
        caption: 'GiftLink Catalog, Multi-Filter Search Engine & Item Details View',
      },
    },
    links: {
      storefront: {
        label: 'Live Deployment',
        url: '', // TODO: Paste GiftLink live URL if deployed
      },
      repo: {
        label: 'GitHub Repository',
        url: 'https://github.com/A422789', // TODO: Paste exact GiftLink repo URL (e.g., https://github.com/A422789/giftlink-project)
      },
    },
    demoCredentials: null,
    techStack: {
      backend: ['Node.js', 'Express.js', 'MongoDB', 'JWT Authentication', 'RESTful Search API', 'Natural / Sentiment Analysis'],
      frontend: ['React.js', 'React Router', 'Bootstrap / Responsive UI', 'Stateful Auth Context'],
      integrations: ['Sentiment Analysis Service', 'Multi-Parameter Query Engine'],
      testingAndDevOps: ['Docker', 'Kubernetes / OpenShift Lab', 'CI/CD Pipeline', 'Git & GitHub'],
    },
    editorialLead:
      'Developed as the culminating engineering project for the IBM Full-Stack JavaScript Developer Professional Certificate, GiftLink connects users who want to give away household items with community members searching for them — combining Express REST services, dynamic MongoDB query builders, JWT authentication, and containerized cloud deployment.',
    problemAndContext: {
      headline: '1. Project Scope & Technical Objective',
      narrative: [
        'GiftLink was designed to demonstrate end-to-end cloud-native full-stack development across the entire software lifecycle: designing NoSQL collections in MongoDB, exposing modular Express.js routes for catalog listings and dynamic search filtering, securing user registration and profile updates with JWT authentication, and packaging the application inside Docker containers.',
      ],
    },
    dualSystemBreakdown: null,
    architectureTiers: [
      {
        tier: 'React SPA Frontend',
        summary: 'Component-driven catalog listing, dynamic search filter interface, authentication views, and item detail pages.',
      },
      {
        tier: 'Express.js REST & Search Controller Tier',
        summary: 'Dedicated `/api/gifts` and `/api/search` endpoints supporting category, condition, age-in-years, and keyword query parameters.',
      },
      {
        tier: 'MongoDB Document Store',
        summary: 'Collections storing user profiles, gift listings, item metadata, and community comments.',
      },
      {
        tier: 'Container & Cloud Orchestration Tier',
        summary: 'Dockerized frontend and backend services configured for cloud deployment and CI/CD automation.',
      },
    ],
    engineeringDecisions: [
      {
        title: 'Dynamic Multi-Criteria MongoDB Search Pipeline',
        decision: 'Constructed a flexible server-side query builder in Express that dynamically composes MongoDB filter predicates (`category`, `condition`, `age_years`, and regex `name` matching) based on optional query parameters.',
        rationale: 'Allows users to combine any subset of filters without creating combinatorial endpoint routes or filtering large datasets inefficiently in the browser.',
        tradeOff: 'Requires careful input sanitization on regex and numeric parameters before executing the database query.',
      },
      {
        title: 'Stateless JWT Authentication for Protected User Actions',
        decision: 'Secured item posting, profile updates, and comment flows using signed JWT bearer tokens and Express auth middleware.',
        rationale: 'Keeps the API stateless so backend container instances can scale horizontally without sticky session affinity.',
        tradeOff: 'Requires structured token validation middleware across protected mutation routes.',
      },
    ],
    testingAndVerification: {
      headline: '4. Verification & Cloud Deployment',
      intro:
        'Verified across API routes, search filtering accuracy, authentication flows, and container builds:',
      layers: [
        {
          layer: 'REST API & Query Filter Verification',
          details: 'Verified gift listing retrieval, single-item lookup, and multi-parameter search queries against MongoDB.',
        },
        {
          layer: 'Containerized Build & Deployment',
          details: 'Packaged services with Dockerfiles and validated environment variable injection across container boundaries.',
        },
      ],
    },
    productionPostMortem: null,
  },

  {
    slug: 'kubernetes-deployment',
    projectId: 'kubernetes-deployment',
    badge: 'CLOUD & DEVOPS · CONTAINERS & ORCHESTRATION',
    title: 'Cloud-Native Containerization & Kubernetes Orchestration Project',
    subtitle:
      'Packaging, deploying, and scaling containerized Node.js web services using Docker, Kubernetes YAML manifests, Pods, Deployments, Services, and OpenShift cloud workflows.',
    readTime: '4 min technical read',
    context: 'Cloud-Native & Container Orchestration Engineering',
    timeline: '2026',
    role: 'Backend & Cloud Infrastructure Developer',
    heroImages: {
      storefront: {
        url: '', // TODO: Paste Kubernetes project screenshot or architecture diagram URL here when ready
        caption: 'Docker Container Pipeline & Kubernetes Cluster Deployment Topology',
      },
    },
    links: {
      repo: {
        label: 'GitHub Repository',
        url: 'https://github.com/A422789', // TODO: Paste exact KubernetesProject repo URL
      },
    },
    demoCredentials: null,
    techStack: {
      backend: ['Node.js', 'Express.js Microservice Endpoints', 'Health & Readiness Probes'],
      frontend: ['Containerized Web Interface'],
      integrations: ['Container Registry (Docker Hub / IBM Cloud Container Registry)'],
      testingAndDevOps: ['Docker', 'Kubernetes (K8s)', 'OpenShift', 'YAML Manifests', 'kubectl CLI'],
    },
    editorialLead:
      'Writing a working Node.js API on `localhost` is only half of backend engineering; delivering it reliably in production requires understanding container isolation, image layering, declarative Kubernetes manifests, and service discovery. This project focuses on containerizing web workloads and orchestrating them on Kubernetes.',
    problemAndContext: {
      headline: '1. Engineering Objective',
      narrative: [
        'Traditional manual server deployments suffer from environment drift ("works on my machine") and manual scaling bottlenecks. This project demonstrates how to package a Node.js application into an immutable Docker image, push it to a container registry, and deploy it onto a Kubernetes cluster using declarative `Deployment` and `Service` specifications.',
      ],
    },
    dualSystemBreakdown: null,
    architectureTiers: [
      {
        tier: 'Docker Container Image Layer',
        summary: 'Multi-step Dockerfile defining the Node.js runtime, dependency installation, port exposure, and non-root execution.',
      },
      {
        tier: 'Kubernetes Deployment Controller',
        summary: 'Declarative YAML manifests managing replica counts, rolling updates, and pod self-healing.',
      },
      {
        tier: 'Kubernetes Service & Networking Layer',
        summary: 'ClusterIP / NodePort / LoadBalancer service abstractions routing external traffic across healthy pod replicas.',
      },
    ],
    engineeringDecisions: [
      {
        title: 'Declarative YAML Manifests over Imperative CLI Commands',
        decision: 'Defined cluster state (`deployment.yaml`, `service.yaml`) as version-controlled declarative manifests rather than ad-hoc `kubectl run` commands.',
        rationale: 'Enables reproducible infrastructure-as-code (IaC), peer review of replica/resource limits, and deterministic rollbacks.',
        tradeOff: 'Requires upfront schema discipline when authoring Kubernetes resource specifications.',
      },
      {
        title: 'Stateless Container Design for Horizontal Pod Scaling',
        decision: 'Externalized configuration via environment variables and kept container filesystems ephemeral so multiple replicas can run concurrently.',
        rationale: 'Allows Kubernetes to terminate, reschedule, or scale pods horizontally without data loss.',
        tradeOff: 'Any persistent state must be delegated to external managed databases or persistent volume claims (PVCs).',
      },
    ],
    testingAndVerification: {
      headline: '4. Cluster Verification',
      intro:
        'Verified container builds, pod scheduling, and service routing using `docker` and `kubectl`:',
      layers: [
        {
          layer: 'Container Image Build & Local Smoke Test',
          details: 'Built and tagged Docker images locally and verified container port binding and environment configuration.',
        },
        {
          layer: 'Pod Replica & Service Routing Check',
          details: 'Verified pod rollout status, replica scaling, and external HTTP reachability through Kubernetes Services.',
        },
      ],
    },
    productionPostMortem: null,
  },

  {
    slug: 'enterprise-dashboard',
    projectId: 'enterprise-dashboard',
    badge: 'FRONTEND ARCHITECTURE · DATA VISUALIZATION & STATE',
    title: 'Enterprise Admin Dashboard — Analytics, Data Grids & Workflow Suite',
    subtitle:
      'A high-density executive analytics dashboard built with React, Material UI (MUI), Nivo Charts, and React Context API — featuring interactive data grids, Kanban task boards, calendar scheduling, and global theme orchestration.',
    readTime: '4 min technical read',
    context: 'Frontend Systems & Data Visualization Architecture',
    timeline: '2026',
    role: 'Frontend Developer (Component Architecture, Data Visualization & Global State)',
    heroImages: {
      storefront: {
        url: 'https://res.cloudinary.com/djwqb3ibk/image/upload/v1786234149/portfolio/projects/1786234148050-504130514_oxz1ij.jpg',
        caption: 'Enterprise Analytics Overview, Nivo Charts & MUI Data Grids',
      },
    },
    links: {
      storefront: {
        label: 'Live Interactive Dashboard',
        url: 'https://a422789.github.io/Advance_DashBoard/',
      },
      repo: {
        label: 'GitHub Repository',
        url: 'https://github.com/A422789/Advance_DashBoard',
      },
    },
    demoCredentials: null,
    techStack: {
      backend: ['Client-Side Structured Mock Datasets & State Engines'],
      frontend: ['React.js', 'Material UI (MUI)', 'Nivo Charts (Bar, Line, Pie, Choropleth)', 'React Context API', 'FullCalendar / Kanban Views'],
      integrations: ['MUI DataGrid Filtering & Export', 'Dynamic Color Token System'],
      testingAndDevOps: ['GitHub Pages Deployment', 'Git & GitHub'],
    },
    editorialLead:
      'Enterprise SaaS applications demand far more than marketing landing pages — they require complex data tables with multi-column filtering, responsive SVG chart visualizations, interactive scheduling calendars, and a design token system that adapts seamlessly between dark and light modes.',
    problemAndContext: {
      headline: '1. Technical Scope & UI Engineering Challenge',
      narrative: [
        'When presenting dense operational metrics (financials, team permissions, geography, invoices, and project schedules), poorly structured React components quickly become unmaintainable and sluggish.',
        'This project focused on architecting a modular multi-screen admin interface using Material UI (MUI) and Nivo D3-powered charts, coordinated by a centralized React Context theme and layout provider.',
      ],
    },
    dualSystemBreakdown: null,
    architectureTiers: [
      {
        tier: 'Design Token & Theme Context Layer',
        summary: 'Centralized color palette generator and React Context provider synchronizing Dark/Light mode tokens across both MUI components and Nivo SVG charts.',
      },
      {
        tier: 'Data Grid & Operational Modules',
        summary: 'MUI DataGrid views for team access roles, contacts, and invoice balances with custom cell renderers, sorting, and toolbar filtering.',
      },
      {
        tier: 'D3 / Nivo Visualization Engine',
        summary: 'Reusable chart wrappers (Line, Bar, Pie, and Geography Choropleth maps) responsive to container resizing and theme switches.',
      },
    ],
    engineeringDecisions: [
      {
        title: 'Unified Color Token System Across MUI and Nivo SVG Charts',
        decision: 'Created a single source-of-truth theme token map consumed simultaneously by MUI’s `createTheme` and Nivo’s custom chart `theme` prop.',
        rationale: 'Third-party charting libraries do not automatically inherit MUI CSS variables; sharing a unified token map prevents visual jarring when toggling Dark/Light mode.',
        tradeOff: 'Required writing custom theme-bridge objects for Nivo axes, legends, and tooltips.',
      },
      {
        title: 'Reusable Chart & Header Primitives',
        decision: 'Abstracted chart containers (`BarChart`, `LineChart`, `PieChart`, `GeographyChart`) so they render both as full-screen dedicated routes and as compact widgets on the main Executive Summary screen.',
        rationale: 'Eliminated code duplication between the main dashboard overview and the individual analytics pages via a clean `isDashboard` prop.',
        tradeOff: 'Slightly more conditional configuration inside each chart component for axis density and legend placement.',
      },
    ],
    testingAndVerification: {
      headline: '4. UI Verification & Responsiveness',
      intro:
        'Verified across all analytics routes, data grid operations, and theme transitions:',
      layers: [
        {
          layer: 'DataGrid Filtering, Sorting & Pagination',
          details: 'Validated multi-column filtering, custom role badges, and pagination across large tabular datasets.',
        },
        {
          layer: 'Interactive Calendar & Kanban Workflows',
          details: 'Tested event creation/deletion on the calendar view and interactive card movement on the Kanban board.',
        },
      ],
    },
    productionPostMortem: null,
  },

  {
    slug: 'chat-boot',
    projectId: 'chat-boot',
    badge: 'FRONTEND & AI INTEGRATION · REAL-TIME STREAMING UI',
    title: 'Chat-Boot — Conversational AI Interface Powered by Google Gemini',
    subtitle:
      'A responsive conversational AI web application built with React, Tailwind CSS, and the Google Gemini Pro API — featuring real-time prompt dispatch, asynchronous response handling, conversation history, and resilient error recovery.',
    readTime: '4 min technical read',
    context: 'Asynchronous API Integration & Modern React UI',
    timeline: '2026',
    role: 'Frontend Developer (API Integration, Asynchronous State & Conversational UX)',
    heroImages: {
      storefront: {
        url: 'https://res.cloudinary.com/djwqb3ibk/image/upload/v1783571014/portfolio/projects/ChatGBT_ofalu1.jpg',
        caption: 'Chat-Boot Conversational Workspace & Gemini AI Prompt Engine',
      },
    },
    links: {
      storefront: {
        label: 'Live AI Application',
        url: 'https://a422789.github.io/chat-boot/',
      },
      repo: {
        label: 'GitHub Repository',
        url: 'https://github.com/A422789/chat-boot',
      },
    },
    demoCredentials: null,
    techStack: {
      backend: ['Google Gemini Pro Generative AI SDK / REST API'],
      frontend: ['React.js', 'Tailwind CSS', 'Asynchronous State Management', 'Markdown / Code Formatting'],
      integrations: ['Google Generative AI API', 'Auto-Scrolling Message Viewport'],
      testingAndDevOps: ['GitHub Pages Deployment', 'Environment Variable Configuration'],
    },
    editorialLead:
      'Conversational AI interfaces require careful handling of asynchronous network latency, progressive text rendering, multi-turn prompt history, and graceful fallback states when API rate limits or network interruptions occur.',
    problemAndContext: {
      headline: '1. Engineering Focus',
      narrative: [
        'The goal of Chat-Boot was to build a clean, distraction-free conversational interface modeled after modern AI assistants while integrating directly with Google’s Gemini Pro API to handle real user prompts, code generation requests, and multi-message threads.',
      ],
    },
    dualSystemBreakdown: null,
    architectureTiers: [
      {
        tier: 'Conversational Viewport & Input Controller',
        summary: 'React message list with automatic scroll-anchoring, loading skeletons, and keyboard-accessible prompt submission.',
      },
      {
        tier: 'Gemini API Service Layer',
        summary: 'Encapsulated async service module managing API key injection, request payload formatting, and error boundary parsing.',
      },
    ],
    engineeringDecisions: [
      {
        title: 'Decoupled AI Service Module from React View Components',
        decision: 'Isolated all Google Gemini SDK/API calls inside a dedicated service module rather than calling `fetch` directly inside UI components.',
        rationale: 'Keeps React components focused on rendering message state, loading indicators, and user input while allowing the AI model or endpoint version to be updated in a single file.',
        tradeOff: 'Adds a thin abstraction layer that pays off in cleaner error handling and maintainability.',
      },
      {
        title: 'Non-Blocking Loading States & Error Recovery',
        decision: 'Implemented explicit `isLoading` submission locks, animated typing indicators, and user-readable error messages when network or quota limits occur.',
        rationale: 'Prevents duplicate rapid-fire prompt submissions and ensures the UI never freezes on failed network promises.',
        tradeOff: 'Requires tracking request lifecycle state per message turn.',
      },
    ],
    testingAndVerification: {
      headline: '4. Verification',
      intro:
        'Tested across desktop and mobile viewports with diverse prompt payloads:',
      layers: [
        {
          layer: 'Async Prompt Lifecycle & Scroll Anchoring',
          details: 'Verified multi-turn conversation rendering, long response scrolling, and responsive sidebar/header collapse on mobile screens.',
        },
      ],
    },
    productionPostMortem: null,
  },

  {
    slug: 'cpp-hospital-system',
    projectId: 'cpp-hospital-dsa',
    badge: 'ACADEMIC CS FOUNDATIONS · DATA STRUCTURES & ALGORITHMS',
    title: 'Hospital Management System — C++ Data Structures & Algorithmic Engine',
    subtitle:
      'Applying core computer science fundamentals in C++ to engineer a hospital operations system using custom Linked Lists, Priority Queues for emergency triage, and algorithmic search/sorting structures.',
    readTime: '4 min technical read',
    context: 'Riphah International University · BS Software Engineering (Data Structures & Algorithms)',
    timeline: 'BSSE Coursework Project',
    role: 'Software Engineering Student & Lead Developer',
    heroImages: {
      storefront: {
        url: '', // TODO: Paste C++ Hospital Management screenshot URL here if desired
        caption: 'C++ Data Structures Architecture: Patient Linked Lists & Emergency Triage Queues',
      },
    },
    links: {
      repo: {
        label: 'GitHub Repository',
        url: 'https://github.com/A422789', // TODO: Paste exact C++ Hospital Management repo URL
      },
    },
    demoCredentials: null,
    techStack: {
      backend: ['C++ (STL & Custom Pointers)', 'Singly / Doubly Linked Lists', 'Priority Queues & FIFO Queues', 'Binary Search / Sorting Algorithms', 'File Stream I/O'],
      frontend: ['Structured CLI / Menu-Driven Interface'],
      integrations: ['Local File Persistence'],
      testingAndDevOps: ['GCC / C++ Compiler', 'Memory & Pointer Safety Verification', 'Git & GitHub'],
    },
    editorialLead:
      'Strong backend engineering is rooted in understanding how data is laid out in memory, how pointer-based structures behave under insertion and deletion, and why choosing the right data structure transforms algorithmic time complexity. This university project applies core Data Structures and Algorithms (DSA) in C++ to model a real-world hospital workflow.',
    problemAndContext: {
      headline: '1. Algorithmic Problem & Domain Model',
      narrative: [
        'A hospital manages two fundamentally different patient flows: standard outpatient appointments (First-In, First-Out) and critical emergency triage where higher-severity patients must be treated before lower-severity arrivals regardless of arrival order, alongside dynamic patient medical records and doctor schedules.',
        'Rather than relying on an external database engine, this system implements the underlying data structures directly in C++ to optimize insertion, deletion, triage ordering, and record lookup.',
      ],
    },
    dualSystemBreakdown: null,
    architectureTiers: [
      {
        tier: 'Dynamic Patient Registry (Linked Lists)',
        summary: 'Pointer-based node structures enabling O(1) head/tail insertions and dynamic memory allocation without fixed array size limits.',
      },
      {
        tier: 'Emergency Triage & Outpatient Scheduling (Priority & FIFO Queues)',
        summary: 'Severity-based priority queue ordering critical patients first, paired with standard FIFO queues for routine consultations.',
      },
      {
        tier: 'Search, Sorting & File Persistence Layer',
        summary: 'Algorithmic lookup by Patient ID / Name and structured file I/O serialization so records persist across program executions.',
      },
    ],
    engineeringDecisions: [
      {
        title: 'Priority Queue for Emergency Triage vs. Standard FIFO Queue',
        decision: 'Separated emergency admissions into a Priority Queue keyed by medical severity level while keeping routine check-ups in a standard FIFO queue.',
        rationale: 'In a clinical domain, serving emergency arrivals strictly by arrival timestamp is unsafe; a priority queue ensures critical cases are dequeued first.',
        tradeOff: 'Requires maintaining priority ordering upon enqueueing rather than simple tail pointer attachment.',
      },
      {
        title: 'Dynamic Linked List Storage vs. Static Arrays',
        decision: 'Implemented dynamic node allocation using pointers instead of fixed-capacity static arrays.',
        rationale: 'Prevents arbitrary capacity overflow and avoids costly array reallocation when admitting new patients or discharging existing ones.',
        tradeOff: 'Requires explicit destructor and `delete` memory management in C++ to prevent memory leaks.',
      },
    ],
    testingAndVerification: {
      headline: '4. Algorithmic & Edge-Case Verification',
      intro:
        'Tested across boundary conditions and memory lifecycle operations:',
      layers: [
        {
          layer: 'Boundary & Pointer Integrity Tests',
          details: 'Verified operations on empty lists/queues, single-node removal, head/tail deletion, and duplicate patient ID rejection.',
        },
      ],
    },
    productionPostMortem: null,
  },

  {
    slug: 'java-oop-system',
    projectId: 'java-oop-system',
    badge: 'ACADEMIC CS FOUNDATIONS · OBJECT-ORIENTED ARCHITECTURE',
    title: 'Object-Oriented Software System — Java OOP & Modular Domain Modeling',
    subtitle:
      'Designing a clean, extensible Java application applying the four pillars of Object-Oriented Programming — Encapsulation, Inheritance, Polymorphism, and Abstraction — alongside structured exception handling.',
    readTime: '4 min technical read',
    context: 'Riphah International University · BS Software Engineering (Object-Oriented Programming)',
    timeline: 'BSSE Coursework Project',
    role: 'Software Engineering Student & Lead Developer',
    heroImages: {
      storefront: {
        url: '', // TODO: Paste Java OOP screenshot or UML diagram URL here if desired
        caption: 'Java Class Hierarchy, Polymorphic Interfaces & Encapsulated Domain Model',
      },
    },
    links: {
      repo: {
        label: 'GitHub Repository',
        url: 'https://github.com/A422789', // TODO: Paste exact Java OOP repo URL
      },
    },
    demoCredentials: null,
    techStack: {
      backend: ['Java (JDK)', 'Object-Oriented Programming (OOP)', 'Abstract Classes & Interfaces', 'Polymorphism & Inheritance', 'Custom Exception Handling', 'Java Collections Framework'],
      frontend: ['Interactive Java Console / GUI Interface'],
      integrations: ['File Persistence / Serialization'],
      testingAndDevOps: ['Java Compiler (javac)', 'Modular Package Architecture', 'Git & GitHub'],
    },
    editorialLead:
      'Before designing scalable Node.js services or Mongoose schemas, mastering Object-Oriented Programming (OOP) in a strictly typed language like Java builds the mental model for clean domain boundaries, interface contracts, and maintainable software architecture.',
    problemAndContext: {
      headline: '1. Software Design Objective',
      narrative: [
        'Procedural codebases quickly degrade into tangled conditional logic (`if/else` chains) when new entity types or business rules are introduced. This university project was designed to model a multi-role domain in Java where shared state is encapsulated, common contracts are defined via interfaces and abstract base classes, and specialized behaviors are executed through runtime polymorphism.',
      ],
    },
    dualSystemBreakdown: null,
    architectureTiers: [
      {
        tier: 'Abstract Base Classes & Interface Contracts',
        summary: 'Defines core domain abstractions and behavioral contracts enforced across all concrete subclasses.',
      },
      {
        tier: 'Encapsulated Entity & Service Layer',
        summary: 'Private state fields protected by validated getters/setters and business-rule methods using the Java Collections Framework.',
      },
      {
        tier: 'Exception Handling & Persistence Layer',
        summary: 'Structured `try-catch-finally` blocks and custom exceptions preventing invalid state transitions or malformed inputs.',
      },
    ],
    engineeringDecisions: [
      {
        title: 'Polymorphic Dispatch over Procedural Type-Checking',
        decision: 'Used abstract methods and interface implementations across subclasses instead of checking entity types with `instanceof` or `switch` blocks.',
        rationale: 'Follows the Open/Closed Principle — new entity roles or operations can be added by extending the base class without modifying existing controller logic.',
        tradeOff: 'Requires thoughtful upfront class hierarchy design before writing implementation code.',
      },
      {
        title: 'Strict State Encapsulation & Input Validation',
        decision: 'Marked all entity attributes `private` and enforced domain invariants inside constructors and mutator methods.',
        rationale: 'Guarantees that domain objects can never enter an invalid state from external caller manipulation.',
        tradeOff: 'Slightly more accessor boilerplate in exchange for compile-time and runtime safety.',
      },
    ],
    testingAndVerification: {
      headline: '4. Verification',
      intro:
        'Validated class contracts, polymorphic behavior, and invalid input handling:',
      layers: [
        {
          layer: 'Domain Invariant & Exception Testing',
          details: 'Verified that invalid inputs trigger clean, recoverable error messages and that polymorphic collections process all subclass types accurately.',
        },
      ],
    },
    productionPostMortem: null,
  },
];

export const getCaseStudyBySlug = (slug) =>
  caseStudiesData.find((item) => item.slug === slug) || null;



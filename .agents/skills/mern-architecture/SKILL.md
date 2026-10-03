---
name: mern-architecture
description: >-
  Use this skill when designing, building, or refactoring full-stack features using MongoDB,
  Express.js, React, and Node.js. Provides architectural patterns, folder conventions,
  API standards, data flow, and error handling practices for scalable MERN applications.
---

# MERN Architecture & Engineering Standards

This skill provides architectural guidance for building and maintaining robust, scalable, and maintainable MERN applications.

---

## 1. Backend Architecture (Node.js & Express)

### Layered Separation of Concerns
Adopt a clean 3-tier structure to prevent bloated controllers:

1. **Routes (`/routes`)**: Define endpoints, attach middleware (auth, rate limiting, validation), and route to controllers. No business logic in routes.
2. **Controllers (`/controllers`)**: Handle HTTP requests and responses. Extract params/body, validate input, call services, and format standardized responses.
3. **Services / Business Logic (`/services` or utils)**: Pure business operations, external integrations (Cloudinary, Nodemailer, etc.), and complex DB transactions.
4. **Models (`/models`)**: Mongoose schemas, validation rules, indexes, pre/post hooks, and virtuals.

### Standardized API Response Format
Always send consistent JSON envelopes:

```javascript
// Success response
res.status(200).json({
  success: true,
  data: result,
  message: "Operation completed successfully"
});

// Error response
res.status(statusCode || 500).json({
  success: false,
  message: error.message || "Internal server error",
  errors: error.errors || null
});
```

### Async Error Handling
Never leave unhandled promise rejections. Use an async handler wrapper:

```javascript
const asyncHandler = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};
```

---

## 2. Database Standards (MongoDB & Mongoose)

### Schema Design & Indexing
- Always define explicit field types, `required`, `trim`, and reasonable `maxlength`.
- Add compound or single indexes on frequently queried/sorted fields (e.g. `createdAt: -1`, `featured: 1`).
- Set `{ timestamps: true }` on schemas requiring audit trails.

### Query Efficiency
- Use `.lean()` for read-only queries (skips Mongoose document hydration, 3-5x faster).
- Use `.select()` to exclude unnecessary heavy fields (e.g., `.select('-password')` or omitting long descriptions in list views).
- Implement pagination using `.skip()` and `.limit()` or cursor-based pagination for large datasets.

---

## 3. Frontend Architecture (React)

### Component Hierarchy & Co-location
- **Components (`/Components` or `/components`)**: Reusable UI units (Buttons, Modals, Cards, Navbars). Keep them pure and decoupled from API logic.
- **Pages / Views (`/pages`)**: Route-level components that compose UI components, fetch page-level data, or consume context.
- **Context / State (`/context`)**: Share global state (Auth, Theme, Profile data) to avoid prop drilling. Avoid putting frequently updating local state into global context.
- **Hooks (`/hooks`)**: Extract reusable stateful logic (e.g., `useFetch`, `useDebounce`, `useMediaQuery`).
- **Services / API (`/services` or `/api`)**: Centralized Axios or fetch instances with base URLs and interceptors.

### Data Fetching Patterns
- Prevent duplicate API requests across child components using Context or caching layers.
- Always provide clear loading, error, and empty states.
- Clean up asynchronous subscriptions or abort controllers in `useEffect` cleanup functions.

---

## 4. Checklist for New Features
- [ ] Backend route defined with authentication and input validation.
- [ ] Controller handles happy path and edge cases with standardized response format.
- [ ] Database schema includes appropriate indexes and `.lean()` is used on read queries.
- [ ] Frontend API call centralized with proper error/loading handling.
- [ ] Responsive UI verified on mobile, tablet, and desktop viewports.

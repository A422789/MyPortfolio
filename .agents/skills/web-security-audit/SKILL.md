---
name: web-security-audit
description: >-
  Use this skill when auditing backend or frontend security, configuring authentication,
  protecting against OWASP Top 10 vulnerabilities, configuring CORS policies, handling secrets,
  and enforcing rate limiting and input sanitization in MERN applications.
---

# Web Security & Audit Guide for MERN Stack

This skill provides comprehensive security guidelines, checklists, and hardening rules for MERN applications.

---

## 1. Top Security Vectors in MERN

### 1. Strict CORS Whitelisting
- Never use wildcard `origin: '*'` with `credentials: true`.
- Never use boolean short-circuiting like `(URL1 || URL2)` in origins—always construct an array or validator function.
- Whitelist only exact production domains, specific preview domains, and local development ports:

```javascript
const allowedOrigins = [
  process.env.CLIENT_URL,
  process.env.ADMIN_URL,
  'http://localhost:5173'
].filter(Boolean);

app.use(cors({
  origin: (origin, cb) => {
    if (!origin) return cb(null, true);
    const clean = origin.trim().replace(/\/$/, '');
    if (allowedOrigins.includes(clean)) return cb(null, true);
    return cb(new Error(`Blocked by CORS: ${origin}`));
  },
  credentials: true
}));
```

### 2. NoSQL Injection Prevention
- Use `express-mongo-sanitize` to strip out dollar signs (`$`) and dots (`.`) from `req.body`, `req.query`, and `req.params`.
- Avoid passing raw user input directly into MongoDB query operators (e.g. `{ username: req.body.username, password: req.body.password }` without schema validation).

### 3. Helmet & HTTP Security Headers
Always include `helmet()` early in the Express middleware chain to set:
- `Content-Security-Policy`
- `X-Frame-Options: DENY` or `SAMEORIGIN` (prevents Clickjacking)
- `X-Content-Type-Options: nosniff`
- `Strict-Transport-Security` (HSTS for HTTPS enforcement)

### 4. Rate Limiting & DoS Protection
Protect all public endpoints, especially authentication and contact forms:

```javascript
const rateLimit = require('express-rate-limit');

const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 10, // Limit each IP to 10 login attempts per window
  message: { success: false, message: 'Too many login attempts. Please try again later.' }
});
```

### 5. Authentication & JWT Best Practices
- **Password Hashing**: Always use `bcrypt` or `bcryptjs` with salt rounds >= 10.
- **JWT Secrets**: Must be long, cryptographically random strings (at least 256 bits).
- **Expiration**: Never issue non-expiring tokens. Set `expiresIn: '1d'` or shorter.
- **Never Log Secrets**: Sanitize loggers (winston/morgan) so passwords, tokens, and authorization headers are never written to disk or console.

---

## 2. Security Audit Checklist
- [ ] No hardcoded secrets or passwords committed to git (`.env` in `.gitignore`).
- [ ] Strict CORS origin validator configured and tested.
- [ ] `express-mongo-sanitize` active on all API routes.
- [ ] `helmet` configured with sensible security headers.
- [ ] Rate limiters applied to public APIs and authentication routes.
- [ ] Passwords stored using bcrypt with at least 10 salt rounds.
- [ ] JWT tokens have expiration and are validated via auth middleware.
- [ ] Admin endpoints verify both authentication (token) and authorization (role).

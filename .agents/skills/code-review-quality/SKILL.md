---
name: code-review-quality
description: >-
  Use this skill when reviewing code, refactoring existing logic, eliminating dead code,
  or preventing AI slop. Enforces clean code principles, DRY without over-abstraction,
  meaningful naming conventions, defensive programming, and readable software architecture.
---

# Code Review & Quality Standards (Anti-Slop Guide)

This skill provides a rigorous review methodology to ensure codebases remain clean, readable, maintainable, and free of AI-generated bloat or low-quality patterns.

---

## 1. What is "AI Slop" & How to Avoid It

| Slop Anti-Pattern | Solution / Best Practice |
| :--- | :--- |
| **Over-engineered abstractions** (creating 5 layers of wrappers for a 10-line operation) | Keep it simple. Prefer direct, readable code over speculative generality. |
| **Hallucinated or bloated utility libraries** | Use standard JavaScript/Node.js built-ins where possible before reaching for external dependencies. |
| **Duplicate state & props drilling** | Normalize state and lift to Context or custom hooks only when genuinely shared. |
| **Comment pollution** (e.g. `// increment i by 1`) | Code should be self-documenting through clear function and variable names. Comment *why*, not *what*. |
| **Ghost code & unused imports** | Regularly run linters and eliminate unused variables, unreferenced files, and commented-out dead code. |

---

## 2. Core Clean Code Rules

### 1. Meaningful Naming
- **Functions**: Use verb-noun pairings that describe the action (`fetchUserProfile`, `validateProjectInput`, `formatDateToISO`).
- **Booleans**: Prefix with `is`, `has`, `should`, or `can` (`isLoading`, `hasPermission`, `isAuthenticated`).
- **Constants**: Use SCREAMING_SNAKE_CASE for truly immutable configuration values (`JWT_EXPIRES_IN`, `MAX_RETRY_COUNT`).

### 2. Single Responsibility Principle (SRP)
- Every function should do one thing well. If a function is longer than ~40 lines or does both validation, DB updates, email notifications, and file uploads, break it into smaller helper functions.

### 3. Defensive Programming & Validation
- Validate at the boundary: Always validate incoming request payloads before passing them to internal services.
- Never trust client input: Sanitize strings, check array bounds, and verify expected data types.
- Handle null / undefined gracefully with optional chaining (`?.`) and nullish coalescing (`??`), not risky multi-level logical ORs.

### 4. Avoid Hardcoding Secrets
- Never commit API keys, connection strings, or passwords.
- Use `process.env` backed by `.env.example` templates.

---

## 3. Code Review Checklist (Pre-Merge / Pre-Promotion)

Before promoting any feature from `test-folder` to the main repository:

- [ ] **Readability**: Can another engineer understand this code in 30 seconds without explanation?
- [ ] **Error Handling**: Are asynchronous calls wrapped in try/catch or async handlers with descriptive error messages?
- [ ] **No Dead Code**: Are all imports used? Are console.logs or debugging comments cleaned up?
- [ ] **Type & Null Safety**: Are edge cases (null data, empty arrays, API downtime) handled gracefully in the UI?
- [ ] **Consistency**: Does the new code match the existing project's formatting, naming conventions, and file structure?

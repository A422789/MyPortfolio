---
name: git-workflow-promotion
description: >-
  Use this skill when managing git version control, preparing conventional commits,
  staging verified code changes, and executing the promotion workflow from the sandbox
  (`test-folder`) to the production repository (`MyPortfolio`).
---

# Git Workflow & Feature Promotion Guide

This skill governs the safe development, staging, promotion, and version control procedures for the project.

---

## 1. Sandbox-to-Production Promotion Lifecycle

```
[test-folder]                [Verification Gate]              [MyPortfolio]
1. Develop Feature    ───>   2. Test & Validate UI   ───>     4. Copy Verified Files
                             3. User Review/Approval           5. Git Commit & Push
                                                               6. Auto-Deploy (CI/CD)
```

### Step 1: Develop in Sandbox (`test-folder`)
- All experiments, feature coding, dependencies, and refactoring occur exclusively in `test-folder`.
- Run tests and local dev servers inside `test-folder` to verify runtime behavior.

### Step 2: Verification Gate
Before proposing promotion to `MyPortfolio`:
- Verify no console errors or broken imports.
- Confirm production build succeeds: `npm run build`.
- Review the specific files changed using `git diff`.
- Present the changes clearly to the user for explicit approval.

### Step 3: Atomic Promotion to `MyPortfolio`
Once approved:
1. Target only the specific files/directories corresponding to the feature.
2. Copy them accurately into `MyPortfolio`.
3. Verify `git status` inside `MyPortfolio` to confirm only expected files were touched.
4. Run `git diff` to ensure no unintended overwrites or regressions.

---

## 2. Conventional Commit Standards

Every commit in `MyPortfolio` must follow the Conventional Commits specification:

```
<type>(<scope>): <short description in present tense>

[optional body explaining WHY the change was made]
```

### Standard Types:
- **`feat`**: A new feature for the user (e.g., `feat(portfolio): add interactive project filter by technology`).
- **`fix`**: A bug fix for the user (e.g., `fix(backend): restrict CORS to explicit whitelist`).
- **`perf`**: A code change that improves performance (e.g., `perf(frontend): lazy load PDF preview chunk`).
- **`refactor`**: A code change that neither fixes a bug nor adds a feature (e.g., `refactor(context): centralize profile state`).
- **`style`**: Changes that do not affect code logic (white-space, formatting, semicolons).
- **`chore`**: Maintenance tasks, dependency bumps, or config updates (e.g., `chore: update build scripts`).

### Commit Rules:
- Keep the first line under 72 characters.
- Use imperative mood: "add", "fix", "refactor" (not "added", "fixing").
- Never bundle unrelated changes into a single commit.

---

## 3. Deployment Safety Checklist
- [ ] Working directory is clean before switching branches or pulling.
- [ ] Secrets and `.env` files are ignored and never staged.
- [ ] Commit message clearly documents the feature scope.
- [ ] Push executed to `origin main` (or designated feature branch).
- [ ] Deployment logs checked on hosting platform (Railway / Vercel).

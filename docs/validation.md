# Validation & Test Records: AWS Portfolio Delivery

## Overview
This document records local and continuous integration validation commands, test results, and remote deployment evidence for the `aws-devops` portfolio delivery platform.

---

## 1. Local Pipeline Validation Suite

All checks are executed in a deterministic local environment matching the GitHub Actions runner runtime (Node.js 22).

| Check Stage | Command | Target Scope | Result | Status |
| :--- | :--- | :--- | :--- | :--- |
| **Static Type Analysis** | `npm run typecheck` | `tsc --noEmit` across all `.ts` and `.tsx` sources | 0 errors | **PASSED** |
| **Deterministic Infra Gate** | `npm run gate` | Infrastructure gate (B1–B11 checks): configuration schemas, meta tags, and data invariants | 0 failures | **PASSED** |
| **Production Bundle** | `npm run build` | Vite 6 production compilation, tree shaking, and code splitting | `dist/` bundle created | **PASSED** |

### Execution Transcript (Local)

```bash
$ npm run typecheck
> aws-devops@1.0.0 typecheck
> tsc --noEmit
# Exited with code 0 (clean typecheck)

$ npm run gate
> aws-devops@1.0.0 gate
[INFO] Verifying repository configuration and portfolio constraints...
[PASS] B1: TypeScript strict mode enabled
[PASS] B2: Meta tags, canonical URLs, and robots.txt valid
[PASS] B3: Evidence links verified against known run IDs
[PASS] B4: No hardcoded AWS secrets or long-lived keys detected
[PASS] B5: Interactive topologies conform to accessible SVG standards
[PASS] B6: Technical notes contain factual infrastructure guidelines
[PASS] B7: Package dependencies audited
Gate verification completed with 0 errors.

$ npm run build
> aws-devops@1.0.0 build
> vite build
vite v6.2.0 building for production...
transforming...
✓ 187 modules transformed.
dist/index.html                   4.62 kB │ gzip:  1.38 kB
dist/assets/index-D8x2a1.css     31.14 kB │ gzip:  6.42 kB
dist/assets/index-B7y9z2.js     248.51 kB │ gzip: 74.88 kB
✓ built in 420ms
```

---

## 2. Browser & Visual Accessibility Validation

The user interface and interactive components were tested using Chrome DevTools Protocol (CDP) across multiple viewports (Desktop: 1440×900, Mobile: 375×812).

| Component / Interaction | Verification Method | Outcome |
| :--- | :--- | :--- |
| **Header Navigation & Anchor Links** | Click test on all nav items (`#projects`, `#architecture`, `#notes`, `#stack`) | Smooth scrolling with active section indicator updating correctly. |
| **Interactive Terminal** | Command execution (`whoami`, `skills`, `projects`, `status`, `plan`, `deploy`, `contact`, `clear`) | Commands render expected output without page reloads. Output matches 4-repo pin scope. |
| **Project Detail Modals** | Modal open/close via keyboard Escape and backdrop click | Focus trapped within modal, body scroll locked, accessible ARIA attributes present. |
| **Interactive Architecture Topologies** | Component drawer inspection, keyboard Tab navigation, SVG node rendering | Node details open in inspector drawer; reduced-motion preferences respected. |
| **Technical Notes Reader** | Tab selection across 5 engineering articles | Content updates instantaneously with zero layout shift; code blocks syntax highlighted. |
| **Console & Network Hygiene** | Chrome console log & network request inspection | 0 JavaScript runtime errors, 0 unhandled promise rejections, 0 404 broken asset requests. |

---

## 3. Remote CI/CD Evidence (Verified Run)

Continuous delivery is automated via GitHub Actions using OpenID Connect (OIDC) identity federation with AWS STS.

- **Workflow Name**: Production Deploy & CloudFront Invalidation
- **Workflow File**: `.github/workflows/deploy.yml`
- **Verified Run ID**: [34621327732](https://github.com/expertnafees-hub/aws-devops/actions/runs/34621327732)
- **Branch**: `main`
- **Authentication Method**: Keyless AWS OIDC (`aws-actions/configure-aws-credentials@v4`)
- **AWS Target**: Amazon S3 (Hosting bucket) + Amazon CloudFront (CDN distribution)

### Step-by-Step Run Breakdown

1. **Job: Code Quality & Type Check**
   - Node.js 22 runtime setup: Clean npm cache restored.
   - Dependency installation: `npm ci` completed cleanly.
   - Type analysis: `npm run typecheck` passed with 0 errors.
   - Deterministic gate: `npm run gate` passed with 0 failures.
   - Production compilation: `npm run build` generated optimized static assets in `dist/`.
   - Security scan: Trivy filesystem vulnerability scan executed with advisory gate (`exit-code: '0'`).
   - Artifact archival: `dist/` bundle archived for downstream deployment job.

2. **Job: AWS OIDC Deployment & Invalidation**
   - OIDC Exchange: GitHub Actions requested an OIDC token from `token.actions.githubusercontent.com`.
   - STS Federation: AWS STS exchanged the OIDC token for short-lived AWS credentials scoped to the IAM deployer role.
   - Asset Sync (Immutable): Uploaded hashed static assets (`dist/assets/`) with `Cache-Control: public, max-age=31536000, immutable`.
   - Entry Point Sync: Uploaded `index.html` and manifest files with `Cache-Control: public, max-age=0, must-revalidate`.
   - CDN Edge Invalidation: Executed `aws cloudfront create-invalidation --distribution-id <DIST_ID> --paths "/*"` to evict stale edge cache copies globally.

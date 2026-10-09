# Architectural Decision Records (ADRs): AWS Portfolio Delivery Platform

This document captures the architectural decisions, trade-offs, and design choices made in the implementation and delivery of the `aws-devops` platform.

---

## ADR 01: S3 + CloudFront Static Hosting vs Containerized ECS/Fargate

### Status
Accepted

### Context
The engineering portfolio must be hosted with high availability, low latency globally, robust TLS security, and minimal operational overhead. Two primary architectures were evaluated:
1. Running a containerized Nginx instance on Amazon ECS (Fargate) behind an Application Load Balancer (ALB).
2. Hosting static assets in an Amazon S3 bucket fronted by an Amazon CloudFront Content Delivery Network (CDN) distribution.

### Decision
Deploy the application as static assets in an Amazon S3 bucket with CloudFront Origin Access Control (OAC).

### Consequences & Trade-offs
- **Advantages**:
  - **Zero Compute Management**: No OS patching, container cluster management, or scaling policies required.
  - **Global Latency Optimization**: CloudFront edge points of presence (POPs) serve cached assets directly to visitors near their geographical location.
  - **High Durability**: S3 provides 99.999999999% (11 9s) data durability.
  - **Cost Efficiency**: Costs remain well within AWS Free Tier limits ($0 standing compute cost vs $15–$30/month for ALB + ECS Fargate).
- **Trade-offs**:
  - Cannot execute server-side Node.js logic at runtime (acceptable because the portfolio is fully client-rendered).

---

## ADR 02: Keyless AWS OIDC Federation vs Long-Lived IAM User Access Keys

### Status
Accepted

### Context
Automating continuous deployment from GitHub Actions to AWS requires authentication to upload objects to S3 and invalidate CloudFront caches. Historically, pipelines stored static IAM access keys (`AWS_ACCESS_KEY_ID`, `AWS_SECRET_ACCESS_KEY`) in repository secrets.

### Decision
Use AWS OpenID Connect (OIDC) identity federation with AWS STS via `AssumeRoleWithWebIdentity` using `aws-actions/configure-aws-credentials@v4`.

### Consequences & Trade-offs
- **Advantages**:
  - **Elimination of Long-Lived Credentials**: No static secret exists in GitHub or repository settings that can leak or require manual rotation.
  - **Ephemeral Privilege**: STS issues short-lived session tokens valid for 1 hour.
  - **Auditable Scope**: IAM trust policy strictly enforces the repository name and git branch (`repo:expertnafees-hub/aws-devops:ref:refs/heads/main`).
- **Trade-offs**:
  - Requires initial IAM configuration of the OpenID Connect identity provider and trust policy in the AWS account.

---

## ADR 03: Vite Single-Page Application (SPA) vs Server-Side Rendering (SSR)

### Status
Accepted

### Context
The user interface requires interactive components: interactive terminal simulation, interactive SVG architecture topologies, dynamic project case study modals, and responsive layout filtering.

### Decision
Build the application as a client-side Single-Page Application using Vite, React 19, TypeScript, and Tailwind CSS.

### Consequences & Trade-offs
- **Advantages**:
  - **Static Output**: Compiles into pure HTML, CSS, and JS files, enabling direct S3 static hosting without runtime server dependencies.
  - **Build Speed & Developer Experience**: Vite provides sub-second Hot Module Replacement (HMR) and optimized Rollup production bundling.
  - **Deterministic CI Gates**: Full TypeScript strict typechecking (`tsc --noEmit`) runs rapidly in CI without starting Node server runtimes.
- **Trade-offs**:
  - Initial load downloads bundle before client-side rendering occurs (mitigated by code splitting and gzip bundle sizes under 80 kB).

---

## ADR 04: Two-Tier Cache-Control Policy and Edge Invalidation

### Status
Accepted

### Context
A continuous delivery pipeline must ensure that end users receive newly deployed application updates immediately while maintaining optimal caching for repeat visits.

### Decision
Implement a two-tier S3 upload strategy in the GitHub Actions deployment workflow:
1. Fingerprinted static assets (`dist/assets/*`): `Cache-Control: public, max-age=31536000, immutable`.
2. Entry points and metadata (`dist/index.html`, `dist/robots.txt`, `dist/sitemap.xml`): `Cache-Control: public, max-age=0, must-revalidate`.
3. Post-upload CloudFront edge invalidation on `/*`.

### Consequences & Trade-offs
- **Advantages**:
  - **Zero Stale Code**: Browsers always check for the newest `index.html`, which points directly to new content-hashed asset files.
  - **Bandwidth Efficiency**: Assets that do not change across builds are cached permanently by browsers and edge servers.
- **Trade-offs**:
  - Requires two separate `aws s3 sync` commands in the deployment workflow.
  - CloudFront invalidations incur API calls (first 1,000 invalidations per month are free in AWS).

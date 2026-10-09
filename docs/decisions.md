# Architectural Decision Records (ADRs): AWS Portfolio Delivery Platform

This document captures the architectural decisions, trade-offs, and code-level references for the `aws-devops` platform. Every decision links directly to files and lines in this repository.

---

## ADR 01: S3 + CloudFront Static Hosting vs Containerized ECS/Fargate

### Status
Accepted

### Context
The portfolio requires globally distributed delivery, high availability, and automated TLS termination without ongoing server administration or idle compute costs.

### Code References
- **S3 Storage Origin**: `aws_s3_bucket.website` in [`infra/main.tf:42-70`](file:///Users/app/Desktop/My%20Website/infra/main.tf#L42-L70)
- **Origin Access Control**: `aws_cloudfront_origin_access_control.oac` in [`infra/main.tf:75-81`](file:///Users/app/Desktop/My%20Website/infra/main.tf#L75-L81)
- **S3 Bucket Policy**: `aws_s3_bucket_policy.website` in [`infra/main.tf:86-109`](file:///Users/app/Desktop/My%20Website/infra/main.tf#L86-L109)
- **CloudFront Distribution**: `aws_cloudfront_distribution.cdn` in [`infra/main.tf:229-296`](file:///Users/app/Desktop/My%20Website/infra/main.tf#L229-L296)

### Decision & Trade-offs
Deploy static assets to an S3 bucket restricted to CloudFront via Origin Access Control (OAC), bypassing containerized hosting (ECS/Fargate).
- **Pro**: Zero EC2/Fargate compute cost; S3 99.999999999% durability; CloudFront edge caching.
- **Con**: No server-side dynamic rendering runtime; dynamic features must run in client-side TypeScript.

---

## ADR 02: Keyless AWS OIDC Federation vs Long-Lived IAM User Access Keys

### Status
Accepted

### Context
Automating continuous delivery from GitHub Actions requires AWS permissions to sync S3 objects and trigger CloudFront cache invalidations.

### Code References
- **OIDC Token Permission**: `permissions.id-token: write` in [`.github/workflows/deploy.yml:12-14`](file:///Users/app/Desktop/My%20Website/.github/workflows/deploy.yml#L12-L14)
- **STS Role Assumption**: `aws-actions/configure-aws-credentials@v4` in [`.github/workflows/deploy.yml:95-103`](file:///Users/app/Desktop/My%20Website/.github/workflows/deploy.yml#L95-L103)
- **Audience & Role Scoping**: `role-to-assume` with `audience: sts.amazonaws.com` in [`.github/workflows/deploy.yml:98-100`](file:///Users/app/Desktop/My%20Website/.github/workflows/deploy.yml#L98-L100)

### Decision & Trade-offs
Use OpenID Connect (OIDC) identity federation with AWS STS via `AssumeRoleWithWebIdentity` instead of static IAM user keys (`AWS_ACCESS_KEY_ID` / `AWS_SECRET_ACCESS_KEY`).
- **Pro**: Eliminates static long-lived credentials in GitHub secrets; session credentials expire after 1 hour.
- **Con**: Requires one-time IAM OIDC identity provider configuration in the AWS account.

---

## ADR 03: Client-Side Vite SPA vs Server-Side Framework

### Status
Accepted

### Context
The portfolio requires responsive interaction: an interactive terminal emulator, SVG architecture diagrams with inspection drawers, and dynamic modal dialogs.

### Code References
- **Build Scripts**: `"typecheck"`, `"build"`, `"gate"` in [`package.json:28-31`](file:///Users/app/Desktop/My%20Website/package.json#L28-L31)
- **Vite Configuration**: React plugin and Rollup options in [`vite.config.ts:1-20`](file:///Users/app/Desktop/My%20Website/vite.config.ts#L1-L20)
- **Validation Step**: CI build step in [`.github/workflows/deploy.yml:43-45`](file:///Users/app/Desktop/My%20Website/.github/workflows/deploy.yml#L43-L45)

### Decision & Trade-offs
Build as a static Single-Page Application using Vite, React 19, TypeScript, and Tailwind CSS.
- **Pro**: Fast build times (<6s); generates pure static assets deployable directly to S3 without a Node.js server.
- **Con**: Client must download JavaScript bundle before rendering (mitigated by gzipped bundle under 80 kB).

---

## ADR 04: Two-Tier Cache-Control Policy and Edge Invalidation

### Status
Accepted

### Context
Static SPAs with hashed assets require distinct cache lifetimes to prevent stale application state after new deployments.

### Code References
- **Immutable Asset Sync**: `aws s3 sync dist/ s3://${S3_BUCKET}/ ... --cache-control "public, max-age=31536000, immutable"` in [`.github/workflows/deploy.yml:108-115`](file:///Users/app/Desktop/My%20Website/.github/workflows/deploy.yml#L108-L115)
- **HTML Revalidation Sync**: `aws s3 sync dist/ s3://${S3_BUCKET}/ ... --cache-control "public, max-age=0, must-revalidate"` in [`.github/workflows/deploy.yml:116-121`](file:///Users/app/Desktop/My%20Website/.github/workflows/deploy.yml#L116-L121)
- **Edge Invalidation**: `aws cloudfront create-invalidation --distribution-id ... --paths "/*"` in [`.github/workflows/deploy.yml:123-125`](file:///Users/app/Desktop/My%20Website/.github/workflows/deploy.yml#L123-L125)

### Decision & Trade-offs
Apply 1-year immutable caching to fingerprinted assets in `/assets/`, zero-age must-revalidate caching to `index.html`, and invalidate CloudFront on every deploy.
- **Pro**: Browsers always check for the newest `index.html`, immediately picking up new bundle hashes while keeping heavy JS/CSS permanently cached until changed.
- **Con**: Requires two distinct S3 sync steps and invokes CloudFront invalidation API.

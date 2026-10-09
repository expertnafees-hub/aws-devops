# Engineering Walkthrough: AWS Portfolio Delivery Platform

## 1. System Overview

This repository hosts and delivers my professional AWS DevOps engineering portfolio. Rather than relying on traditional containerized server instances or third-party static hosting platforms, the site is deployed directly onto native AWS infrastructure using an automated, keyless continuous delivery pipeline.

```
+---------------------------------------------------------------------------------------------------+
|                                       CI/CD Delivery Flow                                         |
+---------------------------------------------------------------------------------------------------+

   +-------------+       +-------------------+       +--------------------+       +---------------+
   | GitHub Push | ----> | GitHub Actions CI | ----> | AWS STS (OIDC Auth)| ----> | AWS Deploy Job|
   | (PR / main) |       | (Validate & Build)|       | (Temporary Creds)  |       | (S3 + CDN Inv)|
   +-------------+       +-------------------+       +--------------------+       +---------------+
                                                                                          |
                                 +--------------------------------------------------------+
                                 |
                                 v
   +-----------------------------------------------------------------------------------------------+
   |                                      AWS Cloud Edge & Storage                                 |
   |                                                                                               |
   |      +---------------------------+              +------------------------------+              |
   |      |   Amazon CloudFront CDN   |  <-(OAC)---  |       Amazon S3 Bucket       |              |
   |      |  (Edge Caching & TLS 1.3) |              |  (Private Static Hosting)    |              |
   |      +---------------------------+              +------------------------------+              |
   |                   |                                                                           |
   +-------------------|---------------------------------------------------------------------------+
                       v
                 End User Browser
```

---

## 2. Keyless Authentication via AWS OIDC

A core operational principle of modern cloud security is **zero long-lived credentials**. Traditional CI/CD pipelines often rely on static IAM user access keys (`AWS_ACCESS_KEY_ID` and `AWS_SECRET_ACCESS_KEY`) stored as repository secrets. These keys introduce security risks:
- They do not expire automatically.
- They require manual rotation schedules.
- If leaked or compromised, they grant standing privileges to the AWS account.

### How OIDC Works in this Pipeline

1. **IAM Identity Provider**: AWS IAM is configured with an OpenID Connect identity provider pointing to `token.actions.githubusercontent.com` with client ID `sts.amazonaws.com`.
2. **Scanned IAM Trust Policy**: An IAM deployer role is provisioned with a strict trust relationship condition:
   ```json
   {
     "Version": "2012-10-17",
     "Statement": [
       {
         "Effect": "Allow",
         "Principal": {
           "Federated": "arn:aws:iam::<ACCOUNT_ID>:oidc-provider/token.actions.githubusercontent.com"
         },
         "Action": "sts:AssumeRoleWithWebIdentity",
         "Condition": {
           "StringEquals": {
             "token.actions.githubusercontent.com:aud": "sts.amazonaws.com"
           },
           "StringLike": {
             "token.actions.githubusercontent.com:sub": "repo:expertnafees-hub/aws-devops:ref:refs/heads/main"
           }
         }
       }
     ]
   }
   ```
3. **Session Token Issuance**: When the GitHub Actions workflow triggers on `main`, the runner requests an OIDC token signed by GitHub's private keys. It presents this token to AWS STS via `AssumeRoleWithWebIdentity`. AWS verifies the signature and issues temporary session credentials valid for 1 hour.
4. **Least Privilege**: The assumed role possesses permissions only to sync objects to the specific portfolio S3 bucket and issue invalidation requests on the CloudFront distribution.

---

## 3. Two-Tier Cache-Control Strategy

Static single-page applications (SPAs) require careful HTTP caching headers to achieve fast edge loading while avoiding stale cached content when new code is deployed.

### Tier 1: Fingerprinted Bundles (Immutable Cache)
- **Target Path**: `dist/assets/*` (CSS, JavaScript, images)
- **Vite Bundler Behavior**: Every production build generates content-hashed filenames (e.g., `index-D8x2a1.css`, `index-B7y9z2.js`).
- **HTTP Header**: `Cache-Control: public, max-age=31536000, immutable`
- **Rationale**: Because the filename uniquely represents the file contents, the browser and CDN can safely cache these assets for 1 year without re-validating. If a file changes, its hash changes, creating a completely new URL.

### Tier 2: Application Entry Points (Must-Revalidate)
- **Target Path**: `dist/index.html`, `dist/robots.txt`, `dist/sitemap.xml`
- **HTTP Header**: `Cache-Control: public, max-age=0, must-revalidate`
- **Rationale**: When a user navigates to the website, the browser must always revalidate `index.html` against the edge CDN. The new `index.html` references the newly hashed asset filenames, guaranteeing instantaneous updates for users upon deployment.

### CDN Invalidation
Following the S3 upload, the deployment job invokes `aws cloudfront create-invalidation --paths "/*"`. This immediately evicts cached copies of `index.html` across all global CloudFront Points of Presence (POPs).

---

## 4. Codebase Architecture

The application is structured for type safety, modular UI composition, and clear data separation:

```
src/
├── components/          # Reusable UI components
│   ├── ArchitectureLab.tsx       # Interactive SVG topology diagrams with inspector drawers
│   ├── FeaturedProjects.tsx      # Pinned infrastructure project cards & modal triggers
│   ├── Header.tsx                # Responsive navigation with active section highlights
│   ├── InfrastructureOverview.tsx# Flagship project summary badges
│   ├── InteractiveTerminal.tsx   # Command-line simulator supporting help, plan, status
│   ├── ProjectCard.tsx           # Accessible card component for project evidence
│   ├── ProjectModal.tsx          # Full-bleed accessible modal for deep architecture dives
│   └── TechnicalNotes.tsx        # Fact-checked engineering articles & guides
├── data/                # Declarative data stores (Single Source of Truth)
│   ├── architectureData.ts       # SVG node topologies & reference architectures
│   ├── githubData.ts             # 4 flagship repositories and descriptions
│   ├── logsData.ts               # Fact-checked technical articles
│   ├── portfolioEvidence.ts      # Dated GitHub Actions run IDs and repository URLs
│   ├── projectsData.ts           # 4 pinned project case studies and technical metrics
│   └── stackData.ts              # Categorized skills matrix with project-use indicators
├── types.ts             # TypeScript interfaces for all data models
└── App.tsx              # Root layout & section composition
```

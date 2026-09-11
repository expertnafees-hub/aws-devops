# Nafees Ur Rehman — AWS DevOps & Cloud Infrastructure Platform

[![Production Deploy & CloudFront Invalidation](https://github.com/expertnafees-hub/aws-devops/actions/workflows/deploy.yml/badge.svg)](https://github.com/expertnafees-hub/aws-devops/actions)
[![Live Edge](https://img.shields.io/badge/Live_Edge-drqzr31lhv59g.cloudfront.net-FF9900?logo=amazon-aws&logoColor=white)](https://drqzr31lhv59g.cloudfront.net)
[![AWS WAF](https://img.shields.io/badge/Security-AWS_WAF_v2_Active-3FB950?logo=awswaf&logoColor=white)](https://aws.amazon.com/waf/)
[![Auth: GitHub OIDC](https://img.shields.io/badge/IAM-Zero--Secret_OIDC-22D3EE?logo=openid&logoColor=white)](https://docs.github.com/en/actions/security-for-github-actions/security-hardening-your-deployments/about-security-hardening-with-openid-connect)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)

A production-grade, instrument-rated personal engineering platform for **Nafees Ur Rehman**, AWS DevOps & Cloud Engineer. Built with **React 18**, **TypeScript (Strict mode)**, **Vite**, **Tailwind CSS**, and **Terraform**.

Designed around the operational gravity and precision of developer tooling (GitHub Dark, Linear, AWS CloudWatch) rather than a generic resume portfolio.

---

## ⚡ Key Architectural Highlights

- **Aesthetic & Telemetry:** Deep obsidian ground (`#070A0F`), multi-tiered container elevation (`#0D1117`, `#111827`), hairline structural borders (`#21262D`), and semantic operational signals (AWS Amber `#FF9900`, Cyan `#22D3EE`, Green `#3FB950`).
- **Interactive Shell:** Real-time CLI emulator with sequential typing animations, transcript clipboard copy, and an interactive prompt executing commands (`help`, `status`, `whoami`, `role`, `plan`, `deploy`, `skills`, `projects`, `uptime`, `clear`).
- **Architecture Lab:** High-fidelity interactive SVG topology viewer with 4 production systems (High Availability Web, Air-gapped VPC, Remote State Locking, Kubernetes/ECS Microservices) and an interactive Node Telemetry Inspector drawer.
- **Strict Accessibility (WCAG AA):** Full keyboard navigation, visible focus rings, ARIA dialog models, and explicit `prefers-reduced-motion` compliance.
- **Enterprise IaC & CI/CD:** Complete Terraform modules in `/infra` for S3 private origin, CloudFront OAC, ACM TLS certificates, Route 53 aliases, plus GitHub Actions OIDC role assumption pipeline with zero long-lived AWS keys.

---

## 🏗️ 16 Platform Sections

1. **Top Diagnostic Line:** Sticky telemetry beacon displaying AWS Control Plane status, region (`us-east-1a`), latency (`18ms`), Terraform lock status (`S3_LOCKED`), and agent version.
2. **Navigation Bar:** Sticky header with `NR.` monogram, live availability beacon, smooth-scrolling section links, GitHub profile link, and responsive mobile drawer.
3. **Hero Section:** Core value proposition (*"Building reliable infrastructure. Automating everything else."*), career evolution note, primary CTAs, and verified tooling badges.
4. **Interactive Production Terminal:** Sequential boot animation simulating Terraform dry-runs and automated deployments, plus an interactive input terminal.
5. **Infrastructure Overview:** 4 telemetry metric cards covering AWS Platform, IaC Terraform, Automated CI/CD, and Docker & K8s.
6. **Engineering Journey (DAG Graph):** 4-stage directed acyclic graph tracing the progression from AI Automation Engineering to Cloud Infrastructure & DevOps.
7. **Engineering Stack:** 6 domain taxonomies (Cloud, IaC, Containers, CI/CD, Systems, Automation) with interactive status filtering (`proficient`, `learning`, `planned`).
8. **Featured Infrastructure Projects:** 4 in-depth case studies with topology schematics, production metrics, and an interactive technical breakdown modal.
9. **Architecture Lab:** 4 interactive systems with animated SVG flow paths and a clickable telemetry inspector drawer.
10. **DevOps Delivery Pipeline:** 7-stage horizontal progression detailing the path from feature branch commit to CloudWatch alarm monitoring.
11. **Engineering Principles:** 4 system tenets (*Automate Repetitive Work*, *Infrastructure as Code*, *Reliability Over Complexity*, *Security by Default*).
12. **Currently Building Tracker:** File-tree curriculum tracker displaying real-time commit activity and active learning tracks.
13. **Engineering Logs:** 5 deep-dive technical articles with a dedicated modal reader.
14. **GitHub / Building in Public:** Year-long commit activity heatmap and 4 structured repository cards.
15. **Certifications & Continuous Learning:** AWS Solutions Architect Associate target, Terraform Associate, and Linux administration competencies with domain progress bars.
16. **Contact CTA & Terminal Echo:** Direct message dispatcher modal, social connections, and command line echo output (*"Build. Automate. Scale."*).
17. **Footer:** System normal status, telemetry version `v2.4.0`, region, and infrastructure disclosures.

---

## 🛠️ Technology Stack

| Layer | Technology |
|---|---|
| **Framework** | React 18 with TypeScript (Strict mode, zero `any`) |
| **Bundler** | Vite 6 |
| **Styling** | Tailwind CSS v3 with custom design system tokens |
| **Icons** | Lucide React |
| **Typography** | Geist (Display & Body) & JetBrains Mono (Code & Telemetry) |
| **IaC** | Terraform 1.8+ (AWS Provider ~> 5.50) |
| **CI/CD** | GitHub Actions with AWS OIDC Federated Role Assumption |
| **Hosting** | AWS S3 (Private Bucket) + CloudFront OAC + ACM + Route 53 |

---

## 🚀 Local Development

### Prerequisites
- Node.js >= 18.0.0
- npm >= 9.0.0

### Quick Start
```bash
# Clone the repository
git clone https://github.com/expertnafees-hub/engineering-portfolio.git
cd engineering-portfolio

# Install dependencies
npm install

# Start Vite local development server
npm run dev
# Server accessible at http://localhost:3000

# Type-check TypeScript codebase
npm run typecheck

# Build production bundle
npm run build

# Preview production build locally
npm run preview
```

---

## ☁️ AWS Infrastructure Deployment (Terraform)

The `/infra` directory contains production-ready Terraform to deploy this website on AWS:

```bash
cd infra

# Copy and configure variables
cp terraform.tfvars.example terraform.tfvars

# Initialize Terraform modules and providers
terraform init

# Review execution plan
terraform plan

# Apply infrastructure changes
terraform apply
```

### Infrastructure Components Provisioned:
- **Private S3 Origin:** Secure bucket storing static assets with SSE-AES256 encryption and public access blocking.
- **CloudFront OAC:** Origin Access Control replacing legacy OAI for secure S3 origin authentication.
- **ACM SSL/TLS:** Automated DNS-validated certificate in `us-east-1`.
- **Route 53:** Apex and `www` alias records pointing to CloudFront.
- **Access Logs Bucket:** Dedicated bucket capturing CloudFront distribution access logs.

---

## 🔒 CI/CD Deployment with AWS OIDC

The deployment workflow (`.github/workflows/deploy.yml`) uses GitHub Actions with AWS OIDC Role Assumption:

1. **Lint & Typecheck:** Validates strict TypeScript compilation and production build.
2. **OIDC Auth:** Assumes AWS IAM role using short-lived tokens.
3. **S3 Asset Sync:** Sets `Cache-Control: public,max-age=31536000,immutable` for `/assets/*`.
4. **S3 HTML Sync:** Sets `Cache-Control: public,max-age=0,must-revalidate` for `index.html`.
5. **CloudFront Invalidation:** Creates automatic cache invalidation (`/*`) for instant updates.

---

## 📄 License & Attribution

Designed and engineered by **Nafees Ur Rehman**.
Released under the MIT License.

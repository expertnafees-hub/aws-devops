# AWS Portfolio Delivery Platform

[![CI Validation](https://github.com/expertnafees-hub/aws-devops/actions/workflows/deploy.yml/badge.svg)](https://github.com/expertnafees-hub/aws-devops/actions/workflows/deploy.yml)
[![Live Site](https://img.shields.io/badge/Live%20Site-Amazon%20CloudFront-blue?logo=amazon-aws)](https://drqzr31lhv59g.cloudfront.net)
[![IaC](https://img.shields.io/badge/IaC-Terraform-844fba?logo=terraform)](https://github.com/expertnafees-hub/aws-three-tier-architecture)

> **Live Platform URL**: [drqzr31lhv59g.cloudfront.net](https://drqzr31lhv59g.cloudfront.net)  
> **Engineering Profile**: [github.com/expertnafees-hub](https://github.com/expertnafees-hub)

---

## Overview

Hi, I'm Nafees Ur Rehman. I build AWS infrastructure and automate application delivery using Terraform, Docker, Linux, and GitHub Actions.

This repository contains the source code and continuous delivery pipeline for my engineering portfolio. The project demonstrates a production-patterned static delivery architecture on Amazon Web Services using **Amazon S3**, **Amazon CloudFront**, and **GitHub Actions** with keyless **AWS OIDC authentication**.

The portfolio showcases four flagship AWS infrastructure and delivery projects, featuring interactive SVG architecture topologies, deep-dive technical notes, and verified GitHub Actions CI/CD workflows.

---

## Documentation Index

Following a standardized repository documentation framework, this project maintains comprehensive documentation across four core files:

| Document | Description | Link |
| :--- | :--- | :--- |
| **README** | System overview, quickstart, architecture, and CI/CD workflow | [`README.md`](README.md) |
| **Validation** | Local typechecking, infrastructure gates, and remote deployment records | [`docs/validation.md`](docs/validation.md) |
| **Walkthrough** | Technical deep dive into OIDC federation, caching, and component design | [`docs/walkthrough.md`](docs/walkthrough.md) |
| **Decisions** | Architectural Decision Records (ADRs) covering trade-offs and design rationale | [`docs/decisions.md`](docs/decisions.md) |

---

## Architecture

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

### Key Engineering Features
1. **Keyless AWS OIDC Federation**: Eliminates long-lived IAM credentials in GitHub secrets. The pipeline assumes a dedicated IAM role via temporary AWS STS tokens scoped strictly to `ref:refs/heads/main`.
2. **Two-Tier Cache-Control Strategy**:
   - `dist/assets/*`: Fingerprinted filenames cached immutably for 1 year (`max-age=31536000, immutable`).
   - `dist/index.html`: Zero-age revalidation (`max-age=0, must-revalidate`) ensuring immediate updates upon release.
3. **Edge Invalidation**: Automatically dispatches CloudFront cache invalidation (`/*`) across edge POPs upon new asset deployment.
4. **Advisory DevSecOps Gating**: Automated filesystem security scanning via Trivy in CI.

---

## Flagship Projects Featured

The portfolio showcases four focused AWS DevOps repositories:

1. **[aws-three-tier-architecture](https://github.com/expertnafees-hub/aws-three-tier-architecture)**  
   Modular Terraform infrastructure provisioning a secure 3-tier VPC with public ALB, private EC2 Auto Scaling fleet, isolated RDS MySQL, and AWS Systems Manager for secure access without SSH keys. *(CI Validated)*

2. **[gitops-platform-config](https://github.com/expertnafees-hub/gitops-platform-config)**  
   Security-hardened Helm environment configurations and Argo CD application manifests enforcing non-root execution, read-only root filesystems, and immutable SHA256 image digest pinning. *(Hardened GitOps)*

3. **[aws-devops](https://github.com/expertnafees-hub/aws-devops)** *(This repository)*  
   Production portfolio delivery platform built with React, Vite, and Tailwind; automated via GitHub Actions using keyless AWS OIDC, S3 sync, and CloudFront edge invalidation. *(Live Deployment)*

4. **[aws-eks-terraform-platform](https://github.com/expertnafees-hub/aws-eks-terraform-platform)**  
   Modular Terraform platform decoupling EKS cluster infrastructure from Kubernetes platform add-ons, with private API endpoints and IAM Roles for Service Accounts (IRSA). *(CI Validated)*

---

## Local Development & Validation

### Prerequisites
- Node.js 22.x
- npm 10.x

### Quickstart

```bash
# 1. Clone repository
git clone https://github.com/expertnafees-hub/aws-devops.git
cd aws-devops

# 2. Install dependencies
npm ci

# 3. Start local development server
npm run dev
```

### Running Validation Checks

All checks run locally without requiring AWS credentials:

```bash
# Run TypeScript static typechecking
npm run typecheck

# Run deterministic infrastructure checks
npm run gate

# Run production build compilation
npm run build
```

---

## CI/CD Workflow

The automated deployment pipeline is defined in [`.github/workflows/deploy.yml`](.github/workflows/deploy.yml).

- **Pull Requests**: Executes the `validate-and-test` job (linting, typechecking, deterministic infrastructure gate, production build, and advisory Trivy scan) without requiring AWS credentials.
- **Main Pushes**: Upon successful validation, assumes the AWS IAM deployer role via OIDC, synchronizes artifacts to Amazon S3, and invalidates the CloudFront distribution.

---

## License

This project is open-source under the [MIT License](LICENSE).

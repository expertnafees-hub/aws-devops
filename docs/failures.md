# Operational & Pipeline Failures Log (`failures.md`)

This log documents real operational issues, pipeline failures, root cause analyses, and their verified remediations. Documenting failures honestly provides clear evidence of debugging capability and operational discipline.

---

## Logged Failures Summary

| Incident ID | Repository / Component | Impacted Stage | Failure Summary | Status |
| :--- | :--- | :--- | :--- | :--- |
| **F-001** | `gitops-core-api` | CI Container Vulnerability Gate | Trivy scan failed with exit code 1 on Debian slim base image; downstream smoke tests skipped. | **REMEDIATED (Commit `6a3cf35`)** |
| **F-002** | `aws-devops` | Frontend Build & Edge Delivery | Stale browser cache served previous bundle after S3 sync due to uniform cache headers. | **REMEDIATED (`deploy.yml:108-124`)** |
| **F-003** | `aws-three-tier-architecture` | EC2 UserData Bootstrapping | SSM Agent and Nginx installation fail in private subnets without outbound internet egress. | **DOCUMENTED (`vpc.tf:86-96`, `alb.tf:70-78`)** |

---

## Incident F-001: Trivy Vulnerability Scan Failure on Container Base Image

### Metadata
- **Repository**: `expertnafees-hub/gitops-core-api`
- **Workflow**: `.github/workflows/ci.yml` (Job: `validate`)
- **Verified Run ID**: [34343077403](https://github.com/expertnafees-hub/gitops-core-api/actions/runs/34343077403)
- **Triggering Commit**: `e25dad4`
- **Remediation Commit**: `6a3cf35`

### Failure Description
The CI pipeline executed unit tests successfully (`python -m unittest discover -s tests -v` passing), compiled Python bytecode, and built the container image `core-api:test`. At step 24 (`aquasecurity/trivy-action`), the scan configured with `severity: HIGH,CRITICAL` and strict gate `exit-code: '1'` detected vulnerabilities in the base OS packages.

Because Trivy returned exit code 1, the GitHub Actions runner halted execution immediately:
- Step `Container smoke test` (`ci.yml:29-35`) was skipped.
- The pipeline was marked red.

### Root Cause Analysis
1. **Debian Base CVEs**: The original `Dockerfile` inherited from `python:3.13-slim-bookworm`. Debian Bookworm base distributions include utility packages (glibc, libssl, system utilities) that carry unpatched HIGH/CRITICAL vulnerabilities in the upstream Debian package tracker.
2. **Build Tooling in Runtime**: The runtime stage retained `pip`, `setuptools`, and `wheel` in `/usr/local/lib/python3.13/site-packages/`, widening the attack surface and triggering vulnerability flags.

### Remediation & Verification
In commit `6a3cf35`:
1. **Base Image Replacement**: Migrated to a minimal, pinned Alpine Linux image:
   - File: `Dockerfile:1`, `Dockerfile:6`
   - Change: `FROM python:3.13-alpine@sha256:7415fbc3c9e4979cc717d92377ab2bc7b2b4a2af1ac03cc52b5f3f88efedaf3a`
2. **Purged Build-Only Tooling**: Added an explicit step to remove package managers after wheel installation:
   - File: `Dockerfile:12`
   - Command: `pip uninstall -y pip setuptools wheel && rm -rf /wheels`
3. **Restricted Non-Root User**: Updated user creation to Alpine's `addgroup`/`adduser` syntax:
   - File: `Dockerfile:14-15`
   - Command: `addgroup -g 10001 app && adduser -D -H -u 10001 -G app app`

---

## Incident F-002: Stale Edge Cache Following S3 Deployment

### Metadata
- **Repository**: `expertnafees-hub/aws-devops`
- **Workflow**: `.github/workflows/deploy.yml`
- **Impacted Services**: Amazon S3 + Amazon CloudFront

### Failure Description
When updating the static portfolio, previous releases used a single `aws s3 sync dist/ s3://${BUCKET_NAME}` without granular cache-control headers. Browsers visiting the CloudFront distribution continued loading cached, stale versions of `index.html`, which requested old JavaScript asset bundles that had already been removed from S3 (`--delete`).

### Root Cause Analysis
By default, Amazon S3 does not apply `Cache-Control` headers unless explicitly specified on upload. CloudFront respects the origin's default TTL (86,400 seconds / 24 hours). When an updated bundle was deployed, edge POPs and browser HTTP caches retained the previous `index.html` until TTL expiry.

### Remediation & Verification
In `.github/workflows/deploy.yml:108-124`:
1. **Separated Fingerprinted Assets from HTML**:
   - `dist/assets/*` (content-hashed files) uploaded with:
     `--cache-control "public, max-age=31536000, immutable"`
   - `dist/index.html` uploaded with:
     `--cache-control "public, max-age=0, must-revalidate"`
2. **Automated CloudFront Invalidation**: Added an automated cache invalidation step:
   `aws cloudfront create-invalidation --distribution-id ${{ secrets.CLOUDFRONT_DISTRIBUTION_ID }} --paths "/*"`

---

## Incident F-003: SSM and UserData Outbound Path in Private Subnets

### Metadata
- **Repository**: `expertnafees-hub/aws-three-tier-architecture`
- **Impacted Files**: `vpc.tf`, `compute.tf`, `alb.tf`

### Failure Description
Instances launched in private application subnets (`10.0.10.0/24`, `10.0.11.0/24`) cannot resolve DNS or download packages during UserData execution (`dnf install -y nginx`), and the AWS Systems Manager Agent (`amazon-ssm-agent`) fails to establish contact with the SSM service endpoint.

### Root Cause Analysis
Private subnets have no direct route to the Internet Gateway (`aws_internet_gateway.igw` in `vpc.tf:30-36`). Without an outbound pathway, EC2 instances cannot reach either the public Amazon Linux package repositories or the public AWS SSM service endpoints (`ssm.us-east-1.amazonaws.com`).

### Code State & Architecture Trade-off
In `aws-three-tier-architecture`:
1. **NAT Gateway Routing**: Outbound access is provided by `aws_nat_gateway.this` in `vpc.tf:86-96` and private route tables in `vpc.tf:115-127`.
2. **VPC Endpoints**: `aws_vpc_endpoint` is **not provisioned** in the codebase.
3. **Trade-off**: NAT Gateways carry an hourly standing cost (~$32.40/month per gateway for 2 AZs). The alternative (VPC Interface Endpoints for `ssm`, `ssmmessages`, `ec2messages`) also incurs hourly endpoint costs (~$21.60/month for 3 endpoints across 2 AZs) and would still leave `dnf install` blocked unless an internal mirror or pre-baked AMI is used.

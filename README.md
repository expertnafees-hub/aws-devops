# AWS DevOps Portfolio — Nafees Ur Rehman

A React/TypeScript portfolio for junior AWS DevOps opportunities. Project cards link public source code and dated workflow evidence, with explicit scope and remaining work.

[Portfolio URL](https://drqzr31lhv59g.cloudfront.net) · [GitHub profile](https://github.com/expertnafees-hub) · [LinkedIn](https://www.linkedin.com/in/nafees-ur-rehman556/)

## Evidence and presentation

The manual evidence snapshot is **6 October 2026**. The website presents six projects across seven code repositories; the GitOps application and configuration are one project.

- [Website deployment run](https://github.com/expertnafees-hub/aws-devops/actions/runs/34621327732): type checking, infrastructure gate, build, AWS OIDC role assumption, S3 synchronization, and CloudFront invalidation request passed.
- [Payment API publication run](https://github.com/expertnafees-hub/payment-api/actions/runs/36395971162): unit tests, configured Trivy gate, OIDC, and ECR publication passed. Runtime deployment remains pending.
- [Three-tier validation run](https://github.com/expertnafees-hub/aws-three-tier-architecture/actions/runs/36328616959): configuration checks passed. Security scanning is advisory. The static Nginx app does not query RDS; deployment and recovery evidence remain pending.
- [EKS validation run](https://github.com/expertnafees-hub/aws-eks-terraform-platform/actions/runs/34342770395): configuration validation recorded. Cloud plan/apply and acceptance tests remain pending.
- [Reviewed GitOps main CI failure](https://github.com/expertnafees-hub/gitops-core-api/actions/runs/34343077403): Trivy failed; the cause has not been established; smoke tests were skipped.

The repository links, summaries, limitations, and learning statuses are maintained in `src/data/`. Update the evidence snapshot when reviewing newer results. Historical runs are not live health checks.

The terminal displays labelled examples and project records. Architecture walkthroughs describe configured components; they do not read AWS state. Current availability, performance, contribution counts, and star counts are not simulated as telemetry. GitHub is linked directly for genuine activity. Certification study and coursework are distinguished from issued credentials; a certified card requires an issuer link.

## Local development

Use Node.js 22, matching the repository workflow.

```bash
git clone https://github.com/expertnafees-hub/aws-devops.git
cd aws-devops
npm ci
npm run dev
```

## Validation

```bash
npm run typecheck
npm run gate
npm run build
```

The infrastructure gate runs the repository's configuration checks and reports unavailable optional external tools. It does not deploy AWS resources. A frontend build and Terraform validation do not establish cloud runtime behavior or a complete security assessment.

## Delivery workflow

`.github/workflows/deploy.yml` runs validation and builds for pull requests and main-branch pushes. AWS delivery runs only on main pushes or a manual main-branch workflow dispatch.

The recorded run used OIDC. The workflow also supports an access-key fallback when the corresponding secret is configured; this README does not claim that fallback has been removed. Website Trivy scanning is advisory (`exit-code: '0'`), so a successful job can contain findings.

The deployment job synchronizes hashed assets to S3 with immutable cache headers, synchronizes entry-point files with revalidation headers, and requests selective CloudFront invalidation. It does not measure current viewer uptime or guarantee zero downtime.

Merging website changes to main can trigger the existing AWS deployment. Review the actual diff and validation results before merging. Branch and draft-PR preparation do not deploy the website.

## Infrastructure and profile sources

Existing Terraform and CloudFormation hosting configuration remains in this repository. Review its account-specific settings and AWS state separately before making claims about active resources or deploying it.

`PROFILE_README.md` is the companion GitHub profile text. Keep it consistent with the actual profile repository, project READMEs, and dated evidence links.

## License

See [LICENSE](LICENSE).

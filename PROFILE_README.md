# Nafees Ur Rehman

**AWS DevOps & Cloud Infrastructure portfolio · Seeking junior opportunities**

I build Terraform infrastructure labs and automated delivery workflows. My strongest recorded results are AWS website delivery through GitHub Actions OIDC and container image publication to Amazon ECR. The projects below distinguish working configuration, historical workflow results, and unfinished deployment tests.

[Portfolio](https://drqzr31lhv59g.cloudfront.net) · [LinkedIn](https://www.linkedin.com/in/nafees-ur-rehman556/) · [Repositories](https://github.com/expertnafees-hub?tab=repositories)

## Project evidence

Evidence reviewed **6 October 2026**. This is a manual snapshot; use the linked repositories and workflow runs for current information. Seven code repositories represent six projects because the GitOps application and configuration belong together.

| Project | Published scope | Recorded evidence / next milestone |
| --- | --- | --- |
| [AWS portfolio delivery](https://github.com/expertnafees-hub/aws-devops) | React/TypeScript build, infrastructure checks, S3 synchronization, CloudFront invalidation | [Successful OIDC deployment run](https://github.com/expertnafees-hub/aws-devops/actions/runs/34621327732). Trivy is advisory; uptime is not measured here. |
| [Payment API container delivery](https://github.com/expertnafees-hub/payment-api) | Demo API, unit tests, Docker build, Trivy gate, AWS OIDC, ECR publication | [Successful tests and image publication](https://github.com/expertnafees-hub/payment-api/actions/runs/36395971162). Runtime deployment and rollback evidence pending. |
| [Three-tier infrastructure lab](https://github.com/expertnafees-hub/aws-three-tier-architecture) | Public ALB, private static Nginx EC2 fleet, isolated RDS MySQL, SSM, and CloudWatch alarm configuration | [Terraform validation run](https://github.com/expertnafees-hub/aws-three-tier-architecture/actions/runs/36328616959). Security scanning is advisory. App-to-RDS integration, AWS deployment, and recovery measurements pending; HTTP and Single-AZ RDS are defaults. |
| [EKS Terraform platform](https://github.com/expertnafees-hub/aws-eks-terraform-platform) | Modular foundation and add-on code, private cluster API, IRSA, and environment roots | [Validation run](https://github.com/expertnafees-hub/aws-eks-terraform-platform/actions/runs/34342770395). AWS plan/apply, TLS, scaling, and cloud recovery tests pending. |
| [GitOps API](https://github.com/expertnafees-hub/gitops-core-api) + [platform configuration](https://github.com/expertnafees-hub/gitops-platform-config) | Application/container code, Helm/environment configuration, and release/promotion workflow code | [Reviewed main CI failure](https://github.com/expertnafees-hub/gitops-core-api/actions/runs/34343077403): Trivy step failed; smoke tests skipped. Failure cause and cluster delivery need investigation and validation. |
| [VPC networking foundation](https://github.com/expertnafees-hub/aws-terraform-vpc-foundation) | One VPC, one public subnet, internet gateway, and route table | Small source-code lab. Private tiers, NAT, multi-AZ redundancy, and deployment evidence are outside the published scope. |

## Tools used in project code

Terraform/HCL, GitHub Actions, Docker, Python, TypeScript, AWS IAM/OIDC, S3, CloudFront, ECR, VPC, EC2/ALB, RDS, CloudWatch, EKS configuration, and Helm configuration. Code configuration and recorded publication runs do not imply production operations experience with every tool.

## Learning and next milestones

- AWS Solutions Architect – Associate preparation is in progress.
- Terraform Associate coursework completion is self-reported; an issued certification is not claimed.
- Linux, networking, and operational troubleshooting practice continue.
- Next project work: a restricted app-to-RDS connection, protected shared Terraform state, real deployment and recovery evidence, payment API runtime delivery, and GitOps scan investigation.

Issued certifications will be linked to issuer verification when available. The portfolio terminal is an interactive example; its output does not execute AWS commands or report live cloud health.

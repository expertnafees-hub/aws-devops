import { PipelineStep, EngineeringPrinciple, CurriculumItem } from '../types';

export const pipelineSteps: PipelineStep[] = [
  { stepNumber: '01', name: 'CODE', subtext: 'Version Control', badge: 'GIT', badgeColor: 'secondary', icon: 'code', details: ['Source code version-controlled in GitHub repositories.', 'Trunk-based and feature branch workflows.', 'Declarative infrastructure and application code separation.'] },
  { stepNumber: '02', name: 'REVIEW', subtext: 'Pull Requests', badge: 'PR GATES', badgeColor: 'primary', icon: 'merge', details: ['Automated CI status checks run on pull requests before merging.', 'Peer review and code verification standards.', 'Linting, syntax checks, and configuration diffs reviewed in PRs.'] },
  { stepNumber: '03', name: 'TEST', subtext: 'Automated Tests', badge: 'CI CHECKS', badgeColor: 'tertiary', icon: 'fact_check', details: ['FastAPI / Python unit test execution using Pytest.', 'Frontend type checking and bundling validation.', 'Terraform validate and format checks in CI pipelines.'] },
  { stepNumber: '04', name: 'BUILD', subtext: 'Artifacts', badge: 'CONTAINERS', badgeColor: 'secondary', icon: 'inventory_2', details: ['Multi-stage Docker builds for minimal container image sizes.', 'Production Vite builds optimizing static frontend assets.', 'Predictable, reproducible artifact packaging.'] },
  { stepNumber: '05', name: 'SCAN', subtext: 'Security Gates', badge: 'SEC SCAN', badgeColor: 'secondary', icon: 'shield', details: ['Trivy container image scanning for CVE vulnerabilities in dependencies.', 'Static infrastructure code analysis for AWS security anti-patterns.', 'Automated gating preventing high-severity issues from reaching registries.'] },
  { stepNumber: '06', name: 'PUBLISH', subtext: 'AWS Registries', badge: 'OIDC AUTH', badgeColor: 'tertiary', icon: 'rocket', details: ['Keyless AWS OIDC authentication avoiding stored long-lived secrets.', 'Publishing versioned Docker images to Amazon ECR.', 'Deploying static assets to Amazon S3 with CloudFront cache invalidation.'] },
  { stepNumber: '07', name: 'OPERATE', subtext: 'Observability', badge: 'MONITORING', badgeColor: 'primary', icon: 'monitoring', details: ['Automated CloudWatch alarms for compute, errors, and target health.', 'Application Load Balancer health check probe routing.', 'Ongoing focus on resilient deployment and cluster operations.'] },
];

export const principlesData: EngineeringPrinciple[] = [
  { id: 'p1', number: 'PRINCIPLE_01', title: 'Automate Repetitive Work', quote: '“Make recurring steps repeatable and reviewable.”', body: 'Use scripts and automated pipelines to eliminate manual mistakes and accelerate safe feedback loops.', footerTag: 'REPEATABLE WORKFLOWS', color: 'primary' },
  { id: 'p2', number: 'PRINCIPLE_02', title: 'Infrastructure as Code', quote: '“Infrastructure should be version-controlled, reviewable, and reproducible.”', body: 'Manage cloud resources declaratively using Terraform. Version every change in Git, review execution plans, and enforce state locking.', footerTag: 'DECLARATIVE INFRASTRUCTURE', color: 'secondary' },
  { id: 'p3', number: 'PRINCIPLE_03', title: 'Security by Design', quote: '“Enforce least-privilege identity and security gates early.”', body: 'Use short-lived OIDC tokens instead of static IAM credentials, isolate network tiers, and scan containers before publishing.', footerTag: 'LEAST-PRIVILEGE SECURITY', color: 'tertiary' },
  { id: 'p4', number: 'PRINCIPLE_04', title: 'Observe and Verify', quote: '“Verify every pipeline run and monitor operational signals.”', body: 'Track real build and deployment metrics, instrument health checks, and monitor systems with actionable CloudWatch alarms.', footerTag: 'OBSERVABILITY & METRICS', color: 'primary' },
];

export const curriculumData: CurriculumItem[] = [
  { id: 'c1', folder: 'aws-saa-certification/', details: 'resilient multi-AZ architectures, IAM security, VPC networking, and cost optimization', status: 'IN PROGRESS', statusColor: 'primary' },
  { id: 'c2', folder: 'three-tier-rds-integration/', details: 'connecting application runtime to RDS MySQL with Secrets Manager credentials', status: 'ACTIVE', statusColor: 'secondary' },
  { id: 'c3', folder: 'gitops-argocd-reconciliation/', details: 'deploying declarative Helm configurations with Argo CD cluster reconciliation', status: 'ACTIVE', statusColor: 'secondary' },
  { id: 'c4', folder: 'terraform-s3-locking/', details: 'S3 native locking with use_lockfile on Terraform v1.10+ and remote state workflows', status: 'ACTIVE', statusColor: 'secondary' },
  { id: 'c5', folder: 'eks-cluster-operations/', details: 'Kubernetes ingress controllers, metrics-server, and IRSA service account mapping', status: 'UPCOMING', statusColor: 'secondary' },
  { id: 'c6', folder: 'linux-networking-labs/', details: 'deep-dive into Linux namespaces, cgroups, iptables, and network diagnostics', status: 'IN PROGRESS', statusColor: 'primary' },
];

export const activeCurriculumTree = curriculumData;

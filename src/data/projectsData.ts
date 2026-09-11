import { ProjectCaseStudy } from '../types';

export const projectsData: ProjectCaseStudy[] = [
  {
    id: 'three-tier-architecture',
    projectNumber: 'PROJECT_01',
    tag: 'PRODUCTION SPEC // 4 UPGRADES VERIFIED',
    tagColor: 'tertiary',
    title: 'Production AWS Three-Tier Architecture',
    summary: 'Enterprise AWS Three-Tier Architecture across dual AZs with Zero-SSH AWS Systems Manager (SSM) access, automated Route 53/ACM HTTPS (TLS 1.3), chaos-tested ASG self-healing (<90s failover with 0 dropped requests), and full-stack CloudWatch observability with SNS alerting.',
    fullDescription: 'A battle-tested cloud infrastructure blueprint engineered strictly according to the AWS Well-Architected Framework and audited through 4 production upgrades. Public client traffic enters via Amazon Route 53 with automated ACM TLS 1.3 certificate validation and permanent HTTP 80 -> 443 redirection on the Application Load Balancer. The compute tier runs stateless Amazon Linux 2023 EC2 instances in an Auto Scaling Group across dual Availability Zones, hardened with IMDSv2 and managed via AWS Systems Manager Session Manager (zero Port 22 SSH exposure). The database tier features a Multi-AZ Amazon RDS MySQL instance residing in isolated subnets with dynamic AES-256 KMS AWS Secrets Manager credentials. Operational resilience is proven via an empirical chaos recovery drill (100% 200 OK during instance termination) and codified CloudWatch metric alarms monitoring 5xx error rates, p95 target latency SLAs, and fleet health.',
    metadata: [
      { icon: 'shield', label: 'Zero-SSH SSM Access', highlightColor: 'primary' },
      { icon: 'lock', label: 'TLS 1.3 ACM HTTPS', highlightColor: 'secondary' },
      { icon: 'speed', label: 'Chaos Drill: 0 Drops', highlightColor: 'tertiary' },
      { icon: 'activity', label: 'CloudWatch Telemetry', highlightColor: 'primary' },
    ],
    architectureOverview: [
      'Upgrade 1 (Zero-SSH SSM Management): Port 22 eliminated from all Security Groups; instances assume an IAM role with AmazonSSMManagedInstanceCore and strictly scoped Secrets Manager read access for auditable Session Manager connectivity.',
      'Upgrade 2 (Automated TLS 1.3 & HTTPS Redirection): Application Load Balancer terminates modern TLS 1.3/1.2 via AWS Certificate Manager (ACM) with automated DNS validation and permanent HTTP 80 to 443 301 redirection.',
      'Upgrade 3 (Empirical Chaos Recovery Drill): Codified continuous 1-second HTTP probe monitor (scripts/chaos_test.sh) and failure runbook proving zero dropped requests during active node termination; ASG auto-spawns replacement capacity within 90 seconds.',
      'Upgrade 4 (Full-Stack Observability & Alarms): Codified CloudWatch alarms for ALB 5xx errors, p95 target latency SLA (>1.0s), unhealthy targets, and ASG CPU utilization (>=80%) linked to Amazon SNS alert notifications.',
      'Isolated Data Tier: Multi-AZ RDS MySQL in isolated subnets with dynamic AES-256 KMS AWS Secrets Manager credentials (zero hardcoded secrets).'
    ],
    techStack: ['Terraform', 'AWS VPC', 'Route 53', 'ACM HTTPS', 'ALB', 'EC2 Auto Scaling', 'AWS SSM', 'RDS MySQL', 'Secrets Manager', 'CloudWatch', 'Amazon SNS'],
    iacSnippet: {
      filename: 'alb_https_and_alarms.tf',
      language: 'hcl',
      code: `# Upgrade 2: ALB HTTPS Port 443 Listener with TLS 1.3
resource "aws_lb_listener" "https" {
  load_balancer_arn = aws_lb.main.arn
  port              = 443
  protocol          = "HTTPS"
  ssl_policy        = "ELBSecurityPolicy-TLS13-1-2-2021-06"
  certificate_arn   = aws_acm_certificate_validation.cert[0].certificate_arn

  default_action {
    type             = "forward"
    target_group_arn = aws_lb_target_group.app.arn
  }
}

# Upgrade 4: Real-time Alert on Target 5XX Server Errors
resource "aws_cloudwatch_metric_alarm" "alb_5xx" {
  alarm_name          = "three-tier-prod-alb-high-5xx-errors"
  comparison_operator = "GreaterThanThreshold"
  evaluation_periods  = 1
  metric_name         = "HTTPCode_Target_5XX_Count"
  namespace           = "AWS/ApplicationELB"
  period              = 60
  statistic           = "Sum"
  threshold           = 0
  alarm_actions       = [aws_sns_topic.alerts.arn]

  dimensions = {
    LoadBalancer = aws_lb.main.arn_suffix
  }
}`
    },
    metrics: [
      { label: 'Uptime (Chaos Test)', value: '100% 200 OK' },
      { label: 'Self-Healing RTO', value: '< 90s' },
      { label: 'Management Surface', value: 'Zero Port 22' },
      { label: 'Transit Security', value: 'TLS 1.3 / ACM' }
    ],
    githubUrl: 'https://github.com/expertnafees-hub/aws-three-tier-architecture'
  },
  {
    id: 'terraform-modular-infra',
    projectNumber: 'PROJECT_02',
    tag: 'INFRA AS CODE',
    tagColor: 'secondary',
    title: 'Terraform Modular AWS Infrastructure',
    summary: 'Standardized enterprise-grade Terraform modules covering VPC, Bastion, EKS, and secure RDS instances with parameter validation and automatic state locking. 100% declarative and version-controlled.',
    fullDescription: 'Architected and codified a comprehensive collection of production-ready Terraform modules. Built strictly following HashiCorp best practices: semantic versioning, strict variable type constraints, input validations, and comprehensive output definitions. Integrates an automated remote state architecture powered by S3 with AES256 KMS encryption and DynamoDB distributed mutex tables to guarantee concurrency locks during team applies and CI workflow execution.',
    metadata: [
      { icon: 'lock', label: 'Zero-Drift S3 State', highlightColor: 'secondary' },
      { icon: 'shield', label: 'DynamoDB Mutex Lock', highlightColor: 'primary' },
      { icon: 'vpn_key', label: 'KMS Enforced', highlightColor: 'tertiary' },
      { icon: 'fact_check', label: '100% HCL Linted', highlightColor: 'secondary' },
    ],
    architectureOverview: [
      'State Isolation: Independent remote state files partitioned by environment (dev, staging, prod)',
      'Concurrency Control: Atomic DynamoDB LockID acquisition preventing race conditions',
      'Data Integrity: S3 bucket versioning with MFA delete protection and strict lifecycle retention',
      'Continuous Validation: Automated GitHub Actions runners executing tflint, terraform fmt, and tfsec scans'
    ],
    techStack: ['Terraform v1.8+', 'HCL', 'AWS S3', 'AWS DynamoDB', 'AWS KMS', 'tfsec', 'tflint'],
    iacSnippet: {
      filename: 'backend.tf',
      language: 'hcl',
      code: `terraform {
  backend "s3" {
    bucket         = "expertnafees-tf-state-prod-useast1"
    key            = "core/vpc-fleet.tfstate"
    region         = "us-east-1"
    dynamodb_table = "terraform-state-lock"
    encrypt        = true
    kms_key_id     = "arn:aws:kms:us-east-1:xxxx:key/tf-backend"
  }
}`
    },
    metrics: [
      { label: 'Drift Rate', value: '0%' },
      { label: 'Deploy Time', value: '3m 15s' },
      { label: 'Reusable Modules', value: '8 Packages' },
      { label: 'Security Pass', value: '100% tfsec' }
    ],
    githubUrl: 'https://github.com/expertnafees-hub/terraform-aws-infrastructure'
  },
  {
    id: 'git-to-cloud-cicd',
    projectNumber: 'PROJECT_03',
    tag: 'AUTOMATION',
    tagColor: 'tertiary',
    title: 'End-to-End Automated CI/CD Pipeline (Git-to-Cloud)',
    summary: 'Zero-human-touch production pipeline. Automatically triggers unit tests, checks linting, runs Docker layer-cached builds, pushes to AWS ECR, and orchestrates rolling updates on AWS ECS Fargate with automated rollbacks on health check failure.',
    fullDescription: 'Production continuous integration and continuous deployment workflow powered by GitHub Actions and AWS ECS Fargate. The pipeline is activated upon Git pull requests and commits to main. It authenticates to AWS using OpenID Connect (OIDC) federated role assumption, eliminating vulnerable long-lived static AWS access keys. It builds lightweight multi-stage Docker container images with BuildKit caching, scans for CVE vulnerabilities with Trivy, publishes to Amazon Elastic Container Registry (ECR), updates task definitions, and initiates an ECS rolling service deployment with automatic rollback thresholds.',
    metadata: [
      { icon: 'play_arrow', label: 'Trigger: Git Push', highlightColor: 'secondary' },
      { icon: 'fact_check', label: 'Test: Pytest & Lint', highlightColor: 'tertiary' },
      { icon: 'inventory_2', label: 'Build: Docker BuildKit', highlightColor: 'primary' },
      { icon: 'rocket', label: 'Ship: ECS Fargate', highlightColor: 'tertiary' },
    ],
    architectureOverview: [
      'Authentication: AWS OIDC Federated Role Assumption with short-lived STS tokens',
      'Build Matrix: Multi-stage Dockerfile optimizing layers down to ~65MB distroless base',
      'Image Security: Amazon ECR immutable image tags + Trivy CVE vulnerability scan gating',
      'Deployment Target: AWS ECS Fargate cluster with Application Load Balancer target groups',
      'Rollback Guard: CloudWatch alarming triggers automatic rollback if 5xx error rate exceeds 1% during rolling updates'
    ],
    techStack: ['GitHub Actions', 'AWS OIDC', 'Docker BuildKit', 'Amazon ECR', 'Amazon ECS Fargate', 'Trivy', 'CloudWatch'],
    iacSnippet: {
      filename: '.github/workflows/deploy.yml',
      language: 'yaml',
      code: `- name: Configure AWS Credentials (OIDC)
  uses: aws-actions/configure-aws-credentials@v4
  with:
    role-to-assume: arn:aws:iam::123456789012:role/GitHubActionsECSPipeline
    aws-region: us-east-1
    audience: sts.amazonaws.com

- name: Build and Push Docker image to ECR
  uses: docker/build-push-action@v5
  with:
    context: .
    push: true
    tags: \${{ steps.login-ecr.outputs.registry }}/app:\${{ github.sha }}
    cache-from: type=gha
    cache-to: type=gha,mode=max`
    },
    metrics: [
      { label: 'Pipeline Duration', value: '4m 12s' },
      { label: 'Image Size Reduction', value: '72%' },
      { label: 'Human Intervention', value: '0 Clicks' },
      { label: 'Rollback Speed', value: '< 45s' }
    ],
    githubUrl: 'https://github.com/expertnafees-hub/docker-cicd-pipeline'
  },
  {
    id: 'eks-microservices',
    projectNumber: 'PROJECT_04',
    tag: 'ORCHESTRATION',
    tagColor: 'primary',
    title: 'Amazon EKS Microservices Deployment & Observability',
    summary: 'Container orchestrator running on managed nodes. Integrates AWS Load Balancer Controller for dynamic TargetGroupBindings, AWS Secrets Manager sidecars, and fluent-bit logging.',
    fullDescription: 'Production Kubernetes deployment on Amazon EKS v1.29. Provisioned with managed node groups across two Availability Zones, utilizing IAM Roles for Service Accounts (IRSA) for least-privilege pod permissions. Ingress is governed dynamically by the AWS Load Balancer Controller. Full-stack observability is established via Fluent Bit log shippers pushing to Amazon CloudWatch Container Insights and Prometheus/Grafana monitoring dashboards.',
    metadata: [
      { icon: 'hub', label: 'EKS v1.29 Cluster', highlightColor: 'primary' },
      { icon: 'call_split', label: 'AWS ALB Ingress Controller', highlightColor: 'secondary' },
      { icon: 'vpn_key', label: 'IRSA Pod Security', highlightColor: 'tertiary' },
      { icon: 'monitoring', label: 'CloudWatch Container Insights', highlightColor: 'primary' },
    ],
    architectureOverview: [
      'Compute Fleet: EKS Managed Node Groups with Karpenter auto-provisioning',
      'Ingress Routing: AWS Load Balancer Controller provisioning Layer 7 ALBs per ingress manifest',
      'Identity: IRSA granting pods native IAM credentials without node-level instance profiles',
      'Secret Management: External Secrets Operator syncing credentials from AWS Secrets Manager',
      'Telemetry: Fluent Bit log streaming with JSON structured logs and Prometheus metric scrapers'
    ],
    techStack: ['Amazon EKS', 'Kubernetes', 'Helm', 'AWS Load Balancer Controller', 'IRSA', 'Fluent Bit', 'Prometheus'],
    iacSnippet: {
      filename: 'eks_cluster.tf',
      language: 'hcl',
      code: `module "eks" {
  source  = "terraform-aws-modules/eks/aws"
  version = "~> 20.0"

  cluster_name    = "prod-microservices-fleet"
  cluster_version = "1.29"

  vpc_id     = module.vpc.vpc_id
  subnet_ids = module.vpc.private_subnets

  cluster_endpoint_public_access = true

  eks_managed_node_groups = {
    primary = {
      min_size     = 2
      max_size     = 6
      desired_size = 3
      instance_types = ["t3.medium"]
      capacity_type  = "ON_DEMAND"
    }
  }
}`
    },
    metrics: [
      { label: 'Node Autoscaling', value: '2-6 Nodes' },
      { label: 'Ingress Latency', value: '18ms' },
      { label: 'Security Context', value: 'Non-Root' },
      { label: 'Log Ingestion', value: 'Real-time' }
    ],
    githubUrl: 'https://github.com/expertnafees-hub/aws-networking-labs'
  }
];

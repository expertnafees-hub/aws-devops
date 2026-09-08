import { ProjectCaseStudy } from '../types';

export const projectsData: ProjectCaseStudy[] = [
  {
    id: 'three-tier-architecture',
    projectNumber: 'PROJECT_01',
    tag: 'PRODUCTION SPEC',
    tagColor: 'tertiary',
    title: 'Production AWS Three-Tier Architecture',
    summary: 'Designed and provisioned a fault-tolerant, highly scalable three-tier web application architecture across 2 Availability Zones. Built with complete separation of public web, private compute, and isolated database subnets.',
    fullDescription: 'A multi-tier cloud infrastructure blueprint engineered according to the AWS Well-Architected Framework. Traffic enters via Amazon Route 53 with DNS latency routing and Amazon CloudFront Edge locations. An internet-facing Application Load Balancer distributes requests across stateless EC2 compute instances residing in private subnets across two AZs. An Auto Scaling Group (ASG) dynamically provisions instances based on CPU and request latency metrics. The database layer consists of an Amazon Aurora Multi-AZ MySQL cluster stationed in isolated data subnets with zero internet ingress or egress routing.',
    metadata: [
      { icon: 'domain', label: '2 Availability Zones', highlightColor: 'secondary' },
      { icon: 'hub', label: '6 Segmented Subnets', highlightColor: 'primary' },
      { icon: 'speed', label: 'Auto Scaling (2-6 nodes)', highlightColor: 'tertiary' },
      { icon: 'storage', label: 'Private Multi-AZ Aurora', highlightColor: 'secondary' },
    ],
    architectureOverview: [
      'Edge Tier: Route 53 DNS + CloudFront CDN + AWS WAF (Web Application Firewall)',
      'Public Web Tier: 2 Public Subnets with Internet Gateway and Dual-AZ redundant NAT Gateways',
      'Private Compute Tier: 2 Private Subnets housing EC2 ASG nodes running custom AMI systemd services',
      'Data Tier: 2 Isolated Subnets housing Amazon Aurora MySQL Multi-AZ cluster with KMS encryption',
      'Security: Granular Security Groups enforcing strict least-privilege protocol & port isolation'
    ],
    techStack: ['AWS VPC', 'Route 53', 'CloudFront', 'ALB', 'EC2 Auto Scaling', 'Amazon Aurora Multi-AZ', 'KMS', 'Terraform'],
    iacSnippet: {
      filename: 'three_tier_vpc.tf',
      language: 'hcl',
      code: `module "vpc" {
  source  = "terraform-aws-modules/vpc/aws"
  version = "~> 5.0"

  name = "production-three-tier-vpc"
  cidr = "10.0.0.0/16"

  azs              = ["us-east-1a", "us-east-1b"]
  public_subnets   = ["10.0.1.0/24", "10.0.2.0/24"]
  private_subnets  = ["10.0.10.0/24", "10.0.11.0/24"]
  database_subnets = ["10.0.20.0/24", "10.0.21.0/24"]

  enable_nat_gateway     = true
  single_nat_gateway     = false
  one_nat_gateway_per_az = true
  enable_vpn_gateway     = false

  create_database_subnet_route_table     = true
  create_database_internet_gateway_route = false

  tags = {
    Environment = "production"
    Tier        = "3-tier-core"
  }
}`
    },
    metrics: [
      { label: 'Uptime SLA', value: '99.99%' },
      { label: 'Subnet Count', value: '6 Subnets' },
      { label: 'Failover RTO', value: '< 30s' },
      { label: 'Public IP Exposure', value: 'ALB Only' }
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

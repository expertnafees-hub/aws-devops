import { StackDomain } from '../types';

export const stackData: StackDomain[] = [
  {
    id: 'cloud-infra',
    title: 'Cloud Infrastructure',
    icon: 'cloud',
    accentColor: 'primary',
    description: 'AWS production topology with multi-tier isolation, least-privilege identity, and high-availability patterns.',
    skills: [
      { name: 'Amazon EC2', status: 'proficient', highlight: true },
      { name: 'Amazon VPC', status: 'proficient', highlight: true },
      { name: 'AWS IAM', status: 'proficient', highlight: true },
      { name: 'Amazon S3', status: 'proficient', highlight: true },
      { name: 'CloudFront', status: 'proficient', highlight: true },
      { name: 'Route 53', status: 'proficient', highlight: true },
      { name: 'Amazon RDS Aurora', status: 'proficient', highlight: true },
      { name: 'AWS KMS', status: 'proficient' },
      { name: 'CloudWatch', status: 'proficient', highlight: true },
      { name: 'AWS WAF', status: 'learning' },
      { name: 'AWS Secrets Manager', status: 'proficient' }
    ]
  },
  {
    id: 'iac',
    title: 'Infrastructure as Code',
    icon: 'code_blocks',
    accentColor: 'secondary',
    description: 'Declarative lifecycle management, zero-drift remote states, reusable modular packages, and testing.',
    skills: [
      { name: 'Terraform v1.8+', status: 'proficient', highlight: true },
      { name: 'HCL Modules', status: 'proficient', highlight: true },
      { name: 'Remote S3 State', status: 'proficient', highlight: true },
      { name: 'DynamoDB State Locks', status: 'proficient', highlight: true },
      { name: 'AWS CloudFormation', status: 'learning' },
      { name: 'tfsec Security Lint', status: 'proficient' },
      { name: 'tflint', status: 'proficient' },
      { name: 'Terragrunt', status: 'learning' },
      { name: 'OpenTofu', status: 'planned' }
    ]
  },
  {
    id: 'containers',
    title: 'Containers & Kubernetes',
    icon: 'developer_board',
    accentColor: 'tertiary',
    description: 'Multi-stage container builds, vulnerability scans, ingress controllers, and cluster operations.',
    skills: [
      { name: 'Docker BuildKit', status: 'proficient', highlight: true },
      { name: 'Kubernetes v1.29', status: 'proficient', highlight: true },
      { name: 'Amazon ECS Fargate', status: 'proficient', highlight: true },
      { name: 'Amazon EKS', status: 'proficient', highlight: true },
      { name: 'Helm 3 Charts', status: 'learning' },
      { name: 'Amazon ECR', status: 'proficient', highlight: true },
      { name: 'Distroless Bases', status: 'proficient' },
      { name: 'Trivy Scanning', status: 'proficient' }
    ]
  },
  {
    id: 'cicd',
    title: 'CI/CD & Delivery',
    icon: 'rocket_launch',
    accentColor: 'primary',
    description: 'Automated delivery cycles, pre-flight linting, container scanning, and zero-downtime blue/green rollouts.',
    skills: [
      { name: 'GitHub Actions', status: 'proficient', highlight: true },
      { name: 'AWS OIDC Role Assumption', status: 'proficient', highlight: true },
      { name: 'Automated Rollbacks', status: 'proficient', highlight: true },
      { name: 'Semantic Versioning', status: 'proficient' },
      { name: 'Argo CD (GitOps)', status: 'learning' },
      { name: 'ShellCheck', status: 'proficient' },
      { name: 'PyTest Matrix', status: 'proficient' }
    ]
  },
  {
    id: 'systems',
    title: 'Systems & Networking',
    icon: 'terminal',
    accentColor: 'secondary',
    description: 'Linux kernel concepts, systemd services, routing tables, security groups, and packet inspection.',
    skills: [
      { name: 'Ubuntu Server', status: 'proficient', highlight: true },
      { name: 'Amazon Linux 2023', status: 'proficient', highlight: true },
      { name: 'Bash Scripting', status: 'proficient', highlight: true },
      { name: 'CIDR Subnetting', status: 'proficient', highlight: true },
      { name: 'TLS / SSL Certificates', status: 'proficient' },
      { name: 'SSH Key Management', status: 'proficient' },
      { name: 'systemd Services', status: 'proficient' },
      { name: 'iptables / Security Groups', status: 'proficient' }
    ]
  },
  {
    id: 'automation',
    title: 'Automation & Event Loops',
    icon: 'psychology',
    accentColor: 'tertiary',
    description: 'Translating operational requirements into cloud event triggers, auto-remediations, and API integrations.',
    skills: [
      { name: 'Python 3', status: 'proficient', highlight: true },
      { name: 'Boto3 (AWS SDK)', status: 'proficient', highlight: true },
      { name: 'AWS EventBridge', status: 'proficient', highlight: true },
      { name: 'AWS Lambda (Serverless)', status: 'learning' },
      { name: 'REST APIs & Webhooks', status: 'proficient' },
      { name: 'CloudWatch Alarms', status: 'proficient', highlight: true },
      { name: 'Synthetic Canaries', status: 'learning' }
    ]
  }
];

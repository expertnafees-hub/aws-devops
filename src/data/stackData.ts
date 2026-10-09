import { StackDomain } from '../types';

export const stackData: StackDomain[] = [
  {
    id: 'cloud-infra', title: 'Cloud Infrastructure', icon: 'cloud', accentColor: 'primary',
    description: 'Core AWS services configured in infrastructure code and deployed via automated workflows.',
    skills: [
      { name: 'Amazon VPC', status: 'project-use' }, { name: 'Amazon EC2 / ALB', status: 'project-use' },
      { name: 'AWS IAM', status: 'project-use' }, { name: 'Amazon S3', status: 'project-use', highlight: true },
      { name: 'CloudFront', status: 'project-use', highlight: true }, { name: 'RDS MySQL', status: 'project-use' },
      { name: 'Secrets Manager', status: 'project-use' },
    ],
  },
  {
    id: 'iac', title: 'Infrastructure as Code', icon: 'code_blocks', accentColor: 'secondary',
    description: 'Modular Terraform architecture, provider schema validation, and S3 remote state management.',
    skills: [
      { name: 'Terraform / HCL', status: 'project-use', highlight: true }, { name: 'Terraform Modules', status: 'project-use' },
      { name: 'CloudFormation', status: 'project-use' }, { name: 'tfsec', status: 'project-use' },
      { name: 'S3 Remote State / Locking', status: 'learning' }, { name: 'Deployment & Restore Tests', status: 'planned' },
    ],
  },
  {
    id: 'containers', title: 'Containers & Kubernetes', icon: 'developer_board', accentColor: 'tertiary',
    description: 'Container builds, Docker image security scanning, Amazon ECR publishing, and EKS platform configuration.',
    skills: [
      { name: 'Docker', status: 'project-use', highlight: true }, { name: 'Amazon ECR', status: 'project-use', highlight: true },
      { name: 'Amazon EKS Configuration', status: 'project-use' }, { name: 'Helm Configuration', status: 'project-use' },
      { name: 'Kubernetes Operations', status: 'learning' }, { name: 'Container Rollbacks', status: 'planned' },
    ],
  },
  {
    id: 'cicd', title: 'CI/CD & Delivery', icon: 'rocket_launch', accentColor: 'primary',
    description: 'Automated GitHub Actions workflows with keyless AWS OIDC authentication and quality gates.',
    skills: [
      { name: 'GitHub Actions', status: 'project-use', highlight: true }, { name: 'AWS OIDC', status: 'project-use', highlight: true },
      { name: 'Trivy', status: 'project-use' }, { name: 'Pytest', status: 'project-use' },
      { name: 'GitOps Workflows', status: 'learning' }, { name: 'Runtime Deployments', status: 'planned' },
    ],
  },
  {
    id: 'systems', title: 'Systems & Networking', icon: 'terminal', accentColor: 'secondary',
    description: 'Linux systems administration, networking fundamentals, shell automation, and EC2 bootstrapping.',
    skills: [
      { name: 'Bash Scripts', status: 'project-use' }, { name: 'EC2 Bootstrap', status: 'project-use' },
      { name: 'CIDR & Routes', status: 'learning' }, { name: 'DNS / TLS', status: 'learning' },
      { name: 'Linux Namespaces & cgroups', status: 'learning' }, { name: 'Incident Troubleshooting', status: 'planned' },
    ],
  },
  {
    id: 'automation', title: 'Application & Observability', icon: 'psychology', accentColor: 'tertiary',
    description: 'Python automation scripts, CloudWatch metric alarms, and infrastructure observability.',
    skills: [
      { name: 'Python', status: 'project-use' }, { name: 'TypeScript', status: 'project-use' },
      { name: 'CloudWatch Alarms', status: 'project-use' }, { name: 'Health Check Probes', status: 'learning' },
      { name: 'Metric Dashboards', status: 'planned' },
    ],
  },
];

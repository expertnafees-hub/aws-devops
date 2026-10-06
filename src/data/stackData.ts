import { StackDomain } from '../types';

// Project use means public code or a recorded workflow, not assessed mastery or production experience.
export const stackData: StackDomain[] = [
  {
    id: 'cloud-infra', title: 'Cloud Infrastructure', icon: 'cloud', accentColor: 'primary',
    description: 'AWS resources used in project configuration; S3 and CloudFront delivery have a recorded run.',
    skills: [
      { name: 'Amazon VPC', status: 'project-use' }, { name: 'Amazon EC2 / ALB', status: 'project-use' },
      { name: 'AWS IAM', status: 'project-use' }, { name: 'Amazon S3', status: 'project-use', highlight: true },
      { name: 'CloudFront', status: 'project-use', highlight: true }, { name: 'RDS MySQL', status: 'project-use' },
      { name: 'Secrets Manager', status: 'project-use' },
    ],
  },
  {
    id: 'iac', title: 'Infrastructure as Code', icon: 'code_blocks', accentColor: 'secondary',
    description: 'Terraform configuration, reusable EKS modules, and schema validation. Shared state and deployment tests remain learning milestones.',
    skills: [
      { name: 'Terraform / HCL', status: 'project-use', highlight: true }, { name: 'Terraform Modules', status: 'project-use' },
      { name: 'CloudFormation', status: 'project-use' }, { name: 'tfsec', status: 'project-use' },
      { name: 'S3 Remote State / Locking', status: 'learning' }, { name: 'Deployment and Restore Tests', status: 'planned' },
    ],
  },
  {
    id: 'containers', title: 'Containers & Kubernetes', icon: 'developer_board', accentColor: 'tertiary',
    description: 'Container builds and image publication are recorded. EKS and Helm configuration is available; cloud cluster operations are pending.',
    skills: [
      { name: 'Docker', status: 'project-use', highlight: true }, { name: 'Amazon ECR', status: 'project-use', highlight: true },
      { name: 'Amazon EKS Configuration', status: 'project-use' }, { name: 'Helm Configuration', status: 'project-use' },
      { name: 'Kubernetes Operations', status: 'learning' }, { name: 'Container Rollback Validation', status: 'planned' },
    ],
  },
  {
    id: 'cicd', title: 'CI/CD & Delivery', icon: 'rocket_launch', accentColor: 'primary',
    description: 'Public GitHub Actions workflows with recorded AWS OIDC, website delivery, and image publication.',
    skills: [
      { name: 'GitHub Actions', status: 'project-use', highlight: true }, { name: 'AWS OIDC', status: 'project-use', highlight: true },
      { name: 'Trivy', status: 'project-use' }, { name: 'Pytest', status: 'project-use' },
      { name: 'GitOps Integration', status: 'learning' }, { name: 'Runtime Deployment', status: 'planned' },
    ],
  },
  {
    id: 'systems', title: 'Systems & Networking', icon: 'terminal', accentColor: 'secondary',
    description: 'Networking fundamentals and Linux troubleshooting practice, with Bash and bootstrap scripts in project code.',
    skills: [
      { name: 'Bash Scripts', status: 'project-use' }, { name: 'EC2 Bootstrap', status: 'project-use' },
      { name: 'CIDR and Routes', status: 'learning' }, { name: 'DNS / TLS', status: 'learning' },
      { name: 'Linux Processes and Permissions', status: 'learning' }, { name: 'Incident Troubleshooting', status: 'planned' },
    ],
  },
  {
    id: 'automation', title: 'Application & Observability', icon: 'psychology', accentColor: 'tertiary',
    description: 'API code and CloudWatch alarm configuration. Operational measurements and recovery evidence are future work.',
    skills: [
      { name: 'Python API Code', status: 'project-use' }, { name: 'TypeScript', status: 'project-use' },
      { name: 'CloudWatch Alarm Code', status: 'project-use' }, { name: 'Request Probes', status: 'learning' },
      { name: 'Recovery Measurements', status: 'planned' },
    ],
  },
];

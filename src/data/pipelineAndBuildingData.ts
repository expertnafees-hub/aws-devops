import { PipelineStep, EngineeringPrinciple, CurriculumItem } from '../types';

export const pipelineSteps: PipelineStep[] = [
  {
    stepNumber: '01',
    name: 'CODE',
    subtext: 'Feature branch',
    badge: 'LOCAL DEV',
    badgeColor: 'secondary',
    icon: 'code',
    details: [
      'Modular branch creation: feature/vpc-subnets-v2',
      'Local pre-commit hooks running formatters',
      'tflint & terraform fmt validation checks'
    ]
  },
  {
    stepNumber: '02',
    name: 'GIT',
    subtext: 'PR Review',
    badge: 'PEER AUDIT',
    badgeColor: 'primary',
    icon: 'merge',
    details: [
      'Automated Pull Request triggers CI lint runner',
      'Branch protection rules enforcing 1+ approval',
      'Automated terraform plan output posted as PR comment'
    ]
  },
  {
    stepNumber: '03',
    name: 'CI / TEST',
    subtext: 'PyTest / Lint',
    badge: 'TEST PASS',
    badgeColor: 'tertiary',
    icon: 'fact_check',
    details: [
      'Python unit testing with PyTest & coverage check',
      'ShellCheck static bash script verification',
      'Flake8 & Black code compliance tests'
    ]
  },
  {
    stepNumber: '04',
    name: 'BUILD',
    subtext: 'Docker Layered',
    badge: 'BUILDKIT',
    badgeColor: 'secondary',
    icon: 'inventory_2',
    details: [
      'Multi-stage Docker build with GitHub Actions cache',
      'Distroless minimal runtime reducing layer size',
      'Deterministic SHA-256 digest tagging'
    ]
  },
  {
    stepNumber: '05',
    name: 'SCAN',
    subtext: 'Trivy / tfsec',
    badge: 'ZERO CRITICAL',
    badgeColor: 'tertiary',
    icon: 'shield',
    details: [
      'Trivy container image CVE vulnerability audit',
      'tfsec static security audit on IaC resources',
      'Blocking build if CRITICAL or HIGH CVE is discovered'
    ]
  },
  {
    stepNumber: '06',
    name: 'DEPLOY',
    subtext: 'AWS ECS/EKS',
    badge: 'ROLLING ZERO-DOWNTIME',
    badgeColor: 'primary',
    icon: 'rocket',
    details: [
      'OIDC authenticated deployment to AWS ECS Fargate',
      'New task definitions registered and drained smoothly',
      'ALB target health verification before traffic switch'
    ]
  },
  {
    stepNumber: '07',
    name: 'OBSERVE',
    subtext: 'CloudWatch Alarms',
    badge: 'SYNTHETIC 24/7',
    badgeColor: 'tertiary',
    icon: 'monitoring',
    details: [
      'CloudWatch Metric Alarms tracking 5xx rates & latency',
      'Automated rollback triggered if failure rate > 1%',
      'Slack/Email alert dispatch via SNS topic'
    ]
  }
];

export const principlesData: EngineeringPrinciple[] = [
  {
    id: 'p1',
    number: 'PRINCIPLE_01',
    title: 'Automate Repetitive Work',
    quote: '“If it needs to happen repeatedly, automate it.”',
    body: 'Manual configuration drifts, decays, and introduces human error during high-stress outages. Automated systems ensure predictable, repeatable outcomes every single time.',
    footerTag: 'ZERO MANUAL CLICKS',
    color: 'primary'
  },
  {
    id: 'p2',
    number: 'PRINCIPLE_02',
    title: 'Infrastructure as Code',
    quote: '“Infrastructure should be version-controlled, reviewable, and reproducible.”',
    body: 'If a configuration does not exist in Git, it does not exist in production. Declarative state files guarantee that staging matches production without drift.',
    footerTag: '100% DECLARATIVE HCL',
    color: 'secondary'
  },
  {
    id: 'p3',
    number: 'PRINCIPLE_03',
    title: 'Reliability Over Complexity',
    quote: '“Good systems aren’t the ones with the most technologies. They’re the ones that continue running predictably when components fail.”',
    body: 'Over-engineered distributed architectures multiply failure domains. Clean boundaries, redundant AZs, and clear recovery paths outperform complex topologies.',
    footerTag: 'LEAN ARCHITECTURES',
    color: 'tertiary'
  },
  {
    id: 'p4',
    number: 'PRINCIPLE_04',
    title: 'Security by Default',
    quote: '“Least privilege IAM, private networking by default, zero secrets in plain text, and strict ingress/egress boundaries.”',
    body: 'Security is not an audit checkpoint before release; it is an architectural invariant. Air-gapped databases and short-lived OIDC tokens eliminate attack vectors.',
    footerTag: 'ZERO TRUST NETWORK',
    color: 'primary'
  }
];

export const curriculumData: CurriculumItem[] = [
  {
    id: 'c1',
    folder: 'linux-systems/',
    details: 'kernel namespaces, systemd services, POSIX ACLs, signal handling',
    status: 'ACTIVE',
    statusColor: 'tertiary'
  },
  {
    id: 'c2',
    folder: 'networking/',
    details: 'CIDR subnet allocation, route tables, NAT gateways, TCP 3-way handshake',
    status: 'ACTIVE',
    statusColor: 'tertiary'
  },
  {
    id: 'c3',
    folder: 'aws-core-services/',
    details: 'VPC, IAM trust policies, ALB target groups, RDS Multi-AZ Aurora',
    status: 'ACTIVE',
    statusColor: 'tertiary'
  },
  {
    id: 'c4',
    folder: 'terraform-modules/',
    details: 'reusable templates, workspaces, remote S3 locking with DynamoDB',
    status: 'ACTIVE',
    statusColor: 'tertiary'
  },
  {
    id: 'c5',
    folder: 'docker-microservices/',
    details: 'distroless images, multi-stage caching, vulnerability scanning with Trivy',
    status: 'IN PROGRESS',
    statusColor: 'primary'
  },
  {
    id: 'c6',
    folder: 'ci-cd-automation/',
    details: 'GitHub Actions runners, AWS OIDC authentication, automated rollback gates',
    status: 'ACTIVE',
    statusColor: 'tertiary'
  },
  {
    id: 'c7',
    folder: 'kubernetes-orchestration/',
    details: 'EKS v1.29, AWS Load Balancer Controller, Helm charts, Karpenter',
    status: 'UPCOMING',
    statusColor: 'secondary'
  }
];

export const activeCurriculumTree = curriculumData;

import { MilestoneNode } from '../types';

export const journeyMilestones: MilestoneNode[] = [
  {
    id: 'step-01',
    number: '01',
    title: 'AI Automation & Workflows',
    subtitle: 'Python • API Orchestrations • Agent Logic • Event-driven bots',
    status: 'COMPLETED',
    statusType: 'completed',
    color: 'primary'
  },
  {
    id: 'step-02',
    number: '02',
    title: 'Linux Systems & Networking',
    subtitle: 'Kernel Permissions • POSIX ACLs • CIDR Subnets • Bash Automation',
    status: 'CORE BASE',
    statusType: 'core',
    color: 'secondary'
  },
  {
    id: 'step-03',
    number: '03',
    title: 'AWS Cloud Architecture & IaC',
    subtitle: 'Terraform Modules • Multi-AZ VPC • IAM Security • S3 • RDS Aurora',
    status: 'PRODUCTION',
    statusType: 'production',
    color: 'primary'
  },
  {
    id: 'step-04',
    number: '04',
    title: 'DevOps & Continuous Delivery',
    subtitle: 'Docker • K8s/ECS • GitHub Actions • CloudWatch Observability',
    status: 'ACTIVE FOCUS',
    statusType: 'active',
    color: 'tertiary'
  }
];

export const journeyStory = {
  eyebrow: 'Evolution Track',
  title: 'From AI Automation to Cloud Infrastructure',
  p1: 'I began in AI Automation Engineering, orchestrating complex multi-agent workflows, writing Python integrations, and automating business logic via APIs. That foundation gave me a keen instinct for failure modes and pipeline bottlenecks.',
  p2: 'Recognizing that automated workflows are only as resilient as the infrastructure supporting them, I transitioned directly into Linux systems, cloud engineering, Infrastructure as Code, and automated deployment architectures on AWS.',
  philosophyShift: '"Code that executes without deterministic, reproducible cloud environments is technical debt. Infrastructure as Code resolves the contract."'
};

import { MilestoneNode } from '../types';

export const journeyMilestones: MilestoneNode[] = [
  { id: 'step-01', number: '01', title: 'Python & Scripting Baseline', subtitle: 'API integration, testing, and script automation', status: 'FOUNDATION', statusType: 'completed', color: 'secondary' },
  { id: 'step-02', number: '02', title: 'Linux & Systems Networking', subtitle: 'Processes, namespaces, routing, and system diagnostics', status: 'CORE SKILLS', statusType: 'core', color: 'secondary' },
  { id: 'step-03', number: '03', title: 'AWS Cloud & Infrastructure as Code', subtitle: 'Terraform modules, VPC topologies, IAM, ALB, EC2, and RDS', status: 'HANDS-ON LABS', statusType: 'core', color: 'primary' },
  { id: 'step-04', number: '04', title: 'CI/CD & Cloud Delivery Pipelines', subtitle: 'Keyless OIDC workflows, container builds, ECR publishing, and EKS', status: 'ACTIVE FOCUS', statusType: 'active', color: 'tertiary' },
];

export const journeyStory = {
  eyebrow: 'Career Journey',
  title: 'Engineering Evolution & Cloud Focus',
  p1: 'My journey began with software automation and scripting, which naturally expanded into a focus on the infrastructure supporting scalable systems: Linux internals, networking, cloud identity, and repeatable automation.',
  p2: 'Today, I build practical AWS infrastructure and automated CI/CD pipelines using Terraform, Docker, and GitHub Actions, focusing on security best practices like least-privilege IAM and keyless OIDC authentication.',
  philosophyShift: '“Automate everything with code, enforce security from the start, and verify every pipeline run.”',
};

import { MilestoneNode } from '../types';

export const journeyMilestones: MilestoneNode[] = [
  { id: 'step-01', number: '01', title: 'Automation Background', subtitle: 'Python integrations and API workflows', status: 'BACKGROUND', statusType: 'completed', color: 'secondary' },
  { id: 'step-02', number: '02', title: 'Linux & Networking', subtitle: 'Processes, permissions, routes, and troubleshooting', status: 'LEARNING', statusType: 'core', color: 'secondary' },
  { id: 'step-03', number: '03', title: 'AWS Infrastructure & IaC', subtitle: 'Terraform labs, IAM, VPC, ALB, EC2, and RDS configuration', status: 'PROJECT CODE', statusType: 'core', color: 'primary' },
  { id: 'step-04', number: '04', title: 'Delivery & Operations', subtitle: 'Recorded S3 / ECR publication; runtime and recovery tests next', status: 'CURRENT FOCUS', statusType: 'active', color: 'tertiary' },
];

export const journeyStory = {
  eyebrow: 'Learning progression', title: 'From Automation to AWS DevOps',
  p1: 'My automation background led me to study the infrastructure that supports applications: Linux, networking, cloud identity, and repeatable delivery.',
  p2: 'I am building these skills through public AWS and Terraform labs. The portfolio links successful website and image publication runs, while stating which deployment and recovery tests remain unfinished.',
  philosophyShift: '“A useful project shows what works, what was measured, and what needs the next experiment.”',
};

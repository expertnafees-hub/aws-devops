import { Certification } from '../types';

export const certificationsData: Certification[] = [
  {
    id: 'aws-saa-study',
    title: 'AWS Certified Solutions Architect – Associate (SAA-C03)',
    badge: 'CERTIFICATION IN PROGRESS',
    status: 'IN_PROGRESS',
    description: 'Active preparation covering resilient AWS architectures, VPC design, high availability, IAM security, and cost optimization. Target examination: late 2026.',
    studyAreas: ['VPC & Multi-AZ Networking', 'IAM & Security Controls', 'Resilient Compute & Storage', 'Cost Optimization'],
  },
  {
    id: 'terraform-study',
    title: 'HashiCorp Certified: Terraform Associate',
    badge: 'CURRICULUM COMPLETED',
    status: 'CURRICULUM_COMPLETED',
    description: 'Completed comprehensive Terraform curriculum covering Infrastructure as Code workflow fundamentals, reusable modules, state management, and configuration validation.',
    studyAreas: ['Terraform CLI & Workflow', 'Reusable Modules & Variables', 'S3 State & Locking', 'Configuration Validation'],
  },
  {
    id: 'linux-networking',
    title: 'Linux Systems Administration & Cloud Networking',
    badge: 'FOUNDATIONAL PRACTICE',
    status: 'IN_PROGRESS',
    description: 'Practical study and lab exercises in Linux systems administration, shell automation, POSIX scripting, IP CIDR subnetting, and network troubleshooting.',
    studyAreas: ['Bash & Shell Automation', 'Linux Permissions & Systemd', 'CIDR Subnetting & Routing', 'Network Diagnostics'],
  },
];

export const certifications = certificationsData;

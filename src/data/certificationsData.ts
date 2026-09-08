import { Certification } from '../types';

export const certificationsData: Certification[] = [
  {
    id: 'aws-csaa',
    title: 'AWS Certified Solutions Architect – Associate (SAA-C03)',
    badge: 'TARGET CREDENTIAL',
    description: 'Comprehensive mastery of AWS architectural design patterns, multi-tier high availability, VPC security, and cost optimization.',
    hash: '#AWS-VERIFY-READY',
    targetDate: 'Target Completion: Q2 2025',
    status: 'TARGET',
    domains: [
      { name: 'Design Secure Architectures', percentage: 30 },
      { name: 'Design Resilient Architectures', percentage: 26 },
      { name: 'Design High-Performing Architectures', percentage: 24 },
      { name: 'Design Cost-Optimized Architectures', percentage: 20 }
    ]
  },
  {
    id: 'hashicorp-terraform',
    title: 'HashiCorp Certified: Terraform Associate (003)',
    badge: 'INFRASTRUCTURE AS CODE',
    description: 'In-depth mastery of IaC principles, state management, module authoring, dynamic blocks, and remote backend collaboration.',
    hash: '#TERRAFORM-ASSOC-ACTIVE',
    targetDate: 'Curriculum Completed',
    status: 'COMPLETED',
    domains: [
      { name: 'Understand IaC Concepts', percentage: 25 },
      { name: 'Terraform CLI & Workflow', percentage: 25 },
      { name: 'Modules, Variables & State', percentage: 30 },
      { name: 'Terraform Cloud & Security', percentage: 20 }
    ]
  },
  {
    id: 'linux-networking',
    title: 'Linux Systems Administration & Networking Foundation',
    badge: 'CORE SYSTEMS',
    description: 'Advanced Linux systems administration: systemd unit configurations, POSIX permissions, network namespaces, iptables, and Bash scripting.',
    hash: '#LINUX-CORE-VERIFIED',
    targetDate: 'Validated in Production',
    status: 'COMPLETED',
    domains: [
      { name: 'Kernel & Namespaces', percentage: 30 },
      { name: 'Networking & Subnets', percentage: 25 },
      { name: 'Security & Permissions', percentage: 25 },
      { name: 'Shell Automation', percentage: 20 }
    ]
  }
];

export const certifications = certificationsData;

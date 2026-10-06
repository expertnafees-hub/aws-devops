import { Certification } from '../types';

// Learning status is self-reported. An issued credential requires an issuer verification URL.
export const certificationsData: Certification[] = [
  {
    id: 'aws-saa-study', title: 'AWS Solutions Architect – Associate preparation',
    badge: 'CERTIFICATION STUDY', status: 'IN_PROGRESS',
    description: 'Studying AWS architecture, networking, identity, availability, and cost tradeoffs. An AWS certification has not been presented for verification.',
    studyAreas: ['VPC and IAM', 'Resilience and recovery', 'Storage and compute', 'Cost tradeoffs'],
  },
  {
    id: 'terraform-study', title: 'Terraform Associate coursework',
    badge: 'COURSEWORK', status: 'CURRICULUM_COMPLETED',
    description: 'Coursework completion is self-reported. Exam certification and an issuer verification link are pending; this is a learning milestone.',
    studyAreas: ['Terraform workflow', 'Modules and variables', 'State management', 'Configuration validation'],
  },
  {
    id: 'linux-networking', title: 'Linux and networking practice',
    badge: 'FOUNDATIONAL LEARNING', status: 'IN_PROGRESS',
    description: 'Ongoing practice with Linux processes, shell scripting, permissions, subnetting, and network troubleshooting. This is a study track, not an issued certification.',
    studyAreas: ['Bash and processes', 'Permissions', 'CIDR and routes', 'Troubleshooting'],
  },
];

export const certifications = certificationsData;

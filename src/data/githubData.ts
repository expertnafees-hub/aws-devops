import { GitRepository } from '../types';
import { githubProfileUrl } from './portfolioEvidence';

export const githubRepositories: GitRepository[] = [
  {
    name: 'aws-three-tier-architecture',
    description: 'High-availability 3-tier AWS architecture in modular Terraform (VPC, public ALB, private EC2 ASG, isolated RDS MySQL) with automated CI validation.',
    language: 'HCL', languageColor: '#844fba', branch: 'main',
    githubUrl: `${githubProfileUrl}/aws-three-tier-architecture`, status: 'Infrastructure lab / CI validation',
  },
  {
    name: 'gitops-platform-config',
    description: 'Security-hardened Helm charts and Argo CD manifests enforcing non-root runtime, read-only rootfs, and immutable SHA256 digest pinning.',
    language: 'YAML', languageColor: '#cb171e', branch: 'main',
    githubUrl: `${githubProfileUrl}/gitops-platform-config`, status: 'Security-hardened Helm & Argo CD',
  },
  {
    name: 'aws-devops',
    description: 'Production portfolio delivery platform built with React, Vite, and Tailwind; automated via GitHub Actions using keyless AWS OIDC, S3 sync, and CloudFront edge invalidation.',
    language: 'TypeScript', languageColor: '#3178c6', branch: 'main',
    githubUrl: `${githubProfileUrl}/aws-devops`, status: 'Live CloudFront deployment',
  },
  {
    name: 'aws-eks-terraform-platform',
    description: 'Modular Amazon EKS infrastructure in Terraform featuring VPC CNI, private API endpoint configuration, and IAM Roles for Service Accounts (IRSA).',
    language: 'HCL', languageColor: '#844fba', branch: 'main',
    githubUrl: `${githubProfileUrl}/aws-eks-terraform-platform`, status: 'Platform code / CI validation',
  },
];

export const publicRepositories = githubRepositories;

import { GitRepository } from '../types';
import { githubProfileUrl } from './portfolioEvidence';

export const githubRepositories: GitRepository[] = [
  {
    name: 'aws-devops',
    description: 'This portfolio: TypeScript build and infrastructure checks, with a recorded OIDC deployment to S3 and CloudFront invalidation.',
    language: 'TypeScript', languageColor: '#3178c6', branch: 'main',
    githubUrl: `${githubProfileUrl}/aws-devops`, status: 'Deployment run recorded',
  },
  {
    name: 'payment-api',
    description: 'Demo payment API with unit tests, a Trivy scan gate, and recorded OIDC image publication to Amazon ECR. Runtime deployment pending.',
    language: 'Python', languageColor: '#3572a5', branch: 'main',
    githubUrl: `${githubProfileUrl}/payment-api`, status: 'ECR publication recorded',
  },
  {
    name: 'aws-three-tier-architecture',
    description: 'Terraform lab for a public ALB, private Nginx EC2 fleet, and isolated RDS. CI validation recorded; database integration and deployment evidence pending.',
    language: 'HCL', languageColor: '#844fba', branch: 'main',
    githubUrl: `${githubProfileUrl}/aws-three-tier-architecture`, status: 'Infrastructure lab / CI validation',
  },
  {
    name: 'aws-eks-terraform-platform',
    description: 'Modular EKS foundation and add-on configuration, with a private cluster API and IRSA. Formatting and schema validation recorded; cloud tests pending.',
    language: 'HCL', languageColor: '#844fba', branch: 'main',
    githubUrl: `${githubProfileUrl}/aws-eks-terraform-platform`, status: 'Platform code / CI validation',
  },
  {
    name: 'gitops-core-api',
    description: 'Containerized API and release workflow for the GitOps project. The reviewed main CI run fails at Trivy; smoke tests were skipped.',
    language: 'Python', languageColor: '#3572a5', branch: 'main',
    githubUrl: `${githubProfileUrl}/gitops-core-api`, status: 'CI scan step needs investigation',
  },
  {
    name: 'gitops-platform-config',
    description: 'Helm and environment configuration paired with gitops-core-api. Cluster synchronization and promotion evidence pending.',
    language: 'YAML', languageColor: '#cb171e', branch: 'main',
    githubUrl: `${githubProfileUrl}/gitops-platform-config`, status: 'GitOps configuration / integration pending',
  },
  {
    name: 'aws-terraform-vpc-foundation',
    description: 'Foundational Terraform networking lab: one VPC, one public subnet, an internet gateway, and a route table.',
    language: 'HCL', languageColor: '#844fba', branch: 'main',
    githubUrl: `${githubProfileUrl}/aws-terraform-vpc-foundation`, status: 'Small networking lab / source available',
  },
];

export const publicRepositories = githubRepositories;

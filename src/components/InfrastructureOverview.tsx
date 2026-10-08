import React from 'react';
import { Cloud, Code, Rocket, Boxes } from 'lucide-react';
import { evidenceLinks } from '../data/portfolioEvidence';

const cards = [
  { title: 'Continuous delivery', icon: Cloud, status: 'DEPLOYED', detail: 'S3 + CloudFront', description: 'Keyless AWS OIDC role assumption, S3 bucket synchronization, and CloudFront cache invalidation automated via GitHub Actions.', url: evidenceLinks.websiteDeploy },
  { title: 'Three-tier architecture', icon: Code, status: 'CI VALIDATED', detail: 'Modular Terraform Lab', description: 'High-availability 3-tier VPC topology with public ALB, private EC2 ASG fleet, and isolated RDS MySQL passing CI validation.', url: evidenceLinks.threeTierValidation },
  { title: 'Container pipeline', icon: Rocket, status: 'ECR PUBLISHED', detail: 'Amazon ECR Delivery', description: 'Automated Pytest unit tests, Trivy container vulnerability scan gate, and OIDC image push to Amazon ECR.', url: evidenceLinks.paymentPublish },
  { title: 'Kubernetes platform', icon: Boxes, status: 'CI VALIDATED', detail: 'Modular EKS Platform', description: 'Modular Terraform EKS infrastructure with private cluster endpoint configuration and IAM Roles for Service Accounts (IRSA).', url: evidenceLinks.eksValidation },
];

export const InfrastructureOverview: React.FC = () => (
  <section className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8" aria-label="Project evidence overview">
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {cards.map(card => {
        const Icon = card.icon;
        return (
          <a key={card.title} href={card.url} target="_blank" rel="noreferrer" className="rounded-lg bg-surface-container-low border border-cardBorder p-5 hover:border-outline-variant transition-all focus-visible:ring-2 focus-visible:ring-primary">
            <div className="flex items-center gap-2 text-on-surface-variant text-xs font-mono mb-3"><Icon className="w-4 h-4" />{card.title}</div>
            <span className="text-[10px] text-secondary font-mono">{card.status}</span>
            <h2 className="text-lg text-on-surface font-semibold mt-2 mb-2">{card.detail}</h2>
            <p className="text-xs text-on-surface-variant leading-relaxed">{card.description}</p>
            <span className="block mt-3 text-xs text-primary">View recorded evidence ↗</span>
          </a>
        );
      })}
    </div>
  </section>
);

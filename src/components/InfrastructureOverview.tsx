import React from 'react';
import { Cloud, Code, Rocket, Boxes } from 'lucide-react';
import { evidenceLinks } from '../data/portfolioEvidence';

const cards = [
  { title: 'Website delivery', icon: Cloud, status: 'RUN RECORDED', detail: 'S3 + CloudFront', description: 'OIDC role assumption, website synchronization, and an invalidation request passed in the linked run.', url: evidenceLinks.websiteDeploy },
  { title: 'Terraform lab', icon: Code, status: 'CI VALIDATION', detail: 'Three-tier configuration', description: 'Formatting and schema checks passed. Database integration and AWS deployment evidence remain pending.', url: evidenceLinks.threeTierValidation },
  { title: 'Container delivery', icon: Rocket, status: 'PUSH RECORDED', detail: 'Amazon ECR', description: 'Tests, configured scan gate, OIDC authentication, and image publication passed. Runtime deployment is pending.', url: evidenceLinks.paymentPublish },
  { title: 'EKS platform', icon: Boxes, status: 'CODE / VALIDATION', detail: 'Platform lab', description: 'Foundation and add-on configuration is available. Cluster deployment and cloud acceptance tests are pending.', url: evidenceLinks.eksValidation },
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

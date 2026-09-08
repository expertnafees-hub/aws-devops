import React from 'react';
import { Cloud, Code, Rocket, Boxes } from 'lucide-react';

export const InfrastructureOverview: React.FC = () => {
  const cards = [
    {
      title: 'AWS Cloud Platform',
      icon: Cloud,
      status: 'OPERATIONAL',
      statusType: 'pulse',
      statusColor: 'text-tertiary bg-tertiary/10 border-tertiary/30',
      metric: '14 Services',
      description: 'Multi-AZ Resilient Architecture (VPC, ECS, RDS, CloudFront, Route53)'
    },
    {
      title: 'IaC Terraform',
      icon: Code,
      status: 'SYNCHRONIZED',
      statusType: 'static',
      statusColor: 'text-secondary bg-secondary/10 border-secondary/30',
      metric: 'v1.8+ Declarative',
      description: 'Remote S3 Backend with DynamoDB State Locking & KMS encryption'
    },
    {
      title: 'Automated CI/CD',
      icon: Rocket,
      status: '99.8% STABLE',
      statusType: 'static',
      statusColor: 'text-tertiary bg-tertiary/10 border-tertiary/30',
      metric: '4.2m Deploy',
      description: 'GitHub Actions, Docker BuildKit, Automated ECR push & ECS rollout'
    },
    {
      title: 'Docker & K8s',
      icon: Boxes,
      status: 'RUNNING',
      statusType: 'static',
      statusColor: 'text-primary bg-primary/10 border-primary/30',
      metric: 'ECS + EKS',
      description: 'Microservices containerization with zero-downtime blue/green rollouts'
    },
  ];

  return (
    <section
      className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8"
      aria-label="Infrastructure Telemetry Overview"
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {cards.map(card => {
          const Icon = card.icon;
          return (
            <div
              key={card.title}
              className="rounded-lg bg-surface-container-low border border-cardBorder p-5 hover:bg-surface-container hover:border-outline-variant transition-all shadow-sm flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <Icon className="w-4 h-4 text-outline" />
                    <span className="font-mono text-xs text-on-surface-variant">
                      {card.title}
                    </span>
                  </div>
                  <span
                    className={`flex items-center gap-1.5 px-2 py-0.5 rounded font-mono text-[10px] font-medium border ${card.statusColor}`}
                  >
                    {card.statusType === 'pulse' && (
                      <span className="w-1.5 h-1.5 rounded-full bg-tertiary animate-pulse"></span>
                    )}
                    <span>{card.status}</span>
                  </span>
                </div>
                <div className="text-xl sm:text-2xl text-on-surface font-semibold font-sans mb-1.5">
                  {card.metric}
                </div>
              </div>

              <div className="text-xs text-on-surface-variant leading-relaxed">
                {card.description}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

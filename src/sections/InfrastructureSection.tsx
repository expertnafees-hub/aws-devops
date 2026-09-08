import React from 'react';

export const InfrastructureSection: React.FC = () => {
  const telemetryCards = [
    {
      domain: 'AWS Cloud Platform',
      status: 'OPERATIONAL',
      statusColor: 'text-tertiary',
      ping: true,
      headline: '14 Services',
      description: 'Multi-AZ Resilient Architecture (VPC, ECS, RDS, CloudFront, Route 53)',
    },
    {
      domain: 'IaC Terraform',
      status: 'SYNCHRONIZED',
      statusColor: 'text-secondary',
      ping: false,
      headline: 'v1.8+ Declarative',
      description: 'Remote S3 Backend with DynamoDB State Locking & KMS encryption',
    },
    {
      domain: 'Automated CI/CD',
      status: '99.8% STABLE',
      statusColor: 'text-tertiary',
      ping: false,
      headline: '4.2m Deploy',
      description: 'GitHub Actions, Docker BuildKit, Automated ECR push & ECS rollout',
    },
    {
      domain: 'Docker & K8s',
      status: 'RUNNING',
      statusColor: 'text-primary',
      ping: false,
      headline: 'ECS + EKS',
      description: 'Microservices containerization with zero-downtime blue/green rollouts',
    },
  ];

  return (
    <section
      className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 border-b border-cardBorder"
      aria-label="Infrastructure Telemetry Overview"
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {telemetryCards.map(card => (
          <div
            key={card.domain}
            className="rounded-xl bg-surface-container-low border border-cardBorder p-5 hover:border-outline-variant hover:bg-surface-container transition-all shadow-sm group"
          >
            <div className="flex items-center justify-between mb-3">
              <span className="font-mono text-xs text-on-surface-variant font-medium">
                {card.domain}
              </span>
              <span
                className={`flex items-center gap-1.5 px-2 py-0.5 rounded bg-surface-container border border-cardBorder font-mono text-[10px] ${card.statusColor}`}
              >
                {card.ping && (
                  <span className="w-1.5 h-1.5 rounded-full bg-tertiary animate-pulse" />
                )}
                {card.status}
              </span>
            </div>

            <div className="text-xl sm:text-2xl font-bold font-sans text-on-surface mb-1.5 tracking-tight group-hover:text-primary transition-colors">
              {card.headline}
            </div>

            <div className="text-xs text-on-surface-variant font-sans leading-relaxed">
              {card.description}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

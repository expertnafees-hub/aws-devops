import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer
      className="w-full bg-surface-container-lowest border-t border-cardBorder select-none"
      role="contentinfo"
      aria-label="Site Footer"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Left Side: System Telemetry & Disclosures */}
        <div className="flex flex-wrap items-center justify-center md:justify-start gap-2 font-mono text-xs text-on-surface-variant">
          <span className="inline-flex items-center gap-1.5 text-tertiary font-medium">
            <span className="inline-block h-2 w-2 rounded-full bg-tertiary"></span>
            <span>System Normal</span>
          </span>
          <span className="text-outline-variant">•</span>
          <span>Built with React &amp; TypeScript</span>
          <span className="text-outline-variant">•</span>
          <span>Deployed on AWS</span>
          <span className="text-outline-variant">•</span>
          <span>IaC: Terraform</span>
          <span className="text-outline-variant">•</span>
          <span>CI/CD: GitHub Actions</span>
          <span className="text-outline-variant">•</span>
          <span className="text-primary font-medium">Pakistan → Global</span>
        </div>

        {/* Right Side: Version & Region Badge */}
        <div className="flex items-center gap-3 font-mono text-xs text-on-surface-variant">
          <span className="uppercase tracking-widest text-[10px]">Telemetry v2.4.0</span>
          <div className="px-2 py-0.5 rounded bg-surface-container border border-cardBorder font-mono text-xs text-secondary">
            us-east-1
          </div>
        </div>
      </div>
    </footer>
  );
};

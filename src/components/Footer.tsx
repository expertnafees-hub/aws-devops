import React from 'react';
import { evidenceLinks } from '../data/portfolioEvidence';

export const Footer: React.FC = () => (
  <footer className="w-full bg-surface-container-lowest border-t border-cardBorder" aria-label="Site footer">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex flex-col md:flex-row justify-between gap-4 text-xs text-on-surface-variant">
      <div className="space-y-1">
        <p className="font-medium text-on-surface">Nafees Ur Rehman · AWS DevOps Engineer</p>
        <p>Built with React &amp; TypeScript · Hosted on Amazon S3 &amp; CloudFront</p>
      </div>
      <div className="space-y-1 md:text-right">
        <a href={evidenceLinks.websiteDeploy} target="_blank" rel="noreferrer" className="text-primary hover:text-white">
          Verified AWS Deployment Pipeline ↗
        </a>
        <p className="text-[11px] text-outline">Automated deployment via GitHub Actions with keyless AWS OIDC</p>
      </div>
    </div>
  </footer>
);

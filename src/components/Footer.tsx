import React from 'react';
import { evidenceSnapshot, evidenceLinks } from '../data/portfolioEvidence';

export const Footer: React.FC = () => (
  <footer className="w-full bg-surface-container-lowest border-t border-cardBorder" aria-label="Site footer">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex flex-col md:flex-row justify-between gap-4 text-xs text-on-surface-variant">
      <div className="space-y-2">
        <p>Built with React &amp; TypeScript · AWS DevOps portfolio · Pakistan</p>
        <a href={evidenceLinks.websiteDeploy} target="_blank" rel="noreferrer" className="text-primary hover:text-white">Recorded AWS website deployment ↗</a>
      </div>
      <div className="space-y-2 md:text-right">
        <p>Evidence reviewed {evidenceSnapshot}</p>
        <p>Interactive examples and project records; current AWS health is not monitored here.</p>
      </div>
    </div>
  </footer>
);

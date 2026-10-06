import React from 'react';
import { evidenceSnapshot } from '../data/portfolioEvidence';

export const TopDiagnosticLine: React.FC = () => (
  <aside aria-label="Portfolio evidence snapshot" className="w-full bg-[#04070B] border-b border-cardBorder text-[11px] font-mono text-on-surface-variant py-2 px-4 sm:px-6">
    <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
      <span className="text-primary">AWS DEVOPS PORTFOLIO / PROJECTS &amp; LABS</span>
      <span>Evidence reviewed: {evidenceSnapshot}</span>
    </div>
  </aside>
);

import React from 'react';
import { Award, ExternalLink } from '../assets/icons';
import { Certification } from '../types';

export const CertificationCard: React.FC<{ cert: Certification; isPrimary?: boolean }> = ({ cert, isPrimary = false }) => {
  const hasCredential = cert.status === 'CERTIFIED' && Boolean(cert.credentialUrl);
  const statusLabel = hasCredential ? 'CERTIFIED' : cert.status === 'CURRICULUM_COMPLETED' ? 'CURRICULUM COMPLETED' : 'IN PROGRESS';
  return (
    <article className={`rounded-xl bg-surface-container-low border border-cardBorder p-6 ${isPrimary ? 'md:col-span-2' : ''}`}>
      <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
        <span className="font-mono text-xs text-primary flex items-center gap-2"><Award className="w-4 h-4" />{cert.badge}</span>
        <span className="font-mono text-[10px] px-2 py-1 rounded bg-surface-container border border-cardBorder text-secondary">{statusLabel}</span>
      </div>
      <h3 className="text-lg font-semibold text-on-surface mb-2">{cert.title}</h3>
      <p className="text-sm text-on-surface-variant leading-relaxed mb-4">{cert.description}</p>
      <div className="flex flex-wrap gap-2">
        {cert.studyAreas.map(area => <span key={area} className="px-2 py-1 rounded bg-surface-container border border-cardBorder text-xs text-on-surface-variant">{area}</span>)}
      </div>
      {hasCredential && (
        <a href={cert.credentialUrl} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 mt-4 text-sm text-primary hover:text-white">View issuer credential<ExternalLink className="w-4 h-4" /></a>
      )}
    </article>
  );
};

import React from 'react';
import { Certification } from '../types';
import { Award, ShieldCheck } from '../assets/icons';

interface CertificationCardProps {
  cert: Certification;
  isPrimary?: boolean;
}

export const CertificationCard: React.FC<CertificationCardProps> = ({ cert, isPrimary = false }) => {
  if (isPrimary) {
    return (
      <div className="rounded-xl bg-surface-container-low border border-cardBorder p-6 sm:p-8 mb-6 shadow-md">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-cardBorder/60">
          <div className="flex items-start sm:items-center gap-4">
            <div className="w-14 h-14 rounded-lg bg-surface-container border border-cardBorder flex items-center justify-center text-primary shrink-0 shadow-inner">
              <ShieldCheck className="w-8 h-8" />
            </div>
            <div>
              <div className="font-mono text-[10px] text-primary uppercase tracking-widest mb-1 font-bold">
                {cert.badge}
              </div>
              <h3 className="text-lg sm:text-xl font-bold font-sans text-on-surface">
                {cert.title}
              </h3>
              <p className="text-xs text-on-surface-variant max-w-xl mt-1 leading-relaxed">
                {cert.description}
              </p>
            </div>
          </div>

          <div className="flex flex-col items-start md:items-end gap-1.5 shrink-0">
            <div className="px-3 py-1 rounded bg-surface-container-lowest border border-cardBorder font-mono text-xs text-secondary flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-secondary animate-pulse" />
              <span>HASH: {cert.hash}</span>
            </div>
            <span className="font-mono text-[11px] text-on-surface-variant uppercase">
              {cert.targetDate}
            </span>
          </div>
        </div>

        {/* Domain Breakdown */}
        <div className="pt-6">
          <span className="font-mono text-xs text-outline uppercase tracking-wider block mb-3">
            Exam Domain Competencies:
          </span>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {cert.domains.map((domain) => (
              <div
                key={domain.name}
                className="p-3 rounded-lg bg-surface-container border border-cardBorder flex flex-col justify-between"
              >
                <div className="flex items-center justify-between font-mono text-xs text-on-surface mb-2">
                  <span className="truncate pr-2">{domain.name}</span>
                  <span className="text-secondary font-bold shrink-0">{domain.percentage}%</span>
                </div>
                <div className="w-full h-1.5 rounded-full bg-surface-container-lowest overflow-hidden">
                  <div
                    className="h-full rounded-full bg-primary"
                    style={{ width: `${domain.percentage * 3.3}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-5 rounded-xl bg-surface-container-low border border-cardBorder flex flex-col justify-between shadow-xs hover:border-outline-variant transition-all">
      <div>
        <div className="flex items-center justify-between mb-2">
          <span className="font-mono text-[10px] text-primary uppercase font-bold">{cert.badge}</span>
          <span className="font-mono text-[10px] text-tertiary px-2 py-0.5 rounded bg-surface-container border border-cardBorder">
            {cert.status}
          </span>
        </div>
        <h4 className="font-sans text-sm font-bold text-on-surface mb-1 flex items-center gap-1.5">
          <Award className="w-4 h-4 text-primary shrink-0" />
          <span>{cert.title}</span>
        </h4>
        <p className="font-sans text-xs text-on-surface-variant mb-4 leading-relaxed">
          {cert.description}
        </p>
      </div>

      <div className="space-y-2 border-t border-cardBorder/60 pt-3">
        <div className="font-mono text-[10px] text-outline uppercase">Target Domains:</div>
        {cert.domains.map((domain) => (
          <div key={domain.name} className="space-y-1">
            <div className="flex justify-between font-mono text-[10px] text-on-surface-variant">
              <span className="truncate pr-2">{domain.name}</span>
              <span className="text-secondary">{domain.percentage}%</span>
            </div>
            <div className="w-full h-1 rounded-full bg-surface-container overflow-hidden">
              <div
                className="h-full rounded-full bg-primary/70"
                style={{ width: `${domain.percentage * 2.5}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

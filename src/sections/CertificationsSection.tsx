import React from 'react';
import { Award } from '../assets/icons';
import { certifications } from '../data/certificationsData';

export const CertificationsSection: React.FC = () => {
  const primaryCert = certifications[0];

  return (
    <section
      id="certifications"
      className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 border-b border-cardBorder"
      aria-label="Certifications & Continuous Learning"
    >
      {/* Primary AWS Credential Card */}
      {primaryCert && (
        <div className="rounded-xl bg-surface-container-low border border-cardBorder p-6 md:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 shadow-md mb-8">
          <div className="flex items-center gap-5">
            <div className="w-14 h-14 rounded-xl bg-surface-container border border-cardBorder flex items-center justify-center text-primary shrink-0 shadow-inner">
              <Award className="w-7 h-7" />
            </div>
            <div>
              <div className="font-mono text-[10px] text-primary uppercase tracking-widest mb-1 font-bold">
                Credential Target Path
              </div>
              <h3 className="text-lg sm:text-xl font-bold font-sans text-on-surface mb-1">
                {primaryCert.title}
              </h3>
              <p className="text-xs sm:text-sm text-on-surface-variant font-sans max-w-xl leading-relaxed">
                {primaryCert.description}
              </p>
            </div>
          </div>

          <div className="flex flex-col items-start md:items-end gap-1.5 shrink-0 self-stretch md:self-auto pt-2 md:pt-0 border-t md:border-t-0 border-cardBorder/60">
            <div className="px-3 py-1.5 rounded bg-surface-container-lowest border border-cardBorder font-mono text-xs text-secondary flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-secondary animate-pulse" />
              <span>{primaryCert.hash}</span>
            </div>
            <span className="font-mono text-[10px] text-on-surface-variant uppercase">
              {primaryCert.targetDate}
            </span>
          </div>
        </div>
      )}

      {/* Curriculum Mastery Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {certifications.map(cert => (
          <div
            key={cert.id}
            className="p-5 rounded-xl bg-surface-container-low border border-cardBorder flex flex-col justify-between shadow-xs"
          >
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="font-mono text-[10px] text-outline uppercase">{cert.badge}</span>
                <span className="font-mono text-[10px] text-tertiary px-2 py-0.5 rounded bg-surface-container border border-cardBorder">
                  {cert.status}
                </span>
              </div>
              <h4 className="font-mono text-xs font-bold text-on-surface mb-2">{cert.title}</h4>
              <p className="font-sans text-xs text-on-surface-variant mb-4">{cert.description}</p>
            </div>

            {/* Competency Domains */}
            <div className="space-y-2 border-t border-cardBorder/60 pt-3">
              <div className="font-mono text-[10px] text-outline uppercase">Target Domains:</div>
              {cert.domains.map(domain => (
                <div key={domain.name} className="space-y-1">
                  <div className="flex justify-between font-mono text-[10px] text-on-surface-variant">
                    <span>{domain.name}</span>
                    <span className="text-secondary">{domain.percentage}%</span>
                  </div>
                  <div className="w-full h-1 rounded-full bg-surface-container overflow-hidden">
                    <div
                      className="h-full rounded-full bg-primary/70"
                      style={{ width: `${domain.percentage}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

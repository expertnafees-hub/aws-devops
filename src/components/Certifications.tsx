import React from 'react';
import { ShieldCheck, Award } from 'lucide-react';
import { certificationsData } from '../data/certificationsData';

export const Certifications: React.FC = () => {
  const primaryCert = certificationsData[0];
  const otherCerts = certificationsData.slice(1);

  return (
    <section
      className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12"
      aria-label="Certifications and Continuous Learning"
    >
      <div className="flex flex-col mb-8">
        <div className="font-mono text-xs text-primary uppercase tracking-widest mb-1 flex items-center gap-2">
          <Award className="w-4 h-4 text-primary" />
          <span>Professional Credentials</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-semibold text-on-surface font-sans">
          Certifications &amp; Continuous Learning
        </h2>
      </div>

      {/* Primary Target Credential Card */}
      {primaryCert && (
        <div className="rounded-xl bg-surface-container-low border border-cardBorder p-6 sm:p-8 mb-6 shadow-md">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-cardBorder/60">
            <div className="flex items-start sm:items-center gap-4">
              <div className="w-14 h-14 rounded-lg bg-surface-container border border-cardBorder flex items-center justify-center text-primary shrink-0 shadow-inner">
                <ShieldCheck className="w-8 h-8" />
              </div>
              <div>
                <div className="font-mono text-[10px] text-primary uppercase tracking-widest mb-1">
                  {primaryCert.badge}
                </div>
                <h3 className="text-lg sm:text-xl font-bold font-sans text-on-surface">
                  {primaryCert.title}
                </h3>
                <p className="text-xs text-on-surface-variant max-w-xl mt-1 leading-relaxed">
                  {primaryCert.description}
                </p>
              </div>
            </div>

            <div className="flex flex-col items-start md:items-end gap-1.5 shrink-0">
              <div className="px-3 py-1 rounded bg-surface-container-lowest border border-cardBorder font-mono text-xs text-secondary flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-secondary animate-pulse"></span>
                <span>HASH: {primaryCert.hash}</span>
              </div>
              <span className="font-mono text-[11px] text-on-surface-variant uppercase">
                {primaryCert.targetDate}
              </span>
            </div>
          </div>

          {/* Domain Breakdown */}
          <div className="pt-6">
            <span className="font-mono text-xs text-outline uppercase tracking-wider block mb-3">
              Exam Domain Competencies:
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {primaryCert.domains.map(dom => (
                <div key={dom.name} className="p-3 rounded bg-surface-container-lowest border border-cardBorder">
                  <div className="flex justify-between items-center mb-1.5 font-mono text-xs">
                    <span className="text-on-surface truncate pr-2">{dom.name}</span>
                    <span className="text-primary font-bold">{dom.percentage}%</span>
                  </div>
                  <div className="w-full h-1.5 bg-surface-container rounded-full overflow-hidden">
                    <div
                      className="h-full bg-primary rounded-full transition-all duration-500"
                      style={{ width: `${dom.percentage * 3.3}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Secondary Certifications Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {otherCerts.map(cert => (
          <div
            key={cert.id}
            className="p-5 rounded-lg bg-surface-container-low border border-cardBorder flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="font-mono text-[10px] text-secondary uppercase tracking-wider">
                  {cert.badge}
                </span>
                <span className="font-mono text-[10px] px-2 py-0.5 rounded bg-surface-container text-tertiary border border-cardBorder">
                  {cert.targetDate}
                </span>
              </div>
              <h4 className="text-base font-semibold font-sans text-on-surface mb-2">
                {cert.title}
              </h4>
              <p className="text-xs text-on-surface-variant leading-relaxed mb-4">
                {cert.description}
              </p>
            </div>

            <div className="font-mono text-[11px] text-outline pt-3 border-t border-cardBorder/60 flex items-center justify-between">
              <span>{cert.hash}</span>
              <span className="text-tertiary font-bold">VERIFIED</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

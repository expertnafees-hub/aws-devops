import React from 'react';
import { Award } from 'lucide-react';
import { certificationsData } from '../data/certificationsData';
import { CertificationCard } from './CertificationCard';

export const Certifications: React.FC = () => (
  <section id="certifications" className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12" aria-label="Certification study and continuous learning">
    <div className="mb-8">
      <div className="font-mono text-xs text-primary uppercase tracking-widest mb-1 flex items-center gap-2"><Award className="w-4 h-4" /><span>Learning milestones</span></div>
      <h2 className="text-2xl sm:text-3xl font-semibold text-on-surface">Certification Study &amp; Continuous Learning</h2>
      <p className="text-sm text-on-surface-variant mt-2 max-w-3xl leading-relaxed">Study and coursework statuses are self-reported. Issued certifications will include an issuer verification link. Exam dates will be added when confirmed.</p>
    </div>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {certificationsData.map((cert, index) => <CertificationCard key={cert.id} cert={cert} isPrimary={index === 0} />)}
    </div>
  </section>
);

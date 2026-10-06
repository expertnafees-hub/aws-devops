import React from 'react';
import { ExternalLink, Terminal } from 'lucide-react';
import { githubProfileUrl } from '../data/portfolioEvidence';

export const ContactCTA: React.FC = () => (
  <section id="contact" className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20" aria-label="Contact and junior opportunities">
    <div className="rounded-2xl bg-surface-container-low border border-cardBorder p-8 md:p-14 text-center flex flex-col items-center shadow-xl">
      <span className="font-mono text-xs text-secondary mb-5">SEEKING JUNIOR AWS DEVOPS OPPORTUNITIES</span>
      <h2 className="text-3xl sm:text-4xl font-bold text-on-surface mb-4">Let's build reliable systems together.</h2>
      <p className="text-sm sm:text-base text-on-surface-variant max-w-xl mb-8 leading-relaxed">I'm building practical AWS infrastructure and delivery skills through documented projects. Connect with me on LinkedIn to discuss junior DevOps and cloud engineering opportunities.</p>
      <div className="flex flex-wrap items-center justify-center gap-3">
        <a href="https://www.linkedin.com/in/nafees-ur-rehman556/" target="_blank" rel="noreferrer" className="px-5 py-3 rounded bg-primary-container text-on-primary font-mono text-sm font-semibold flex items-center gap-2 hover:bg-[#ffb86f] transition-colors">Connect on LinkedIn<ExternalLink className="w-4 h-4" /></a>
        <a href={githubProfileUrl} target="_blank" rel="noreferrer" className="px-5 py-3 rounded bg-surface-container text-on-surface font-mono text-sm border border-cardBorder flex items-center gap-2 hover:bg-surface-container-high transition-colors"><Terminal className="w-4 h-4 text-primary" />View GitHub</a>
      </div>
    </div>
  </section>
);

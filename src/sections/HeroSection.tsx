import React from 'react';
import { ArrowRight, Terminal, Network } from '../assets/icons';
import { InteractiveTerminal } from '../components/InteractiveTerminal';

export const HeroSection: React.FC = () => {
  const verifiedTools = [
    { name: 'AWS Cloud', color: 'text-primary' },
    { name: 'Terraform', color: 'text-on-surface' },
    { name: 'Docker', color: 'text-secondary' },
    { name: 'Kubernetes', color: 'text-on-surface' },
    { name: 'GitHub Actions', color: 'text-tertiary' },
    { name: 'Linux / Bash', color: 'text-on-surface' },
    { name: 'Python', color: 'text-on-surface' },
  ];

  return (
    <section
      id="overview"
      className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-16 border-b border-cardBorder relative overflow-hidden"
      aria-label="Hero Overview"
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">
        {/* Left Column: Bio and Value Proposition (col-span-7) */}
        <div className="lg:col-span-7 flex flex-col items-start space-y-6">
          {/* Eyebrow Badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-surface-container-low border border-cardBorder">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
            </span>
            <span className="font-mono text-[10px] sm:text-xs text-primary uppercase tracking-widest font-semibold">
              AWS DevOps • Cloud Infrastructure • Automation
            </span>
          </div>

          {/* Headline */}
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-on-surface tracking-tight leading-[1.15] max-w-2xl font-sans">
            Building reliable infrastructure.{' '}
            <span className="text-primary-container">Automating</span> everything else.
          </h1>

          {/* Supporting Copy */}
          <p className="text-base sm:text-lg text-on-surface-variant max-w-xl leading-relaxed font-sans">
            I'm <strong className="text-on-surface font-semibold">Nafees Ur Rehman</strong>, an AWS DevOps Engineer focused on resilient cloud infrastructure, Infrastructure as Code, CI/CD pipelines, containerization, and zero-drift operational environments.
          </p>

          {/* Career Transition Notice */}
          <div className="p-3.5 rounded bg-surface-container-low border border-cardBorder/80 text-xs sm:text-sm font-mono text-secondary max-w-xl flex items-start gap-2.5">
            <span className="text-primary-container font-bold text-base leading-none">↳</span>
            <span className="leading-snug text-on-surface-variant">
              Previously <strong className="text-white">AI Automation Engineering</strong> → now engineering production cloud systems and deployment infrastructure on AWS.
            </span>
          </div>

          {/* CTAs */}
          <div className="flex flex-wrap items-center gap-3 pt-2">
            <a
              href="#projects"
              className="px-5 py-2.5 rounded bg-primary-container text-on-primary font-mono text-xs sm:text-sm font-semibold tracking-wide flex items-center gap-2 hover:bg-[#ffb86f] transition-all shadow-md active:scale-95 focus-visible:ring-2 focus-visible:ring-primary"
            >
              <span>Explore Infrastructure</span>
              <ArrowRight className="w-4 h-4" />
            </a>

            <a
              href="https://github.com/expertnafees-hub"
              target="_blank"
              rel="noreferrer"
              className="px-4 py-2.5 rounded bg-surface-container-low text-on-surface font-mono text-xs sm:text-sm border border-cardBorder flex items-center gap-2 hover:bg-surface-container hover:border-outline transition-all focus-visible:ring-2 focus-visible:ring-primary"
            >
              <Terminal className="w-4 h-4 text-primary" />
              <span>View GitHub</span>
            </a>

            <a
              href="#architecture"
              className="px-4 py-2.5 rounded text-on-surface-variant hover:text-primary font-mono text-xs uppercase tracking-wider flex items-center gap-1.5 transition-colors border border-dashed border-cardBorder hover:border-primary"
            >
              <Network className="w-3.5 h-3.5" />
              <span>Arch Lab</span>
            </a>
          </div>

          {/* Monospace Tech Strip */}
          <div className="w-full pt-4 bg-surface-container-lowest/60 p-3.5 rounded border border-cardBorder/60">
            <div className="flex items-center gap-2 mb-2.5 font-mono text-[10px] text-outline uppercase tracking-wider">
              <span className="w-1.5 h-1.5 rounded-full bg-tertiary"></span>
              <span>Core Tooling Verified</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {verifiedTools.map(tool => (
                <span
                  key={tool.name}
                  className={`px-2.5 py-1 rounded bg-surface-container font-mono text-xs border border-cardBorder/80 ${tool.color}`}
                >
                  {tool.name}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Interactive Production Terminal (col-span-5) */}
        <div className="lg:col-span-5 relative">
          {/* SVG Topology Backdrop */}
          <div className="absolute -inset-4 opacity-20 pointer-events-none overflow-hidden" aria-hidden="true">
            <svg className="text-outline-variant" height="100%" width="100%" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <pattern height="24" id="grid-dots" patternUnits="userSpaceOnUse" width="24">
                  <circle cx="2" cy="2" fill="currentColor" opacity="0.3" r="1"></circle>
                </pattern>
              </defs>
              <rect fill="url(#grid-dots)" height="100%" width="100%"></rect>
              <line stroke="currentColor" strokeDasharray="4 4" strokeWidth="0.75" x1="10%" x2="90%" y1="20%" y2="20%"></line>
              <line stroke="currentColor" strokeDasharray="4 4" strokeWidth="0.75" x1="10%" x2="90%" y1="80%" y2="80%"></line>
              <circle cx="50%" cy="50%" fill="none" opacity="0.2" r="90" stroke="currentColor" strokeWidth="0.75"></circle>
            </svg>
          </div>

          <InteractiveTerminal />
        </div>
      </div>
    </section>
  );
};

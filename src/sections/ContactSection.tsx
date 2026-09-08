import React, { useState } from 'react';
import { Mail, Terminal } from '../assets/icons';
import { ContactModal } from '../components/ContactModal';

export const ContactSection: React.FC = () => {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <section
      id="contact"
      className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20"
      aria-label="Contact and Collaboration"
    >
      <div className="rounded-2xl bg-surface-container-low border border-cardBorder p-8 md:p-14 text-center flex flex-col items-center shadow-2xl relative overflow-hidden">
        {/* Background glow */}
        <div className="absolute -top-12 -right-12 w-48 h-48 rounded-full bg-primary/5 blur-3xl pointer-events-none" />

        {/* Eyebrow status */}
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-surface-container border border-cardBorder font-mono text-xs text-tertiary mb-6">
          <span className="w-2 h-2 rounded-full bg-tertiary animate-pulse"></span>
          <span>READY FOR HIGH-IMPACT CLOUD ROLES</span>
        </div>

        {/* Headline */}
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold font-sans text-on-surface max-w-2xl mb-4 tracking-tight">
          Let's build reliable systems together.
        </h2>

        {/* Subtitle */}
        <p className="text-sm sm:text-base text-on-surface-variant max-w-xl mb-8 leading-relaxed font-sans">
          Interested in AWS infrastructure, DevOps automation, cloud migrations, or resilient systems engineering? Let's connect and discuss how I can contribute to your engineering organization.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-3 mb-8">
          <button
            type="button"
            onClick={() => setModalOpen(true)}
            className="px-6 py-3 rounded bg-primary-container text-on-primary font-mono text-xs sm:text-sm font-semibold tracking-wide flex items-center gap-2 hover:bg-[#ffb86f] transition-all shadow-md active:scale-95 focus-visible:ring-2 focus-visible:ring-primary"
          >
            <Mail className="w-4 h-4" />
            <span>Send Direct Message</span>
          </button>

          <a
            href="https://www.linkedin.com/in/nafees-ur-rehman556/"
            target="_blank"
            rel="noreferrer"
            className="px-5 py-3 rounded bg-surface-container text-on-surface font-mono text-xs sm:text-sm border border-cardBorder flex items-center gap-2 hover:bg-surface-container-high transition-all"
          >
            <svg className="w-4 h-4 text-secondary fill-current" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9v8.37H9.2V10.9H6.46M7.83 6.25a1.62 1.62 0 0 0-1.63 1.63c0 .9.73 1.63 1.63 1.63.9 0 1.63-.73 1.63-1.63 0-.9-.73-1.63-1.63-1.63Z"/>
            </svg>
            <span>Connect on LinkedIn</span>
          </a>

          <a
            href="https://github.com/expertnafees-hub"
            target="_blank"
            rel="noreferrer"
            className="px-5 py-3 rounded bg-surface-container text-on-surface font-mono text-xs sm:text-sm border border-cardBorder flex items-center gap-2 hover:bg-surface-container-high transition-all"
          >
            <Terminal className="w-4 h-4 text-primary" />
            <span>GitHub Activity</span>
          </a>
        </div>

        {/* Terminal Echo Box */}
        <div className="p-3.5 rounded bg-surface-container-lowest border border-cardBorder font-mono text-xs text-on-surface-variant flex flex-wrap items-center gap-2 max-w-lg w-full justify-center">
          <span className="text-tertiary">nafees@aws:~$</span>
          <span className="text-on-surface">echo "Build. Automate. Scale."</span>
          <span className="text-primary font-bold">→ "Build. Automate. Scale."</span>
        </div>

        {/* Accessible Contact Modal */}
        <ContactModal
          isOpen={modalOpen}
          onClose={() => setModalOpen(false)}
        />
      </div>
    </section>
  );
};

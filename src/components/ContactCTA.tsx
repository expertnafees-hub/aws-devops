import React, { useState } from 'react';
import { Mail, Terminal, Send, CheckCircle2 } from 'lucide-react';

export const ContactCTA: React.FC = () => {
  const [formOpen, setFormOpen] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !message) return;
    setSubmitted(true);
    setTimeout(() => {
      setName('');
      setEmail('');
      setMessage('');
      setSubmitted(false);
      setFormOpen(false);
    }, 2500);
  };

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
            onClick={() => setFormOpen(true)}
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

        {/* Inline Message Dispatcher Modal */}
        {formOpen && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in"
            role="dialog"
            aria-modal="true"
            aria-labelledby="contact-modal-title"
          >
            <div className="relative w-full max-w-md rounded-xl bg-[#0D1117] border border-cardBorder p-6 text-left space-y-4 shadow-2xl">
              <div className="flex items-center justify-between border-b border-cardBorder pb-3">
                <div className="flex items-center gap-2 font-mono text-xs text-primary font-bold">
                  <Mail className="w-4 h-4" />
                  <span id="contact-modal-title">Direct Control Plane Dispatch</span>
                </div>
                <button
                  type="button"
                  onClick={() => setFormOpen(false)}
                  className="text-on-surface-variant hover:text-white font-mono text-xs"
                >
                  ✕
                </button>
              </div>

              {submitted ? (
                <div className="py-8 text-center space-y-2">
                  <CheckCircle2 className="w-10 h-10 text-tertiary mx-auto animate-bounce" />
                  <div className="font-mono text-sm font-bold text-white">Payload Dispatched!</div>
                  <div className="text-xs text-on-surface-variant font-sans">
                    Thank you for reaching out. Your message has been received.
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-3.5 text-xs font-mono">
                  <div>
                    <label className="block text-on-surface-variant mb-1" htmlFor="sender-name">
                      Identifier / Name:
                    </label>
                    <input
                      id="sender-name"
                      type="text"
                      required
                      value={name}
                      onChange={e => setName(e.target.value)}
                      placeholder="e.g. Alex Johnson (Engineering Lead)"
                      className="w-full px-3 py-2 rounded bg-[#070A0F] border border-cardBorder text-on-surface placeholder:text-outline-variant focus:border-primary focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-on-surface-variant mb-1" htmlFor="sender-email">
                      Return Endpoint / Email:
                    </label>
                    <input
                      id="sender-email"
                      type="email"
                      required
                      value={email}
                      onChange={e => setEmail(e.target.value)}
                      placeholder="alex@company.com"
                      className="w-full px-3 py-2 rounded bg-[#070A0F] border border-cardBorder text-on-surface placeholder:text-outline-variant focus:border-primary focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-on-surface-variant mb-1" htmlFor="sender-message">
                      Transmission / Message:
                    </label>
                    <textarea
                      id="sender-message"
                      required
                      rows={4}
                      value={message}
                      onChange={e => setMessage(e.target.value)}
                      placeholder="Let's discuss infrastructure automation, cloud migrations, or DevOps opportunities..."
                      className="w-full px-3 py-2 rounded bg-[#070A0F] border border-cardBorder text-on-surface placeholder:text-outline-variant focus:border-primary focus:outline-none resize-none"
                    />
                  </div>

                  <div className="pt-2 flex items-center justify-end gap-2">
                    <button
                      type="button"
                      onClick={() => setFormOpen(false)}
                      className="px-3 py-2 rounded bg-surface-container text-on-surface-variant hover:text-white"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-4 py-2 rounded bg-primary-container text-on-primary font-bold flex items-center gap-1.5 hover:bg-[#ffb86f]"
                    >
                      <span>Dispatch</span>
                      <Send className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

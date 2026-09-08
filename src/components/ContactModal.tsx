import React, { useState, useEffect } from 'react';
import { Mail, Send, CheckCircle2, X } from '../assets/icons';

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ContactModal: React.FC<ContactModalProps> = ({ isOpen, onClose }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };

    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }

    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !message) return;
    setSubmitted(true);
    setTimeout(() => {
      setName('');
      setEmail('');
      setMessage('');
      setSubmitted(false);
      onClose();
    }, 2500);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in"
      role="dialog"
      aria-modal="true"
      aria-labelledby="contact-modal-title"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-md rounded-xl bg-[#0D1117] border border-cardBorder p-6 text-left space-y-4 shadow-2xl"
        onClick={e => e.stopPropagation()}
      >
        <div className="flex items-center justify-between border-b border-cardBorder pb-3">
          <div className="flex items-center gap-2 font-mono text-xs text-primary font-bold">
            <Mail className="w-4 h-4" />
            <span id="contact-modal-title">Direct Control Plane Dispatch</span>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close contact dialog"
            className="p-1 rounded text-on-surface-variant hover:text-white hover:bg-surface-container font-mono text-xs transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {submitted ? (
          <div className="py-8 text-center space-y-2">
            <CheckCircle2 className="w-10 h-10 text-tertiary mx-auto animate-bounce" />
            <div className="font-mono text-sm font-bold text-white">Payload Dispatched!</div>
            <div className="text-xs text-on-surface-variant font-sans">
              Thank you for reaching out. Transmission registered successfully.
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
                onClick={onClose}
                className="px-3 py-2 rounded bg-surface-container text-on-surface-variant hover:text-white transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 rounded bg-primary-container text-on-primary font-bold flex items-center gap-1.5 hover:bg-[#ffb86f] transition-colors shadow-sm"
              >
                <span>Dispatch</span>
                <Send className="w-3.5 h-3.5" />
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

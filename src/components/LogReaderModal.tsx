import React, { useEffect } from 'react';
import { X, Clock, Calendar, Tag } from 'lucide-react';
import { EngineeringArticle } from '../types';

interface LogReaderModalProps {
  article: EngineeringArticle | null;
  onClose: () => void;
}

export const LogReaderModal: React.FC<LogReaderModalProps> = ({ article, onClose }) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };

    if (article) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }

    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [article, onClose]);

  if (!article) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/85 backdrop-blur-sm animate-in fade-in duration-200"
      role="dialog"
      aria-modal="true"
      aria-labelledby="article-modal-title"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-xl bg-[#0D1117] border border-cardBorder p-6 sm:p-8 text-on-surface shadow-2xl space-y-6"
        onClick={e => e.stopPropagation()}
      >
        {/* Header */}
        <div className="border-b border-cardBorder pb-4 flex items-start justify-between gap-4">
          <div>
            <div className="flex items-center gap-3 font-mono text-xs text-on-surface-variant mb-2">
              <span className={`px-2 py-0.5 rounded font-bold border ${
                article.categoryColor === 'primary' ? 'bg-primary/10 border-primary/30 text-primary' :
                article.categoryColor === 'secondary' ? 'bg-secondary/10 border-secondary/30 text-secondary' :
                'bg-tertiary/10 border-tertiary/30 text-tertiary'
              }`}>
                {article.category}
              </span>
              <span className="flex items-center gap-1 text-[11px]">
                <Clock className="w-3 h-3" />
                {article.readTime}
              </span>
              <span className="flex items-center gap-1 text-[11px]">
                <Calendar className="w-3 h-3" />
                {article.year}
              </span>
            </div>
            <h2 id="article-modal-title" className="text-xl sm:text-2xl font-bold font-sans text-white leading-tight">
              {article.title}
            </h2>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close article reader"
            className="p-1.5 rounded-lg bg-surface-container text-on-surface-variant hover:text-white hover:bg-surface-container-high transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Area */}
        <div className="space-y-4 text-sm leading-relaxed text-on-surface-variant font-sans">
          {article.contentMarkdown.split('\n\n').map((paragraph, idx) => {
            if (paragraph.startsWith('### ')) {
              return (
                <h3 key={idx} className="text-lg font-bold text-white font-sans pt-2">
                  {paragraph.replace('### ', '')}
                </h3>
              );
            }
            if (paragraph.startsWith('#### ')) {
              return (
                <h4 key={idx} className="text-base font-semibold text-secondary font-mono pt-3">
                  {paragraph.replace('#### ', '')}
                </h4>
              );
            }
            if (paragraph.startsWith('```')) {
              const cleaned = paragraph.replace(/```[a-z]*\n?/g, '');
              return (
                <pre key={idx} className="p-4 rounded-lg bg-[#070A0F] border border-cardBorder font-mono text-xs text-on-surface overflow-x-auto leading-relaxed my-2">
                  <code>{cleaned}</code>
                </pre>
              );
            }
            return (
              <p key={idx} className="text-on-surface-variant text-xs sm:text-sm">
                {paragraph}
              </p>
            );
          })}
        </div>

        {/* Tags */}
        <div className="pt-4 border-t border-cardBorder flex flex-wrap items-center justify-between gap-3">
          <div className="flex flex-wrap items-center gap-1.5 font-mono text-xs text-outline">
            <Tag className="w-3.5 h-3.5" />
            {article.tags.map(tag => (
              <span key={tag} className="px-2 py-0.5 rounded bg-surface-container border border-cardBorder text-on-surface-variant">
                #{tag}
              </span>
            ))}
          </div>

          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded bg-surface-container text-on-surface-variant hover:text-white font-mono text-xs transition-colors"
          >
            Close Article
          </button>
        </div>
      </div>
    </div>
  );
};

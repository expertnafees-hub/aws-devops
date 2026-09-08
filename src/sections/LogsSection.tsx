import React, { useState } from 'react';
import { BookOpen, Clock, Calendar } from '../assets/icons';
import { engineeringLogs } from '../data/logsData';
import { EngineeringArticle } from '../types';
import { LogReaderModal } from '../components/LogReaderModal';

export const LogsSection: React.FC = () => {
  const [selectedArticle, setSelectedArticle] = useState<EngineeringArticle | null>(null);

  return (
    <section
      id="engineering-logs"
      className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 border-b border-cardBorder"
      aria-label="Technical Documentation & Writing"
    >
      <div className="flex flex-col mb-10">
        <div className="font-mono text-xs text-primary uppercase tracking-widest mb-1 flex items-center gap-2">
          <BookOpen className="w-4 h-4 text-primary" />
          <span>Technical Documentation &amp; Writing</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-semibold text-on-surface font-sans">
          Engineering Logs
        </h2>
        <p className="text-sm text-on-surface-variant max-w-2xl mt-1.5 leading-relaxed font-sans">
          In-depth teardowns of cloud infrastructure concepts, production pitfalls, and systems programming fundamentals.
        </p>
      </div>

      {/* 5 In-depth Articles */}
      <div className="space-y-4">
        {engineeringLogs.map(log => (
          <div
            key={log.id}
            onClick={() => setSelectedArticle(log)}
            role="button"
            tabIndex={0}
            aria-label={`Read article: ${log.title}`}
            onKeyDown={e => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                setSelectedArticle(log);
              }
            }}
            className="block p-5 rounded-xl bg-surface-container-low border border-cardBorder hover:border-outline-variant hover:bg-surface-container transition-all cursor-pointer group shadow-sm focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none"
          >
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 mb-2">
              <h3 className="text-base sm:text-lg font-semibold font-sans text-on-surface group-hover:text-primary transition-colors">
                {log.title}
              </h3>

              <div className="flex items-center gap-3 font-mono text-xs text-on-surface-variant shrink-0">
                <span className={`font-semibold ${
                  log.categoryColor === 'primary' ? 'text-primary' :
                  log.categoryColor === 'secondary' ? 'text-secondary' : 'text-tertiary'
                }`}>
                  {log.category}
                </span>
                <span>•</span>
                <span className="flex items-center gap-1 text-[11px]">
                  <Clock className="w-3 h-3" />
                  {log.readTime}
                </span>
                <span>•</span>
                <span className="flex items-center gap-1 text-[11px]">
                  <Calendar className="w-3 h-3" />
                  {log.year}
                </span>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-on-surface-variant font-sans leading-relaxed">
              {log.summary}
            </p>
          </div>
        ))}
      </div>

      {/* Article Reader Modal */}
      <LogReaderModal
        article={selectedArticle}
        onClose={() => setSelectedArticle(null)}
      />
    </section>
  );
};

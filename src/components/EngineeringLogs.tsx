import React, { useState } from 'react';
import { BookOpen, Clock, Calendar, ArrowRight } from 'lucide-react';
import { logsData } from '../data/logsData';
import { EngineeringArticle } from '../types';
import { LogReaderModal } from './LogReaderModal';

export const EngineeringLogs: React.FC = () => {
  const [selectedArticle, setSelectedArticle] = useState<EngineeringArticle | null>(null);

  return (
    <section
      id="engineering-logs"
      className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 border-b border-cardBorder"
      aria-label="Engineering Logs and Technical Write-ups"
    >
      <div className="flex flex-col mb-10">
        <div className="font-mono text-xs text-primary uppercase tracking-widest mb-1 flex items-center gap-2">
          <BookOpen className="w-4 h-4 text-primary" />
          <span>Technical Documentation &amp; Writing</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-semibold text-on-surface font-sans">
          Engineering Logs
        </h2>
        <p className="text-sm text-on-surface-variant max-w-2xl mt-1 leading-relaxed font-sans">
          In-depth teardowns of cloud infrastructure concepts, production pitfalls, and systems programming fundamentals.
        </p>
      </div>

      <div className="space-y-4">
        {logsData.map(article => (
          <article
            key={article.id}
            onClick={() => setSelectedArticle(article)}
            className="group block p-5 rounded-lg bg-surface-container-low border border-cardBorder hover:bg-surface-container hover:border-outline-variant transition-all cursor-pointer shadow-sm"
          >
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 mb-2">
              <h3 className="text-base sm:text-lg font-semibold font-sans text-on-surface group-hover:text-primary transition-colors">
                {article.title}
              </h3>
              <div className="flex items-center gap-3 font-mono text-xs text-on-surface-variant shrink-0">
                <span className={`font-medium ${
                  article.categoryColor === 'primary' ? 'text-primary' :
                  article.categoryColor === 'secondary' ? 'text-secondary' : 'text-tertiary'
                }`}>
                  {article.category}
                </span>
                <span>•</span>
                <span className="flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  {article.readTime}
                </span>
                <span>•</span>
                <span className="flex items-center gap-1">
                  <Calendar className="w-3 h-3" />
                  {article.year}
                </span>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-on-surface-variant leading-relaxed font-sans">
              {article.summary}
            </p>

            <div className="mt-3 flex items-center gap-1 font-mono text-xs text-primary opacity-0 group-hover:opacity-100 transition-opacity">
              <span>Read complete article</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </div>
          </article>
        ))}
      </div>

      {/* Reader Modal */}
      <LogReaderModal
        article={selectedArticle}
        onClose={() => setSelectedArticle(null)}
      />
    </section>
  );
};

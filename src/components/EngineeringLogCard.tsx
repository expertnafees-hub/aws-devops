import React from 'react';
import { EngineeringArticle } from '../types';
import { Clock, Calendar } from '../assets/icons';

interface EngineeringLogCardProps {
  article: EngineeringArticle;
  onSelect: (article: EngineeringArticle) => void;
}

export const EngineeringLogCard: React.FC<EngineeringLogCardProps> = ({ article, onSelect }) => {
  const categoryColorClass = {
    primary: 'text-primary bg-primary/10 border-primary/20',
    secondary: 'text-secondary bg-secondary/10 border-secondary/20',
    tertiary: 'text-tertiary bg-tertiary/10 border-tertiary/20'
  }[article.categoryColor];

  return (
    <div
      onClick={() => onSelect(article)}
      className="p-5 rounded-xl bg-surface-container-low border border-cardBorder hover:bg-surface-container hover:border-outline-variant transition-all cursor-pointer shadow-xs group focus-visible:ring-2 focus-visible:ring-primary"
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onSelect(article);
        }
      }}
    >
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 mb-2">
        <h3 className="text-base sm:text-lg font-semibold font-sans text-on-surface group-hover:text-primary transition-colors">
          {article.title}
        </h3>

        <div className="flex items-center gap-3 font-mono text-xs text-on-surface-variant shrink-0">
          <span className={`px-2 py-0.5 rounded font-mono text-[10px] uppercase border ${categoryColorClass}`}>
            {article.category}
          </span>
          <span className="flex items-center gap-1">
            <Clock className="w-3 h-3 text-outline" />
            {article.readTime}
          </span>
          <span className="flex items-center gap-1 text-outline">
            <Calendar className="w-3 h-3" />
            {article.year}
          </span>
        </div>
      </div>

      <p className="text-xs sm:text-sm text-on-surface-variant font-sans leading-relaxed">
        {article.summary}
      </p>

      {/* Tags */}
      <div className="flex flex-wrap gap-1.5 mt-3 pt-3 border-t border-cardBorder/60">
        {article.tags.map((tag) => (
          <span
            key={tag}
            className="px-2 py-0.5 rounded bg-surface-container font-mono text-[10px] text-outline hover:text-on-surface transition-colors"
          >
            #{tag}
          </span>
        ))}
      </div>
    </div>
  );
};

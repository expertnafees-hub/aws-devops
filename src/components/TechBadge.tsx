import React from 'react';
import { ProficiencyLevel } from '../types';

interface TechBadgeProps {
  name: string;
  status?: ProficiencyLevel;
  highlight?: boolean;
  className?: string;
}

export const TechBadge: React.FC<TechBadgeProps> = ({
  name,
  status = 'proficient',
  highlight = false,
  className = ''
}) => {
  const statusIndicator = () => {
    switch (status) {
      case 'proficient':
        return <span className="w-1.5 h-1.5 rounded-full bg-tertiary" title="Proficient / Production" />;
      case 'learning':
        return <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" title="Active Learning" />;
      case 'planned':
        return <span className="w-1.5 h-1.5 rounded-full bg-outline" title="Planned Curriculum" />;
      default:
        return null;
    }
  };

  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-surface-container font-mono text-xs transition-colors border ${
        highlight
          ? 'border-primary/40 text-primary'
          : 'border-cardBorder text-on-surface hover:border-outline-variant hover:text-white'
      } ${className}`}
    >
      {statusIndicator()}
      <span>{name}</span>
    </span>
  );
};

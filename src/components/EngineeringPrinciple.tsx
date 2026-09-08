import React from 'react';
import { EngineeringPrinciple as PrincipleType } from '../types';

interface EngineeringPrincipleProps {
  principle: PrincipleType;
}

export const EngineeringPrinciple: React.FC<EngineeringPrincipleProps> = ({ principle }) => {
  const colorStyles = {
    primary: 'hover:border-primary/40 text-primary',
    secondary: 'hover:border-secondary/40 text-secondary',
    tertiary: 'hover:border-tertiary/40 text-tertiary'
  }[principle.color];

  return (
    <div
      className={`p-6 rounded-xl bg-surface-container-low border border-cardBorder flex flex-col justify-between transition-all hover:bg-surface-container ${colorStyles}`}
    >
      <div>
        <span className="font-mono text-xs font-bold block mb-2 opacity-90">
          {principle.number}
        </span>
        <h3 className="text-base sm:text-lg font-semibold text-on-surface font-sans mb-3">
          {principle.title}
        </h3>
        <blockquote className="font-mono text-xs text-secondary/90 italic mb-3 border-l-2 border-cardBorder pl-3 py-0.5">
          {principle.quote}
        </blockquote>
        <p className="text-xs sm:text-sm text-on-surface-variant font-sans leading-relaxed">
          {principle.body}
        </p>
      </div>

      <div className="mt-6 pt-3 border-t border-cardBorder/60 font-mono text-[10px] text-outline tracking-wider uppercase">
        {principle.footerTag}
      </div>
    </div>
  );
};

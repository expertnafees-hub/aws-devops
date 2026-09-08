import React from 'react';
import { PipelineStep } from '../types';

interface PipelineNodeProps {
  step: PipelineStep;
  isActive?: boolean;
  onClick?: () => void;
  icon?: React.ReactNode;
}

export const PipelineNode: React.FC<PipelineNodeProps> = ({
  step,
  isActive = false,
  onClick,
  icon
}) => {
  const badgeColorClass = {
    primary: 'text-primary bg-primary/10 border-primary/20',
    secondary: 'text-secondary bg-secondary/10 border-secondary/20',
    tertiary: 'text-tertiary bg-tertiary/10 border-tertiary/20'
  }[step.badgeColor];

  return (
    <button
      type="button"
      onClick={onClick}
      className={`flex flex-col items-center text-center p-2 rounded-lg transition-all focus-visible:ring-2 focus-visible:ring-primary ${
        isActive ? 'bg-surface-container border border-primary/40 scale-105' : 'hover:bg-surface-container/60'
      }`}
    >
      <div
        className={`w-11 h-11 rounded-full border flex items-center justify-center mb-2 transition-colors ${
          isActive
            ? 'bg-primary text-on-primary border-primary shadow-md shadow-primary/20'
            : 'bg-surface-container-lowest text-secondary border-cardBorder'
        }`}
      >
        {icon}
      </div>
      <span className="font-mono text-xs font-semibold text-on-surface">
        {step.stepNumber}. {step.name}
      </span>
      <span className="font-mono text-[10px] text-on-surface-variant truncate max-w-[90px]">
        {step.subtext}
      </span>
      <span className={`mt-1 font-mono text-[9px] px-1.5 py-0.5 rounded border ${badgeColorClass}`}>
        {step.badge}
      </span>
    </button>
  );
};

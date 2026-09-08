import React from 'react';

export interface InfrastructureStatusCardProps {
  label: string;
  value: string;
  subtext: string;
  status: string;
  statusType?: 'primary' | 'secondary' | 'tertiary';
  pulsing?: boolean;
}

export const InfrastructureStatusCard: React.FC<InfrastructureStatusCardProps> = ({
  label,
  value,
  subtext,
  status,
  statusType = 'tertiary',
  pulsing = false
}) => {
  const statusColors = {
    primary: 'text-primary bg-primary/10 border-primary/20',
    secondary: 'text-secondary bg-secondary/10 border-secondary/20',
    tertiary: 'text-tertiary bg-tertiary/10 border-tertiary/20'
  }[statusType];

  const dotColors = {
    primary: 'bg-primary',
    secondary: 'bg-secondary',
    tertiary: 'bg-tertiary'
  }[statusType];

  return (
    <div className="rounded-xl bg-surface-container-low border border-cardBorder p-5 hover:bg-surface-container hover:border-outline-variant/60 transition-all shadow-xs flex flex-col justify-between">
      <div>
        <div className="flex items-center justify-between mb-3">
          <span className="font-mono text-xs text-on-surface-variant">{label}</span>
          <span
            className={`flex items-center gap-1.5 px-2 py-0.5 rounded font-mono text-[10px] tracking-wider uppercase border ${statusColors}`}
          >
            <span
              className={`w-1.5 h-1.5 rounded-full ${dotColors} ${
                pulsing ? 'animate-ping' : ''
              }`}
            />
            {status}
          </span>
        </div>
        <div className="text-xl sm:text-2xl font-bold font-sans text-on-surface mb-1.5 tracking-tight">
          {value}
        </div>
      </div>
      <p className="text-xs text-on-surface-variant font-sans leading-relaxed">
        {subtext}
      </p>
    </div>
  );
};

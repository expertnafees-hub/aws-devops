import React from 'react';

export const TopDiagnosticLine: React.FC = () => {
  return (
    <aside
      aria-label="System diagnostic bar"
      className="w-full bg-[#04070B] border-b border-cardBorder text-[11px] font-mono text-on-surface-variant py-1.5 px-4 sm:px-6 lg:px-12 select-none"
    >
      <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-3 sm:gap-4">
          <span className="flex items-center gap-1.5 text-tertiary font-medium">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-tertiary opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-tertiary"></span>
            </span>
            <span>AWS CONTROL PLANE: ONLINE</span>
          </span>
          <span className="text-outline-variant">/</span>
          <span className="text-secondary font-mono">REGION: us-east-1a</span>
          <span className="hidden sm:inline text-outline-variant">/</span>
          <span className="hidden sm:inline text-on-surface-variant font-mono">LATENCY: 18ms</span>
        </div>

        <div className="flex items-center gap-3 sm:gap-4">
          <span className="text-on-surface-variant font-mono">
            TF_STATE: <span className="text-secondary font-bold">S3_LOCKED</span>
          </span>
          <span className="text-outline-variant">|</span>
          <span className="text-primary font-mono font-medium">
            AGENT: NAFEES_CLI_v2.4
          </span>
        </div>
      </div>
    </aside>
  );
};

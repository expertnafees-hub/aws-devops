import React from 'react';
import { activeCurriculumTree } from '../data/pipelineAndBuildingData';

export const CurrentlyBuildingSection: React.FC = () => {
  return (
    <section
      className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 border-b border-cardBorder"
      aria-label="Currently Building Active Tracker"
    >
      <div className="rounded-xl bg-surface-container-lowest border border-cardBorder p-6 md:p-8 shadow-xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between pb-4 mb-6 bg-surface-container-high/40 p-4 rounded border border-cardBorder/60 gap-2">
          <div className="flex items-center gap-2">
            <span className="font-mono text-sm text-tertiary">📁</span>
            <span className="font-mono text-xs sm:text-sm text-on-surface font-semibold">
              ~/active-engineering-curriculum
            </span>
          </div>
          <div className="font-mono text-xs text-on-surface-variant flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
            <span>COMMITS PUSHED THIS WEEK: 19</span>
          </div>
        </div>

        {/* Tree List */}
        <div className="font-mono text-xs sm:text-sm text-on-surface space-y-2 select-text">
          <div className="text-on-surface-variant pb-1">~/current-focus</div>
          {activeCurriculumTree.map((item, idx) => (
            <div
              key={idx}
              className="flex items-center justify-between pl-3 sm:pl-4 py-1.5 hover:bg-surface-container-low/60 rounded transition-colors"
            >
              <span className="flex items-center gap-1.5 break-all sm:break-normal">
                <span className="text-outline">{idx === activeCurriculumTree.length - 1 ? '└── ' : '├── '}</span>
                <strong className="text-on-surface font-semibold">{item.folder}</strong>
                <span className="text-on-surface-variant text-xs hidden md:inline">({item.details})</span>
              </span>

              <span
                className={`font-mono text-[10px] px-2 py-0.5 rounded shrink-0 border ml-2 ${
                  item.status === 'ACTIVE'
                    ? 'bg-tertiary/10 border-tertiary/30 text-tertiary'
                    : item.status === 'IN PROGRESS'
                    ? 'bg-primary/10 border-primary/30 text-primary'
                    : 'bg-secondary/10 border-secondary/30 text-secondary'
                }`}
              >
                {item.status}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

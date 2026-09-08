import React from 'react';
import { FolderGit2, Folder, GitCommit } from 'lucide-react';
import { curriculumData } from '../data/pipelineAndBuildingData';

export const CurrentlyBuilding: React.FC = () => {
  return (
    <section
      className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12"
      aria-label="Currently Building Tracker"
    >
      <div className="rounded-xl bg-surface-container-lowest border border-cardBorder p-6 sm:p-8 shadow-xl">
        {/* Tracker Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between pb-4 mb-6 bg-surface-container-high/40 p-4 rounded border border-cardBorder/60 gap-3">
          <div className="flex items-center gap-2.5">
            <FolderGit2 className="w-5 h-5 text-tertiary" />
            <span className="font-mono text-sm sm:text-base text-on-surface font-semibold">
              ~/active-engineering-curriculum
            </span>
          </div>
          <div className="font-mono text-xs text-on-surface-variant flex items-center gap-2">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
            </span>
            <GitCommit className="w-3.5 h-3.5 text-primary" />
            <span className="text-white font-medium">COMMITS PUSHED THIS WEEK: 19</span>
          </div>
        </div>

        {/* Tree List */}
        <div className="font-mono text-xs sm:text-sm text-on-surface space-y-2 select-text">
          <div className="text-on-surface-variant text-xs flex items-center gap-1.5 pb-1">
            <Folder className="w-3.5 h-3.5 text-outline" />
            <span>~/current-focus</span>
          </div>

          <div className="space-y-1 pl-2 border-l border-cardBorder/80">
            {curriculumData.map(item => {
              const badgeClass =
                item.status === 'ACTIVE'
                  ? 'bg-tertiary/10 border-tertiary/30 text-tertiary'
                  : item.status === 'IN PROGRESS'
                  ? 'bg-primary/10 border-primary/30 text-primary animate-pulse'
                  : 'bg-secondary/10 border-secondary/30 text-secondary';

              return (
                <div
                  key={item.id}
                  className="flex flex-col sm:flex-row sm:items-center justify-between pl-3 py-1.5 hover:bg-surface-container-low/60 rounded transition-colors gap-2"
                >
                  <div className="flex items-start sm:items-center gap-2">
                    <span className="text-outline-variant font-mono">├──</span>
                    <span>
                      <strong className="text-white font-medium">{item.folder}</strong>{' '}
                      <span className="text-on-surface-variant text-xs font-normal">
                        ({item.details})
                      </span>
                    </span>
                  </div>

                  <span
                    className={`font-mono text-[10px] font-bold px-2 py-0.5 rounded border self-start sm:self-auto ${badgeClass}`}
                  >
                    {item.status}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

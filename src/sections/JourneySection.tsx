import React from 'react';
import { GitBranch } from '../assets/icons';
import { journeyMilestones, journeyStory } from '../data/journeyData';

export const JourneySection: React.FC = () => {
  return (
    <section
      id="journey"
      className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 border-b border-cardBorder"
      aria-label="Engineering Evolution Journey"
    >
      <div className="rounded-xl bg-surface-container-low border border-cardBorder p-6 sm:p-8 md:p-10 shadow-lg">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* Left Column: Narrative (5 cols) */}
          <div className="lg:col-span-5 flex flex-col">
            <div className="inline-flex items-center gap-2 font-mono text-xs text-primary uppercase tracking-widest mb-3">
              <GitBranch className="w-4 h-4 text-primary" />
              <span>{journeyStory.eyebrow}</span>
            </div>

            <h2 className="text-2xl sm:text-3xl font-semibold text-on-surface mb-4 font-sans tracking-tight">
              {journeyStory.title}
            </h2>

            <p className="text-sm text-on-surface-variant mb-4 leading-relaxed font-sans">
              {journeyStory.p1}
            </p>

            <p className="text-sm text-on-surface-variant mb-6 leading-relaxed font-sans">
              {journeyStory.p2}
            </p>

            <div className="p-4 rounded bg-surface-container-lowest border border-cardBorder font-mono text-xs text-secondary leading-relaxed">
              <div className="text-outline uppercase text-[10px] font-bold mb-1 tracking-wider">
                Philosophy Shift:
              </div>
              {journeyStory.philosophyShift}
            </div>
          </div>

          {/* Right Column: DAG Flow Graph (7 cols) */}
          <div className="lg:col-span-7 flex flex-col">
            <div className="flex items-center justify-between font-mono text-xs text-on-surface-variant mb-3 border-b border-cardBorder/60 pb-2">
              <span className="uppercase tracking-wider text-[11px]">Career Capability Pipeline (DAG Graph)</span>
              <span className="text-tertiary text-[11px] font-medium">ALL STAGES RESOLVED</span>
            </div>

            {/* Flow Nodes Container */}
            <div className="space-y-3">
              {journeyMilestones.map((node, index) => {
                const isLast = index === journeyMilestones.length - 1;
                return (
                  <div key={node.id}>
                    <div className="flex items-center gap-3">
                      {/* Node number badge */}
                      <div className={`w-8 h-8 rounded bg-surface-container border border-cardBorder flex items-center justify-center font-mono text-xs font-bold shrink-0 ${
                        node.color === 'primary' ? 'text-primary' : node.color === 'secondary' ? 'text-secondary' : 'text-tertiary'
                      }`}>
                        {node.number}
                      </div>

                      {/* Content Card */}
                      <div className="flex-1 p-3.5 rounded bg-surface-container-lowest border border-cardBorder flex flex-col sm:flex-row sm:items-center justify-between gap-2 hover:border-outline transition-colors">
                        <div>
                          <div className={`font-mono text-xs sm:text-sm font-semibold ${
                            node.statusType === 'active' ? 'text-primary' : 'text-on-surface'
                          }`}>
                            {node.title}
                          </div>
                          <div className="font-sans text-xs text-on-surface-variant mt-0.5">
                            {node.subtitle}
                          </div>
                        </div>

                        <span className={`font-mono text-[10px] px-2.5 py-0.5 rounded border self-start sm:self-auto shrink-0 ${
                          node.statusType === 'active'
                            ? 'bg-primary/10 border-primary/40 text-primary font-bold animate-pulse'
                            : 'bg-surface-container border-cardBorder text-tertiary'
                        }`}>
                          {node.status}
                        </span>
                      </div>
                    </div>

                    {/* DAG Connector Vertical */}
                    {!isLast && (
                      <div className="ml-4 w-0.5 h-3 bg-surface-container-highest my-0.5" />
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

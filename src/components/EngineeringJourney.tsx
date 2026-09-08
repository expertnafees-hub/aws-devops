import React from 'react';
import { GitBranch, ArrowDown } from 'lucide-react';
import { journeyMilestones, journeyStory } from '../data/journeyData';

export const EngineeringJourney: React.FC = () => {
  return (
    <section
      id="journey"
      className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16"
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

                      {/* Node Body */}
                      <div className="flex-1 p-3.5 rounded bg-surface-container-lowest border border-cardBorder flex flex-col sm:flex-row sm:items-center justify-between gap-2 hover:border-outline-variant transition-colors">
                        <div>
                          <div className="font-mono text-xs sm:text-sm text-on-surface font-semibold">
                            {node.title}
                          </div>
                          <div className="text-xs text-on-surface-variant mt-0.5">
                            {node.subtitle}
                          </div>
                        </div>

                        <span
                          className={`font-mono text-[10px] uppercase font-bold px-2 py-0.5 rounded self-start sm:self-auto border ${
                            node.statusType === 'active'
                              ? 'bg-primary/10 border-primary/40 text-primary animate-pulse'
                              : 'bg-surface-container border-cardBorder text-tertiary'
                          }`}
                        >
                          {node.status}
                        </span>
                      </div>
                    </div>

                    {/* DAG Connector */}
                    {!isLast && (
                      <div className="ml-4 pl-[3px] py-1 flex items-center text-outline-variant" aria-hidden="true">
                        <div className="w-0.5 h-3.5 bg-surface-container-highest"></div>
                        <ArrowDown className="w-3 h-3 -ml-[5px] text-outline-variant/60" />
                      </div>
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

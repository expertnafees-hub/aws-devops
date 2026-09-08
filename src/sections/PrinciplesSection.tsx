import React from 'react';
import { principlesData } from '../data/pipelineAndBuildingData';

export const PrinciplesSection: React.FC = () => {
  return (
    <section
      className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 border-b border-cardBorder"
      aria-label="Engineering System Principles"
    >
      <div className="flex flex-col mb-10">
        <div className="font-mono text-xs text-primary uppercase tracking-widest mb-1">
          System Tenets
        </div>
        <h2 className="text-2xl sm:text-3xl font-semibold text-on-surface font-sans">
          Engineering Philosophy
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {principlesData.map(principle => (
          <div
            key={principle.id}
            className="p-6 rounded-xl bg-surface-container-low border border-cardBorder flex flex-col justify-between hover:border-outline-variant hover:bg-surface-container transition-all shadow-sm group cursor-default"
          >
            <div>
              <span className="font-mono text-xs text-primary font-bold block mb-2">
                {principle.number}
              </span>
              <h3 className="text-base sm:text-lg font-semibold font-sans text-on-surface mb-3 group-hover:text-primary transition-colors">
                {principle.title}
              </h3>
              <p className="text-xs text-on-surface-variant font-sans leading-relaxed">
                <span className="text-on-surface font-medium italic">“{principle.quote}”</span>{' '}
                {principle.body}
              </p>
            </div>

            <div className="mt-6 pt-3 font-mono text-[10px] text-outline border-t border-cardBorder/60 tracking-wider uppercase font-semibold">
              {principle.footerTag}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

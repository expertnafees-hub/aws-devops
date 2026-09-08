import React from 'react';
import { principlesData } from '../data/pipelineAndBuildingData';

export const EngineeringPrinciples: React.FC = () => {
  return (
    <section
      className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12"
      aria-label="Engineering Principles and System Tenets"
    >
      <div className="flex flex-col mb-8">
        <div className="font-mono text-xs text-primary uppercase tracking-widest mb-1">
          System Tenets
        </div>
        <h2 className="text-2xl sm:text-3xl font-semibold text-on-surface font-sans">
          Engineering Philosophy
        </h2>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {principlesData.map(p => {
          const hoverBorderColor =
            p.color === 'primary' ? 'hover:border-primary/40' :
            p.color === 'secondary' ? 'hover:border-secondary/40' :
            'hover:border-tertiary/40';

          const textColor =
            p.color === 'primary' ? 'text-primary' :
            p.color === 'secondary' ? 'text-secondary' :
            'text-tertiary';

          return (
            <div
              key={p.id}
              className={`p-6 rounded-lg bg-surface-container-low border border-cardBorder flex flex-col justify-between hover:bg-surface-container ${hoverBorderColor} transition-all cursor-default shadow-sm`}
            >
              <div>
                <span className={`font-mono text-xs font-bold block mb-2 ${textColor}`}>
                  {p.number}
                </span>
                <h3 className="text-base sm:text-lg font-semibold font-sans text-on-surface mb-2.5">
                  {p.title}
                </h3>
                <p className="text-xs text-on-surface-variant leading-relaxed font-sans">
                  <strong className="text-on-surface font-medium">{p.quote}</strong> {p.body}
                </p>
              </div>

              <div className="mt-6 pt-3 border-t border-cardBorder/60 font-mono text-[10px] text-outline tracking-wider font-bold">
                {p.footerTag}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

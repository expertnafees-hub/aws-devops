import React, { useState } from 'react';
import { GitBranch, GitPullRequest, CheckSquare, Layers, ShieldAlert, Rocket, Activity } from '../assets/icons';
import { pipelineSteps } from '../data/pipelineAndBuildingData';

export const PipelineSection: React.FC = () => {
  const [activeStep, setActiveStep] = useState<number | null>(null);

  const getStepIcon = (iconName: string) => {
    switch (iconName) {
      case 'code': return GitBranch;
      case 'merge': return GitPullRequest;
      case 'fact_check': return CheckSquare;
      case 'inventory_2': return Layers;
      case 'shield': return ShieldAlert;
      case 'rocket': return Rocket;
      case 'monitoring': return Activity;
      default: return GitBranch;
    }
  };

  return (
    <section
      id="pipeline"
      className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 border-b border-cardBorder"
      aria-label="DevOps Delivery Pipeline"
    >
      <div className="rounded-xl bg-surface-container-low border border-cardBorder p-6 md:p-8 shadow-md">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-3">
          <div>
            <div className="font-mono text-xs text-primary uppercase tracking-widest mb-1">
              Operational Guarantee
            </div>
            <h2 className="text-xl sm:text-2xl font-semibold font-sans text-on-surface">
              “Infrastructure shouldn't depend on someone remembering the right commands.”
            </h2>
          </div>
          <div className="px-3 py-1.5 rounded bg-surface-container-lowest border border-cardBorder font-mono text-xs text-tertiary flex items-center gap-2 self-start md:self-auto shadow-sm">
            <span className="w-2 h-2 rounded-full bg-tertiary animate-pulse"></span>
            <span>Automated Rollback Safeguard Engaged</span>
          </div>
        </div>

        {/* Pipeline Progression Steps (Horizontal on tablet+, clickable details) */}
        <div className="overflow-x-auto pb-4 scrollbar-thin">
          <div className="flex items-start min-w-[820px] justify-between relative pt-2">
            {pipelineSteps.map((step, idx) => {
              const IconComp = getStepIcon(step.icon);
              const isSelected = activeStep === idx;
              const isLast = idx === pipelineSteps.length - 1;

              return (
                <React.Fragment key={step.stepNumber}>
                  {/* Step Item */}
                  <div
                    className="flex flex-col items-center text-center cursor-pointer group w-24 shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded p-1"
                    onClick={() => setActiveStep(isSelected ? null : idx)}
                    role="button"
                    tabIndex={0}
                    aria-expanded={isSelected}
                    aria-label={`Step ${step.stepNumber}: ${step.name}. Click to view details.`}
                    onKeyDown={e => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        setActiveStep(isSelected ? null : idx);
                      }
                    }}
                  >
                    <div
                      className={`w-11 h-11 rounded-full flex items-center justify-center mb-2 border transition-all ${
                        isSelected
                          ? 'bg-primary-container text-on-primary border-primary scale-110 shadow-lg'
                          : 'bg-surface-container-lowest border-cardBorder text-on-surface group-hover:border-primary group-hover:text-primary'
                      }`}
                    >
                      <IconComp className="w-5 h-5" />
                    </div>

                    <span className="font-mono text-xs font-semibold text-on-surface group-hover:text-primary transition-colors">
                      {step.stepNumber}. {step.name}
                    </span>

                    <span className="font-mono text-[10px] text-on-surface-variant mt-0.5">
                      {step.subtext}
                    </span>

                    <span className={`font-mono text-[9px] px-1.5 py-0.5 rounded mt-1.5 border ${
                      step.badgeColor === 'primary' ? 'bg-primary/10 border-primary/30 text-primary font-semibold' :
                      step.badgeColor === 'secondary' ? 'bg-secondary/10 border-secondary/30 text-secondary' :
                      'bg-tertiary/10 border-tertiary/30 text-tertiary'
                    }`}>
                      {step.badge}
                    </span>
                  </div>

                  {/* Connecting Line */}
                  {!isLast && (
                    <div className="flex-1 h-0.5 bg-surface-container-highest mt-5 mx-1" />
                  )}
                </React.Fragment>
              );
            })}
          </div>
        </div>

        {/* Expandable Step Details Drawer / Drawer Box */}
        {activeStep !== null && pipelineSteps[activeStep] && (
          <div className="mt-6 p-4 rounded-lg bg-surface-container-lowest border border-cardBorder animate-in fade-in duration-200">
            <div className="flex items-center justify-between pb-2 border-b border-cardBorder/60 mb-3">
              <span className="font-mono text-xs text-primary font-semibold">
                Step {pipelineSteps[activeStep].stepNumber} Details // {pipelineSteps[activeStep].name}
              </span>
              <button
                type="button"
                onClick={() => setActiveStep(null)}
                aria-label="Close step details"
                className="text-on-surface-variant hover:text-white font-mono text-xs"
              >
                Close ✕
              </button>
            </div>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-2 text-xs font-mono text-on-surface-variant">
              {pipelineSteps[activeStep].details.map((detail, dIdx) => (
                <li key={dIdx} className="flex items-center gap-2">
                  <span className="text-tertiary">▸</span>
                  <span>{detail}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </section>
  );
};

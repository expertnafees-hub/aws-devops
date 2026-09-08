import React, { useState } from 'react';
import { GitBranch, GitPullRequest, CheckSquare, Layers, ShieldAlert, Rocket, Activity, ChevronDown, ChevronUp } from 'lucide-react';
import { pipelineSteps } from '../data/pipelineAndBuildingData';

export const DevOpsPipeline: React.FC = () => {
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
      className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12"
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
                    className="flex flex-col items-center text-center cursor-pointer group w-24 shrink-0"
                    onClick={() => setActiveStep(isSelected ? null : idx)}
                    role="button"
                    tabIndex={0}
                    aria-expanded={isSelected}
                    onKeyDown={e => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        setActiveStep(isSelected ? null : idx);
                      }
                    }}
                  >
                    <div
                      className={`w-11 h-11 rounded-full flex items-center justify-center mb-2 border transition-all ${
                        isSelected
                          ? 'bg-primary-container text-on-primary border-primary scale-110 shadow-lg'
                          : 'bg-surface-container-lowest border-cardBorder text-on-surface group-hover:border-outline-variant'
                      }`}
                    >
                      <IconComp className="w-5 h-5" />
                    </div>

                    <span className={`font-mono text-xs font-semibold ${
                      isSelected ? 'text-primary' : 'text-on-surface'
                    }`}>
                      {step.stepNumber}. {step.name}
                    </span>

                    <span className="font-mono text-[10px] text-on-surface-variant mt-0.5">
                      {step.subtext}
                    </span>

                    <span className={`font-mono text-[9px] px-1.5 py-0.2 rounded mt-1 border ${
                      step.badgeColor === 'primary' ? 'text-primary bg-primary/10 border-primary/30' :
                      step.badgeColor === 'secondary' ? 'text-secondary bg-secondary/10 border-secondary/30' :
                      'text-tertiary bg-tertiary/10 border-tertiary/30'
                    }`}>
                      {step.badge}
                    </span>

                    <div className="text-outline text-[10px] mt-1 opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-0.5">
                      {isSelected ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
                    </div>
                  </div>

                  {/* Connecting Line */}
                  {!isLast && (
                    <div className="flex-1 h-0.5 bg-surface-container-highest mt-5 mx-1" aria-hidden="true" />
                  )}
                </React.Fragment>
              );
            })}
          </div>
        </div>

        {/* Detail Panel on Active Step */}
        {activeStep !== null && (
          <div className="mt-6 p-4 rounded-lg bg-surface-container-lowest border border-cardBorder animate-in fade-in duration-200">
            <div className="flex items-center justify-between mb-2">
              <div className="font-mono text-xs font-bold text-primary flex items-center gap-2">
                <span>STAGE {pipelineSteps[activeStep].stepNumber}: {pipelineSteps[activeStep].name}</span>
                <span className="text-outline-variant">/</span>
                <span className="text-on-surface-variant font-normal">{pipelineSteps[activeStep].subtext}</span>
              </div>
              <button
                type="button"
                onClick={() => setActiveStep(null)}
                className="text-outline hover:text-white text-xs font-mono"
              >
                Close
              </button>
            </div>
            <ul className="grid grid-cols-1 md:grid-cols-3 gap-2 text-xs font-mono text-on-surface-variant">
              {pipelineSteps[activeStep].details.map((detail, dIdx) => (
                <li key={dIdx} className="p-2 rounded bg-surface-container border border-cardBorder/60 flex items-start gap-1.5">
                  <span className="text-tertiary font-bold">✓</span>
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

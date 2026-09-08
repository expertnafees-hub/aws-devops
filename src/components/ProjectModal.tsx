import React, { useState, useEffect } from 'react';
import { X, Copy, Check, ExternalLink, ShieldCheck, Cpu } from 'lucide-react';
import { ProjectCaseStudy } from '../types';

interface ProjectModalProps {
  project: ProjectCaseStudy | null;
  onClose: () => void;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({ project, onClose }) => {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };

    if (project) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }

    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [project, onClose]);

  if (!project) return null;

  const handleCopyCode = async () => {
    if (!project.iacSnippet) return;
    try {
      await navigator.clipboard.writeText(project.iacSnippet.code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-project-title"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-xl bg-[#0D1117] border border-cardBorder p-6 sm:p-8 text-on-surface shadow-2xl space-y-6"
        onClick={e => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-start justify-between gap-4 border-b border-cardBorder pb-4">
          <div>
            <div className="flex items-center gap-2 mb-2 font-mono text-xs">
              <span className="text-primary font-bold">{project.projectNumber} //</span>
              <span className="px-2 py-0.5 rounded bg-surface-container font-mono text-[10px] text-tertiary border border-cardBorder">
                {project.tag}
              </span>
            </div>
            <h2 id="modal-project-title" className="text-xl sm:text-2xl font-bold font-sans text-white">
              {project.title}
            </h2>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close project modal"
            className="p-1.5 rounded-lg bg-surface-container text-on-surface-variant hover:text-white hover:bg-surface-container-high transition-colors focus:ring-2 focus:ring-primary"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Narrative & Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2 space-y-4">
            <h3 className="font-mono text-xs text-secondary uppercase tracking-wider flex items-center gap-1.5">
              <Cpu className="w-4 h-4" />
              <span>Architectural Breakdown</span>
            </h3>
            <p className="text-sm text-on-surface-variant leading-relaxed font-sans">
              {project.fullDescription}
            </p>

            {/* Architecture bullet points */}
            <div className="space-y-2 pt-2">
              <span className="font-mono text-xs text-outline uppercase tracking-wider block">
                Key Components &amp; Controls:
              </span>
              <ul className="space-y-1.5 text-xs text-on-surface-variant font-sans list-disc list-inside">
                {project.architectureOverview.map((item, idx) => (
                  <li key={idx} className="leading-relaxed">
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Metrics & Tech Stack */}
          <div className="space-y-5 bg-surface-container-lowest p-4 rounded-lg border border-cardBorder">
            <div>
              <span className="font-mono text-[11px] text-outline uppercase tracking-wider block mb-3">
                Production Metrics
              </span>
              <div className="grid grid-cols-2 gap-2.5">
                {project.metrics.map(metric => (
                  <div key={metric.label} className="p-2 rounded bg-surface-container border border-cardBorder/60">
                    <div className="font-mono text-sm font-bold text-primary">
                      {metric.value}
                    </div>
                    <div className="text-[10px] text-on-surface-variant font-sans">
                      {metric.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <span className="font-mono text-[11px] text-outline uppercase tracking-wider block mb-2">
                Tech Stack
              </span>
              <div className="flex flex-wrap gap-1.5">
                {project.techStack.map(tech => (
                  <span
                    key={tech}
                    className="px-2 py-0.5 rounded bg-surface-container font-mono text-[11px] text-on-surface border border-cardBorder"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Code Snippet if present */}
        {project.iacSnippet && (
          <div className="rounded-lg bg-surface-container-lowest border border-cardBorder overflow-hidden">
            <div className="h-9 bg-surface-container-low px-4 flex items-center justify-between border-b border-cardBorder select-none">
              <span className="font-mono text-xs text-on-surface-variant flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-tertiary" />
                <span>{project.iacSnippet.filename}</span>
              </span>
              <button
                type="button"
                onClick={handleCopyCode}
                className="flex items-center gap-1 text-[11px] font-mono text-outline hover:text-white transition-colors"
              >
                {copied ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-tertiary" />
                    <span className="text-tertiary">Copied</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>Copy HCL</span>
                  </>
                )}
              </button>
            </div>
            <pre className="p-4 font-mono text-xs text-on-surface overflow-x-auto leading-relaxed bg-[#070A0F]">
              <code>{project.iacSnippet.code}</code>
            </pre>
          </div>
        )}

        {/* Footer actions */}
        <div className="flex items-center justify-between pt-4 border-t border-cardBorder">
          <a
            href={project.githubUrl}
            target="_blank"
            rel="noreferrer"
            className="px-4 py-2 rounded bg-surface-container-high hover:bg-surface-bright text-white font-mono text-xs flex items-center gap-2 border border-cardBorder transition-colors"
          >
            <span>Inspect GitHub Repository</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>

          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded bg-surface-container text-on-surface-variant hover:text-white font-mono text-xs transition-colors"
          >
            Close Breakdown
          </button>
        </div>
      </div>
    </div>
  );
};

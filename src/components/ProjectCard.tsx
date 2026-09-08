import React from 'react';
import { ProjectCaseStudy } from '../types';
import { Eye, ExternalLink } from '../assets/icons';

interface ProjectCardProps {
  project: ProjectCaseStudy;
  onOpenDetails: (project: ProjectCaseStudy) => void;
  renderVisual?: React.ReactNode;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({
  project,
  onOpenDetails,
  renderVisual
}) => {
  const tagColorClass = {
    primary: 'text-primary bg-primary/10 border-primary/20',
    secondary: 'text-secondary bg-secondary/10 border-secondary/20',
    tertiary: 'text-tertiary bg-tertiary/10 border-tertiary/20'
  }[project.tagColor];

  return (
    <div className="rounded-xl bg-surface-container-low border border-cardBorder p-6 md:p-8 hover:bg-surface-container-low/90 transition-all shadow-xl">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        <div className="lg:col-span-6 flex flex-col">
          <div className="flex items-center gap-2 mb-3">
            <span className="font-mono text-xs text-primary font-bold">
              {project.projectNumber} //
            </span>
            <span className={`px-2 py-0.5 rounded font-mono text-[10px] uppercase border ${tagColorClass}`}>
              {project.tag}
            </span>
          </div>

          <h3 className="text-xl sm:text-2xl font-bold font-sans text-on-surface mb-3">
            {project.title}
          </h3>

          <p className="text-sm text-on-surface-variant mb-5 font-sans leading-relaxed">
            {project.summary}
          </p>

          {/* Metadata Grid */}
          <div className="grid grid-cols-2 gap-2 mb-6">
            {project.metadata.map((meta, idx) => (
              <div
                key={idx}
                className="p-2.5 rounded bg-surface-container border border-cardBorder font-mono text-xs text-on-surface flex items-center gap-2"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-secondary" />
                <span className="truncate">{meta.label}</span>
              </div>
            ))}
          </div>

          {/* Action CTAs */}
          <div className="flex flex-wrap items-center gap-4">
            <button
              type="button"
              onClick={() => onOpenDetails(project)}
              className="px-4 py-2 rounded bg-primary text-on-primary font-mono text-xs font-semibold hover:bg-primary-hover flex items-center gap-1.5 transition-colors shadow-sm focus-visible:ring-2 focus-visible:ring-primary"
            >
              <span>View Technical Breakdown</span>
              <Eye className="w-4 h-4" />
            </button>

            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noreferrer"
                className="font-mono text-xs text-on-surface-variant hover:text-on-surface flex items-center gap-1 transition-colors"
              >
                <span>source repository</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            )}
          </div>
        </div>

        {/* Visual schematic container */}
        <div className="lg:col-span-6 rounded-lg bg-surface-container-lowest border border-cardBorder p-5 overflow-hidden">
          {renderVisual}
        </div>
      </div>
    </div>
  );
};

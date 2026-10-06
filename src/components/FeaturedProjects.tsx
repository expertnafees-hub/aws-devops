import React, { useState } from 'react';
import { FolderGit2, ExternalLink } from 'lucide-react';
import { projectsData } from '../data/projectsData';
import { evidenceSnapshot } from '../data/portfolioEvidence';
import { ProjectCaseStudy } from '../types';
import { ProjectCard } from './ProjectCard';
import { ProjectModal } from './ProjectModal';

export const FeaturedProjects: React.FC = () => {
  const [selectedProject, setSelectedProject] = useState<ProjectCaseStudy | null>(null);
  return (
    <section id="projects" className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 border-b border-cardBorder" aria-label="Featured Infrastructure Projects">
      <div className="mb-10">
        <div className="font-mono text-xs text-primary uppercase tracking-widest mb-1 flex items-center gap-2">
          <FolderGit2 className="w-4 h-4" /><span>Public project evidence</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-semibold text-on-surface">Featured Infrastructure Projects</h2>
        <p className="text-sm text-on-surface-variant mt-2 max-w-3xl leading-relaxed">
          Six projects across seven code repositories. Each card distinguishes configured scope, recorded results, and remaining work. Evidence reviewed {evidenceSnapshot}.
        </p>
      </div>
      <div className="space-y-8">
        {projectsData.map(project => (
          <ProjectCard key={project.id} project={project} onOpenDetails={setSelectedProject} renderVisual={
            <div className="space-y-4">
              <span className="font-mono text-xs text-secondary uppercase tracking-wider">Evidence &amp; remaining work</span>
              <p className="text-sm text-on-surface-variant leading-relaxed">{project.evidenceNote}</p>
              <div className="grid grid-cols-2 gap-3">
                {project.metrics.map(item => (
                  <div key={item.label} className="p-3 rounded bg-surface-container border border-cardBorder">
                    <div className="text-sm font-mono text-on-surface">{item.value}</div>
                    <div className="text-xs text-on-surface-variant mt-1">{item.label}</div>
                  </div>
                ))}
              </div>
              <a href={project.evidenceUrl} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 text-xs text-primary hover:text-white font-mono">
                <span>{project.evidenceLabel}</span><ExternalLink className="w-4 h-4 shrink-0" />
              </a>
              {project.relatedRepositories?.map(repo => (
                <a key={repo.url} href={repo.url} target="_blank" rel="noreferrer" className="block text-xs text-secondary hover:text-white font-mono break-all">Companion repo: {repo.name} ↗</a>
              ))}
            </div>
          } />
        ))}
      </div>
      <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />
    </section>
  );
};

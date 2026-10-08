import React from 'react';
import { GitCommit, ExternalLink } from 'lucide-react';
import { githubRepositories } from '../data/githubData';
import { githubProfileUrl } from '../data/portfolioEvidence';
import { RepositoryCard } from './RepositoryCard';

export const GitHubPublic: React.FC = () => (
  <section id="public-work" className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16" aria-label="Public GitHub repositories">
    <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
      <div>
        <div className="font-mono text-xs text-tertiary uppercase tracking-widest mb-1 flex items-center gap-2"><GitCommit className="w-4 h-4" /><span>Source code &amp; workflow records</span></div>
        <h2 className="text-2xl sm:text-3xl font-semibold text-on-surface">Engineering in Public</h2>
      </div>
      <a href={githubProfileUrl} target="_blank" rel="noreferrer" className="font-mono text-xs text-secondary hover:text-white flex items-center gap-2 break-all">
        <span>View GitHub Profile &amp; Repositories</span><ExternalLink className="w-4 h-4 shrink-0" />
      </a>
    </div>
    <p className="text-sm text-on-surface-variant mb-6 max-w-3xl leading-relaxed">
      Public repositories containing my AWS infrastructure as code, container delivery pipelines, and automation workflows. Explore the source code and commit histories directly on GitHub.
    </p>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {githubRepositories.map(repo => <RepositoryCard key={repo.name} repo={repo} />)}
    </div>
  </section>
);

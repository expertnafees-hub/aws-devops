import React from 'react';
import { GitRepository } from '../types';
import { FolderGit2, ExternalLink } from '../assets/icons';

export const RepositoryCard: React.FC<{ repo: GitRepository }> = ({ repo }) => (
  <a href={repo.githubUrl} target="_blank" rel="noreferrer" className="p-5 rounded-xl bg-surface-container-low border border-cardBorder hover:border-primary/40 transition-all flex flex-col justify-between group focus-visible:ring-2 focus-visible:ring-primary">
    <div>
      <div className="flex items-start gap-2 mb-3 text-primary">
        <FolderGit2 className="w-4 h-4 mt-0.5 shrink-0" />
        <span className="font-mono text-sm font-semibold break-all">{repo.name}</span>
        <ExternalLink className="w-3.5 h-3.5 ml-auto shrink-0" />
      </div>
      <p className="text-sm text-on-surface-variant leading-relaxed mb-4">{repo.description}</p>
      <p className="text-xs text-secondary mb-4">{repo.status}</p>
    </div>
    <div className="flex items-center gap-3 font-mono text-xs text-on-surface-variant border-t border-cardBorder pt-3">
      <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full" style={{ backgroundColor: repo.languageColor }} />{repo.language}</span>
      <span>{repo.branch}</span>
    </div>
  </a>
);

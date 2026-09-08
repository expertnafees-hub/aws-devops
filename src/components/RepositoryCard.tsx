import React from 'react';
import { GitRepository } from '../types';
import { FolderGit2, Star } from '../assets/icons';

interface RepositoryCardProps {
  repo: GitRepository;
}

export const RepositoryCard: React.FC<RepositoryCardProps> = ({ repo }) => {
  return (
    <a
      href={repo.githubUrl}
      target="_blank"
      rel="noreferrer"
      className="p-5 rounded-xl bg-surface-container-low border border-cardBorder hover:border-outline-variant hover:bg-surface-container transition-all flex flex-col justify-between shadow-xs group focus-visible:ring-2 focus-visible:ring-primary"
    >
      <div>
        <div className="flex items-center justify-between mb-2">
          <span className="font-mono text-xs sm:text-sm font-semibold text-primary flex items-center gap-1.5 group-hover:text-primary-fixed transition-colors">
            <FolderGit2 className="w-4 h-4" />
            <span>{repo.name}</span>
          </span>

          <span className="font-mono text-[11px] text-on-surface-variant flex items-center gap-1">
            <Star className="w-3.5 h-3.5 text-primary fill-primary/30" />
            <span>{repo.stars}</span>
          </span>
        </div>

        <p className="text-xs sm:text-sm text-on-surface-variant mb-4 font-sans leading-relaxed">
          {repo.description}
        </p>
      </div>

      <div className="flex items-center gap-3 font-mono text-[11px] text-outline border-t border-cardBorder/60 pt-3">
        <span className="flex items-center gap-1.5 text-on-surface">
          <span
            className="w-2 h-2 rounded-full"
            style={{ backgroundColor: repo.languageColor }}
          />
          {repo.language}
        </span>
        <span>•</span>
        <span>{repo.branch}</span>
        <span>•</span>
        <span className="text-on-surface-variant">{repo.updatedAt}</span>
      </div>
    </a>
  );
};

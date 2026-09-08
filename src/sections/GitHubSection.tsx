import React from 'react';
import { GitBranch, Star, ExternalLink, FolderGit2 } from '../assets/icons';
import { publicRepositories, generateHeatmapData } from '../data/githubData';

export const GitHubSection: React.FC = () => {
  const heatmapWeeks = generateHeatmapData();

  const getHeatmapColor = (level: number) => {
    switch (level) {
      case 1: return 'bg-tertiary/20';
      case 2: return 'bg-tertiary/40';
      case 3: return 'bg-tertiary/70';
      case 4: return 'bg-tertiary';
      default: return 'bg-surface-container';
    }
  };

  return (
    <section
      className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 border-b border-cardBorder"
      aria-label="GitHub Open Source and Activity"
    >
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
        <div>
          <div className="font-mono text-xs text-tertiary uppercase tracking-widest mb-1 flex items-center gap-2">
            <GitBranch className="w-4 h-4 text-tertiary" />
            <span>Open Source &amp; Public Commits</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-semibold text-on-surface font-sans">
            Engineering in Public
          </h2>
        </div>

        <a
          href="https://github.com/expertnafees-hub"
          target="_blank"
          rel="noreferrer"
          className="font-mono text-xs text-secondary hover:text-white flex items-center gap-1.5 transition-colors p-2 rounded hover:bg-surface-container self-start md:self-auto"
        >
          <span>github.com/expertnafees-hub</span>
          <ExternalLink className="w-3.5 h-3.5" />
        </a>
      </div>

      {/* GitHub Activity Heatmap */}
      <div className="rounded-xl bg-surface-container-low border border-cardBorder p-6 mb-8 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 gap-2">
          <span className="font-mono text-xs text-on-surface-variant">
            Commit telemetry: 640+ contributions in the last year
          </span>

          <div className="flex items-center gap-1.5 font-mono text-[10px] text-outline self-end sm:self-auto">
            <span>Less</span>
            <span className="w-2.5 h-2.5 rounded-xs bg-surface-container border border-cardBorder/60" />
            <span className="w-2.5 h-2.5 rounded-xs bg-tertiary/20" />
            <span className="w-2.5 h-2.5 rounded-xs bg-tertiary/40" />
            <span className="w-2.5 h-2.5 rounded-xs bg-tertiary/70" />
            <span className="w-2.5 h-2.5 rounded-xs bg-tertiary" />
            <span>More</span>
          </div>
        </div>

        {/* Heatmap Grid Representation */}
        <div className="overflow-x-auto pb-2 scrollbar-thin">
          <div className="grid grid-flow-col grid-rows-7 gap-1 min-w-[700px]">
            {heatmapWeeks.map((day, idx) => (
              <div
                key={idx}
                className={`w-3 h-3 rounded-xs ${getHeatmapColor(day.level)} hover:scale-125 transition-transform cursor-pointer border border-black/10`}
                title={`${day.count} contributions on ${day.date}`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* 4 Structured Repository Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {publicRepositories.map(repo => (
          <a
            key={repo.name}
            href={repo.githubUrl}
            target="_blank"
            rel="noreferrer"
            className="p-5 rounded-xl bg-surface-container-low border border-cardBorder hover:border-outline-variant hover:bg-surface-container transition-all flex flex-col justify-between shadow-sm group"
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
              <span>main</span>
              <span>•</span>
              <span className="text-on-surface-variant">{repo.updatedAt}</span>
            </div>
          </a>
        ))}
      </div>
    </section>
  );
};

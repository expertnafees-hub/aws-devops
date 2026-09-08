import React, { useState, useMemo } from 'react';
import { GitCommit, Star, ExternalLink, FolderGit2 } from 'lucide-react';
import { githubRepositories, generateContributionMatrix, HeatmapDay } from '../data/githubData';

export const GitHubPublic: React.FC = () => {
  const [hoveredDay, setHoveredDay] = useState<HeatmapDay | null>(null);

  const heatmapDays = useMemo(() => generateContributionMatrix(), []);

  const getHeatmapColor = (level: number) => {
    switch (level) {
      case 1: return 'bg-tertiary/30';
      case 2: return 'bg-tertiary/55';
      case 3: return 'bg-tertiary/80';
      case 4: return 'bg-tertiary';
      default: return 'bg-surface-container';
    }
  };

  return (
    <section
      id="public-work"
      className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16"
      aria-label="Engineering in Public and Open Source"
    >
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
        <div>
          <div className="font-mono text-xs text-tertiary uppercase tracking-widest mb-1 flex items-center gap-2">
            <GitCommit className="w-4 h-4 text-tertiary" />
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
          className="font-mono text-xs text-secondary hover:text-white flex items-center gap-1.5 transition-colors px-3 py-1.5 rounded bg-surface-container-low border border-cardBorder hover:border-secondary"
        >
          <span>github.com/expertnafees-hub</span>
          <ExternalLink className="w-3.5 h-3.5" />
        </a>
      </div>

      {/* GitHub Activity Heatmap */}
      <div className="rounded-xl bg-surface-container-low border border-cardBorder p-6 mb-8 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 gap-2">
          <div className="font-mono text-xs text-on-surface-variant flex items-center gap-2">
            <span>Commit telemetry: 640+ contributions in the last year</span>
            {hoveredDay && (
              <span className="text-white bg-surface-container px-2 py-0.5 rounded border border-cardBorder text-[11px] animate-in fade-in">
                {hoveredDay.count} commits on {hoveredDay.date}
              </span>
            )}
          </div>

          <div className="flex items-center gap-1.5 font-mono text-[10px] text-outline self-start sm:self-auto">
            <span>Less</span>
            <span className="w-2.5 h-2.5 rounded-sm bg-surface-container border border-cardBorder/40"></span>
            <span className="w-2.5 h-2.5 rounded-sm bg-tertiary/30"></span>
            <span className="w-2.5 h-2.5 rounded-sm bg-tertiary/55"></span>
            <span className="w-2.5 h-2.5 rounded-sm bg-tertiary/80"></span>
            <span className="w-2.5 h-2.5 rounded-sm bg-tertiary"></span>
            <span>More</span>
          </div>
        </div>

        {/* Heatmap Grid */}
        <div className="overflow-x-auto pb-2 scrollbar-thin">
          <div className="grid grid-flow-col grid-rows-7 gap-1 min-w-[700px] py-1">
            {heatmapDays.map((day, idx) => (
              <div
                key={idx}
                className={`w-3 h-3 rounded-sm ${getHeatmapColor(day.level)} cursor-pointer transition-transform hover:scale-125`}
                onMouseEnter={() => setHoveredDay(day)}
                onMouseLeave={() => setHoveredDay(null)}
                aria-label={`${day.count} commits on ${day.date}`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* 4 Structured Repository Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {githubRepositories.map(repo => (
          <a
            key={repo.name}
            href={repo.githubUrl}
            target="_blank"
            rel="noreferrer"
            className="p-5 rounded-lg bg-surface-container-low border border-cardBorder hover:bg-surface-container hover:border-primary/40 transition-all flex flex-col justify-between group shadow-sm"
          >
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="font-mono text-sm font-semibold text-primary flex items-center gap-2 group-hover:text-white transition-colors">
                  <FolderGit2 className="w-4 h-4 text-primary" />
                  <span>{repo.name}</span>
                </span>
                <span className="font-mono text-[11px] text-on-surface-variant flex items-center gap-1">
                  <Star className="w-3.5 h-3.5 text-primary fill-primary/30" />
                  {repo.stars}
                </span>
              </div>
              <p className="text-xs text-on-surface-variant mb-4 leading-relaxed font-sans">
                {repo.description}
              </p>
            </div>

            <div className="flex items-center gap-3 font-mono text-[11px] text-outline pt-2 border-t border-cardBorder/60">
              <span className="flex items-center gap-1.5 text-on-surface-variant">
                <span
                  className="w-2 h-2 rounded-full inline-block"
                  style={{ backgroundColor: repo.languageColor }}
                ></span>
                <span>{repo.language}</span>
              </span>
              <span>•</span>
              <span>{repo.branch}</span>
              <span>•</span>
              <span>{repo.updatedAt}</span>
            </div>
          </a>
        ))}
      </div>
    </section>
  );
};

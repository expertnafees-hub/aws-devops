import React, { useState } from 'react';
import { Layers, Cloud, Code, Box, Rocket, Terminal, Brain, Filter } from 'lucide-react';
import { stackData } from '../data/stackData';
import { ProficiencyLevel } from '../types';

export const StackSection: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState<'all' | ProficiencyLevel>('all');

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'cloud': return Cloud;
      case 'code_blocks': return Code;
      case 'developer_board': return Box;
      case 'rocket_launch': return Rocket;
      case 'terminal': return Terminal;
      case 'psychology': return Brain;
      default: return Layers;
    }
  };

  return (
    <section
      id="stack"
      className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 border-b border-cardBorder"
      aria-label="Engineering Stack and Taxonomy"
    >
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
        <div>
          <div className="font-mono text-xs text-primary uppercase tracking-widest mb-1 flex items-center gap-2">
            <Layers className="w-4 h-4 text-primary" />
            <span>Infrastructure Taxonomy</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-semibold text-on-surface font-sans">
            Engineering Stack &amp; Tooling
          </h2>
          <p className="text-sm text-on-surface-variant max-w-2xl mt-1.5 leading-relaxed font-sans">
            Deterministic, hardened platforms built on modern cloud conventions, declarative definitions, and security-first engineering.
          </p>
        </div>

        {/* Filter Tabs with Accessible ARIA roles */}
        <div
          role="tablist"
          aria-label="Stack filter tabs"
          className="flex items-center gap-1.5 p-1 bg-surface-container-low rounded border border-cardBorder self-start md:self-auto"
        >
          <span className="text-[10px] font-mono text-outline uppercase px-2 flex items-center gap-1">
            <Filter className="w-3 h-3" />
            <span className="hidden sm:inline">Status:</span>
          </span>
          {(['all', 'proficient', 'learning', 'planned'] as const).map(filter => (
            <button
              key={filter}
              type="button"
              role="tab"
              aria-selected={activeFilter === filter}
              onClick={() => setActiveFilter(filter)}
              className={`px-2.5 py-1 rounded text-xs font-mono capitalize transition-colors ${
                activeFilter === filter
                  ? 'bg-surface-container-high text-white font-medium border border-cardBorder shadow-xs'
                  : 'text-on-surface-variant hover:text-white'
              }`}
            >
              {filter}
            </button>
          ))}
        </div>
      </div>

      {/* 6 Taxonomy Domain Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {stackData.map(domain => {
          const IconComp = getIcon(domain.icon);
          const filteredSkills = domain.skills.filter(skill =>
            activeFilter === 'all' ? true : skill.status === activeFilter
          );

          return (
            <div
              key={domain.id}
              className="p-6 rounded-xl bg-surface-container-low border border-cardBorder flex flex-col justify-between hover:border-outline-variant hover:bg-surface-container/70 transition-all shadow-md group"
            >
              <div>
                <div className={`w-10 h-10 rounded bg-surface-container border border-cardBorder flex items-center justify-center mb-4 ${
                  domain.accentColor === 'primary' ? 'text-primary' : domain.accentColor === 'secondary' ? 'text-secondary' : 'text-tertiary'
                }`}>
                  <IconComp className="w-5 h-5" />
                </div>

                <h3 className="text-lg font-semibold font-sans text-on-surface mb-2 group-hover:text-primary transition-colors">
                  {domain.title}
                </h3>

                <p className="text-xs text-on-surface-variant mb-4 leading-relaxed font-sans">
                  {domain.description}
                </p>
              </div>

              {/* Skills Chips Strip */}
              <div className="pt-3 bg-surface-container-lowest/60 p-2.5 rounded border border-cardBorder/60">
                <div className="flex flex-wrap gap-1.5">
                  {filteredSkills.length > 0 ? (
                    filteredSkills.map(skill => (
                      <span
                        key={skill.name}
                        className={`px-2 py-0.5 rounded font-mono text-xs border ${
                          skill.highlight
                            ? 'bg-primary/10 border-primary/40 text-primary font-semibold'
                            : 'bg-surface-container border-cardBorder text-on-surface'
                        }`}
                        title={`Status: ${skill.status}`}
                      >
                        {skill.name}
                      </span>
                    ))
                  ) : (
                    <span className="text-[11px] font-mono text-outline italic">
                      No tools matching '{activeFilter}'
                    </span>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

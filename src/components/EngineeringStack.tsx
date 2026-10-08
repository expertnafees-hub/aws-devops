import React, { useState } from 'react';
import { Layers, Cloud, Code, Box, Rocket, Terminal, Brain, Filter } from 'lucide-react';
import { stackData } from '../data/stackData';
import { ProficiencyLevel } from '../types';

export const EngineeringStack: React.FC = () => {
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
      className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16"
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
            Core technologies and cloud services applied across my GitHub repositories, alongside active learning areas.
          </p>
        </div>

        {/* Filter Tabs */}
        <div className="flex items-center gap-1.5 p-1 bg-surface-container-low rounded border border-cardBorder self-start md:self-auto">
          <span className="text-[10px] font-mono text-outline uppercase px-2 flex items-center gap-1">
            <Filter className="w-3 h-3" />
            <span className="hidden sm:inline">Status:</span>
          </span>
          {(['all', 'project-use', 'learning', 'planned'] as const).map(filter => (
            <button
              key={filter}
              type="button"
              onClick={() => setActiveFilter(filter)}
              className={`px-2.5 py-1 rounded text-xs font-mono capitalize transition-colors ${
                activeFilter === filter
                  ? 'bg-surface-container-high text-white font-medium border border-cardBorder'
                  : 'text-on-surface-variant hover:text-white'
              }`}
            >
              {filter === 'project-use' ? 'Hands-on projects' : filter === 'learning' ? 'Learning' : filter === 'planned' ? 'Planned' : 'All'}
            </button>
          ))}
        </div>
      </div>

      {/* Grid of 6 domains */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {stackData.map(domain => {
          const IconComponent = getIcon(domain.icon);
          const filteredSkills = activeFilter === 'all'
            ? domain.skills
            : domain.skills.filter(s => s.status === activeFilter);

          return (
            <div
              key={domain.id}
              className="p-6 rounded-lg bg-surface-container-low border border-cardBorder flex flex-col justify-between hover:bg-surface-container hover:border-outline-variant transition-all"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className={`w-10 h-10 rounded bg-surface-container border border-cardBorder flex items-center justify-center ${
                    domain.accentColor === 'primary' ? 'text-primary' : domain.accentColor === 'secondary' ? 'text-secondary' : 'text-tertiary'
                  }`}>
                    <IconComponent className="w-5 h-5" />
                  </div>
                  <span className="text-[11px] font-mono text-outline">
                    {filteredSkills.length} tools
                  </span>
                </div>

                <h3 className="text-base sm:text-lg text-on-surface font-semibold font-sans mb-1.5">
                  {domain.title}
                </h3>
                <p className="text-xs text-on-surface-variant mb-5 leading-relaxed">
                  {domain.description}
                </p>
              </div>

              {/* Skills pills */}
              <div className="flex flex-wrap gap-1.5 pt-3 bg-surface-container-lowest/60 p-2.5 rounded border border-cardBorder/60 min-h-[58px]">
                {filteredSkills.length > 0 ? (
                  filteredSkills.map(skill => {
                    const statusDotColor =
                      skill.status === 'project-use' ? 'bg-tertiary' :
                      skill.status === 'learning' ? 'bg-secondary' : 'bg-primary';

                    return (
                      <span
                        key={skill.name}
                        className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded bg-surface-container border border-cardBorder font-mono text-xs ${
                          skill.highlight ? 'text-white font-medium' : 'text-on-surface-variant'
                        }`}
                        title={skill.status === 'project-use' ? 'Hands-on project work' : skill.status === 'learning' ? 'Active learning' : 'Planned milestone'}
                      >
                        <span className={`w-1.5 h-1.5 rounded-full ${statusDotColor}`} />
                        <span>{skill.name}</span>
                      </span>
                    );
                  })
                ) : (
                  <span className="text-xs font-mono text-outline-variant self-center italic">
                    No items match filter '{activeFilter}'
                  </span>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

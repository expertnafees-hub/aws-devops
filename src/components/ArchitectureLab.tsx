import React, { useState } from 'react';
import { Network, ExternalLink } from 'lucide-react';
import { architectureData } from '../data/architectureData';
import { projectsData } from '../data/projectsData';
import { ArchitectureNodeInfo } from '../types';
import { NodeInspectorDrawer } from './NodeInspectorDrawer';

export const ArchitectureLab: React.FC = () => {
  const [selectedNode, setSelectedNode] = useState<ArchitectureNodeInfo | null>(null);
  return (
    <section id="architecture" className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 border-b border-cardBorder" aria-label="Architecture walkthroughs">
      <div className="mb-10">
        <div className="font-mono text-xs text-primary uppercase tracking-widest mb-1 flex items-center gap-2"><Network className="w-4 h-4" /><span>Architecture walkthroughs</span></div>
        <h2 className="text-2xl sm:text-3xl font-semibold text-on-surface">Architecture Lab</h2>
        <p className="text-sm text-on-surface-variant max-w-3xl mt-2 leading-relaxed">Explore the configured components and recorded delivery milestones. These walkthroughs describe project code and historical evidence. Select a component to inspect its boundaries and remaining validation.</p>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {architectureData.map(system => {
          const project = projectsData.find(item => item.id === system.id);
          return (
            <article key={system.id} className="rounded-xl bg-surface-container-low border border-cardBorder p-6 flex flex-col">
              <div className="flex flex-wrap items-center justify-between gap-2 mb-3 font-mono text-[10px]"><span className="text-primary">{system.systemNumber}</span><span className="text-secondary px-2 py-1 border border-cardBorder rounded">{system.badge}</span></div>
              <h3 className="text-lg font-semibold text-on-surface mb-2">{system.title}</h3>
              <p className="text-sm text-on-surface-variant leading-relaxed mb-5">{system.description}</p>
              <div className="space-y-3 mb-5">
                {system.nodes.map((node, index) => (
                  <button key={node.id} type="button" onClick={() => setSelectedNode(node)} aria-label={`Inspect ${node.name}`} className="w-full flex items-center gap-3 p-3 text-left rounded bg-surface-container-lowest border border-cardBorder hover:border-primary/50 focus-visible:ring-2 focus-visible:ring-primary transition-colors">
                    <span className="text-secondary font-mono text-xs">0{index + 1}</span>
                    <span className="text-sm text-on-surface">{node.name}</span><span className="ml-auto text-primary">↗</span>
                  </button>
                ))}
              </div>
              <div className="mt-auto border-t border-cardBorder pt-4 space-y-2 text-xs text-on-surface-variant"><p>{system.ingressText}</p><p>{system.healthText}</p>
                {project && <a href={project.evidenceUrl} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 text-primary hover:text-white">View project evidence<ExternalLink className="w-3.5 h-3.5" /></a>}
              </div>
            </article>
          );
        })}
      </div>
      <NodeInspectorDrawer node={selectedNode} onClose={() => setSelectedNode(null)} />
    </section>
  );
};

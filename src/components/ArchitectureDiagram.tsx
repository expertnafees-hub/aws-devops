import React from 'react';
import { ArchitectureSystem, ArchitectureNodeInfo } from '../types';

interface ArchitectureDiagramProps {
  system: ArchitectureSystem;
  onSelectNode: (node: ArchitectureNodeInfo) => void;
  selectedNodeId?: string | null;
}

export const ArchitectureDiagram: React.FC<ArchitectureDiagramProps> = ({
  system,
  onSelectNode,
  selectedNodeId
}) => {
  // Find node helper
  const getNode = (id: string) => system.nodes.find(n => n.id === id) || system.nodes[0];

  if (system.id === 'system-01') {
    return (
      <div className="w-full h-56 sm:h-64 rounded-xl bg-surface-container-lowest border border-cardBorder p-4 flex items-center justify-center relative overflow-hidden">
        <svg className="w-full h-full text-on-surface-variant max-w-2xl" viewBox="0 0 540 160">
          <defs>
            <linearGradient id="flow-grad-1" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#22D3EE" />
              <stop offset="100%" stopColor="#FF9900" />
            </linearGradient>
          </defs>

          {/* Route 53 Node */}
          <g
            className="interactive-svg-node cursor-pointer group"
            tabIndex={0}
            role="button"
            aria-label="Route 53 DNS Ingress Node"
            onClick={() => onSelectNode(getNode('node-r53'))}
            onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && onSelectNode(getNode('node-r53'))}
          >
            <rect
              x="10"
              y="55"
              width="80"
              height="48"
              rx="6"
              className={`transition-all ${
                selectedNodeId === 'node-r53'
                  ? 'fill-surface-container stroke-primary stroke-2'
                  : 'fill-surface-container-low stroke-cardBorder group-hover:stroke-secondary'
              }`}
            />
            <text x="50" y="78" fill="#5de6ff" fontFamily="JetBrains Mono" fontSize="10" fontWeight="bold" textAnchor="middle">
              Route 53
            </text>
            <text x="50" y="93" fill="#8B949E" fontFamily="JetBrains Mono" fontSize="8" textAnchor="middle">
              Latency DNS
            </text>
          </g>

          {/* Flow line: Route 53 -> CloudFront */}
          <line x1="90" y1="79" x2="135" y2="79" stroke="#5de6ff" strokeWidth="2" strokeDasharray="4 4" className="animate-flow-dash" />

          {/* CloudFront Node */}
          <g
            className="interactive-svg-node cursor-pointer group"
            tabIndex={0}
            role="button"
            aria-label="CloudFront CDN Edge Node"
            onClick={() => onSelectNode(getNode('node-cf'))}
            onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && onSelectNode(getNode('node-cf'))}
          >
            <rect
              x="135"
              y="55"
              width="90"
              height="48"
              rx="6"
              className={`transition-all ${
                selectedNodeId === 'node-cf'
                  ? 'fill-surface-container stroke-primary stroke-2'
                  : 'fill-surface-container-low stroke-cardBorder group-hover:stroke-primary'
              }`}
            />
            <text x="180" y="78" fill="#ffc082" fontFamily="JetBrains Mono" fontSize="10" fontWeight="bold" textAnchor="middle">
              CloudFront
            </text>
            <text x="180" y="93" fill="#8B949E" fontFamily="JetBrains Mono" fontSize="8" textAnchor="middle">
              Edge Cache
            </text>
          </g>

          {/* Flow line: CloudFront -> ALB */}
          <line x1="225" y1="79" x2="270" y2="79" stroke="#ff9900" strokeWidth="2" strokeDasharray="4 4" className="animate-flow-dash" />

          {/* ALB Node */}
          <g
            className="interactive-svg-node cursor-pointer group"
            tabIndex={0}
            role="button"
            aria-label="Application Load Balancer Node"
            onClick={() => onSelectNode(getNode('node-alb'))}
            onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && onSelectNode(getNode('node-alb'))}
          >
            <rect
              x="270"
              y="55"
              width="85"
              height="48"
              rx="6"
              className={`transition-all ${
                selectedNodeId === 'node-alb'
                  ? 'fill-surface-container stroke-primary stroke-2'
                  : 'fill-surface-container-low stroke-cardBorder group-hover:stroke-primary'
              }`}
            />
            <text x="312" y="78" fill="#ff9900" fontFamily="JetBrains Mono" fontSize="10" fontWeight="bold" textAnchor="middle">
              Dual ALB
            </text>
            <text x="312" y="93" fill="#8B949E" fontFamily="JetBrains Mono" fontSize="8" textAnchor="middle">
              Layer-7 Ingress
            </text>
          </g>

          {/* Branches to AZ-A and AZ-B */}
          <path d="M 355 79 L 380 40 L 405 40" fill="none" stroke="#3FB950" strokeWidth="2" strokeDasharray="4 4" className="animate-flow-dash" />
          <path d="M 355 79 L 380 118 L 405 118" fill="none" stroke="#3FB950" strokeWidth="2" strokeDasharray="4 4" className="animate-flow-dash" />

          {/* AZ-A Compute Node */}
          <g
            className="interactive-svg-node cursor-pointer group"
            tabIndex={0}
            role="button"
            aria-label="AZ-A EC2 Auto-Scaling Fleet"
            onClick={() => onSelectNode(getNode('node-ec2a'))}
            onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && onSelectNode(getNode('node-ec2a'))}
          >
            <rect
              x="405"
              y="20"
              width="120"
              height="42"
              rx="6"
              className={`transition-all ${
                selectedNodeId === 'node-ec2a'
                  ? 'fill-surface-container stroke-tertiary stroke-2'
                  : 'fill-surface-container-low stroke-cardBorder group-hover:stroke-tertiary'
              }`}
            />
            <text x="465" y="38" fill="#3FB950" fontFamily="JetBrains Mono" fontSize="9" fontWeight="bold" textAnchor="middle">
              AZ-A EC2 Fleet
            </text>
            <text x="465" y="52" fill="#8B949E" fontFamily="JetBrains Mono" fontSize="8" textAnchor="middle">
              us-east-1a • ASG
            </text>
          </g>

          {/* AZ-B Compute Node */}
          <g
            className="interactive-svg-node cursor-pointer group"
            tabIndex={0}
            role="button"
            aria-label="AZ-B EC2 Auto-Scaling Fleet"
            onClick={() => onSelectNode(getNode('node-ec2b'))}
            onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && onSelectNode(getNode('node-ec2b'))}
          >
            <rect
              x="405"
              y="98"
              width="120"
              height="42"
              rx="6"
              className={`transition-all ${
                selectedNodeId === 'node-ec2b'
                  ? 'fill-surface-container stroke-tertiary stroke-2'
                  : 'fill-surface-container-low stroke-cardBorder group-hover:stroke-tertiary'
              }`}
            />
            <text x="465" y="116" fill="#3FB950" fontFamily="JetBrains Mono" fontSize="9" fontWeight="bold" textAnchor="middle">
              AZ-B EC2 Fleet
            </text>
            <text x="465" y="130" fill="#8B949E" fontFamily="JetBrains Mono" fontSize="8" textAnchor="middle">
              us-east-1b • ASG
            </text>
          </g>
        </svg>
      </div>
    );
  }

  // Generic fallback topology for other systems
  return (
    <div className="w-full h-56 sm:h-64 rounded-xl bg-surface-container-lowest border border-cardBorder p-4 flex items-center justify-center relative overflow-hidden">
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 w-full max-w-lg">
        {system.nodes.map((node) => (
          <button
            key={node.id}
            type="button"
            onClick={() => onSelectNode(node)}
            className={`p-3 rounded-lg border text-left transition-all focus-visible:ring-2 focus-visible:ring-primary ${
              selectedNodeId === node.id
                ? 'bg-surface-container border-primary shadow-md'
                : 'bg-surface-container-low border-cardBorder hover:border-outline-variant hover:bg-surface-container'
            }`}
          >
            <div className="font-mono text-[10px] text-secondary uppercase font-semibold mb-1 truncate">
              {node.role}
            </div>
            <div className="font-sans text-xs font-bold text-on-surface truncate mb-1">
              {node.name}
            </div>
            <div className="font-mono text-[9px] text-on-surface-variant truncate">
              {node.cidrOrEndpoint}
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

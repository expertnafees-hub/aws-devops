import React, { useEffect } from 'react';
import { X, Network, Shield, HeartPulse, RefreshCw, Cpu } from '../assets/icons';
import { ArchitectureNodeInfo } from '../types';

interface NodeInspectorDrawerProps {
  node: ArchitectureNodeInfo | null;
  onClose: () => void;
}

export const NodeInspectorDrawer: React.FC<NodeInspectorDrawerProps> = ({ node, onClose }) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };

    if (node) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }

    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [node, onClose]);

  if (!node) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      {/* Backdrop overlay */}
      <div
        className="fixed inset-0 bg-black/70 backdrop-blur-xs transition-opacity animate-in fade-in duration-200"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Drawer content */}
      <div
        className="relative z-10 w-full max-w-md bg-[#0D1117] border-l border-cardBorder shadow-2xl p-6 text-on-surface overflow-y-auto animate-in slide-in-from-right duration-300 flex flex-col justify-between"
        role="dialog"
        aria-modal="true"
        aria-labelledby="node-inspector-title"
      >
        <div>
          {/* Header */}
          <div className="flex items-center justify-between pb-4 border-b border-cardBorder mb-6">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded bg-surface-container flex items-center justify-center text-primary border border-cardBorder">
                <Cpu className="w-4 h-4" />
              </div>
              <div>
                <span className="font-mono text-[10px] text-outline uppercase tracking-wider block">
                  Node Telemetry Inspector
                </span>
                <h3 id="node-inspector-title" className="text-base font-bold font-mono text-white">
                  {node.name}
                </h3>
              </div>
            </div>

            <button
              type="button"
              onClick={onClose}
              aria-label="Close inspector drawer"
              className="p-1.5 rounded bg-surface-container text-on-surface-variant hover:text-white hover:bg-surface-container-high transition-colors focus:ring-2 focus:ring-primary focus:outline-none"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Node attributes */}
          <div className="space-y-4 text-xs font-mono">
            {/* Role */}
            <div className="p-3.5 rounded bg-surface-container-lowest border border-cardBorder">
              <span className="text-[10px] text-outline uppercase tracking-wider block mb-1">
                Component Role &amp; Scope
              </span>
              <p className="text-on-surface leading-relaxed font-sans text-xs">
                {node.role}
              </p>
            </div>

            {/* CIDR / Endpoint */}
            <div className="p-3.5 rounded bg-surface-container-lowest border border-cardBorder space-y-1">
              <div className="flex items-center gap-2 text-secondary">
                <Network className="w-3.5 h-3.5" />
                <span className="text-[10px] uppercase tracking-wider font-bold">
                  Network CIDR / Endpoint
                </span>
              </div>
              <div className="text-white font-medium pl-5 break-all">
                {node.cidrOrEndpoint}
              </div>
            </div>

            {/* Protocol & Ports */}
            <div className="p-3.5 rounded bg-surface-container-lowest border border-cardBorder space-y-1">
              <div className="flex items-center gap-2 text-primary">
                <Cpu className="w-3.5 h-3.5" />
                <span className="text-[10px] uppercase tracking-wider font-bold">
                  Allowed Protocols &amp; Ports
                </span>
              </div>
              <div className="text-white font-medium pl-5">
                {node.protocolPorts}
              </div>
            </div>

            {/* Security Group */}
            <div className="p-3.5 rounded bg-surface-container-lowest border border-cardBorder space-y-1">
              <div className="flex items-center gap-2 text-tertiary">
                <Shield className="w-3.5 h-3.5" />
                <span className="text-[10px] uppercase tracking-wider font-bold">
                  Security Group / Ingress Boundary
                </span>
              </div>
              <div className="text-white font-medium pl-5 leading-relaxed">
                {node.securityGroup}
              </div>
            </div>

            {/* Health Check */}
            <div className="p-3.5 rounded bg-surface-container-lowest border border-cardBorder space-y-1">
              <div className="flex items-center gap-2 text-tertiary">
                <HeartPulse className="w-3.5 h-3.5" />
                <span className="text-[10px] uppercase tracking-wider font-bold">
                  Health Check Specification
                </span>
              </div>
              <div className="text-on-surface pl-5 leading-relaxed">
                {node.healthCheck}
              </div>
            </div>

            {/* Failover / Recovery */}
            <div className="p-3.5 rounded bg-surface-container-lowest border border-cardBorder space-y-1">
              <div className="flex items-center gap-2 text-secondary">
                <RefreshCw className="w-3.5 h-3.5" />
                <span className="text-[10px] uppercase tracking-wider font-bold">
                  Automated Failover &amp; Recovery
                </span>
              </div>
              <div className="text-on-surface pl-5 leading-relaxed">
                {node.failover}
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-8 pt-4 border-t border-cardBorder">
          <button
            type="button"
            onClick={onClose}
            className="w-full py-2.5 rounded bg-surface-container text-on-surface hover:text-white font-mono text-xs transition-colors border border-cardBorder focus-visible:ring-2 focus-visible:ring-primary"
          >
            Close Inspector (ESC)
          </button>
        </div>
      </div>
    </div>
  );
};

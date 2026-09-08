import React, { useState } from 'react';
import { Network, Info, CheckCircle2 } from 'lucide-react';
import { architectureData } from '../data/architectureData';
import { ArchitectureNodeInfo } from '../types';
import { NodeInspectorDrawer } from './NodeInspectorDrawer';

export const ArchitectureLab: React.FC = () => {
  const [selectedNode, setSelectedNode] = useState<ArchitectureNodeInfo | null>(null);

  const sys1 = architectureData[0];
  const sys2 = architectureData[1];
  const sys3 = architectureData[2];
  const sys4 = architectureData[3];

  return (
    <section
      id="architecture"
      className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 border-b border-cardBorder"
      aria-label="Architecture Lab"
    >
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
        <div>
          <div className="font-mono text-xs text-primary uppercase tracking-widest mb-1 flex items-center gap-2">
            <Network className="w-4 h-4 text-primary" />
            <span>Systems Design &amp; Topology</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-semibold text-on-surface font-sans">
            Architecture Lab
          </h2>
          <p className="text-sm text-on-surface-variant max-w-3xl mt-1.5 leading-relaxed font-sans">
            Systems I've designed, tested, and stressed while building cloud architectures. Every node maps to actual AWS primitives. Click any node to inspect CIDR, ports, and security boundary controls.
          </p>
        </div>

        <div className="flex items-center gap-2 px-3 py-1.5 rounded bg-surface-container-low border border-cardBorder text-xs font-mono text-secondary self-start md:self-auto">
          <Info className="w-3.5 h-3.5" />
          <span>Interactive: Click nodes to inspect</span>
        </div>
      </div>

      {/* 4 High-fidelity Diagram Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Diagram 1: High Availability */}
        {sys1 && (
          <div className="rounded-xl bg-surface-container-low border border-cardBorder p-6 flex flex-col justify-between shadow-lg hover:border-outline-variant transition-all">
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="font-mono text-xs text-primary font-bold">{sys1.systemNumber}</span>
                <span className="font-mono text-[10px] px-2 py-0.5 rounded bg-surface-container text-tertiary border border-cardBorder">
                  {sys1.badge}
                </span>
              </div>
              <h3 className="text-lg font-semibold font-sans text-on-surface mb-2">
                {sys1.title}
              </h3>
              <p className="text-xs text-on-surface-variant mb-5 leading-relaxed font-sans">
                {sys1.description}
              </p>

              {/* Interactive SVG Diagram */}
              <div className="w-full h-48 rounded bg-surface-container-lowest border border-cardBorder p-3 flex items-center justify-center overflow-hidden relative">
                <svg className="w-full h-full text-on-surface-variant select-none" viewBox="0 0 480 140">
                  {/* Route 53 Node */}
                  <g
                    className="cursor-pointer transition-opacity hover:opacity-80"
                    onClick={() => setSelectedNode(sys1.nodes[0])}
                  >
                    <rect
                      x="10"
                      y="50"
                      width="75"
                      height="40"
                      rx="4"
                      fill="#1c2026"
                      stroke="#5de6ff"
                      strokeWidth="1.5"
                    />
                    <text x="47" y="74" textAnchor="middle" fill="#5de6ff" fontFamily="JetBrains Mono" fontSize="10">
                      Route 53
                    </text>
                  </g>

                  {/* Flow Dash 1 */}
                  <line
                    x1="85"
                    y1="70"
                    x2="125"
                    y2="70"
                    stroke="#ffc082"
                    strokeWidth="2"
                    strokeDasharray="4 4"
                    className="animate-flow-dash"
                  />

                  {/* CloudFront Node */}
                  <g
                    className="cursor-pointer transition-opacity hover:opacity-80"
                    onClick={() => setSelectedNode(sys1.nodes[1])}
                  >
                    <rect
                      x="125"
                      y="50"
                      width="80"
                      height="40"
                      rx="4"
                      fill="#1c2026"
                      stroke="#ffc082"
                      strokeWidth="1.5"
                    />
                    <text x="165" y="74" textAnchor="middle" fill="#ffc082" fontFamily="JetBrains Mono" fontSize="10">
                      CloudFront
                    </text>
                  </g>

                  {/* Flow Dash 2 */}
                  <line
                    x1="205"
                    y1="70"
                    x2="245"
                    y2="70"
                    stroke="#5de6ff"
                    strokeWidth="2"
                    strokeDasharray="4 4"
                    className="animate-flow-dash"
                  />

                  {/* Dual ALB Node */}
                  <g
                    className="cursor-pointer transition-opacity hover:opacity-80"
                    onClick={() => setSelectedNode(sys1.nodes[2])}
                  >
                    <rect
                      x="245"
                      y="50"
                      width="75"
                      height="40"
                      rx="4"
                      fill="#1c2026"
                      stroke="#ff9900"
                      strokeWidth="1.5"
                    />
                    <text x="282" y="74" textAnchor="middle" fill="#ff9900" fontFamily="JetBrains Mono" fontSize="10">
                      Dual ALB
                    </text>
                  </g>

                  {/* Branch lines */}
                  <path
                    d="M 320 70 L 345 38 L 365 38"
                    fill="none"
                    stroke="#6de676"
                    strokeWidth="1.5"
                    strokeDasharray="3 3"
                    className="animate-flow-dash"
                  />
                  <path
                    d="M 320 70 L 345 102 L 365 102"
                    fill="none"
                    stroke="#6de676"
                    strokeWidth="1.5"
                    strokeDasharray="3 3"
                    className="animate-flow-dash"
                  />

                  {/* AZ-A Fleet */}
                  <g
                    className="cursor-pointer transition-opacity hover:opacity-80"
                    onClick={() => setSelectedNode(sys1.nodes[3])}
                  >
                    <rect
                      x="365"
                      y="23"
                      width="105"
                      height="30"
                      rx="4"
                      fill="#1c2026"
                      stroke="#6de676"
                      strokeWidth="1.5"
                    />
                    <text x="417" y="42" textAnchor="middle" fill="#6de676" fontFamily="JetBrains Mono" fontSize="9">
                      AZ-A EC2 Fleet
                    </text>
                  </g>

                  {/* AZ-B Fleet */}
                  <g
                    className="cursor-pointer transition-opacity hover:opacity-80"
                    onClick={() => setSelectedNode(sys1.nodes[3])}
                  >
                    <rect
                      x="365"
                      y="87"
                      width="105"
                      height="30"
                      rx="4"
                      fill="#1c2026"
                      stroke="#6de676"
                      strokeWidth="1.5"
                    />
                    <text x="417" y="106" textAnchor="middle" fill="#6de676" fontFamily="JetBrains Mono" fontSize="9">
                      AZ-B EC2 Fleet
                    </text>
                  </g>
                </svg>
              </div>
            </div>

            <div className="mt-4 pt-3 flex items-center justify-between text-xs font-mono text-outline border-t border-cardBorder/60">
              <span>{sys1.ingressText}</span>
              <span className="text-tertiary flex items-center gap-1">
                <CheckCircle2 className="w-3 h-3" />
                <span>{sys1.healthText}</span>
              </span>
            </div>
          </div>
        )}

        {/* Diagram 2: Isolated VPC */}
        {sys2 && (
          <div className="rounded-xl bg-surface-container-low border border-cardBorder p-6 flex flex-col justify-between shadow-lg hover:border-outline-variant transition-all">
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="font-mono text-xs text-secondary font-bold">{sys2.systemNumber}</span>
                <span className="font-mono text-[10px] px-2 py-0.5 rounded bg-surface-container text-secondary border border-cardBorder">
                  {sys2.badge}
                </span>
              </div>
              <h3 className="text-lg font-semibold font-sans text-on-surface mb-2">
                {sys2.title}
              </h3>
              <p className="text-xs text-on-surface-variant mb-5 leading-relaxed font-sans">
                {sys2.description}
              </p>

              {/* Interactive SVG Diagram */}
              <div className="w-full h-48 rounded bg-surface-container-lowest border border-cardBorder p-3 flex items-center justify-center overflow-hidden relative">
                <svg className="w-full h-full select-none" viewBox="0 0 480 140">
                  {/* Outer VPC */}
                  <g
                    className="cursor-pointer"
                    onClick={() => setSelectedNode(sys2.nodes[0])}
                  >
                    <rect
                      x="10"
                      y="8"
                      width="460"
                      height="124"
                      rx="6"
                      fill="none"
                      stroke="#554434"
                      strokeWidth="1"
                      strokeDasharray="4 4"
                    />
                    <text x="25" y="24" fill="#a38d7a" fontFamily="JetBrains Mono" fontSize="9">
                      VPC 10.0.0.0/16 [Click to Inspect]
                    </text>
                  </g>

                  {/* Public Subnet */}
                  <g
                    className="cursor-pointer hover:opacity-80"
                    onClick={() => setSelectedNode(sys2.nodes[1])}
                  >
                    <rect x="25" y="36" width="125" height="82" rx="4" fill="#1c2026" stroke="#a38d7a" strokeWidth="1" />
                    <text x="87" y="54" textAnchor="middle" fill="#ffc082" fontFamily="JetBrains Mono" fontSize="9" fontWeight="bold">
                      Public /24
                    </text>
                    <text x="87" y="76" textAnchor="middle" fill="#dfe2eb" fontFamily="JetBrains Mono" fontSize="8">
                      IGW • NAT Gateway
                    </text>
                    <text x="87" y="96" textAnchor="middle" fill="#dfe2eb" fontFamily="JetBrains Mono" fontSize="8">
                      Bastion Host
                    </text>
                  </g>

                  {/* Private Subnet */}
                  <g
                    className="cursor-pointer hover:opacity-80"
                    onClick={() => setSelectedNode(sys2.nodes[2])}
                  >
                    <rect x="175" y="36" width="130" height="82" rx="4" fill="#1c2026" stroke="#a38d7a" strokeWidth="1" />
                    <text x="240" y="54" textAnchor="middle" fill="#5de6ff" fontFamily="JetBrains Mono" fontSize="9" fontWeight="bold">
                      Private /24
                    </text>
                    <text x="240" y="76" textAnchor="middle" fill="#dfe2eb" fontFamily="JetBrains Mono" fontSize="8">
                      App Instances
                    </text>
                    <text x="240" y="96" textAnchor="middle" fill="#6de676" fontFamily="JetBrains Mono" fontSize="8">
                      Out via NAT Only
                    </text>
                  </g>

                  {/* Isolated Subnet */}
                  <g
                    className="cursor-pointer hover:opacity-80"
                    onClick={() => setSelectedNode(sys2.nodes[3])}
                  >
                    <rect x="330" y="36" width="125" height="82" rx="4" fill="#1c2026" stroke="#ff9900" strokeWidth="1" />
                    <text x="392" y="54" textAnchor="middle" fill="#ff9900" fontFamily="JetBrains Mono" fontSize="9" fontWeight="bold">
                      DB Subnet /24
                    </text>
                    <text x="392" y="76" textAnchor="middle" fill="#dfe2eb" fontFamily="JetBrains Mono" fontSize="8">
                      Aurora MySQL
                    </text>
                    <text x="392" y="96" textAnchor="middle" fill="#ffb4ab" fontFamily="JetBrains Mono" fontSize="8">
                      No Internet Egress
                    </text>
                  </g>
                </svg>
              </div>
            </div>

            <div className="mt-4 pt-3 flex items-center justify-between text-xs font-mono text-outline border-t border-cardBorder/60">
              <span>{sys2.ingressText}</span>
              <span className="text-tertiary flex items-center gap-1">
                <CheckCircle2 className="w-3 h-3" />
                <span>{sys2.healthText}</span>
              </span>
            </div>
          </div>
        )}

        {/* Diagram 3: Remote State */}
        {sys3 && (
          <div className="rounded-xl bg-surface-container-low border border-cardBorder p-6 flex flex-col justify-between shadow-lg hover:border-outline-variant transition-all">
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="font-mono text-xs text-primary font-bold">{sys3.systemNumber}</span>
                <span className="font-mono text-[10px] px-2 py-0.5 rounded bg-surface-container text-primary border border-cardBorder">
                  {sys3.badge}
                </span>
              </div>
              <h3 className="text-lg font-semibold font-sans text-on-surface mb-2">
                {sys3.title}
              </h3>
              <p className="text-xs text-on-surface-variant mb-5 leading-relaxed font-sans">
                {sys3.description}
              </p>

              {/* Interactive Nodes Box */}
              <div className="w-full h-48 rounded bg-surface-container-lowest border border-cardBorder p-3 flex items-center justify-center font-mono text-xs">
                <div className="flex items-center gap-2.5 sm:gap-4 text-center">
                  <button
                    type="button"
                    onClick={() => setSelectedNode(sys3.nodes[0])}
                    className="p-3 rounded bg-surface-container border-t-2 border-primary border-x border-b border-cardBorder hover:border-primary transition-all text-left"
                  >
                    <div className="text-white font-semibold text-xs">CLI / Runner</div>
                    <div className="text-secondary text-[10px]">terraform apply</div>
                    <div className="text-outline text-[9px] mt-1">[Inspect]</div>
                  </button>

                  <div className="text-outline font-bold">⇄</div>

                  <button
                    type="button"
                    onClick={() => setSelectedNode(sys3.nodes[1])}
                    className="p-3 rounded bg-surface-container border-t-2 border-tertiary border-x border-b border-cardBorder hover:border-tertiary transition-all text-left"
                  >
                    <div className="text-white font-semibold text-xs">DynamoDB Mutex</div>
                    <div className="text-tertiary text-[10px]">LockID Check</div>
                    <div className="text-outline text-[9px] mt-1">[Inspect]</div>
                  </button>

                  <div className="text-outline font-bold">⇄</div>

                  <button
                    type="button"
                    onClick={() => setSelectedNode(sys3.nodes[2])}
                    className="p-3 rounded bg-surface-container border-t-2 border-secondary border-x border-b border-cardBorder hover:border-secondary transition-all text-left"
                  >
                    <div className="text-white font-semibold text-xs">S3 Bucket (KMS)</div>
                    <div className="text-primary text-[10px]">Encrypted .tfstate</div>
                    <div className="text-outline text-[9px] mt-1">[Inspect]</div>
                  </button>
                </div>
              </div>
            </div>

            <div className="mt-4 pt-3 flex items-center justify-between text-xs font-mono text-outline border-t border-cardBorder/60">
              <span>{sys3.ingressText}</span>
              <span className="text-tertiary flex items-center gap-1">
                <CheckCircle2 className="w-3 h-3" />
                <span>{sys3.healthText}</span>
              </span>
            </div>
          </div>
        )}

        {/* Diagram 4: EKS & Microservices */}
        {sys4 && (
          <div className="rounded-xl bg-surface-container-low border border-cardBorder p-6 flex flex-col justify-between shadow-lg hover:border-outline-variant transition-all">
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="font-mono text-xs text-tertiary font-bold">{sys4.systemNumber}</span>
                <span className="font-mono text-[10px] px-2 py-0.5 rounded bg-surface-container text-tertiary border border-cardBorder">
                  {sys4.badge}
                </span>
              </div>
              <h3 className="text-lg font-semibold font-sans text-on-surface mb-2">
                {sys4.title}
              </h3>
              <p className="text-xs text-on-surface-variant mb-5 leading-relaxed font-sans">
                {sys4.description}
              </p>

              {/* Interactive Nodes Box */}
              <div className="w-full h-48 rounded bg-surface-container-lowest border border-cardBorder p-3 flex items-center justify-center font-mono text-xs">
                <div className="grid grid-cols-3 gap-2.5 w-full max-w-sm text-center">
                  <button
                    type="button"
                    onClick={() => setSelectedNode(sys4.nodes[0])}
                    className="p-3 rounded bg-surface-container border border-cardBorder hover:border-secondary transition-all text-left"
                  >
                    <div className="text-secondary font-bold text-xs mb-1">Ingress</div>
                    <div className="text-on-surface-variant text-[10px]">ALB Controller</div>
                    <div className="text-outline text-[9px] mt-1">[Inspect]</div>
                  </button>

                  <button
                    type="button"
                    onClick={() => setSelectedNode(sys4.nodes[1])}
                    className="p-3 rounded bg-surface-container border border-cardBorder hover:border-primary transition-all text-left"
                  >
                    <div className="text-primary font-bold text-xs mb-1">Compute</div>
                    <div className="text-on-surface-variant text-[10px]">Fargate / EC2</div>
                    <div className="text-outline text-[9px] mt-1">[Inspect]</div>
                  </button>

                  <button
                    type="button"
                    onClick={() => setSelectedNode(sys4.nodes[2])}
                    className="p-3 rounded bg-surface-container border border-cardBorder hover:border-tertiary transition-all text-left"
                  >
                    <div className="text-tertiary font-bold text-xs mb-1">Telemetry</div>
                    <div className="text-on-surface-variant text-[10px]">Prometheus</div>
                    <div className="text-outline text-[9px] mt-1">[Inspect]</div>
                  </button>
                </div>
              </div>
            </div>

            <div className="mt-4 pt-3 flex items-center justify-between text-xs font-mono text-outline border-t border-cardBorder/60">
              <span>{sys4.ingressText}</span>
              <span className="text-tertiary flex items-center gap-1">
                <CheckCircle2 className="w-3 h-3" />
                <span>{sys4.healthText}</span>
              </span>
            </div>
          </div>
        )}
      </div>

      {/* Node Inspector Drawer */}
      <NodeInspectorDrawer
        node={selectedNode}
        onClose={() => setSelectedNode(null)}
      />
    </section>
  );
};

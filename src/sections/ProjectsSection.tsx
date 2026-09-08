import React, { useState } from 'react';
import { FolderGit2, Eye, ExternalLink, Globe, Split, Server, Database, Code } from '../assets/icons';
import { projectsData } from '../data/projectsData';
import { ProjectCaseStudy } from '../types';
import { ProjectModal } from '../components/ProjectModal';

export const ProjectsSection: React.FC = () => {
  const [selectedProject, setSelectedProject] = useState<ProjectCaseStudy | null>(null);

  return (
    <section
      id="projects"
      className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 border-b border-cardBorder"
      aria-label="Featured Infrastructure Projects"
    >
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
        <div>
          <div className="font-mono text-xs text-primary uppercase tracking-widest mb-1 flex items-center gap-2">
            <FolderGit2 className="w-4 h-4 text-primary" />
            <span>Technical Case Studies</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-semibold text-on-surface font-sans">
            Featured Infrastructure Projects
          </h2>
        </div>
        <div className="font-mono text-xs text-on-surface-variant flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-tertiary"></span>
          <span>All configurations validated with Terraform dry-runs</span>
        </div>
      </div>

      <div className="space-y-10">
        {/* PROJECT 01: Three-Tier */}
        {projectsData[0] && (
          <div className="rounded-xl bg-surface-container-low border border-cardBorder p-6 md:p-8 hover:border-outline-variant transition-all shadow-xl">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-6 flex flex-col">
                <div className="flex items-center gap-2 mb-3">
                  <span className="font-mono text-xs text-primary font-bold">PROJECT_01 //</span>
                  <span className="px-2 py-0.5 rounded bg-surface-container font-mono text-[10px] text-tertiary border border-cardBorder">
                    PRODUCTION SPEC
                  </span>
                </div>
                <h3 className="text-xl sm:text-2xl font-bold font-sans text-on-surface mb-3">
                  {projectsData[0].title}
                </h3>
                <p className="text-sm text-on-surface-variant mb-5 leading-relaxed font-sans">
                  {projectsData[0].summary}
                </p>

                {/* Metadata Pills */}
                <div className="grid grid-cols-2 gap-2 mb-6">
                  {projectsData[0].metadata.map(item => (
                    <div
                      key={item.label}
                      className="p-2.5 rounded bg-surface-container border border-cardBorder font-mono text-xs text-on-surface flex items-center gap-2"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-primary"></span>
                      <span>{item.label}</span>
                    </div>
                  ))}
                </div>

                <div className="flex flex-wrap items-center gap-3">
                  <button
                    type="button"
                    onClick={() => setSelectedProject(projectsData[0])}
                    className="px-4 py-2 rounded bg-primary text-on-primary font-mono text-xs font-semibold hover:bg-surface-tint flex items-center gap-1.5 transition-colors shadow-sm focus-visible:ring-2 focus-visible:ring-primary"
                  >
                    <Eye className="w-3.5 h-3.5" />
                    <span>Technical Specs &amp; IaC</span>
                  </button>
                  <a
                    href={projectsData[0].githubUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="font-mono text-xs text-on-surface-variant hover:text-white flex items-center gap-1 transition-colors px-3 py-2 rounded hover:bg-surface-container"
                  >
                    <span>terraform-module</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>

              {/* Topology Flow Block */}
              <div className="lg:col-span-6 rounded-lg bg-surface-container-lowest border border-cardBorder p-5">
                <div className="flex items-center justify-between pb-3 mb-4 bg-surface-container-high/40 p-2 rounded text-[11px] font-mono text-outline border border-cardBorder/60">
                  <span>TOPOLOGY FLOW DIAGRAM</span>
                  <span className="text-tertiary">SSL/TLS 443 → PORT 8080 → 3306</span>
                </div>
                <div className="space-y-2.5 font-mono text-xs">
                  <div className="p-2.5 rounded bg-surface-container border border-cardBorder flex items-center justify-between text-secondary">
                    <span className="flex items-center gap-2">
                      <Globe className="w-4 h-4" />
                      <span>Public Web: Route 53 + CloudFront</span>
                    </span>
                    <span className="text-[10px] text-on-surface-variant">Edge PoPs</span>
                  </div>
                  <div className="flex justify-center text-outline text-xs">▼</div>
                  <div className="p-2.5 rounded bg-surface-container border border-cardBorder flex items-center justify-between text-primary">
                    <span className="flex items-center gap-2">
                      <Split className="w-4 h-4" />
                      <span>Application Load Balancer (ALB)</span>
                    </span>
                    <span className="text-[10px] text-on-surface-variant">Public Subnets</span>
                  </div>
                  <div className="flex justify-center text-outline text-xs">▼</div>
                  <div className="p-2.5 rounded bg-surface-container border border-cardBorder flex items-center justify-between text-on-surface">
                    <span className="flex items-center gap-2">
                      <Server className="w-4 h-4" />
                      <span>EC2 Auto Scaling Target Group</span>
                    </span>
                    <span className="text-[10px] text-tertiary">Private Subnets</span>
                  </div>
                  <div className="flex justify-center text-outline text-xs">▼</div>
                  <div className="p-2.5 rounded bg-surface-container border border-cardBorder flex items-center justify-between text-tertiary">
                    <span className="flex items-center gap-2">
                      <Database className="w-4 h-4" />
                      <span>Multi-AZ Aurora Cluster</span>
                    </span>
                    <span className="text-[10px] text-error font-medium">Isolated Subnets</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* PROJECT 02: Terraform Modular */}
        {projectsData[1] && (
          <div className="rounded-xl bg-surface-container-low border border-cardBorder p-6 md:p-8 hover:border-outline-variant transition-all shadow-xl">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-6 flex flex-col">
                <div className="flex items-center gap-2 mb-3">
                  <span className="font-mono text-xs text-secondary font-bold">PROJECT_02 //</span>
                  <span className="px-2 py-0.5 rounded bg-surface-container font-mono text-[10px] text-secondary border border-cardBorder">
                    INFRA AS CODE
                  </span>
                </div>
                <h3 className="text-xl sm:text-2xl font-bold font-sans text-on-surface mb-3">
                  {projectsData[1].title}
                </h3>
                <p className="text-sm text-on-surface-variant mb-5 leading-relaxed font-sans">
                  {projectsData[1].summary}
                </p>

                <div className="flex flex-wrap gap-2 mb-6">
                  {['Zero Drift S3 State', 'DynamoDB Mutex', 'KMS Enforced', 'HCL Linting'].map(badge => (
                    <span
                      key={badge}
                      className="px-3 py-1 rounded bg-surface-container border border-cardBorder text-on-surface font-mono text-xs"
                    >
                      {badge}
                    </span>
                  ))}
                </div>

                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() => setSelectedProject(projectsData[1])}
                    className="px-4 py-2 rounded bg-surface-container-high text-white font-mono text-xs font-medium flex items-center gap-1.5 hover:bg-surface-bright border border-cardBorder transition-colors focus-visible:ring-2 focus-visible:ring-primary"
                  >
                    <Code className="w-3.5 h-3.5" />
                    <span>Inspect HCL Structure</span>
                  </button>
                  <a
                    href={projectsData[1].githubUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="font-mono text-xs text-on-surface-variant hover:text-white flex items-center gap-1 transition-colors px-3 py-2 rounded hover:bg-surface-container"
                  >
                    <span>repo ↗</span>
                  </a>
                </div>
              </div>

              {/* Code Snippet Display */}
              <div className="lg:col-span-6 rounded-lg bg-surface-container-lowest border border-cardBorder p-4 overflow-hidden">
                <div className="font-mono text-[11px] text-on-surface-variant mb-2 flex items-center justify-between border-b border-cardBorder pb-2">
                  <span className="text-primary font-bold">{projectsData[1].iacSnippet?.filename}</span>
                  <span className="text-tertiary">100% DECLARATIVE</span>
                </div>
                <pre className="font-mono text-xs text-on-surface leading-snug overflow-x-auto p-3 bg-surface-container-low rounded border border-cardBorder/60">
                  <code>{projectsData[1].iacSnippet?.code}</code>
                </pre>
              </div>
            </div>
          </div>
        )}

        {/* PROJECT 03: Automated CI/CD */}
        {projectsData[2] && (
          <div className="rounded-xl bg-surface-container-low border border-cardBorder p-6 md:p-8 hover:border-outline-variant transition-all shadow-xl">
            <div className="flex items-center gap-2 mb-3">
              <span className="font-mono text-xs text-tertiary font-bold">PROJECT_03 //</span>
              <span className="px-2 py-0.5 rounded bg-surface-container font-mono text-[10px] text-tertiary border border-cardBorder">
                AUTOMATION
              </span>
            </div>
            <h3 className="text-xl sm:text-2xl font-bold font-sans text-on-surface mb-2">
              {projectsData[2].title}
            </h3>
            <p className="text-sm text-on-surface-variant mb-6 max-w-3xl leading-relaxed font-sans">
              {projectsData[2].summary}
            </p>

            {/* Sequence Flow */}
            <div className="grid grid-cols-2 md:grid-cols-5 gap-3 mb-6">
              {[
                { step: '01 / TRIGGER', title: 'Git Push', desc: 'main branch', color: 'text-secondary' },
                { step: '02 / VALIDATE', title: 'Linter & Tests', desc: 'Pytest & Flake8', color: 'text-tertiary' },
                { step: '03 / ARTIFACT', title: 'Docker Build', desc: 'Multi-stage cache', color: 'text-primary' },
                { step: '04 / REGISTRY', title: 'AWS ECR', desc: 'SHA-tagged image', color: 'text-secondary' },
                { step: '05 / SHIP', title: 'ECS Fargate', desc: 'Zero Downtime', color: 'text-tertiary' },
              ].map(item => (
                <div key={item.step} className="p-3.5 rounded bg-surface-container-lowest border border-cardBorder text-center">
                  <div className="font-mono text-[10px] text-outline mb-1">{item.step}</div>
                  <div className="font-mono text-xs text-on-surface font-semibold">{item.title}</div>
                  <div className={`font-mono text-[10px] mt-0.5 ${item.color}`}>{item.desc}</div>
                </div>
              ))}
            </div>

            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => setSelectedProject(projectsData[2])}
                className="px-4 py-2 rounded bg-surface-container-high text-white font-mono text-xs font-medium flex items-center gap-1.5 hover:bg-surface-bright border border-cardBorder transition-colors focus-visible:ring-2 focus-visible:ring-primary"
              >
                <Eye className="w-3.5 h-3.5" />
                <span>Deep Dive CI/CD Specs</span>
              </button>
              <a
                href={projectsData[2].githubUrl}
                target="_blank"
                rel="noreferrer"
                className="font-mono text-xs text-on-surface-variant hover:text-white flex items-center gap-1 transition-colors px-3 py-2 rounded hover:bg-surface-container"
              >
                <span>workflow ↗</span>
              </a>
            </div>
          </div>
        )}

        {/* PROJECT 04: EKS Microservices */}
        {projectsData[3] && (
          <div className="rounded-xl bg-surface-container-low border border-cardBorder p-6 md:p-8 hover:border-outline-variant transition-all shadow-xl">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-6 flex flex-col">
                <div className="flex items-center gap-2 mb-3">
                  <span className="font-mono text-xs text-primary font-bold">PROJECT_04 //</span>
                  <span className="px-2 py-0.5 rounded bg-surface-container font-mono text-[10px] text-primary border border-cardBorder">
                    CONTAINERS &amp; K8S
                  </span>
                </div>
                <h3 className="text-xl sm:text-2xl font-bold font-sans text-on-surface mb-3">
                  {projectsData[3].title}
                </h3>
                <p className="text-sm text-on-surface-variant mb-5 leading-relaxed font-sans">
                  {projectsData[3].summary}
                </p>

                <div className="flex flex-wrap gap-2 mb-6">
                  {['EKS v1.29', 'IRSA Least Privilege', 'Fluent Bit Shipper', 'HPA Scaling'].map(badge => (
                    <span
                      key={badge}
                      className="px-3 py-1 rounded bg-surface-container border border-cardBorder text-on-surface font-mono text-xs"
                    >
                      {badge}
                    </span>
                  ))}
                </div>

                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() => setSelectedProject(projectsData[3])}
                    className="px-4 py-2 rounded bg-surface-container-high text-white font-mono text-xs font-medium flex items-center gap-1.5 hover:bg-surface-bright border border-cardBorder transition-colors focus-visible:ring-2 focus-visible:ring-primary"
                  >
                    <Eye className="w-3.5 h-3.5" />
                    <span>View Architecture Specs</span>
                  </button>
                  <a
                    href={projectsData[3].githubUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="font-mono text-xs text-on-surface-variant hover:text-white flex items-center gap-1 transition-colors px-3 py-2 rounded hover:bg-surface-container"
                  >
                    <span>labs ↗</span>
                  </a>
                </div>
              </div>

              {/* Visual 3-Node Grid Box */}
              <div className="lg:col-span-6 rounded-lg bg-surface-container-lowest border border-cardBorder p-5">
                <div className="flex items-center justify-between pb-3 mb-4 bg-surface-container-high/40 p-2 rounded text-[11px] font-mono text-outline border border-cardBorder/60">
                  <span>ORCHESTRATION ARCHITECTURE</span>
                  <span className="text-tertiary">MANAGED NODE GROUP</span>
                </div>
                <div className="grid grid-cols-3 gap-2.5 text-center font-mono text-xs">
                  <div className="p-3.5 rounded bg-surface-container border border-cardBorder">
                    <div className="text-secondary font-bold mb-1">Ingress</div>
                    <div className="text-on-surface-variant text-[10px]">ALB Controller</div>
                  </div>
                  <div className="p-3.5 rounded bg-surface-container border border-cardBorder">
                    <div className="text-primary font-bold mb-1">Compute</div>
                    <div className="text-on-surface-variant text-[10px]">Fargate / EC2</div>
                  </div>
                  <div className="p-3.5 rounded bg-surface-container border border-cardBorder">
                    <div className="text-tertiary font-bold mb-1">Telemetry</div>
                    <div className="text-on-surface-variant text-[10px]">Prometheus</div>
                  </div>
                </div>
                <div className="mt-4 pt-3 flex items-center justify-between text-xs font-mono text-outline border-t border-cardBorder/60">
                  <span>Kubernetes: v1.29 Compatible</span>
                  <span className="text-tertiary">Autoscaling enabled</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Deep-Dive Project Modal */}
      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </section>
  );
};

// Domain types for the platform

export type ProficiencyLevel = 'proficient' | 'learning' | 'planned';

export interface TechItem {
  name: string;
  category?: string;
  status: ProficiencyLevel;
  highlight?: boolean;
}

export interface StackDomain {
  id: string;
  title: string;
  icon: string;
  accentColor: 'primary' | 'secondary' | 'tertiary';
  description: string;
  skills: TechItem[];
}

export interface MilestoneNode {
  id: string;
  number: string;
  title: string;
  subtitle: string;
  status: string;
  statusType: 'completed' | 'core' | 'production' | 'active';
  color: 'primary' | 'secondary' | 'tertiary';
}

export interface ProjectMetadata {
  icon: string;
  label: string;
  highlightColor?: 'primary' | 'secondary' | 'tertiary';
}

export interface ProjectCaseStudy {
  id: string;
  projectNumber: string;
  tag: string;
  tagColor: 'primary' | 'secondary' | 'tertiary';
  title: string;
  summary: string;
  fullDescription: string;
  metadata: ProjectMetadata[];
  architectureOverview: string[];
  techStack: string[];
  iacSnippet?: {
    filename: string;
    code: string;
    language: string;
  };
  metrics: {
    label: string;
    value: string;
  }[];
  githubUrl: string;
  liveDemoUrl?: string;
}

export interface ArchitectureNodeInfo {
  id: string;
  name: string;
  role: string;
  cidrOrEndpoint: string;
  protocolPorts: string;
  securityGroup: string;
  healthCheck: string;
  failover: string;
}

export interface ArchitectureSystem {
  id: string;
  systemNumber: string;
  badge: string;
  badgeColor: 'primary' | 'secondary' | 'tertiary';
  title: string;
  description: string;
  ingressText: string;
  healthText: string;
  nodes: ArchitectureNodeInfo[];
}

export interface PipelineStep {
  stepNumber: string;
  name: string;
  subtext: string;
  badge: string;
  badgeColor: 'primary' | 'secondary' | 'tertiary';
  icon: string;
  details: string[];
}

export interface EngineeringPrinciple {
  id: string;
  number: string;
  title: string;
  quote: string;
  body: string;
  footerTag: string;
  color: 'primary' | 'secondary' | 'tertiary';
}

export interface CurriculumItem {
  id: string;
  folder: string;
  details: string;
  status: 'ACTIVE' | 'IN PROGRESS' | 'UPCOMING';
  statusColor: 'primary' | 'secondary' | 'tertiary';
}

export interface EngineeringArticle {
  id: string;
  title: string;
  category: 'Systems' | 'Networking' | 'IaC' | 'Security' | 'Containers';
  categoryColor: 'primary' | 'secondary' | 'tertiary';
  readTime: string;
  year: string;
  summary: string;
  contentMarkdown: string;
  tags: string[];
}

export interface GitRepository {
  name: string;
  description: string;
  stars: number;
  language: string;
  languageColor: string;
  branch: string;
  updatedAt: string;
  githubUrl: string;
}

export interface Certification {
  id: string;
  title: string;
  badge: string;
  description: string;
  hash: string;
  targetDate: string;
  status: 'COMPLETED' | 'TARGET';
  domains: { name: string; percentage: number }[];
}

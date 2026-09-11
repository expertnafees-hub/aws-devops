import { GitRepository } from '../types';

export const githubRepositories: GitRepository[] = [
  {
    name: 'aws-three-tier-architecture',
    description: 'Enterprise AWS 3-tier architecture: Zero-SSH SSM access, Route 53/ACM TLS 1.3 HTTPS, chaos-tested ASG self-healing, and CloudWatch full-stack telemetry.',
    stars: 24,
    language: 'HCL / Terraform',
    languageColor: '#ff9900',
    branch: 'main',
    updatedAt: 'Updated today',
    githubUrl: 'https://github.com/expertnafees-hub/aws-three-tier-architecture'
  },
  {
    name: 'terraform-aws-infrastructure',
    description: 'Reusable Terraform modules for isolated networking, IAM role delegation, CloudWatch alarms, and KMS-encrypted remote state storage.',
    stars: 18,
    language: 'HCL',
    languageColor: '#22d3ee',
    branch: 'main',
    updatedAt: 'Updated 5 days ago',
    githubUrl: 'https://github.com/expertnafees-hub/terraform-aws-infrastructure'
  },
  {
    name: 'docker-cicd-pipeline',
    description: 'Continuous delivery configuration with GitHub Actions, linting matrices, multi-stage Docker builds, and Amazon ECS continuous rollout triggers.',
    stars: 15,
    language: 'YAML / Docker',
    languageColor: '#3fb950',
    branch: 'main',
    updatedAt: 'Updated 1 week ago',
    githubUrl: 'https://github.com/expertnafees-hub/docker-cicd-pipeline'
  },
  {
    name: 'aws-networking-labs',
    description: 'Hands-on bash and python scripts for inspecting subnet routing, testing latency between VPC peering links, and verifying firewall security group rules.',
    stars: 12,
    language: 'Shell / Python',
    languageColor: '#ffc082',
    branch: 'main',
    updatedAt: 'Updated 2 weeks ago',
    githubUrl: 'https://github.com/expertnafees-hub/aws-networking-labs'
  }
];

// Generate 52 weeks x 7 days deterministic activity matrix (364 days)
export interface HeatmapDay {
  date: string;
  count: number;
  level: 0 | 1 | 2 | 3 | 4; // 0 = lowest, 4 = highest
}

export function generateContributionMatrix(): HeatmapDay[] {
  const days: HeatmapDay[] = [];
  const today = new Date();
  
  // Seeded deterministic pseudo-random sequence for consistent rendering
  let seed = 42;
  const pseudoRandom = () => {
    seed = (seed * 9301 + 49297) % 233280;
    return seed / 233280;
  };

  const totalDays = 52 * 7;
  for (let i = totalDays - 1; i >= 0; i--) {
    const d = new Date(today);
    d.setDate(d.getDate() - i);
    const dayOfWeek = d.getDay();
    
    // Higher probability on weekdays
    const isWeekend = dayOfWeek === 0 || dayOfWeek === 6;
    const r = pseudoRandom();
    
    let count = 0;
    let level: 0 | 1 | 2 | 3 | 4 = 0;
    
    if (isWeekend) {
      if (r > 0.6) {
        count = Math.floor(r * 4) + 1;
        level = (count <= 2 ? 1 : 2) as 1 | 2;
      }
    } else {
      if (r > 0.25) {
        count = Math.floor(r * 9) + 1;
        if (count <= 2) level = 1;
        else if (count <= 4) level = 2;
        else if (count <= 7) level = 3;
        else level = 4;
      }
    }

    days.push({
      date: d.toISOString().split('T')[0],
      count,
      level
    });
  }

  return days;
}

export const publicRepositories = githubRepositories;
export const generateHeatmapData = generateContributionMatrix;

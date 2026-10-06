import { EngineeringArticle } from '../types';
import { evidenceLinks, githubProfileUrl } from './portfolioEvidence';

export const logsData: EngineeringArticle[] = [
  {
    id: 'delivery-evidence', title: 'What the Portfolio Deployment Run Demonstrates', category: 'Systems', categoryColor: 'primary', readTime: '2 min', year: 'Reviewed Oct 2026',
    summary: 'Read a delivery result narrowly: successful OIDC, S3 synchronization, and an invalidation request.',
    contentMarkdown: '### Recorded result\n\nThe linked main-branch run passed TypeScript checks, the infrastructure gate, and the frontend build. Its deployment job used OIDC, synchronized files to S3, and created a CloudFront invalidation.\n\n### What to verify next\n\nA delivery run does not measure continuous uptime, viewer latency, or restore behavior. The website Trivy job is advisory because its configured exit code is 0. Inspect findings separately from the job result.',
    tags: ['GitHubActions', 'OIDC', 'Evidence'], sourceUrl: evidenceLinks.websiteDeploy,
  },
  {
    id: 'three-tier-boundaries', title: 'Configured Infrastructure and a Working Application', category: 'IaC', categoryColor: 'secondary', readTime: '2 min', year: 'Reviewed Oct 2026',
    summary: 'The three-tier lab configures RDS, but its static Nginx application does not query the database.',
    contentMarkdown: '### Current lab scope\n\nTerraform defines a public ALB, private EC2 Auto Scaling fleet, and isolated RDS MySQL. HTTP and Single-AZ RDS are defaults; HTTPS and Multi-AZ RDS are optional. The application currently serves a static Nginx page.\n\n### Next experiment\n\nImplement a restricted database user and application secret access, then record a real database query. Preserve deployment outputs, request results, timestamps, and teardown evidence before making availability or recovery claims.',
    tags: ['Terraform', 'RDS', 'Lab'], sourceUrl: `${githubProfileUrl}/aws-three-tier-architecture`,
  },
  {
    id: 'image-publication', title: 'Image Publication and Runtime Delivery', category: 'Containers', categoryColor: 'tertiary', readTime: '2 min', year: 'Reviewed Oct 2026',
    summary: 'The payment API has a passing publication run. A deployed service is the next milestone.',
    contentMarkdown: '### Recorded milestone\n\nUnit tests and the configured Trivy gate passed. A separate job authenticated through OIDC, rebuilt an image, and pushed it to Amazon ECR. The payment endpoint is a demo.\n\n### Remaining work\n\nPublish the exact scanned digest, add a runtime deployment, and record health checks and a controlled rollback. An ECR push by itself does not establish a running service or successful payment processing.',
    tags: ['Docker', 'ECR', 'CI'], sourceUrl: evidenceLinks.paymentPublish,
  },
  {
    id: 'scan-failure', title: 'Investigate a Scan Failure Before Naming Its Cause', category: 'Security', categoryColor: 'secondary', readTime: '1 min', year: 'Reviewed Oct 2026',
    summary: 'The reviewed GitOps main run fails at Trivy. The step status alone does not identify the cause.',
    contentMarkdown: '### Observed result\n\nIn the linked main-branch run, tests and the Docker build passed, Trivy failed, and smoke tests were skipped.\n\n### Investigation approach\n\nRead the failing scan logs and configuration. A finding, scanner database problem, network error, or tool error can require different fixes. Record the actual cause, the change, and a successful rerun before claiming resolution.',
    tags: ['Trivy', 'Troubleshooting', 'GitOps'], sourceUrl: evidenceLinks.gitopsCi,
  },
];

export const engineeringArticles = logsData;

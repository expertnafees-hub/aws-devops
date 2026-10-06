import { ArchitectureSystem } from '../types';

// Component walkthroughs describe code and historical evidence, not a live AWS inventory.
export const architectureData: ArchitectureSystem[] = [
  {
    id: 'portfolio-delivery', systemNumber: 'SYSTEM_01', badge: 'RECORDED DELIVERY', badgeColor: 'tertiary',
    title: 'Static Portfolio Delivery',
    description: 'GitHub Actions publishes the website to S3 and requests a CloudFront invalidation. Viewers access CloudFront; these cards describe the delivery components.',
    ingressText: 'Website hosting and cache configuration', healthText: 'Historical deployment run linked in Projects',
    nodes: [
      {
        id: 'website-actions', name: 'GitHub Actions', role: 'Checks TypeScript, infrastructure configuration, and frontend build before main-branch delivery.',
        cidrOrEndpoint: 'expertnafees-hub/aws-devops / .github/workflows/deploy.yml', protocolPorts: 'GitHub-hosted workflow; AWS API calls',
        securityGroup: 'The recorded run used OIDC role assumption. An access-key fallback remains in the workflow.',
        healthCheck: 'Type checking, infrastructure gate, and build passed in the linked run.',
        failover: 'No automatic rollback or recovery measurement is established by this run.',
      },
      {
        id: 'website-s3', name: 'Amazon S3', role: 'Stores the generated website bundle.',
        cidrOrEndpoint: 'Bucket is supplied through workflow configuration.', protocolPorts: 'S3 API upload; website origin access is configured separately',
        securityGroup: 'Bucket access and origin permissions require review of the IaC and AWS configuration.',
        healthCheck: 'The recorded deployment synchronized hashed assets and entry-point files successfully.',
        failover: 'A successful upload does not prove a restore procedure or current availability.',
      },
      {
        id: 'website-cloudfront', name: 'CloudFront', role: 'Serves the static portfolio with cache behavior configured in infrastructure code.',
        cidrOrEndpoint: 'drqzr31lhv59g.cloudfront.net', protocolPorts: 'Viewer HTTPS; origin settings are defined in IaC',
        securityGroup: 'The page does not inspect the current distribution or WAF configuration.',
        healthCheck: 'An invalidation request was created in the recorded run. Current viewer responses are not measured here.',
        failover: 'No measured delivery latency, uptime, or cross-region failover is published.',
      },
    ],
  },
  {
    id: 'three-tier-architecture', systemNumber: 'SYSTEM_02', badge: 'CONFIGURED LAB', badgeColor: 'secondary',
    title: 'Three-Tier Lab Components',
    description: 'ALB routes to static Nginx on private EC2. RDS is configured in an isolated tier; the application-to-database connection has not been implemented.',
    ingressText: 'HTTP default / HTTPS optional', healthText: 'Configuration validation; deployment tests pending',
    nodes: [
      {
        id: 'lab-alb', name: 'Public ALB', role: 'Configured to distribute requests to private EC2 instances across two Availability Zones.',
        cidrOrEndpoint: 'Public subnets in the Terraform VPC; no deployed endpoint is published.', protocolPorts: 'HTTP 80 by default; optional HTTPS 443; target HTTP 80',
        securityGroup: 'ALB ingress on 80/443; target egress restricted to app subnets on TCP 80.',
        healthCheck: 'Target group GET / requires HTTP 200. This checks Nginx, not database readiness.',
        failover: 'Routing and health replacement are configured; no measured failure drill is published.',
      },
      {
        id: 'lab-ec2', name: 'Private EC2 / ASG', role: 'Static Nginx demo with SSM management and IMDSv2 configured.',
        cidrOrEndpoint: 'Private app subnets; ASG min 2, desired 2, max 4.', protocolPorts: 'HTTP 80 from ALB; no SSH ingress',
        securityGroup: 'App ingress from the ALB security group. App outbound access remains broad.',
        healthCheck: 'ELB health replacement is configured. Bootstrap depends on package and AWS API connectivity.',
        failover: 'Instance refresh permits 50% healthy capacity; no zero-downtime or recovery-time result is claimed.',
      },
      {
        id: 'lab-rds', name: 'Isolated RDS MySQL', role: 'Database resource and managed master credentials are configured. Nginx does not query this database.',
        cidrOrEndpoint: 'DB subnets with local routes only; Single-AZ RDS is the default.', protocolPorts: 'MySQL TCP 3306 permitted from the app security group',
        securityGroup: 'Public database access is disabled. Demo master-secret access is optional and disabled by default.',
        healthCheck: 'No application database query or restore test has been recorded.',
        failover: 'Multi-AZ is optional. Backups are configured, but successful restoration is not demonstrated.',
      },
    ],
  },
  {
    id: 'payment-api', systemNumber: 'SYSTEM_03', badge: 'IMAGE PUBLICATION', badgeColor: 'tertiary',
    title: 'Payment API Delivery Milestones',
    description: 'The recorded workflow tests and scans the demo API, then publishes a rebuilt image to ECR. A running service and rollback validation remain future milestones.',
    ingressText: 'Demo API / runtime deployment pending', healthText: 'Tests, scan gate, and ECR push recorded',
    nodes: [
      {
        id: 'payment-ci', name: 'Tests and Scan', role: 'Unit tests, Docker build, and a configured Trivy image scan gate.',
        cidrOrEndpoint: 'expertnafees-hub/payment-api / GitHub Actions', protocolPorts: 'CI build and scan; no deployed endpoint is established',
        securityGroup: 'Scan behavior is defined by the workflow severity and exit-code settings.',
        healthCheck: 'Unit tests and the configured scan gate passed in the linked run.',
        failover: 'A successful scan is scoped to that run and configuration; it is not a permanent vulnerability guarantee.',
      },
      {
        id: 'payment-ecr', name: 'Amazon ECR', role: 'Stores the image published by a separate build-and-push job.',
        cidrOrEndpoint: 'Registry and repository are supplied by workflow configuration.', protocolPorts: 'Authenticated registry API / image push',
        securityGroup: 'The recorded publishing job assumed an AWS role through OIDC.',
        healthCheck: 'Build, tag, and push steps passed in the recorded job.',
        failover: 'The publishing job rebuilds the image; exact scanned-to-published digest identity is not demonstrated.',
      },
      {
        id: 'payment-runtime', name: 'Runtime / Next Milestone', role: 'Deploy the image to a chosen runtime and record real health checks and a rollback exercise.',
        cidrOrEndpoint: 'No runtime endpoint is published.', protocolPorts: 'To be defined by the deployment implementation',
        securityGroup: 'Runtime permissions and network boundaries still need implementation and validation.',
        healthCheck: 'Deployment and service health evidence pending.',
        failover: 'No ECS/EKS rollout, automatic rollback, or uptime result is claimed.',
      },
    ],
  },
];

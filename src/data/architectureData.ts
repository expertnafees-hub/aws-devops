import { ArchitectureSystem } from '../types';

export const architectureData: ArchitectureSystem[] = [
  {
    id: 'system-01',
    systemNumber: 'SYSTEM_01',
    badge: 'REFERENCE ARCHITECTURE',
    badgeColor: 'tertiary',
    title: 'High-Availability Web Platform',
    description: 'Reference architecture for resilient web tiering: Route 53 DNS routing, CloudFront edge caching, ALB Layer-7 traffic distribution across dual Availability Zones, and auto-scaling EC2 compute in private subnets.',
    ingressText: 'Pattern: Layer 7 HTTPS / ALB',
    healthText: 'Design: Multi-AZ Redundancy',
    nodes: [
      {
        id: 'route53',
        name: 'Amazon Route 53',
        role: 'Global DNS routing and health-checked failover policies',
        cidrOrEndpoint: 'Anycast DNS PoPs',
        protocolPorts: 'UDP/TCP 53',
        securityGroup: 'Managed by AWS Global Network',
        healthCheck: 'Route 53 health probe configured for target endpoints',
        failover: 'Automated DNS record failover to secondary target'
      },
      {
        id: 'cloudfront',
        name: 'Amazon CloudFront',
        role: 'Edge caching, TLS 1.3 termination, and origin shielding',
        cidrOrEndpoint: 'Global CloudFront Edge Network',
        protocolPorts: 'TCP 443 (HTTPS) / TCP 80 (HTTP 301 Redirect)',
        securityGroup: 'CloudFront Origin Access Control / Managed Edge',
        healthCheck: 'Origin response timeout threshold (default 30s)',
        failover: 'Configurable custom error response routing'
      },
      {
        id: 'alb',
        name: 'Application Load Balancer',
        role: 'Layer 7 HTTP/HTTPS request distribution across dual AZ targets',
        cidrOrEndpoint: 'Public subnets (AZ-A & AZ-B)',
        protocolPorts: 'TCP 443 (HTTPS listener) -> TCP 80/8080 (Target Groups)',
        securityGroup: 'sg-alb (Inbound 443 from internet / CloudFront)',
        healthCheck: 'Target Group HTTP GET /health (configurable interval & threshold)',
        failover: 'Cross-zone load balancing across healthy target instances'
      },
      {
        id: 'ec2-fleet',
        name: 'Auto Scaling EC2 Fleet',
        role: 'Stateless application instances hosted in private subnets',
        cidrOrEndpoint: 'Private subnets (AZ-A & AZ-B)',
        protocolPorts: 'TCP 8080 (Application daemon)',
        securityGroup: 'sg-app (Inbound restricted to sg-alb)',
        healthCheck: 'EC2 instance status checks & ELB health check replacement',
        failover: 'Auto Scaling Group automatically provisions healthy replacement capacity'
      }
    ]
  },
  {
    id: 'system-02',
    systemNumber: 'SYSTEM_02',
    badge: 'IMPLEMENTED IN LAB // THREE-TIER',
    badgeColor: 'secondary',
    title: 'Multi-Tier Isolated VPC',
    description: 'Network segregation modeled in aws-three-tier-architecture: public subnets with Internet Gateway, private application subnets with NAT egress, and isolated database subnets without internet routes.',
    ingressText: 'Network: 3 Discrete Subnet Tiers',
    healthText: 'Data Tier: Isolated (No Internet Egress)',
    nodes: [
      {
        id: 'vpc-core',
        name: 'VPC 10.0.0.0/16 Boundary',
        role: 'Isolated cloud network boundary with private CIDR block',
        cidrOrEndpoint: '10.0.0.0/16 CIDR block',
        protocolPorts: 'All IP protocols within VPC boundary',
        securityGroup: 'VPC Default Security Group (Inbound blocked)',
        healthCheck: 'VPC Flow Logs monitoring capability',
        failover: 'Multi-AZ subnet distribution across 2 Availability Zones'
      },
      {
        id: 'public-subnet',
        name: 'Public Subnet Tier',
        role: 'Ingress tier for ALB and NAT Gateways with Internet Gateway route',
        cidrOrEndpoint: '10.0.1.0/24 & 10.0.2.0/24',
        protocolPorts: 'TCP 443, TCP 80',
        securityGroup: 'sg-alb (Public ingress on 80/443)',
        healthCheck: 'Internet Gateway route 0.0.0.0/0 -> igw',
        failover: 'Redundant public subnets across AZ-A and AZ-B'
      },
      {
        id: 'private-app-subnet',
        name: 'Private Application Subnet Tier',
        role: 'Compute instances with outbound internet access via NAT Gateway',
        cidrOrEndpoint: '10.0.10.0/24 & 10.0.11.0/24',
        protocolPorts: 'TCP 8080 (Application ports)',
        securityGroup: 'sg-app (Inbound from sg-alb only)',
        healthCheck: 'Route table: 0.0.0.0/0 -> NAT Gateway',
        failover: 'Instances distributed across dual private subnets'
      },
      {
        id: 'isolated-db-subnet',
        name: 'Isolated Database Subnet Tier',
        role: 'Database tier with zero internet routes (no IGW, no NAT)',
        cidrOrEndpoint: '10.0.20.0/24 & 10.0.21.0/24',
        protocolPorts: 'TCP 3306 (MySQL default)',
        securityGroup: 'sg-db (Inbound from sg-app only on 3306)',
        healthCheck: 'RDS engine health check and automated backups',
        failover: 'Multi-AZ standby replica failover capability'
      }
    ]
  },
  {
    id: 'system-03',
    systemNumber: 'SYSTEM_03',
    badge: 'IAC PATTERN',
    badgeColor: 'primary',
    title: 'Terraform Remote State Architecture',
    description: 'Centralized state management using Amazon S3 with SSE-KMS encryption and versioning, paired with concurrency state locking (via S3 native locking in Terraform 1.10+ or DynamoDB mutex table).',
    ingressText: 'Concurrency: S3 Native Lock / DynamoDB',
    healthText: 'Security: S3 Versioning & SSE-KMS',
    nodes: [
      {
        id: 'tf-cli',
        name: 'Terraform CLI / CI Runner',
        role: 'Executes terraform plan and apply via AWS OIDC role assumption',
        cidrOrEndpoint: 'GitHub Actions Runner / Workstation',
        protocolPorts: 'HTTPS 443 (AWS STS and S3 APIs)',
        securityGroup: 'IAM Role: Least-privilege CI deployment role',
        healthCheck: 'Static validation via terraform fmt, validate, and tflint',
        failover: 'Plan execution aborted if state lock cannot be acquired'
      },
      {
        id: 'state-lock',
        name: 'State Locking Coordinator',
        role: 'Coordinates atomic lock acquisition to prevent concurrent applies',
        cidrOrEndpoint: 'S3 use_lockfile (TF 1.10+) or DynamoDB LockID table',
        protocolPorts: 'HTTPS 443 (AWS API)',
        securityGroup: 'IAM Policy: PutObject / PutItem permissions for lock ID',
        healthCheck: 'Lock verified prior to plan or apply execution',
        failover: 'Lock released automatically upon command completion'
      },
      {
        id: 's3-backend',
        name: 'Amazon S3 State Bucket',
        role: 'Encrypted, versioned object storage for terraform.tfstate',
        cidrOrEndpoint: 'Private S3 Bucket with Block Public Access',
        protocolPorts: 'HTTPS 443 (Amazon S3 API)',
        securityGroup: 'Bucket Policy: Enforce HTTPS & SSE-KMS encryption',
        healthCheck: 'S3 Object Versioning enabled for state history rollback',
        failover: 'Bucket versioning preserves previous state revisions'
      }
    ]
  },
  {
    id: 'system-04',
    systemNumber: 'SYSTEM_04',
    badge: 'REFERENCE ARCHITECTURE',
    badgeColor: 'tertiary',
    title: 'Container Orchestration & Ingress',
    description: 'Reference architecture for containerized microservices: AWS Load Balancer Controller managing Layer-7 ALBs dynamically, private compute workers, and structured log streaming to CloudWatch.',
    ingressText: 'Ingress: AWS Load Balancer Controller',
    healthText: 'Telemetry: Structured Logs to CloudWatch',
    nodes: [
      {
        id: 'alb-controller',
        name: 'AWS Load Balancer Controller',
        role: 'Provisions and configures AWS ALBs from Kubernetes ingress resources',
        cidrOrEndpoint: 'Cluster ingress controller pod',
        protocolPorts: 'HTTPS 443 (Kubernetes API & AWS ELB API)',
        securityGroup: 'IAM Roles for Service Accounts (IRSA)',
        healthCheck: 'Controller pod liveness and readiness probes',
        failover: 'Leader election across controller replicas'
      },
      {
        id: 'compute-nodes',
        name: 'Private Compute Workers',
        role: 'Executes container workloads in private subnets with least privilege',
        cidrOrEndpoint: 'Private worker subnets (Dual AZ)',
        protocolPorts: 'TCP 8080 (Target Group pod endpoints)',
        securityGroup: 'Worker security group allowing traffic from ALB only',
        healthCheck: 'Application container health endpoints (/healthz)',
        failover: 'Replica distribution across multiple Availability Zones'
      },
      {
        id: 'telemetry-shipper',
        name: 'CloudWatch Telemetry Shipper',
        role: 'Collects container stdout/stderr logs and metrics for observability',
        cidrOrEndpoint: 'Container logging daemon / agent',
        protocolPorts: 'HTTPS 443 (CloudWatch Logs API)',
        securityGroup: 'Scoped IAM policy for PutLogEvents',
        healthCheck: 'Shipper log buffer and transmission metrics',
        failover: 'Log buffering preserves events during temporary network delays'
      }
    ]
  }
];

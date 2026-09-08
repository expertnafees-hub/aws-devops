import { ArchitectureSystem } from '../types';

export const architectureData: ArchitectureSystem[] = [
  {
    id: 'system-01',
    systemNumber: 'SYSTEM_01',
    badge: '99.99% RESILIENT',
    badgeColor: 'tertiary',
    title: 'Highly Available Web Platform',
    description: 'Global edge routing with AWS Route 53 latency DNS, CloudFront caching, ALB layer-7 traffic distribution across 2 AZs, and automated recovery EC2 fleets.',
    ingressText: 'Active Ingress: Port 443 HTTPS',
    healthText: 'Healthchecks passing: 200 OK /health',
    nodes: [
      {
        id: 'route53',
        name: 'Route 53 Global DNS',
        role: 'Global Latency & Health-based DNS Failover',
        cidrOrEndpoint: 'ns-124.awsdns.org / Anycast PoPs',
        protocolPorts: 'UDP/TCP 53',
        securityGroup: 'Managed by AWS Global Network',
        healthCheck: 'Route 53 Health Check: HTTP /health probe every 10s',
        failover: 'Automated failover to secondary DR region within 30 seconds'
      },
      {
        id: 'cloudfront',
        name: 'Amazon CloudFront CDN',
        role: 'Edge Caching, TLS 1.3 Termination, WAF Filtering',
        cidrOrEndpoint: 'd111111abcdef8.cloudfront.net',
        protocolPorts: 'TCP 443 (HTTPS) / TCP 80 (Redirect)',
        securityGroup: 'CloudFront Origin Shield IP List',
        healthCheck: 'Origin response timeout threshold: 15s',
        failover: 'Dynamic route to S3 static maintenance page on origin 5xx'
      },
      {
        id: 'alb',
        name: 'Dual-AZ Application Load Balancer',
        role: 'Layer 7 HTTP/HTTPS Request Router with SSL Offload',
        cidrOrEndpoint: '10.0.1.0/24 (AZ-A), 10.0.2.0/24 (AZ-B)',
        protocolPorts: 'TCP 443 -> TCP 8080 (Target Groups)',
        securityGroup: 'sg-alb-ingress (0.0.0.0/0:443 Inbound only)',
        healthCheck: 'Target Group HTTP GET /api/v1/health (Interval 15s, Healthy 2, Unhealthy 3)',
        failover: 'Cross-zone load balancing distributes traffic evenly across both healthy AZ fleets'
      },
      {
        id: 'ec2-fleet',
        name: 'Multi-AZ EC2 Auto Scaling Target Group',
        role: 'Stateless Application Workers in Private Subnets',
        cidrOrEndpoint: '10.0.10.0/24 (AZ-A), 10.0.11.0/24 (AZ-B)',
        protocolPorts: 'TCP 8080 (App daemon)',
        securityGroup: 'sg-app-compute (Inbound from sg-alb only on 8080)',
        healthCheck: 'ELB Health Check replaced by ASG termination on persistent failure',
        failover: 'Auto Scaling launches replacement instances in alternate AZ automatically'
      }
    ]
  },
  {
    id: 'system-02',
    systemNumber: 'SYSTEM_02',
    badge: 'AIR-GAPPED DB',
    badgeColor: 'secondary',
    title: 'Secure Multi-Tier Isolated VPC',
    description: 'Granular network segregation featuring public subnets with Internet Gateway, private application subnets via NAT Gateways, and isolated database subnets without outbound internet routes.',
    ingressText: 'Route Tables: 3 Discrete Associations',
    healthText: 'Zero public DB leaks (Isolated Subnets)',
    nodes: [
      {
        id: 'vpc-core',
        name: 'VPC 10.0.0.0/16 Core',
        role: 'Primary Network Boundary with DNS Resolution & Hostnames',
        cidrOrEndpoint: '10.0.0.0/16 (65,536 Available IPs)',
        protocolPorts: 'All IP Protocols within VPC CIDR',
        securityGroup: 'VPC Default SG (All ingress blocked by default)',
        healthCheck: 'VPC Flow Logs streaming to CloudWatch Logs Group',
        failover: 'Redundant Availability Zones us-east-1a and us-east-1b'
      },
      {
        id: 'public-subnet',
        name: 'Public Subnet /24 (Web & Ingress)',
        role: 'Internet Gateway Routing, NAT Gateways, and Bastion Host',
        cidrOrEndpoint: '10.0.1.0/24 & 10.0.2.0/24',
        protocolPorts: 'TCP 443, TCP 80, TCP 22 (Bastion IP restricted)',
        securityGroup: 'sg-public-ingress (WAF & ALB ingress rules)',
        healthCheck: 'Internet Gateway active connectivity status',
        failover: 'Dual NAT Gateways provisioned independently per AZ'
      },
      {
        id: 'private-app-subnet',
        name: 'Private Application Subnet /24',
        role: 'Compute Instances & Container Workloads (Outbound via NAT)',
        cidrOrEndpoint: '10.0.10.0/24 & 10.0.11.0/24',
        protocolPorts: 'TCP 8080, TCP 443 (Outbound for OS package updates)',
        securityGroup: 'sg-app-internal (Accepts requests from ALB SG only)',
        healthCheck: 'Route table: 0.0.0.0/0 -> NAT Gateway (nat-0a1b2c3)',
        failover: 'AZ-A traffic routes through NAT-A; AZ-B through NAT-B'
      },
      {
        id: 'isolated-db-subnet',
        name: 'Isolated Database Subnet /24',
        role: 'Amazon Aurora Multi-AZ MySQL / PostgreSQL Cluster',
        cidrOrEndpoint: '10.0.20.0/24 & 10.0.21.0/24',
        protocolPorts: 'TCP 3306 (MySQL) or TCP 5432 (PostgreSQL)',
        securityGroup: 'sg-rds-cluster (Ingress from sg-app-internal ONLY)',
        healthCheck: 'Aurora automated failover monitoring daemon (< 30s crash recovery)',
        failover: 'Automatic promotion of read replica in AZ-B if primary in AZ-A degrades'
      }
    ]
  },
  {
    id: 'system-03',
    systemNumber: 'SYSTEM_03',
    badge: 'STATE LOCKING',
    badgeColor: 'primary',
    title: 'Terraform Remote State Architecture',
    description: 'Centralized state repository utilizing Amazon S3 bucket with strict versioning, KMS SSE-KMS encryption, and DynamoDB lock tables preventing concurrent mutating plans.',
    ingressText: 'Concurrency Control: Active DynamoDB Mutex',
    healthText: 'Atomic state writes with KMS encryption',
    nodes: [
      {
        id: 'tf-cli',
        name: 'Terraform CLI / CI Runner',
        role: 'Executes terraform plan and apply via AWS OIDC Authentication',
        cidrOrEndpoint: 'GitHub Actions Runner / Local Terminal',
        protocolPorts: 'HTTPS 443 (AWS STS & API endpoints)',
        securityGroup: 'IAM Role: TerraformDeployerRole (Least privilege)',
        healthCheck: 'Pre-flight tfsec and tflint static validation checks',
        failover: 'Automatic abort if state lock cannot be acquired'
      },
      {
        id: 'dynamodb-lock',
        name: 'DynamoDB Mutex Lock Table',
        role: 'Distributed LockID Coordinator preventing concurrent mutations',
        cidrOrEndpoint: 'arn:aws:dynamodb:us-east-1:xxxx:table/terraform-state-lock',
        protocolPorts: 'HTTPS 443 (DynamoDB API)',
        securityGroup: 'IAM Policy: PutItem, DeleteItem, GetItem on LockID',
        healthCheck: 'DynamoDB Table Status: ACTIVE (Pay-Per-Request billing)',
        failover: 'Lock timeout expiration and emergency force-unlock procedures'
      },
      {
        id: 's3-backend',
        name: 'Amazon S3 State Storage Bucket',
        role: 'Encrypted, Versioned Storage for .tfstate infrastructure maps',
        cidrOrEndpoint: 's3://nafees-tf-state-prod-useast1/core/vpc-fleet.tfstate',
        protocolPorts: 'HTTPS 443 (Amazon S3 API)',
        securityGroup: 'Bucket Policy: Require TLS 1.2+ & KMS SSE Header',
        healthCheck: 'S3 Object Versioning Enabled (Instant rollback capability)',
        failover: 'S3 Cross-Region Replication (CRR) to us-west-2 disaster recovery bucket'
      }
    ]
  },
  {
    id: 'system-04',
    systemNumber: 'SYSTEM_04',
    badge: 'CONTAINERS',
    badgeColor: 'tertiary',
    title: 'Microservices on AWS EKS / ECS Fargate',
    description: 'Container orchestrator running on managed nodes. Integrates AWS Load Balancer Controller for dynamic TargetGroupBindings, AWS Secret Manager sidecars, and fluent-bit logging.',
    ingressText: 'Kubernetes: v1.29 Compatible Engine',
    healthText: 'Autoscaling enabled: HPA & Karpenter',
    nodes: [
      {
        id: 'alb-controller',
        name: 'AWS Load Balancer Controller',
        role: 'Watches Kubernetes Ingress manifests and provisions AWS ALBs',
        cidrOrEndpoint: 'kube-system / alb-ingress-controller pod',
        protocolPorts: 'HTTPS 443 (Kubernetes API) -> AWS ElasticLoadBalancing API',
        securityGroup: 'IRSA Role: AWSLoadBalancerControllerIAMPolicy',
        healthCheck: 'Controller healthz endpoint on port 10254',
        failover: 'Dual-replica controller deployment with leader election'
      },
      {
        id: 'fargate-compute',
        name: 'ECS Fargate / EKS Node Group',
        role: 'Runs isolated, ephemeral microservices in private worker subnets',
        cidrOrEndpoint: '10.0.10.0/24 (AZ-A) & 10.0.11.0/24 (AZ-B)',
        protocolPorts: 'TCP 8080 (Pod IP target mode)',
        securityGroup: 'sg-eks-nodes (Inter-pod network policy enforcement)',
        healthCheck: 'Kubernetes Liveness and Readiness probes (HTTP /healthz 5s)',
        failover: 'Horizontal Pod Autoscaler (HPA) scales pods from 3 to 15 under load'
      },
      {
        id: 'telemetry-sidecar',
        name: 'Fluent Bit & CloudWatch Shipper',
        role: 'DaemonSet collecting stdout/stderr container logs and metrics',
        cidrOrEndpoint: 'DaemonSet on each worker node',
        protocolPorts: 'Unix socket /var/log/containers -> CloudWatch Logs API',
        securityGroup: 'IRSA Role: CloudWatchAgentServerPolicy',
        healthCheck: 'Fluent Bit internal buffer metrics check',
        failover: 'Disk-backed buffering prevents data loss during upstream network blips'
      }
    ]
  }
];

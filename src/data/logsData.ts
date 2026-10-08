import { EngineeringArticle } from '../types';

export const logsData: EngineeringArticle[] = [
  {
    id: 'zero-downtime-ha-architecture',
    title: 'Multi-AZ High Availability Patterns: ALB, Auto Scaling, and RDS Failover',
    category: 'Systems',
    categoryColor: 'tertiary',
    readTime: '6 min read',
    year: '2024',
    summary: 'Architectural analysis of multi-tier cloud resilience: ALB health check tuning, connection draining, Auto Scaling instance replacement, and Amazon RDS Multi-AZ automatic failover.',
    tags: ['AWS', 'High Availability', 'ALB', 'Auto Scaling', 'RDS', 'Architecture'],
    contentMarkdown: `### Designing for Failure in Multi-AZ Cloud Topologies

Building resilient cloud architectures requires designing every tier to handle instance termination, Availability Zone impairment, and infrastructure degradation without interrupting client workflows.

#### 1. Layer-7 Traffic Management & Target Health
The Application Load Balancer (ALB) serves as the primary ingress router across multiple Availability Zones. Key availability controls include:
- **Health Check Calibration:** Tuning health check intervals (e.g., 15s interval, 2 consecutive healthy thresholds, 3 unhealthy thresholds) balances fast failure detection against transient blip false alarms.
- **Deregistration Delay (Connection Draining):** When an EC2 target is flagged unhealthy or during an Auto Scaling scale-in event, the ALB allows in-flight TCP sessions to finish cleanly before terminating the target (default 300s, configurable down to 30-60s for stateless web APIs).
- **Cross-Zone Load Balancing:** Enabled by default on ALBs, distributing requests evenly across healthy registered targets in all enabled Availability Zones regardless of target group distribution.

#### 2. Stateless Compute Self-Healing with Auto Scaling Groups
Stateless web tiers placed in private subnets across dual Availability Zones leverage EC2 Auto Scaling Groups (ASGs):
- **ELB Health Check Integration:** Configuring the ASG to use \`health_check_type = "ELB"\` ensures instances failing Application Load Balancer health checks are automatically scheduled for termination and replacement.
- **Capacity Balancing:** The ASG maintains balanced capacity across configured Availability Zones, launching replacement instances in alternate zones when an AZ encounters issues.

#### 3. Data Tier Resilience: Amazon RDS Multi-AZ
Stateless compute can scale and cycle easily, but stateful databases require automated failover mechanisms:
- **Synchronous Replication:** Amazon RDS Multi-AZ automatically provisions and maintains a synchronous standby replica in a secondary Availability Zone.
- **Automated DNS Endpoint Failover:** In the event of primary database instance failure, OS maintenance, or AZ disruption, RDS switches the CNAME record of the DB endpoint to the standby replica (typically completing in 60 to 120 seconds).
- **Network Isolation:** RDS instances reside in private database subnet groups across multiple AZs without Internet Gateway routes, accessible solely from compute security groups on designated database ports (e.g., TCP 3306 for MySQL).

#### Key Takeaway
High availability is achieved through layered mechanisms: rapid health detection at ingress, automated instance cycling at the compute layer, and managed synchronous failover at the data tier.`
  },
  {
    id: 'zero-ssh-systems-manager',
    title: 'Hardening EC2 Management with AWS Systems Manager Session Manager',
    category: 'Security',
    categoryColor: 'primary',
    readTime: '5 min read',
    year: '2024',
    summary: 'Eliminating inbound Port 22 SSH exposure across compute fleets using AWS Systems Manager Session Manager, IMDSv2 enforcement, and centralized CloudWatch session audit logging.',
    tags: ['AWS', 'Security', 'SSM', 'EC2', 'IAM', 'Hardening'],
    contentMarkdown: `### Eliminating Inbound Bastions and SSH Port 22

Managing cloud instances traditionally required deploying bastion hosts with public IP addresses, maintaining static SSH key pairs, and opening TCP port 22 in security groups. AWS Systems Manager (SSM) Session Manager replaces this model with identity-aware, outbound-only session tunneling.

#### 1. How Session Manager Operates Without Open Ports
Session Manager connects to instances through the Amazon SSM Agent over outbound HTTPS (TCP 443):
- **Zero Inbound Ingress:** Security groups associated with EC2 instances require zero inbound rules for management traffic (port 22 can be completely eliminated).
- **Outbound Communication:** The SSM Agent initiates an outbound connection to AWS Systems Manager endpoints (via an Internet Gateway, NAT Gateway, or private AWS PrivateLink VPC endpoints).
- **IAM-Governed Access:** Operator authentication and authorization are governed strictly by AWS IAM policies rather than SSH keys.

#### 2. Least-Privilege IAM Instance Profiles
Instances require an attached IAM role with permissions to communicate with the SSM control plane:
- The managed policy \`AmazonSSMManagedInstanceCore\` grants minimal permissions necessary for the agent to check in and receive commands.
- Specific AWS Secrets Manager read policies can be attached to allow bootstrap scripts to retrieve dynamic application credentials at launch without storing static secrets on disk.

#### 3. Hardening Instance Metadata with IMDSv2
To protect instance credentials against Server-Side Request Forgery (SSRF) vulnerabilities, instances should enforce Instance Metadata Service Version 2 (IMDSv2):
\`\`\`hcl
metadata_options {
  http_endpoint               = "enabled"
  http_tokens                 = "required"
  http_put_response_hop_limit = 1
}
\`\`\`
IMDSv2 mandates a session-oriented PUT request to acquire a secret token before querying metadata, blocking SSRF vulnerabilities from unauthorized network hops.

#### 4. Auditability and Session Recording
Session Manager centralizes session management and auditing:
- Operator connections are recorded in AWS CloudTrail.
- Session keystrokes and command output can be encrypted using AWS KMS and streamed directly to Amazon S3 buckets or Amazon CloudWatch Logs for compliance audit trails.

#### Key Takeaway
Eliminating inbound management ports reduces the network attack surface while providing auditable, identity-based access control.`
  },
  {
    id: 'terraform-state-locking-scale',
    title: 'Terraform State Management: Remote Backends, State Locking, and Drift Detection',
    category: 'IaC',
    categoryColor: 'secondary',
    readTime: '6 min read',
    year: '2024',
    summary: 'Best practices for safe Terraform state collaboration: S3 remote backends with SSE-KMS, modern Terraform 1.10+ native S3 state locking vs DynamoDB mutex, and automated drift detection.',
    tags: ['Terraform', 'IaC', 'AWS', 'S3', 'DynamoDB', 'Automation'],
    contentMarkdown: `### Managing Infrastructure State Safely

Terraform state (\`terraform.tfstate\`) represents the source of truth mapping declared HCL code to real-world cloud resources. Protecting state files from concurrent writes and unauthorized access is essential for team collaboration and automated CI pipelines.

#### 1. Remote State Storage on Amazon S3
Storing state locally risks data loss, accidental leakage of sensitive values, and uncoordinated applies. An S3 remote backend provides:
- **Server-Side Encryption:** Enforcing SSE-KMS or SSE-S3 encryption at rest ensures state files containing infrastructure metadata and generated attributes are protected.
- **S3 Object Versioning:** Enabling versioning on the state bucket allows state rollbacks if a failed apply or malformed configuration corrupts the current state.
- **Bucket Access Controls:** Enforcing \`Block Public Access\` and bucket policies requiring TLS 1.2+ ensures state files cannot be exposed over unencrypted transit.

#### 2. Concurrency Control: State Locking
When multiple automated CI runs or team members execute \`terraform apply\` simultaneously, state corruption can occur without atomic concurrency locks:

##### Modern Native S3 Locking (Terraform v1.10+)
Terraform v1.10 introduced native state locking directly on Amazon S3 using conditional writes (\`PutObject\` with \`If-None-Match\`). This eliminates the need to provision a separate DynamoDB table:
\`\`\`hcl
terraform {
  backend "s3" {
    bucket       = "corp-tf-state-useast1"
    key          = "platform/vpc.tfstate"
    region       = "us-east-1"
    encrypt      = true
    use_lockfile = true  # Native S3 state locking (Terraform 1.10+)
  }
}
\`\`\`

##### Traditional DynamoDB Locking (Terraform < 1.10)
In earlier Terraform versions, distributed locking is coordinated through an Amazon DynamoDB table:
\`\`\`hcl
terraform {
  backend "s3" {
    bucket         = "corp-tf-state-useast1"
    key            = "platform/vpc.tfstate"
    region         = "us-east-1"
    dynamodb_table = "terraform-state-locks"
    encrypt        = true
  }
}
\`\`\`
The DynamoDB table uses a primary partition key named \`LockID\` (String type) where Terraform writes an atomic lock entry during operations.

#### 3. Infrastructure Drift Detection
Infrastructure drift occurs when cloud resources are modified outside of Terraform (e.g., manual console edits or emergency hotfixes):
- Automated CI workflows can execute \`terraform plan -detailed-exitcode\`.
- **Exit Code 0:** Succeeded with empty diff (no changes).
- **Exit Code 1:** Error encountered during plan.
- **Exit Code 2:** Succeeded with non-empty diff (drift detected). Emits alerts to notify engineers of out-of-band changes.

#### Key Takeaway
Treat infrastructure state as critical data: enforce encryption at rest, enable versioning, require atomic locking, and verify state integrity through automated CI checks.`
  },
  {
    id: 'aws-iam-least-privilege',
    title: 'AWS IAM Security: OIDC Federation, Roles, and Least Privilege',
    category: 'Security',
    categoryColor: 'secondary',
    readTime: '6 min read',
    year: '2024',
    summary: 'Eliminating static AWS access keys in CI/CD pipelines through OpenID Connect (OIDC) federated role assumption, scoped condition keys, and IAM permission boundaries.',
    tags: ['AWS', 'IAM', 'Security', 'OIDC', 'GitHub Actions', 'DevSecOps'],
    contentMarkdown: `### Eliminating Long-Lived Static Credentials

Hardcoded static AWS access keys (\`AKIA...\`) stored in CI/CD secrets repositories create persistent security risks: credentials can be leaked, rotation is often neglected, and permissions are frequently over-scoped. OpenID Connect (OIDC) role assumption provides short-lived, verifiable temporary credentials.

#### 1. How OIDC Federation Works with GitHub Actions
Rather than storing static AWS secrets in GitHub repository settings, GitHub Actions authenticates directly with AWS Identity and Access Management (IAM) using OpenID Connect:
1. **JWT Issuance:** At runtime, the GitHub Actions runner requests a signed JSON Web Token (JWT) from GitHub's OIDC token service.
2. **Token Exchange:** The workflow calls AWS Security Token Service (STS) \`AssumeRoleWithWebIdentity\`, presenting the signed JWT.
3. **Validation & Role Assumption:** AWS STS validates the token against the configured IAM OIDC Identity Provider (\`token.actions.githubusercontent.com\`). If trust conditions match, STS returns temporary credentials valid for a scoped duration (typically 1 hour).

#### 2. Configuring Scoped Trust Policies
The IAM Role's trust policy must strictly scope which repositories, branches, and audiences are permitted to assume the role:
\`\`\`json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Principal": {
        "Federated": "arn:aws:iam::123456789012:oidc-provider/token.actions.githubusercontent.com"
      },
      "Action": "sts:AssumeRoleWithWebIdentity",
      "Condition": {
        "StringEquals": {
          "token.actions.githubusercontent.com:aud": "sts.amazonaws.com"
        },
        "StringLike": {
          "token.actions.githubusercontent.com:sub": "repo:expertnafees-hub/aws-devops:ref:refs/heads/main"
        }
      }
    }
  ]
}
\`\`\`
Scoping the \`sub\` claim ensures that only workflows running on the specified repository and branch can assume the deployment role.

#### 3. Principle of Least Privilege & Permission Boundaries
- **Explicit Action Whitelisting:** Avoid wildcard actions like \`"Action": "s3:*"\`. Explicitly specify required operations (e.g., \`s3:PutObject\`, \`s3:GetObject\`, \`s3:ListBucket\`).
- **Resource Constraints:** Scope permissions to specific resource ARNs rather than \`"Resource": "*"\` wherever supported by AWS services.
- **Permission Boundaries:** An IAM permission boundary sets the maximum allowable permissions for an IAM entity, ensuring that even if an attached policy grants broad access, effective permissions remain clamped.

#### Key Takeaway
OIDC federation eliminates long-lived credentials, replacing them with temporary tokens governed by strictly scoped trust policies and IAM boundaries.`
  },
  {
    id: 'docker-networking-internals',
    title: 'Container Virtualization & Docker Networking Internals',
    category: 'Containers',
    categoryColor: 'primary',
    readTime: '7 min read',
    year: '2024',
    summary: 'Under the hood of Linux container virtualization: kernel namespaces, cgroups v2, virtual ethernet (veth) pairs, bridge networking with iptables NAT, and multi-stage build optimization.',
    tags: ['Docker', 'Containers', 'Linux', 'Networking', 'iptables', 'DevOps'],
    contentMarkdown: `### Demystifying Container Virtualization

Containers are not lightweight virtual machines; they are standard Linux processes running directly on the host kernel, isolated by Linux kernel namespaces and constrained by control groups (cgroups).

#### 1. Linux Kernel Isolation Primitives
Container runtime engines (such as runc and containerd) orchestrate two core Linux kernel subsystems:
- **Namespaces (Visibility Isolation):**
  - \`pid\`: Isolates process IDs (container sees its own PID 1).
  - \`net\`: Isolates network interfaces, routing tables, and port bindings.
  - \`mnt\`: Isolates filesystem mount points (container rootfs).
  - \`ipc\`: Isolates inter-process communication resources.
  - \`uts\`: Isolates hostname and NIS domain name.
  - \`user\`: Maps container user and group IDs to different host IDs.
- **Control Groups / cgroups (Resource Constraints):**
  - Restricts and meters CPU, memory, block I/O, and process count limits to prevent individual containers from exhausting host resources.

#### 2. How Docker Bridge Networking Works
When running a container on the default Docker bridge network:
1. **Bridge Device (\`docker0\`):** The Docker daemon creates a virtual software bridge named \`docker0\` with a private RFC 1918 subnet (e.g., \`172.17.0.0/16\`).
2. **Virtual Ethernet Pair (\`veth\`):** For each container, the kernel allocates a paired virtual ethernet interface:
   - One end (\`vethxxxx\`) remains in the host's root network namespace attached to \`docker0\`.
   - The other end is moved into the container's isolated network namespace and renamed to \`eth0\`.
3. **Packet Forwarding:** Packets traverse the virtual wire from the container's \`eth0\` through the host bridge into the kernel networking stack.

#### 3. Port Publishing via iptables DNAT
When publishing a host port to a container port (e.g., \`-p 80:8080\`):
- The Docker daemon injects Destination Network Address Translation (DNAT) rules into the host's \`iptables\` NAT table:
\`\`\`
PREROUTING Chain (nat table)
└── Ingress packet on host eth0:80
    └── DNAT target: Rewrite destination to 172.17.0.2:8080
\`\`\`
The kernel rewrites the destination IP and port to the container's private bridge IP, routing the packet into the container interface.

#### 4. Multi-Stage Dockerfile Optimization
Creating lightweight container images reduces transmission latency and container CVE attack surfaces:
\`\`\`dockerfile
# Stage 1: Build & Dependencies
FROM python:3.11-slim AS builder
WORKDIR /app
COPY requirements.txt .
RUN pip install --user --no-cache-dir -r requirements.txt

# Stage 2: Minimal Runtime
FROM python:3.11-slim
WORKDIR /app
COPY --from=builder /root/.local /root/.local
COPY src/ /app
ENV PATH=/root/.local/bin:$PATH
USER 10001
CMD ["python", "main.py"]
\`\`\`
Multi-stage builds leave compilation toolchains, package managers, and temporary build artifacts out of the final production layer.

#### Key Takeaway
Understanding kernel namespaces, virtual ethernet pairs, and iptables translation provides the foundational mental model required for troubleshooting container networking and Kubernetes pod communication.`
  }
];

export const engineeringArticles = logsData;

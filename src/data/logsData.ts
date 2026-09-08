import { EngineeringArticle } from '../types';

export const logsData: EngineeringArticle[] = [
  {
    id: 'linux-permissions-namespaces',
    title: 'How Linux permissions, groups, and namespaces actually work',
    category: 'Systems',
    categoryColor: 'secondary',
    readTime: '8 min read',
    year: '2024',
    summary: 'Diving beyond chmod 777: inspecting POSIX ACLs, UID mapping inside unprivileged container namespaces, and systemd isolation flags.',
    tags: ['Linux', 'Kernel', 'Security', 'Namespaces', 'systemd'],
    contentMarkdown: `### Beyond chmod 777: Linux Security Fundamentals

Too many deployment guides suggest \`chmod 777\` as a quick fix when permissions fail. In production, this breaks isolation and introduces severe security liabilities.

#### 1. POSIX Permission Bits & The Umask
Every Linux file inode contains a mode mask specifying read, write, and execute bits across three distinct scopes: User (owner), Group, and Other.
When a process executes, the kernel assesses effective UID (\`euid\`) and effective GID (\`egid\`) against these bits:
- **SetUID (4000):** Process inherits the owner's privileges (e.g. \`/usr/bin/passwd\`).
- **SetGID (2000):** Files created inside directories inherit the group ownership rather than the creator's default group.
- **Sticky Bit (1000):** Restricted deletion flag (standard on \`/tmp\`).

#### 2. POSIX Access Control Lists (ACLs)
Standard permission triads fall short for complex multi-service access. POSIX ACLs permit granular rules:
\`\`\`bash
# Grant read/write to deploy runner without altering primary group
setfacl -m u:github-runner:rw- /var/www/app/storage
getfacl /var/www/app/storage
\`\`\`

#### 3. Linux User Namespaces in Container Engines
Container runtimes like Docker and containerd rely on Linux User Namespaces (\`user_ns\`). This enables root UID 0 inside the container to map to an unprivileged UID (e.g. UID 10001) on the host kernel:
\`\`\`
Host OS UID 10001  <─── Kernel UID Mapping ───>  Container OS UID 0 (root)
\`\`\`
If a container breakout occurs, the attacker lands on the host with zero root capabilities.

#### Key Takeaway for Cloud Engineers
Never run container services as UID 0 unless strictly necessary for binding privileged ports (<1024). Enforce non-root execution via Dockerfile \`USER 1001\` and Kubernetes \`securityContext.runAsNonRoot: true\`.`
  },
  {
    id: 'production-aws-vpc-routing',
    title: 'Building a production-ready AWS VPC with private routing and NAT gateways',
    category: 'Networking',
    categoryColor: 'primary',
    readTime: '12 min read',
    year: '2024',
    summary: 'Architecting dual-AZ redundant VPC topologies, configuring route table associations, and optimizing NAT gateway costs without compromising compute security.',
    tags: ['AWS', 'VPC', 'Networking', 'Route Tables', 'NAT Gateway', 'CIDR'],
    contentMarkdown: `### Designing Deterministic Cloud Networks

A well-designed Virtual Private Cloud (VPC) is the bedrock of infrastructure reliability. Once provisioned and populated with stateful databases, altering CIDR ranges or subnet allocations requires disruptive migrations.

#### 1. CIDR Allocation & Subnet Segmentation
For an enterprise environment, we allocate a \`/16\` IPv4 block (65,536 addresses), split deliberately across three functional tiers and two Availability Zones:

\`\`\`
VPC: 10.0.0.0/16
├── AZ-A (us-east-1a)
│   ├── Public Subnet:    10.0.1.0/24  (ALBs, NAT-A, Bastion)
│   ├── Private Subnet:   10.0.10.0/24 (EC2 / ECS / EKS nodes)
│   └── Isolated DB:      10.0.20.0/24 (Aurora Primary)
└── AZ-B (us-east-1b)
    ├── Public Subnet:    10.0.2.0/24  (ALBs, NAT-B)
    ├── Private Subnet:   10.0.11.0/24 (EC2 / ECS / EKS nodes)
    └── Isolated DB:      10.0.21.0/24 (Aurora Replica)
\`\`\`

#### 2. Route Table Architecture
Three distinct route table types ensure that blast radiuses remain contained:
1. **Public Route Table:** \`0.0.0.0/0 -> igw-xxxx\` (Internet Gateway).
2. **Private Route Table (AZ-A):** \`0.0.0.0/0 -> nat-az-a\` (Outbound only).
3. **Isolated Database Route Table:** No default route \`0.0.0.0/0\`. Local \`10.0.0.0/16\` routing only.

#### 3. NAT Gateway Economics vs High Availability
A single NAT Gateway saves ~$32/month per unused AZ, but introduces a single point of failure. If \`us-east-1a\` encounters a network partition, private instances in \`us-east-1b\` lose outbound API egress.
- **Production Standard:** One NAT Gateway per Availability Zone.
- **Cost-Optimized Staging:** Single NAT Gateway shared across private subnets via centralized route table.

#### Key Takeaway for Cloud Engineers
Isolate data stores in subnets with NO internet gateway route. Enforce VPC Endpoints for S3 and DynamoDB to route traffic across AWS backbone fiber without incurring NAT data transfer fees.`
  },
  {
    id: 'idempotent-multi-env-terraform',
    title: 'Deploying idempotent multi-environment infrastructure with Terraform',
    category: 'IaC',
    categoryColor: 'tertiary',
    readTime: '10 min read',
    year: '2024',
    summary: 'Best practices for modular HCL, utilizing remote S3 backend state locking with DynamoDB, and managing workspace drift across staging and production.',
    tags: ['Terraform', 'IaC', 'DevOps', 'S3 Backend', 'DynamoDB', 'Automation'],
    contentMarkdown: `### The Golden Rules of Declarative Infrastructure

Infrastructure as Code must be deterministic. Executing \`terraform apply\` multiple times on an unchanged state must result in zero modifications.

#### 1. Safe State Concurrency
Without distributed state locking, two engineers or automated CI runners applying configurations simultaneously can corrupt the JSON state file.
We mandate an AWS S3 remote backend paired with DynamoDB:
\`\`\`hcl
terraform {
  backend "s3" {
    bucket         = "prod-company-tf-state-lock"
    key            = "platform/vpc.tfstate"
    region         = "us-east-1"
    dynamodb_table = "terraform-locks"
    encrypt        = true
  }
}
\`\`\`
The DynamoDB table must possess a primary hash key named \`LockID\` (String type).

#### 2. Structure: Modules vs Environments
Avoid massive monolithic \`main.tf\` repositories. Structure your projects into:
- **Reusable Modules (\`/modules\`):** Parameterized templates (VPC, EKS, RDS) with strict input validation rules.
- **Environment Roots (\`/environments/prod\`):** Thin orchestrators specifying variables and module invocations.

#### 3. Managing Drift Detection
Drift occurs when resources are altered out-of-band via AWS Web Console.
- Schedule daily CI cron jobs running \`terraform plan -detailed-exitcode\`.
- Exit code \`2\` denotes infrastructure drift. Emit a high-priority PagerDuty or Slack alert immediately.

#### Key Takeaway for Cloud Engineers
Treat infrastructure code with the same software engineering discipline as application code: unit testing, linting (\`tflint\`, \`tfsec\`), PR reviews, and automated CI pipelines.`
  },
  {
    id: 'aws-iam-least-privilege',
    title: 'Breaking down AWS IAM: Roles, Policies, and Least Privilege in Practice',
    category: 'Security',
    categoryColor: 'secondary',
    readTime: '7 min read',
    year: '2024',
    summary: 'Constructing permission boundaries, cross-account assume role conditions, and preventing accidental wildcard policies in automated CI pipelines.',
    tags: ['AWS', 'IAM', 'Security', 'OIDC', 'Cloud Security', 'Compliance'],
    contentMarkdown: `### Eliminating Long-Lived Static Keys

Over 70% of cloud security compromises trace back to exposed AWS Access Keys (\`AKIA...\`) committed to public repositories or hardcoded in CI settings.

#### 1. The OIDC Revolution for CI/CD
Modern DevOps architectures authenticate GitHub Actions via OpenID Connect (OIDC).
AWS Secure Token Service (STS) validates the JSON Web Token (JWT) signed by GitHub:
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
          "token.actions.githubusercontent.com:sub": "repo:nafees-cloud/*:ref:refs/heads/main"
        }
      }
    }
  ]
}
\`\`\`
This generates temporary credentials that automatically expire in 60 minutes. Zero static secrets stored in GitHub settings.

#### 2. Permission Boundaries
Permission boundaries establish the maximum permissions an IAM role can grant. Even if an automated pipeline attaches \`AdministratorAccess\` to a generated role, the action is clamped by the boundary policy.

#### 3. Auditing Wildcards
Replace \`"Action": "s3:*", "Resource": "*"\` with explicit API operations:
\`\`\`json
"Action": [
  "s3:GetObject",
  "s3:PutObject"
],
"Resource": "arn:aws:s3:::production-app-storage/*"
\`\`\`

#### Key Takeaway for Cloud Engineers
Security is not a final milestone before release; it is an active architectural constraint. Audit all IAM policies using AWS IAM Access Analyzer.`
  },
  {
    id: 'docker-networking-internals',
    title: 'Docker container networking and lifecycle management under the hood',
    category: 'Containers',
    categoryColor: 'primary',
    readTime: '9 min read',
    year: '2024',
    summary: 'Bridge vs host network modes, veth pairs, iptables NAT tables behind Docker daemon, and achieving slim multi-stage production images.',
    tags: ['Docker', 'Containers', 'Networking', 'iptables', 'Linux', 'DevOps'],
    contentMarkdown: `### Demystifying Container Virtualization

Containers are not lightweight virtual machines. They are regular Linux host processes isolated via Linux namespaces (\`net\`, \`pid\`, \`mnt\`, \`ipc\`, \`uts\`, \`user\`) and constrained by cgroups.

#### 1. The Virtual Ethernet (veth) Pair
When a container starts on the default bridge network:
1. The Docker daemon creates a virtual bridge interface named \`docker0\`.
2. A paired virtual ethernet device (\`veth\`) is spawned: one peer resides in the root network namespace attached to \`docker0\`, while the other peer is placed inside the container's isolated network namespace as \`eth0\`.
3. An internal RFC 1918 private IP address (e.g. \`172.17.0.2\`) is assigned to \`eth0\`.

#### 2. How Port Publishing (-p 80:8080) Works via iptables
Docker manipulates the Linux host's \`iptables\` packet filter. When publishing port 80 to container port 8080:
\`\`\`
PREROUTING Chain (nat table)
└── Ingress packet on eth0:80
    └── DNAT target: Rewrite destination to 172.17.0.2:8080
\`\`\`
Traffic is forwarded through the kernel across the bridge into the container interface.

#### 3. Crafting Production Distroless Multi-Stage Images
Large container images introduce high CVE surface areas and slow ECS deployment times.
Multi-stage Dockerfiles discard compilers and SDKs in the final layer:
\`\`\`dockerfile
# Stage 1: Build & Dependencies
FROM python:3.11-slim AS builder
WORKDIR /app
COPY requirements.txt .
RUN pip install --user --no-cache-dir -r requirements.txt

# Stage 2: Minimal Runtime
FROM gcr.io/distroless/python3-debian12
COPY --from=builder /root/.local /root/.local
COPY src/ /app
WORKDIR /app
ENV PATH=/root/.local/bin:$PATH
USER nonroot
CMD ["main.py"]
\`\`\`
This slashes container size from 1.2GB down to ~68MB and removes shell utilities that could facilitate privilege escalation.

#### Key Takeaway for Cloud Engineers
Minimize container image attack vectors. A smaller image deploys faster across ECS/EKS worker fleets and avoids cold-start latency spikes.`
  }
];

export const engineeringLogs = logsData;

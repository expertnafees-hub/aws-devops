# VPC, Subnets, and Network Architecture

## Subnet Tiers & CIDR Strategy

A production VPC must segregate workloads by blast radius and internet reachability into three distinct subnet tiers across a minimum of 2 Availability Zones:

```
VPC: 10.0.0.0/16
├── Tier 1: Public Web Subnets (ALBs, Bastion)
│   ├── az-a: 10.0.1.0/24 (Route to IGW)
│   └── az-b: 10.0.2.0/24 (Route to IGW)
├── Tier 2: Private Application Subnets (EC2, ECS, EKS)
│   ├── az-a: 10.0.10.0/24 (Route to NAT Gateway in AZ-A)
│   └── az-b: 10.0.11.0/24 (Route to NAT Gateway in AZ-B)
└── Tier 3: Isolated Database Subnets (RDS, ElastiCache)
    ├── az-a: 10.0.20.0/24 (Local VPC routing ONLY — NO NAT route)
    └── az-b: 10.0.21.0/24 (Local VPC routing ONLY — NO NAT route)
```

### Invariants:
1. **Isolated Database Subnets**: Database subnets must **never** have a route to an Internet Gateway or a NAT Gateway. Outbound internet access from the database tier is an architectural failure.
2. **Multi-AZ Parity**: Each tier must exist in at least two AZs to support ALB and RDS Multi-AZ subnet groups.

---

## NAT Gateway & Source Port Exhaustion

A single AWS NAT Gateway supports up to **55,000 concurrent connections** to a single destination IP and port tuple (e.g., calling an external third-party API or S3 without a VPC endpoint).

### The Failure Mode:
When microservices open thousands of short-lived TCP connections without connection pooling, the TCP ports remain in `TIME_WAIT` state for 120 seconds. The NAT Gateway exhausts available ephemeral ports (`Error: connect: cannot assign requested address`), causing silent connection drops and elevated p99 latency.

### Mitigations:
1. **HTTP Keep-Alive / Connection Pooling**: Reuse existing TCP connections at the application layer.
2. **VPC Gateway Endpoints**: Route all S3 and DynamoDB traffic directly through free VPC Gateway Endpoints instead of pumping terabytes through the NAT Gateway.
3. **Secondary Private IPs**: Associate secondary private IP addresses with the NAT Gateway to scale port allocation beyond 55,000 per destination.

---

## Security Groups vs. Network ACLs

| Dimension | Security Groups (SG) | Network ACLs (NACL) |
|---|---|---|
| **Scope** | Elastic Network Interface (ENI) level | Subnet boundary level |
| **Statefulness** | **Stateful**: Return traffic automatically allowed | **Stateless**: Inbound and outbound must be explicitly allowed |
| **Rule Evaluation** | All rules evaluated simultaneously | Evaluated in numerical order (lowest number first) |
| **Action** | `Allow` only (implicit deny) | Explicit `Allow` and `Deny` rules |

### Best Practice: Chained Security Groups
Never open inter-tier communication via subnet CIDRs (`10.0.10.0/24`). Always chain Security Groups using `source_security_group_id`:

```hcl
resource "aws_security_group_rule" "db_from_app" {
  type                     = "ingress"
  from_port                = 3306
  to_port                  = 3306
  protocol                 = "tcp"
  source_security_group_id = aws_security_group.app.id
  security_group_id        = aws_security_group.db.id
}
```

---

## VPC Endpoint Strategy (Cost & Security)

1. **Gateway Endpoints (S3 & DynamoDB)**:
   - **Cost**: $0.00 / month (Free).
   - **Impact**: Bypasses the NAT Gateway entirely ($0.045/GB NAT processing fee avoided) and keeps S3/DynamoDB traffic on AWS internal fiber.
2. **Interface Endpoints (PrivateLink)**:
   - Use for: ECR (`api` and `dkr`), Secrets Manager, SSM, and CloudWatch.
   - Restrict endpoint policies to only allow principals from the local AWS Organization (`aws:PrincipalOrgID`).

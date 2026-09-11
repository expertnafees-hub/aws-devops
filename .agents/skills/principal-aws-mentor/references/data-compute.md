# Data and compute

## IMDSv2

```hcl
metadata_options {
  http_endpoint               = "enabled"
  http_tokens                 = "required"   # IMDSv2 only
  http_put_response_hop_limit = 1            # 2 for bridge-networked containers
  instance_metadata_tags      = "enabled"
}
```

IMDSv1 is a plain GET to `169.254.169.254`. Any server-side request forgery in your
application — an image fetcher, a webhook validator, a PDF renderer following a URL —
can be pointed at the metadata endpoint and returns your instance role's temporary
credentials. That is the Capital One breach shape.

IMDSv2 requires a `PUT` to obtain a session token first, with `X-aws-ec2-metadata-token-ttl-seconds`.
Most SSRF primitives can only issue GETs, and the hop limit of 1 means a response cannot
be relayed back out through a proxy or container network. Set both — `http_tokens` alone
with a hop limit of 3 still leaks through some container topologies.

Set it on the **launch template**, not on individual instances, or your ASG replacements
come back with the default.

## RDS Multi-AZ — the actual failure mode

Multi-AZ (instance deployment) is a synchronous standby in a second AZ with a single
writer. **Split-brain is not the failure mode** — there is never a second writable
endpoint; the standby is not readable. Do not describe it that way.

What actually bites:

- **Failover takes ~60–120 seconds.** It is a DNS change on the endpoint CNAME.
- **Stale connection pools.** Existing TCP sessions to the old primary are dead but the
  pool does not know. JVM applications with `networkaddress.cache.ttl = -1` cache the old
  IP for the process lifetime and never recover without a restart. Set a finite DNS TTL
  and configure pool validation queries.
- **Cross-AZ data transfer cost** on synchronous replication, charged per GB.
- Multi-AZ **DB cluster** deployment is different: two readable standbys, quorum-based
  commit, faster failover. Different product, different price. Don't conflate them.

Test failover with `aws rds failover-db-instance` — **printed for a human to run against
a non-production instance**, never executed by the agent.

## Encryption

- S3: `aws_s3_bucket_server_side_encryption_configuration` with `aws:kms` and a CMK;
  plus a bucket policy denying `s3:*` when `aws:SecureTransport = false`.
- EBS: enable account-level default EBS encryption (`aws_ebs_encryption_by_default`) so
  a missed `encrypted = true` cannot create a plaintext volume.
- RDS: `storage_encrypted = true` — **cannot be changed after creation**. Getting this
  wrong means a snapshot-restore migration, not an in-place fix.
- In transit: `rds.force_ssl = 1` in the parameter group for Postgres, `require_secure_transport`
  for MySQL. TLS available is not TLS enforced.

## AMIs — pin, don't float

```hcl
variable "app_ami_id" {
  description = "Baked AMI from packer pipeline. Bump via PR; see docs/ami-promotion.md"
  type        = string
  default     = "ami-0abcd1234ef567890"
}
```

A pinned AMI ID is immutable infrastructure done correctly. The antipattern is:

```hcl
data "aws_ami" "app" {
  most_recent = true          # BLOCK in any non-lab environment
  owners      = ["amazon"]
}
```

This makes `terraform plan` non-deterministic — the same code produces a different plan
tomorrow. Combined with an ASG launch template, a routine `apply` for an unrelated tag
change can trigger a full instance refresh across your fleet. The AMI version is a
deployment decision and belongs in a reviewed commit.

## ASG safety

`instance_refresh` with `min_healthy_percentage = 90`, a warm-up period longer than your
application's actual readiness time, and ELB health checks (not EC2 status checks — those
pass while your app is 500ing). `create_before_destroy` on the launch template.

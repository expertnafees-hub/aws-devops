# IAM

## The `Resource: "*"` allowlist

A blanket ban produces invalid policies, because a large set of actions do not support
resource-level permissions. For these, `Resource: "*"` is the **only** valid form — and
the scoping moves into `Condition`.

Common non-scopable actions:

```
ec2:Describe*            ec2:CreateTags (partially)
s3:ListAllMyBuckets      s3:GetBucketLocation
cloudwatch:PutMetricData cloudwatch:ListMetrics
logs:DescribeLogGroups   sts:GetCallerIdentity
iam:ListRoles            kms:ListAliases
elasticloadbalancing:Describe*
autoscaling:Describe*    ecs:ListClusters
```

Authoritative list: IAM Service Authorization Reference, per-service "Actions" table —
the resource-types column is empty for these. Check there before asserting a ban.

Correct shape:

```hcl
statement {
  effect    = "Allow"
  actions   = ["ec2:DescribeInstances", "ec2:DescribeVolumes"]
  resources = ["*"]

  condition {
    test     = "StringEquals"
    variable = "aws:RequestedRegion"
    values   = ["eu-west-1"]
  }
}
```

For scopable actions, always explicit ARNs. Tag-based scoping via
`aws:ResourceTag/Environment` is acceptable and often better than ARN lists that rot.

## CI must not hold long-lived keys

`aws_iam_access_key` in a CI system is the single most common real-world AWS compromise
path: the secret is exfiltrated once and works forever, from anywhere, with no expiry.
Use OIDC federation.

```hcl
resource "aws_iam_openid_connect_provider" "github" {
  url             = "https://token.actions.githubusercontent.com"
  client_id_list  = ["sts.amazonaws.com"]
  thumbprint_list = [var.github_oidc_thumbprint]
}

data "aws_iam_policy_document" "trust" {
  statement {
    effect  = "Allow"
    actions = ["sts:AssumeRoleWithWebIdentity"]

    principals {
      type        = "Federated"
      identifiers = [aws_iam_openid_connect_provider.github.arn]
    }

    condition {
      test     = "StringEquals"
      variable = "token.actions.githubusercontent.com:aud"
      values   = ["sts.amazonaws.com"]
    }

    # Pin the subject. A wildcard here lets ANY repo in the org assume this role.
    condition {
      test     = "StringEquals"
      variable = "token.actions.githubusercontent.com:sub"
      values   = ["repo:acme/platform:ref:refs/heads/main"]
    }
  }
}
```

The `sub` condition is the whole security boundary. `repo:acme/*` is a BLOCK — a fork or
a new repo in the org inherits production deploy rights.

## Permission boundaries

Least privilege on the *policy* is not least privilege on the *principal*. A role that can
call `iam:CreateRole` and `iam:AttachRolePolicy` can mint itself an admin — privilege
escalation without ever touching an admin policy. Attach a permission boundary to every
role that has any `iam:*` write action, and deny `iam:DeleteRolePermissionsBoundary`.

## Verify, don't assert

```bash
aws iam simulate-principal-policy \
  --policy-source-arn arn:aws:iam::111122223333:role/app-task \
  --action-names s3:GetObject s3:DeleteObject \
  --resource-arns arn:aws:s3:::acme-uploads/tenant-a/file.txt
```

This is read-only and is the only honest way to claim a policy is scoped correctly.
"I wrote least-privilege IAM" without a simulate run is an assertion, not a result.

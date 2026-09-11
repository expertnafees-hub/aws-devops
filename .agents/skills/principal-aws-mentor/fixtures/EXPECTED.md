# Eval set

`scripts/run-eval.sh` scores the gate on two axes. Both must be perfect.

| Axis | Fixture | Target |
|---|---|---|
| Recall | `fixtures/bad/` | all 11 rule IDs fire |
| Precision | `fixtures/good/` | zero findings |

## Seeded violations in `fixtures/bad/main.tf`

| ID | Seeded pattern |
|---|---|
| B1 | `Action = "*"` in an inline role policy |
| B2 | `Resource = "*"` with no `Condition` |
| B3 | Ingress `0.0.0.0/0` on 22 and on 5432 |
| B4 | `aws_iam_access_key` for CI |
| B5 | `AKIA...` literal + `password = "SuperSecret123"` |
| B6 | `data "aws_ami" { most_recent = true }` |
| B7 | S3 backend with no `encrypt`, no `kms_key_id`, no locking |
| B8 | `aws_db_instance` unencrypted, `aws_ebs_volume` unencrypted |
| B9 | `aws_instance` with no `metadata_options` |
| B10 | `aws_instance` with no VPC or subnet anywhere in the tree |
| B11 | `terraform {}` block with no `required_version` |

## Decoys in `fixtures/good/main.tf`

These look like violations and are not. If any of them fires, the skill is
over-triggering and you will stop trusting it inside a week.

- `0.0.0.0/0` ingress on **443** for a public ALB
- `0.0.0.0/0` **egress** on an app SG
- `Resource = "*"` for `ec2:DescribeInstances` **with** an `aws:RequestedRegion` condition
- A hardcoded, pinned `ami-...` ID
- Hardcoded KMS key and account ARNs

## Current score

```
caught:          11 / 11
missed:          none
false positives: 0
RESULT: PASS
```

Re-run after every edit to `SKILL.md` or `scripts/gate.sh`.

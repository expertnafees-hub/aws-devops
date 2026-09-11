# Corrected regeneration prompt

Use this if you want to regenerate or extend the skill with another model. It fixes the
seven structural bugs in the original: no conflicting terminal instruction, a
trigger-shaped `description`, enforcement delegated to a script, severity tiers, an
override path, a false-positive guard list, and a required eval.

Run it as **one** prompt. Do not append "and also critique this" — that is a separate pass.

---

Write a `SKILL.md` and its supporting files for an agentic coding IDE. The skill makes the
agent act as a Staff-level AWS platform engineer reviewing a colleague's Terraform.

Hard requirements:

1. `description` in the frontmatter must be a **trigger** the loader can match on — list
   the concrete nouns the agent will encounter (Terraform, IAM policy, VPC, subnet,
   security group, S3, RDS, EBS, EC2, launch template, backend, state, CI/CD to AWS) plus
   the phrases that signal a shortcut ("just for testing", "disable the check",
   "hardcode it"). It is not a persona statement.
2. Enforcement is a script, not prose. `SKILL.md` instructs the agent to run
   `scripts/gate.sh` and treat non-zero exit as "not done". Ship the script.
3. Two modes: verbose teaching in PLAN mode, one-line `BLOCK:` in EXECUTE mode. Never
   print a directory tree or runbook mid-agentic-loop.
4. Three severities: BLOCK / WARN / NOTE. Include an explicit clause: if the request is
   already correct, say so in one line and proceed.
5. Every mechanism claim must carry a checkable reference (AWS doc, Terraform argument
   name, man page). If the mechanism is uncertain, say so rather than inventing one.
6. Include an explicit **false-positive guard list** of correct-looking-suspicious
   patterns that must NOT be flagged: 0.0.0.0/0 on 443 for a public ALB, 0.0.0.0/0 egress,
   `Resource: "*"` for non-scopable actions when a Condition narrows it, pinned AMI IDs,
   hop limit 2 on containers.
7. Correct these facts, which most sources get wrong:
   - Pinned AMI IDs are **correct**; `most_recent = true` is the antipattern.
   - S3 backends use native locking (`use_lockfile = true`); DynamoDB is legacy.
   - RDS Multi-AZ instance deployment has a single writer — split-brain is impossible;
     the real risks are ~60–120s failover, stale connection pools, cross-AZ transfer cost.
   - IMDSv2 is the token-based one; the control is `http_tokens = "required"` plus
     `http_put_response_hop_limit = 1`.
   - Directory-per-environment, not Terraform workspaces.
   - Secrets land in state in plaintext regardless of Secrets Manager; KMS-encrypted
     state plus a restricted `s3:GetObject` is the mitigation.
   - Long-lived CI access keys are banned; use OIDC `sts:AssumeRoleWithWebIdentity` with
     the `sub` condition pinned to a single repo and ref.
8. Absolute rule: the agent never executes mutating or destructive AWS CLI or Terraform
   commands. Read-only verification only. Destructive tests are printed for a human with
   a blast-radius header.
9. An override annotation the user can place in-file, requiring both a reason and an
   expiry, or the block stands.
10. Keep `SKILL.md` under 120 lines. Move deep explanations into `references/*.md` loaded
    on demand.
11. Ship `fixtures/bad/` with one seeded violation per rule and `fixtures/good/` full of
    correct-looking-suspicious decoys, plus `scripts/run-eval.sh` that reports catch rate
    and false-positive count. The skill is not done until it scores full recall and zero
    false positives.

Output the files only.

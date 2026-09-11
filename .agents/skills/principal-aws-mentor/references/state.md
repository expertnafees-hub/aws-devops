# State, backends, and secrets

## Correct backend (Terraform >= 1.11 / current OpenTofu)

```hcl
terraform {
  required_version = "~> 1.11"

  backend "s3" {
    bucket       = "acme-tfstate-prod-euw1"
    key          = "platform/network/terraform.tfstate"
    region       = "eu-west-1"
    encrypt      = true
    kms_key_id   = "arn:aws:kms:eu-west-1:111122223333:key/abcd-..."
    use_lockfile = true          # S3 conditional-write locking
  }
}
```

`use_lockfile = true` replaces the DynamoDB lock table. It uses S3 conditional writes
(`If-None-Match`) to create a `.tflock` object next to the state. Only reach for
`dynamodb_table` if you are pinned below the version that made this GA — and if you do,
the table needs `LockID` as the hash key and PITR enabled.

Bucket requirements: versioning on (your only state rollback), `aws:SecureTransport = false`
deny in the bucket policy, public access block on, and object lock if you have a
compliance story.

## One state per layer, one directory per environment

```
envs/
  prod/network/    prod/data/    prod/app/
  stage/network/   stage/data/   stage/app/
  lab/...
modules/
  vpc/  rds/  ecs-service/  iam-oidc-role/
```

Not workspaces. Workspaces share a backend block, a provider block, and a credential
path — `terraform workspace select prod` is one keystroke away from applying stage code
to prod. Separate directories give you separate state files, separate role assumptions,
and a diff you can read.

Layer separation matters for blast radius: a bad `app` apply cannot corrupt `network`
state, and `network` outputs are consumed read-only via `terraform_remote_state` or,
better, SSM parameters.

## Secrets are in your state whether you like it or not

`aws_db_instance.password`, `aws_secretsmanager_secret_version.secret_string`, and
generated private keys are all written to state **in plaintext**. "Use Secrets Manager"
does not solve this on its own. What actually mitigates it:

1. `encrypt = true` + a customer-managed KMS key — SSE-KMS on the state object.
2. `s3:GetObject` on the state prefix granted only to the pipeline role and break-glass.
3. KMS key policy denying `kms:Decrypt` to everyone except that role.
4. Prefer `manage_master_user_password = true` on RDS, which hands rotation to
   Secrets Manager and keeps the password out of state entirely.
5. OpenTofu users: native state encryption is available and worth turning on.

## Plan/apply split

```bash
terraform plan -lock-timeout=120s -out=tfplan
# human or CI approval gate here
terraform apply tfplan
```

Applying without a saved plan re-plans at apply time. Between your review and the apply,
someone else's change, a `most_recent` AMI, or a provider bump can alter what actually
executes. The saved plan is the contract.

## Race conditions

Lock contention is not the dangerous case — that fails loudly. The dangerous case is
`-lock=false`, which people add to "unblock" a stuck pipeline. Two concurrent applies
each read state, each compute a diff against a world the other is mutating, and the
second write wins. Result: resources tracked in state that no longer exist, and live
resources tracked nowhere. Recovery is `terraform import` by hand, per resource.

If a lock is genuinely stale, `terraform force-unlock <LOCK_ID>` after confirming no
apply is running — never `-lock=false`.

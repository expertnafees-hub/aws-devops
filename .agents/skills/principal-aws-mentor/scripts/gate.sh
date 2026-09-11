#!/usr/bin/env bash
# gate.sh — deterministic enforcement for principal-aws-mentor.
# The SKILL.md is advisory; this file is the actual control.
# Exit 0 = clean. Exit 1 = BLOCK findings present. Exit 2 = tooling error.

set -uo pipefail

TARGET="${1:-.}"
FINDINGS=0
declare -a HITS=()

# Colour only when attached to a terminal, so piped output stays greppable.
if [ -t 1 ]; then R=$'\033[31m'; Y=$'\033[33m'; G=$'\033[32m'; N=$'\033[0m'; else R=""; Y=""; G=""; N=""; fi
c_red()  { printf '%s%s%s\n' "$R" "$*" "$N"; }
c_ylw()  { printf '%s%s%s\n' "$Y" "$*" "$N"; }
c_grn()  { printf '%s%s%s\n' "$G" "$*" "$N"; }

# Collect .tf files portably across Bash 3.2 (macOS) and Bash 4/5 (Linux), honoring inline overrides.
TF_FILES=()
while IFS= read -r file_path; do
  [ -n "$file_path" ] && TF_FILES+=("$file_path")
done < <(find "$TARGET" -type f -name '*.tf' -not -path '*/.terraform/*' | sort)

if [ ${#TF_FILES[@]} -eq 0 ]; then
  c_ylw "No .tf files under $TARGET"; exit 0
fi

# An override must carry both reason= and expires= to be valid (SKILL.md §7).
overridden() {
  local id="$1" file="$2"
  grep -qE "#[[:space:]]*mentor:allow[[:space:]]+${id}\b.*reason=.*expires=" "$file"
}

report() {
  local id="$1" file="$2" msg="$3"
  overridden "$id" "$file" && { c_ylw "OVERRIDE  $id  $file"; return; }
  c_red "BLOCK  $id  $file  — $msg"
  HITS+=("$id")
  FINDINGS=$((FINDINGS+1))
}

echo "=== custom rules (B1–B11) ==="

for f in "${TF_FILES[@]}"; do
  # Strip comments so commented-out examples don't trip rules.
  BODY="$(sed -E 's/(^|[^:])#.*$/\1/' "$f")"

  # B1 — wildcard action
  grep -qE '"?(Action|actions)"?[[:space:]]*[:=][[:space:]]*\[?[[:space:]]*"\*"' <<<"$BODY" \
    && report B1 "$f" 'wildcard Action "*"'

  # B2 — Resource "*" with no Condition anywhere in the file
  if grep -qE '(Resource|resources)"?[[:space:]]*[:=][[:space:]]*\[?[[:space:]]*"\*"' <<<"$BODY"; then
    grep -qiE '(condition|"Condition")' <<<"$BODY" \
      || report B2 "$f" 'Resource "*" without any Condition scoping'
  fi

  # B3 — open ingress on management/data ports
  if awk '
    /ingress[[:space:]]*\{/ {inb=1; port=""; open=0}
    inb && /from_port/ {match($0,/[0-9]+/); port=substr($0,RSTART,RLENGTH)}
    inb && /0\.0\.0\.0\/0/ {open=1}
    inb && /\}/ {
      if (open==1 && (port=="22"||port=="3389"||port=="3306"||port=="5432"||port=="6379"||port=="27017"||port=="9200")) {found=1}
      inb=0
    }
    END {exit !found}' <<<"$BODY"; then
    report B3 "$f" 'ingress 0.0.0.0/0 on a management or data port'
  fi

  # B4 — long-lived IAM access keys
  grep -qE 'resource[[:space:]]+"aws_iam_access_key"' <<<"$BODY" \
    && report B4 "$f" 'long-lived IAM access key — use OIDC AssumeRoleWithWebIdentity'

  # B4b — wildcard OIDC subject
  grep -qE '"repo:[^"]*\*' <<<"$BODY" \
    && report B4 "$f" 'OIDC sub condition contains a wildcard repo/ref'

  # B5 — plaintext secrets
  grep -qiE '^[[:space:]]*(password|secret_key|secret|api_key|token)[[:space:]]*=[[:space:]]*"[^"$]{6,}"' <<<"$BODY" \
    && report B5 "$f" 'hardcoded secret literal'
  grep -qE 'AKIA[0-9A-Z]{16}' <<<"$BODY" \
    && report B5 "$f" 'AWS access key ID literal'

  # B6 — floating AMI
  grep -qE 'most_recent[[:space:]]*=[[:space:]]*true' <<<"$BODY" \
    && report B6 "$f" 'most_recent AMI lookup — non-deterministic plan; pin the AMI ID'

  # B7 — backend hygiene
  if grep -qE 'backend[[:space:]]+"s3"' <<<"$BODY"; then
    grep -qE 'encrypt[[:space:]]*=[[:space:]]*true'   <<<"$BODY" || report B7 "$f" 'S3 backend without encrypt = true'
    grep -qE 'kms_key_id'                              <<<"$BODY" || report B7 "$f" 'S3 backend without kms_key_id'
    grep -qE '(use_lockfile|dynamodb_table)'           <<<"$BODY" || report B7 "$f" 'S3 backend without state locking'
  fi

  # B8 — encryption at rest
  grep -qE 'resource[[:space:]]+"aws_db_instance"' <<<"$BODY" \
    && ! grep -qE 'storage_encrypted[[:space:]]*=[[:space:]]*true' <<<"$BODY" \
    && report B8 "$f" 'aws_db_instance without storage_encrypted = true'
  grep -qE 'resource[[:space:]]+"aws_ebs_volume"' <<<"$BODY" \
    && ! grep -qE 'encrypted[[:space:]]*=[[:space:]]*true' <<<"$BODY" \
    && report B8 "$f" 'aws_ebs_volume without encrypted = true'

  # B9 — IMDSv2
  if grep -qE 'resource[[:space:]]+"aws_(instance|launch_template)"' <<<"$BODY"; then
    grep -qE 'http_tokens[[:space:]]*=[[:space:]]*"required"' <<<"$BODY" \
      || report B9 "$f" 'instance/launch template without http_tokens = "required"'
  fi

  # B11 — version pinning
  if grep -qE '^terraform[[:space:]]*\{' <<<"$BODY"; then
    grep -qE 'required_version' <<<"$BODY" || report B11 "$f" 'terraform block without required_version'
  fi
done

# B10 — sequence: compute/app resources with no network resources anywhere in tree
if [ ${#TF_FILES[@]} -gt 0 ]; then
  if grep -rqE 'resource[[:space:]]+"aws_(instance|ecs_service|eks_node_group|lb)"' "${TF_FILES[@]}" 2>/dev/null; then
    grep -rqE 'resource[[:space:]]+"aws_(vpc|subnet)"|module[[:space:]]+"vpc"|data[[:space:]]+"aws_vpc"' "${TF_FILES[@]}" 2>/dev/null \
      || { c_red "BLOCK  B10  $TARGET  — compute/app resources with no VPC or subnet in scope"; HITS+=("B10"); FINDINGS=$((FINDINGS+1)); }
  fi
fi

echo
echo "=== external scanners (skipped if not installed) ==="
run_if() { command -v "$1" >/dev/null 2>&1 && { echo "-- $1"; shift; "$@"; } || echo "-- ${1} not installed, skipped"; }

run_if terraform  terraform -chdir="$TARGET" fmt -check -recursive
run_if tflint     tflint --chdir="$TARGET" --minimum-failure-severity=warning
run_if checkov    checkov -d "$TARGET" --compact --quiet --framework terraform
run_if trivy      trivy config "$TARGET" --exit-code 0

echo
if [ "$FINDINGS" -gt 0 ]; then
  c_red "GATE FAILED — $FINDINGS BLOCK finding(s): ${HITS[*]}"
  exit 1
fi
c_grn "GATE PASSED"
exit 0

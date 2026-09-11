# principal-aws-mentor

An Antigravity skill that reviews AWS infrastructure like a Staff engineer, backed by a
deterministic gate so the review is not just vibes.

```
SKILL.md                  # the router the agent loads — under 120 lines
references/
  state.md                # backends, S3 native locking, secrets-in-state, plan artifacts
  iam.md                  # non-scopable action allowlist, OIDC for CI, boundaries
  network.md              # subnet tiers, NAT port exhaustion, SG vs NACL
  data-compute.md         # encryption, RDS Multi-AZ reality, IMDSv2, AMI pinning
scripts/
  gate.sh                 # B1–B11 rules + tflint/checkov/trivy/conftest if installed
  run-eval.sh             # scores recall and false positives
fixtures/
  bad/main.tf             # 11 seeded violations
  good/main.tf            # decoys that must NOT fire
  EXPECTED.md             # the scoring contract
.pre-commit-config.yaml   # same gate, at commit time
```

## Install

Drop the folder into your Antigravity skills directory (verify the exact path against
your Antigravity build — it changed between releases), then:

```bash
chmod +x scripts/*.sh
./scripts/run-eval.sh          # must print RESULT: PASS before you trust it
pre-commit install             # optional but this is where enforcement actually lives
```

## Use

```bash
./scripts/gate.sh envs/prod/network
```

Exit 1 means findings. The rule IDs printed map to the table in `SKILL.md` §4.

## Extending

Add a rule → add a seeded violation to `fixtures/bad/main.tf` → add a decoy to
`fixtures/good/main.tf` if the rule could over-trigger → re-run `run-eval.sh`.
A rule with no fixture is a rule you cannot trust.

## Known limits

- `gate.sh` is regex/awk over HCL source. It does not parse the graph, so it will miss
  violations expressed through variables, `for_each`, or module inputs. Run `checkov`
  and `tflint` against `terraform plan -out` JSON for the real analysis; this script is
  the fast pre-flight.
- The skill cannot make the model honest. It can only make the model's claims checkable
  (§3 requires a citation per mechanism) and make the violations machine-detectable.

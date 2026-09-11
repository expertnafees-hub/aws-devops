#!/usr/bin/env bash
# run-eval.sh — proves the skill actually catches things.
# Run this after ANY edit to SKILL.md or gate.sh. A skill without an eval is a vibe.

set -uo pipefail
HERE="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
EXPECTED=(B1 B2 B3 B4 B5 B6 B7 B8 B9 B10 B11)

echo "### 1. Recall — fixtures/bad (expect all of: ${EXPECTED[*]})"
BAD_OUT="$(bash "$HERE/scripts/gate.sh" "$HERE/fixtures/bad" 2>&1)"
echo "$BAD_OUT" | grep -E '^(BLOCK|OVERRIDE)' || true

MISSED=()
for id in "${EXPECTED[@]}"; do
  grep -qE "BLOCK[[:space:]]+${id}\b" <<<"$BAD_OUT" || MISSED+=("$id")
done

echo
echo "### 2. Precision — fixtures/good (expect zero findings)"
GOOD_OUT="$(bash "$HERE/scripts/gate.sh" "$HERE/fixtures/good" 2>&1)"
FP=$(grep -cE '^BLOCK' <<<"$GOOD_OUT" || true)
grep -E '^BLOCK' <<<"$GOOD_OUT" || echo "(none)"

echo
echo "### Score"
echo "caught:          $(( ${#EXPECTED[@]} - ${#MISSED[@]} )) / ${#EXPECTED[@]}"
echo "missed:          ${MISSED[*]:-none}"
echo "false positives: $FP"

if [ ${#MISSED[@]} -eq 0 ] && [ "$FP" -eq 0 ]; then
  echo "RESULT: PASS"; exit 0
fi
echo "RESULT: FAIL"; exit 1

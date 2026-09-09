#!/usr/bin/env bash
set -euo pipefail

# -----------------------------------------------------------------------------
# 1-Command AWS Portfolio Bootstrap Script
# -----------------------------------------------------------------------------
STACK_NAME="${1:-nafees-portfolio}"
REGION="us-east-1"
REPO="expertnafees-hub/aws-devops"
ENABLE_WAF="${2:-true}"

echo "========================================================"
echo " Deploying AWS Infrastructure for Nafees Portfolio"
echo " Target Repository: ${REPO}"
echo " AWS Region:        ${REGION}"
echo " Stack Name:        ${STACK_NAME}"
echo " Enable WAF:        ${ENABLE_WAF}"
echo "========================================================"

aws cloudformation deploy \
  --template-file "$(dirname "$0")/cloudformation-bootstrap.yaml" \
  --stack-name "$STACK_NAME" \
  --region "$REGION" \
  --parameter-overrides GitHubRepo="$REPO" EnableWAF="$ENABLE_WAF" \
  --capabilities CAPABILITY_NAMED_IAM

echo ""
echo "========================================================"
echo " Infrastructure provisioned successfully!"
echo " Copy these 3 values into your GitHub Repository Secrets:"
echo " (Settings -> Secrets and variables -> Actions)"
echo "========================================================"

aws cloudformation describe-stacks \
  --stack-name "$STACK_NAME" \
  --region "$REGION" \
  --query "Stacks[0].Outputs[*].[OutputKey,OutputValue]" \
  --output table

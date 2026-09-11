# FIXTURE: intentionally correct. Expected findings: NONE.
# This file exists to catch false positives — the failure mode that makes a
# strict skill unusable. Every pattern here looks suspicious and is not.

terraform {
  required_version = "~> 1.11"

  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.70"
    }
  }

  backend "s3" {
    bucket       = "acme-tfstate-prod-euw1"
    key          = "platform/app/terraform.tfstate"
    region       = "eu-west-1"
    encrypt      = true
    kms_key_id   = "arn:aws:kms:eu-west-1:111122223333:key/1a2b3c4d-0000-0000-0000-abcdefabcdef"
    use_lockfile = true
  }
}

resource "aws_vpc" "main" {
  cidr_block           = "10.40.0.0/16"
  enable_dns_hostnames = true
}

resource "aws_subnet" "private_app" {
  vpc_id            = aws_vpc.main.id
  cidr_block        = "10.40.16.0/20"
  availability_zone = "eu-west-1a"
}

# 0.0.0.0/0 on 443 for a public ALB is correct, not a finding.
resource "aws_security_group" "alb" {
  name   = "alb-public"
  vpc_id = aws_vpc.main.id

  ingress {
    from_port   = 443
    to_port     = 443
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }
}

# Resource "*" is the only valid form for Describe actions; scoping moves to Condition.
data "aws_iam_policy_document" "readonly" {
  statement {
    effect    = "Allow"
    actions   = ["ec2:DescribeInstances", "cloudwatch:PutMetricData"]
    resources = ["*"]

    condition {
      test     = "StringEquals"
      variable = "aws:RequestedRegion"
      values   = ["eu-west-1"]
    }
  }
}

# A pinned AMI ID is immutable infrastructure, not a magic number.
variable "app_ami_id" {
  type    = string
  default = "ami-0abcd1234ef567890"
}

resource "aws_launch_template" "app" {
  name_prefix   = "app-"
  image_id      = var.app_ami_id
  instance_type = "m6i.large"

  metadata_options {
    http_endpoint               = "enabled"
    http_tokens                 = "required"
    http_put_response_hop_limit = 1
  }
}

resource "aws_db_instance" "main" {
  identifier                  = "prod-db"
  engine                      = "postgres"
  instance_class              = "db.m6g.large"
  username                    = "app"
  manage_master_user_password = true
  storage_encrypted           = true
  kms_key_id                  = "arn:aws:kms:eu-west-1:111122223333:key/1a2b3c4d-0000-0000-0000-abcdefabcdef"
  multi_az                    = true
}

resource "aws_ebs_volume" "data" {
  availability_zone = "eu-west-1a"
  size              = 100
  encrypted         = true
}

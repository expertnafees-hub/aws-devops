# FIXTURE: intentionally broken. Do not copy. Every line here is a seeded violation.
# Expected findings: B1 B2 B3 B4 B5 B6 B7 B8 B9 B10 B11

terraform {
  backend "s3" {
    bucket = "my-tfstate"
    key    = "prod/terraform.tfstate"
    region = "us-east-1"
  }
}

provider "aws" {
  region     = "us-east-1"
  access_key = "AKIAIOSFODNN7EXAMPLE"
  secret_key = "wJalrXUtnFEMIbKxxxxxxxxxxxxxxxxxxxxxxxxx"
}

resource "aws_iam_access_key" "ci" {
  user = "ci-deployer"
}

resource "aws_iam_role_policy" "app" {
  name = "app-policy"
  role = "app-role"

  policy = jsonencode({
    Version = "2012-10-17"
    Statement = [{
      Effect   = "Allow"
      Action   = "*"
      Resource = "*"
    }]
  })
}

resource "aws_security_group" "web" {
  name = "web-sg"

  ingress {
    from_port   = 22
    to_port     = 22
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  ingress {
    from_port   = 5432
    to_port     = 5432
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }
}

data "aws_ami" "app" {
  most_recent = true
  owners      = ["amazon"]
}

resource "aws_instance" "app" {
  ami           = data.aws_ami.app.id
  instance_type = "t3.medium"
}

resource "aws_db_instance" "main" {
  identifier     = "prod-db"
  engine         = "postgres"
  instance_class = "db.t3.medium"
  username       = "admin"
  password       = "SuperSecret123"
}

resource "aws_ebs_volume" "data" {
  availability_zone = "us-east-1a"
  size              = 100
}

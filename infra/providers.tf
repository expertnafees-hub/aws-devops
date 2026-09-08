terraform {
  required_version = ">= 1.8.0"

  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.50"
    }
  }

  # Example remote S3 backend configuration (uncomment for remote state)
  # backend "s3" {
  #   bucket         = "nafees-portfolio-tfstate-useast1"
  #   key            = "prod/portfolio/terraform.tfstate"
  #   region         = "us-east-1"
  #   dynamodb_table = "terraform-lock-table"
  #   encrypt        = true
  # }
}

provider "aws" {
  region = var.aws_region

  default_tags {
    tags = {
      Project     = "Nafees-DevOps-Portfolio"
      Environment = var.environment
      ManagedBy   = "Terraform"
      Owner       = "Nafees Ur Rehman"
    }
  }
}

# ACM certificates for CloudFront distributions MUST be in us-east-1
provider "aws" {
  alias  = "acm_provider"
  region = "us-east-1"

  default_tags {
    tags = {
      Project     = "Nafees-DevOps-Portfolio"
      Environment = var.environment
      ManagedBy   = "Terraform"
    }
  }
}

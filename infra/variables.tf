variable "aws_region" {
  description = "AWS Primary Region for deploying S3 storage and resources"
  type        = string
  default     = "us-east-1"
}

variable "environment" {
  description = "Deployment target environment name"
  type        = string
  default     = "production"
}

variable "domain_name" {
  description = "Primary root custom domain name (e.g., nafees.cloud)"
  type        = string
  default     = "nafees.cloud"
}

variable "create_route53_records" {
  description = "Flag whether to manage Route 53 zone and DNS aliases"
  type        = bool
  default     = true
}

variable "price_class" {
  description = "CloudFront price class (PriceClass_100, PriceClass_200, PriceClass_All)"
  type        = string
  default     = "PriceClass_100"
}

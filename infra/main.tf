# -----------------------------------------------------------------------------
# LOGS BUCKET: Access logs for CloudFront and S3
# -----------------------------------------------------------------------------
resource "aws_s3_bucket" "logs" {
  bucket        = "${replace(var.domain_name, ".", "-")}-cf-access-logs"
  force_destroy = false
}

resource "aws_s3_bucket_ownership_controls" "logs" {
  bucket = aws_s3_bucket.logs.id
  rule {
    object_ownership = "BucketOwnerPreferred"
  }
}

resource "aws_s3_bucket_acl" "logs" {
  depends_on = [aws_s3_bucket_ownership_controls.logs]
  bucket     = aws_s3_bucket.logs.id
  acl        = "log-delivery-write"
}

resource "aws_s3_bucket_server_side_encryption_configuration" "logs" {
  bucket = aws_s3_bucket.logs.id
  rule {
    apply_server_side_encryption_by_default {
      sse_algorithm = "AES256"
    }
  }
}

resource "aws_s3_bucket_public_access_block" "logs" {
  bucket                  = aws_s3_bucket.logs.id
  block_public_acls       = true
  block_public_policy     = true
  ignore_public_acls      = true
  restrict_public_buckets = true
}

# -----------------------------------------------------------------------------
# SOURCE BUCKET: Private SPA Website Artifacts
# -----------------------------------------------------------------------------
resource "aws_s3_bucket" "website" {
  bucket        = "${replace(var.domain_name, ".", "-")}-spa-origin"
  force_destroy = false
}

resource "aws_s3_bucket_versioning" "website" {
  bucket = aws_s3_bucket.website.id
  versioning_configuration {
    status = "Enabled"
  }
}

resource "aws_s3_bucket_server_side_encryption_configuration" "website" {
  bucket = aws_s3_bucket.website.id
  rule {
    apply_server_side_encryption_by_default {
      sse_algorithm = "AES256"
    }
  }
}

# Strict Block Public Access - CloudFront OAC will be the ONLY authorized accessor
resource "aws_s3_bucket_public_access_block" "website" {
  bucket                  = aws_s3_bucket.website.id
  block_public_acls       = true
  block_public_policy     = true
  ignore_public_acls      = true
  restrict_public_buckets = true
}

# -----------------------------------------------------------------------------
# CLOUDFRONT ORIGIN ACCESS CONTROL (OAC)
# -----------------------------------------------------------------------------
resource "aws_cloudfront_origin_access_control" "oac" {
  name                              = "${var.domain_name}-oac"
  description                       = "Origin Access Control for private S3 website hosting"
  origin_access_control_origin_type = "s3"
  signing_behavior                  = "always"
  signing_protocol                  = "sigv4"
}

# -----------------------------------------------------------------------------
# S3 BUCKET POLICY (OAC-ONLY INGRESS)
# -----------------------------------------------------------------------------
data "aws_iam_policy_document" "s3_oac_policy" {
  statement {
    sid       = "AllowCloudFrontServicePrincipalReadOnly"
    effect    = "Allow"
    actions   = ["s3:GetObject"]
    resources = ["${aws_s3_bucket.website.arn}/*"]

    principals {
      type        = "Service"
      identifiers = ["cloudfront.amazonaws.com"]
    }

    condition {
      test     = "StringEquals"
      variable = "AWS:SourceArn"
      values   = [aws_cloudfront_distribution.cdn.arn]
    }
  }
}

resource "aws_s3_bucket_policy" "website" {
  bucket = aws_s3_bucket.website.id
  policy = data.aws_iam_policy_document.s3_oac_policy.json
}

# -----------------------------------------------------------------------------
# ACM TLS/SSL CERTIFICATE (us-east-1 Required for CloudFront)
# -----------------------------------------------------------------------------
resource "aws_acm_certificate" "cert" {
  provider                  = aws.acm_provider
  domain_name               = var.domain_name
  subject_alternative_names = ["*.${var.domain_name}"]
  validation_method         = "DNS"

  lifecycle {
    create_before_destroy = true
  }
}

# Route 53 Hosted Zone lookup
data "aws_route53_zone" "primary" {
  count        = var.create_route53_records ? 1 : 0
  name         = var.domain_name
  private_zone = false
}

# DNS Validation Records
resource "aws_route53_record" "cert_validation" {
  for_each = var.create_route53_records ? {
    for dvo in aws_acm_certificate.cert.domain_validation_options : dvo.domain_name => {
      name   = dvo.resource_record_name
      record = dvo.resource_record_value
      type   = dvo.resource_record_type
    }
  } : {}

  allow_overwrite = true
  name            = each.value.name
  records         = [each.value.record]
  ttl             = 60
  type            = each.value.type
  zone_id         = data.aws_route53_zone.primary[0].zone_id
}

resource "aws_acm_certificate_validation" "cert" {
  count                   = var.create_route53_records ? 1 : 0
  provider                = aws.acm_provider
  certificate_arn         = aws_acm_certificate.cert.arn
  validation_record_fqdns = [for record in aws_route53_record.cert_validation : record.fqdn]
}

# -----------------------------------------------------------------------------
# AWS WAF v2 WEB ACL (Edge Rate Limiting & Managed Rules)
# -----------------------------------------------------------------------------
resource "aws_wafv2_web_acl" "waf" {
  count       = var.enable_waf ? 1 : 0
  provider    = aws.acm_provider
  name        = "${replace(var.domain_name, ".", "-")}-cloudfront-waf"
  description = "Edge WAF v2 protection for CloudFront distribution (Rate Limiting + AWS Common Rule Set)"
  scope       = "CLOUDFRONT"

  default_action {
    allow {}
  }

  rule {
    name     = "RateLimit300RequestsPer5Minutes"
    priority = 1

    action {
      block {}
    }

    statement {
      rate_based_statement {
        limit              = 300
        aggregate_key_type = "IP"
      }
    }

    visibility_config {
      cloudwatch_metrics_enabled = true
      metric_name                = "RateLimit300RequestsPer5MinutesMetric"
      sampled_requests_enabled   = true
    }
  }

  rule {
    name     = "AWSManagedRulesCommonRuleSet"
    priority = 2

    override_action {
      none {}
    }

    statement {
      managed_rule_group_statement {
        name        = "AWSManagedRulesCommonRuleSet"
        vendor_name = "AWS"
      }
    }

    visibility_config {
      cloudwatch_metrics_enabled = true
      metric_name                = "AWSManagedRulesCommonRuleSetMetric"
      sampled_requests_enabled   = true
    }
  }

  visibility_config {
    cloudwatch_metrics_enabled = true
    metric_name                = "CloudFrontWebACLMetric"
    sampled_requests_enabled   = true
  }

  tags = {
    Name = "${replace(var.domain_name, ".", "-")}-cloudfront-waf"
  }
}

# -----------------------------------------------------------------------------
# CLOUDFRONT CDN DISTRIBUTION
# -----------------------------------------------------------------------------
resource "aws_cloudfront_distribution" "cdn" {
  enabled             = true
  is_ipv6_enabled     = true
  comment             = "Production CDN for ${var.domain_name}"
  default_root_object = "index.html"
  price_class         = var.price_class
  aliases             = var.create_route53_records ? [var.domain_name, "www.${var.domain_name}"] : []
  web_acl_id          = var.enable_waf ? aws_wafv2_web_acl.waf[0].arn : null

  origin {
    domain_name              = aws_s3_bucket.website.bucket_regional_domain_name
    origin_id                = "S3-${aws_s3_bucket.website.id}"
    origin_access_control_id = aws_cloudfront_origin_access_control.oac.id
  }

  logging_config {
    include_cookies = false
    bucket          = aws_s3_bucket.logs.bucket_domain_name
    prefix          = "cdn-access/"
  }

  default_cache_behavior {
    allowed_methods  = ["GET", "HEAD", "OPTIONS"]
    cached_methods   = ["GET", "HEAD"]
    target_origin_id = "S3-${aws_s3_bucket.website.id}"

    forwarded_values {
      query_string = false
      cookies {
        forward = "none"
      }
    }

    viewer_protocol_policy = "redirect-to-https"
    min_ttl                = 0
    default_ttl            = 86400
    max_ttl                = 31536000
    compress               = true
  }

  # SPA Routing Fallback: Route 404/403 to index.html with 200 OK
  custom_error_response {
    error_code            = 403
    response_code         = 200
    response_page_path    = "/index.html"
    error_caching_min_ttl = 10
  }

  custom_error_response {
    error_code            = 404
    response_code         = 200
    response_page_path    = "/index.html"
    error_caching_min_ttl = 10
  }

  restrictions {
    geo_restriction {
      restriction_type = "none"
    }
  }

  viewer_certificate {
    acm_certificate_arn            = var.create_route53_records ? aws_acm_certificate.cert.arn : null
    ssl_support_method             = var.create_route53_records ? "sni-only" : null
    minimum_protocol_version       = "TLSv1.2_2021"
    cloudfront_default_certificate = !var.create_route53_records
  }
}

# -----------------------------------------------------------------------------
# ROUTE 53 ALIAS RECORDS (Apex & WWW)
# -----------------------------------------------------------------------------
resource "aws_route53_record" "apex_a" {
  count   = var.create_route53_records ? 1 : 0
  zone_id = data.aws_route53_zone.primary[0].zone_id
  name    = var.domain_name
  type    = "A"

  alias {
    name                   = aws_cloudfront_distribution.cdn.domain_name
    zone_id                = aws_cloudfront_distribution.cdn.hosted_zone_id
    evaluate_target_health = false
  }
}

resource "aws_route53_record" "apex_aaaa" {
  count   = var.create_route53_records ? 1 : 0
  zone_id = data.aws_route53_zone.primary[0].zone_id
  name    = var.domain_name
  type    = "AAAA"

  alias {
    name                   = aws_cloudfront_distribution.cdn.domain_name
    zone_id                = aws_cloudfront_distribution.cdn.hosted_zone_id
    evaluate_target_health = false
  }
}

resource "aws_route53_record" "www_a" {
  count   = var.create_route53_records ? 1 : 0
  zone_id = data.aws_route53_zone.primary[0].zone_id
  name    = "www.${var.domain_name}"
  type    = "A"

  alias {
    name                   = aws_cloudfront_distribution.cdn.domain_name
    zone_id                = aws_cloudfront_distribution.cdn.hosted_zone_id
    evaluate_target_health = false
  }
}

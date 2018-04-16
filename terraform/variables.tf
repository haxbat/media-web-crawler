variable "aws_profile" {
  default = "exponenta"
}

variable "aws_region" {
  default = "eu-central-1"
}

variable "environment_tag" {
  default = "dev"
}

variable "lambda_timeout" {
  default = 30
}

variable "lambda_memory_size" {
  default = 128
}

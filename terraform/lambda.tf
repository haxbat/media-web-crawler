locals {
  build_file_name       = "build.zip"
  lambdas_source_s3_key = "lambdas-sources/${local.build_file_name}"
}

data "archive_file" "build_zip" {
  type        = "zip"
  source_dir  = "${path.module}/build"
  output_path = "${path.module}/${local.build_file_name}"
}

resource "aws_s3_bucket_object" "lambdas-source" {
  bucket      = "${aws_s3_bucket.lambda.id}"
  key         = "${local.lambdas_source_s3_key}"
  source      = "${local.build_file_name}"
  etag        = "data.archive_file.build_zip.output_md5"

  depends_on  = ["aws_s3_bucket.lambda"]
}

resource "aws_lambda_function" "run-web-crawler" {
  s3_bucket         = "${aws_s3_bucket.lambda.id}"
  s3_key            = "${local.lambdas_source_s3_key}"
  function_name     = "run-web-crawler"
  handler           = "src/lambdas/run.handler"
  runtime           = "nodejs8.10"
  role              = "${aws_iam_role.web-crawler.arn}"
  timeout           = "${var.lambda_timeout}"
  memory_size       = "${var.lambda_memory_size}"
  source_code_hash  = "${data.archive_file.build_zip.output_base64sha256}"

  depends_on        = ["aws_s3_bucket_object.lambdas-source"]
}

resource "aws_lambda_function" "get-last-execution" {
  s3_bucket         = "${aws_s3_bucket.lambda.id}"
  s3_key            = "${local.lambdas_source_s3_key}"
  function_name     = "get-last-execution"
  handler           = "src/lambdas/get-last-execution.handler"
  runtime           = "nodejs8.10"
  role              = "${aws_iam_role.web-crawler.arn}"
  timeout           = "${var.lambda_timeout}"
  memory_size       = "${var.lambda_memory_size}"
  source_code_hash  = "${data.archive_file.build_zip.output_base64sha256}"

  depends_on        = ["aws_s3_bucket_object.lambdas-source"]
}

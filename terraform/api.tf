resource "aws_api_gateway_rest_api" "web-crawler" {
  name = "web-crawler"
}

########### GET /run-web-crawler ###########

resource "aws_api_gateway_resource" "run-web-crawler" {
  rest_api_id = "${aws_api_gateway_rest_api.web-crawler.id}"
  parent_id   = "${aws_api_gateway_rest_api.web-crawler.root_resource_id}"
  path_part   = "run-web-crawler"
}

resource "aws_api_gateway_method" "run-web-crawler-get" {
  rest_api_id   = "${aws_api_gateway_rest_api.web-crawler.id}"
  resource_id   = "${aws_api_gateway_resource.run-web-crawler.id}"
  http_method   = "GET"
  authorization = "NONE"
}

resource "aws_api_gateway_integration" "run-web-crawler" {
  rest_api_id             = "${aws_api_gateway_rest_api.web-crawler.id}"
  resource_id             = "${aws_api_gateway_resource.run-web-crawler.id}"
  http_method             = "${aws_api_gateway_method.run-web-crawler-get.http_method}"
  integration_http_method = "POST"
  type                    = "AWS"
  uri                     = "arn:aws:apigateway:${var.aws_region}:lambda:path/2015-03-31/functions/${aws_lambda_function.run-web-crawler.arn}/invocations"
  credentials             = "arn:aws:iam::${var.account_id}:role/${aws_iam_role.web-crawler.name}"
}

resource "aws_api_gateway_method_response" "run-web-crawler-get-200" {
  rest_api_id = "${aws_api_gateway_rest_api.web-crawler.id}"
  resource_id = "${aws_api_gateway_resource.run-web-crawler.id}"
  http_method = "${aws_api_gateway_method.run-web-crawler-get.http_method}"
  status_code = "200"
  response_models {
    "application/json" = "Empty"
  }
}

resource "aws_api_gateway_integration_response" "run-web-crawler-get-200-response" {
  depends_on  = [ "aws_api_gateway_integration.run-web-crawler" ]
  rest_api_id = "${aws_api_gateway_rest_api.web-crawler.id}"
  resource_id = "${aws_api_gateway_resource.run-web-crawler.id}"
  http_method = "${aws_api_gateway_method.run-web-crawler-get.http_method}"
  status_code = "${aws_api_gateway_method_response.run-web-crawler-get-200.status_code}"
}

########### API deployment ###########

resource "aws_api_gateway_deployment" "web-crawler" {
  depends_on = [
    "aws_api_gateway_method.run-web-crawler-get",
    "aws_api_gateway_integration.run-web-crawler"
  ]
  rest_api_id = "${aws_api_gateway_rest_api.web-crawler.id}"
  stage_name = "${var.environment_tag}"
  stage_description = "checksum=${md5(file("api.tf"))}"
}

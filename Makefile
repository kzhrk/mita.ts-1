generate:
	docker run -t --rm \
  -v ${CURDIR}:/local openapitools/openapi-generator-cli generate \
  -i local/spec.yml \
  -g typescript-axios \
  -o local/sample/openapi-generator

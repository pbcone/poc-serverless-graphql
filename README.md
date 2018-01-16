# poc-serverless-graphql

requires serverless cli

yarn start will make a local version of the lambda available on port 3000
sls deploy will deploy to aws, creagting a lambda and a dynamoDB table

routes:

* /health -> status 200
* /graphiql -> standard graphql interface

based on https://serverless.com/blog/make-serverless-graphql-api-using-lambda-dynamodb/

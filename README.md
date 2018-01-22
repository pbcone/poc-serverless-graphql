# poc-serverless-graphql

requires serverless cli

yarn start will make a local version of the lambda available on port 3000 and will watch your directory for changes.

sls deploy will deploy to aws, creagting a lambda and a dynamoDB table

routes:

* /health -> status 200
* / -> standard graphql / graphiql interface

information about what queries and mutations are available can be found in the graphiql interface inside the docs tab

based on https://serverless.com/blog/make-serverless-graphql-api-using-lambda-dynamodb/

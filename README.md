# poc-serverless-graphql

requires [serverless cli](https://serverless.com/)

yarn start will make a local version of the lambda available on port 3000 and will watch your directory for changes.

sls deploy will deploy to aws, creagting a lambda and a dynamoDB table

routes:

* /health -> status 200
* / -> standard graphql / graphiql interface

example query: `query{ count(user:"asdf") }`

example mutation: `mutation{ incrementCount(user:"asdf", n:1) }`

both examples can be ran in the graphiql interface available on the root route.

more information about what queries and mutations are available can be found in the graphiql interface inside the docs tab.

based on https://serverless.com/blog/make-serverless-graphql-api-using-lambda-dynamodb/

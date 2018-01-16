const serverless = require('serverless-http');
const express = require('express');
const graphqlHTTP = require('express-graphql');

const Schema = require('./schema');

const app = express();

app.get('/health', function(req, res) {
    res.send(200);
});

app.use(
    '/graphql',
    graphqlHTTP({
        schema: Schema,
        graphiql: true
    })
);

module.exports.handler = serverless(app);

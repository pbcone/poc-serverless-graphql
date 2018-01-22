const serverless = require('serverless-http');
const express = require('express');
const graphqlHTTP = require('express-graphql');

const Schema = require('./schema-tools');

const app = express();

app.get('/health', function(req, res) {
    res.send(200);
});

app.all(
    '/',
    graphqlHTTP({
        schema: Schema,
        graphiql: true
    })
);

app.use(function(req, res) {
    res.send(404);
});

module.exports.handler = serverless(app);

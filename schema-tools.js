'use strict';
const { makeExecutableSchema } = require('graphql-tools');
const { getCount, incrementCount, decrementCount, createAction } = require('./methods');
const {GraphQLJSON} = require('graphql-type-json');



const typeDefs = `

  scalar JSON

  type Query {
    count(user:ID!) : Int
  }
  type Mutation {
    incrementCount(user:ID!, n:Int) : Int
    decrementCount(user:ID!, n:Int) : Int
    createAction(action: JSON): Int
  }
`;

const resolvers = {

  Query: {
    count: (parent, { user }) => getCount(user)
  },
  Mutation: {
    incrementCount: (parent, { user, n = 1 }) => incrementCount(user, n),
    decrementCount: (parent, { user, n = 1 }) => decrementCount(user, n),
    createAction:(parent, { action }) => createAction(action)
  }
};

const schema = makeExecutableSchema({
  typeDefs: typeDefs,
  resolvers: resolvers
});

module.exports = schema;

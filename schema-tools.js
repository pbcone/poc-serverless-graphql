'use strict';
const { makeExecutableSchema } = require('graphql-tools');
const { getCount, incrementCount, decrementCount } = require('./methods');

const typeDefs = `
  type Query { 
    count(user:ID!) : Int 
  }
  type Mutation { 
    incrementCount(user:ID!, n:Int) : Int
    decrementCount(user:ID!, n:Int) : Int 
  }
`;
const resolvers = {
  Query: {
    count: (parent, { user }) => getCount(user)
  },
  Mutation: {
    incrementCount: (parent, { user, n }) => incrementCount(user, n),
    decrementCount: (parent, { user, n }) => decrementCount(user, n)
  }
};

const schema = makeExecutableSchema({
  typeDefs: typeDefs,
  resolvers: resolvers
});

module.exports = schema;

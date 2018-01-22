// this is an example of what a manually(sans graphql-tools) created graphql scheme looks like
// graphql-tools custom syntax is shorter and contains less noise

'use strict';
const {
  graphql,
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLID,
  GraphQLNonNull
} = require('graphql');
const { getCount, incrementCount } = require('./methods');

const userId = {
  name: 'user',
  type: new GraphQLNonNull(GraphQLID),
  required: true
};

const schema = new GraphQLSchema({
  query: new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
      count: {
        type: GraphQLInt,
        args: {
          user: userId
        },
        resolve: (parent, { user }) => getCount(user)
      }
    }
  }),
  mutation: new GraphQLObjectType({
    name: 'RootMutationType',
    fields: {
      incrementCount: {
        args: {
          user: userId,
          n: { name: 'n', type: GraphQLInt }
        },
        type: GraphQLInt,
        resolve: (parent, { user, n }) => incrementCount(user, n)
      }
    }
  })
});

module.exports = schema;

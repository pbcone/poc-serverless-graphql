'use strict';
const {
  graphql,
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLString,
  GraphQLNonNull
} = require('graphql');
const { getGreeting, changeNickname } = require('./methods');

const schema = new GraphQLSchema({
  query: new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
      greeting: {
        type: GraphQLString,
        args: {
          firstName: {
            name: 'firstName',
            type: new GraphQLNonNull(GraphQLString)
          }
        },
        resolve: (parent, args) => getGreeting(args.firstName)
      }
    }
  }),
  mutation: new GraphQLObjectType({
    name: 'RootMutationType',
    fields: {
      changeNickname: {
        args: {
          // we need the user's first name as well as a preferred nickname
          firstName: {
            name: 'firstName',
            type: new GraphQLNonNull(GraphQLString)
          },
          nickname: {
            name: 'nickname',
            type: new GraphQLNonNull(GraphQLString)
          }
        },
        type: GraphQLString,
        // update the nickname
        resolve: (parent, args) => changeNickname(args.firstName, args.nickname)
      }
    }
  })
});

module.exports = schema;

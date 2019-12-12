import { ApolloServer, gql } from 'apollo-server';
import fs from 'fs';
import * as countryResolver from './resolvers/country';
import * as userResolver from './resolvers/user';
import * as addressResolver from './resolvers/address';
import * as loginResolver from './resolvers/login';
import { configure } from 'log4js';

const PATTERN = '%d %[[%5.5p] [%c-%5.5z]%] %m';
const LAYOUT = { type: 'pattern', pattern: PATTERN };
configure({
  appenders: {
    console: { type: 'console', layout: LAYOUT }
  },
  categories: {
    default: { appenders: [ 'console' ], level: 'trace' },
  }
});

const typeDefs = gql(fs.readFileSync(__dirname.concat('/schema/user.graphql'), 'utf8'));
const resolvers = {
  Query: {
    countries: countryResolver.countries,
    userByEmail: userResolver.userByEmail,
  },
  User: {
    billingAddress: addressResolver.userBillingAddress,
    shippingAddress: addressResolver.userShippingAddress,
  },
  Mutation: {
    insertUser: userResolver.insertUser,
    updateUser: userResolver.updateUser,
    activateUser: userResolver.activateUser,
    login: loginResolver.login,
  },
};

const server = new ApolloServer({ typeDefs, resolvers });

server.listen({ port: 9000 }).then(({ url }) => console.log(`Server ready at ${url}`));

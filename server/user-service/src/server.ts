import { ApolloServer, gql } from 'apollo-server';
import { buildFederatedSchema } from '@apollo/federation';
import { ContextFunction, AuthenticationError } from 'apollo-server-core';
import fs from 'fs';
import * as countryResolver from './resolvers/country';
import * as userResolver from './resolvers/user';
import * as addressResolver from './resolvers/address';
import * as loginResolver from './resolvers/login';
import { configure, getLogger } from 'log4js';
import { Request, Response } from 'express';
import { AuthContext } from './types';
import { GQLUser, GQLAddress, GQLCountry } from './gen/gql/types';
import env from './env';

const PATTERN = '%d %[[%5.5p] [%c-%5.5z]%] %m';
const LAYOUT = { type: 'pattern', pattern: PATTERN };
configure({
  appenders: {
    console: { type: 'console', layout: LAYOUT },
  },
  categories: {
    default: { appenders: ['console'], level: 'trace' },
  },
});

const typeDefs = gql(
  fs.readFileSync(__dirname.concat('/schema/user.graphql'), 'utf8')
);
const resolvers = {
  Query: {
    countries: countryResolver.countries,
    user: userResolver.user,
  },
  Address: {
    __resolveReference: (address: GQLAddress) => {
      return addressResolver.addressById(address.id);
    },
  },
  Country: {
    __resolveReference: (country: GQLCountry) => {
      return countryResolver.countryById(country.id);
    },
  },
  User: {
    __resolveReference: (user: GQLUser) => {
      return userResolver.userById(user.id);
    },
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

interface ContextArg {
  req?: Request;
  res?: Response;
}

const createContext: ContextFunction<ContextArg, AuthContext> = ({ req }) => {
  if (req && req.headers['user-id'] && req.headers['session-id']) {
    return {
      userId: Number(req.headers['user-id']),
      sessionId: req.headers['session-id'] as string,
    };
  }
  return {};
};

const server = new ApolloServer({
  schema: buildFederatedSchema([{ typeDefs, resolvers }]),
  context: createContext,
  engine: {
    rewriteError: err => {
      if (err instanceof AuthenticationError) {
        return null;
      }
      return err;
    },
  },
});

server
  .listen({ port: env.serverPort })
  .then(({ url }) => getLogger().info(`Server ready at ${url}`));

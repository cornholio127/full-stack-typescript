import { ApolloServer, gql } from 'apollo-server';
import { buildFederatedSchema } from '@apollo/federation';
import { ContextFunction, AuthenticationError } from 'apollo-server-core';
import { Request, Response } from 'express';
import fs from 'fs';
import { configure, getLogger } from 'log4js';
import * as orderResolver from './resolvers/order';
import * as orderItemResolver from './resolvers/orderitem';
import * as orderSummaryResolver from './resolvers/ordersummary';
import { GQLOrder, GQLOrderItem } from './gen/gql/types';
import env from './env';
import { AuthContext } from './types';

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
  fs.readFileSync(__dirname.concat('/schema/order.graphql'), 'utf8')
);
const resolvers = {
  Query: {
    orders: orderResolver.orders,
    orderSummary: orderSummaryResolver.orderSummary,
  },
  Order: {
    __resolveReference: (order: GQLOrder) => {
      return orderResolver.orderById(order.id);
    },
  },
  OrderItem: {
    __resolveReference: (orderItem: GQLOrderItem) => {
      return orderItemResolver.orderItemById(orderItem.id);
    },
  },
  Mutation: {
    createOrder: orderResolver.createOrder,
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

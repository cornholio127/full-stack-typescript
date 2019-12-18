import { ApolloServer, gql } from 'apollo-server';
import { buildFederatedSchema } from '@apollo/federation';
import fs from 'fs';
import { configure, getLogger } from 'log4js';
import * as orderResolver from './resolvers/order';
import * as orderItemResolver from './resolvers/orderitem';
import { GQLOrder, GQLOrderItem } from './gen/gql/types';
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
  fs.readFileSync(__dirname.concat('/schema/order.graphql'), 'utf8')
);
const resolvers = {
  Query: {
    orders: orderResolver.orders,
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
};

const server = new ApolloServer({
  schema: buildFederatedSchema([{ typeDefs, resolvers }]),
});

server
  .listen({ port: env.serverPort })
  .then(({ url }) => getLogger().info(`Server ready at ${url}`));

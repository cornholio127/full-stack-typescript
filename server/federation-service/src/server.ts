import express from 'express';
import { ApolloGateway, RemoteGraphQLDataSource } from '@apollo/gateway';
import { ApolloServer } from 'apollo-server-express';
import { configure, getLogger } from 'log4js';
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

class CustomRemoteGraphQLDataSource extends RemoteGraphQLDataSource {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  willSendRequest({ request, context }: any) {
    if (context.authorization) {
      request.http.headers.set('Authorization', context.authorization);
    }
  }
}

const gateway = new ApolloGateway({
  serviceList: [
    {
      name: 'user-service',
      url: `http://${env.userServiceHost}:${env.userServicePort}`,
    },
    {
      name: 'product-service',
      url: `http://${env.productServiceHost}:${env.productServicePort}`,
    },
    {
      name: 'order-service',
      url: `http://${env.orderServiceHost}:${env.orderServicePort}`,
    },
  ],
  buildService({ url }) {
    return new CustomRemoteGraphQLDataSource({ url });
  },
});

const server = new ApolloServer({
  gateway,
  context: ({ req }) => {
    return req.headers.authorization
      ? { authorization: req.headers.authorization }
      : {};
  },
  subscriptions: false,
  introspection: true,
  playground: true,
});

const app = express();

server.applyMiddleware({ app, path: '/api' });

app.listen({ port: env.serverPort }, () =>
  getLogger().info(`Server ready at http://localhost:${env.serverPort}/api`)
);

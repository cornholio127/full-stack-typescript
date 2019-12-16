import { ApolloGateway, RemoteGraphQLDataSource } from '@apollo/gateway';
import { ApolloServer } from 'apollo-server';
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
    if (context.authentication) {
      request.http.headers.set('Authentication', context.authentication);
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
  ],
  buildService({ url }) {
    return new CustomRemoteGraphQLDataSource({ url });
  },
});

const server = new ApolloServer({
  gateway,
  context: ({ req }) => {
    return req.headers.authentication
      ? { authentication: req.headers.authentication }
      : { asdf: 'foo' };
  },
  subscriptions: false,
  introspection: true,
  playground: true,
});

server
  .listen({ port: env.serverPort })
  .then(({ url }) => getLogger().info(`Server ready at ${url}`));

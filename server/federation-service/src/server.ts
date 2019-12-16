import { ApolloGateway } from '@apollo/gateway';
import { ApolloServer } from 'apollo-server';
import { configure, getLogger } from 'log4js';

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

const gateway = new ApolloGateway({
  serviceList: [
    { name: 'user-service', url: 'http://user-service:9000' },
    { name: 'product-service', url: 'http://product-service:9000' },
  ],
});

const server = new ApolloServer({
  gateway,
  subscriptions: false,
  introspection: true,
  playground: true,
});

server
  .listen({ port: 9000 })
  .then(({ url }) => getLogger().info(`Server ready at ${url}`));

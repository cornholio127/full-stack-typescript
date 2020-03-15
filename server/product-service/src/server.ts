import { ApolloServer } from 'apollo-server';
import { buildFederatedSchema } from '@apollo/federation';
import { configure, getLogger } from 'log4js';
import resolvers from './resolvers';
import typeDefs from './schema';
import env from './env';
import createDataLoaders from './loaders';

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

const server = new ApolloServer({
  schema: buildFederatedSchema([{ typeDefs, resolvers }]),
  context: () => ({ dataLoaders: createDataLoaders() }),
  tracing: true,
});

server
  .listen({ port: env.serverPort })
  .then(({ url }) => getLogger().info(`Server ready at ${url}`));

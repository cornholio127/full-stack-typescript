import { ApolloServer, gql } from 'apollo-server';
import fs from 'fs';
import { configure } from 'log4js';
import * as productResolver from './resolvers/product';
import * as categoryResolver from './resolvers/category';

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

const typeDefs = gql(fs.readFileSync(__dirname.concat('/schema/product.graphql'), 'utf8'));
const resolvers = {
  Query: {
    products: productResolver.products,
    categories: categoryResolver.categories,
  },
  Category: {
    products: productResolver.categoryProducts,
  },
};

const server = new ApolloServer({ typeDefs, resolvers });

server.listen({ port: 9000 }).then(({ url }) => console.log(`Server ready at ${url}`));

import { ApolloServer, gql } from 'apollo-server';
import { buildFederatedSchema } from '@apollo/federation';
import fs from 'fs';
import { configure, getLogger } from 'log4js';
import * as productResolver from './resolvers/product';
import * as categoryResolver from './resolvers/category';
import * as imageResolver from './resolvers/image';
import { GQLProduct, GQLImage, GQLCategory } from './gen/gql/types';

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
  fs.readFileSync(__dirname.concat('/schema/product.graphql'), 'utf8')
);
const resolvers = {
  Query: {
    products: productResolver.products,
    categories: categoryResolver.categories,
  },
  Category: {
    __resolveReference: (category: GQLCategory) => {
      return categoryResolver.categoryById(category.id);
    },
    products: productResolver.categoryProducts,
  },
  Product: {
    __resolveReference: (product: GQLProduct) => {
      return productResolver.productById(product.id);
    },
  },
  Image: {
    __resolveReference: (image: GQLImage) => {
      return imageResolver.imageById(image.id);
    },
  },
};

const server = new ApolloServer({
  schema: buildFederatedSchema([{ typeDefs, resolvers }]),
});

server
  .listen({ port: 9000 })
  .then(({ url }) => getLogger().info(`Server ready at ${url}`));

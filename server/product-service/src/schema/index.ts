import { gql } from 'apollo-server';
import fs from 'fs';

const typeDefs = gql(
  fs.readFileSync(__dirname.concat('/product.graphql'), 'utf8')
);

export default typeDefs;

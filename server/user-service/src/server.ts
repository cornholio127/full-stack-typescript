import { ApolloServer, gql } from 'apollo-server';
import fs from 'fs';
import * as countryResolver from './resolvers/country';
import * as userResolver from './resolvers/user';

const typeDefs = gql(fs.readFileSync(__dirname.concat('/schema/user.graphql'), 'utf8'));
const resolvers = {
  Query: {
    countries: countryResolver.countries,
    userByEmail: userResolver.userByEmail,
  },
};

const server = new ApolloServer({ typeDefs, resolvers });

server.listen({ port: 9000 }).then(({ url }) => console.log(`Server ready at ${url}`));

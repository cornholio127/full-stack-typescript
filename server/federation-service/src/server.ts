import express, { Request, Response } from 'express';
import { ApolloGateway, RemoteGraphQLDataSource } from '@apollo/gateway';
import { ApolloServer } from 'apollo-server-express';
import { ContextFunction, AuthenticationError } from 'apollo-server-core';
import { configure, getLogger } from 'log4js';
import env from './env';
import { transformSchemaFederation } from 'graphql-transform-federation';
import { weaveSchemas } from 'graphql-weaver';
import fetch from 'node-fetch';
import { verifyAuthToken } from './auth';
import { JwtPayload, AuthContext } from './types';

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
    if (context.userId && context.sessionId) {
      request.http.headers.set('user-id', context.userId);
      request.http.headers.set('session-id', context.sessionId);
    }
  }
}

const startCmsGateway = async () => {
  const namespacedSchema = await weaveSchemas({
    endpoints: [
      {
        namespace: 'cms',
        typePrefix: 'Cms',
        url: `http://${env.cmsHost}:${env.cmsPort}/graphql`,
      },
    ],
  });

  const federationSchema = transformSchemaFederation(namespacedSchema, {
    Query: {
      extend: true,
    },
    Mutation: {
      extend: false,
    },
  });

  const app = express();

  const server = new ApolloServer({
    schema: federationSchema,
  });

  server.applyMiddleware({ app });
  app.listen({ port: 9005 });
};

(async () => {
  let cmsReady = false;
  while (!cmsReady) {
    try {
      await fetch(`http://${env.cmsHost}:${env.cmsPort}/graphql`, {
        timeout: 50,
      });
      cmsReady = true;
    } catch (e) {
      await new Promise(resolve => setTimeout(resolve, 1000));
    }
  }
  await startCmsGateway();
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
      {
        name: 'cms-gateway',
        url: 'http://localhost:9005/graphql',
      },
    ],
    buildService({ url }) {
      return new CustomRemoteGraphQLDataSource({ url });
    },
  });

  interface ContextArg {
    req?: Request;
    res?: Response;
  }

  const createContext: ContextFunction<ContextArg, AuthContext> = ({ req }) => {
    const auth = (req && req.headers.authorization) || '';
    const token = typeof auth === 'string' ? auth : auth[0];
    if (token.startsWith('Bearer ')) {
      const decoded = verifyAuthToken(token.substring('Bearer '.length));
      if (typeof decoded === 'object') {
        return {
          userId: (decoded as JwtPayload).uid,
          sessionId: (decoded as JwtPayload).sid,
        };
      }
    }
    return {};
  };

  const server = new ApolloServer({
    gateway,
    context: createContext,
    engine: {
      rewriteError: err => {
        if (err instanceof AuthenticationError) {
          return null;
        }
        return err;
      },
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
})();

import React from 'react';
import * as pages from './pages';
import { Grommet, grommet } from 'grommet';
import { deepMerge } from 'grommet/utils';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import ApolloClient, { InMemoryCache, gql } from 'apollo-boost';
import { ApolloProvider } from '@apollo/react-hooks';
import { basketQuery } from './hooks';
import { ApolloCache } from 'apollo-cache';
import {
  BasketQuery,
  BasketQuery_basket as BasketItem,
} from './hooks/BasketQuery';

const theme = deepMerge(grommet, {
  global: {
    font: {
      family: 'Barlow Semi Condensed',
      size: '16px',
      height: '18px',
    },
    colors: {
      brand: '#ef98a8',
      placeholder: '#cacacd',
    },
    control: {
      border: {
        color: '#666668',
      },
    },
    focus: {
      border: {
        color: '#123456',
      },
    },
  },
  paragraph: {
    medium: {
      size: '16px',
      height: '22px',
    },
  },
});

const client = new ApolloClient({
  uri: 'http://localhost:9000',
  cache: new InMemoryCache({
    freezeResults: true,
  }),
  typeDefs: gql`
    type BasketItem {
      productId: ID!
      quantity: Int!
    }
    extend type Query {
      selectedCategory: Category
      basket: [BasketItem!]!
    }
    extend type Mutation {
      updateBasket(productId: ID!, quantity: Int!): [BasketItem!]!
    }
  `,
  resolvers: {
    Mutation: {
      updateBasket: (obj, args, { cache }) => {
        const result = (cache as ApolloCache<object>).readQuery<BasketQuery>({
          query: basketQuery,
        });
        const basket = result?.basket || [];
        const filteredById = basket.filter(i => i.productId === args.productId);
        const modifiedItem: BasketItem = {
          __typename: 'BasketItem',
          productId: args.productId,
          quantity:
            (filteredById.length > 0 ? filteredById[0].quantity : 0) +
            args.quantity,
        };
        const newBasket: BasketItem[] = basket
          .filter(i => i.productId !== args.productId)
          .concat(args.quantity === 0 ? [] : modifiedItem);
        (cache as ApolloCache<object>).writeData({
          data: { basket: newBasket },
        });
        return newBasket;
      },
    },
  },
});

client.writeData({ data: { selectedCategory: null, basket: [] } });

const App: React.FC = () => {
  return (
    <ApolloProvider client={client}>
      <Router>
        <Grommet theme={theme}>
          <Route path="/" exact={true}>
            <pages.Home />
          </Route>
          <Route path="/tag/:slug">
            <pages.Category />
          </Route>
          <Route path="/product/:slug">
            <pages.Product />
          </Route>
          <Route path="/basket">
            <pages.Basket />
          </Route>
          <Route path="/checkout">
            <pages.Checkout />
          </Route>
          <Route path="/login">
            <pages.Login />
          </Route>
          <Route path="/register">
            <pages.Register />
          </Route>
          <Route path="/orders">
            <pages.Orders />
          </Route>
          <Route path="/cms">
            <pages.Cms />
          </Route>
        </Grommet>
      </Router>
    </ApolloProvider>
  );
};

export default App;

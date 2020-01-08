import React from 'react';
import * as pages from './pages';
import { Grommet, grommet } from 'grommet';
import { deepMerge } from 'grommet/utils';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import ApolloClient, { InMemoryCache, gql, Operation } from 'apollo-boost';
import { ApolloProvider } from '@apollo/react-hooks';
import { basketQuery } from './hooks';
import { ApolloCache } from 'apollo-cache';
import {
  BasketQuery,
  BasketQuery_basket_items as BasketItem,
} from './hooks/BasketQuery';
import BasketPersister from './BasketPersister';
import TokenChecker from './TokenChecker';
import { css } from 'styled-components';

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
  radioButton: {
    extend: css`
      div {
        box-shadow: none;
        outline: none;
      }
      span {
        font-weight: 500;
      }
    `,
    hover: {
      border: {
        color: '#123456',
      },
    },
  },
  checkBox: {
    extend: css`
      div {
        box-shadow: none;
        outline: none;
      }
      span {
        font-weight: 500;
      }
    `,
    hover: {
      border: {
        color: '#123456',
      },
    },
  },
});

const isProduction = process.env.NODE_ENV === 'production';

const client = new ApolloClient({
  uri: isProduction ? '/api/' : 'http://localhost:9000/api/',
  request: (operation: Operation) => {
    const token = window.localStorage.getItem('token');
    operation.setContext({
      headers: {
        Authorization: token ? `Bearer ${token}` : '',
      },
    });
  },
  cache: new InMemoryCache({
    freezeResults: true,
  }),
  typeDefs: gql`
    type BasketItem {
      productId: ID!
      quantity: Int!
    }
    type Basket {
      modificationCount: Int!
      items: [BasketItem!]!
    }
    extend type Query {
      selectedCategory: Category
      basket: Basket!
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
        const items = result?.basket.items || [];
        const filteredById = items.filter(i => i.productId === args.productId);
        const modifiedItem: BasketItem = {
          __typename: 'BasketItem',
          productId: args.productId,
          quantity:
            (filteredById.length > 0 ? filteredById[0].quantity : 0) +
            args.quantity,
        };
        const newItems: BasketItem[] = items
          .filter(i => i.productId !== args.productId)
          .concat(args.quantity === 0 ? [] : modifiedItem);
        (cache as ApolloCache<object>).writeData({
          data: {
            basket: {
              __typename: 'Basket',
              modificationCount: (result?.basket.modificationCount || 0) + 1,
              items: newItems,
            },
          },
        });
        return newItems;
      },
    },
  },
});

client.writeData({
  data: {
    selectedCategory: null,
    basket: {
      __typename: 'Basket',
      modificationCount: 0,
      items: [],
    },
  },
});

const App: React.FC = () => {
  return (
    <ApolloProvider client={client}>
      <TokenChecker />
      <BasketPersister />
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
          <Route path="/locations/:slug">
            <pages.Location />
          </Route>
        </Grommet>
      </Router>
    </ApolloProvider>
  );
};

export default App;

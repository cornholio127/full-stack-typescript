import React from 'react';
import * as pages from './pages';
import { Grommet, grommet } from 'grommet';
import { deepMerge } from 'grommet/utils';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from '@apollo/react-hooks';

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

const client = new ApolloClient({ uri: 'http://localhost:9000' });

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
          <Route path="/login">
            <pages.Login />
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

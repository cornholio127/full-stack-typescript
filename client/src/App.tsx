import React from 'react';
import * as pages from './pages';
import { Grommet, grommet } from 'grommet';
import { deepMerge } from 'grommet/utils';
import { BrowserRouter as Router, Route } from 'react-router-dom';

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
});

const App: React.FC = () => {
  return (
    <Router>
      <Grommet theme={theme}>
        <Route path="/" exact={true}>
          <pages.Home />
        </Route>
        <Route path="/tag/:slug" exact={true}>
          <pages.Category />
        </Route>
        <Route path="/tag/:catslug/:prodslug">
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
  );
};

export default App;

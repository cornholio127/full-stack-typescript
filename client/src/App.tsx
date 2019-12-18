import React from 'react';
import * as pages from './pages';
import { Grommet, grommet } from 'grommet';
import { deepMerge } from 'grommet/utils';
import { BrowserRouter as Router, Route } from 'react-router-dom';

const theme = deepMerge(grommet, {
  global: {
    font: {
      family: 'Arial',
      size: '16px',
      height: '18px',
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
        <Route path="/cat-:slug" exact={true}>
          <pages.Category />
        </Route>
        <Route path="/cat-:catslug/:prodslug">
          <pages.Product />
        </Route>
        <Route path="/basket">
          <pages.Basket />
        </Route>
      </Grommet>
    </Router>
  );
};

export default App;

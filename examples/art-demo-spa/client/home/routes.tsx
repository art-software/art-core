import React from 'react';
import { HashRouter, Switch, Route } from 'react-router-dom';
import ViewIndex from './views/Index';
import Page404 from '../../../../packages/art-lib-react/src/components/errorpage/404';

const Routes = () => {
  return (
    // @ts-ignore
    <HashRouter>
      // @ts-ignore
      <Switch>
        // @ts-ignore
        <Route exact={true} path="/" component={ViewIndex} ></Route>
        // @ts-ignore
        <Route component={Page404}></Route>
      </Switch>
    </HashRouter>
  );
};

export default Routes;
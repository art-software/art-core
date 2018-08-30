import React from 'react';
import { Route } from 'react-router-dom';
import ViewIndex from './views/Index';

const Routes = () => {
  return (
    <React.Fragment>
      <Route path="/index" component={ViewIndex} />
    </React.Fragment>
  );
};

export default Routes;
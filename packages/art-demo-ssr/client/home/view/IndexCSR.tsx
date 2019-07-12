import React from 'react';
import 'art-lib-react/dist/styles/index';
import { BrowserRouter } from 'react-router-dom';
import { renderRoutes } from 'react-router-config';
import routes from '../routes';
import { convertCustomRouteConfig } from 'art-ssr-react-router/dist/reactRouterHelper';
import CoreComponent from 'art-lib-react/src/core/CoreComponent';

export default class IndexCSR extends CoreComponent<any, any> {
  constructor(props) {
    super(props);
  }

  public render() {
    console.log('this.props: ', this.props);
    const routeConfig = convertCustomRouteConfig(routes);
    return (
      <BrowserRouter>
        {renderRoutes(routeConfig)}
      </BrowserRouter>
    );
  }
}
import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { renderRoutes } from 'react-router-config';
import routes from '../routes';
import { convertCustomRouteConfig } from 'art-ssr-react-router/dist/reactRouterHelper';
// import { convertCustomRouteConfig, ensureReady } from 'art-ssr-react-router/dist/reactRouterHelper';

export default class IndexSSR extends React.Component {
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
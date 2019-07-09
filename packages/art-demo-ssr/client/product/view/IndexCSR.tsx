import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { renderRoutes } from 'react-router-config';
import routes from 'art-demo-ssr/client/product/routes';
import { convertCustomRouteConfig } from 'art-ssr-react-router/dist/reactRouterHelper';

export default class IndexSSR extends React.Component {
  constructor(props) {
    super(props);
  }

  public render() {
    const routeConfig = convertCustomRouteConfig(routes);
    return (
      <BrowserRouter>
        {renderRoutes(routeConfig)}
      </BrowserRouter>
    );
  }
}
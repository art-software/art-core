import React from 'react';
import { StaticRouter } from 'react-router-dom';
import { renderRoutes } from 'react-router-config';
import routes from 'art-demo-ssr/client/product/routes';
import { convertCustomRouteConfig } from 'art-ssr-react-router/dist/reactRouterHelper';

export default class IndexSSR extends React.Component {
  constructor(props) {
    super(props);
  }

  public render() {
    const { url } = (this.props as any).data;
    console.log('url: ', url);
    const routeConfig = convertCustomRouteConfig(routes);
    console.log('routeConfig: ', routeConfig);
    return (
      <StaticRouter location={url} context={{}}>
        {
          renderRoutes(routeConfig)
        }
      </StaticRouter>
    );
  }
}
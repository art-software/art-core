import React from 'react';
import { StaticRouter } from 'react-router-dom';
// import Home from './Home';
// import About from './About';
// import Mine from './Mine';
import { renderRoutes } from 'react-router-config';
import routes from '../routes';
import { convertCustomRouteConfig } from 'art-ssr-react-router/dist/reactRouterHelper';

export default class IndexSSR extends React.Component {
  constructor(props) {
    super(props);
  }

  public render() {
    console.log('this.propsss: ', this.props);
    const { url } = (this.props as any).data;
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
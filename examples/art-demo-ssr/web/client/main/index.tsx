import React from 'react';
import { renderReact } from '../../../../../packages/art-ssr-react';
import routes from './routes';
import { BrowserRouter } from 'react-router-dom';
import { renderRoutes } from 'react-router-config';
import { convertCustomRouteConfig, ensureReady } from '../../../../../packages/art-ssr-react-router/dist/reactRouterHelper';
// import CoreComponentAll from '../../../../../packages/art-lib-react/dist/core_all/CoreComponentAll';
const routeConfig = convertCustomRouteConfig(routes as any);

class IndexCSR extends React.Component<any, any> {
  constructor(props, context) {
    super(props, context);
  }

  public render() {
    console.log('this.props: ', this.props);
    return (
      <BrowserRouter>
        {renderRoutes(routeConfig)}
      </BrowserRouter>
    );
  }
}

export default ensureReady(routeConfig).then(() => {
  renderReact('Main', IndexCSR);
});
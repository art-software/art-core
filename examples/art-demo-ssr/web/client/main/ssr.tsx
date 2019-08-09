import React from 'react';
import { renderReact } from '../../../../../packages/art-ssr-react';
import routes from './routes';
import { convertCustomRouteConfig, ensureReady } from '../../../../../packages/art-ssr-react-router/dist/reactRouterHelper';
import { StaticRouter } from 'react-router-dom';
import { renderRoutes } from 'react-router-config';
// TODO figure out tslint error reason
const routeConfig = convertCustomRouteConfig(routes as any);

class IndexSSR extends React.Component {
  constructor(props) {
    super(props);
  }

  public componentDidUpdate(prev, curr) {
    console.log('prev: ', prev);
  }

  public render() {
    const { url } = (this.props as any).data;
    return (
      <StaticRouter location={url} context={{}}>
        {
          renderRoutes(routeConfig)
        }
      </StaticRouter>
    );
  }
}

export default {
  Main: (props: any) => {
    const url = (props.data || {}).url;
    console.log('props: ', props);
    return ensureReady(routeConfig, url).then(() => {
      return renderReact('Main', IndexSSR);
    });
  }
};
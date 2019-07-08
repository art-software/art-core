import { renderReact } from 'art-ssr-react';
import IndexSSR from './view/IndexSSR';
import routes from './routes';
import { convertCustomRouteConfig, ensureReady } from 'art-ssr-react-router/dist/reactRouterHelper';
const routeConfig = convertCustomRouteConfig(routes);

export default {
  Home: (props: any) => {
    const url = (props.data || {}).url;
    return ensureReady(routeConfig, url).then(() => {
      return renderReact('Home', IndexSSR);
    });
  }
};
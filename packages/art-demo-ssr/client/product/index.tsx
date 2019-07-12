import { renderReact } from 'art-ssr-react';
import Product from './view/IndexCSR';
import routes from './routes';
import { convertCustomRouteConfig, ensureReady } from 'art-ssr-react-router/dist/reactRouterHelper';
const routeConfig = convertCustomRouteConfig(routes);

ensureReady(routeConfig).then(() => {
  renderReact('Product', Product);
});
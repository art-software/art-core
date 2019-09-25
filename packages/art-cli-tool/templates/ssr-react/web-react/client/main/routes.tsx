import Home from './views/Home';
import { generateAsyncRouteComponent } from 'art-ssr-react-router/dist/reactRouterHelper';

export default [
  {
    component: Home,
    path: (parentRoute) => `${parentRoute}/home`,
    routes: [
      {
        path: (parentRoute) => `${parentRoute}/home`,
        exact: true,
        component: generateAsyncRouteComponent({
          loader: () => import('./views/Home')
        })
      },
      {
        path: (parentRoute) => `${parentRoute}/product`,
        exact: true,
        component: generateAsyncRouteComponent({
          loader: () => import('./views/Product')
        })
      }
    ]
  }
];
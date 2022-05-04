import Home from './views/Home';
import { generateAsyncRouteComponent } from '../../../../../packages/art-ssr-react-router/dist/reactRouterHelper';

export default [
  // {
  //   component: Home,
  //   path: (parentRoute) => `${parentRoute}/`,
  //   routes: [
  //     {
  //       path: (parentRoute) => `${parentRoute}/home`,
  //       exact: true,
  //       component: generateAsyncRouteComponent({
  //         loader: () => import('./views/Home')
  //       })
  //     },
  //     {
  //       path: (parentRoute) => `${parentRoute}/product`,
  //       exact: true,
  //       component: generateAsyncRouteComponent({
  //         loader: () => import('./views/Product')
  //       })
  //     }
  //   ]
  // }
  {
    path: (parentRoute) => `${parentRoute}/home`,
    exact: true,
    // component: generateAsyncRouteComponent({
    //   loader: () => import('./views/Home')
    // })
    component: Home
  },
  {
    path: (parentRoute) => `${parentRoute}/product`,
    exact: true,
    component: generateAsyncRouteComponent({
      loader: () => import('./views/Product')
    })
  }
];
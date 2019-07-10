import Index from 'art-demo-ssr/client/product/view';
import { generateAsyncRouteComponent } from 'art-ssr-react-router/dist/reactRouterHelper';

export default [
  {
    component: Index,
    path: (parentRoute) => `${parentRoute}/product`,
    routes: [
      {
        path: (parentRoute) => `${parentRoute}/intro`,
        component: generateAsyncRouteComponent({
          loader: () => import('./view/Intro')
        })
      },
      {
        path: (parentRoute) => `${parentRoute}/detail`,
        component: generateAsyncRouteComponent({
          loader: () => import('./view/Detail')
        })
      }
    ]
  }
];
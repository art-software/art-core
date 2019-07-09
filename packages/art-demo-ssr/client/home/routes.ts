import Index from '../home/view/Index';
import { generateAsyncRouteComponent } from 'art-ssr-react-router/dist/reactRouterHelper';

export default [
  {
    component: Index,
    path: (parentRoute) => `${parentRoute}/`,
    routes: [
      {
        path: (parentRoute) => `${parentRoute}/home`,
        component: generateAsyncRouteComponent({
          loader: () => import('./view/Home')
        })
      },
      {
        path: (parentRoute) => `${parentRoute}/about`,
        component: generateAsyncRouteComponent({
          loader: () => import('./view/About')
        })
      },
      {
        path: (parentRoute) => `${parentRoute}/mine`,
        component: generateAsyncRouteComponent({
          loader: () => import('../home/view/Mine')
        })
      }
    ]
  }
];
import Home from '../home/view/Home';
// import About from '../home/view/About';
import { generateAsyncRouteComponent } from 'art-ssr-react-router/dist/reactRouterHelper';

export default [
  {
    component: Home,
    path: (parentRoute) => `${parentRoute}/`,
    routes: [
      {
        path: (parentRoute) => `${parentRoute}/about`,
        component: generateAsyncRouteComponent({
          loader: () => import('../home/view/About')
        })
      }
    ]
  }
];
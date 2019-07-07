import Index from '../home/view/Index';
import { generateAsyncRouteComponent } from 'art-ssr-react-router/dist/reactRouterHelper';
// import Home from './view/Home';
// import About from './view/About';
import Mine from './view/Mine';

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
        // component: Home
      },
      {
        path: (parentRoute) => `${parentRoute}/about`,
        component: generateAsyncRouteComponent({
          loader: () => import('./view/About')
        })
        // component: About
      },
      {
        path: (parentRoute) => `${parentRoute}/mine`,
        // component: generateAsyncRouteComponent({
        //   loader: () => import('../home/view/Mine')
        // })
        component: Mine
      }
    ]
  }
];

// export default [
//   {
//     component: Index,
//     routes: [
//       {
//         path: '/home',
//         component: Home
//       },
//       {
//         path: '/about',
//         component: About
//       },
//       {
//         path: '/Mine',
//         component: Mine
//       }
//     ]
//   }
// ];
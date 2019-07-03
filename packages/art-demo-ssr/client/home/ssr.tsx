import { renderReact } from 'art-ssr-react';
import Home from '../home/view/Home';
import About from '../home/view/About';
// import { ensureReady, convertCustomRouteConfig } from 'art-ssr-react-router/dist/reactRouterHelper';
// import routes from './routes';
// import { StaticRouter } from 'react-router-dom';
// import { renderRoutes } from 'react-router-config';

// const routeConfig = convertCustomRouteConfig(routes);
// export function serverRender(location: string, props: any) {
//   return ensureReady(routes, location).then(() => {
//     return (
//       <StaticRouter context={{}} location={location}>
//         {
//           renderRoutes(routeConfig, props)
//         }
//       </StaticRouter>
//     );
//   });
// }

// if (window) {
//   ensureReady(routeConfig).then(() => {
//     const element = document.getElementById('props');
//     if (!element) { return; }
//     const props = JSON.parse((element.dataset || {}).props as string);
//     render(
//       (
//         <BrowserRouter>
//           { renderRoutes(routeConfig, props) }
//         </BrowserRouter>
//       ),
//       document.getElementsByClassName('todoapp')[0]
//     );
//   });
// }

export default {
  Home: renderReact('Home', Home),
  About: renderReact('About', About)
};
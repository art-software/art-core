import { matchRoutes, RouteConfigComponentProps } from 'react-router-config';

interface CustomRouteConfig {
  key?: React.Key;
  location?: Location;
  component?: React.ComponentType<RouteConfigComponentProps<any>> | React.ComponentType;
  path?: string | ((parentRoute: string) => string);
  exact?: boolean;
  strict?: boolean;
  routes?: CustomRouteConfig[];
  render?: (props: RouteConfigComponentProps<any>) => React.ReactNode;
  [propName: string]: any;
}

export const convertCustomRouteConfig = (customRouteConfig: CustomRouteConfig[], parentRoute: string) => {
  return customRouteConfig.map((route) => {
    if (typeof route.path === 'function') {
      const pathResult = route.path(parentRoute || '').replace('//', '/');
      return {
        path: pathResult,
        component: route.component,
        exact: route.exact,
        routes: route.routes ? convertCustomRouteConfig(route.routes, pathResult) : []
      };
    }

    const path = `${parentRoute}${route.path}`;
    return {
      path,
      component: route.component,
      exact: route.exact,
      routes: route.routes ? convertCustomRouteConfig(route.routes, path) : []
    };
  });
};
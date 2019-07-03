import React from 'react';
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

export const convertCustomRouteConfig = (customRouteConfig: CustomRouteConfig[], parentRoute?: string) => {
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

export const generateAsyncRouteComponent = (component) => {
  const { loader, Placeholder } = component;
  let Component;
  return class AsyncRouteComponent extends React.Component {
    public static load() {
      return loader().then((ResolvedComponent) => {
        Component = ResolvedComponent.default || ResolvedComponent;
      });
    }

    constructor(props?: any, context?: any) {
      super(props, context);
    }

    public state = {
      Component
    };

    public updateState() {
      if (this.state.Component !== Component) {
        this.setState({
          Component
        });
      }
    }

    public render() {
      const { Component: ComponentFromState } = this.state;
      if (ComponentFromState) {
        return <ComponentFromState { ...this.props } />;
      }

      if (Placeholder) {
        return <Placeholder />;
      }

      return  null;
    }
  };
};

/**
 * First match the routes via react-router-config's `matchRoutes` function.
 * Then iterate over all of the matched routes, if they've got a load function
 * call it.
 *
 * This helps us to make sure all the async code is loaded before rendering.
 */
export const ensureReady = (routeConfig, providedLocation?) => {
  const matches = matchRoutes(routeConfig, providedLocation || window.location.pathname);
  return Promise.all(matches.map((match) => {
    const { component } = match.route;
    if (component && (component as any).load) {
      return (component as any).load();
    }
    return undefined;
  }));
};
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

export const generateAsyncRouteComponent = ({ loader, Placeholder }) => {
  let Component = null;
  return class AsyncRouteComponent extends React.Component {
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
      // if (ComponentFromState) {
      //   return <ComponentFromState { ...this.props } />
      // }

      if (Placeholder) {
        // return <Placeholder { ...this.props } />;
      }

      return  null;
    }
  };
};
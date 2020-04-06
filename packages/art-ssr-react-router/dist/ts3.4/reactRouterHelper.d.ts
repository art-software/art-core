import React from 'react';
import { RouteConfigComponentProps } from 'react-router-config';
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
export declare const convertCustomRouteConfig: (customRouteConfig: CustomRouteConfig[], parentRoute?: string | undefined) => any;
export declare const generateAsyncRouteComponent: (component: any) => {
    new (props?: any, context?: any): {
        state: {
            Component: any;
        };
        componentWillMount(): void;
        updateState: () => void;
        render(): React.DetailedReactHTMLElement<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> | null;
        context: any;
        setState<K extends never>(state: {} | ((prevState: Readonly<{}>, props: Readonly<{}>) => {} | Pick<{}, K> | null) | Pick<{}, K> | null, callback?: (() => void) | undefined): void;
        forceUpdate(callback?: (() => void) | undefined): void;
        readonly props: Readonly<{}> & Readonly<{
            children?: React.ReactNode;
        }>;
        refs: {
            [key: string]: React.ReactInstance;
        };
        componentDidMount?(): void;
        shouldComponentUpdate?(nextProps: Readonly<{}>, nextState: Readonly<{}>, nextContext: any): boolean;
        componentWillUnmount?(): void;
        componentDidCatch?(error: Error, errorInfo: React.ErrorInfo): void;
        getSnapshotBeforeUpdate?(prevProps: Readonly<{}>, prevState: Readonly<{}>): any;
        componentDidUpdate?(prevProps: Readonly<{}>, prevState: Readonly<{}>, snapshot?: any): void;
        UNSAFE_componentWillMount?(): void;
        componentWillReceiveProps?(nextProps: Readonly<{}>, nextContext: any): void;
        UNSAFE_componentWillReceiveProps?(nextProps: Readonly<{}>, nextContext: any): void;
        componentWillUpdate?(nextProps: Readonly<{}>, nextState: Readonly<{}>, nextContext: any): void;
        UNSAFE_componentWillUpdate?(nextProps: Readonly<{}>, nextState: Readonly<{}>, nextContext: any): void;
    };
    load(): any;
    contextType?: React.Context<any> | undefined;
};
/**
 * First match the routes via react-router-config's `matchRoutes` function.
 * Then iterate over all of the matched routes, if they've got a load function
 * call it.
 *
 * This helps us to make sure all the async code is loaded before rendering.
 */
export declare const ensureReady: (routeConfig: any, providedLocation?: any) => Promise<any[]>;
export {};
//# sourceMappingURL=reactRouterHelper.d.ts.map

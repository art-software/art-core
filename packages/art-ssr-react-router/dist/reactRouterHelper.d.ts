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
export declare const convertCustomRouteConfig: (customRouteConfig: CustomRouteConfig[], parentRoute: string) => any;
export declare const generateAsyncRouteComponent: ({ loader, Placeholder }: {
    loader: any;
    Placeholder: any;
}) => {
    new (props?: any, context?: any): {
        state: {
            Component: any;
        };
        updateState(): void;
        render(): JSX.Element | null;
        setState<K extends never>(state: {} | ((prevState: Readonly<{}>, props: Readonly<{}>) => {} | Pick<{}, K> | null) | Pick<{}, K> | null, callback?: (() => void) | undefined): void;
        forceUpdate(callBack?: (() => void) | undefined): void;
        readonly props: Readonly<{
            children?: React.ReactNode;
        }> & Readonly<{}>;
        refs: {
            [key: string]: React.ReactInstance;
        };
    };
    load(): any;
    contextType?: React.Context<any> | undefined;
};
export {};

"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const react_router_config_1 = require("react-router-config");
exports.convertCustomRouteConfig = (customRouteConfig, parentRoute) => {
    return customRouteConfig.map((route) => {
        if (typeof route.path === 'function') {
            const pathResult = route.path(parentRoute || '').replace('//', '/');
            return {
                path: pathResult,
                component: route.component,
                exact: route.exact,
                routes: route.routes ? exports.convertCustomRouteConfig(route.routes, pathResult) : []
            };
        }
        const path = `${parentRoute}${route.path}`;
        return {
            path,
            component: route.component,
            exact: route.exact,
            routes: route.routes ? exports.convertCustomRouteConfig(route.routes, path) : []
        };
    });
};
exports.generateAsyncRouteComponent = (component) => {
    const { loader, Placeholder } = component;
    let Component;
    return class AsyncRouteComponent extends react_1.default.Component {
        constructor(props, context) {
            super(props, context);
            this.state = {
                Component
            };
            this.updateState = () => {
                if (this.state.Component !== Component) {
                    this.setState({
                        Component
                    });
                }
            };
        }
        static load() {
            return loader().then((ResolvedComponent) => {
                Component = ResolvedComponent.default || ResolvedComponent;
            }).catch((err) => {
                console.log('load component error: ', err);
            });
        }
        componentWillMount() {
            AsyncRouteComponent.load().then(this.updateState);
        }
        render() {
            const { Component: ComponentFromState } = this.state;
            if (ComponentFromState) {
                // return <ComponentFromState { ...this.props } />;
                return react_1.default.createElement(ComponentFromState, this.props);
            }
            if (Placeholder) {
                // return <Placeholder {...this.props} />;
                return react_1.default.createElement(Placeholder, this.props);
            }
            return null;
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
exports.ensureReady = (routeConfig, providedLocation) => {
    const matches = react_router_config_1.matchRoutes(routeConfig, providedLocation || window.location.pathname);
    return Promise.all(matches.map((match) => {
        const { component } = match.route;
        if (component && component.load) {
            try {
                component.load()
                    .catch((err) => {
                    console.log('err: ', err);
                });
                return component.load();
            }
            catch (err) {
                console.log('catched err: ', err);
            }
        }
        return undefined;
    }));
};

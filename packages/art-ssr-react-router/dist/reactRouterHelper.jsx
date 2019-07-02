"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
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
exports.generateAsyncRouteComponent = ({ loader, Placeholder }) => {
    let Component;
    return class AsyncRouteComponent extends react_1.default.Component {
        constructor(props, context) {
            super(props, context);
            this.state = {
                Component
            };
        }
        static load() {
            return loader().then((ResolvedComponent) => {
                Component = ResolvedComponent.default || ResolvedComponent;
            });
        }
        updateState() {
            if (this.state.Component !== Component) {
                this.setState({
                    Component
                });
            }
        }
        render() {
            const { Component: ComponentFromState } = this.state;
            if (ComponentFromState) {
                return <ComponentFromState {...this.props}/>;
            }
            if (Placeholder) {
                return <Placeholder />;
            }
            return null;
        }
    };
};

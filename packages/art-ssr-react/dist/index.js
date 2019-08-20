"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const react_dom_1 = __importDefault(require("react-dom"));
const server_1 = __importDefault(require("react-dom/server"));
const art_ssr_render_1 = require("art-ssr-render");
exports.renderReact = (name, component, css, store) => {
    return art_ssr_render_1.ssrRender({
        server() {
            return (props) => {
                const contents = server_1.default.renderToString(react_1.default.createElement(component, props));
                console.log('store.getState(): ', store && store.getState());
                return {
                    html: art_ssr_render_1.serialize(name, contents, props),
                    css: css && [...css].join(''),
                    state: store && JSON.stringify(store.getState())
                };
            };
        },
        client() {
            const payloads = art_ssr_render_1.load(name);
            if (payloads) {
                payloads.forEach((payload) => {
                    const { node, data } = payload;
                    const element = react_1.default.createElement(component, data);
                    if (react_dom_1.default.hydrate) {
                        react_dom_1.default.hydrate(element, node);
                    }
                    else {
                        react_dom_1.default.render(element, node);
                    }
                });
            }
            return component;
        }
    });
};
exports.renderReactStatic = (name, component) => {
    return art_ssr_render_1.ssrRender({
        server() {
            return (props) => {
                return server_1.default.renderToStaticMarkup(react_1.default.createElement(component, props));
            };
        },
        client() { }
    });
};

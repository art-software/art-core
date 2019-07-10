"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const react_dom_1 = __importDefault(require("react-dom"));
const server_1 = __importDefault(require("react-dom/server"));
const art_ssr_1 = __importStar(require("art-ssr"));
exports.renderReact = (name, component) => {
    return art_ssr_1.default({
        server() {
            return (props) => {
                const contents = server_1.default.renderToString(react_1.default.createElement(component, props));
                return art_ssr_1.serialize(name, contents, props);
            };
        },
        client() {
            const payloads = art_ssr_1.load(name);
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
    return art_ssr_1.default({
        server() {
            return (props) => {
                return server_1.default.renderToStaticMarkup(react_1.default.createElement(component, props));
            };
        },
        client() { }
    });
};

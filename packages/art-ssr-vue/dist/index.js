"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vue_server_renderer_1 = require("vue-server-renderer");
const art_ssr_render_1 = require("art-ssr-render");
exports.renderVue = (name, Component, css) => {
    return art_ssr_render_1.ssrRender({
        server() {
            return async (props) => {
                const vm = new Component({ propsData: props });
                const renderer = vue_server_renderer_1.createRenderer();
                const contents = await renderer.renderToString(vm);
                return {
                    html: art_ssr_render_1.serialize(name, contents, props),
                    css: css && [...css].join('')
                };
            };
        },
        client() {
            const payloads = art_ssr_render_1.load(name);
            if (payloads) {
                payloads.forEach((payload) => {
                    const { node, data } = payload;
                    const vm = new Component({
                        propsData: data
                    });
                    vm.$mount(node.children[0]);
                });
            }
            return Component;
        }
    });
};

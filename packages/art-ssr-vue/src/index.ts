import vue from 'vue';
import { createRenderer } from 'vue-server-renderer';
import { ssrRender, serialize, load } from 'art-ssr-render';

export const renderVue = (name: string, Component: any, css?: Set<string> | string[]) => {
  return ssrRender({
    server() {
      return async (props) => {
        const vm = new Component({ propsData: props });

        const renderer = createRenderer();
        const contents = await renderer.renderToString(vm);

        return {
          html: serialize(name, contents, props),
          css: css && [...css].join('')
        };
      };
    },

    client() {
      const payloads = load(name);
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
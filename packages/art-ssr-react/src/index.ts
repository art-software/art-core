import React from 'react';
import ReactDOM from 'react-dom';
import ReactDOMServer from 'react-dom/server';
import { ssrRender, serialize, load } from 'art-ssr-render';
import { Store } from 'redux';

export const renderReact = (name: string, component: any, css?: Set<string> | string[], store?: Store<any, any>) => {
  return ssrRender({
    server() {
      return (props) => {
        const contents = ReactDOMServer.renderToString(React.createElement(component, props));
        console.log('store.getState(): ', store && store.getState());
        return {
          html: serialize(name, contents, props),
          css: css && [...css].join(''),
          state: store && JSON.stringify(store.getState())
        };
      };
    },

    client() {
      const payloads = load(name);
      if (payloads) {
        payloads.forEach((payload) => {
          const { node, data } = payload;
          const element = React.createElement(component, data);

          if (ReactDOM.hydrate) {
            ReactDOM.hydrate(element, node);
          } else {
            ReactDOM.render(element, node);
          }
        });
      }

      return component;
    }
  });
};

export const renderReactStatic = (name, component) => {
  return ssrRender({
    server() {
      return (props) => {
        return ReactDOMServer.renderToStaticMarkup(React.createElement(component, props));
      };
    },

    client() {}
  });
};
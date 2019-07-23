import React from 'react';
import ReactDOM from 'react-dom';
import ReactDOMServer from 'react-dom/server';
import ssrRender, { serialize, load } from 'art-ssr';

export const renderReact = (name: string, component) => {
  return ssrRender({
    server() {
      return (props) => {
        const contents = ReactDOMServer.renderToString(React.createElement(component, props));
        return serialize(name, contents, props);
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
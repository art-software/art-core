import React from 'react';
import { renderReact } from '../../../../../packages/art-ssr-react';
import { convertCustomRouteConfig, ensureReady } from '../../../../../packages/art-ssr-react-router/dist/reactRouterHelper';
import { StaticRouter } from 'react-router-dom';
import { renderRoutes } from 'react-router-config';
import StyleContext from 'isomorphic-style-loader/StyleContext';
import Home from './views/Home';

const css = new Set(); // CSS for all rendered React components
const insertCss = (...styles) => styles.forEach((style) => {
  const getCss = style._getCss();
  return css.add(getCss);
});
function HomeRoute() {
  return (
    <StyleContext.Provider value={{ insertCss }}><Home /></StyleContext.Provider>
  );
}
const routes = [
  {
    component: HomeRoute,
    path: (parentRoute) => `${parentRoute}/`
  }
];

// TODO figure out tslint error reason
const routeConfig = convertCustomRouteConfig(routes as any);

class IndexSSR extends React.Component {
  constructor(props) {
    super(props);
  }

  public componentDidUpdate(prev, curr) {
    console.log('prev: ', prev);
  }

  public render() {
    const { url } = (this.props as any).data;
    return (
      <StaticRouter location={url} context={{}}>
        {
          renderRoutes(routeConfig)
        }
      </StaticRouter>
    );
  }
}

export default {
  Main: (props: any) => {
    const url = (props.data || {}).url;
    console.log('props: ', props);
    return ensureReady(routeConfig, url).then(() => {
      return renderReact('Main', IndexSSR, css);
    });
  }
};
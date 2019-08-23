import React from 'react';
import { renderReact } from '../../../../../packages/art-ssr-react';
import { convertCustomRouteConfig, ensureReady } from '../../../../../packages/art-ssr-react-router/dist/reactRouterHelper';
import { StaticRouter, matchPath } from 'react-router-dom';
import { renderRoutes } from 'react-router-config';
import StyleContext from 'isomorphic-style-loader/StyleContext';
import routes from './routes';
import createStore from './store/store';
import { Provider as ReduxProvider } from 'react-redux';
// TODO figure out tslint error reason
const routeConfig = convertCustomRouteConfig(routes as any);
console.log('routeConfig: ', routeConfig);

const store = createStore();

const css = new Set(); // CSS for all rendered React components
const insertCss = (...styles) => styles.forEach((style) => {
  const getCss = style._getCss();
  return css.add(getCss);
});

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
      <ReduxProvider store={store}>
        <StyleContext.Provider value={{ insertCss }}>
          <StaticRouter location={url} context={{}}>
            {
              renderRoutes(routeConfig)
            }
          </StaticRouter>
        </StyleContext.Provider>
      </ReduxProvider>
    );
  }
}

export default {
  Main: (props: any) => {
    const url = (props.data || {}).url;
    console.log('props: ', props);
    return ensureReady(routeConfig, url).then(() => {
      const dataRequirements =
        routeConfig
          .filter((route) => matchPath(url, route)) // filter matching paths
          .map((route) => route.component) // map to components
          .filter((comp) => comp.serverFetch) // check if components have data requirement
          .map((comp) => store.dispatch(comp.serverFetch())); // dispatch data requirement
      return Promise.all(dataRequirements).then(() => {
        return renderReact('Main', IndexSSR, css, store);
      });
    });
  }
};
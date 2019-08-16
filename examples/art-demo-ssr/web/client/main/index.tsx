import React from 'react';
import { renderReact } from '../../../../../packages/art-ssr-react';
import { BrowserRouter } from 'react-router-dom';
import { renderRoutes } from 'react-router-config';
import { convertCustomRouteConfig, ensureReady } from '../../../../../packages/art-ssr-react-router/dist/reactRouterHelper';
import StyleContext from 'isomorphic-style-loader/StyleContext';
import routes from './routes';
const routeConfig = convertCustomRouteConfig(routes as any);

const insertCss = (...styles) => {
  const removeCss = styles.map((style) => {
    return style._insertCss();
  });
  return () => removeCss.forEach((dispose) => dispose());
};

class IndexCSR extends React.Component<any, any> {
  constructor(props, context) {
    super(props, context);
  }

  public render() {
    console.log('this.props: ', this.props);
    return (
      <StyleContext.Provider value={{ insertCss }}>
        <BrowserRouter>
          {renderRoutes(routeConfig)}
        </BrowserRouter>
      </StyleContext.Provider>
    );
  }
}

export default ensureReady(routeConfig).then(() => {
  renderReact('Main', IndexCSR);
});
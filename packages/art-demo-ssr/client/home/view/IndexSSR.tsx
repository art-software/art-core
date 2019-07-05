import React from 'react';
import { StaticRouter } from 'react-router-dom';
// import Home from './Home';
// import About from './About';
// import Mine from './Mine';
import { renderRoutes } from 'react-router-config';
import routes from '../routes';

export default class IndexSSR extends React.Component {
  constructor(props) {
    super(props);
  }

  public render() {
    console.log('this.props: ', this.props);
    const { url } = (this.props as any).data;
    return (
      <StaticRouter location={url} context={{}}>
        {/* <div>
          <ul>
            <li>
              <Link to="/home">Home</Link>
            </li>
            <li>
              <Link to="/about">About</Link>
            </li>
            <li>
              <Link to="/mine">Mine</Link>
            </li>
          </ul>

          <hr />

          <Route exact path="/home" component={Home} />
          <Route path="/about" component={About} />
          <Route path="/mine" component={Mine} />
        </div> */}
        {
          renderRoutes(routes)
        }
      </StaticRouter>
    );
  }
}
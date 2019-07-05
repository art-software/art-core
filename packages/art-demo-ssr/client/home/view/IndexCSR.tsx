import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { renderRoutes } from 'react-router-config';
import routes from '../routes';

export default class IndexSSR extends React.Component {
  constructor(props) {
    super(props);
  }

  public render() {
    console.log('this.props: ', this.props);
    return (
      <BrowserRouter>
        {
          renderRoutes(routes)
        }
      </BrowserRouter>
    );
  }
}
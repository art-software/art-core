import React from 'react';
import { Link } from 'react-router-dom';
import { renderRoutes } from 'react-router-config';

export default class Index extends React.Component {
  constructor(props) {
    super(props);
  }

  public render() {
    return (
      <div>
        <ul>
          <li>
            <Link to="/product/intro">Intro</Link>
          </li>
          <li>
            <Link to="/product/detail">Detail</Link>
          </li>
        </ul>

        <hr />

        {
          renderRoutes((this.props as any).route.routes)
        }
      </div>
    );
  }
}
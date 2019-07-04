import React from 'react';
import { BrowserRouter, Route, Link } from 'react-router-dom';
import Home from './Home';
import About from './About';
import Mine from './Mine';

export default class Index extends React.Component {

  public render() {
    return (
      <BrowserRouter>
        <div>
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
        </div>
      </BrowserRouter>
    );
  }
}
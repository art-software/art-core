import 'art-lib-react/src/styles';
import './styles';
import '@babel/polyfill';
import React, { Fragment } from 'react';
import ReactDOM from 'react-dom';
import Routes from './routes';
import { BrowserRouter } from 'react-router-dom';
import enableServiceWorker from '../../service-worker/sw-register';
import SwRefresh from './common/components/sw-refresh';
enableServiceWorker();

ReactDOM.render(
  <BrowserRouter>
    <Routes />
  </BrowserRouter>,
  document.getElementById('app'));

window.addEventListener('showRefresh', (event) => {
  ReactDOM.render(
    <Fragment>
      <BrowserRouter>
        <Routes />
      </BrowserRouter>
      <SwRefresh />
    </Fragment>,
    document.getElementById('app'));
});
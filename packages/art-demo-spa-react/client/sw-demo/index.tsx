import 'art-lib-react/src/styles';
import './styles';
import React, { Fragment } from 'react';
import ReactDOM from 'react-dom';
import Routes from './routes';
import { BrowserRouter } from 'react-router-dom';
import SwRefresh from 'client/common/components/sw-refresh';
import setServiceWorker from '../../service-worker/sw-register';

setServiceWorker();

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
import 'art-lib-react/src/styles';
import './styles';
import '@babel/polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import Routes from './routes';
import { BrowserRouter } from 'react-router-dom';
import enableServiceWorker from '../../service-worker/sw-register';
enableServiceWorker();

ReactDOM.render(
  <BrowserRouter>
    <Routes />
  </BrowserRouter>,
  document.getElementById('app'));
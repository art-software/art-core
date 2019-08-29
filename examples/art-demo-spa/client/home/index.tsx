import '../../../../packages/art-lib-react/dist/styles/index';
import './styles';
import React from 'react';
import ReactDOM from 'react-dom';
import Routes from './routes';
import { BrowserRouter } from 'react-router-dom';

ReactDOM.render(
  // @ts-ignore
  <BrowserRouter>
    <Routes />
  </BrowserRouter>,
  document.getElementById('app'));
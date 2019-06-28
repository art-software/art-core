import Home from './view/index';
import { renderReact } from 'art-ssr-react';

export default {
  Home: renderReact('Home', Home)
};
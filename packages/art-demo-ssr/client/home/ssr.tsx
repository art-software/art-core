import { renderReact } from 'art-ssr-react';
import IndexSSR from '../home/view/IndexSSR';

export default {
  Home: renderReact('Home', IndexSSR)
};
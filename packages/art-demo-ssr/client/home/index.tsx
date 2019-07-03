import { renderReact } from 'art-ssr-react';
import Home from '../home/view/Home';
import About from '../home/view/About';

renderReact('Home', Home);
renderReact('About', About);
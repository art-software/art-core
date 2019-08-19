import Home from './views/Home';

export default [
  {
    component: Home,
    path: (parentRoute) => `${parentRoute}/`
  }
];
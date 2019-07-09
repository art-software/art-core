import RenderServer from 'art-ssr/dist/RenderServer';
import createGetComponent from 'art-ssr/dist/createGetComponent';
import path from 'path';

const renderServer = new RenderServer({
  devMode: true,

  getComponent: createGetComponent({
    Home: path.join(__dirname, '../../debug-ssr/demo/ssr/react/home/bundle.js'),
    Product: path.join(__dirname, '../../debug-ssr/demo/ssr/react/product/bundle.js')
  }),

  host: 'localhost',

  port: 8888
});

renderServer.start();
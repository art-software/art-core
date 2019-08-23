import RenderServer from '../../../../packages/art-ssr-render/dist/RenderServer';
import createGetComponent from '../../../../packages/art-ssr-render/dist/createGetComponent';
import path from 'path';

const renderServer = new RenderServer({
  host: 'me.dev.com',
  port: 8899,
  getComponent: createGetComponent({
    Main: path.join(__dirname, '../../web/debug-ssr/demo/ssr/main/bundle.js')
  })
});

renderServer.start();
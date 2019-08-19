import { RenderServer, createGetComponent } from '../../../../packages/art-ssr-render/dist/index';
import path from 'path';

const renderServe = new RenderServer({
  host: 'me.dev.com',
  port: 8899,
  getComponent: createGetComponent({
    Main: path.join(__dirname, '../../web/debug-ssr/demo/ssr/main/bundle.js')
  })
});

renderServe.start();
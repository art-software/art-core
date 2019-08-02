import RenderServer from '../../../../packages/art-ssr-render/dist/RenderServer';

const renderServe = new RenderServer({
  host: 'me.dev.com',
  port: 8899
});

renderServe.start();
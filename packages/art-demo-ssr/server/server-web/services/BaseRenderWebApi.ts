import Aggregator from 'art-ssr-aggregator-node/dist/aggregator';

const SERVER_HOST_RENDER = process.env.SERVER_HOST_RENDER || '';
const SERVER_PORT_RENDER = process.env.SERVER_PORT_RENDER || '';

export const aggregator = new Aggregator({
  url: `http://${SERVER_HOST_RENDER}:${SERVER_PORT_RENDER}/batch`
});
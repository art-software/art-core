import Aggregator from '../../../../../packages/art-ssr-aggregator-node/dist/aggregator';

export const aggregator = new Aggregator({
  url: '/batch',
  config: {
    baseURL: 'http://me.dev.com:8899/'
  }
});
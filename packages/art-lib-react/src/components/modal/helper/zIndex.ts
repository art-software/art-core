import { uniqueFactory } from 'art-lib-utils/src/utils/unique';

const zIndexFactory = uniqueFactory('zIndex', 100);

export default () => {
  return zIndexFactory().replace('zIndex', '');
};
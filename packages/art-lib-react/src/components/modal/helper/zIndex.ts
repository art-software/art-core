import { uniqueFactory } from '../../../utils/unique';

const zIndexFactory = uniqueFactory('zIndex', 100);

export default () => {
  return zIndexFactory().replace('zIndex', '');
};
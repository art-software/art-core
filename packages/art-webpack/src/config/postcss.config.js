import { isProd } from '../utils/env';

module.exports = {
  plugins: {
    'cssnano': isProd() ? {} : false
  }
};
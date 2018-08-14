import nconf from 'nconf';
import paths from './paths';
import * as path from 'path';
const artConfig = require(paths.appArtConfig);

nconf.argv().env()
  .file({
    file: 'environment.json',
    dir: path.resolve(__dirname, '../../src/config/'),
    search: true
  })
  .merge('art', artConfig);

export default nconf;
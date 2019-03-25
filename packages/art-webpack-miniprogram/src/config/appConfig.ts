import nconf from 'nconf';
import paths from './paths';
import * as path from 'path';
const artConfig = require(paths.appArtConfig);

nconf.argv().env()
  .file({
    file: path.resolve(__dirname, '../environment.json')
  })
  .merge('art', artConfig);

export default nconf;
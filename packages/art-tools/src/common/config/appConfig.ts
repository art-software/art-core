import nconf from 'nconf';
import paths from './paths';
const artConfig = require(paths.appArtConfig);

nconf.argv().env()
  .merge('art', artConfig);

export default nconf;
import nconf from 'nconf';
import paths from './paths';
const artConfig = require(paths.appArtConfig);

nconf.argv().env().file({file: artConfig});

export default nconf;
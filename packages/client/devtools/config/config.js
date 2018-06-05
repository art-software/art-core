const path = require('path');
const nconf = require('nconf');

const env = process.env.NODE_ENV || 'dev';

const baseConfigFilePath = path.join(__dirname, './config-files');
const clientRoot = path.resolve(__dirname, '../../');

/**
 * this file has the highest configuration priority.
 * Add properties to it if you woule like these properties overrides everything else.
 */
nconf.file('configOverrides', path.join(baseConfigFilePath, 'config.overrides.json'));
nconf.set('paths:clientRoot', clientRoot);
nconf.set('paths:src', path.resolve(clientRoot, './src'));
nconf.set('paths:dist', path.resolve(clientRoot, './dist'));

/**
 * load the values parsed from process.argv by yargs into the configuration
 */
nconf.argv();

/**
 * load configurations from env parameters
 */
nconf.env();

/**
 * load configurations according to env
 */
nconf.file('configEnv', path.join(baseConfigFilePath, `config.${env}.json`));

module.exports = nconf;
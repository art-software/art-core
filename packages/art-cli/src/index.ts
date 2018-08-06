import { Argv } from 'yargs';
import { cyanBoldText, warningText } from './utils/chalkColors';
const version = require('../package.json').version;

const yargs: Argv = require('yargs');

yargs
  .commandDir('./commands', {
    extensions: ['js', 'ts']
  })
  .usage(`${cyanBoldText('Usage:')} $0 <command> [options]`)
  .demandCommand(1, warningText(`You need at least one ${cyanBoldText('<command>')} before moving on`))
  .updateStrings({
    'Commands:': cyanBoldText('Commands:'),
    'Options:': cyanBoldText('Options:')
  })
  .version(version)
  .alias('v', 'version')
  .alias('h', 'help');
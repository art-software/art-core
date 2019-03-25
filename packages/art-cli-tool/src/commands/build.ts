import { CommandModule, Argv } from 'yargs';
import chalk from 'chalk';
import { webpackTask } from '../helpers/webpackTask';

// TODO add miniprogram support
class BuildCommand implements CommandModule {

  public readonly command = 'build';

  public describe = chalk.black.bold(`build an art project with release mode `);

  public builder (args: Argv) {
    return args
      .example(`$0 build -m="a,b,c"`, chalk.black.bold('build production version with given modules'))
      .option('m', {
        alias: 'modules',
        demandOption: true,
        // default: '',
        describe: chalk.black.bold('you should project modules')
      })
      .updateStrings({
        'Examples:': chalk.cyan.bold('Examples:')
      });
  }

  public handler (args: any): void {
    webpackTask('build', { modules: args.modules });
  }
}

module.exports = new BuildCommand();
import { CommandModule, Argv } from 'yargs';
import chalk from 'chalk';
import { webpackDll } from '../helpers/webpackTask';

class DllCommand implements CommandModule {

  public readonly command = 'dll';

  public describe = chalk.black.bold(`using DllPlugin an venus project with optimized mode `);

  public builder(args: Argv) {
    return args.example(`$0 dll`, chalk.black.bold('build optimized with DllPlugin'))
      .updateStrings({
        'Examples:': chalk.cyan.bold('Examples:')
      });
  }

  public handler() {
    webpackDll();
  }
}

module.exports = new DllCommand();
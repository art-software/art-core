import { CommandModule, Argv } from 'yargs';
import chalk from 'chalk';
import { moduleTask } from '../helpers/moduleTask';

class PublishCommand implements CommandModule {

  public readonly command = 'publish';

  public describe = chalk.black.bold(`publish compiled art modules `);

  public builder (args: Argv) {
    return args
      .example(`$0 publish -m="a,b,c"`, chalk.black.bold('publish compiled given modules'))
      .option('m', {
        alias: 'modules',
        demandOption: true,
        describe: chalk.black.bold('you should project modules')
      })
      .updateStrings({
        'Examples:': chalk.cyan.bold('Examples:')
      });
  }

  public handler (args: any): void {
    moduleTask('publish', { modules: args.modules });
  }
}

module.exports = new PublishCommand();
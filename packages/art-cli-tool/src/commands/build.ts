import { CommandModule, Argv } from 'yargs';
import chalk from 'chalk';
import { webpackTask } from '../helpers/webpackTask';
import { getProjectType } from '../helpers/projectType';
import { ProjectTypes } from '../enums/ProjectTypes';

class BuildCommand implements CommandModule {

  public readonly command = 'build';

  public describe = chalk.black.bold(`build an art project with release mode `);

  public builder (args: Argv) {
    const moduleRequired = getProjectType() !== ProjectTypes.miniprogram;
    return args
      .example(`$0 build -m="a,b,c"`, chalk.black.bold('build production version with given modules'))
      .option('m', {
        alias: 'modules',
        demandOption: moduleRequired,
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
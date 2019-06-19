import { CommandModule, Argv } from 'yargs';
import { cyanBoldText, greenText } from 'art-dev-utils/lib/chalkColors';
import { webpackTask } from '../helpers/webpackTask';
import { getProjectType } from '../helpers/projectType';
import { ProjectTypes } from '../enums/ProjectTypes';
import chalk from 'chalk';

class ServeCommand implements CommandModule {
  public readonly command = 'serve';

  public readonly desc = chalk.black.bold('Serve one or more modules');

  public builder(args: Argv): Argv {
    const moduleRequired = getProjectType() !== ProjectTypes.miniprogram;
    return args.usage(`${cyanBoldText('Usage:')} $0 serve --modules="modulePath1, modulePath2, ..."`)
      .options('modules', {
        alias: 'm',
        describe: 'the modules you would like to serve',
        demandOption: moduleRequired
      })
      .options('port', {
        alias: 'p',
        describe: 'mock server port',
        demandOption: false
      })
      .example(`${greenText('$0 serve -modules="client/test"')}`, 'Serve the client/test module');
  }

  public handler(args: any): void {
    webpackTask('serve', {
      modules: args.modules,
      port: args.port
    });
  }
}

module.exports = new ServeCommand();
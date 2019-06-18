import { CommandModule, Argv } from 'yargs';
import { cyanBoldText, greenText } from 'art-dev-utils/lib/chalkColors';
import { npmUpdate } from '../helpers/npmUpdate';
import chalk from 'chalk';

class UpdateCommand implements CommandModule {

  public readonly command = 'update';

  public readonly desc = chalk.black.bold('Check project art dependencies updates, conforming to Semantic Versioning');

  public builder(args: Argv): Argv {
    return args.usage(`${cyanBoldText('Usage:')} $0 upgrade`)
      .example(`${greenText('$0 update')}`, 'Update project art dependencies');
  }

  public handler(): void {
    npmUpdate();
  }
}

module.exports = new UpdateCommand();
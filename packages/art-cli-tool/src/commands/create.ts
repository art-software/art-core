import { CommandModule, Argv } from 'yargs';
import chalk from 'chalk';
import emptyDir from 'empty-dir';
import { basename, join } from 'path';
import inquirer, { Question, Answers } from 'inquirer';
import { create, ProjectScaffold, ModuleScaffold } from '../scaffold/index';
import { Scaffolds } from '../enums/Scaffolds';
import { CreateCmdTypes } from '../enums/CreateCmdTypes';
import resolveAppPath from 'art-dev-utils/lib/resolveAppPath';
import { existsSync } from 'fs';
const scaffolds = [Scaffolds.react, Scaffolds.miniprogram, Scaffolds.ssrReact, Scaffolds.ssrVue];

class CreateCommand implements CommandModule {

  public readonly command = 'create';

  public describe = chalk.black.bold(`create art scaffold ${scaffolds.join(',')} `);

  public builder(argv: Argv) {
    return argv
      .usage(`\n${chalk.cyan.bold('Usage:')} $0 create ${chalk.cyan.bold('<scaffold>')} [options]`)
      .command(CreateCmdTypes.project, 'create a new project', (args: Argv) => {
        return args
          .usage(`\n${chalk.cyan.bold('Usage:')} $0 ${chalk.cyan.bold('create project [-p=""]')}`)
          .option('s', {
            alias: 'scaffold',
            choices: scaffolds,
            demandOption: true,
            describe: chalk.black.bold('which scaffold project you chould like to create?')
          })
          .updateStrings({
            'Invalid values:': chalk.red.bold('Invalid values:')
          });
      }, this.handler)
      .command(CreateCmdTypes.module, 'create a new module within existed project workspace', (args: Argv) => {
        return args
          .usage(`\n${chalk.cyan.bold('Usage:')} $0 ${chalk.cyan.bold('create module [-s=""]')}`)
          .option('s', {
            alias: 'scaffold',
            choices: scaffolds,
            demandOption: true,
            describe: chalk.black.bold('which scaffold module you chould like to create?')
          })
          .updateStrings({
            'Invalid values:': chalk.red.bold('Invalid values:')
          });
      }, this.handler)
      // create solution | module
      .demandCommand(2, 'You need at least two command before moving on')
      .updateStrings({
        'Commands:': chalk.cyan.bold('Scaffolds:')
      })
      .help('help');
  }

  public handler = (argv) => {

    const commandType = argv._[1];
    if (argv.scaffold === Scaffolds.ssrVue) {
      console.log(chalk.magenta(`Scaffold ${chalk.green(argv.scaffold)} is not supported for now!`));
      return;
    }
    const fileFilter = (file: string) => {
      const fileBaseName = basename(file);
      return fileBaseName === '.' || fileBaseName !== '.git' || fileBaseName[0] !== '.';
    };
    const isEmpty = emptyDir.sync('.', fileFilter);

    if (commandType === CreateCmdTypes.project && !isEmpty) {
      return console.log(
        chalk.red('\ncurrent working dir is not empty, please create new another project directory!')
      );
    }

    (this.commandEntry(commandType) as Promise<ProjectScaffold | ModuleScaffold>)
      .then((answers) => {
        const artConfigExist = existsSync(resolveAppPath('art.config.js'));

        if (artConfigExist) {
          const appConfig = require(resolveAppPath('art.config.js'));

          const { moduleName } = answers;
          const modulesKey = Object.keys(appConfig.webpack.entry);
          const projectVirtualPath = appConfig.projectVirtualPath;

          let modulePath = join(projectVirtualPath, moduleName);
          if (modulePath.endsWith('/')) {
            modulePath = modulePath.slice(0, modulePath.length - 1);
          }

          if (modulesKey.indexOf(modulePath) < 0) {
            create(argv.scaffold, commandType, answers);
          } else {
            console.log(chalk.yellow(`module ${chalk.green(moduleName)} has existed!`));
          }
        } else {
          create(argv.scaffold, commandType, answers);
        }
      })
      .catch((err) => {
        return console.log(chalk.red(err));
      });
  }

  private commandEntry(commandType: string): Promise<Answers> | undefined {
    if (commandType === CreateCmdTypes.project) {
      return this.createProject();
    } else if (commandType === CreateCmdTypes.module) {
      return this.createModule();
    }
  }

  private createProject(): Promise<Answers> {
    const questions: Question[] = [
      {
        type: 'input',
        name: 'projectName',
        message: 'project name:',
        default: () => {
          return basename(process.cwd());
        },
        validate: (input) => /^[^0-9]?[A-Za-z0-9-]+$/.test(input)
      },
      {
        type: 'input',
        name: 'projectDescription',
        message: 'project desc:'
      },
      {
        type: 'input',
        name: 'projectVirtualPath',
        message: 'project virtual path:',
        validate: this.nameWithSlashValidate(false)
      },
      {
        type: 'input',
        name: 'moduleName',
        message: 'module name:',
        validate: this.nameWithSlashValidate(false)
      }
    ];

    return inquirer.prompt(questions).then((answers: Answers) => answers);
  }

  private createModule(): Promise<Answers> {
    const questions = [
      {
        type: 'input',
        name: 'moduleName',
        message: 'module name:',
        validate: this.nameWithSlashValidate(false)
      }
    ];

    return inquirer.prompt(questions).then((answer: Answers) => answer);
  }

  private nameWithSlashValidate(required: boolean = true) {
    return (input) => {
      return required ? /^[^0-9]?[A-Za-z0-9-/]+$/.test(input) : true;
    };
  }
}

module.exports = new CreateCommand();

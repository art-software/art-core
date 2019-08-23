import { CommandModule, Argv } from 'yargs';
import chalk from 'chalk';
import { Equipments } from '../enums/Equipments';
import inquirer, { Questions, Answers } from 'inquirer';
import parseModules from 'art-dev-utils/lib/parseModules';
import path from 'path';
import copyEquipmentFiles from '../helpers/copyEquipmentFiles';
import executeNodeScript from 'art-dev-utils/lib/executeNodeScript';
import fs from 'fs-extra';
import { ChildProcess } from 'child_process';
import spawn from 'cross-spawn';

const equipments = [Equipments.ServiceWorker];

class EquipCommand implements CommandModule {

  public readonly command = 'equip';

  public describe = chalk.black.bold(`equip existing modules with ${equipments.join(',')}`);

  public builder(argv: Argv): Argv {
    return argv
      .usage(`\n${chalk.cyan.bold('Usage:')} $0 equip [options]`)
      .option('m', {
        alias: 'modules',
        demandOption: true,
        describe: chalk.black.bold('The modules you would like to equip')
      })
      .updateStrings({
        'Invalid values:': chalk.red.bold('Invalid values:')
      })
      .help();
  }

  public handler(argv): void {
    const questions: Questions = [{
      type: 'list',
      name: 'equipment',
      choices: equipments,
      message: chalk.white('Which equipment you would like to choice?')
    }];

    inquirer.prompt(questions).then((answers: Answers) => {
      const modules = parseModules(argv.modules);
      const equipment = answers.equipment.replace(/\s+/g, '-');
      equipModule(modules, equipment);
    });
  }
}

const equipModule = (modules: string[], equipment: string) => {
  const equipmentFrom = path.join(__dirname, '../../equipments', equipment);
  const equipmentTo = path.join(process.cwd(), 'client/common/equipments', equipment);
  copyEquipmentFiles(equipmentFrom, equipmentTo)
    .then(() => {
      if (equipment === 'service-worker') {
        // 临时文件，用来传递模块数据
        const tempFilePath = path.resolve(process.cwd(), 'modules.temp.json');
        try {
          fs.outputJsonSync(tempFilePath, { modules });
        } catch (error) {
          fs.remove(tempFilePath);
          console.error(error);
        }

        // 修改各个模块入口文件
        const setSwConfigInEntryFile = path.resolve(__dirname, '../helpers/setSwConfigInEntryFile');
        const childProcess1 = executeNodeScript('node', setSwConfigInEntryFile);

        // 修改art.config.js文件
        const setSwConfigInArtConfigFile = path.resolve(__dirname, '../helpers/setSwConfigInArtConfigFile');
        const childProcess2 = executeNodeScript('node', setSwConfigInArtConfigFile);

        // 所有文件修改完成之后，询问是否需要自动安装workbox-window模块
        awaitAllChildProcessesExit([childProcess1, childProcess2]).then(() => {
          inquireNpmInstall();
        });
      }
    });
};

const awaitAllChildProcessesExit = (childs: ChildProcess[]) => {
  const promises = childs.map((child) => {
    return new Promise((resolve, reject) => {
      child.on('exit', (code) => {
        if (code !== 0) { reject(); return; }
        resolve();
      });
    });
  });
  return Promise.all(promises);
};

const inquireNpmInstall = () => {
  const packageJsonPath = path.resolve(process.cwd(), 'package.json');
  fs.readJson(packageJsonPath)
    .then((jsonData) => {
      const allDependencies = Object.assign({}, jsonData.dependencies, jsonData.devDependencies);
      if (allDependencies['workbox-window'] === undefined) {
        const questions: Questions = [{
          type: 'confirm',
          name: 'isAutoInstall',
          message: chalk.white('Would you like to install workbox-window right now?')
        }];

        inquirer.prompt(questions).then((answers: Answers) => {
          const isAutoInstall = answers.isAutoInstall;
          if (isAutoInstall) {
            const childProcess = spawn('yarn', ['add', 'workbox-window'], { stdio: 'inherit' });

            // tslint:disable-next-line:no-unused-expression
            childProcess.stdout && childProcess.stdout.on('data', (data: Buffer) => {
              console.log(data.toString());
            });

            // tslint:disable-next-line:no-unused-expression
            childProcess.stderr && childProcess.stderr.on('data', (data: Buffer) => {
              console.log('Error: ', data.toString());
            });

            childProcess.on('close', (code) => {
              if (code !== 0) {
                console.log(chalk.yellow(`  Exited with code: ${code}.`));
                return;
              }
            });
          } else {
            console.log('');
            console.log(chalk.yellow(`  Service worker is dependent on ${chalk.cyanBright('workbox-window')} module, please manual install it by yourself.`));
            console.log(chalk.gray('  Commands example: ') + chalk.white('yarn add workbox-window'));
            console.log('');
          }
        });
      } else {
        console.log(chalk.gray(`  You have installed workbox-window module.`));
      }
    });
};

module.exports = new EquipCommand();
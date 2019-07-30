import { CommandModule, Argv } from 'yargs';
import chalk from 'chalk';
import { Equipments } from '../enums/Equipments';
import inquirer, { Questions, Answers } from 'inquirer';
import parseModules from 'art-dev-utils/lib/parseModules';
import path from 'path';
import copyEquipmentFiles from '../helpers/copyEquipmentFiles';
import setSwConfigInArtConfigFile from '../helpers/setSwConfigInArtConfigFile';
import setSwConfigInEntryFile from '../helpers/setSwConfigInEntryFile';

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
      modules.forEach((module) => {
        equipModule(module, equipment);
      });
    });
  }
}

const equipModule = (module: string, equipment: string) => {
  const equipmentFrom = path.join(__dirname, '../../equipments', equipment);
  const equipmentTo = path.join(process.cwd(), equipment);
  copyEquipmentFiles(equipmentFrom, equipmentTo);
  if (equipment === 'service-worker') {
    setSwConfigInArtConfigFile();
    setSwConfigInEntryFile();
  }
};

module.exports = new EquipCommand();
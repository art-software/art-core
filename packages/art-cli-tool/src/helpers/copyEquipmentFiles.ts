import fs from 'fs-extra';
import chalk from 'chalk';

const copyEquipmentFiles = (from, to) => {
  fs.copy(from, to).then(() => {
    console.log(chalk.green('  Copy equipment files success!'));
  });
};

export default copyEquipmentFiles;
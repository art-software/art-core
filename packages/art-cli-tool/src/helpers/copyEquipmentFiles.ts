import fs from 'fs-extra';
import chalk from 'chalk';

const copyEquipmentFiles = (from: string, to: string) => {
  return new Promise((resolve) => {
    const isExistEquipmentFiles = fs.existsSync(to);
    if (isExistEquipmentFiles) {
      console.log(chalk.gray('  Equipment files has existed, not copy again.'));
      resolve();
    } else {
      fs.copy(from, to).then(() => {
        console.log(chalk.green('  Copy equipment files success!'));
        resolve();
      });
    }
  });
};

export default copyEquipmentFiles;
import chalk from 'chalk';
import spawn from 'cross-spawn';

const executeNodeScript = (command: string, scriptPath: string, ...args: string[]) => {

  const child = spawn(command, [scriptPath, ...args], {
    stdio: 'inherit'
   });

  child.on('close', (code) => {
    if (code !== 0) {
      console.log();
      console.log(chalk.cyan(scriptPath) + ' exited with code ' + code + '.');
      console.log();
      return;
    }
   });

  child.on('error', (err) => {
    console.log(err);
  });

  return child;
};

export default executeNodeScript;
import { PACKAGES_PATH } from './packages';
import * as rimraf from 'rimraf';
import * as path from 'path';
import throat from 'throat';
import { execSync, spawn } from 'child_process';
import { maxCpu } from './utils';
import chalk from 'chalk';

// Building d.ts
console.log(chalk.inverse(' Building TypeScript definition files '));
try {
  const tscPath = path.join(__dirname, '../node_modules/.bin/tsc');
  const command = [
    tscPath,
    '-b',
    ...PACKAGES_PATH
  ];
  console.log('command: ', command);
  execSync(command.join(' '), {
    stdio: 'inherit',
  });

  console.log(
    chalk.inverse.green(' Successfully built TypeScript definition files ')
  );

} catch (err) {
  console.error(
    chalk.inverse.red(' Unable to build TypeScript definition files ')
  );
  console.error(err.stack);
  process.exitCode = 1;
}

// Checking
PACKAGES_PATH.forEach((packagePath: string) => {
  const pkg = require(packagePath + '/package.json');

  if (!pkg.typesVersions) {
    throw new Error(`Package ${pkg.name} is missing \`typesVersions\` field`);
  }
});


// Downleveling
console.log(chalk.inverse(' Downleveling TypeScript definition files '));

const downLevelPath = path.join(__dirname, '../node_modules/.bin/downlevel-dts');
const downLevelArgs = [
  'dist',
  'dist/ts3.4'
];

Promise.all(
  PACKAGES_PATH.map(
    throat(maxCpu, (packagePath) => {
      rimraf.sync(path.join(packagePath, 'dist/ts3.4'));

      return new Promise((resolve, reject) => {
        const downLevel = spawn(
          downLevelPath, downLevelArgs, {
          cwd: packagePath,
          stdio: 'inherit'
        }
        );

        downLevel.on('close', (code) => { resolve(code); })
        downLevel.on('error', (err) => { reject(err); })
      })
    })
  )
).then(() => {
  console.log(
    chalk.inverse.green(
      ' Successfully downleveled TypeScript definition files '
    )
  );
}).catch((err) => {
  console.error(
    chalk.inverse.red(' Unable to downlevel TypeScript definition files ')
  );
  console.error(err.stack);
  process.exitCode = 1;
});
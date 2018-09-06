import { join } from 'path';
import { confirmModules } from '../utils/inquirer';
import { measureFileSizesBeforeBuild, FileSizeProps } from 'art-dev-utils/lib/FileSizeReporter';
import paths from '../config/paths';
import { forEach } from 'lodash';
import chalk from 'chalk';
import { emptyDirSync, outputJsonSync } from 'fs-extra';
import gitRev from 'git-rev-sync';

confirmModules((answer) => {
  if (!answer.availableModulesOk) { return; }

  measureFileSizesBeforeBuild(paths.appPublic)
    .then((fileSizes) => {
      // empty specificed modules if it will be rebuild.
      console.log();
      forEach(answer.moduleEntryKeys, (entryKey) => {
        console.log(
          chalk.black.bold(`Clean folder "${chalk.cyan(entryKey)}"`)
        );
        try {
          emptyDirSync(join(paths.appPublic, entryKey));
          outputJsonSync(join(paths.appPublic, entryKey, 'version.txt'), {
            head: gitRev.long(),
            branch: gitRev.branch()
          });
        } catch (e) {
          console.log(
            chalk.yellow('current project is not a git repository!')
          );
        }
      });
      console.log();
    });
});

// Create the production build and print the deployment instructions.
function build(previousFileSizes: FileSizeProps) {
  console.log('Creating an optimized production build...');

}
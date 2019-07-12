// import { join } from 'path';
// import { confirmModules } from '../utils/inquirer';
// import { measureFileSizesBeforeBuild, FileSizeProps, printFileSizesAfterBuild } from 'art-dev-utils/lib/fileSizeReporter';
// import paths from '../config/paths';
// import { forEach } from 'lodash';
// import chalk from 'chalk';
// import { emptyDirSync, outputJsonSync } from 'fs-extra';
// import gitRev from 'git-rev-sync';
// import { getWebpackConfig } from '../config';
// import webpack from 'webpack';
// import formatWebpackMessages from 'art-dev-utils/lib/formatWebpackMessages';
// import imageMinifier from 'art-dev-utils/lib/imageMinifier';
// import appConfig from '../config/appConfig';
// import { BuildEnv } from '../enums/BuildEnv';
// const BUILD_ENV = appConfig.get('BUILD_ENV');
// const BUILD_PATH = BUILD_ENV === BuildEnv.prod ? paths.appPublic : paths.appDebug;

// const WARN_AFTER_BUNDLE_GZIP_SIZE = 512 * 1024;
// const WARN_AFTER_CHUNK_GZIP_SIZE = 1024 * 1024;

// confirmModules(async (answer) => {
//   if (!answer.availableModulesOk) { return; }

//   measureFileSizesBeforeBuild(BUILD_PATH)
//     .then((fileSizes) => {
//       // empty specificed modules if it will be rebuild.
//       console.log();
//       forEach(answer.moduleEntryKeys, (entryKey) => {
//         console.log(
//           chalk.black.bold(`Clean folder "${chalk.cyan(entryKey)}"`)
//         );
//         emptyDirSync(join(BUILD_PATH, entryKey));
//         try {
//           outputJsonSync(join(BUILD_PATH, entryKey, 'version.txt'), {
//             head: gitRev.long(),
//             branch: gitRev.branch()
//           });
//         } catch (e) {
//           console.log(
//             chalk.yellow('current project is not a git repository!')
//           );
//         }
//       });
//       console.log();

//       return build(fileSizes);
//     })
//     .then(({ stats, previousFileSizes, warnings }) => {
//       if (warnings.length) {
//         console.log(chalk.yellow('Compiled with warnings.\n'));
//         console.log(warnings.join('\n\n'));
//         console.log(
//           '\nSearch for the ' +
//           chalk.underline(chalk.yellow('keywords')) +
//           ' to learn more about each warning.'
//         );
//         console.log(
//           'To ignore, add ' +
//           chalk.cyan('// eslint-disable-next-line') +
//           ' to the line before.\n'
//         );
//       } else {
//         console.log(chalk.green('Compiled successfully.\n'));
//       }

//       console.log('File sizes after gzip:\n');

//       // images optimzation.
//       imageMinifier(stats, BUILD_PATH).then(() => {
//         printFileSizesAfterBuild(
//           stats,
//           previousFileSizes,
//           BUILD_PATH,
//           WARN_AFTER_BUNDLE_GZIP_SIZE,
//           WARN_AFTER_CHUNK_GZIP_SIZE
//         );
//         console.log();
//       });
//     });
// });

// // Create the production build and print the deployment instructions.
// function build(previousFileSizes: FileSizeProps) {
//   console.log('Creating an optimized production build...');

//   const webpackConfig = getWebpackConfig();
//   const compiler = webpack(webpackConfig);

//   return new Promise((resolve, reject) => {
//     compiler.run((err, stats) => {
//       if (err) { return reject(err); }

//       const messages = formatWebpackMessages(stats.toJson('normal'));
//       if (stats.hasErrors()) {
//         // Only keep the first error. Others are often indicative
//         // of the same problem, but confuse the reader with noise.
//         if (messages.errors.length > 1) {
//           messages.errors.length = 1;
//         }
//         return reject(new Error(messages.errors.join('\n\n')));
//       }

//       if (
//         process.env.CI &&
//         (typeof process.env.CI !== 'string' ||
//         process.env.CI.toLowerCase() !== 'false') &&
//         stats.hasWarnings()
//       ) {
//         console.log(
//           chalk.yellow(
//             '\nTreating warnings as errors because process.env.CI = true.\n' +
//             'Most CI servers set it automatically.\n'
//           )
//         );
//         return reject(new Error(messages.warnings.join('\n\n')));
//       }

//       return resolve({
//         stats,
//         previousFileSizes,
//         warnings: messages.warnings,
//       });

//     });
//   });
// }
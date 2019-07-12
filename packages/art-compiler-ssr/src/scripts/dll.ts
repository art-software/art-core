import chalk from 'chalk';
import webpack, { Stats } from 'webpack';
import formatWebpackMessages from 'art-dev-utils/lib/formatWebpackMessages';
import dllConfig from '../config/webpack.config.dll';
import paths from '../config/paths';
import appConfig from '../config/appConfig';
import { join } from 'path';
import fs from 'fs-extra';

const dllVersion = appConfig.get('art:webpack:dll:version') || 'default-version';
const virtualPath = appConfig.get('art:projectVirtualPath') || '';
const publicOutputPath = join(process.cwd(), './public', virtualPath, 'vendors', dllVersion);
const debufOutputPath = join(process.cwd(), './debug', virtualPath, 'vendors', dllVersion);

// Makes the script crash on unhandled rejections instead of silently
// ignoring them. In the future, promise rejections that are not handled will
// terminate the Node.js process with a non-zero exit code.
process.on('unhandledRejection', (err) => {
  throw err;
});

process.env.NODE_ENV = 'production';

buildDll().then(() => {
  syncDllFile(publicOutputPath, debufOutputPath);
  console.log(chalk.green('Create optimized DllPlugin Vendor successfully!'));
});

function buildDll(): Promise<{ stats: Stats, warnings: any }> {
  if (!fs.existsSync(paths.appArtConfig)) {
    console.log(chalk.red('Please execute "art dll" command at an art project root path'));
    process.exit(1);
  }
  console.log(chalk.green('Creating an optimized DllPlugin Vendor build...'));
  const compiler = webpack(new dllConfig());
  return new Promise((resolve, reject) => {
    compiler.run((err, stats) => {
      if (err) { return reject(err); }

      const messages = formatWebpackMessages(stats.toJson('normal'));
      if (stats.hasErrors()) {
        // Only keep the first error. Others are often indicative
        // of the same problem, but confuse the reader.
        if (messages.errors.length > 1) {
          messages.errors.length = 1;
        }
        return reject(new Error(messages.errors.join('\n\n')));
      }

      if (
        process.env.CI &&
        (typeof process.env.CI !== 'string' || process.env.CI.toLowerCase() !== 'false') &&
        stats.hasWarnings()
      ) {
        console.log(
          chalk.yellow(
            '\nTreating warnings as errors because process.env.CI = true.\n' +
            'Most CI servers set it automatically.\n'
          )
        );
        return reject(new Error(messages.warnings.join('\n\n')));
      }

      return resolve({
        stats,
        warnings: messages.warnings,
      });
    });
  });
}

function syncDllFile(src: string, dist: string) {
  try {
    fs.copySync(src, dist);
    console.log(chalk.green('Sync dll and manifest files successfully!'));
  } catch (err) {
    console.log(chalk.red('Copy dll and manifest files error: '), err);
  }
}
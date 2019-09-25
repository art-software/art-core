import webpack, { Configuration } from 'webpack';
import { warningText, cyanText, greenText } from 'art-dev-utils/lib/chalkColors';
import clearConsole from 'art-dev-utils/lib/clearConsole';
import * as path from 'path';
import formatWebpackMessages from 'art-dev-utils/lib/formatWebpackMessages';
import chalk from 'chalk';

const createServeCompiler = (config: Configuration[], onFinish: (noError: boolean) => any): webpack.MultiCompiler | null => {

  let compiler: webpack.MultiCompiler | null = null;

  try {
    compiler = webpack(config);
  } catch (error) {
    console.log(warningText('Failed to compile.'));
    console.log();
    console.log(error.message || error);
    console.log();
    process.exit(1);
  }

  if (compiler === null) { return null; }

  const isInteractive = process.stdout.isTTY;
  let isFirstCompile = true;

  // "invalid" event fires when you have changed a file, and Webpack is
  // recompiling a bundle. WebpackDevServer takes care to pause serving the
  // bundle, so if you refresh, it'll wait instead of serving the old one.
  // "invalid" is short for "bundle invalidated", it doesn't imply any errors.
  compiler.plugin('invalid', (fileName): void => {
    if (isInteractive && isFirstCompile) {
      clearConsole();
    }

    if (fileName) {
      console.log(`[${cyanText(path.relative(process.cwd(), fileName))}] has been changed, client recompiling...\n`);
    } else {
      // for webpack v1.
      console.log(`[webpack] client scripts has been changed, client recompiling...\n`);
    }
  });

  // "done" event fires when Webpack has finished recompiling the bundle.
  // Whether or not you have warnings or errors, you will get this event.
  compiler.plugin('done', (stats): void => {
    const messages = formatWebpackMessages(stats.toJson({}, true));
    const noErrors = !messages.errors.length;
    const isSuccessful = noErrors && !messages.warnings.length;

    if (noErrors) {
      console.log(greenText('Client compiled successfully!'));
      if (Object.prototype.toString.call(onFinish) === '[object Function]') {
        onFinish(noErrors);
      }
    } else {
      console.log(warningText('Debug server was interrupted, please fix lint error!\nFailed to compile.\n'));
      console.log(messages.errors.join('\n\n'));
      isFirstCompile = false;
      return;
    }

    if (isSuccessful && isFirstCompile && isInteractive) {
      console.log();
      console.log();
    }

    // Show warnings if no errors were found.
    if (messages.warnings.length) {
      console.log(chalk.yellow('Compiled with warnings.\n'));
      console.log(messages.warnings.join('\n\n'));

      // Teach some ESLint tricks.
      console.log(
        '\nSearch for the ' +
        chalk.underline(chalk.yellow('keywords')) +
        ' to learn more about each warning.'
      );
      console.log(
        'To ignore, add ' +
        chalk.cyan('// eslint-disable-next-line') +
        ' to the line before.\n'
      );
    }

    isFirstCompile = false;
  });

  return compiler;
};

export default createServeCompiler;
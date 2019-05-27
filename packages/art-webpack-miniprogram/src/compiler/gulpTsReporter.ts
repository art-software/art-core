import { CompilationResult, TypeScriptError } from 'gulp-typescript/release/reporter';
import chalk from 'chalk';

function finishHandler(results: CompilationResult) {
  let hasError = false;
  const showErrorCount = (count: number, type: string) => {
    if (count === 0) { return; }

    console.log('TypeScript:', chalk.magenta(count.toString()), (type !== '' ? type + ' ' : '') + (count === 1 ? 'error' : 'errors'));
    hasError = true;
  };

  showErrorCount(results.transpileErrors, '');
  showErrorCount(results.optionsErrors, 'options');
  showErrorCount(results.syntaxErrors, 'syntax');
  showErrorCount(results.globalErrors, 'global');
  // showErrorCount(results.semanticErrors, 'semantic');
  showErrorCount(results.declarationErrors, 'declaration');
  showErrorCount(results.emitErrors, 'emit');

  if (!results.noEmit) {
    if (results.emitSkipped) {
      console.log('TypeScript: emit', chalk.red('failed'));
    } else if (hasError) {
      console.log('TypeScript: emit', chalk.cyan('succeeded'), '(with errors)');
    }
  }
}

export function gulpTsReporter() {
  return {
    error: (error: TypeScriptError) => {
      if (error.diagnostic.code !== 2307) {
        console.log(error.message);
      }
    },
    finish: finishHandler
  };
}
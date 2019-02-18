import { readFileSync } from 'fs';
import recast from 'recast';
import astTypes from 'ast-types';
import resolve from 'resolve';
import { dirname } from 'path';
import chalk from 'chalk';

const isNpmDependency = (path: string) => {
  const regex = /node_modules/g;
  return regex.test(path);
};

// extract import statement from js/ts files
export const dependencyExtractor = (filePath: string): string[] => {

  const file = readFileSync(filePath, { encoding: 'utf8' });

  const ast = recast.parse(file, {
    tokens: false,
    parser: require('recast/parsers/typescript')
  });

  const importAsts: string[] = [];
  const dependencies: string[] = [];

  astTypes.visit(ast, {
    visitImportDeclaration(path) {
      const importNode = path.node;
      const source = importNode.source.value;

      if (typeof source !== 'string') { return this.traverse(path); }

      const resolvedPath = resolve.sync(source, {
        basedir: dirname(filePath) + '/',
        extensions: ['.ts', '.js']
      });

      if (!isNpmDependency(resolvedPath)) { return this.traverse(path); }

      if (importNode.comments) {
        importNode.comments.length = 0;
      }

      importAsts.push(resolvedPath);

      this.traverse(path);
    }
  });

  importAsts.forEach((resolvedPath) => {
    console.log(chalk.green('import =>  '), resolvedPath);
    dependencies.push(resolvedPath);
  });

  return dependencies;
};

// export class DependencyExtractor {
//   private static dependencies: string[] = [];

//   public static getDependencies () {
//     return DependencyExtractor.dependencies;
//   }

//   public static setDependency (DependenciesPath: string) {
//     DependencyExtractor.dependencies.push(DependenciesPath);
//     return DependencyExtractor.dependencies;
//   }
// }
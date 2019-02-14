import { readFileSync } from 'fs';
import recast from 'recast';
import astTypes from 'ast-types';
import resolve from 'resolve';
import { ImportDeclaration } from 'ast-types/gen/nodes';
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

  const importAsts: ImportDeclaration[] = [];
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
        // tslint:disable-next-line:no-unused-expression
        importNode.comments.length === 0;
      }

      importAsts.push(importNode);

      this.traverse(path);
    }
  });

  importAsts.forEach((astNode) => {
    const output = recast.print(astNode).code;
    console.log(chalk.green('import =>  '), output);
    dependencies.push(output);
  });

  return dependencies;
};
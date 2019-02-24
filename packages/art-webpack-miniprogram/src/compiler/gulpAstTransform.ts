import through2 from 'through2';
import recast from 'recast';
import { Visitor } from 'recast/lib/types';
import chalk from 'chalk';

const transform = (file, encoding, visitor) => {
  const inputSource = file.contents.toString(encoding);
  const ast = recast.parse(inputSource, {
    sourceFileName: file.relative,
    tokens: false,
    parser: require('recast/parsers/typescript')
  });

  recast.visit(ast, visitor);

  const output = recast.print(ast);

  file.contents = new Buffer(output.code);
};

export const gulpAstTransform = (visitor: Visitor) => {
  return through2.obj(function (file, encoding, callback) {
    console.log(chalk.green('current file'), file.path);
    transform(file, encoding, visitor);

    callback(null, file);
  });
};
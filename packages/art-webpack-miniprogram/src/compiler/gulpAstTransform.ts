import through2 from 'through2';
import recast from 'recast';
import { Visitor } from 'recast/lib/types';

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

export const gulpAstTransform = (visitor: Visitor, afterTransform?: () => any) => {
  return through2.obj(function (file, encoding, callback) {
    // console.log(chalk.green('current file'), file.path);
    transform(file, encoding, visitor);

    if (afterTransform) {
      afterTransform();
    }

    callback(null, file);
  });
};
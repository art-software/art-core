import fs from 'fs-extra';
import path from 'path';
import * as recast from 'recast';
import * as parser from 'recast/parsers/babel';
import chalk from 'chalk';
import { ASTNode } from 'ast-types/gen/nodes';

const isExistServiceWorkerConfig = (astBody: ASTNode[]) => {
  let bool = false;
  astBody.forEach((node) => {
    if (node.type === 'ImportDeclaration' && node.source.type === 'StringLiteral') {
      if (/service-worker/.test(node.source.value)) {
        bool = true;
      }
    }
  });
  return bool;
};

const setSwConfigInEntryFile = () => {
  const tempFilePath = path.resolve(process.cwd(), 'modules.temp.json');
  fs.readJson(tempFilePath)
    .then((jsonData) => {
      fs.remove(tempFilePath); // 获取临时文件中的模块数据后删除临时文件

      const modules = jsonData.modules;
      modules.forEach((module) => {
        const entryFilePath = path.resolve(process.cwd(), `client/${module}/index.tsx`);
        const readableStream = fs.createReadStream(entryFilePath);
        const buffers: Uint8Array[] = [];

        readableStream.on('data', (data) => { buffers.push(data); });
        readableStream.on('end', () => {
          const fileBuffer = Buffer.concat(buffers);
          const sourceCode = fileBuffer.toString();
          const ast = recast.parse(sourceCode, { parser });
          const astBody = ast.program.body;

          if (isExistServiceWorkerConfig(astBody)) {
            console.log(chalk.gray(`  Service worker config has existed in ${module}/index.tsx, not set again.`));
            return;
          }

          const importDeclarationNodes: any[] = [];
          const oterhNodes: any[] = [];
          for (let i = 0; i < astBody.length; i++) {
            const node = astBody[i];
            if (node.type === 'ImportDeclaration') {
              importDeclarationNodes.push(node);
            } else {
              oterhNodes.push(node);
            }
          }

          const patch1 = `
            import SwRefresh from 'art-lib-react/src/components/sw-refresh';
            import setServiceWorker from 'client/common/equipments/service-worker/sw-register';

            setServiceWorker();

          `;
          const patchAst1 = recast.parse(patch1, { parser });

          astBody.length = 0;
          astBody.push(...importDeclarationNodes);
          astBody.push(...patchAst1.program.body);
          astBody.push(...oterhNodes);

          const patch2 = `

            window.addEventListener('showSwRefresh', (event) => {
              ReactDOM.render(
                <React.Fragment>
                  <BrowserRouter>
                    <Routes />
                  </BrowserRouter>
                  <SwRefresh />
                </React.Fragment>,
                document.getElementById('app'));
            });
          `;
          const patchAst2 = recast.parse(patch2, { parser });
          astBody.push(...patchAst2.program.body);

          const targetCode = recast.print(ast).code;
          const writableStream = fs.createWriteStream(entryFilePath);
          writableStream.write(targetCode, (error) => {
            console.log(chalk.green(`  Set service worker config in ${chalk.cyanBright(module + '/index.tsx')} file finished!`));
          });
        });
      });
    })
    .catch((error) => {
      console.error(error);
    });
};

setSwConfigInEntryFile();
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_extra_1 = __importDefault(require("fs-extra"));
const path_1 = __importDefault(require("path"));
const recast = __importStar(require("recast"));
const parser = __importStar(require("recast/parsers/babel"));
const chalk_1 = __importDefault(require("chalk"));
const isExistServiceWorkerConfig = (astBody) => {
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
    const tempFilePath = path_1.default.resolve(process.cwd(), 'modules.temp.json');
    fs_extra_1.default.readJson(tempFilePath)
        .then((jsonData) => {
        fs_extra_1.default.remove(tempFilePath); // 获取临时文件中的模块数据后删除临时文件
        const modules = jsonData.modules;
        modules.forEach((module) => {
            const entryFilePath = path_1.default.resolve(process.cwd(), `client/${module}/index.tsx`);
            const readableStream = fs_extra_1.default.createReadStream(entryFilePath);
            const buffers = [];
            readableStream.on('data', (data) => { buffers.push(data); });
            readableStream.on('end', () => {
                const fileBuffer = Buffer.concat(buffers);
                const sourceCode = fileBuffer.toString();
                const ast = recast.parse(sourceCode, { parser });
                const astBody = ast.program.body;
                if (isExistServiceWorkerConfig(astBody)) {
                    console.log(chalk_1.default.gray(`  Service worker config has existed in ${module}/index.tsx, not set again.`));
                    return;
                }
                const importDeclarationNodes = [];
                const oterhNodes = [];
                for (let i = 0; i < astBody.length; i++) {
                    const node = astBody[i];
                    if (node.type === 'ImportDeclaration') {
                        importDeclarationNodes.push(node);
                    }
                    else {
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
                const writableStream = fs_extra_1.default.createWriteStream(entryFilePath);
                writableStream.write(targetCode, (error) => {
                    console.log(chalk_1.default.green(`  Set service worker config in ${chalk_1.default.cyanBright(module + '/index.tsx')} file finished!`));
                });
            });
        });
    })
        .catch((error) => {
        console.error(error);
    });
};
setSwConfigInEntryFile();

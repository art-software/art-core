"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
const chalk_1 = __importDefault(require("chalk"));
const fs_extra_1 = __importDefault(require("fs-extra"));
const recast_1 = __importDefault(require("recast"));
const updateArtConfigFile = () => {
    const artConfigFilePath = path_1.default.resolve(process.cwd(), 'art.config.js');
    fs_extra_1.default.readFile(artConfigFilePath)
        .then((contents) => {
        const source = contents.toString();
        const ast = recast_1.default.parse(source, { tokens: false });
        // 修改 dll.vendors
        recast_1.default.visit(ast, {
            visitProperty(astPath) {
                const property = astPath.node;
                const propertyKey = property.key;
                if (propertyKey.name === 'dll') {
                    // tslint:disable-next-line:no-eval
                    const dll = eval('(' + recast_1.default.print(property.value).code + ')');
                    const vendors = [
                        'polyfills',
                        'react',
                        'react-dom',
                        'react-router-dom',
                        'classnames',
                        'axios',
                        'workbox-window',
                        'art-lib-react/src/components/scroll/lib/iscroll-probe'
                    ];
                    dll.vendors = [...new Set(dll.vendors.concat(vendors))];
                    const dllAst = recast_1.default.parse(`const dll = ${JSON.stringify(dll)}`, { tokens: false });
                    property.value = dllAst.program.body[0]
                        .declarations[0]
                        .init;
                }
                this.traverse(astPath);
            }
        });
        // 添加 service worker config
        recast_1.default.visit(ast, {
            visitVariableDeclarator(astPath) {
                const variableDeclarator = astPath.node;
                const variableDeclaratorId = variableDeclarator.id;
                if (variableDeclaratorId.name === 'artConfig') {
                    const variableDeclaratorInit = variableDeclarator.init;
                    const swConfigProperties = variableDeclaratorInit.properties.filter((property) => {
                        return property.key.value === 'sw';
                    });
                    if (swConfigProperties.length === 0) {
                        const serviceWorkerConfig = {
                            sw: {
                                enable: true,
                                includeModules: [],
                                workboxOutputDirectory: 'workbox',
                                workboxGenerateSWOptions: {
                                    // include: [/\.html$/],
                                    runtimeCaching: [
                                        {
                                            urlPattern: /art_framework\.\w+\.js$/,
                                            handler: 'CacheFirst',
                                            options: {
                                                cacheName: 'vendors-runtime-cache',
                                                expiration: {
                                                    maxEntries: 2,
                                                    maxAgeSeconds: 15 * 24 * 60 * 60
                                                }
                                            }
                                        }
                                    ]
                                }
                            }
                        };
                        const swConfigAst = recast_1.default.parse(`const swConfig = ${JSON.stringify(serviceWorkerConfig)}`, { tokens: false });
                        const swConfigProperty = swConfigAst.program.body[0]
                            .declarations[0]
                            .init
                            .properties[0];
                        variableDeclaratorInit.properties.push(swConfigProperty);
                    }
                }
                this.traverse(astPath);
            }
        });
        const target = recast_1.default.prettyPrint(ast, { tabWidth: 2, quote: 'single' }).code;
        fs_extra_1.default.writeFile(artConfigFilePath, target).then(() => {
            console.log(chalk_1.default.green('  Modify art.config.js file finished!'));
        });
    });
};
exports.default = updateArtConfigFile;

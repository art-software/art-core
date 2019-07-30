"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const chalk_1 = __importDefault(require("chalk"));
const Equipments_1 = require("../enums/Equipments");
const inquirer_1 = __importDefault(require("inquirer"));
const parseModules_1 = __importDefault(require("art-dev-utils/lib/parseModules"));
const path_1 = __importDefault(require("path"));
const fs_extra_1 = __importDefault(require("fs-extra"));
const recast_1 = __importDefault(require("recast"));
const equipments = [Equipments_1.Equipments.ServiceWorker];
class EquipCommand {
    constructor() {
        this.command = 'equip';
        this.describe = chalk_1.default.black.bold(`equip existing modules with ${equipments.join(',')}`);
    }
    builder(argv) {
        return argv
            .usage(`\n${chalk_1.default.cyan.bold('Usage:')} $0 equip [options]`)
            .option('m', {
            alias: 'modules',
            demandOption: true,
            describe: chalk_1.default.black.bold('The modules you would like to equip')
        })
            .updateStrings({
            'Invalid values:': chalk_1.default.red.bold('Invalid values:')
        })
            .help();
    }
    handler(argv) {
        const questions = [{
                type: 'list',
                name: 'equipment',
                choices: equipments,
                message: chalk_1.default.white('Which equipment you would like to choice?')
            }];
        inquirer_1.default.prompt(questions).then((answers) => {
            const modules = parseModules_1.default(argv.modules);
            const equipment = answers.equipment.replace(/\s+/g, '-');
            modules.forEach((module) => {
                equipModule(module, equipment);
            });
        });
    }
}
const equipModule = (module, equipment) => {
    const equipmentFrom = path_1.default.join(__dirname, '../../templates/equipments', equipment);
    const equipmentTo = path_1.default.join(process.cwd(), equipment);
    copyEquipment(equipmentFrom, equipmentTo);
    modifyArtConfigFile();
};
const copyEquipment = (from, to) => {
    fs_extra_1.default.copy(from, to).then(() => {
        console.log(chalk_1.default.green('  Copy equipment files success!'));
    });
};
const modifyArtConfigFile = () => {
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
module.exports = new EquipCommand();

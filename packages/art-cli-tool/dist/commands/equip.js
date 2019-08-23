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
const copyEquipmentFiles_1 = __importDefault(require("../helpers/copyEquipmentFiles"));
const executeNodeScript_1 = __importDefault(require("art-dev-utils/lib/executeNodeScript"));
const fs_extra_1 = __importDefault(require("fs-extra"));
const cross_spawn_1 = __importDefault(require("cross-spawn"));
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
            equipModule(modules, equipment);
        });
    }
}
const equipModule = (modules, equipment) => {
    const equipmentFrom = path_1.default.join(__dirname, '../../equipments', equipment);
    const equipmentTo = path_1.default.join(process.cwd(), 'client/common/equipments', equipment);
    copyEquipmentFiles_1.default(equipmentFrom, equipmentTo)
        .then(() => {
        if (equipment === 'service-worker') {
            // 临时文件，用来传递模块数据
            const tempFilePath = path_1.default.resolve(process.cwd(), 'modules.temp.json');
            try {
                fs_extra_1.default.outputJsonSync(tempFilePath, { modules });
            }
            catch (error) {
                fs_extra_1.default.remove(tempFilePath);
                console.error(error);
            }
            // 修改各个模块入口文件
            const setSwConfigInEntryFile = path_1.default.resolve(__dirname, '../helpers/setSwConfigInEntryFile');
            const childProcess1 = executeNodeScript_1.default('node', setSwConfigInEntryFile);
            // 修改art.config.js文件
            const setSwConfigInArtConfigFile = path_1.default.resolve(__dirname, '../helpers/setSwConfigInArtConfigFile');
            const childProcess2 = executeNodeScript_1.default('node', setSwConfigInArtConfigFile);
            // 所有文件修改完成之后，询问是否需要自动安装workbox-window模块
            awaitAllChildProcessesExit([childProcess1, childProcess2]).then(() => {
                inquireNpmInstall();
            });
        }
    });
};
const awaitAllChildProcessesExit = (childs) => {
    const promises = childs.map((child) => {
        return new Promise((resolve, reject) => {
            child.on('exit', (code) => {
                if (code !== 0) {
                    reject();
                    return;
                }
                resolve();
            });
        });
    });
    return Promise.all(promises);
};
const inquireNpmInstall = () => {
    const packageJsonPath = path_1.default.resolve(process.cwd(), 'package.json');
    fs_extra_1.default.readJson(packageJsonPath)
        .then((jsonData) => {
        const allDependencies = Object.assign({}, jsonData.dependencies, jsonData.devDependencies);
        if (allDependencies['workbox-window'] === undefined) {
            const questions = [{
                    type: 'confirm',
                    name: 'isAutoInstall',
                    message: chalk_1.default.white('Would you like to install workbox-window right now?')
                }];
            inquirer_1.default.prompt(questions).then((answers) => {
                const isAutoInstall = answers.isAutoInstall;
                if (isAutoInstall) {
                    const childProcess = cross_spawn_1.default('yarn', ['add', 'workbox-window'], { stdio: 'inherit' });
                    // tslint:disable-next-line:no-unused-expression
                    childProcess.stdout && childProcess.stdout.on('data', (data) => {
                        console.log(data.toString());
                    });
                    // tslint:disable-next-line:no-unused-expression
                    childProcess.stderr && childProcess.stderr.on('data', (data) => {
                        console.log('Error: ', data.toString());
                    });
                    childProcess.on('close', (code) => {
                        if (code !== 0) {
                            console.log(chalk_1.default.yellow(`  Exited with code: ${code}.`));
                            return;
                        }
                    });
                }
                else {
                    console.log('');
                    console.log(chalk_1.default.yellow(`  Service worker is dependent on ${chalk_1.default.cyanBright('workbox-window')} module, please manual install it by yourself.`));
                    console.log(chalk_1.default.gray('  Commands example: ') + chalk_1.default.white('yarn add workbox-window'));
                    console.log('');
                }
            });
        }
        else {
            console.log(chalk_1.default.gray(`  You have installed workbox-window module.`));
        }
    });
};
module.exports = new EquipCommand();

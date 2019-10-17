"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const chalk_1 = __importDefault(require("chalk"));
const empty_dir_1 = __importDefault(require("empty-dir"));
const path_1 = require("path");
const inquirer_1 = __importDefault(require("inquirer"));
const index_1 = require("../scaffold/index");
const Scaffolds_1 = require("../enums/Scaffolds");
const CreateCmdTypes_1 = require("../enums/CreateCmdTypes");
const resolveAppPath_1 = __importDefault(require("art-dev-utils/lib/resolveAppPath"));
const fs_1 = require("fs");
const scaffolds = [Scaffolds_1.Scaffolds.react, Scaffolds_1.Scaffolds.miniprogram, Scaffolds_1.Scaffolds.ssrReact, Scaffolds_1.Scaffolds.ssrVue];
class CreateCommand {
    constructor() {
        this.command = 'create';
        this.describe = chalk_1.default.black.bold(`create art scaffold ${scaffolds.join(',')} `);
        this.handler = (argv) => {
            const commandType = argv._[1];
            if (argv.scaffold === Scaffolds_1.Scaffolds.ssrVue) {
                console.log(chalk_1.default.magenta(`Scaffold ${chalk_1.default.green(argv.scaffold)} is not supported for now!`));
                return;
            }
            const fileFilter = (file) => {
                const fileBaseName = path_1.basename(file);
                return fileBaseName === '.' || fileBaseName !== '.git' || fileBaseName[0] !== '.';
            };
            const isEmpty = empty_dir_1.default.sync('.', fileFilter);
            if (commandType === CreateCmdTypes_1.CreateCmdTypes.project && !isEmpty) {
                return console.log(chalk_1.default.red('\ncurrent working dir is not empty, please create new another project directory!'));
            }
            this.commandEntry(commandType)
                .then((answers) => {
                const artConfigExist = fs_1.existsSync(resolveAppPath_1.default('art.config.js'));
                if (artConfigExist) {
                    const appConfig = require(resolveAppPath_1.default('art.config.js'));
                    const { moduleName } = answers;
                    const modulesKey = Object.keys(appConfig.webpack.entry);
                    const projectVirtualPath = appConfig.projectVirtualPath;
                    let modulePath = path_1.join(projectVirtualPath, moduleName);
                    if (modulePath.endsWith('/')) {
                        modulePath = modulePath.slice(0, modulePath.length - 1);
                    }
                    if (modulesKey.indexOf(modulePath) < 0) {
                        index_1.create(argv.scaffold, commandType, answers);
                    }
                    else {
                        console.log(chalk_1.default.yellow(`module ${chalk_1.default.green(moduleName)} has existed!`));
                    }
                }
                else {
                    index_1.create(argv.scaffold, commandType, answers);
                }
            })
                .catch((err) => {
                return console.log(chalk_1.default.red(err));
            });
        };
    }
    builder(argv) {
        return argv
            .usage(`\n${chalk_1.default.cyan.bold('Usage:')} $0 create ${chalk_1.default.cyan.bold('<scaffold>')} [options]`)
            .command(CreateCmdTypes_1.CreateCmdTypes.project, 'create a new project', (args) => {
            return args
                .usage(`\n${chalk_1.default.cyan.bold('Usage:')} $0 ${chalk_1.default.cyan.bold('create project [-p=""]')}`)
                .option('s', {
                alias: 'scaffold',
                choices: scaffolds,
                demandOption: true,
                describe: chalk_1.default.black.bold('which scaffold project you chould like to create?')
            })
                .updateStrings({
                'Invalid values:': chalk_1.default.red.bold('Invalid values:')
            });
        }, this.handler)
            .command(CreateCmdTypes_1.CreateCmdTypes.module, 'create a new module within existed project workspace', (args) => {
            return args
                .usage(`\n${chalk_1.default.cyan.bold('Usage:')} $0 ${chalk_1.default.cyan.bold('create module [-s=""]')}`)
                .option('s', {
                alias: 'scaffold',
                choices: scaffolds,
                demandOption: true,
                describe: chalk_1.default.black.bold('which scaffold module you chould like to create?')
            })
                .updateStrings({
                'Invalid values:': chalk_1.default.red.bold('Invalid values:')
            });
        }, this.handler)
            // create solution | module
            .demandCommand(2, 'You need at least two command before moving on')
            .updateStrings({
            'Commands:': chalk_1.default.cyan.bold('Scaffolds:')
        })
            .help('help');
    }
    commandEntry(commandType) {
        if (commandType === CreateCmdTypes_1.CreateCmdTypes.project) {
            return this.createProject();
        }
        else if (commandType === CreateCmdTypes_1.CreateCmdTypes.module) {
            return this.createModule();
        }
    }
    createProject() {
        const questions = [
            {
                type: 'input',
                name: 'projectName',
                message: 'project name:',
                default: () => {
                    return path_1.basename(process.cwd());
                },
                validate: (input) => /^[^0-9]?[A-Za-z0-9-]+$/.test(input)
            },
            {
                type: 'input',
                name: 'projectDescription',
                message: 'project desc:'
            },
            {
                type: 'input',
                name: 'projectVirtualPath',
                message: 'project virtual path:',
                validate: this.nameWithSlashValidate(false)
            },
            {
                type: 'input',
                name: 'moduleName',
                message: 'module name:',
                validate: this.nameWithSlashValidate(false)
            }
        ];
        return inquirer_1.default.prompt(questions).then((answers) => answers);
    }
    createModule() {
        const questions = [
            {
                type: 'input',
                name: 'moduleName',
                message: 'module name:',
                validate: this.nameWithSlashValidate(false)
            }
        ];
        return inquirer_1.default.prompt(questions).then((answer) => answer);
    }
    nameWithSlashValidate(required = true) {
        return (input) => {
            return required ? /^[^0-9]?[A-Za-z0-9-/]+$/.test(input) : true;
        };
    }
}
module.exports = new CreateCommand();

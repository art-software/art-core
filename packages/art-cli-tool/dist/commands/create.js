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
const scaffolds = [Scaffolds_1.Scaffolds.react, Scaffolds_1.Scaffolds.miniprogram];
// TODO add miniprogram support
class CreateCommand {
    constructor() {
        this.command = 'create';
        this.describe = chalk_1.default.black.bold(`create art scaffold ${scaffolds.join(',')} `);
        this.handler = (argv) => {
            // TODO add miniprogram support
            if (argv.scaffold === Scaffolds_1.Scaffolds.miniprogram) {
                console.log(`${chalk_1.default.green.bold('art create')} command is not currently support create ${chalk_1.default.green.bold(Scaffolds_1.Scaffolds.miniprogram)} project`);
                return;
            }
            const commandType = argv._[1];
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
                index_1.create(argv.scaffold, commandType, answers);
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

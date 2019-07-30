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
const setSwConfigInArtConfigFile_1 = __importDefault(require("../helpers/setSwConfigInArtConfigFile"));
const setSwConfigInEntryFile_1 = __importDefault(require("../helpers/setSwConfigInEntryFile"));
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
    const equipmentFrom = path_1.default.join(__dirname, '../../equipments', equipment);
    const equipmentTo = path_1.default.join(process.cwd(), equipment);
    copyEquipmentFiles_1.default(equipmentFrom, equipmentTo);
    if (equipment === 'service-worker') {
        setSwConfigInArtConfigFile_1.default();
        setSwConfigInEntryFile_1.default();
    }
};
module.exports = new EquipCommand();

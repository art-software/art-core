"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const inquirer_1 = __importDefault(require("inquirer"));
/**
 * create new art project configuration
 *
 * @param {String} scaffoldType react|vue
 * @param {String} commandType  project|module
 * @param {Object} scaffoldData ProjectScaffold | ModuleScaffold
 */
exports.create = (scaffoldType, commandType, scaffoldData) => {
    const method = commandType === 'project' ? 'createScaffoldProject' : 'createScaffoldModule';
    console.log(`scaffoldType: ${scaffoldType}`);
    const Scaffold = require(`./${scaffoldType}`);
    const scaffold = new Scaffold(scaffoldData, scaffoldType);
    inquirer_1.default.prompt([
        {
            type: 'list',
            name: 'scaffoldChoosen',
            choices: scaffold.getScaffoldsAvailable(),
            message: 'What scaffold do you want to choice?'
        }
    ])
        .then((answer) => {
        scaffold.setScaffoldChoosen(answer.scaffoldChoosen);
        scaffold[method]();
    });
};

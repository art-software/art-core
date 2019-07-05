"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ModulesManagers_1 = require("../enums/ModulesManagers");
exports.InstallCommands = {
    [ModulesManagers_1.ModulesManagers.YARN]: {
        default: 'install',
        particular: 'add',
        options: []
    },
    [ModulesManagers_1.ModulesManagers.NPM]: {
        default: 'install',
        particular: 'install',
        options: []
    },
};

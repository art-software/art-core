var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "../config/configWebpackModules", "art-dev-utils/lib/chalkColors", "json-colorz", "inquirer"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    const configWebpackModules_1 = require("../config/configWebpackModules");
    const chalkColors_1 = require("art-dev-utils/lib/chalkColors");
    const json_colorz_1 = __importDefault(require("json-colorz"));
    const inquirer_1 = __importDefault(require("inquirer"));
    exports.confirmModules = (callback) => {
        const availableModules = configWebpackModules_1.webpackEntries(false);
        if (!Object.keys(availableModules).length) {
            console.log(chalkColors_1.cyanBoldText('No available modules here, please check `--modules`!'));
            return;
        }
        json_colorz_1.default(availableModules);
        inquirer_1.default.prompt({
            type: 'confirm',
            name: 'availableModulesOk',
            message: 'Please confirm above modules you could like?'
        }).then((answer) => {
            const availableModulesOk = answer.availableModulesOk;
            callback({
                availableModulesOk,
                moduleEntryKeys: Object.keys(availableModules)
            });
        });
    };
});

"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const chalk_1 = __importDefault(require("chalk"));
const inquirer_1 = __importDefault(require("inquirer"));
const isWellStructuredClient_1 = require("../utils/isWellStructuredClient");
const paths_1 = __importDefault(require("../config/paths"));
const path_1 = require("path");
const fs_1 = require("fs");
const fs_extra_1 = require("fs-extra");
const jsonFormat = require('json-format');
const PROJECTJSON = 'project.config.json';
const clearCacheInquire = () => {
    return inquirer_1.default.prompt([
        {
            type: 'confirm',
            name: 'clearCache',
            default: false,
            message: `${chalk_1.default.cyan('=>')} Clear local cache ${chalk_1.default.magenta.bold('debug')} ?`
        }
    ]).then((answer) => {
        return {
            clearCache: answer.clearCache
        };
    });
};
if (!isWellStructuredClient_1.isWellStructuredClient()) {
    throw new Error(`${chalk_1.default.red('Invalid miniprogram client structure')}`);
}
clearCacheInquire().then((answer) => {
    if (answer.clearCache) {
        const virtualPath = require(paths_1.default.appArtConfig).projectVirtualPath || '';
        const debugOutputDir = path_1.join(paths_1.default.appDebug, virtualPath);
        if (fs_1.existsSync(debugOutputDir)) {
            const debugProjectJSONPath = path_1.join(debugOutputDir, PROJECTJSON);
            let debugProjectConfigJSON;
            if (fs_1.existsSync(debugProjectJSONPath)) {
                debugProjectConfigJSON = fs_extra_1.readJSONSync(debugProjectJSONPath);
            }
            // clear debug files
            fs_extra_1.emptyDirSync(debugOutputDir);
            console.log('cache cleared');
            if (debugProjectConfigJSON) {
                fs_1.writeFileSync(debugProjectJSONPath, jsonFormat(debugProjectConfigJSON, {
                    type: 'space',
                    size: 2
                }));
            }
        }
    }
    console.log('choice a serve port');
});

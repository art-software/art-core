"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = require("path");
const inquirer_1 = require("../utils/inquirer");
const FileSizeReporter_1 = require("art-dev-utils/lib/FileSizeReporter");
const paths_1 = __importDefault(require("../config/paths"));
const lodash_1 = require("lodash");
const chalk_1 = __importDefault(require("chalk"));
const fs_extra_1 = require("fs-extra");
const git_rev_sync_1 = __importDefault(require("git-rev-sync"));
inquirer_1.confirmModules((answer) => {
    if (!answer.availableModulesOk) {
        return;
    }
    FileSizeReporter_1.measureFileSizesBeforeBuild(paths_1.default.appPublic)
        .then((fileSizes) => {
        // empty specificed modules if it will be rebuild.
        console.log();
        lodash_1.forEach(answer.moduleEntryKeys, (entryKey) => {
            console.log(chalk_1.default.black.bold(`Clean folder "${chalk_1.default.cyan(entryKey)}"`));
            try {
                fs_extra_1.emptyDirSync(path_1.join(paths_1.default.appPublic, entryKey));
                fs_extra_1.outputJsonSync(path_1.join(paths_1.default.appPublic, entryKey, 'version.txt'), {
                    head: git_rev_sync_1.default.long(),
                    branch: git_rev_sync_1.default.branch()
                });
            }
            catch (e) {
                console.log(chalk_1.default.yellow('current project is not a git repository!'));
            }
        });
        console.log();
    });
});
// Create the production build and print the deployment instructions.
function build(previousFileSizes) {
    console.log('Creating an optimized production build...');
}

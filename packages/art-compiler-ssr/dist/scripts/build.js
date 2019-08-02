"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = require("path");
const inquirer_1 = require("../utils/inquirer");
const fileSizeReporter_1 = require("art-dev-utils/lib/fileSizeReporter");
const paths_1 = __importDefault(require("../config/paths"));
const lodash_1 = require("lodash");
const chalk_1 = __importDefault(require("chalk"));
const fs_extra_1 = require("fs-extra");
const git_rev_sync_1 = __importDefault(require("git-rev-sync"));
const webpack_1 = __importDefault(require("webpack"));
const formatWebpackMessages_1 = __importDefault(require("art-dev-utils/lib/formatWebpackMessages"));
const imageMinifier_1 = __importDefault(require("art-dev-utils/lib/imageMinifier"));
const appConfig_1 = __importDefault(require("../config/appConfig"));
const webpack_config_ssr_1 = __importDefault(require("../config/webpack.config.ssr"));
const webpack_config_web_1 = __importDefault(require("../config/webpack.config.web"));
const BuildEnv_1 = require("../enums/BuildEnv");
const BUILD_ENV = appConfig_1.default.get('BUILD_ENV');
const BUILD_PATH = BUILD_ENV === BuildEnv_1.BuildEnv.prod ? paths_1.default.appPublic : paths_1.default.appDebug;
const WARN_AFTER_BUNDLE_GZIP_SIZE = 512 * 1024;
const WARN_AFTER_CHUNK_GZIP_SIZE = 1024 * 1024;
inquirer_1.confirmModules((answer) => __awaiter(this, void 0, void 0, function* () {
    if (!answer.availableModulesOk) {
        return;
    }
    fileSizeReporter_1.measureFileSizesBeforeBuild(BUILD_PATH)
        .then((fileSizes) => {
        // empty specificed modules if it will be rebuild.
        console.log();
        lodash_1.forEach(answer.moduleEntryKeys, (entryKey) => {
            console.log(chalk_1.default.black.bold(`Clean folder "${chalk_1.default.cyan(entryKey)}"`));
            fs_extra_1.emptyDirSync(path_1.join(BUILD_PATH, entryKey));
            try {
                fs_extra_1.outputJsonSync(path_1.join(BUILD_PATH, entryKey, 'version.txt'), {
                    head: git_rev_sync_1.default.long(),
                    branch: git_rev_sync_1.default.branch()
                });
            }
            catch (e) {
                console.log(chalk_1.default.yellow('current project is not a git repository!'));
            }
        });
        console.log();
        return build(fileSizes);
    })
        .then(({ stats, previousFileSizes, warnings }) => {
        if (warnings.length) {
            console.log(chalk_1.default.yellow('Compiled with warnings.\n'));
            console.log(warnings.join('\n\n'));
            console.log('\nSearch for the ' +
                chalk_1.default.underline(chalk_1.default.yellow('keywords')) +
                ' to learn more about each warning.');
            console.log('To ignore, add ' +
                chalk_1.default.cyan('// eslint-disable-next-line') +
                ' to the line before.\n');
        }
        else {
            console.log(chalk_1.default.green('Compiled successfully.\n'));
        }
        console.log('File sizes after gzip:\n');
        // images optimzation.
        stats.map((stat) => {
            imageMinifier_1.default(stats, BUILD_PATH).then(() => {
                fileSizeReporter_1.printFileSizesAfterBuild(stat, previousFileSizes, BUILD_PATH, WARN_AFTER_BUNDLE_GZIP_SIZE, WARN_AFTER_CHUNK_GZIP_SIZE);
                console.log();
            });
        });
    });
}));
// Create the production build and print the deployment instructions.
function build(previousFileSizes) {
    console.log('Creating an optimized production build...');
    const allConfigs = webpack_config_ssr_1.default.concat(webpack_config_web_1.default());
    const compiler = webpack_1.default(allConfigs);
    return new Promise((resolve, reject) => {
        compiler.run((err, stats) => {
            if (err) {
                return reject(err);
            }
            const messages = formatWebpackMessages_1.default(stats.toJson('normal'));
            if (stats.hasErrors()) {
                // Only keep the first error. Others are often indicative
                // of the same problem, but confuse the reader with noise.
                if (messages.errors.length > 1) {
                    messages.errors.length = 1;
                }
                return reject(new Error(messages.errors.join('\n\n')));
            }
            if (process.env.CI &&
                (typeof process.env.CI !== 'string' ||
                    process.env.CI.toLowerCase() !== 'false') &&
                stats.hasWarnings()) {
                console.log(chalk_1.default.yellow('\nTreating warnings as errors because process.env.CI = true.\n' +
                    'Most CI servers set it automatically.\n'));
                return reject(new Error(messages.warnings.join('\n\n')));
            }
            return resolve({
                stats,
                previousFileSizes,
                warnings: messages.warnings,
            });
        });
    });
}

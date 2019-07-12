"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const chalk_1 = __importDefault(require("chalk"));
const webpack_1 = __importDefault(require("webpack"));
const formatWebpackMessages_1 = __importDefault(require("art-dev-utils/lib/formatWebpackMessages"));
const webpack_config_dll_1 = __importDefault(require("../config/webpack.config.dll"));
const paths_1 = __importDefault(require("../config/paths"));
const appConfig_1 = __importDefault(require("../config/appConfig"));
const path_1 = require("path");
const fs_extra_1 = __importDefault(require("fs-extra"));
const dllVersion = appConfig_1.default.get('art:webpack:dll:version') || 'default-version';
const virtualPath = appConfig_1.default.get('art:projectVirtualPath') || '';
const publicOutputPath = path_1.join(process.cwd(), './public', virtualPath, 'vendors', dllVersion);
const debufOutputPath = path_1.join(process.cwd(), './debug', virtualPath, 'vendors', dllVersion);
// Makes the script crash on unhandled rejections instead of silently
// ignoring them. In the future, promise rejections that are not handled will
// terminate the Node.js process with a non-zero exit code.
process.on('unhandledRejection', (err) => {
    throw err;
});
process.env.NODE_ENV = 'production';
buildDll().then(() => {
    syncDllFile(publicOutputPath, debufOutputPath);
    console.log(chalk_1.default.green('Create optimized DllPlugin Vendor successfully!'));
});
function buildDll() {
    if (!fs_extra_1.default.existsSync(paths_1.default.appArtConfig)) {
        console.log(chalk_1.default.red('Please execute "art dll" command at an art project root path'));
        process.exit(1);
    }
    console.log(chalk_1.default.green('Creating an optimized DllPlugin Vendor build...'));
    const compiler = webpack_1.default(new webpack_config_dll_1.default());
    return new Promise((resolve, reject) => {
        compiler.run((err, stats) => {
            if (err) {
                return reject(err);
            }
            const messages = formatWebpackMessages_1.default(stats.toJson('normal'));
            if (stats.hasErrors()) {
                // Only keep the first error. Others are often indicative
                // of the same problem, but confuse the reader.
                if (messages.errors.length > 1) {
                    messages.errors.length = 1;
                }
                return reject(new Error(messages.errors.join('\n\n')));
            }
            if (process.env.CI &&
                (typeof process.env.CI !== 'string' || process.env.CI.toLowerCase() !== 'false') &&
                stats.hasWarnings()) {
                console.log(chalk_1.default.yellow('\nTreating warnings as errors because process.env.CI = true.\n' +
                    'Most CI servers set it automatically.\n'));
                return reject(new Error(messages.warnings.join('\n\n')));
            }
            return resolve({
                stats,
                warnings: messages.warnings,
            });
        });
    });
}
function syncDllFile(src, dist) {
    try {
        fs_extra_1.default.copySync(src, dist);
        console.log(chalk_1.default.green('Sync dll and manifest files successfully!'));
    }
    catch (err) {
        console.log(chalk_1.default.red('Copy dll and manifest files error: '), err);
    }
}

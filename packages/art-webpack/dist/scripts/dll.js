"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const chalk_1 = __importDefault(require("chalk"));
const webpack_1 = __importDefault(require("webpack"));
const formatWebpackMessages_1 = __importDefault(require("art-dev-utils/lib/formatWebpackMessages"));
const webpack_config_dll_1 = __importDefault(require("../config/webpack.config.dll"));
// Makes the script crash on unhandled rejections instead of silently
// ignoring them. In the future, promise rejections that are not handled will
// terminate the Node.js process with a non-zero exit code.
process.on('unhandledRejection', (err) => {
    throw err;
});
process.env.NODE_ENV = 'production';
buildDll().then(() => {
    console.log('create optimized DllPlugin Vendor successfully!');
});
function buildDll() {
    console.log('Creating an optimized DllPlugin Vendor build...');
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

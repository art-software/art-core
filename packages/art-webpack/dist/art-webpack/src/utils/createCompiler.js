var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "webpack", "art-dev-utils/lib/chalkColors", "art-dev-utils/lib/clearConsole", "path", "art-dev-utils/lib/formatWebpackMessages", "chalk"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    const webpack_1 = __importDefault(require("webpack"));
    const chalkColors_1 = require("art-dev-utils/lib/chalkColors");
    const clearConsole_1 = __importDefault(require("art-dev-utils/lib/clearConsole"));
    const path = __importStar(require("path"));
    const formatWebpackMessages_1 = __importDefault(require("art-dev-utils/lib/formatWebpackMessages"));
    const chalk_1 = __importDefault(require("chalk"));
    const createCompiler = (config, onFinish) => {
        let compiler = null;
        try {
            compiler = webpack_1.default(config);
        }
        catch (error) {
            console.log(chalkColors_1.warningText('Failed to compile.'));
            console.log();
            console.log(error.message || error);
            console.log();
            process.exit(1);
        }
        if (compiler === null) {
            return null;
        }
        const isInteractive = process.stdout.isTTY;
        let isFirstCompile = true;
        // "invalid" event fires when you have changed a file, and Webpack is
        // recompiling a bundle. WebpackDevServer takes care to pause serving the
        // bundle, so if you refresh, it'll wait instead of serving the old one.
        // "invalid" is short for "bundle invalidated", it doesn't imply any errors.
        compiler.plugin('invalid', (fileName) => {
            if (isInteractive && isFirstCompile) {
                clearConsole_1.default();
            }
            if (fileName) {
                console.log(`[${chalkColors_1.cyanText(path.relative(process.cwd(), fileName))}] has been changed, client recompiling...\n`);
            }
            else {
                // for webpack v1.
                console.log(`[webpack] client scripts has been changed, client recompiling...\n`);
            }
        });
        // "done" event fires when Webpack has finished recompiling the bundle.
        // Whether or not you have warnings or errors, you will get this event.
        compiler.plugin('done', (stats) => {
            const messages = formatWebpackMessages_1.default(stats.toJson({}, true));
            const noErrors = !messages.errors.length;
            const isSuccessful = noErrors && !messages.warnings.length;
            if (noErrors) {
                console.log(chalkColors_1.greenText('Client compiled successfully!'));
                if (Object.prototype.toString.call(onFinish) === '[object Function]') {
                    onFinish(noErrors);
                }
            }
            else {
                console.log(chalkColors_1.warningText('Debug server was interrupted, please fix lint error!\nFailed to compile.\n'));
                console.log(messages.errors.join('\n\n'));
                isFirstCompile = false;
                return;
            }
            if (isSuccessful && isFirstCompile && isInteractive) {
                console.log();
                console.log();
            }
            // Show warnings if no errors were found.
            if (messages.warnings.length) {
                console.log(chalk_1.default.yellow('Compiled with warnings.\n'));
                console.log(messages.warnings.join('\n\n'));
                // Teach some ESLint tricks.
                console.log('\nSearch for the ' +
                    chalk_1.default.underline(chalk_1.default.yellow('keywords')) +
                    ' to learn more about each warning.');
                console.log('To ignore, add ' +
                    chalk_1.default.cyan('// eslint-disable-next-line') +
                    ' to the line before.\n');
            }
            isFirstCompile = false;
        });
        return compiler;
    };
    exports.default = createCompiler;
});

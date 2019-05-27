"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const chalk_1 = __importDefault(require("chalk"));
function finishHandler(results) {
    let hasError = false;
    const showErrorCount = (count, type) => {
        if (count === 0) {
            return;
        }
        console.log('TypeScript:', chalk_1.default.magenta(count.toString()), (type !== '' ? type + ' ' : '') + (count === 1 ? 'error' : 'errors'));
        hasError = true;
    };
    showErrorCount(results.transpileErrors, '');
    showErrorCount(results.optionsErrors, 'options');
    showErrorCount(results.syntaxErrors, 'syntax');
    showErrorCount(results.globalErrors, 'global');
    // showErrorCount(results.semanticErrors, 'semantic');
    showErrorCount(results.declarationErrors, 'declaration');
    showErrorCount(results.emitErrors, 'emit');
    if (!results.noEmit) {
        if (results.emitSkipped) {
            console.log('TypeScript: emit', chalk_1.default.red('failed'));
        }
        else if (hasError) {
            console.log('TypeScript: emit', chalk_1.default.cyan('succeeded'), '(with errors)');
        }
    }
}
function gulpTsReporter() {
    return {
        error: (error) => {
            if (error.diagnostic.code !== 2307) {
                console.log(error.message);
            }
        },
        finish: finishHandler
    };
}
exports.gulpTsReporter = gulpTsReporter;

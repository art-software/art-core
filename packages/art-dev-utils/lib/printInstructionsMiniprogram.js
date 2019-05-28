"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const chalk_1 = __importDefault(require("chalk"));
const printInstructionsMiniprogram = (appName, urls) => {
    console.log(`You can now view ${chalk_1.default.bold(appName)} in Wechat Miniprogram IDE.`);
    if (urls.lanUrlForTerminal) {
        console.log(`Wechat Miniprogram mock server url: `);
        console.log();
        console.log(`  ${chalk_1.default.bold('Local:')}            ${urls.localUrlForTerminal}`);
        console.log(`  ${chalk_1.default.bold('On Your Network:')}  ${urls.lanUrlForTerminal}`);
    }
    else {
        console.log();
        console.log(`  ${urls.localUrlForTerminal}`);
    }
    console.log();
    // console.log('Note that the development build is not optimized.');
    console.log(`To create a production build, use ` +
        `${chalk_1.default.cyan(`art build`)}.`);
    console.log();
};
exports.default = printInstructionsMiniprogram;

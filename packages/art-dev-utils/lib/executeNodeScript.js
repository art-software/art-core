"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const chalk_1 = __importDefault(require("chalk"));
const cross_spawn_1 = __importDefault(require("cross-spawn"));
const executeNodeScript = (command, scriptPath, ...args) => {
    const child = cross_spawn_1.default(command, [scriptPath, ...args], {
        stdio: 'inherit'
    });
    child.on('close', (code) => {
        if (code !== 0) {
            console.log();
            console.log(chalk_1.default.cyan(scriptPath) + ' exited with code ' + code + '.');
            console.log();
            return;
        }
    });
    child.on('error', (err) => {
        console.log(err);
    });
    return child;
};
exports.default = executeNodeScript;

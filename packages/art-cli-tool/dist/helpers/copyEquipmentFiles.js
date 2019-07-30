"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_extra_1 = __importDefault(require("fs-extra"));
const chalk_1 = __importDefault(require("chalk"));
const copyEquipmentFiles = (from, to) => {
    fs_extra_1.default.copy(from, to).then(() => {
        console.log(chalk_1.default.green('  Copy equipment files success!'));
    });
};
exports.default = copyEquipmentFiles;

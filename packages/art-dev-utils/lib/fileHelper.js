"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs = __importStar(require("fs"));
exports.walk = (dirPath) => {
    let results = [];
    const list = fs.readdirSync(dirPath);
    list.forEach((file) => {
        file = dirPath + '/' + file;
        const stat = fs.statSync(file);
        if (stat && stat.isDirectory()) {
            results = results.concat(exports.walk(file));
        }
        else {
            results.push(file);
        }
    });
    return results;
};
